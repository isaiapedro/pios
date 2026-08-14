from __future__ import annotations

from pathlib import Path

from config import AppConfig
from domain.models import ScanResult
from infrastructure.git_client import GitClient


class CodeScanner:
    def __init__(self, git_client: GitClient, config: AppConfig):
        self.git_client = git_client
        self.config = config

    def scan(self, repository: str | Path, since: str | None = None, include_diff: bool = True) -> ScanResult:
        limits = self.config.sanitization
        scan = self.config.scan
        result = self.git_client.scan(
            repository=repository,
            since=since or scan.default_since,
            max_commits=limits.max_commits,
            max_files=limits.max_files,
            max_diff_bytes=limits.max_diff_bytes,
            max_diff_stat_lines=scan.max_diff_stat_lines,
            include_diff=include_diff,
        )
        if len(result.changed_files) > limits.max_files:
            result.changed_files = result.changed_files[: limits.max_files]
        if len(result.commits) > limits.max_commits:
            result.commits = result.commits[: limits.max_commits]
        return result
