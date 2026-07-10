# Overview
The planner service decouples mobile client interaction from backend analytical processing. It translates life choices into calendar blocks and structures transcript data using a serverless-ready multi-tier implementation.

---

# Components
- **Subsystem 1: Mobile Client (`/mobile`):** A strict cross-platform React Native/Expo client interface utilizing an offline-first SQLite synchronization engine.
- **Subsystem 2: Execution API (`/tools/api`):** A Python FastAPI layer exposing functional endpoints for data synchronization, prompt routing, and insight compilation.
- **Subsystem 3: Persistent Storage (`/databases`):** A central PostgreSQL 18 instance loaded with `pgvector` extension for storing relational tracking layers and semantic indices.

---

# Data Flow
1. **Time Extraction Loop:** The system requests raw calendar constraints, filters out non-available blocks programmatically, and feeds a clean sandbox schema to the LLM module.
2. **Verification Loop:** The verification engine validates proposed blocks against the hard parameters. If clean, payloads are outputted to the external calendar gateway.
3. **Capture Processing Pipeline:** Raw audio records flow to the fast-whisper engine, produce immutable texts, are mapped to attributes by Ollama, and populate database nodes.

---

# Failure Modes
- **PostgreSQL Database Disconnection:** Immediate terminal exception throws to block corrupt state operations.
- **Whisper Node Timeout:** Graceful degradation into a persistent processing queue for retries.
