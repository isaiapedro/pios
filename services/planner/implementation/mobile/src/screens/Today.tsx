/**
 * Pillar 1: Capture — event list + confirm flow + free-form memo button.
 */
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { confirmEvent, syncPull } from "../api/client";
import ConfirmEventModal from "../components/ConfirmEventModal";
import { openDb, upsertEvents } from "../db/schema";
import type { RootStackParams } from "../navigation/RootNavigator";
import { onNotificationResponse, scheduleEventNotifications } from "../notifications";
import type { AppEvent } from "../types";

export default function Today() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AppEvent | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { events: evts } = await syncPull();
      setEvents(evts);
      const db = await openDb();
      await upsertEvents(db, evts);
      await scheduleEventNotifications(evts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  useEffect(() => {
    const sub = onNotificationResponse((eventId) => {
      const evt = events.find((e) => e.id === eventId);
      if (evt) setSelected(evt);
    });
    return () => sub.remove();
  }, [events]);

  const handleSkip = async (event: AppEvent) => {
    setSelected(null);
    await confirmEvent(event.id, false);
    load();
  };

  const handleConfirmNoMemo = async (event: AppEvent) => {
    setSelected(null);
    await confirmEvent(event.id, true);
    load();
  };

  const handleConfirmWithMemo = async (event: AppEvent) => {
    setSelected(null);
    await confirmEvent(event.id, true);
    navigation.navigate("RecordMemo", { eventTitle: event.title, eventId: event.id });
  };

  if (loading) return <ActivityIndicator style={styles.center} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>
              {new Date(item.scheduled_at).toLocaleString([], {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            {item.status === "pending" ? (
              <Pressable style={styles.checkBtn} onPress={() => setSelected(item)}>
                <Text style={styles.checkText}>Check in</Text>
              </Pressable>
            ) : (
              <Text style={styles.status}>{item.status}</Text>
            )}
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.empty}>No upcoming events in the app yet.</Text>
            <Text style={styles.emptyHint}>
              Apply the weekly routine from the Schedule tab. Events sync here after they are saved.
            </Text>
          </View>
        }
      />

      <Pressable style={styles.fab} onPress={() => navigation.navigate("RecordMemo")}>
        <Text style={styles.fabText}>+ Memo</Text>
      </Pressable>

      <ConfirmEventModal
        event={selected}
        onClose={() => setSelected(null)}
        onSkip={handleSkip}
        onConfirmNoMemo={handleConfirmNoMemo}
        onConfirmWithMemo={handleConfirmWithMemo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center" },
  card: { backgroundColor: "#fff", margin: 8, padding: 16, borderRadius: 12 },
  title: { fontSize: 16, fontWeight: "600" },
  time: { fontSize: 13, color: "#888", marginTop: 4 },
  checkBtn: {
    marginTop: 12,
    backgroundColor: "#6366f1",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  checkText: { color: "#fff", fontWeight: "600" },
  status: { marginTop: 8, color: "#888", textTransform: "capitalize" },
  emptyWrap: { padding: 24, gap: 8 },
  empty: { textAlign: "center", color: "#666", fontSize: 15 },
  emptyHint: { textAlign: "center", color: "#999", fontSize: 13, lineHeight: 18 },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#6366f1",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 28,
  },
  fabText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
