from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Any, Literal
from uuid import UUID

from pydantic import BaseModel, Field


# --- enums ---

class EventStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    skipped = "skipped"


class PeriodType(str, Enum):
    daily = "daily"
    weekly = "weekly"
    monthly = "monthly"


class SentimentType(str, Enum):
    positive = "positive"
    neutral = "neutral"
    negative = "negative"


# --- memo ---

class MemoUploadResponse(BaseModel):
    job_id: str
    status: str = "queued"


class MemoStatusResponse(BaseModel):
    job_id: str
    status: str  # queued | transcribing | extracting | embedding | done | error
    error: str | None = None


# --- features (Ollama structured output) ---

class Entity(BaseModel):
    name: str
    type: str  # person | project | concept | location


class MemoFeatures(BaseModel):
    mood: float = Field(ge=0.0, le=1.0)
    energy: float = Field(ge=0.0, le=1.0)
    topics: list[str]
    entities: list[Entity]
    sentiment: SentimentType
    key_takeaways: list[str]
    event_confirmed: bool = False


# --- events ---

class EventConfirmRequest(BaseModel):
    confirmed: bool
    memo_id: str | None = None


class EventResponse(BaseModel):
    id: UUID
    title: str
    scheduled_at: datetime
    status: EventStatus
    memo_id: UUID | None = None


# --- schedule ---

class FixedBlock(BaseModel):
    title: str
    days: list[str]   # ["monday", "wednesday"]
    start: str        # "09:00"
    duration_minutes: int


class ScheduleConfigRequest(BaseModel):
    wake_time: str    # "06:30"
    sleep_time: str   # "23:00"
    buffer_minutes: int = 60   # unscheduled off-time before sleep_time
    # Deprecated — allocation is now goal-driven (see GoalCreate/Goal below).
    # Kept optional so old clients/rows don't break; new wizard sends {}.
    domain_weights: dict[str, float] = {}
    fixed_blocks: list[FixedBlock]


class ScheduleConfigResponse(ScheduleConfigRequest):
    id: UUID
    updated_at: datetime


# --- goals ---

class GoalKind(str, Enum):
    long_term = "long_term"
    routine = "routine"


class GoalStatus(str, Enum):
    active = "active"
    achieved = "achieved"
    paused = "paused"


class GoalCreate(BaseModel):
    title: str
    kind: GoalKind
    domain: str | None = None
    target_date: str | None = None   # ISO date, long_term goals only
    cadence: str | None = None       # e.g. "daily", "3x/week" — routine goals only


class Goal(GoalCreate):
    id: UUID
    status: GoalStatus
    created_at: datetime
    updated_at: datetime


# --- dashboard ---

class DashboardMetric(BaseModel):
    metric_id: str
    value: float
    computed_for_date: str
    metadata: dict[str, Any] = {}


class DashboardResponse(BaseModel):
    metrics: list[DashboardMetric]


# --- schedule recommendation diff ---

class BlockChange(BaseModel):
    action: str         # add | move | remove
    block_id: str | None = None
    field: str | None = None
    old: Any | None = None
    new: Any | None = None
    title: str | None = None
    domain: str | None = None
    scheduled_at: datetime | None = None
    duration_minutes: int | None = None


class ScheduleRecommendation(BaseModel):
    reasoning: str
    blocks: list[BlockChange]


# --- insights ---

class ReviewFinding(BaseModel):
    statement: str
    evidence_refs: list[str] = Field(default_factory=list)
    confidence: Literal["high", "medium", "low", "insufficient_evidence"]


class ScientificSupport(BaseModel):
    claim: str
    source_path: str
    applicability: str


class RoutineReview(BaseModel):
    summary: str
    metrics: dict[str, Any] = Field(default_factory=dict)
    worked: list[ReviewFinding] = Field(default_factory=list)
    did_not_work: list[ReviewFinding] = Field(default_factory=list)
    experiments: list[str] = Field(default_factory=list)


class GoalAssessment(BaseModel):
    goal_title: str
    status: Literal["on_track", "at_risk", "no_evidence"]
    progress: str
    schedule_fit: str
    evidence_refs: list[str] = Field(default_factory=list)
    scientific_support: list[ScientificSupport] = Field(default_factory=list)


class GoalReview(BaseModel):
    summary: str
    assessments: list[GoalAssessment] = Field(default_factory=list)


class FuturePlanReview(BaseModel):
    summary: str
    progress_updates: list[ReviewFinding] = Field(default_factory=list)
    new_additions: list[ReviewFinding] = Field(default_factory=list)
    unresolved_questions: list[str] = Field(default_factory=list)


class InferenceBundle(BaseModel):
    schema_version: Literal["1.0"]
    routine_review: RoutineReview
    goal_review: GoalReview
    future_plan_review: FuturePlanReview


class InferenceLogResponse(BaseModel):
    id: UUID
    inference_type: Literal["routine", "goals", "future_plans"]
    schema_version: str
    status: Literal["valid", "invalid", "failed"]
    input_hash: str
    output: dict[str, Any] | None = None
    citation_paths: list[str] = Field(default_factory=list)
    model: str | None = None
    error_message: str | None = None
    created_at: datetime

class InsightResponse(BaseModel):
    id: UUID
    period_type: PeriodType
    period_start: str
    narrative: str
    schedule_recommendation: ScheduleRecommendation | None = None
    accepted: bool
    generated_at: datetime
    memo_refs: list[UUID] = []
    routine_adherence: dict | None = None
    behavioral_context: str | None = None
    inference_bundle: InferenceBundle | None = None


class InsightSubmitRequest(BaseModel):
    narrative: str
    schedule_recommendation: ScheduleRecommendation | None = None


class AcceptRecommendationResponse(BaseModel):
    accepted: bool
    blocks_applied: int


# --- sync ---

class SyncPullResponse(BaseModel):
    events: list[EventResponse]
    latest_insight: InsightResponse | None = None
