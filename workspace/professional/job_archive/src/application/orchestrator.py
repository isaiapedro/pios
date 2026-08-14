from __future__ import annotations

from pathlib import Path
from typing import Any

from application.card_service import CardService
from config import AppConfig, load_config
from domain.models import NormalizedIssue, utc_now
from domain.policies import assert_existing_key
from infrastructure.git_client import GitClient
from infrastructure.jira_client import JiraClient
from infrastructure.storage import LocalStorage
from processing.code_scanner import CodeScanner
from processing.sanitizer import Sanitizer
from processing.summarizer import Summarizer


class Orchestrator:
    def __init__(self, config: AppConfig | None = None, storage: LocalStorage | None = None):
        self.config = config or load_config()
        self.storage = storage or LocalStorage(self.config.root)
        self.sanitizer = Sanitizer(self.config.sanitization.proprietary_patterns)
        self.scanner = CodeScanner(GitClient(), self.config)
        self.summarizer = Summarizer(self.sanitizer)
        self.cards = CardService(self.storage)
        self.jira = JiraClient(
            self.config.jira.base_url,
            self.config.jira.email,
            self.config.jira.api_token,
        )

    def status(self) -> dict[str, Any]:
        keys = self.cards.list_keys()
        return {
            "root": str(self.config.root),
            "cards": keys,
            "card_count": len(keys),
            "repositories": self.config.repositories,
            "jira_project": self.config.jira.project_key,
            "sync_jql": self.config.jira.sync_jql,
            "sync_state": self.storage.sync_state(),
        }

    def scan(self, repository: str, since: str | None = None) -> dict[str, Any]:
        result = self.scanner.scan(repository, since=since, include_diff=False)
        return {
            "repository": result.repository,
            "commit_count": len(result.commits),
            "changed_files": self.sanitizer.sanitize_paths(result.changed_files),
            "commits": [
                {
                    "sha": item["sha"][:12],
                    "subject": self.sanitizer.sanitize(item["subject"]),
                    "date": item["date"],
                }
                for item in result.commits
            ],
            "diff_stats": self.sanitizer.sanitize(result.diff_stats),
        }

    def get_sanitized_work_summary(self, repository: str, since: str | None = None) -> str:
        result = self.scanner.scan(repository, since=since, include_diff=True)
        summary = self.summarizer.summarize(result)
        self.storage.append_event(
            {
                "at": utc_now(),
                "action": "summarize",
                "repository": str(Path(repository).expanduser().resolve()),
                "commit_count": len(result.commits),
                "file_count": len(result.changed_files),
            }
        )
        return summary

    def read_local_card(self, key: str) -> str:
        return self.cards.show(assert_existing_key(key))

    def cards_sync(self, keys: list[str] | None = None) -> list[str]:
        if keys:
            issues = [self.jira.get_card(assert_existing_key(key)) for key in keys]
        else:
            issues = self.jira.search_cards(
                self.config.jira.sync_jql,
                max_results=self.config.jira.max_results,
            )
        mirrored = []
        for issue in issues:
            sanitized = sanitize_issue(self.sanitizer, issue)
            path = self.cards.mirror(sanitized)
            mirrored.append(path)
            self.storage.append_event(
                {
                    "at": utc_now(),
                    "action": "card_synced",
                    "key": issue.key,
                    "status": issue.status,
                }
            )
        self.storage.update_sync_state(
            jira_cursor=utc_now(),
            last_card_sync=utc_now(),
            last_sync_count=len(mirrored),
        )
        return mirrored

    def update_card(
        self,
        key: str,
        summary: str | None = None,
        description: str | None = None,
        status: str | None = None,
        comment: str | None = None,
        tracking: str | None = None,
        push_comment: bool = True,
    ) -> dict[str, Any]:
        key = assert_existing_key(key)
        fields: dict[str, str] = {}
        if summary is not None:
            fields["summary"] = self.sanitizer.sanitize(summary)
        if description is not None:
            fields["description"] = self.sanitizer.sanitize(description)
        issue: NormalizedIssue | None = None
        if fields:
            issue = self.jira.update_card(key, fields)
        if status is not None:
            issue = self.jira.transition_card(key, status)
        if issue is None:
            issue = self.jira.get_card(key)
        sanitized = sanitize_issue(self.sanitizer, issue)
        self.cards.mirror(sanitized)
        sanitized_comment = self.sanitizer.sanitize(comment) if comment else None
        if sanitized_comment and push_comment:
            self.jira.add_comment(key, sanitized_comment)
        tracking_text = tracking or sanitized_comment
        if tracking_text:
            self.cards.append_tracking(key, tracking_text)
        self.storage.archive_execution(key, "updated", tracking_text or status or "fields")
        self.storage.append_event(
            {
                "at": utc_now(),
                "action": "card_updated",
                "key": key,
                "status": sanitized.status,
                "has_comment": bool(sanitized_comment),
            }
        )
        return {
            "key": sanitized.key,
            "title": sanitized.title,
            "status": sanitized.status,
            "local_card": str(self.storage.cards_dir / f"{sanitized.key}.md"),
        }

    def professional_export(self) -> dict[str, Any]:
        cards = []
        for key in self.cards.list_keys():
            content = self.cards.show(key)
            status_line = "Unknown"
            lines = content.splitlines()
            for index, line in enumerate(lines):
                if line.strip() == "## Status" and index + 2 < len(lines):
                    status_line = lines[index + 2].strip() or "Unknown"
                    break
            cards.append({"key": key, "status": status_line})
        return {
            "active_work_themes": [self.config.jira.project_key],
            "jira_card_states": cards,
            "blockers_and_milestones": [
                item for item in cards if item["status"].lower() in {"blocked", "impediment"}
            ],
        }


def sanitize_issue(sanitizer: Sanitizer, issue: NormalizedIssue) -> NormalizedIssue:
    return NormalizedIssue(
        key=issue.key,
        title=sanitizer.sanitize(issue.title),
        description=sanitizer.sanitize(issue.description),
        status=issue.status,
    )
