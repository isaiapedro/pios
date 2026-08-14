from __future__ import annotations

import json
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

from domain.models import NormalizedIssue
from domain.policies import PolicyViolation


class JiraClient:
    def __init__(self, base_url: str, email: str, api_token: str):
        self.base_url = base_url.rstrip("/")
        self.email = email
        self.api_token = api_token

    def get_card(self, key: str) -> NormalizedIssue:
        response = self._request("GET", f"/rest/api/2/issue/{key}")
        return normalize_issue(response)

    def search_cards(self, jql: str, max_results: int = 50) -> list[NormalizedIssue]:
        query = urllib.parse.urlencode(
            {
                "jql": jql,
                "maxResults": str(max_results),
                "fields": "summary,description,status",
            }
        )
        response = self._request("GET", f"/rest/api/2/search?{query}")
        issues = response.get("issues") or []
        return [normalize_issue(item) for item in issues if isinstance(item, dict)]

    def update_card(self, key: str, fields: dict[str, Any]) -> NormalizedIssue:
        if not fields:
            raise PolicyViolation("update_card requires at least one field")
        self._request("PUT", f"/rest/api/2/issue/{key}", {"fields": fields})
        return self.get_card(key)

    def add_comment(self, key: str, body: str) -> None:
        self._request("POST", f"/rest/api/2/issue/{key}/comment", {"body": body})

    def transition_card(self, key: str, status_name: str) -> NormalizedIssue:
        payload = self._request("GET", f"/rest/api/2/issue/{key}/transitions")
        transitions = payload.get("transitions") or []
        match = None
        wanted = status_name.strip().lower()
        for item in transitions:
            name = str(item.get("name") or "")
            to_name = str((item.get("to") or {}).get("name") or "")
            if name.lower() == wanted or to_name.lower() == wanted:
                match = item
                break
        if match is None:
            available = ", ".join(
                str(item.get("name") or (item.get("to") or {}).get("name") or "?")
                for item in transitions
            )
            raise PolicyViolation(f"no transition to {status_name!r}; available: {available}")
        self._request(
            "POST",
            f"/rest/api/2/issue/{key}/transitions",
            {"transition": {"id": str(match["id"])}},
        )
        return self.get_card(key)

    def _request(self, method: str, path: str, body: dict[str, Any] | None = None) -> dict[str, Any]:
        if not self.base_url or not self.email or not self.api_token:
            raise RuntimeError("Jira credentials are not configured")
        data = None if body is None else json.dumps(body).encode("utf-8")
        request = urllib.request.Request(
            f"{self.base_url}{path}",
            data=data,
            method=method,
            headers={"Content-Type": "application/json", "Accept": "application/json"},
        )
        password_mgr = urllib.request.HTTPPasswordMgrWithDefaultRealm()
        password_mgr.add_password(None, self.base_url, self.email, self.api_token)
        opener = urllib.request.build_opener(urllib.request.HTTPBasicAuthHandler(password_mgr))
        try:
            with opener.open(request, timeout=30) as response:
                raw = response.read().decode("utf-8")
        except urllib.error.HTTPError as error:
            detail = error.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"Jira {method} {path} failed: {error.code} {detail}") from error
        if not raw:
            return {}
        parsed = json.loads(raw)
        if not isinstance(parsed, dict):
            raise RuntimeError("Jira returned a non-object payload")
        return parsed


def normalize_issue(payload: dict[str, Any]) -> NormalizedIssue:
    fields = payload.get("fields") or {}
    description = fields.get("description")
    if not isinstance(description, str):
        description = ""
    status = fields.get("status") or {}
    return NormalizedIssue(
        key=str(payload.get("key") or ""),
        title=str(fields.get("summary") or ""),
        description=description,
        status=str(status.get("name") or "Unknown"),
    )
