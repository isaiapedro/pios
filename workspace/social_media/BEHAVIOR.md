# Social Media Workspace — Behavior Specification

## 1. File Allocation Guardrails
- **`projects/`:** Contains platform-specific assembly templates and content files mapped using your creative templates.
- **`recordings/`:** Raw high-capacity media files stay locked here. They are processed strictly via local worker calls from `services/video/` to prevent memory blowouts on your primary application stack.
