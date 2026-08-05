# Knowledge Root Behavioral Guidelines

## Core Directives
1. **Domain Isolation & Cross-Linking**: Store source documentation inside its designated objective folder (`health`, `business`, `technology`, `media`, `arts`). Connections between domains must be declared in document frontmatter and mapped through `ONTOLOGY.md`.
2. **Immutable Raw Ingestion**: Files inside `raw/` directories must retain original source integrity. Never modify raw imported standards or specifications directly; write annotations or summaries in `synthesized/`.
3. **Metadata Enforcement**: Every synthesized markdown document must include standard YAML frontmatter containing `id`, `title`, `primary_domain`, `secondary_domains`, `related_nodes`, and `tags`.
4. **Retrieval Protocol**: When queried on multi-disciplinary topics, load the primary domain first, then follow `related_nodes` pointers in `ONTOLOGY.md` to pull secondary context.
