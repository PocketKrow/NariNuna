// Keep the environmental links sparse, meaningful, and inside the ordinary public rooms.
import { describe, expect, it } from "vitest";
import { havenRooms } from "@/data/rooms";
import { roomDiscoveries } from "@/data/roomDiscoveries";

describe("cross-room discoveries", () => {
  it("keeps four unique details between ordinary rooms without exposing the secret route", () => {
    const rooms = new Set(havenRooms.map((room) => room.href));
    expect(roomDiscoveries).toHaveLength(4);
    expect(new Set(roomDiscoveries.map(({ id }) => id)).size).toBe(roomDiscoveries.length);
    for (const discovery of roomDiscoveries) {
      expect(rooms.has(discovery.from)).toBe(true);
      expect(rooms.has(discovery.href.split("#")[0])).toBe(true);
      expect(discovery.href).not.toContain("prinny");
      expect(discovery.label.length).toBeGreaterThan(0);
      expect(discovery.note.length).toBeGreaterThan(0);
    }
  });
});
