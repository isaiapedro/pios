import { API_BASE_URL, POLL_INTERVAL_MS, POLL_MAX_ATTEMPTS } from "../config";
import type {
  AppEvent,
  DashboardMetric,
  Insight,
  InferenceLog,
  MemoStatusResponse,
  MemoUploadResponse,
  PeriodType,
  RoutineApplyResponse,
  RoutineCalendar,
} from "../types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...init?.headers },
      ...init,
    });
  } catch {
    throw new Error(
      `Cannot reach API at ${API_BASE_URL}${path}. ` +
        "Use the same Wi-Fi as your PC and open /health in the phone browser first."
    );
  }
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${res.status} ${path}: ${err}`);
  }
  return res.json() as Promise<T>;
}

// ── memos ─────────────────────────────────────────────────────────────────────

export async function uploadMemo(
  audioUri: string,
  eventTitle?: string
): Promise<MemoUploadResponse> {
  const form = new FormData();
  form.append("file", { uri: audioUri, name: "memo.m4a", type: "audio/mp4" } as any);

  const url = eventTitle
    ? `${API_BASE_URL}/memos/upload?event_title=${encodeURIComponent(eventTitle)}`
    : `${API_BASE_URL}/memos/upload`;

  const res = await fetch(url, { method: "POST", body: form });
  if (!res.ok) throw new Error(`Upload failed: ${await res.text()}`);
  return res.json();
}

export async function pollMemoStatus(jobId: string): Promise<MemoStatusResponse> {
  for (let i = 0; i < POLL_MAX_ATTEMPTS; i++) {
    const status = await request<MemoStatusResponse>(`/memos/${jobId}/status`);
    if (status.status === "done" || status.status === "error") return status;
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
  throw new Error("Memo processing timeout");
}

// ── events ────────────────────────────────────────────────────────────────────

export async function confirmEvent(
  eventId: string,
  confirmed: boolean,
  memoId?: string
): Promise<AppEvent> {
  return request<AppEvent>(`/events/${eventId}/confirm`, {
    method: "POST",
    body: JSON.stringify({ confirmed, memo_id: memoId ?? null }),
  });
}

// ── schedule ─────────────────────────────────────────────────────────────────

export async function getSchedule() {
  return request("/schedule");
}

export async function createSchedule(config: unknown) {
  return request("/schedule", { method: "POST", body: JSON.stringify(config) });
}

export async function clearSchedule() {
  const res = await fetch(`${API_BASE_URL}/schedule`, { method: "DELETE" });
  if (!res.ok && res.status !== 404) {
    const err = await res.text();
    throw new Error(`${res.status} /schedule: ${err}`);
  }
}

export async function createPlanningWeek(body: unknown) {
  return request("/planning/week", { method: "POST", body: JSON.stringify(body) });
}

export async function getPlanningRun(runId: string) {
  return request(`/planning/${runId}`);
}

export async function acceptPlanningRun(runId: string) {
  return request(`/planning/${runId}/accept`, { method: "POST" });
}

export async function rejectPlanningRun(runId: string) {
  return request(`/planning/${runId}/reject`, { method: "POST" });
}

export async function getRoutineWeek() {
  return request<RoutineCalendar>("/routine/week");
}

export async function applyRoutineWeek() {
  return request<RoutineApplyResponse>("/routine/apply", { method: "POST" });
}

export async function syncRoutineEventsLocal() {
  return request<RoutineApplyResponse>("/routine/sync-local", { method: "POST" });
}

// ── goals ─────────────────────────────────────────────────────────────────────

export async function createGoal(goal: unknown) {
  return request("/goals", { method: "POST", body: JSON.stringify(goal) });
}

// ── dashboard ─────────────────────────────────────────────────────────────────

export async function getDashboard(): Promise<{ metrics: DashboardMetric[] }> {
  return request("/dashboard");
}

// ── insights ──────────────────────────────────────────────────────────────────

export async function getInsight(period: PeriodType): Promise<Insight> {
  return request(`/insights/${period}`);
}

export async function getInsightHistory(
  period: PeriodType,
  limit = 10,
  offset = 0,
): Promise<Insight[]> {
  return request(`/insights/${period}/history?limit=${limit}&offset=${offset}`);
}

export async function generateInsight(period: PeriodType): Promise<Insight> {
  return request(`/insights/${period}/generate`, { method: "POST" });
}

export async function getInferenceLogs(insightId: string): Promise<InferenceLog[]> {
  return request(`/insights/${insightId}/inferences`);
}

// ── sync ──────────────────────────────────────────────────────────────────────

export async function syncPull(): Promise<{ events: AppEvent[]; latest_insight: Insight | null }> {
  return request("/sync/pull");
}
