"""Deterministic insight generator — no Ollama.

Produces a structured weekly/daily/monthly narrative purely from DB aggregations,
routine_calendar adherence data, and behavioral context from personal/insights/.
This is the rule-based intelligence pipeline described in PIOS Layer 5 (SYSTEM.md).
"""
from __future__ import annotations

from schemas import InsightResponse, InsightSubmitRequest, PeriodType, ScheduleRecommendation, BlockChange
from services.llm_context import build_context
from services.llm_client import save_insight


async def generate_deterministic_insight(period: PeriodType) -> InsightResponse:
    """Build insight from SQL aggregations + behavioral context. Zero LLM calls."""
    ctx = await build_context(period.value)

    summary = ctx.get("summary", {})
    avg_mood: float = summary.get("avg_mood") or 0.5
    avg_energy: float = summary.get("avg_energy") or 0.5
    memo_count: int = summary.get("memo_count") or 0
    top_topics: list[dict] = summary.get("top_topics") or []
    events_confirmed: int = summary.get("events_confirmed") or 0
    events_total: int = summary.get("events_total") or 0

    routine_adherence = ctx.get("routine_adherence") or {}
    adherence_rate: float = routine_adherence.get("adherence_rate", 0.0)
    planned: int = routine_adherence.get("planned", 0)
    confirmed: int = routine_adherence.get("confirmed", 0)
    missed: list[str] = routine_adherence.get("missed", [])

    period_start: str = ctx.get("period_start", "")
    goals: list[dict] = ctx.get("goals") or []

    # ── Dominant sentiment ────────────────────────────────────────────────────
    if avg_mood >= 0.65:
        sentiment_label = "positive"
    elif avg_mood <= 0.40:
        sentiment_label = "challenging"
    else:
        sentiment_label = "mixed"

    # ── Topic summary ─────────────────────────────────────────────────────────
    topic_str = (
        ", ".join(t["topic"] for t in top_topics[:5])
        if top_topics
        else "no recurring topics detected"
    )

    # ── Routine adherence text ─────────────────────────────────────────────────
    if planned > 0:
        adherence_text = (
            f"{confirmed}/{planned} planned events completed "
            f"({adherence_rate:.0%} adherence)"
        )
        if missed:
            adherence_text += f". Most missed: {', '.join(missed[:3])}"
    else:
        adherence_text = "no routine events tracked this period"

    # ── Behavioral delta text (from SKILLS.md patterns) ──────────────────────
    behavioral_lines: list[str] = []
    if avg_energy < 0.40:
        behavioral_lines.append(
            "Energy consistently low — consider reducing morning cognitive load or adding movement."
        )
    if avg_mood < 0.40:
        behavioral_lines.append(
            "Mood below baseline — check sleep consistency and social activity frequency."
        )
    if adherence_rate < 0.6 and planned > 0:
        behavioral_lines.append(
            "Routine adherence below 60% — scope is overcommitted relative to execution capacity."
        )
    if not behavioral_lines:
        behavioral_lines.append("No critical behavioral flags this period.")

    behavioral_text = " ".join(behavioral_lines)

    # ── Active goals summary ──────────────────────────────────────────────────
    goal_str = (
        "; ".join(g["title"] for g in goals[:3])
        if goals
        else "no active goals configured"
    )

    # ── Narrative ─────────────────────────────────────────────────────────────
    narrative = (
        f"Week of {period_start} — {memo_count} memos captured. "
        f"Avg mood: {avg_mood:.0%} | Avg energy: {avg_energy:.0%} | Tone: {sentiment_label}. "
        f"Top themes: {topic_str}. "
        f"Events: {adherence_text}. "
        f"Active goals: {goal_str}. "
        f"Behavioral notes: {behavioral_text}"
    )

    # ── Schedule recommendation (deterministic rules) ─────────────────────────
    blocks: list[BlockChange] = []
    if adherence_rate < 0.6 and planned > 3:
        blocks.append(BlockChange(
            action="remove",
            title="Reduce overcommitted routine slots",
            field="scope",
            old=f"{planned} planned events",
            new=f"{max(1, planned - 2)} recommended events",
        ))
    if avg_energy < 0.40:
        blocks.append(BlockChange(
            action="move",
            title="Heavy work blocks",
            field="preferred_time",
            old="morning",
            new="afternoon (post-energy recovery)",
        ))

    rec: ScheduleRecommendation | None = None
    if blocks:
        reasoning = (
            f"Adherence rate {adherence_rate:.0%} and avg energy {avg_energy:.0%} "
            "indicate scope/energy mismatch. Adjusting block allocation."
        )
        rec = ScheduleRecommendation(reasoning=reasoning, blocks=blocks)

    submission = InsightSubmitRequest(narrative=narrative, schedule_recommendation=rec)

    return await save_insight(
        period,
        submission,
        memo_refs=ctx.get("memo_refs"),
        routine_adherence=routine_adherence or None,
        behavioral_context=ctx.get("behavioral_context"),
    )
