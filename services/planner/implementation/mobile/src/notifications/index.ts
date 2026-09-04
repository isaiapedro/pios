/**
 * Task #11 — Expo local push notifications (Pillar 1 — Capture).
 * Schedules a local notification at each event's scheduled_at.
 * Payload carries event_id for deep-link into the confirmation flow.
 * v1: local scheduling only — no remote push server.
 */
import * as Notifications from "expo-notifications";

import type { AppEvent } from "../types";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestPermissions(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

/**
 * Schedule confirmation prompts for all pending future events.
 * Cancels existing scheduled notifications first to avoid duplicates.
 */
export async function scheduleEventNotifications(events: AppEvent[]): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const now = Date.now();
  for (const event of events) {
    const fireAt = new Date(event.scheduled_at).getTime();
    if (event.status !== "pending" || fireAt <= now) continue;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Event check-in",
        body: `Did “${event.title}” happen?`,
        data: { event_id: event.id },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: new Date(fireAt),
      },
    });
  }
}

/**
 * Register a handler for notification taps. Returns the event_id so the
 * caller can open ConfirmEventModal for that event.
 */
export function onNotificationResponse(handler: (eventId: string) => void) {
  return Notifications.addNotificationResponseReceivedListener((response) => {
    const eventId = response.notification.request.content.data?.event_id;
    if (typeof eventId === "string") handler(eventId);
  });
}
