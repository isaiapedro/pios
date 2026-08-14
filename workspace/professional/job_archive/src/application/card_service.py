from __future__ import annotations

from domain.models import NormalizedIssue, utc_now
from infrastructure.storage import LocalStorage


class CardService:
    def __init__(self, storage: LocalStorage):
        self.storage = storage

    def mirror(self, issue: NormalizedIssue, execution_summary: str | None = None) -> str:
        existing = self.storage.read_card(issue.key)
        tracking_lines = extract_section_lines(existing, "## Code Tracking Log") if existing else []
        if execution_summary:
            tracking_lines.append(f"- {utc_now()[:10]} — {execution_summary}")
        if not tracking_lines:
            tracking_lines = ["- None recorded."]
        markdown = render_card(
            key=issue.key,
            title=issue.title,
            description=issue.description,
            status=issue.status,
            tracking_lines=tracking_lines,
        )
        path = self.storage.write_card(issue.key, markdown)
        return str(path)

    def append_tracking(self, key: str, summary: str) -> str:
        content = self.show(key)
        tracking_lines = extract_section_lines(content, "## Code Tracking Log")
        tracking_lines = [line for line in tracking_lines if line.strip() != "- None recorded."]
        tracking_lines.append(f"- {utc_now()[:10]} — {summary}")
        rebuilt = replace_section(content, "## Code Tracking Log", tracking_lines)
        self.storage.write_card(key, rebuilt)
        return rebuilt

    def show(self, key: str) -> str:
        content = self.storage.read_card(key)
        if content is None:
            raise FileNotFoundError(f"no local card mirror for {key}")
        return content

    def list_keys(self) -> list[str]:
        return [path.stem for path in self.storage.list_cards()]


def render_card(
    key: str,
    title: str,
    description: str,
    status: str,
    tracking_lines: list[str],
) -> str:
    return "\n".join(
        [
            f"# {key}: {title}",
            "",
            "## Description",
            "",
            description or "Sanitized description.",
            "",
            "## Status",
            "",
            status,
            "",
            "## Code Tracking Log",
            "",
            *tracking_lines,
            "",
            "## External References",
            "",
            f"- Jira key: {key}",
            "- Card creation/approval: company n8n workflow",
            "",
        ]
    )


def extract_section_lines(markdown: str, heading: str) -> list[str]:
    lines = markdown.splitlines()
    collecting = False
    collected: list[str] = []
    for line in lines:
        if line.strip() == heading:
            collecting = True
            continue
        if collecting and line.startswith("## "):
            break
        if collecting and line.strip():
            collected.append(line)
    return collected


def replace_section(markdown: str, heading: str, body_lines: list[str]) -> str:
    lines = markdown.splitlines()
    start = None
    end = len(lines)
    for index, line in enumerate(lines):
        if line.strip() == heading:
            start = index
            continue
        if start is not None and index > start and line.startswith("## "):
            end = index
            break
    if start is None:
        return markdown.rstrip() + "\n\n" + heading + "\n\n" + "\n".join(body_lines) + "\n"
    rebuilt = lines[: start + 1] + [""] + body_lines + [""] + lines[end:]
    text = "\n".join(rebuilt)
    return text if text.endswith("\n") else text + "\n"
