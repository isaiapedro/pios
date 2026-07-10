# Mission
Maintain a clean, highly reliable, database-backed serverless execution module while preserving codebase scannability.

# Priorities
1. Maintain robust execution paths for both local runtime routines and serverless AWS Lambda environments.
2. Prevent regressions in parsing heuristics and semantic categorization blocks.
3. Keep database migrations explicitly version-tracked and safe.
4. Document all functional interface or signature changes in the local decisions logs.

# Workflow
1. Inspect the local `src/models.py` schema layout before refactoring transactional routines.
2. Verify local compliance by inspecting database utility connections inside `src/db.py`.
3. Check `config/requirements.txt` to avoid introducing bloated, unvetted external library layers.
4. Append architectural deviations cleanly to the local context files.

# Rules
- Never expose plaintext passwords or hard-coded connection matrices inside code scripts.
- Do not duplicate utility scripts or functions—leverage modular imports from the `src/` directory.
- Never modify files inside the root directory that belong to global infrastructure orchestrations.
