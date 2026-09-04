"""Build context objects for Claude insight generation — no raw audio, structured summaries only."""
from __future__ import annotations

import asyncio
import json
from datetime import date, timedelta
from pathlib import Path

from sqlalchemy import text

from config import settings
from database import AsyncSessionLocal
from services import calendar as calendar_svc


async def build_context(period: str) -> dict:
    """
    Returns a structured context dict for the given period.
    Cap: ~4000 tokens of input data total.
    """
    intervals = {"daily": 1, "weekly": 7, "monthly": 30}
    days_back = intervals.get(period, 7)
    since = date.today() - timedelta(days=days_back)

    async with AsyncSessionLocal() as db:
        # transcripts (last N, capped at 20) — also collect obs_ids for memo_refs
        t_rows = await db.execute(
            text(
                "SELECT i.obs_id::text, i.transcript, i.mood, i.energy, "
                "       i.sentiment::text, i.key_takeaways, i.extracted_at "
                "FROM interpretations i "
                "WHERE i.extracted_at >= :since "
                "ORDER BY i.extracted_at DESC LIMIT 20"
            ),
            {"since": since},
        )
        transcripts = [dict(r._mapping) for r in t_rows.fetchall()]
        memo_refs = [t["obs_id"] for t in transcripts]

        # feature summary
        agg_row = await db.execute(
            text(
                "SELECT "
                "  AVG(mood)::REAL   AS avg_mood, "
                "  AVG(energy)::REAL AS avg_energy, "
                "  COUNT(*)          AS memo_count "
                "FROM interpretations WHERE extracted_at >= :since"
            ),
            {"since": since},
        )
        agg = dict(agg_row.fetchone()._mapping)

        # top topics
        topic_rows = await db.execute(
            text(
                "SELECT unnest(topics) AS topic, COUNT(*) AS cnt "
                "FROM interpretations WHERE extracted_at >= :since "
                "GROUP BY topic ORDER BY cnt DESC LIMIT 10"
            ),
            {"since": since},
        )
        top_topics = [{"topic": r.topic, "count": r.cnt} for r in topic_rows.fetchall()]

        # event completion
        evt_row = await db.execute(
            text(
                "SELECT "
                "  COUNT(*) FILTER (WHERE status='confirmed') AS confirmed, "
                "  COUNT(*) AS total "
                "FROM events WHERE scheduled_at >= :since"
            ),
            {"since": since},
        )
        evt = dict(evt_row.fetchone()._mapping)

        # current schedule config
        cfg_row = await db.execute(
            text(
                "SELECT wake_time::text, sleep_time::text, domain_weights, fixed_blocks "
                "FROM schedule_config ORDER BY updated_at DESC LIMIT 1"
            )
        )
        cfg = dict(cfg_row.fetchone()._mapping) if cfg_row.rowcount else {}

        # previous period insight (for continuity)
        prev_row = await db.execute(
            text(
                "SELECT narrative, inference_bundle FROM insights "
                "WHERE period_type = :period "
                "ORDER BY period_start DESC LIMIT 1"
            ),
            {"period": period},
        )
        prev = prev_row.fetchone()
        previous_narrative = prev[0] if prev else None
        previous_bundle = prev[1] if prev else None

        # dashboard snapshot
        dash_rows = await db.execute(
            text(
                "SELECT metric_id, metric_value, metadata "
                "FROM dashboard_metrics "
                "WHERE computed_for_date = (SELECT MAX(computed_for_date) FROM dashboard_metrics)"
            )
        )
        dashboard = [dict(r._mapping) for r in dash_rows.fetchall()]

        # active goals — the allocation driver (replaces domain_weights)
        goal_rows = await db.execute(
            text(
                "SELECT title, kind::text, domain, target_date::text, cadence "
                "FROM goals WHERE status = 'active' ORDER BY created_at"
            )
        )
        goals = [dict(r._mapping) for r in goal_rows.fetchall()]

    # live calendar — best-effort; insight generation must not fail if the
    # one-time OAuth setup (scripts/google_oauth_setup.py) hasn't run yet
    try:
        busy_windows = await asyncio.to_thread(calendar_svc.summarize_busy_windows, days_ahead=14)
    except Exception as exc:
        busy_windows = []
        calendar_error = str(exc)
    else:
        calendar_error = None

    behavioral_context = _load_behavioral_context()
    routine_adherence = await _compute_routine_adherence(since, db_session=None)
    citation_catalog = _load_citation_catalog()

    return {
        "period": period,
        "period_start": since.isoformat(),
        "transcripts": [
            {
                "text": t["transcript"][:500] if t["transcript"] else "",  # cap per entry
                "mood": t["mood"],
                "energy": t["energy"],
                "sentiment": t["sentiment"],
                "takeaways": t["key_takeaways"],
                "date": str(t["extracted_at"])[:10],
            }
            for t in transcripts
        ],
        "summary": {
            "avg_mood": agg["avg_mood"],
            "avg_energy": agg["avg_energy"],
            "memo_count": agg["memo_count"],
            "top_topics": top_topics,
            "events_confirmed": evt["confirmed"],
            "events_total": evt["total"],
        },
        "schedule": cfg,
        "goals": goals,
        "busy_windows": busy_windows,
        "calendar_error": calendar_error,
        "dashboard": dashboard,
        "previous_narrative": previous_narrative,
        "previous_inference_bundle": previous_bundle,
        "memo_refs": memo_refs,
        "behavioral_context": behavioral_context,
        "routine_adherence": routine_adherence,
        "citation_catalog": citation_catalog,
    }


