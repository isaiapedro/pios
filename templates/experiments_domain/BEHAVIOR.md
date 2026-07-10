# Experiments Domain Template — Behavior Specification

## 1. Transient Operations
- Optimizes for swift data mutation, throwaway code spikes, and temporary execution frameworks.
- System behaviors are exempted from long-term metric optimization rules.

## 2. Invalidation Flags
- Files within this namespace are considered transient. They are automatically flagged for lifecycle archiving unless manually moved to a dedicated workspace module.
