# Job Archive — Behavior Specification

## Hard Boundaries

- Never create a Jira issue from this service (n8n owns creation/approval).
- Never expose raw proprietary code, unrestricted diffs, secrets, or arbitrary Jira payloads to agents.
- Never rewrite historical execution archives. Append only.
- Never export raw company source into other PIOS domains.

## Allowed Operations

- Sync existing Jira cards into local Markdown mirrors
- Update existing Jira card fields / status / comments (sanitized)
- Scan local repos and emit sanitized work summaries
- Append local code-tracking notes on mirrored cards
- Export compact professional status JSON for PIOS

## Agent / CLI Surface

Preferred interface: CLI. **Usage details:** `README.md`.

Allowed commands:

- `job-archive status`
- `job-archive cards sync [KEY…]`
- `job-archive card show KEY`
- `job-archive card update KEY …`
- `job-archive scan <repo> [--since …]`
- `job-archive summarize <repo> [--since …]`
- `job-archive export --professional`

Forbidden via this service:

- `jira_create_issue` / any create path
- Slack worker / approval tools
- Propose-to-Jira (until an explicit n8n outbox exists)

No custom MCP server is required for the current scope.
