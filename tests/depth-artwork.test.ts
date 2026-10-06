// New masters are separately traceable; older byte-retention tests continue to protect the migration baseline.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import intake from "../src/assets/source/vnext/intake.json";
import { depthArtwork, roomDepth } from "@/data/roomDepth";
import manifest from "@/data/responsive-artwork.json";
const hash = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");
describe("layered environment delivery", () => {
  it("preserves every original and records its non-destructive working derivative", () => {
    expect(intake).toHaveLength(6);
    for (const asset of intake) {
      expect(hash(asset.sourceFile)).toBe(asset.sourceSha256);
      expect(hash(asset.workingFile)).toBe(asset.workingSha256);
      expect(asset.approvalStatus).toBe("pending");
      expect(asset.publicationStatus).toBe(["haven-room", "nari-window-seat"].includes(asset.id) ? "blocked" : "pending");
      if (asset.id.startsWith("ghostie-")) expect(asset.safeArea).toBeGreaterThanOrEqual(0.1);
    }
  });
  it("resolves all room planes and retains bounded, intentional depth metadata", () => {
    for (const scene of Object.values(roomDepth)) {
      expect(manifest.artworks[scene.resident as keyof typeof manifest.artworks].alpha).toBe(true);
      expect(manifest.artworks[depthArtwork[scene.foreground]].alpha).toBe(true);
      expect(scene.painting).toBeLessThan(scene.residentDepth);
      expect(scene.residentDepth).toBeLessThan(scene.foregroundDepth);
      expect(scene.foregroundDepth).toBeLessThanOrEqual(1);
    }
    expect(manifest.artworks[depthArtwork.character].alpha).toBe(true);
  });
});
