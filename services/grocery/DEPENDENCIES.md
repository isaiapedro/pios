# Internal Dependencies
- **Registry:** Exposes service interfaces and capabilities to system-wide frameworks.

---

# External Dependencies
- **AWS Lambda Python Runtime:** Execution host.
- **PostgreSQL Instance:** Shared cloud compute state.
- **Python Libraries (`config/requirements.txt`):** Explicit runtime package boundaries.

---

# Optional Dependencies
- **Local Fallback Data System:** Utilizes `config/data/grocery_list.json` when decoupled from cloud SQL connections.
