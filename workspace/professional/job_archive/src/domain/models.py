from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


@dataclass
class NormalizedIssue:
    key: str
    title: str
    description: str
    status: str


@dataclass
class ScanResult:
    repository: str
    commits: list[dict[str, str]]
    changed_files: list[str]
    diff_stats: str
    diff_excerpt: str


@dataclass
class CardUpdate:
    key: str
    summary: str | None = None
    description: str | None = None
    status: str | None = None
    comment: str | None = None
