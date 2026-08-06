# Public Interfaces

## Planning Transaction (`/planning`)

- **POST /planning/week**: Creates a draft weekly plan from natural-language intention, wiki evidence, calendar availability, deterministic scheduling, and validation.
- **GET /planning/{id}**: Returns a stored planning run.
- **POST /planning/{id}/validate**: Re-runs deterministic validation on a draft.
- **POST /planning/{id}/accept**: Writes accepted exploration blocks to Google Calendar.
- **POST /planning/{id}/reject**: Marks a draft as rejected without calendar mutation.

## Weekly Routine (`/routine`)

Knowledge-authored schedule — no LLM. Source: `knowledge/health/synthesized/routine_calendar.json`.

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
- **GET /insights/{period}**: Collects compiled insights or cached narrative outputs.
- **POST /insights/schedule/accept**: Confirms structural changes, transitioning them to production.

---

## Data Contracts
All backend processing models are strictly governed by Pydantic class boundaries in `tools/api/schemas.py`. Device states are bound to schemas declared inside `mobile/src/db/schema.ts`.
