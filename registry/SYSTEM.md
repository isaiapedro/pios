# Purpose
Act as the single source of truth for component discovery, semantic alignment, and cross-domain dependency resolution across PIOS.

---

# Responsibilities
- Map the global PIOS architecture graph by reading local domain manifests.
- Resolve cross-domain imports and semantic references (e.g., cross-domain ontology linking).
- Provide a uniform interface for semantic search and component routing.

---

# Inputs
- Manifest files (`manifest.yaml`) from all sub-folders.
- Domain ontology specifications (`ONTOLOGY.md`).

---

# Outputs
- Resolved dependency trees.
- Discovery maps for AI agents and internal services.

---

# Non-responsibilities
- Directly managing concepts belonging to another specific domain.
- Enforcing runtime service communication protocols.
