import { describe, expect, it } from "vitest";
import { canAnimate, canRenderAtmosphere } from "@/experiences/core/capabilities";
const desktop = { reducedMotion: false, saveData: false, coarsePointer: false, width: 1440, cores: 8 };
describe("progressive atmosphere policy", () => {
  it("allows a capable desktop", () => { expect(canRenderAtmosphere(desktop)).toBe(true); });
  it.each([
    { reducedMotion: true }, { saveData: true }, { coarsePointer: true }, { width: 390 }, { cores: 2 },
  ])("keeps static artwork for %o", (overrides) => { expect(canRenderAtmosphere({ ...desktop, ...overrides })).toBe(false); });
  it("never imports choreography for reduced motion or save-data", () => {
    expect(canAnimate({ ...desktop, reducedMotion: true })).toBe(false);
    expect(canAnimate({ ...desktop, saveData: true })).toBe(false);
  });
});
