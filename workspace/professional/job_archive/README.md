# Job Archive

Local-first Jira card mirror + sanitized work archive.

**Creates/approves cards?** No — company **n8n** owns that.  
**This service:** sync existing cards locally, update existing tasks, scan/summarize git safely.

## Layout

```text
cards/               sanitized Markdown mirrors
archive/executions/  append-only update history
state/               sync cursors, event log
src/                 domain, application, adapters, CLI
tests/
```

## Setup

```bash
cd workspace/professional/job_archive
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env
```

Fill `.env` with Jira only (`JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN`).  
Edit `config.yaml` (`project_key`, `sync_jql`, `repositories`).

This file is the **canonical CLI how-to**. Agent shortcuts live in `AGENTS.md`. Boundaries live in `BEHAVIOR.md` / `SYSTEM.md`.

## CLI

Requires venv active (`pip install -e .`) so `job-archive` is on `PATH`.

### status

Show local root, mirrored card keys, repos, sync JQL, sync cursors.

```bash
job-archive status
```

### cards sync

Pull existing Jira issues into `cards/*.md`.

```bash
# all issues matching config.yaml sync_jql
job-archive cards sync

# specific keys only
job-archive cards sync EFICORE-123 EFICORE-456
```

Preserves existing **Code Tracking Log** lines on re-sync. Refreshes title, description, status from Jira (sanitized).

### card show

Print local Markdown mirror.

```bash
job-archive card show EFICORE-123
```

Fails if card not synced yet — run `cards sync` first.

### card update

Change an **existing** Jira issue, then refresh local mirror.

```bash
job-archive card update EFICORE-123 \
  --summary "New title" \
  --description "Sanitized description" \
  --status "In Progress" \
  --comment "Progress note posted to Jira" \
  --tracking "Local-only tracking line" \
  --local-only-comment
```

| Flag | Effect |
| --- | --- |
| `--summary` | Update Jira summary |
| `--description` | Update Jira description (sanitized) |
| `--status` | Transition to matching workflow status name |
| `--comment` | Jira comment (unless `--local-only-comment`) + tracking if no `--tracking` |
| `--tracking` | Append line under local Code Tracking Log |
| `--local-only-comment` | Do not POST comment to Jira; still can use `--tracking` / local log via `--comment` text rules |

At least one of summary/description/status/comment/tracking should be set for a useful update. Engine always re-fetches the issue after changes.

### scan

Bounded git metadata (commits, files, diff stats). JSON stdout. No secrets intended for LLM context — still sanitized.

```bash
job-archive scan /home/pedrosouza/projetos/kraken
job-archive scan /home/pedrosouza/projetos/kraken --since "3 days ago"
```

Path may be any registered (or other) local git repo. Default `--since` from `config.yaml` → `scan.default_since`.

### summarize

Sanitized work summary text (for humans/agents). Logs a summarize event locally.

```bash
job-archive summarize /home/pedrosouza/projetos/goat
job-archive summarize /home/pedrosouza/projetos/goat --since "7 days ago"
```

### export --professional

Compact PIOS-facing JSON: card keys/statuses, themes, simple blockers.

```bash
job-archive export --professional
```

## Common flows

```bash
# morning: pull open cards
job-archive cards sync

# understand recent git work
job-archive summarize /home/pedrosouza/projetos/kraken --since "2 days ago"

# attach progress to existing card
job-archive card update EFICORE-123 \
  --comment "Sanitized: finished auth edge cases" \
  --status "In Progress"

# inspect local mirror
job-archive card show EFICORE-123
```

## Not in this CLI

| Action | Owner |
| --- | --- |
| Create Jira issue | Company n8n |
| Slack approve/reject | Company n8n |
| Propose → n8n outbox | Not implemented yet |
| Slack worker / MCP server | Removed |

## MCP?

Not required. CLI is the interface. Add MCP later only if Cursor agents need tools without shell.

## Tests

```bash
pytest
```
