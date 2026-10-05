// Native document/fragment navigation replaces Vue Router; CSS respects the OS preference.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("native document navigation", () => {
  it("preserves fragment destinations in static output", () => {
    for (const [document, ids] of [
      ["haven/index.html", ["haven-door"]],
      ["resources/index.html", ["nail-desk", "creator-shelf", "game-pile"]],
      ["work-with-nari/index.html", ["nari-links", "collaboration-note"]]
    ] as const) {
      const html = readFileSync(`dist/${document}`, "utf8");
      for (const id of ids) expect(html).toContain(`id="${id}"`);
    }
  });
  it("lets reduced motion disable smooth scrolling and document transitions", () => {
    const styles = readFileSync("src/styles/_responsive.scss", "utf8");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
    expect(styles).toContain("scroll-behavior: auto !important");
    expect(readFileSync("src/layouts/SiteLayout.astro", "utf8")).not.toContain("ClientRouter");
  });
});
