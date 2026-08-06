# PIOS Intelligent Planner

Scheduling service: React Native/Expo mobile client + FastAPI backend + PostgreSQL.

## Database bootstrap

### Docker (recommended)

From `services/planner/`:

```bash
docker compose up -d postgres
```

On **first** Postgres volume init, `01_init_pios.sh` creates the `pios` database, enables `vector`, and applies `pg_init.sql` from `/schema/pg_init.sql` inside the container.

`pg_init.sql` is mounted at `/schema/pg_init.sql` (not inside `docker-entrypoint-initdb.d/`) to avoid Docker's read-only nested file mount error.

To recreate from scratch:

```bash
docker compose down -v
docker compose up -d postgres
```

### Manual init (existing Postgres volume)

From any directory:

```bash
./services/planner/databases/init_pios.sh
```

Or with a custom connection:

```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/pios \
  ./services/planner/databases/init_pios.sh
```

The script resolves `pg_init.sql` relative to itself — no cwd footgun.

### Direct psql

From repo root:

```bash
psql postgresql://postgres:password@localhost:5432/pios \
  -f services/planner/databases/pg_init.sql
```

From `services/planner/databases/`:

```bash
psql postgresql://postgres:password@localhost:5432/pios -f pg_init.sql
```

Do **not** use the repo-root `-f` path when your shell is already inside `databases/`.

If the `pios` database does not exist yet:

```bash
psql postgresql://postgres:password@localhost:5432/postgres -c "CREATE DATABASE pios;"
psql postgresql://postgres:password@localhost:5432/pios -c "CREATE EXTENSION IF NOT EXISTS vector;"
psql postgresql://postgres:password@localhost:5432/pios -f pg_init.sql
```

### Verify

```bash
psql postgresql://postgres:password@localhost:5432/pios -c "\dt"
psql postgresql://postgres:password@localhost:5432/pios -c "SELECT COUNT(*) FROM metric_registry;"
```

Expect tables such as `planning_runs`, `events`, `goals`, and 6 seeded metrics.

### Reset scheduling data

Clears draft runs, schedule config, calendar-linked events, and goals (keeps memos and insights):

```bash
./services/planner/databases/reset_planner_data.sh
```

### Port conflicts

If `docker compose up` fails with **port already allocated**:

```bash
docker ps --filter publish=5432 --filter publish=8000
```

Stop stale containers (often named `master_manager-postgres-1` / `master_manager-pios_api-1`), then:

```bash
docker compose up -d --force-recreate
```

Verify:

```bash
curl http://localhost:8000/health
```

## Full stack

```bash
docker compose up -d
```

API: http://localhost:8000

**Planning pipeline debugging:** see [`PIPELINE_DEBUG.md`](PIPELINE_DEBUG.md) for stage-by-stage tracing (`pipeline_trace` in API responses), common failure modes, and when the model vs fallbacks are at fault.

On Linux, `pios_api` uses `network_mode: host` so port 8000 is reachable from your phone on the LAN. If mobile shows **Network request failed**, open `http://YOUR_LAN_IP:8000/health` in the phone browser first.
