from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml

PROJECT_ROOT = Path(__file__).resolve().parent.parent


@dataclass
class JiraConfig:
    project_key: str = "PROJ"
    sync_jql: str = ""
    max_results: int = 50
    base_url: str = ""
    email: str = ""
    api_token: str = ""


@dataclass
class SanitizationConfig:
    max_diff_bytes: int = 65536
    max_files: int = 50
    max_commits: int = 20
    proprietary_patterns: list[str] = field(default_factory=list)


@dataclass
class ScanConfig:
    max_diff_stat_lines: int = 200
    default_since: str = "7 days ago"


@dataclass
class AppConfig:
    root: Path
    jira: JiraConfig
    repositories: list[str]
    sanitization: SanitizationConfig
    scan: ScanConfig


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text().splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def load_config(root: Path | None = None) -> AppConfig:
    root = Path(root) if root else PROJECT_ROOT
    load_env_file(root / ".env")
    raw: dict[str, Any] = {}
    config_path = root / "config.yaml"
    if config_path.exists():
        loaded = yaml.safe_load(config_path.read_text()) or {}
        if not isinstance(loaded, dict):
            raise ValueError("config.yaml must be a mapping")
        raw = loaded
    jira_raw = raw.get("jira") or {}
    sanitization_raw = raw.get("sanitization") or {}
    scan_raw = raw.get("scan") or {}
    project_key = str(jira_raw.get("project_key") or "PROJ")
    default_jql = (
        f'assignee = currentUser() AND project = {project_key} '
        "AND resolution = EMPTY ORDER BY updated DESC"
    )
    return AppConfig(
        root=root,
        jira=JiraConfig(
            project_key=project_key,
            sync_jql=str(jira_raw.get("sync_jql") or default_jql),
            max_results=int(jira_raw.get("max_results") or 50),
            base_url=os.environ.get("JIRA_BASE_URL", "").rstrip("/"),
            email=os.environ.get("JIRA_EMAIL", ""),
            api_token=os.environ.get("JIRA_API_TOKEN", ""),
        ),
        repositories=[str(item) for item in (raw.get("repositories") or [])],
        sanitization=SanitizationConfig(
            max_diff_bytes=int(sanitization_raw.get("max_diff_bytes") or 65536),
            max_files=int(sanitization_raw.get("max_files") or 50),
            max_commits=int(sanitization_raw.get("max_commits") or 20),
            proprietary_patterns=list(sanitization_raw.get("proprietary_patterns") or []),
        ),
        scan=ScanConfig(
            max_diff_stat_lines=int(scan_raw.get("max_diff_stat_lines") or 200),
            default_since=str(scan_raw.get("default_since") or "7 days ago"),
        ),
    )
