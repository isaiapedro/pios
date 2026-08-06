# Mission
Maintain the global map of PIOS, ensuring flawless capability mapping and semantic consistency without creating hard-coded coupling.

---

# Priorities
1. Maintain runtime stability of discovery APIs.
2. Flag missing, circular, or broken dependencies across manifests immediately.
3. Keep the system graph clean, optimized, and trace-friendly.

---

# Rules
- Never allow a domain to register concepts belonging directly to an external domain.
- Enforce backward-compatibility checks for any exported registration interfaces.
- Treat broken dependency strings as loud failures.
