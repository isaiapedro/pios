# Job Archive — Architectural Decisions

## ADR-001 — Slack approval is the only Jira-creation gate

**Date:** 2026-08-12  
**Status:** Superseded by ADR-007

**Decision:** The LLM may draft proposals. It never receives a Jira-create tool. Jira creation runs only inside `approval_service` after a validated Slack approval matches a local `PENDING_APPROVAL` proposal.

**Why:** Prompt-level "do not create Jira" is not a security boundary. Architecture must make unauthorized creation impossible.

## ADR-002 — Hybrid local-first integration

**Date:** 2026-08-12

**Decision:** Git history, diffs, sanitization, and sync logic execute locally. Jira is a transport endpoint, not the primary store for mirrors.

**Why:** Company source must not leave the scanner boundary. Local durable mirrors remain available offline.

## ADR-003 — Split operational and archive state

**Date:** 2026-08-12  
**Updated:** 2026-08-13

**Decision:**
- `state/` holds cursors and event log
- `archive/executions/` is append-oriented history
- `cards/` is a compact sanitized Markdown mirror

**Why:** Active directories must not become unbounded logs. History must remain auditable.

## ADR-004 — Deterministic sanitization before any LLM-facing output

**Date:** 2026-08-12

**Decision:** Scanner extracts bounded git metadata and optional bounded diffs. Sanitizer strips secrets and configured proprietary patterns. Summarizer emits compact text.

**Why:** Raw diffs, credentials, and proprietary implementation details must not enter model context.

## ADR-005 — Orchestration separated from adapters

**Date:** 2026-08-12

**Decision:** Domain/application layers own business flow. Jira/git clients are narrow adapters. CLI is a thin interface over the same services.

**Why:** Policy and sync logic stay testable without live APIs.

## ADR-006 — Idempotent external effects

**Date:** 2026-08-12  
**Updated:** 2026-08-13

**Decision:** Sync refreshes local mirrors from Jira keys. Updates are keyed by issue key. Retries overwrite the same mirror rather than inventing duplicate cards.

**Why:** Network retries must not create duplicate local state.

## ADR-007 — Card create/approve moves to company n8n

**Date:** 2026-08-13  
**Status:** Accepted

**Decision:** Remove Slack Socket Mode, proposal/approval lifecycle, and local Jira-create path. Company n8n owns create + approve. `job_archive` owns:

1. sync existing cards to `cards/`
2. update existing cards (fields / transition / comment)
3. sanitized local git scan/summarize

**Why:** Approval UX and creation policy already live in company automation. Duplicating Slack here adds cost and drift.

**MCP:** Not required for this scope. CLI is the interface. Reintroduce a thin MCP later only if agents need tool calls without shell.
