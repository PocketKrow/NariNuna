// Contextual links must resolve through the canonical registry and land on real Credits anchors.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { publicCreditById } from "@/data/artCredits";

const attributedPages = ["index.html", "meet-nari/index.html", "nail-studio/index.html", "streams/index.html", "haven/index.html", "work-with-nari/index.html", "credits/index.html", "404.html"];

describe("contextual artwork attribution", () => {
  it("uses only real public credit IDs on significant illustrated pages", () => {
    for (const page of attributedPages) {
      const source = readFileSync(resolve("dist", page), "utf8");
      const ids = [...source.matchAll(/href="\/credits\/#([^"]+)"/g)].map((match) => match[1]);
      expect(ids.length, page).toBeGreaterThan(0);
      expect(ids.every((id) => publicCreditById(id)), page).toBe(true);
    }
  });

  it("renders matching fragment targets in the Credits ledger", () => {
    const creditsSource = readFileSync(resolve("dist/credits/index.html"), "utf8");
    for (const page of attributedPages) {
      const html = readFileSync(resolve("dist", page), "utf8");
      for (const match of html.matchAll(/href="\/credits\/#([^"]+)"/g)) {
        expect(creditsSource).toContain(`id="${match[1]}"`);
      }
    }
    expect(publicCreditById("website-storybook-artwork")?.pageVisible).toBe(true);
  });
});
