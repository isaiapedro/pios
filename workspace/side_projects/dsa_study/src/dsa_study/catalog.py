"""Catalog normalization, resumable synchronization, and canonical topic registry."""

from __future__ import annotations

from datetime import UTC, datetime
from pathlib import Path
from typing import Any

from dsa_study.client import LeetCodeClient
from dsa_study.html_tools import extract_examples, sanitize_statement
from dsa_study.storage import catalog_path, checkpoint_path, read_json, write_json


def _now() -> str:
    return datetime.now(UTC).isoformat()


def normalize_catalog_question(question: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": str(question.get("questionFrontendId") or question.get("id") or ""),
        "slug": str(question.get("titleSlug") or ""),
        "title": str(question.get("title") or ""),
        "difficulty": str(question.get("difficulty") or "Unknown"),
        "paid_only": bool(question.get("paidOnly")),
        "acceptance_rate": question.get("acRate"),
        "topics": sorted(
            [{"slug": str(tag.get("slug") or ""), "name": str(tag.get("name") or "")} for tag in question.get("topicTags") or []],
            key=lambda tag: tag["slug"],
        ),
        "detail_status": "pending",
    }


def build_topics(problems: list[dict[str, Any]]) -> list[dict[str, Any]]:
    registry: dict[str, dict[str, Any]] = {}
    for problem in problems:
        for topic in problem.get("topics") or []:
            slug = topic.get("slug") or ""
            if not slug:
                continue
            entry = registry.setdefault(slug, {"slug": slug, "name": topic.get("name") or slug, "problem_count": 0})
            entry["problem_count"] += 1
    return sorted(registry.values(), key=lambda item: (item["name"].casefold(), item["slug"]))


def sync(root: Path, client: LeetCodeClient, *, resume: bool = False, page_size: int = 100) -> dict[str, Any]:
    existing = read_json(catalog_path(root), {}) if resume else {}
    existing_by_slug = {row["slug"]: row for row in existing.get("problems", []) if row.get("slug")}
    catalog_rows: list[dict[str, Any]] = []
    skip = 0
    while True:
        page, has_more, _total = client.catalog_page(skip, page_size)
        catalog_rows.extend(normalize_catalog_question(question) for question in page)
        if not has_more:
            break
        skip += len(page)
        if not page:
            raise RuntimeError("Catalog reported more pages but returned no questions.")

    problems: list[dict[str, Any]] = []
    for row in catalog_rows:
        old = existing_by_slug.get(row["slug"], {})
        if old.get("detail_status") in {"available", "unavailable"}:
            row.update({key: value for key, value in old.items() if key not in {"topics", "id", "title", "difficulty", "paid_only", "acceptance_rate"}})
        problems.append(row)
    document = {"synced_at": _now(), "source": "leetcode-public-graphql", "problems": problems, "topics": build_topics(problems)}
    write_json(catalog_path(root), document)

    checkpoint = read_json(checkpoint_path(root), {"completed_slugs": []}) if resume else {"completed_slugs": []}
    completed = set(checkpoint.get("completed_slugs") or [])
    for row in problems:
        slug = row["slug"]
        if not slug or slug in completed or row.get("paid_only"):
            if row.get("paid_only"):
                row["detail_status"] = "unavailable"
                row["detail_reason"] = "paid_only_public_sync"
            continue
        try:
            detail = client.detail(slug)
            if not detail or not detail.get("content"):
                row["detail_status"] = "unavailable"
                row["detail_reason"] = "not_publicly_readable"
            else:
                markup = str(detail["content"])
                row.update({
                    "detail_status": "available",
                    "statement_html": sanitize_statement(markup),
                    "examples": extract_examples(markup),
                    "sample_test_case": detail.get("sampleTestCase") or "",
                    "hints": detail.get("hints") or [],
                    "metadata": detail.get("metaData") or "",
                    "python_starter": next((snippet.get("code", "") for snippet in detail.get("codeSnippets") or [] if snippet.get("langSlug") == "python3"), ""),
                })
        except RuntimeError as error:
            row["detail_status"] = "error"
            row["detail_reason"] = str(error)
        # Failed requests deliberately remain outside the checkpoint so a later
        # `sync --resume` retries them instead of preserving a transient error.
        if row.get("detail_status") != "error":
            completed.add(slug)
        checkpoint = {"completed_slugs": sorted(completed), "updated_at": _now()}
        write_json(checkpoint_path(root), checkpoint)
        write_json(catalog_path(root), document)
    document["topics"] = build_topics(problems)
    write_json(catalog_path(root), document)
    return document
