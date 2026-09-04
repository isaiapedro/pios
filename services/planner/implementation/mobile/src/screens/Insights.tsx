/** Pillar 3: manual, read-only, auditable intelligence reviews. */
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { generateInsight, getInferenceLogs, getInsight, getInsightHistory } from "../api/client";
import type { InferenceLog, Insight, PeriodType, ReviewFinding, RoutineAdherence } from "../types";

const PERIODS: PeriodType[] = ["weekly", "monthly"];

function AdherenceBadge({ adherence }: { adherence: RoutineAdherence }) {
  const pct = Math.round(adherence.adherence_rate * 100);
  return <Text style={styles.badge}>{adherence.confirmed}/{adherence.planned} events · {pct}%</Text>;
}

function FindingList({ title, items }: { title: string; items: ReviewFinding[] }) {
  if (!items.length) return null;
  return <View style={styles.list}><Text style={styles.subhead}>{title}</Text>{items.map((item, index) => (
    <View key={`${title}-${index}`} style={styles.finding}>
      <Text style={styles.body}>• {item.statement}</Text>
      <Text style={styles.meta}>{item.confidence} · {item.evidence_refs.join(", ") || "no direct evidence"}</Text>
    </View>
  ))}</View>;
}

function BundleView({ insight }: { insight: Insight }) {
  const bundle = insight.inference_bundle;
  if (!bundle) return <Text style={styles.body}>{insight.narrative}</Text>;
  const { routine_review: routine, goal_review: goals, future_plan_review: future } = bundle;
  return <>
    <View style={styles.section}><Text style={styles.heading}>Routine review</Text><Text style={styles.body}>{routine.summary}</Text>
      {Object.entries(routine.metrics).map(([key, value]) => <Text key={key} style={styles.meta}>{key.replaceAll("_", " ")}: {String(value)}</Text>)}
      <FindingList title="What worked" items={routine.worked} /><FindingList title="What did not work" items={routine.did_not_work} />
      {!!routine.experiments.length && <><Text style={styles.subhead}>Experiments — advisory only</Text>{routine.experiments.map((x, i) => <Text key={i} style={styles.body}>• {x}</Text>)}</>}
    </View>
    <View style={styles.section}><Text style={styles.heading}>Goal review</Text><Text style={styles.body}>{goals.summary}</Text>
      {goals.assessments.map((goal) => <View key={goal.goal_title} style={styles.goal}><Text style={styles.subhead}>{goal.goal_title} · {goal.status.replaceAll("_", " ")}</Text>
        <Text style={styles.body}>{goal.progress}</Text><Text style={styles.body}>Schedule fit: {goal.schedule_fit}</Text>
        {!!goal.evidence_refs.length && <Text style={styles.meta}>Evidence: {goal.evidence_refs.join(", ")}</Text>}
        {goal.scientific_support.map((support, i) => <Text key={i} style={styles.citation}>Science: {support.claim} [{support.source_path}]</Text>)}
      </View>)}
    </View>
    <View style={styles.section}><Text style={styles.heading}>Future-plan review</Text><Text style={styles.body}>{future.summary}</Text>
      <FindingList title="Progress since prior review" items={future.progress_updates} /><FindingList title="New additions" items={future.new_additions} />
      {!!future.unresolved_questions.length && <><Text style={styles.subhead}>Open questions</Text>{future.unresolved_questions.map((x, i) => <Text key={i} style={styles.body}>• {x}</Text>)}</>}
    </View>
  </>;
}

