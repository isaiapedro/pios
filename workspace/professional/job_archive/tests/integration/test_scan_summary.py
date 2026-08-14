from __future__ import annotations

import subprocess
from pathlib import Path

from application.orchestrator import Orchestrator
from config import AppConfig, JiraConfig, SanitizationConfig, ScanConfig
from infrastructure.storage import LocalStorage


def init_repo(path: Path) -> None:
    path.mkdir(parents=True)
    subprocess.run(["git", "init"], cwd=path, check=True, capture_output=True)
    subprocess.run(["git", "config", "user.email", "dev@example.com"], cwd=path, check=True)
    subprocess.run(["git", "config", "user.name", "Dev"], cwd=path, check=True)
    (path / "app.py").write_text("api_key=super-secret-value\nprint('ok')\n")
    subprocess.run(["git", "add", "app.py"], cwd=path, check=True)
    subprocess.run(["git", "commit", "-m", "add app"], cwd=path, check=True, capture_output=True)


def test_summarize_redacts_secret_from_diff(tmp_path):
    repo = tmp_path / "repo"
    init_repo(repo)
    root = tmp_path / "archive"
    root.mkdir()
    config = AppConfig(
        root=root,
        jira=JiraConfig(project_key="PROJ"),
        repositories=[str(repo)],
        sanitization=SanitizationConfig(max_diff_bytes=20000, max_files=20, max_commits=10),
        scan=ScanConfig(default_since="10 years ago"),
    )
    orchestrator = Orchestrator(config=config, storage=LocalStorage(root))
    summary = orchestrator.get_sanitized_work_summary(str(repo), since="10 years ago")
    assert "super-secret-value" not in summary
    assert "app.py" in summary
