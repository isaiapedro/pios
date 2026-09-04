# Architectural Decisions

## 2026-09-04 — System-only repository tracking

The PIOS repository tracks only system contracts, manifests, and repository
metadata listed in the root `.gitignore` allowlist. Operational records,
personal data, source code, binary assets, generated output, dependency
artifacts, and externally sourced or nested-repository trees remain local and
are removed from the Git index when discovered.

This preserves the workspace's privacy boundaries while keeping its structural
contracts versioned.
