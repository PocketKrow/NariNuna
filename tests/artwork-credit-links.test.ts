// Contextual links must resolve through the canonical registry and land on real Credits anchors.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { publicCreditById } from "@/data/artCredits";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import ArtworkCreditLink from "@/components/art/ArtworkCreditLink.vue";

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

  it("offers the general Credits page on Home without removing contextual links elsewhere", async () => {
    const renderLink = (pageOnly: boolean) => renderToString(createSSRApp({
      render: () => h(ArtworkCreditLink, { creditId: "website-storybook-artwork", pageOnly })
    }));
    expect(await renderLink(true)).toContain('href="/credits/"');
    expect(await renderLink(false)).toContain('href="/credits/#website-storybook-artwork"');
    const home = readFileSync(resolve("src/pages/index.astro"), "utf8");
    expect(home.match(/<ArtworkCreditLink\b[^>]*\bpageOnly\b/g)).toHaveLength(2);
  });
});
