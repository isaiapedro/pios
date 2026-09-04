# Planner structure decisions

## System contract and implementation are separated

The Planner keeps its manifest at the service root. Its behavioral contract,
operator guidance, API description, and Compose definition live in `system/`.
Runnable mobile, API, database, and local-support files live in
`implementation/`. This makes operational documentation reviewable without
mixing it with generated application output.

## Compose remains an operator entry point

`system/docker-compose.yaml` references implementation paths explicitly. Run
Compose from `services/planner/system/`; paths in that file must remain
relative to this directory. Runtime caches and build outputs under
`implementation/` are excluded from version control, while source and lock
files remain tracked.

## Personal domain owns memo and insight records

Planner does not own an evidence vault or master wiki. Transcripts, memos, and
temporary upload audio are contained within `personal/memo/` and
`personal/transcripts/`; derived analytical material belongs to
`personal/insights/`. Planner accesses these locations through its Personal
domain settings and Compose mount, never through a service-local duplicate.
