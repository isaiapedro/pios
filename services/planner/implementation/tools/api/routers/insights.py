from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from fastapi import Query
from schemas import InferenceLogResponse, InsightResponse, InsightSubmitRequest, PeriodType
from services.llm_client import generate_and_save_insight, get_context, save_insight

router = APIRouter(prefix="/insights", tags=["insights"])


_INSIGHT_COLS = (
    "id, period_type, period_start::text, narrative, "
    "schedule_recommendation, accepted, generated_at, "
    "COALESCE(memo_refs, '{}') AS memo_refs, "
    "routine_adherence, behavioral_context, inference_bundle"
)


@router.get("/{period}/history", response_model=list[InsightResponse])
async def get_insight_history(
    period: PeriodType,
    limit: int = Query(default=10, ge=1, le=50),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        text(
            f"SELECT {_INSIGHT_COLS} FROM insights "
            "WHERE period_type = :period "
            "ORDER BY period_start DESC "
            "LIMIT :limit OFFSET :offset"
        ),
        {"period": period.value, "limit": limit, "offset": offset},
    )
    return [dict(r._mapping) for r in result.fetchall()]


@router.get("/{period}", response_model=InsightResponse)
async def get_insight(period: PeriodType, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        text(
            f"SELECT {_INSIGHT_COLS} FROM insights "
            "WHERE period_type = :period "
            "ORDER BY period_start DESC LIMIT 1"
        ),
        {"period": period.value},
    )
    row = result.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="No insight generated yet for this period")
    return dict(row._mapping)


@router.get("/{period}/context")
async def get_insight_context(period: PeriodType):
    """Raw context for the period — includes behavioral context + routine adherence."""
    return await get_context(period)


@router.get("/{insight_id}/inferences", response_model=list[InferenceLogResponse])
async def get_inference_logs(insight_id: str, db: AsyncSession = Depends(get_db)):
    """Read-only, append-only audit history for a selected review."""
    result = await db.execute(
        text(
            "SELECT id, inference_type, schema_version, status, input_hash, output, "
            "citation_paths, model, error_message, created_at "
            "FROM insight_inference_logs WHERE insight_id = CAST(:id AS uuid) "
            "ORDER BY created_at DESC"
        ),
        {"id": insight_id},
    )
    return [dict(row._mapping) for row in result.fetchall()]


@router.post("/{period}/submit", response_model=InsightResponse)
async def submit_insight(period: PeriodType, body: InsightSubmitRequest):
    """Store a narrative/recommendation generated manually (debug/override path)."""
    return await save_insight(period, body)


@router.post("/{period}/generate", response_model=InsightResponse)
async def generate_insight(period: PeriodType):
    """Cron entrypoint — generates and stores the review automatically via local Ollama."""
    return await generate_and_save_insight(period)

