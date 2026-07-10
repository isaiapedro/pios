# Purpose
Orchestrate and maintain the integration of the Personal Intelligence Operating System (PIOS) ecosystem.

---

# Responsibilities
- Provide a unified workspace structure for personal data, scientific knowledge, and automation services.
- Ensure strict boundary isolation between subjective user data and objective scientific knowledge.
- Standardize agent behavior and development workflows across all sub-domains.

---

# Inputs
- Sub-domain manifests and states.
- System-wide architecture updates.

---

# Outputs
- Cohesive execution environment for PIOS services and agents.
- Integrated local intelligence framework.

---

## Workspace Resolution Subsystem
1. The Layer 2 constraint crawler must recursively scan `/workspace/*/*/manifest.yaml` once every 24 hours.
2. If any subdirectory lacks an active `manifest.yaml` and a matching `BEHAVIOR.md` layer, the parser must throw a validation warning and exclude the directory tree from context integration loops.

---

# Non-responsibilities
- Domain-specific execution logic.
- Direct management of calendar or external vendor APIs (delegated to services).
