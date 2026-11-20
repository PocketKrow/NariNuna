// Contextual links must resolve through the canonical registry and land on real Credits anchors.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { artCreditRegistry, publicCreditById } from "@/data/artCredits";
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
      expect(ids.every((id) => artCreditRegistry.credits.some((credit) => credit.id === id && credit.creditStatus !== "blocked")), page).toBe(true);
    }
  });

  it("renders matching fragment targets in the Credits ledger", () => {
    const creditsSource = readFileSync(resolve("src/pages/credits/index.astro"), "utf8");
    expect(creditsSource).toContain('id={credit.id}');
    expect(publicCreditById("website-storybook-artwork")).toBeUndefined();
    expect(publicCreditById("somber-crow-website")?.pageVisible).toBe(true);
  });

  it("links hidden entries to Credits and keeps anchors for visible entries", async () => {
    const renderLink = (creditId: string, pageOnly: boolean) => renderToString(createSSRApp({
      render: () => h(ArtworkCreditLink, { creditId, pageOnly })
    }));
    expect(await renderLink("website-storybook-artwork", true)).toContain('href="/credits/"');
    expect(await renderLink("website-storybook-artwork", false)).toContain('href="/credits/"');
    expect(await renderLink("somber-crow-website", false)).toContain('href="/credits/#somber-crow-website"');
    const home = readFileSync(resolve("src/pages/index.astro"), "utf8");
    expect(home.match(/<ArtworkCreditLink\b[^>]*\bpageOnly\b/g)).toHaveLength(2);
  });
});
