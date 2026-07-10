# Transcripts Domain — Behavior Specification

## 1. Processing Constraints
- Acts as a local storage buffer for text payloads parsed directly out of local Whisper runtime daemons.
- Data captured here is immutable; structural typos or semantic errors are not edited. They are parsed and corrected downstream in the `memos/` engine block.
