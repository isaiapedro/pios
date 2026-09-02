# Memos Domain — Behavior Specification

## 1. Semantic Enrichment
- Receives output text from the `personal/transcripts/` processor.
- Programmatically attaches system-wide telemetry attributes derived from your current dashboard settings.

## 2. Garbage Collection
- Once semantic metadata strings are injected into the central database, local workspace temporary voice files are automatically purged to prevent local cache leakage.
