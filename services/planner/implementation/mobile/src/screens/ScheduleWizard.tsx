import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { acceptPlanningRun, createPlanningWeek, createSchedule, rejectPlanningRun } from "../api/client";
import PlanningPreview from "../components/PlanningPreview";
import type { PlanningRun } from "../types";
import { logPlanningDraft } from "../utils/planningLogs";

type FixedBlock = { title: string; days: string[]; start: string; duration_minutes: number };

const WEEKDAYS: { key: string; label: string }[] = [
  { key: "mon", label: "M" },
  { key: "tue", label: "T" },
  { key: "wed", label: "W" },
  { key: "thu", label: "T" },
  { key: "fri", label: "F" },
  { key: "sat", label: "S" },
  { key: "sun", label: "S" },
];

const INTENTION_PROMPT =
  "Tell me about what you're trying to accomplish, routines you'd like to maintain, " +
  "things you want to make time for, how you want your days to feel, and constraints " +
  "that matter to you. Describe it naturally — no need to organize into goals.";

type Props = { navigation?: { goBack: () => void }; onDone?: () => void };

export default function ScheduleWizard({ navigation, onDone }: Props) {
  const [step, setStep] = useState(0);
  const [wake, setWake] = useState("06:30");
  const [sleep, setSleep] = useState("23:00");
  const [bufferMinutes, setBufferMinutes] = useState("60");
  const [intention, setIntention] = useState("");
  const [blocks, setBlocks] = useState<FixedBlock[]>([]);
  const [planningRun, setPlanningRun] = useState<PlanningRun | null>(null);
  const [saving, setSaving] = useState(false);

  const addBlock = () =>
    setBlocks((current) => [...current, { title: "", days: [], start: "09:00", duration_minutes: 60 }]);

  const toggleBlockDay = (index: number, day: string) =>
    setBlocks((current) =>
      current.map((block, blockIndex) =>
        blockIndex === index
          ? {
              ...block,
              days: block.days.includes(day) ? block.days.filter((value) => value !== day) : [...block.days, day],
            }
          : block
      )
    );

  const generatePlan = async () => {
    if (!intention.trim()) {
      Alert.alert("Describe your week", "Write a natural-language description of the week you want.");
      return;
    }
    const validBlocks = blocks.filter((block) => block.title.trim());
    if (validBlocks.some((block) => block.days.length === 0)) {
      Alert.alert("Pick at least one day", "Every fixed commitment needs at least one day selected.");
      return;
    }

    setSaving(true);
    try {
      await createSchedule({
        wake_time: wake,
        sleep_time: sleep,
        buffer_minutes: parseInt(bufferMinutes || "60", 10),
        fixed_blocks: validBlocks,
      });
      const run = (await createPlanningWeek({
        user_intention: intention.trim(),
        wake_time: wake,
        sleep_time: sleep,
        buffer_minutes: parseInt(bufferMinutes || "60", 10),
        fixed_blocks: validBlocks,
      })) as PlanningRun;
      logPlanningDraft(run);
      const meta = run.pipeline_meta;
      Alert.alert(
        "Draft generated",
        [
          meta ? `Sources: intentions=${meta.intention_source}, practices=${meta.recommendation_source}` : null,
          `Recommendations: ${run.recommendations.length}`,
          `Exploration blocks: ${run.generated_schedule.exploration_blocks.length}`,
          `Evidence hits: ${meta?.evidence_hits ?? 0}`,
          run.plan_summary ? `\n${run.plan_summary}` : null,
        ]
          .filter(Boolean)
          .join("\n")
      );
      setPlanningRun(run);
      setStep(3);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAccept = async () => {
    if (!planningRun) return;
    setSaving(true);
    try {
      await acceptPlanningRun(planningRun.id);
      Alert.alert("Plan accepted", "Accepted exploration blocks were written to Google Calendar.");
      onDone?.();
      navigation?.goBack();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    if (!planningRun) return;
    setSaving(true);
    try {
      await rejectPlanningRun(planningRun.id);
      Alert.alert("Plan rejected");
      onDone?.();
      navigation?.goBack();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setSaving(false);
    }
  };

  if (step === 3 && planningRun) {
    return (
      <PlanningPreview
        planningRun={planningRun}
        busy={saving}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.progress}>
        {[0, 1, 2].map((index) => (
          <View key={index} style={[styles.dot, step >= index && styles.dotActive]} />
        ))}
      </View>

      {step === 0 && (
        <View style={styles.card}>
          <Text style={styles.h}>Sleep window</Text>
          <Field label="Wake time" value={wake} onChange={setWake} />
          <Field label="Sleep time" value={sleep} onChange={setSleep} />
          <Field
            label="Evening buffer before sleep (min)"
            value={bufferMinutes}
            onChange={setBufferMinutes}
          />
        </View>
      )}

      {step === 1 && (
        <View style={styles.card}>
          <Text style={styles.h}>What would you like your week to look like?</Text>
          <Text style={styles.hint}>{INTENTION_PROMPT}</Text>
          <TextInput
            style={styles.intentionInput}
            value={intention}
            onChangeText={setIntention}
            multiline
            textAlignVertical="top"
            placeholder="I want to make progress on software projects, exercise regularly, read more, and keep evenings relatively free..."
          />
        </View>
      )}

      {step === 2 && (
        <View style={styles.card}>
          <Text style={styles.h}>Fixed commitments</Text>
          {blocks.map((block, index) => (
            <View key={index} style={styles.blockCard}>
              <Field
                label="Title"
                value={block.title}
                onChange={(value) =>
                  setBlocks((current) =>
                    current.map((item, itemIndex) => (itemIndex === index ? { ...item, title: value } : item))
                  )
                }
              />
              <Field
                label="Start (HH:MM)"
                value={block.start}
                onChange={(value) =>
                  setBlocks((current) =>
                    current.map((item, itemIndex) => (itemIndex === index ? { ...item, start: value } : item))
                  )
                }
              />
              <Field
                label="Duration (min)"
                value={String(block.duration_minutes)}
                onChange={(value) =>
                  setBlocks((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, duration_minutes: parseInt(value || "0", 10) } : item
                    )
                  )
                }
              />
              <Text style={styles.fieldLabel}>Days</Text>
              <View style={styles.dayRow}>
                {WEEKDAYS.map((day) => (
                  <Pressable
                    key={day.key}
                    style={[styles.dayPill, block.days.includes(day.key) && styles.dayPillActive]}
                    onPress={() => toggleBlockDay(index, day.key)}
                  >
                    <Text style={[styles.dayPillText, block.days.includes(day.key) && styles.dayPillTextActive]}>
                      {day.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
          <Pressable style={styles.addBtn} onPress={addBlock}>
            <Text style={styles.addBtnText}>+ Add block</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.nav}>
        {step > 0 && (
          <Pressable style={[styles.navBtn, styles.back]} onPress={() => setStep((current) => current - 1)}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        )}
        {step < 2 ? (
          <Pressable style={[styles.navBtn, styles.next]} onPress={() => setStep((current) => current + 1)}>
            <Text style={styles.nextText}>Next</Text>
          </Pressable>
        ) : (
          <Pressable style={[styles.navBtn, styles.next]} onPress={generatePlan} disabled={saving}>
            <Text style={styles.nextText}>{saving ? "Planning…" : "Generate draft"}</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput style={styles.fieldInput} value={value} onChangeText={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 16, gap: 16 },
  progress: { flexDirection: "row", justifyContent: "center", gap: 8, marginVertical: 8 },
  dot: { width: 40, height: 6, borderRadius: 3, backgroundColor: "#e5e7eb" },
  dotActive: { backgroundColor: "#6366f1" },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 12, gap: 12 },
  h: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  field: { gap: 4 },
  fieldLabel: { fontSize: 13, color: "#888" },
  fieldInput: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  intentionInput: {
    minHeight: 180,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    lineHeight: 22,
  },
  hint: { fontSize: 13, color: "#888", lineHeight: 18 },
  blockCard: { backgroundColor: "#f9fafb", borderRadius: 8, padding: 12, gap: 8, marginBottom: 8 },
  dayRow: { flexDirection: "row", gap: 6 },
  dayPill: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e7eb",
  },
  dayPillActive: { backgroundColor: "#6366f1" },
  dayPillText: { fontSize: 13, fontWeight: "600", color: "#374151" },
  dayPillTextActive: { color: "#fff" },
  addBtn: {
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6366f1",
    borderRadius: 8,
    borderStyle: "dashed",
  },
  addBtnText: { color: "#6366f1", fontWeight: "600" },
  nav: { flexDirection: "row", gap: 12 },
  navBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  back: { backgroundColor: "#f3f4f6", borderWidth: 1, borderColor: "#d1d5db" },
  backText: { color: "#374151", fontWeight: "700" },
  next: { backgroundColor: "#6366f1" },
  nextText: { color: "#fff", fontWeight: "700" },
});
