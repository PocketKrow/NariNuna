// Contextual links must resolve through the canonical registry and land on real Credits anchors.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { publicCreditById } from "@/data/artCredits";

const attributedPages = ["index.astro", "meet-nari/index.astro", "nail-studio/index.astro", "haven/index.astro", "stories/index.astro"];

describe("contextual artwork attribution", () => {
  it("uses only real public credit IDs on significant illustrated pages", () => {
    for (const page of attributedPages) {
      const source = readFileSync(resolve("src/pages", page), "utf8");
      const ids = [...source.matchAll(/creditId="([^"]+)"/g)].map((match) => match[1]);
      expect(ids.length, page).toBeGreaterThan(0);
      expect(ids.every((id) => publicCreditById(id)), page).toBe(true);
    }
  });

  it("renders matching fragment targets in the Credits ledger", () => {
    const creditsSource = readFileSync(resolve("src/pages/credits/index.astro"), "utf8");
    expect(creditsSource).toContain('id={credit.id}');
    expect(publicCreditById("website-storybook-artwork")?.pageVisible).toBe(true);
  });
});
