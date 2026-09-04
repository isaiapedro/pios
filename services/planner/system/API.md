# Public Interfaces

## Planning Transaction (`/planning`)

- **POST /planning/week**: Creates a draft weekly plan from natural-language intention, wiki evidence, calendar availability, deterministic scheduling, and validation.
- **GET /planning/{id}**: Returns a stored planning run.
- **POST /planning/{id}/validate**: Re-runs deterministic validation on a draft.
- **POST /planning/{id}/accept**: Writes accepted exploration blocks to Google Calendar.
- **POST /planning/{id}/reject**: Marks a draft as rejected without calendar mutation.

## Weekly Routine (`/routine`)

Knowledge-authored schedule — no LLM. Source: `personal/insights/routine_objects/routine_calendar.json`.

- **GET /routine/week**: Returns the structured week (preview).
- **POST /routine/apply**: Creates all blocks in Google Calendar and records them in `events`.

## REST API Services (`tools/api/routers/`)

### 1. Memo Pipeline Interface (`/memos`)
- **POST /memos/upload**: Ingests raw audio files, commits them to immutable storage nodes, and spins up the background extraction workflow.
- **GET /memos/{id}/status**: Polls active execution positions.

### 2. Schedule Coordination Engine (`/schedule`)
- **GET /schedule**: Pulls current structural time allocations.
- **POST /schedule**: Dispatches validated proposals to the active calendar provider.

### 3. Verification & Metrics Interface (`/dashboard`)
- **GET /dashboard**: Returns deterministic database calculations mapped out in relational views.

### 4. Review Analytics Node (`/insights`)
- **POST /insights/{period}/generate**: Explicitly generates a read-only review; never scheduled automatically.
- **GET /insights/{period}** and **GET /insights/{period}/history**: Return the latest or prior complete reviews.
- **GET /insights/{id}/inferences**: Returns immutable routine, goal, and future-plan inference logs.
- Reviews cannot apply, modify, or remove calendar blocks. Use `/planning` or `/routine` explicitly for schedule changes.

---

## Data Contracts
All backend processing models are strictly governed by Pydantic class boundaries in `tools/api/schemas.py`. Device states are bound to schemas declared inside `mobile/src/db/schema.ts`.
