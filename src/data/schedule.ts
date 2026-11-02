// Reviewed local content is selected when the static site is built. Rebuild before expiry.
export interface StreamSchedule {
  periodLabel: string;
  timeZone: string;
  updatedLabel: string;
  /** Unambiguous UTC publication window; display labels retain Nari's supplied wording. */
  publishedAt: string;
  expiresAt: string;
  entries: Array<{
    dateLabel: string;
    timeLabel: string;
    title: string;
    note?: string;
  }>;
}

/** Reject malformed, empty, future and expired records rather than showing stale plans. */
export function getPublishedStreamSchedule(schedule: StreamSchedule | null, now: Date = new Date()): StreamSchedule | null {
  if (!schedule || !schedule.entries.length) return null;
  const parseUtc = (value: string): number => {
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) return NaN;
    const timestamp = Date.parse(value);
    if (!Number.isFinite(timestamp)) return NaN;
    const normalized = value.includes(".") ? value : value.replace("Z", ".000Z");
    return new Date(timestamp).toISOString() === normalized ? timestamp : NaN;
  };
  const publishedAt = parseUtc(schedule.publishedAt);
  const expiresAt = parseUtc(schedule.expiresAt);
  const currentTime = now.getTime();
  if (!Number.isFinite(publishedAt) || !Number.isFinite(expiresAt) || !Number.isFinite(currentTime)) return null;
  if (expiresAt <= publishedAt || currentTime < publishedAt || currentTime >= expiresAt) return null;
  return schedule;
}

// Replace null only with Nari's approved, dated plans. There is no runtime feed.
export const streamSchedule: StreamSchedule | null = null;
