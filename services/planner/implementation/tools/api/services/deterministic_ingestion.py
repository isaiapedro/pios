"""Deterministic ingestion — processes existing .txt transcripts without Whisper or Ollama.

Rule-based feature extraction: keyword scoring for mood/energy, frequency-based topic
extraction, regex entity detection, and paragraph-first-sentence key takeaways.
"""
from __future__ import annotations

import json
import re
import uuid
from pathlib import Path
from collections import Counter

import aiofiles

from config import settings
from database import AsyncSessionLocal
from schemas import Entity, MemoFeatures, SentimentType

from sqlalchemy import text


# ── Lexicons ──────────────────────────────────────────────────────────────────

_POSITIVE_AFFECT = {
    "bem", "feliz", "ótimo", "bom", "boa", "alegre", "animado", "animada", "tranquilo",
    "tranquila", "energia", "motivado", "motivada", "positivo", "positiva", "produtivo",
    "produtiva", "calmo", "calma", "satisfeito", "satisfeita", "descansado", "descansada",
    "consegui", "aprendi", "avancei", "completei", "termitinei", "gostei", "amei",
    "empolgado", "empolgada", "focado", "focada", "confiante", "inspired", "happy",
    "great", "good", "calm", "focused", "motivated", "productive", "rested", "energy",
    "accomplished", "finished", "learned", "progress", "confident",
}

_NEGATIVE_AFFECT = {
    "cansado", "cansada", "mal", "ruim", "triste", "ansioso", "ansiosa", "estressado",
    "estressada", "frustrado", "frustrada", "perdido", "perdida", "difícil", "difíceis",
    "problema", "problemas", "travado", "travada", "sem energia", "preguiça", "adiando",
    "atrasado", "atrasada", "preocupado", "preocupada", "sobrecarregado", "sobrecarregada",
    "tired", "bad", "sad", "anxious", "stressed", "frustrated", "lost", "stuck", "hard",
    "difficult", "problem", "procrastinating", "late", "worried", "overwhelmed", "drained",
}

_ENERGY_HIGH = {
    "energia", "ativo", "ativa", "acelerado", "acelerada", "praticando", "treinando",
    "nadei", "corri", "academia", "yoga", "focado", "trabalhando", "produzindo",
    "energy", "active", "training", "swimming", "running", "gym", "working", "productive",
}

_ENERGY_LOW = {
    "cansado", "cansada", "sonolento", "sonolenta", "dormindo", "descansando", "preguiça",
    "lento", "lenta", "exausto", "exausta", "sem disposição", "parado", "parada",
    "tired", "sleepy", "sleeping", "resting", "lazy", "slow", "exhausted", "sluggish",
}

_STOPWORDS = {
    "a", "as", "o", "os", "de", "da", "do", "das", "dos", "e", "em", "na", "no", "nas",
    "nos", "por", "para", "com", "que", "se", "um", "uma", "uns", "umas", "é", "são",
    "foi", "ser", "ter", "eu", "me", "meu", "minha", "você", "ele", "ela", "isso",
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with",
    "is", "was", "are", "were", "be", "been", "have", "had", "i", "me", "my", "you",
    "he", "she", "it", "we", "they", "this", "that", "so", "just", "also", "like",
}


# ── Feature extraction ────────────────────────────────────────────────────────

def _extract_mood_energy(text: str) -> tuple[float, float]:
    words = re.findall(r"\b\w+\b", text.lower())
    pos = sum(1 for w in words if w in _POSITIVE_AFFECT)
    neg = sum(1 for w in words if w in _NEGATIVE_AFFECT)
    total = pos + neg or 1
    mood = max(0.1, min(0.95, 0.5 + (pos - neg) / (2 * total)))

    hi = sum(1 for w in words if w in _ENERGY_HIGH)
    lo = sum(1 for w in words if w in _ENERGY_LOW)
    etotal = hi + lo or 1
    energy = max(0.1, min(0.95, 0.5 + (hi - lo) / (2 * etotal)))
    return round(mood, 2), round(energy, 2)


def _extract_sentiment(mood: float) -> SentimentType:
    if mood >= 0.6:
        return SentimentType.positive
    if mood <= 0.4:
        return SentimentType.negative
    return SentimentType.neutral


def _extract_topics(text: str, n: int = 6) -> list[str]:
    words = re.findall(r"\b[a-zA-ZÀ-ú]{4,}\b", text.lower())
    filtered = [w for w in words if w not in _STOPWORDS]
    counts = Counter(filtered)
    return [w for w, _ in counts.most_common(n)]


def _extract_entities(text: str) -> list[Entity]:
    entities: list[Entity] = []
    seen: set[str] = set()

    # Capitalized multi-word spans (likely names / proper nouns)
    for m in re.finditer(r"\b([A-ZÁÉÍÓÚ][a-záéíóúçã]+(?:\s+[A-ZÁÉÍÓÚ][a-záéíóúçã]+)+)\b", text):
        name = m.group(1).strip()
        if name not in seen:
            seen.add(name)
            entities.append(Entity(name=name, type="person"))

    # Common project/concept patterns (capitalized single words not at sentence start)
    for m in re.finditer(r"(?<!\.\s)(?<!\n)([A-Z][A-Z0-9]{2,})\b", text):
        name = m.group(1)
        if name not in seen and len(name) >= 3:
            seen.add(name)
            entities.append(Entity(name=name, type="project"))

    return entities[:10]


