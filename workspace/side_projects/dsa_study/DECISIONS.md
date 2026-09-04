# Architectural Decisions

## 2026-09-01 — Own a small public GraphQL synchronizer

**Decision:** Use an isolated, read-only LeetCode GraphQL client instead of a
third-party CLI as the project data interface.

**Reason:** Interactive CLIs are useful for solving one problem but do not
provide a stable bulk-export contract and still depend on LeetCode's web
queries. Keeping the two query shapes in this project makes the catalog
reproducible, testable, and replaceable.

**Consequences:** The client pages catalog metadata, then fetches readable
details per slug with checkpoints, rate limiting, and response validation.

## 2026-09-01 — Keep external content generated and local

**Decision:** Ignore fetched statements, generated pages, checkpoints, and
personal solutions.

**Reason:** Avoid committing third-party problem content, personal work, or
account-related state.

**Repository contract:** The root default-deny Git policy explicitly permits
this project's source, tests, and contracts while continuing to exclude its
generated catalog, site, checkpoints, and solutions.

## 2026-09-01 — Derive the topic registry from the complete catalog

**Decision:** Build the rendered topic registry from the union of official
`topicTags`, keyed by stable slug rather than a hand-maintained partial list.
