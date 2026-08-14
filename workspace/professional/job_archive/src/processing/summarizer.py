from __future__ import annotations

from domain.models import ScanResult
from processing.sanitizer import Sanitizer


class Summarizer:
    def __init__(self, sanitizer: Sanitizer):
        self.sanitizer = sanitizer

    def summarize(self, scan: ScanResult) -> str:
        files = self.sanitizer.sanitize_paths(scan.changed_files)
        commits = [
            self.sanitizer.sanitize(f"{item['sha'][:8]} {item['subject']}")
            for item in scan.commits
        ]
        stats = self.sanitizer.sanitize(scan.diff_stats)
        lines = [
            f"repository: {scan.repository}",
            f"commits: {len(scan.commits)}",
            f"files: {len(files)}",
        ]
        if commits:
            lines.append("recent commits:")
            lines.extend(f"- {item}" for item in commits[:10])
        if files:
            lines.append("changed files:")
            lines.extend(f"- {item}" for item in files[:20])
        if stats:
            lines.append("diff stats:")
            lines.append(stats)
        return "\n".join(lines)
