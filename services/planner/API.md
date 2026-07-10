# Public Interfaces

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
