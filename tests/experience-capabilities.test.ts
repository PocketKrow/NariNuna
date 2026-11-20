import { describe, expect, it } from "vitest";
import { canAnimate } from "@/experiences/core/capabilities";
const desktop = { reducedMotion: false, saveData: false, coarsePointer: false, width: 1440, cores: 8 };
describe("progressive motion policy", () => {
  it("never imports choreography for reduced motion or save-data", () => {
    expect(canAnimate({ ...desktop, reducedMotion: true })).toBe(false);
    expect(canAnimate({ ...desktop, saveData: true })).toBe(false);
  });
});
