from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from domain.models import utc_now


class LocalStorage:
    def __init__(self, root: Path):
        self.root = Path(root)
        self.archive_dir = self.root / "archive"
        self.executions_archive = self.archive_dir / "executions"
        self.state_dir = self.root / "state"
        self.cards_dir = self.root / "cards"
        self.event_log_path = self.state_dir / "event_log.jsonl"
        self.sync_state_path = self.state_dir / "sync_state.json"
        for path in (self.executions_archive, self.state_dir, self.cards_dir):
            path.mkdir(parents=True, exist_ok=True)
        if not self.event_log_path.exists():
            self.event_log_path.touch()
        if not self.sync_state_path.exists():
            atomic_write_json(self.sync_state_path, {"jira_cursor": None, "last_card_sync": None})

    def list_cards(self) -> list[Path]:
        return sorted(self.cards_dir.glob("*.md"))

    def write_card(self, key: str, markdown: str) -> Path:
        path = self.cards_dir / f"{key}.md"
        path.write_text(markdown if markdown.endswith("\n") else markdown + "\n")
        return path

    def read_card(self, key: str) -> str | None:
        path = self.cards_dir / f"{key}.md"
        if not path.exists():
            return None
        return path.read_text()

    def append_event(self, event: dict[str, Any]) -> None:
        with self.event_log_path.open("a") as handle:
            handle.write(json.dumps(event, sort_keys=True) + "\n")

    def archive_execution(self, key: str, action: str, detail: str | None = None) -> None:
        stamp = utc_now().replace(":", "")
        atomic_write_json(
            self.executions_archive / f"{key}_{action}_{stamp}.json",
            {"key": key, "action": action, "detail": detail, "at": utc_now()},
        )

    def sync_state(self) -> dict[str, Any]:
        return json.loads(self.sync_state_path.read_text())

    def update_sync_state(self, **fields: Any) -> dict[str, Any]:
        current = self.sync_state()
        current.update(fields)
        atomic_write_json(self.sync_state_path, current)
        return current


def atomic_write_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(path.name + ".tmp")
    tmp.write_text(json.dumps(data, indent=2, sort_keys=True) + "\n")
    tmp.replace(path)