def _load_behavioral_context() -> str | None:
    """Read the canonical Insights system contract, trimmed to 1500 chars."""
    insights_path = Path(settings.personal_insights_path) / "system"
    parts: list[str] = []
    for fname in ("BEHAVIOR.md", "SKILLS.md"):
        fpath = insights_path / fname
        try:
            content = fpath.read_text(encoding="utf-8").strip()
            if content:
                parts.append(f"## {fname}\n{content}")
        except (OSError, FileNotFoundError):
            pass
    if not parts:
        return None
    combined = "\n\n".join(parts)
    return combined[:1500]


def _load_citation_catalog() -> list[str]:
    """Expose only local evidence paths that an insight may cite."""
    root = Path(settings.knowledge_root_path)
    base = root / "health" / "wiki"
    try:
        return [
            f"knowledge/health/wiki/{path.relative_to(base).as_posix()}"
            for path in sorted(base.rglob("*.md"))[:120]
        ]
    except OSError:
        return []


async def _compute_routine_adherence(since: date, db_session=None) -> dict | None:
    """Compare routine_calendar.json planned events vs confirmed events in DB."""
    # Load routine calendar
    routine_path = Path(settings.personal_insights_path) / "routine_objects" / "routine_calendar.json"
    if not routine_path.exists():
        return None

    try:
        with routine_path.open(encoding="utf-8") as f:
            routine_data = json.load(f)
    except (OSError, json.JSONDecodeError):
        return None

    events = routine_data.get("events", [])
    period_events = [
        e for e in events
        if e.get("date") and date.fromisoformat(e["date"]) >= since
    ]
    if not period_events:
        return None

    planned_titles = [e["title"].lower() for e in period_events]
    planned_count = len(period_events)

    # Query confirmed events in DB for the period
    async with AsyncSessionLocal() as db:
        rows = await db.execute(
            text(
                "SELECT LOWER(title) AS title FROM events "
                "WHERE scheduled_at >= :since AND status = 'confirmed'"
            ),
            {"since": since},
        )
        confirmed_titles = {r.title for r in rows.fetchall()}

    matched = sum(1 for t in planned_titles if t in confirmed_titles)
    missed = [t for t in planned_titles if t not in confirmed_titles][:10]

    return {
        "planned": planned_count,
        "confirmed": matched,
        "adherence_rate": round(matched / planned_count, 2) if planned_count else 0.0,
        "missed": missed,
    }
