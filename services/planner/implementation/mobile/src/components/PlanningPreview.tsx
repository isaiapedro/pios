import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import type { PlanningRun } from "../types";
import PipelineReasoning from "./PipelineReasoning";

type Props = {
  planningRun: PlanningRun;
  busy?: boolean;
  onAccept: () => Promise<void>;
  onReject: () => void;
};

function groupByDate(blocks: PlanningRun["generated_schedule"]["exploration_blocks"]) {
  const grouped: Record<string, typeof blocks> = {};
  for (const block of blocks) {
    grouped[block.date] = grouped[block.date] ?? [];
    grouped[block.date].push(block);
  }
  return grouped;
}

export default function PlanningPreview({ planningRun, busy, onAccept, onReject }: Props) {
  const fixed = planningRun.generated_schedule.fixed_blocks;
  const exploration = planningRun.generated_schedule.exploration_blocks;
  const grouped = groupByDate(exploration);
  const valid = planningRun.validation_result.valid;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Draft Weekly Plan</Text>
      <Text style={styles.subheading}>
        {planningRun.week_start} → {planningRun.week_end}
      </Text>

      <View style={styles.diagnosticsCard}>
        <Text style={styles.diagnosticsTitle}>Pipeline summary</Text>
        <Text style={styles.diagnosticsRow}>Run: {planningRun.id.slice(0, 8)}…</Text>
        <Text style={styles.diagnosticsRow}>
          Intentions: {planningRun.interpreted_intentions?.intentions.length ?? 0} · Recommendations:{" "}
          {planningRun.recommendations.length} · Exploration: {exploration.length}
        </Text>
        {planningRun.pipeline_meta && (
          <>
            <Text style={styles.diagnosticsRow}>
              Sources: intentions={planningRun.pipeline_meta.intention_source}, practices=
              {planningRun.pipeline_meta.recommendation_source} · Evidence:{" "}
              {planningRun.pipeline_meta.evidence_hits}
            </Text>
            {planningRun.pipeline_meta.planning_model ? (
              <Text style={styles.diagnosticsRow}>
                Model: {planningRun.pipeline_meta.planning_model} · Unique titles:{" "}
                {planningRun.pipeline_meta.unique_exploration_titles ?? "?"}
              </Text>
            ) : null}
          </>
        )}
        <Text style={styles.diagnosticsRow}>
          Fixed: {fixed.length} · Status: {planningRun.status} · Valid: {valid ? "yes" : "no"}
        </Text>
      </View>

      <PipelineReasoning planningRun={planningRun} />

      {!valid && (
        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>Validation issues</Text>
          {planningRun.validation_result.violations.map((violation, index) => (
            <Text key={index} style={styles.warningText}>
              {violation.message}
            </Text>
          ))}
        </View>
      )}

      {fixed.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Fixed</Text>
          {fixed.map((block, index) => (
            <Text key={`fixed-${index}`} style={styles.row}>
              {block.date} · {block.start}–{block.end} · {block.title}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Exploration</Text>
        {Object.keys(grouped).length === 0 ? (
          <Text style={styles.empty}>No exploration blocks were scheduled.</Text>
        ) : (
          Object.entries(grouped).map(([date, blocks]) => (
            <View key={date} style={styles.dayGroup}>
              <Text style={styles.dayLabel}>{date}</Text>
              {blocks.map((block, index) => (
                <Text key={`${date}-${index}`} style={styles.row}>
                  {block.start}–{block.end} · {block.title}
                </Text>
              ))}
            </View>
          ))
        )}
      </View>

      <View style={styles.actions}>
        <Pressable style={[styles.btn, styles.accept]} onPress={onAccept} disabled={busy || !valid}>
          <Text style={styles.btnText}>{busy ? "Applying…" : "Accept plan"}</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.reject]} onPress={onReject} disabled={busy}>
          <Text style={styles.rejectText}>Reject</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 16, gap: 12 },
  heading: { fontSize: 22, fontWeight: "700" },
  subheading: { fontSize: 14, color: "#666", marginBottom: 4 },
  diagnosticsCard: {
    backgroundColor: "#eef2ff",
    borderColor: "#c7d2fe",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    gap: 4,
  },
  diagnosticsTitle: { fontSize: 12, fontWeight: "700", color: "#4338ca", textTransform: "uppercase" },
  diagnosticsRow: { fontSize: 13, color: "#312e81" },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 12, gap: 8 },
  warningCard: {
    backgroundColor: "#fff7ed",
    borderColor: "#fdba74",
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    gap: 6,
  },
  warningTitle: { fontSize: 14, fontWeight: "700", color: "#c2410c" },
  warningText: { fontSize: 13, color: "#374151" },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6366f1",
    textTransform: "uppercase",
  },
  dayGroup: { gap: 4, marginBottom: 8 },
  dayLabel: { fontSize: 14, fontWeight: "700", color: "#111827" },
  row: { fontSize: 14, color: "#374151" },
  empty: { fontSize: 14, color: "#888", fontStyle: "italic" },
  actions: { flexDirection: "row", gap: 8, marginTop: 8 },
  btn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  accept: { backgroundColor: "#22c55e" },
  reject: { backgroundColor: "#f3f4f6", borderWidth: 1, borderColor: "#d1d5db" },
  btnText: { color: "#fff", fontWeight: "700" },
  rejectText: { color: "#374151", fontWeight: "700" },
});
