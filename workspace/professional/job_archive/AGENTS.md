# Job Archive — Agent Navigation

## Role

Local engine mirrors and updates **existing** Jira cards. Creation/approval = company n8n.

**Full CLI how-to:** `README.md` (canonical). This file = short intent map + safety only.

## Readable

- Contract docs (`manifest.yaml`, `SYSTEM.md`, `BEHAVIOR.md`, `README.md`, …)
- `config.yaml` (non-secret)
- `cards/*.md`
- Sanitized stdout from `scan` / `summarize`

## Not readable / not executable by agents

- `.env` / credentials
- Company repository trees (use `scan` / `summarize` only — never dump raw diffs into other PIOS domains)
- Raw Jira REST

## Engine entry points

| Intent | Command |
| --- | --- |
| Engine health / inventory | `job-archive status` |
| Pull owned/open cards locally | `job-archive cards sync` |
| Pull specific keys | `job-archive cards sync KEY [KEY…]` |
| Show mirror | `job-archive card show KEY` |
| Update existing card | `job-archive card update KEY [--summary …] [--description …] [--status …] [--comment …] [--tracking …] [--local-only-comment]` |
| Scan git (JSON) | `job-archive scan <repo> [--since …]` |
| Sanitized work summary | `job-archive summarize <repo> [--since …]` |
| PIOS export block | `job-archive export --professional` |

Activate project venv first so `job-archive` is installed.

## Forbidden

- Creating Jira issues here
- Reintroducing Slack approve/create path
- Copying company source into other PIOS domains
- Treating `JOB_ARCHIVE_STRUCTURE.md` as live CLI docs (superseded design note)
