# Professional Workspace — Behavior Specification

## 1. Purpose & Core Intentions
Hosts tactical documentation for current daily duties, role functions, active codebase structures, company onboarding notes, and local mirrors of Jira task tracking backlogs.

## 2. Operational Constraints & Security Limits
- **Scraping Protections:** The Deterministic Constraint Extractor may parse only file paths and specific high-level target strings from `manifest.yaml` to deduce active themes. It is prohibited from traversing raw proprietary client documents or internal corporate code.
- **Task Decompositions:** Active Jira task arrays are stored locally as text files or markdown checklist items to provide immediate situational context when executing a scheduled professional block.

## 3. Triggers & Event Pipelines
- Finishing a work session fires an execution metric update event to the local API layer to compute tracking metrics on attention span and context switching without recording private work details.
