# Insights structure decisions

## Reviews are manual and immutable

An Insight is created only by an explicit user request. Each generation writes append-only
per-inference audit records; regenerating a period does not erase prior conclusions.

## Insights advise; planning changes state

Routine, goal, and future-plan reviews are read-only. Calendar and routine changes remain
behind explicit Planner and Routine calls so reflective analysis cannot silently rewrite a plan.

## Evidence stays scoped

Personal observations remain in Personal storage. Scientific support is limited to cited files
under `knowledge/health/wiki/`; a missing citation yields a hypothesis, not a scientific claim.
