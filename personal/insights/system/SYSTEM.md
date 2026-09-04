# Insights Engine — System Runtime Directives

## 1. Inter-Layer Pipelines
- **Consumes:** Aggregated metrics from Layer 4 database tables once an execution cycle completes.
- **Produces:** User-triggered, immutable review bundles that may inform a later explicit Planner request.
- **Stores:** Separate routine, goal, and future-plan inference logs for longitudinal continuity.
