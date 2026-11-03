import { describe, expect, it } from "vitest";
import { getPublishedStreamSchedule, type StreamSchedule } from "@/data/schedule";

// Fixture labels are test-only; no fabricated stream is published by this suite.
const fixture: StreamSchedule = {
  periodLabel: "Test period", timeZone: "Test timezone", updatedLabel: "Test date",
  publishedAt: "2026-11-02T12:00:00Z", expiresAt: "2026-11-09T12:00:00Z",
  entries: [{ dateLabel: "Test day", timeLabel: "Test time", title: "Test stream" }],
};
describe("build-time stream schedule publication", () => {
  it("accepts an unpublished schedule", () => { expect(getPublishedStreamSchedule(null)).toBeNull(); });
  it("publishes the exact record from publication until expiry", () => {
    expect(getPublishedStreamSchedule(fixture, new Date(fixture.publishedAt))).toBe(fixture);
    expect(getPublishedStreamSchedule(fixture, new Date("2026-11-06T12:00:00Z"))).toBe(fixture);
  });
  it("holds future records and expires at the exact boundary", () => {
    expect(getPublishedStreamSchedule(fixture, new Date("2026-11-02T11:59:59Z"))).toBeNull();
    expect(getPublishedStreamSchedule(fixture, new Date(fixture.expiresAt))).toBeNull();
    expect(getPublishedStreamSchedule(fixture, new Date("2026-11-10T12:00:00Z"))).toBeNull();
  });
  it("rejects empty entries and invalid or reversed publication windows", () => {
    const now = new Date("2026-11-06T12:00:00Z");
    expect(getPublishedStreamSchedule({ ...fixture, entries: [] }, now)).toBeNull();
    for (const invalid of ["not-a-date", "2026-11-02", "2026-02-30T12:00:00Z", "2026-11-02T12:00:00+00:00"]) {
      expect(getPublishedStreamSchedule({ ...fixture, publishedAt: invalid }, now)).toBeNull();
      expect(getPublishedStreamSchedule({ ...fixture, expiresAt: invalid }, now)).toBeNull();
    }
    expect(getPublishedStreamSchedule({ ...fixture, expiresAt: fixture.publishedAt }, now)).toBeNull();
    expect(getPublishedStreamSchedule({ ...fixture, expiresAt: "2026-11-01T12:00:00Z" }, now)).toBeNull();
    expect(getPublishedStreamSchedule(fixture, new Date("invalid"))).toBeNull();
  });
});
