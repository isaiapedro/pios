# Ontology Specification

## Purpose

This document defines the ontology conventions for this knowledge domain.

The ontology exists to provide a structured, machine-readable representation of the domain that can be consumed by humans, AI systems, services, and the global registry.

The ontology is **not** the knowledge itself.

It describes the entities, relationships, taxonomy, and naming conventions used by this domain.

---

# Principles

1. Every concept has a single canonical representation.
2. Concepts should be reusable across domains.
3. Relationships should be explicit.
4. Scientific claims belong in the wiki, not in the ontology.
5. The ontology describes structure, not explanations.
6. Prefer linking existing concepts over creating duplicates.
7. Every ontology element should be traceable to the corresponding wiki page.

---

# Entity Types

The following entity categories are allowed.

## Concept

Abstract ideas.

Examples

- Deep Work
- Reinforcement Learning
- Sleep Quality

---

## Person

Researchers, authors, historical figures.

Examples

- Andrew Huberman
- Andrew Ng
- Daniel Kahneman

---

## Organization

Companies, universities, laboratories, institutions.

Examples

- OpenAI
- Stanford University

---

## Technology

Frameworks, tools, software, programming languages.

Examples

- LangGraph
- PostgreSQL
- Flutter

---

## Methodology

Scientific or engineering methods.

Examples

- Pomodoro Technique
- Retrieval-Augmented Generation
- CRISP-DM

---

## Dataset

Named datasets.

Examples

- MIMIC-IV
- ImageNet

---

## Publication

Books, papers, reports.

Examples

- Deep Work
- Attention Is All You Need

---

## Project

Research initiatives or implementation projects.

---

# Naming Convention

Use singular names.

Good

Deep Work

Transformer

Attention

Bad

Deep Works

Transformers

Attentions

---

Avoid abbreviations unless they are the canonical name.

Good

Retrieval-Augmented Generation

Bad

RAG

Aliases should instead be registered.

---

# Aliases

Every entity may define aliases.

Example

Canonical

Retrieval-Augmented Generation

Aliases

- RAG

Canonical

Large Language Model

Aliases

- LLM

Aliases should never create duplicate concepts.

---

# Relationships

Relationships should use explicit verbs.

Preferred

depends_on

implements

extends

uses

contains

related_to

supports

contradicts

cites

imports

exports

Avoid ambiguous relations such as

connected_to

linked_to

associated_with

---

# Cross-domain References

Concepts may reference entities from other domains.

Example

Planning Science

imports

Psychology.Attention

Software Engineering

imports

Artificial Intelligence.Transformers

Cross-domain concepts should never be duplicated.

Always reference the canonical source.

---

# Taxonomy

Every entity should belong to a hierarchy.

Example

Science

└── Psychology

    └── Attention

Technology

└── Artificial Intelligence

    └── Large Language Models

---

# Concept Lifecycle

Every concept progresses through the following stages.

Candidate

↓

Validated

↓

Documented

↓

Referenced

↓

Integrated

↓

Maintained

Deprecated concepts should never be deleted.

Mark them accordingly.

---

# Confidence Levels

Every scientific concept should have a confidence indicator.

High

Supported by multiple systematic reviews or meta-analyses.

Medium

Supported by multiple peer-reviewed studies.

Low

Emerging evidence.

Hypothesis

Speculative or under investigation.

---

# Traceability

Every ontology entity should reference

- Wiki page
- Source papers
- Related concepts
- Related domains

No orphan entities should exist.

---

# Registry Integration

Every ontology should expose its concepts to the global registry.

The registry is responsible for

- discovery
- cross-domain linking
- dependency resolution
- semantic search

The ontology should never directly manage concepts belonging to another domain.

---

# Maintenance Rules

Review ontology consistency periodically.

Merge duplicate concepts.

Update deprecated terminology.

Maintain stable identifiers whenever possible.

Preserve backward compatibility for external references.

---

# Future Extensions

This ontology may later include

- embeddings
- semantic identifiers
- graph database synchronization
- automatic entity extraction
- reasoning rules
- ontology validation
