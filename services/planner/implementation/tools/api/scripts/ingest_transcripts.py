"""Batch ingest pre-transcribed .txt files from the Personal domain.

Usage:
    python ingest_transcripts.py [--days N] [--dry-run]

Options:
    --days N         Process files modified within last N days (default: 7)
    --dry-run        List files that would be processed without touching the DB
"""
from __future__ import annotations

import argparse
import asyncio
import sys
from datetime import datetime, timedelta
from pathlib import Path

# Ensure the api/ directory is on sys.path so imports resolve
_HERE = Path(__file__).resolve().parent
_API_DIR = _HERE.parent
sys.path.insert(0, str(_API_DIR))

from config import settings
from services.deterministic_ingestion import ingest_transcript_file


async def main(days: int, dry_run: bool) -> None:
    transcripts_dir = Path(settings.personal_transcripts_path)
    cutoff = datetime.now() - timedelta(days=days)

    # ── Collect candidate files ───────────────────────────────────────────────
    if not transcripts_dir.exists():
        print(f"Transcripts dir not found: {transcripts_dir}")
        return

    candidates = sorted(
        f for f in transcripts_dir.glob("*.txt")
        if datetime.fromtimestamp(f.stat().st_mtime) >= cutoff
    )

    if not candidates:
        print(f"No .txt files modified in last {days} day(s) in {transcripts_dir}")
        return

    print(f"Found {len(candidates)} candidate file(s) (days={days}, dry_run={dry_run})\n")

    processed = skipped = errors = 0

    for txt_path in candidates:
        obs_id = txt_path.stem
        print(f"  {txt_path.name}", end=" … ")

        if dry_run:
            print("[dry-run]")
            continue

        try:
            result_id = await ingest_transcript_file(txt_path, obs_id=obs_id)
            if result_id == obs_id:
                # ingest_transcript_file returns obs_id even if already existed —
                # distinguish via the idempotent-skip return in the service
                pass
            print("ok")
            processed += 1
        except Exception as exc:
            msg = str(exc)
            if "already" in msg.lower():
                print("skipped (already in DB)")
                skipped += 1
            else:
                print(f"ERROR: {exc}")
                errors += 1

    print(f"\nDone — processed: {processed}, skipped: {skipped}, errors: {errors}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Batch-ingest transcripts into PIOS DB.")
    parser.add_argument("--days", type=int, default=7, help="Lookback window in days")
    parser.add_argument("--dry-run", action="store_true", help="List only, do not write")
    args = parser.parse_args()
    asyncio.run(main(days=args.days, dry_run=args.dry_run))
