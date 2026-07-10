# Video Service — Behavior Specification

## 1. Execution Boundary
- Manages high-throughput compute tasks (FFmpeg transcoding, audio line splitting).
- Must run inside containerized compute bounds (`services/video/venv/`) to isolate processing load from core API responses.

## 2. Pipeline Integrity
- Consumes raw video assets from `workspace/social_media/recordings/`.
- Automatically outputs matching text/audio targets to `personal/transcripts/` when generating automated subtitle drafts.# Trends Service — Behavior Specification

