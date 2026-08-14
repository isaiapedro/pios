# Job Archive — Architecture

**Status:** Implemented (n8n create/approve)  
**Target:** `workspace/professional/job_archive/`

## Central rule

This service mirrors and updates **existing** Jira work. Issue creation and human approval run in company **n8n**, not here.

```text
Local git -> scanner -> sanitizer -> summary
Jira (existing) -> sync -> cards/*.md
CLI update -> Jira fields/transition/comment -> refresh local mirror
```

## Layers

| Layer | Path | Owns |
| --- | --- | --- |
| Domain | `src/domain/` | Issue models, key validation |
| Application | `src/application/` | Orchestration, card mirrors |
| Infrastructure | `src/infrastructure/` | Storage, Jira, git |
| Processing | `src/processing/` | Scan, sanitize, summarize |
| Interfaces | `src/interfaces/` | CLI |

## Jira adapter surface

Allowed: `search_cards`, `get_card`, `update_card`, `transition_card`, `add_comment`.

Forbidden: issue create.

## Security boundaries

- Company repos: local scanner only
- Sanitized text: agent-safe
- Credentials: `.env` only
- Creation/approval: external n8n
