# Professional Workspace — Assistant Operational Guide

## 1. Workspace Navigation Directives
- When processing internal code or reviewing workspace logs, never output content outside of the `/workspace/professional` sub-tree.
- Keep workspace summaries focused on execution tracking, blockers, and functional milestone metrics.

## 2. Directory Structure

| Path | Purpose |
|------|---------|
| `_meta/` | System files: SYSTEM.md, BEHAVIOR.md, manifest.yaml |
| `tools/job_archive/` | Dev tool (Python CLI): Jira sync, card update, git scan/summarize |
| `tools/workspace_sync/` | Dev tool (Python CLI): Slack DM sync + Gemini Meet note sync |
| `knowledge/jira/cards/` | Machine-synced Jira card mirrors — written by `job-archive` CLI |
| `knowledge/slack/dms/` | Slack DM exports — written by `workspace-sync slack dms` |
| `knowledge/jira/` | Human-curated Jira task notes (EFICORE-*, VDEB-*, PED-* with titles) |
| `knowledge/calls/` | All meet notes (Gemini transcripts, handoff docs, recordings) |
| `knowledge/slack/` | Slack exports (slackdump + transcripts) |
| `knowledge/snippets/` | Code blocks, workflow JSON, HTML prototypes |
| `knowledge/docs/` | Static documents, PDFs, presentations |
| `plans/` | Work plans, OKRs, strategic plans (PLAN-*.md) |

## 3. Source of Truth per Content Type

- **Jira Tasks (machine-synced)**: `knowledge/jira/cards/` — written by `job-archive cards sync`
- **Jira Tasks (human notes)**: `knowledge/jira/` root — human-curated context per card
- **Meet Notes / Gemini**: `knowledge/calls/` — manual exports + `workspace-sync gemini sync`
- **Slack DMs**: `knowledge/slack/dms/` — written by `workspace-sync slack dms`
- **Slack channel dumps**: `knowledge/slack/` — manual slackdump exports only
- **Code Blocks / Snippets**: `knowledge/snippets/`
- **Documents / Presentations**: `knowledge/docs/`
- **Strategic Plans**: `plans/`

## 4. Tool Usage

`tools/job_archive/` is a Python CLI. Activate venv and run:
```bash
cd tools/job_archive && source .venv/bin/activate
job-archive cards sync          # pulls Jira cards → knowledge/jira/cards/
job-archive card show KEY
job-archive summarize <repo>    # sanitized git summary for LLM context
job-archive export --professional
```

## 5. Task Tracking Protocols
- Machine-synced cards: `knowledge/jira/cards/` only — do not edit manually, managed by tool.
- Human Jira notes: `knowledge/jira/` root — markdown task lists with timestamp hashes.
