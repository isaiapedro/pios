from __future__ import annotations


class JobArchiveError(Exception):
    pass


class PolicyViolation(JobArchiveError):
    pass


def assert_existing_key(key: str) -> str:
    cleaned = (key or "").strip().upper()
    if not cleaned or "-" not in cleaned:
        raise PolicyViolation(f"invalid Jira key: {key!r}")
    return cleaned