def _extract_takeaways(text: str, n: int = 3) -> list[str]:
    paragraphs = [p.strip() for p in re.split(r"\n{2,}", text) if p.strip()]
    takeaways: list[str] = []
    verb_pattern = re.compile(r"\b(fiz|fui|estou|estava|aprendi|consegui|preciso|quero|vou|tenho|"
                              r"did|went|am|was|learned|need|want|will|have|got|started|finished)\b",
                              re.IGNORECASE)
    for para in paragraphs:
        sentences = re.split(r"(?<=[.!?])\s+", para)
        for sent in sentences:
            if verb_pattern.search(sent) and len(sent) > 20:
                takeaways.append(sent.strip())
                break
        if len(takeaways) >= n:
            break

    if not takeaways:
        # Fallback: first N sentences of the transcript
        all_sents = re.split(r"(?<=[.!?])\s+", text)
        takeaways = [s.strip() for s in all_sents[:n] if len(s.strip()) > 20]

    return takeaways


# ── Embedding stub (zero vector — no Ollama dependency) ───────────────────────

def _zero_embedding(dim: int = 768) -> str:
    return "[" + ",".join(["0.00000000"] * dim) + "]"


# ── Main ingestion entry point ────────────────────────────────────────────────

async def ingest_transcript_file(
    txt_path: Path,
    obs_id: str | None = None,
    event_title: str | None = None,
) -> str:
    """Ingest a pre-transcribed .txt file into DB + vault memo without Ollama."""
    from services import vault as vault_svc
    from services.pipeline import _recompute_metrics

    if obs_id is None:
        # Derive obs_id from filename if it looks like a UUID, else generate new
        stem = txt_path.stem
        try:
            uuid.UUID(stem)
            obs_id = stem
        except ValueError:
            obs_id = str(uuid.uuid4())

    async with aiofiles.open(txt_path, encoding="utf-8") as f:
        transcript = await f.read()

    transcript = transcript.strip()
    if not transcript:
        raise ValueError(f"Empty transcript: {txt_path}")

    mood, energy = _extract_mood_energy(transcript)
    sentiment = _extract_sentiment(mood)
    topics = _extract_topics(transcript)
    entities = _extract_entities(transcript)
    takeaways = _extract_takeaways(transcript)

    features = MemoFeatures(
        mood=mood,
        energy=energy,
        topics=topics,
        entities=entities,
        sentiment=sentiment,
        key_takeaways=takeaways,
    )

    embedding_str = _zero_embedding()
    interp_id = str(uuid.uuid4())

    async with AsyncSessionLocal() as db:
        # Check if already ingested
        exists = await db.execute(
            text("SELECT 1 FROM observations WHERE id = CAST(:id AS uuid)"),
            {"id": obs_id},
        )
        if exists.fetchone():
            return obs_id  # Already in DB — idempotent

        await db.execute(
            text(
                "INSERT INTO observations (id, source_type, file_path, payload) "
                "VALUES (CAST(:id AS uuid), 'audio', NULL, CAST(:payload AS jsonb)) "
                "ON CONFLICT (id) DO NOTHING"
            ),
            {
                "id": obs_id,
                "payload": json.dumps({
                    "transcript_path": str(txt_path),
                    "event_title": event_title,
                    "ingestion": "deterministic",
                }),
            },
        )

        await db.execute(
            text(
                "INSERT INTO interpretations "
                "(id, obs_id, transcript, embedding, mood, energy, "
                " topics, sentiment, key_takeaways) "
                "VALUES (CAST(:id AS uuid), CAST(:obs_id AS uuid), :transcript, "
                "        CAST(:embedding AS vector), :mood, :energy, "
                "        :topics, CAST(:sentiment AS sentiment_t), :takeaways)"
            ),
            {
                "id": interp_id,
                "obs_id": obs_id,
                "transcript": transcript,
                "embedding": embedding_str,
                "mood": features.mood,
                "energy": features.energy,
                "topics": features.topics,
                "sentiment": features.sentiment.value,
                "takeaways": features.key_takeaways,
            },
        )

        for entity in features.entities:
            ent_result = await db.execute(
                text(
                    "INSERT INTO graph_entities (name, category) "
                    "VALUES (:name, CAST(:cat AS entity_cat)) "
                    "ON CONFLICT (name, category) "
                    "DO UPDATE SET name = EXCLUDED.name "
                    "RETURNING id"
                ),
                {"name": entity.name, "cat": entity.type},
            )
            entity_id = str(ent_result.fetchone()[0])
            await db.execute(
                text(
                    "INSERT INTO evidence_store (entity_id, obs_id, interp_id) "
                    "VALUES (CAST(:eid AS uuid), CAST(:oid AS uuid), CAST(:iid AS uuid))"
                ),
                {"eid": entity_id, "oid": obs_id, "iid": interp_id},
            )

        await db.commit()

    await vault_svc.write_memo(obs_id, event_title, transcript, features)
    await _recompute_metrics()

    return obs_id
