# Insights Domain — Behavior Specification

## 1. Analytical Scope
- Produces three read-only inferences: routine effectiveness, goal progress, and future-plan review.
- Each finding names its Personal evidence and confidence. Scientific claims cite only the local Knowledge corpus; otherwise they are labeled hypotheses.

## 2. Immutability
- Reviews are generated only by an explicit user request. They never run as a weekly event or background task.
- Insights cannot change a routine, calendar event, goal, or future-plan state. Those actions require the separate Planner or Routine interfaces.
- Every generated inference is retained in an append-only audit log and prior valid reviews are context for the next review.
