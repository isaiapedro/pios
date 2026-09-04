import json
import logging
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from schemas import ScheduleConfigRequest, ScheduleConfigResponse

router = APIRouter(prefix="/schedule", tags=["schedule"])
logger = logging.getLogger(__name__)


@router.post("", response_model=ScheduleConfigResponse, status_code=201)
async def create_schedule(
    body: ScheduleConfigRequest,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        text(
            "INSERT INTO schedule_config (wake_time, sleep_time, buffer_minutes, domain_weights, fixed_blocks, calendar_event_ids) "
            "VALUES (:wake, :sleep, :buffer, CAST(:weights AS jsonb), CAST(:blocks AS jsonb), CAST(:event_ids AS jsonb)) "
            "RETURNING id, wake_time, sleep_time, buffer_minutes, domain_weights, fixed_blocks, calendar_event_ids, updated_at"
        ),
        {
            "wake": datetime.strptime(body.wake_time, "%H:%M").time(),
            "sleep": datetime.strptime(body.sleep_time, "%H:%M").time(),
            "buffer": body.buffer_minutes,
            "weights": json.dumps(body.domain_weights),
            "blocks": "[" + ",".join(b.model_dump_json() for b in body.fixed_blocks) + "]",
            "event_ids": json.dumps([]),
        },
    )
    row = result.fetchone()
    await db.commit()
    return _serialize_row(row)


@router.get("", response_model=ScheduleConfigResponse)
async def get_schedule(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        text(
            "SELECT id, wake_time, sleep_time, buffer_minutes, domain_weights, fixed_blocks, calendar_event_ids, updated_at "
            "FROM schedule_config ORDER BY updated_at DESC LIMIT 1"
        )
    )
    row = result.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="No schedule configured!")
    return _serialize_row(row)


@router.delete("", status_code=204)
async def clear_schedule(db: AsyncSession = Depends(get_db)):
    await db.execute(text("DELETE FROM schedule_config"))
    await db.commit()


def _serialize_row(row) -> dict:
    data = dict(row._mapping)
    data["wake_time"] = data["wake_time"].strftime("%H:%M")
    data["sleep_time"] = data["sleep_time"].strftime("%H:%M")
    return data
