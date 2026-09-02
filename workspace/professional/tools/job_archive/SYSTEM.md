# Job Archive — System Directives

## Purpose

`job_archive` keeps a local, sanitized mirror of existing Jira work and records sanitized execution evidence from local git repos.

Card **creation** and **approval** are out of scope. Those run in the company **n8n** workflow.

## Inputs

- Local git repositories registered in `config.yaml`
- Existing Jira issues (owned / matching `sync_jql`)
- Non-secret operational config in `config.yaml`
- Credentials from `.env` (Jira only)

## Outputs

- Compact Markdown card mirrors in `cards/`
- Operational state in `state/`
- Append-only update/execution records in `archive/executions/`
- Sanitized work summaries for local/CLI consumption
- Updates to existing Jira issues (fields, transitions, comments)

## Integration Boundaries

- **Company repositories:** local scanner only
- **Sanitized summaries:** safe for agent/LLM context
- **Credentials:** environment only
- **Jira creation:** company n8n only — this service never creates issues
- **Slack approval:** company n8n only — not implemented here

## State Resolution

| Location | Role |
| --- | --- |
| `cards/` | Sanitized Markdown mirrors of existing Jira issues |
| `state/` | Sync cursors and event log |
| `archive/executions/` | Append-oriented history of updates/syncs |

## Non-responsibilities

- Creating Jira issues
- Slack interactive approval
- Arbitrary Jira REST dumps
- Exporting company source into other PIOS domains
- Serving as the human CLI tutorial (see `README.md`)

## Operator interface

CLI is the primary human/agent driver. Command reference and examples live in `README.md`. Agent intent map lives in `AGENTS.md`.
