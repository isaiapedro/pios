from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


def _default_knowledge_root() -> str:
    api_dir = Path(__file__).resolve().parent
    try:
        repo_root = api_dir.parents[4]
        candidate = repo_root / "knowledge"
        if candidate.is_dir():
            return str(candidate)
    except IndexError:
        pass
    return "/knowledge"


def _default_personal_transcripts() -> str:
    api_dir = Path(__file__).resolve().parent
    try:
        repo_root = api_dir.parents[4]
        candidate = repo_root / "personal" / "transcripts"
        candidate.mkdir(parents=True, exist_ok=True)
        return str(candidate)
    except IndexError:
        pass
    return "./personal/transcripts"


def _default_personal_memos() -> str:
    api_dir = Path(__file__).resolve().parent
    try:
        repo_root = api_dir.parents[4]
        candidate = repo_root / "personal" / "memo"
        candidate.mkdir(parents=True, exist_ok=True)
        return str(candidate)
    except IndexError:
        pass
    return "./personal/memo"


def _default_personal_insights() -> str:
    api_dir = Path(__file__).resolve().parent
    try:
        repo_root = api_dir.parents[4]
        candidate = repo_root / "personal" / "insights"
        if candidate.is_dir():
            return str(candidate)
    except IndexError:
        pass
    return "./personal/insights"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    database_url: str = "postgresql+asyncpg://postgres:password@localhost:5432/pios"
    ollama_host: str = "http://localhost:11434"
    ollama_extract_model: str = "llama3.2"
    ollama_embed_model: str = "nomic-embed-text"
    # Scheduling/allocation needs more reliable constrained reasoning than
    # per-memo feature extraction — llama3.2 (3B) returned empty, self-
    # contradictory plans on real goal data. qwen3:8b is already pulled locally.
    ollama_planning_model: str = "qwen3:8b"
    personal_transcripts_path: str = _default_personal_transcripts()
    personal_memos_path: str = _default_personal_memos()
    personal_insights_path: str = _default_personal_insights()
    whisper_model: str = "large-v3"
    whisper_device: str = "cpu"
    whisper_compute_type: str = "int8"
    google_credentials_path: str = "./credentials/google_client_secret.json"
    google_token_path: str = "./credentials/google_token.json"
    # First entry is the write target (DEFAULT_CALENDAR_ID) — only isaiacontato@gmail.com
    # has writer access under the current OAuth grant; the others are read-only context.
    google_calendar_ids: str = (
        "isaiacontato@gmail.com,pedro.souza@petlove.com.br,pedrosouza@estudante.ufscar.br"
    )
    knowledge_root_path: str = _default_knowledge_root()
    planning_horizon_days: int = 7
    max_daily_exploration_minutes: int = 240
    planning_repair_attempts: int = 3


settings = Settings()
