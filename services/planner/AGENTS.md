# Mission
Maintain a production-ready, highly responsive TypeScript/Python intelligence tool while enforcing boundary rules.

# Priorities
1. Maintain strict interface alignment across the mobile Expo frontend, FastAPI client layer, and PostgreSQL tables.
2. Optimize execution pipeline performance across the Whisper transcription and local Ollama nodes.
3. Ensure no local secrets or database keys slip into tracking snapshots.

# Workflow
1. Inspect `databases/pg_init.sql` schema definitions before introducing database logic alterations.
2. Verify route parameters against Pydantic definitions inside `tools/api/schemas.py`.
3. Validate React Native layout compliance inside `mobile/src/types/index.ts`.

# Rules
- Do not duplicate code—maintain pipelines cleanly within `tools/api/services/pipeline.py`.
- Broken dependency trees or unaligned schema modifications must cause immediate loud execution failures.
