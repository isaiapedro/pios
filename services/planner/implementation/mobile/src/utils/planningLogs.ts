import type { PlanningRun } from "../types";
import { logFullPipelineReasoning } from "./formatPipelineReasoning";

export function logPlanningDraft(run: PlanningRun): void {
  logFullPipelineReasoning(run);
}
