from __future__ import annotations

import re
from functools import lru_cache

SECRET_PATTERNS: tuple[tuple[str, str], ...] = (
    (r"(?i)(api[_-]?key\s*[=:]\s*)(['\"]?)[^\s'\"]+", r"\1\2[REDACTED]"),
    (r"(?i)(secret\s*[=:]\s*)(['\"]?)[^\s'\"]+", r"\1\2[REDACTED]"),
    (r"(?i)(password\s*[=:]\s*)(['\"]?)[^\s'\"]+", r"\1\2[REDACTED]"),
    (r"(?i)(token\s*[=:]\s*)(['\"]?)[^\s'\"]+", r"\1\2[REDACTED]"),
    (r"(?i)(bearer\s+)[a-z0-9._\-]+", r"\1[REDACTED]"),
    (r"AKIA[0-9A-Z]{16}", "[REDACTED_AWS_KEY]"),
    (r"(?i)(aws_secret_access_key\s*[=:]\s*)(['\"]?)[^\s'\"]+", r"\1\2[REDACTED]"),
    (r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----[\s\S]+?-----END (?:RSA |EC |OPENSSH )?PRIVATE KEY-----", "[REDACTED_PRIVATE_KEY]"),
    (r"(?i)(postgres(?:ql)?|mysql|mongodb|redis|amqp)://[^\s'\"]+", "[REDACTED_DB_URL]"),
    (r"(?i)jdbc:[a-z0-9]+://[^\s'\"]+", "[REDACTED_DB_URL]"),
    (r"https?://[^/\s]+:[^@/\s]+@[^\s'\"]+", "[REDACTED_URL]"),
    (r"xox[baprs]-[A-Za-z0-9-]+", "[REDACTED_SLACK_TOKEN]"),
    (r"ghp_[A-Za-z0-9]{20,}", "[REDACTED_GITHUB_TOKEN]"),
    (r"github_pat_[A-Za-z0-9_]{20,}", "[REDACTED_GITHUB_TOKEN]"),
    (r"eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}", "[REDACTED_JWT]"),
    (r"(?i)(-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----)", "[REDACTED_CERTIFICATE]"),
)


class Sanitizer:
    def __init__(self, proprietary_patterns: list[str] | None = None):
        self.proprietary_patterns = proprietary_patterns or []

    def sanitize(self, text: str) -> str:
        cleaned = text
        for pattern, replacement in SECRET_PATTERNS:
            cleaned = compiled(pattern).sub(replacement, cleaned)
        for pattern in self.proprietary_patterns:
            cleaned = compiled(pattern).sub("[REDACTED_PROPRIETARY]", cleaned)
        return cleaned

    def sanitize_paths(self, paths: list[str]) -> list[str]:
        return [self.sanitize(path) for path in paths]


@lru_cache(maxsize=64)
def compiled(pattern: str) -> re.Pattern[str]:
    return re.compile(pattern)
