/**
 * Schedule tab — weekly routine from knowledge base (no LLM, no legacy fixed blocks).
 */
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { applyRoutineWeek, clearSchedule, getRoutineWeek, syncRoutineEventsLocal } from "../api/client";
import type { RootStackParams } from "../navigation/RootNavigator";
import type { RoutineCalendar } from "../types";

export default function Schedule() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [routine, setRoutine] = useState<RoutineCalendar | null>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getRoutineWeek();
      setRoutine(data);
    } catch {
      setRoutine(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const handleSyncLocal = () => {
    Alert.alert(
      "Sync events to app?",
      "Registers routine blocks in the app database only. Use this if Google Calendar already has the events and you want Today to show them without creating duplicates.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sync",
          onPress: async () => {
            setClearing(true);
            try {
              const result = await syncRoutineEventsLocal();
              Alert.alert("Synced", `Registered ${result.events_created} events for Today tab.`);
            } catch (error: any) {
              Alert.alert("Error", error.message);
            } finally {
              setClearing(false);
            }
          },
        },
      ]
    );
  };

  const handleClearLegacy = () => {
    Alert.alert(
      "Clear legacy wizard config?",
      "Removes old sleep-window and fixed-block settings from the database. Your knowledge routine is unchanged.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            setClearing(true);
            try {
              await clearSchedule();
              Alert.alert("Cleared", "Legacy schedule config removed.");
            } catch (error: any) {
              Alert.alert("Error", error.message);
            } finally {
              setClearing(false);
            }
          },
        },
      ]
    );
  };

  if (loading) return <ActivityIndicator style={styles.center} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Weekly routine</Text>
      <Text style={styles.sub}>
        Blocks come from knowledge/health/synthesized/routine.md — applied directly to Google Calendar.
      </Text>

      {routine ? (
        <View style={styles.card}>
          <Text style={styles.label}>Ready to apply</Text>
          <Text style={styles.value}>
            {routine.week_start} → {routine.week_end}
          </Text>
          <Text style={styles.row}>{routine.event_count} calendar blocks</Text>
          <Text style={styles.rowMuted}>{routine.source_markdown}</Text>
        </View>
      ) : (
        <View style={styles.warnCard}>
          <Text style={styles.warnText}>
            Could not load routine from API. Restart pios_api after docker-compose fix so /knowledge mounts
            correctly.
          </Text>
        </View>
      )}

      <Pressable
        style={[styles.btnPrimary, !routine && styles.btnDisabled]}
        onPress={() => navigation.navigate("RoutineWeek")}
        disabled={!routine}
      >
        <Text style={styles.btnText}>Preview & apply routine</Text>
      </Pressable>

      <Pressable style={styles.btnSecondary} onPress={() => navigation.navigate("ScheduleWizard")}>
        <Text style={styles.btnSecondaryText}>LLM planning wizard (legacy)</Text>
      </Pressable>

      <Pressable style={styles.btnSecondary} onPress={handleSyncLocal} disabled={clearing || !routine}>
        <Text style={styles.btnSecondaryText}>Sync to app (no new Google events)</Text>
      </Pressable>

      <Pressable style={styles.btnGhost} onPress={handleClearLegacy} disabled={clearing}>
        <Text style={styles.btnGhostText}>{clearing ? "Clearing…" : "Clear legacy wizard config"}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 16, gap: 12, paddingBottom: 32 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: { fontSize: 22, fontWeight: "700" },
  sub: { fontSize: 14, color: "#555", lineHeight: 20 },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 12, gap: 6 },
  warnCard: {
    backgroundColor: "#fff7ed",
    borderColor: "#fdba74",
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
  },
  warnText: { fontSize: 13, color: "#9a3412", lineHeight: 18 },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#059669",
    textTransform: "uppercase",
  },
  value: { fontSize: 18, fontWeight: "600" },
  row: { fontSize: 14, color: "#374151" },
  rowMuted: { fontSize: 12, color: "#6b7280" },
  btnPrimary: {
    backgroundColor: "#059669",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnDisabled: { opacity: 0.5 },
  btnSecondary: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnGhost: { paddingVertical: 10, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  btnSecondaryText: { color: "#374151", fontWeight: "700", fontSize: 16 },
  btnGhostText: { color: "#dc2626", fontWeight: "600", fontSize: 14 },
});
