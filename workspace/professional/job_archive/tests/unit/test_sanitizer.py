from processing.sanitizer import Sanitizer


def test_sanitizer_redacts_secrets_and_db_urls():
    sanitizer = Sanitizer(proprietary_patterns=[r"AcmeInternalWidget"])
    raw = "\n".join(
        [
            "api_key=sk-live-1234567890",
            "Authorization: Bearer abcdef.ghijklmnop",
            "postgres://user:pass@db.internal:5432/app",
            "https://alice:secret@git.example.com/repo.git",
            "-----BEGIN PRIVATE KEY-----",
            "ABC",
            "-----END PRIVATE KEY-----",
            "touch AcmeInternalWidget",
        ]
    )
    cleaned = sanitizer.sanitize(raw)
    assert "sk-live-1234567890" not in cleaned
    assert "abcdef.ghijklmnop" not in cleaned
    assert "postgres://user:pass@db.internal:5432/app" not in cleaned
    assert "alice:secret@" not in cleaned
    assert "BEGIN PRIVATE KEY" not in cleaned
    assert "AcmeInternalWidget" not in cleaned
    assert "[REDACTED" in cleaned
