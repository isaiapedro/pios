from __future__ import annotations

import subprocess
from pathlib import Path

from domain.models import ScanResult


class GitClient:
    def __init__(self, timeout_seconds: int = 30):
        self.timeout_seconds = timeout_seconds

    def scan(
        self,
        repository: str | Path,
        since: str,
        max_commits: int,
        max_files: int,
        max_diff_bytes: int,
        max_diff_stat_lines: int,
        include_diff: bool = True,
    ) -> ScanResult:
        repo = Path(repository).expanduser().resolve()
        if not (repo / ".git").exists():
            raise FileNotFoundError(f"not a git repository: {repo}")
        commits = self._commits(repo, since, max_commits)
        changed_files = self._changed_files(repo, since)[:max_files]
        diff_stats = self._bounded_output(
            repo,
            ["log", since_range(since), f"--max-count={max_commits}", "--stat", "--pretty=format:%h %s"],
            max_diff_stat_lines * 240,
        )
        if max_diff_stat_lines:
            diff_stats = "\n".join(diff_stats.splitlines()[:max_diff_stat_lines])
        diff_excerpt = ""
        if include_diff:
            diff_excerpt = self._bounded_output(
                repo,
                ["log", since_range(since), f"--max-count={max_commits}", "-p"],
                max_diff_bytes,
            )
        return ScanResult(
            repository=str(repo),
            commits=commits,
            changed_files=changed_files,
            diff_stats=diff_stats,
            diff_excerpt=diff_excerpt,
        )

    def _commits(self, repo: Path, since: str, max_commits: int) -> list[dict[str, str]]:
        output = self._run(
            repo,
            [
                "log",
                since_range(since),
                f"--max-count={max_commits}",
                "--pretty=format:%H%x09%an%x09%ad%x09%s",
                "--date=iso-strict",
            ],
        )
        commits = []
        for line in output.splitlines():
            parts = line.split("\t", 3)
            if len(parts) != 4:
                continue
            sha, author, date, subject = parts
            commits.append({"sha": sha, "author": author, "date": date, "subject": subject})
        return commits

    def _changed_files(self, repo: Path, since: str) -> list[str]:
        output = self._run(repo, ["log", since_range(since), "--name-only", "--pretty=format:"])
        files: list[str] = []
        seen: set[str] = set()
        for line in output.splitlines():
            path = line.strip()
            if not path or path in seen:
                continue
            seen.add(path)
            files.append(path)
        return files

    def _bounded_output(self, repo: Path, args: list[str], max_bytes: int) -> str:
        output = self._run(repo, args)
        encoded = output.encode("utf-8", errors="replace")
        if len(encoded) <= max_bytes:
            return output
        return encoded[:max_bytes].decode("utf-8", errors="replace") + "\n[truncated]"

    def _run(self, repo: Path, args: list[str]) -> str:
        completed = subprocess.run(
            ["git", "-C", str(repo), *args],
            check=False,
            capture_output=True,
            text=True,
            timeout=self.timeout_seconds,
        )
        if completed.returncode != 0:
            raise RuntimeError(completed.stderr.strip() or f"git {' '.join(args)} failed")
        return completed.stdout


def since_range(since: str) -> str:
    if since.startswith("--"):
        return since
    return f"--since={since}"
