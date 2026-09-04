# Insights review pipeline

1. An explicit user call gathers Personal memo, event, goal, routine, and prior-review context.
2. The LLM produces a validated three-part JSON bundle under the local output contract.
3. The latest bundle is available through the Planner API while each individual inference is written to an append-only audit log.
4. The mobile app renders the bundle read-only. A separate Planner or Routine request is required before any schedule changes.
