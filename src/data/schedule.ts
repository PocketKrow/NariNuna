// Replace null with a dated schedule when Nari has approved one. See README for the shape.
// Times are written exactly as supplied; the shared timeZone label must be explicit.
export interface StreamSchedule {
  periodLabel: string;
  timeZone: string;
  updatedLabel: string;
  entries: Array<{
    dateLabel: string;
    timeLabel: string;
    title: string;
    note?: string;
  }>;
}

export const streamSchedule: StreamSchedule | null = null;