export default function Insights() {
  const [period, setPeriod] = useState<PeriodType>("weekly");
  const [insight, setInsight] = useState<Insight | null>(null);
  const [history, setHistory] = useState<Insight[]>([]);
  const [logs, setLogs] = useState<InferenceLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const selectInsight = useCallback(async (selected: Insight | null) => {
    setInsight(selected); setLogs([]);
    if (selected) setLogs(await getInferenceLogs(selected.id).catch(() => []));
  }, []);
  const load = useCallback(async (selectedPeriod: PeriodType) => {
    setPeriod(selectedPeriod); setLoading(true);
    try {
      const [current, all] = await Promise.all([getInsight(selectedPeriod).catch(() => null), getInsightHistory(selectedPeriod).catch(() => [])]);
      setHistory(all); await selectInsight(current);
    } finally { setLoading(false); }
  }, [selectInsight]);
  useEffect(() => { load(period); }, [load, period]);

  const confirmGenerate = () => Alert.alert("Generate review?", "This is a manual, read-only analysis. It will not change your routine or calendar.", [
    { text: "Cancel", style: "cancel" },
    { text: "Generate", onPress: async () => { setGenerating(true); try { const created = await generateInsight(period); await load(period); await selectInsight(created); } catch (e) { Alert.alert("Review failed", String(e)); } finally { setGenerating(false); } } },
  ]);

  return <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <View style={styles.tabs}>{PERIODS.map((p) => <Pressable key={p} style={[styles.tab, period === p && styles.tabActive]} onPress={() => load(p)}><Text style={[styles.tabText, period === p && styles.tabTextActive]}>{p}</Text></Pressable>)}</View>
    <Pressable style={styles.generate} onPress={confirmGenerate} disabled={generating}><Text style={styles.generateText}>{generating ? "Generating…" : "Generate review"}</Text></Pressable>
    <Text style={styles.notice}>Manual only · Reviews never change the routine or calendar.</Text>
    {loading && <ActivityIndicator />}
    {insight && !loading && <View style={styles.card}><Text style={styles.label}>{insight.period_start} · generated {new Date(insight.generated_at).toLocaleString()}</Text>{insight.routine_adherence && <AdherenceBadge adherence={insight.routine_adherence as RoutineAdherence} />}<BundleView insight={insight} /></View>}
    {!insight && !loading && <Text style={styles.empty}>No {period} review yet. Generate one when you are ready.</Text>}
    {!!logs.length && <View style={styles.card}><Text style={styles.heading}>Inference log</Text>{logs.map((log) => <Text key={log.id} style={styles.meta}>{log.inference_type} · {log.status} · {new Date(log.created_at).toLocaleString()} · {log.citation_paths.length} citations</Text>)}</View>}
    {!!history.length && <View><Text style={styles.heading}>All reviews</Text>{history.map((item) => <Pressable key={item.id} style={styles.history} onPress={() => selectInsight(item)}><Text style={styles.subhead}>{item.period_start}</Text><Text style={styles.meta}>{item.inference_bundle ? "Three-part review" : item.narrative.slice(0, 90)}</Text></Pressable>)}</View>}
  </ScrollView>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" }, content: { padding: 16, gap: 12 }, tabs: { flexDirection: "row", gap: 8 }, tab: { flex: 1, alignItems: "center", padding: 9, borderRadius: 8, backgroundColor: "#e5e7eb" }, tabActive: { backgroundColor: "#6366f1" }, tabText: { textTransform: "capitalize", fontWeight: "700", color: "#374151" }, tabTextActive: { color: "#fff" }, generate: { alignItems: "center", padding: 12, backgroundColor: "#312e81", borderRadius: 8 }, generateText: { color: "#fff", fontWeight: "700" }, notice: { color: "#6b7280", textAlign: "center", fontSize: 12 }, card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, gap: 10 }, label: { color: "#6366f1", fontSize: 12, fontWeight: "700" }, heading: { fontSize: 18, fontWeight: "800", color: "#111827", marginBottom: 4 }, subhead: { fontSize: 14, fontWeight: "700", color: "#374151", marginTop: 6 }, body: { color: "#1f2937", fontSize: 14, lineHeight: 20 }, meta: { color: "#6b7280", fontSize: 12, lineHeight: 17 }, citation: { color: "#4338ca", fontSize: 12, lineHeight: 17, marginTop: 3 }, section: { borderTopWidth: 1, borderColor: "#e5e7eb", paddingTop: 12, gap: 5 }, list: { gap: 3 }, finding: { marginLeft: 2 }, goal: { marginTop: 6, paddingTop: 6, borderTopWidth: 1, borderColor: "#f3f4f6", gap: 2 }, badge: { alignSelf: "flex-start", padding: 5, borderRadius: 8, color: "#166534", backgroundColor: "#dcfce7", fontSize: 12 }, empty: { textAlign: "center", marginTop: 40, color: "#9ca3af" }, history: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginTop: 6, gap: 3 },
});
