# Experiments Workspace — Behavior Specification

## 1. Lifecycles & Pruning
- Instantiated directly from `templates/experiments_domain/`.
- No folder in this space may establish long-term system dependencies. The system cleaner flags directories untouched for more than 30 days for automated archival pruning.
