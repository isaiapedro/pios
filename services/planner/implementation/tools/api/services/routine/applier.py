from __future__ import annotations

import asyncio
import logging
from datetime import datetime
from uuid import uuid4
from zoneinfo import ZoneInfo

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from services import calendar as calendar_svc
from services.routine.loader import RoutineCalendar, RoutineCalendarEvent, duration_minutes, load_routine_calendar

logger = logging.getLogger(__name__)
LOCAL_TZ = ZoneInfo("America/Sao_Paulo")


def _scheduled_at(date: str, start: str) -> datetime:
    return datetime.strptime(f"{date} {start}", "%Y-%m-%d %H:%M").replace(tzinfo=LOCAL_TZ)


def _event_description(event: RoutineCalendarEvent) -> str | None:
    parts: list[str] = []
    if event.day_theme:
        parts.append(f"Day theme: {event.day_theme}")
    if event.category:
        parts.append(f"Category: {event.category}")
    if event.notes:
        parts.append(event.notes)
    parts.append("Source: personal/insights/routine.md")
    return "\n".join(parts) if parts else None


async def apply_routine_week(db: AsyncSession, calendar: RoutineCalendar | None = None) -> dict:
    routine = calendar or load_routine_calendar()
    return await _persist_routine(db, routine, write_google_calendar=True)


async def sync_routine_events_local(db: AsyncSession, calendar: RoutineCalendar | None = None) -> dict:
    routine = calendar or load_routine_calendar()
    return await _persist_routine(db, routine, write_google_calendar=False)


async def _persist_routine(
    db: AsyncSession,
    routine: RoutineCalendar,
    *,
    write_google_calendar: bool,
) -> dict:
    created: list[dict] = []
    errors: list[dict] = []

    for event in routine.events:
        try:
            minutes = duration_minutes(event.start, event.end)
            start_iso = f"{event.date}T{event.start}:00"
            scheduled_at = _scheduled_at(event.date, event.start)
            google_id: str | None = None
            if write_google_calendar:
                google_id = await asyncio.to_thread(
                    calendar_svc.create_event,
                    event.title,
                    start_iso,
                    minutes,
                    calendar_svc.DEFAULT_CALENDAR_ID,
                    _event_description(event),
                )
            await db.execute(
                text(
                    """
                    INSERT INTO events (title, scheduled_at, status, google_event_id)
                    VALUES (:title, :scheduled_at, 'pending', :google_event_id)
                    """
                ),
                {
                    "title": event.title,
                    "scheduled_at": scheduled_at,
                    "google_event_id": google_id,
                },
            )
            created.append(
                {
                    "date": event.date,
                    "start": event.start,
                    "end": event.end,
                    "title": event.title,
                    "google_event_id": google_id,
                }
            )
        except Exception as exc:
            logger.warning("Failed to create routine event %s %s: %s", event.date, event.title, exc)
            errors.append({"date": event.date, "title": event.title, "error": str(exc)})

    batch_id = str(uuid4())
    await db.commit()
    logger.info(
        "Routine week applied batch=%s created=%d errors=%d week=%s..%s",
        batch_id,
        len(created),
        len(errors),
        routine.week_start,
        routine.week_end,
    )
    return {
        "batch_id": batch_id,
        "week_start": routine.week_start,
        "week_end": routine.week_end,
        "source_markdown": routine.source_markdown,
        "events_created": len(created),
        "events_failed": len(errors),
        "google_calendar_written": write_google_calendar,
        "calendar_event_ids": [
            item["google_event_id"] for item in created if item.get("google_event_id")
        ],
        "events": created,
        "errors": errors,
    }
