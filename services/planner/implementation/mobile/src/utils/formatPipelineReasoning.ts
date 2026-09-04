import type { PlanningRun, PipelineStageTrace } from "../types";

export type ReasoningSection = {
  id: string;
  title: string;
  subtitle?: string;
  lines: string[];
};

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "none";
    if (typeof value[0] === "object" && value[0] !== null) {
      return value.map((item) => JSON.stringify(item)).join("\n");
    }
    return value.join(", ");
  }
  return JSON.stringify(value, null, 2);
}

function formatRecord(label: string, record: Record<string, unknown> | undefined): string[] {
  if (!record || Object.keys(record).length === 0) return [];
  return Object.entries(record).map(([key, value]) => `${label}.${key}: ${formatValue(value)}`);
}

function buildIntentionSection(run: PlanningRun): ReasoningSection {
  const intentions = run.interpreted_intentions?.intentions ?? [];
  const lines = [`User input: ${run.user_intention}`];
  if (intentions.length === 0) {
    lines.push("No structured intentions returned.");
  } else {
    for (const item of intentions) {
      lines.push(
        `• ${item.theme} [${item.id}] — priority ${item.priority}` +
          ("desired_frequency" in item ? `, ${item.desired_frequency}x/week` : "") +
          ("preferred_duration_minutes" in item
            ? `, ${item.preferred_duration_minutes} min`
            : "")
      );
    }
  }
  return {
    id: "intentions",
    title: "1. Intentions",
    subtitle: run.pipeline_meta?.intention_source,
    lines,
  };
}

function buildTraceSection(stage: PipelineStageTrace, index: number): ReasoningSection {
  const lines: string[] = [];
  lines.push(...formatRecord("in", stage.input_summary));
  lines.push(...formatRecord("out", stage.output_summary));
  if (stage.notes && stage.notes.length > 0) {
    for (const note of stage.notes) {
      lines.push(`note: ${note}`);
    }
  }
  if (lines.length === 0) {
    lines.push("No extra detail recorded for this stage.");
  }
  return {
    id: `trace-${stage.stage}-${index}`,
    title: stage.stage.replace(/_/g, " "),
    subtitle: `${stage.source} · ${stage.duration_ms}ms · ${stage.model}`,
    lines,
  };
}

function buildRecommendationsSection(run: PlanningRun): ReasoningSection {
  const lines: string[] = [];
  for (const item of run.recommendations) {
    lines.push(`• ${item.title ?? item.practice} (${item.intention_id})`);
    lines.push(`  frequency ${item.frequency}x, ${item.duration_minutes} min, priority ${item.priority}`);
    if (item.rationale) lines.push(`  rationale: ${item.rationale}`);
    if (item.routine_impact) lines.push(`  routine impact: ${item.routine_impact}`);
    if (item.evidence_summary) lines.push(`  evidence: ${item.evidence_summary}`);
    if (item.evidence_ids.length > 0) lines.push(`  evidence ids: ${item.evidence_ids.join(", ")}`);
  }
  return {
    id: "recommendations-detail",
    title: "Practice reasoning",
    subtitle: run.pipeline_meta?.recommendation_source,
    lines: lines.length > 0 ? lines : ["No recommendations returned."],
  };
}

function buildValidationSection(run: PlanningRun): ReasoningSection {
  const lines: string[] = [];
  lines.push(`valid: ${run.validation_result.valid ? "yes" : "no"}`);
  for (const violation of run.validation_result.violations) {
    lines.push(`• [${violation.rule}] ${violation.message}`);
  }
  for (const repair of run.repair_history ?? []) {
    lines.push(`repair (${repair.strategy}): ${repair.detail}`);
  }
  return {
    id: "validation",
    title: "Validation & repair",
    lines,
  };
}

function buildPlanSummarySection(run: PlanningRun): ReasoningSection | null {
  if (!run.plan_summary) return null;
  return {
    id: "plan-summary",
    title: "Plan overview",
    lines: [run.plan_summary],
  };
}

export function buildReasoningSections(run: PlanningRun): ReasoningSection[] {
  const sections: ReasoningSection[] = [buildIntentionSection(run)];

  const trace = run.pipeline_trace ?? [];
  const traceStageNames = new Set(trace.map((item) => item.stage));

  for (const [index, stage] of trace.entries()) {
    if (stage.stage === "intentions") continue;
    sections.push(buildTraceSection(stage, index));
  }

  if (!traceStageNames.has("recommendations")) {
    sections.push(buildRecommendationsSection(run));
  } else {
    sections.push(buildRecommendationsSection(run));
  }

  sections.push(buildValidationSection(run));

  const summary = buildPlanSummarySection(run);
  if (summary) sections.push(summary);

  return sections;
}

export function formatPipelineReasoningLog(run: PlanningRun): string {
  const sections = buildReasoningSections(run);
  const meta = run.pipeline_meta;
  const header = [
    "========== PLANNING PIPELINE REASONING ==========",
    `run=${run.id}`,
    `week=${run.week_start}..${run.week_end}`,
    `status=${run.status}`,
    meta
      ? `sources intentions=${meta.intention_source} recommendations=${meta.recommendation_source} evidence_hits=${meta.evidence_hits} model=${meta.planning_model ?? "?"} unique_titles=${meta.unique_exploration_titles ?? "?"}`
      : "",
    "=================================================",
  ]
    .filter(Boolean)
    .join("\n");

  const body = sections
    .map((section) => {
      const subtitle = section.subtitle ? ` (${section.subtitle})` : "";
      return [`--- ${section.title}${subtitle} ---`, ...section.lines].join("\n");
    })
    .join("\n\n");

  return `${header}\n\n${body}\n\n=================================================`;
}

export function logFullPipelineReasoning(run: PlanningRun): void {
  console.log(formatPipelineReasoningLog(run));
}
