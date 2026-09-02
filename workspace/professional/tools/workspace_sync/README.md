# workspace-sync

Knowledge ingestion CLI — Slack DMs + Google Gemini Meet notes → `knowledge/`.

**Writes to:** `knowledge/slack/dms/` and `knowledge/calls/`  
**Reads from:** Slack API (DMs only) + Google Drive (Gemini notes only)  
**Never writes back** to Slack or Google.

## Layout

```text
src/                              application code
../../knowledge/slack/dms/        Slack DM exports (written here)
../../knowledge/calls/            Gemini Meet note exports (written here)
```

## Setup

```bash
cd workspace/professional/tools/workspace_sync
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env
```

Fill `.env`:
- `SLACK_USER_TOKEN` — Slack user token with scopes: `im:history im:read mpim:history mpim:read users:read`
- `GOOGLE_OAUTH_CREDENTIALS_PATH` — path to your Google OAuth2 client secrets JSON

## CLI

### status
```bash
workspace-sync status
```

### Sync Slack DMs (1:1 and group, no public channels)
```bash
workspace-sync slack dms
workspace-sync slack dms --since "3 days ago"
workspace-sync slack dms --since "2026-08-01"
```

### Sync Gemini Meet notes from Google Drive
```bash
workspace-sync gemini sync
workspace-sync gemini sync --since "14 days ago"
```

## Auth notes

**Slack:** Requires a *user token* (`xoxp-...`), not a bot token. Bot tokens cannot read DMs.  
Create a Slack app at api.slack.com, add OAuth scopes above, install to workspace, copy User OAuth Token.

**Google:** OAuth2 flow runs in browser on first use. Token cached at `token.json` next to credentials file.  
Scopes: `drive.readonly` + `documents.readonly`.

## Not in this CLI

| Action | Owner |
|--------|-------|
| Read Slack public channels | Not implemented — by design |
| Write to Slack | Forbidden |
| Read arbitrary Google Drive files | Not implemented — Gemini notes only |
| Write to Google Docs | Forbidden |
