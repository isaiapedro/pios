import React from "react";
import { StyleSheet, Text, View } from "react-native";

import type { PlanningRun } from "../types";
import { buildReasoningSections } from "../utils/formatPipelineReasoning";

type Props = {
  planningRun: PlanningRun;
};

export default function PipelineReasoning({ planningRun }: Props) {
  const sections = buildReasoningSections(planningRun);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionLabel}>Pipeline reasoning</Text>
      <Text style={styles.hint}>Full reasoning from every planning stage.</Text>
      {sections.map((section) => (
        <View key={section.id} style={styles.block}>
          <Text style={styles.blockTitle}>{section.title}</Text>
          {section.subtitle ? <Text style={styles.blockSubtitle}>{section.subtitle}</Text> : null}
          {section.lines.map((line, index) => (
            <Text key={`${section.id}-${index}`} style={styles.line}>
              {line}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 12, gap: 10 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6366f1",
    textTransform: "uppercase",
  },
  hint: { fontSize: 12, color: "#6b7280", marginBottom: 4 },
  block: {
    gap: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  blockTitle: { fontSize: 14, fontWeight: "700", color: "#111827" },
  blockSubtitle: { fontSize: 12, color: "#4338ca", marginBottom: 2 },
  line: { fontSize: 13, color: "#374151", lineHeight: 19 },
});
