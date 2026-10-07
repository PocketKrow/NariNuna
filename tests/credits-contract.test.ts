// Exercise the public registry and standalone validator through its CLI so Node-version-specific TypeScript loaders are unnecessary.
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { artCreditRegistry } from "@/data/artCredits";
const CreditsPage = "credits/index.html";

function validateFixture(mutator: (registry: typeof artCreditRegistry) => void) {
  const fixture = structuredClone(artCreditRegistry);
  mutator(fixture);
  const directory = mkdtempSync(join(tmpdir(), "nari-credit-test-"));
  const path = join(directory, "registry.json");
  writeFileSync(path, JSON.stringify(fixture));
  return spawnSync(process.execPath, [resolve("scripts/validate-credits.mjs"), path], { cwd: process.cwd(), encoding: "utf8" });
}

describe("creative credit registry", () => {
  it("accepts explicit verified, pending and internal dispositions in the canonical registry", () => {
    expect(() => execFileSync(process.execPath, ["scripts/validate-credits.mjs"], { encoding: "utf8" })).not.toThrow();
    expect(artCreditRegistry.credits.some((credit) => credit.creditStatus === "pending")).toBe(true);
    expect(artCreditRegistry.credits.some((credit) => credit.creditStatus === "internal")).toBe(true);

    const verified = validateFixture((registry) => {
      registry.credits[0].creditStatus = "verified";
      registry.credits[0].displayName = "Confirmed Artist";
      registry.credits[0].links = [{ label: "Artist portfolio", url: "https://example.com/artist" }];
    });
    expect(verified.status).toBe(0);
  });

  it("rejects duplicate IDs and missing asset-family dispositions", () => {
    const duplicate = validateFixture((registry) => registry.credits.push(structuredClone(registry.credits[0])));
    expect(duplicate.status).toBe(1);
    expect(duplicate.stderr).toContain("Duplicate credit id");

    const missingDisposition = validateFixture((registry) => {
      registry.credits = registry.credits.filter((credit) => !credit.assetFamilyIds.includes("future-nail-photography"));
    });
    expect(missingDisposition.status).toBe(1);
    expect(missingDisposition.stderr).toContain("future-nail-photography has no explicit credit disposition");
  });

  it("rejects blocked public entries, malformed links and uncleared displayed artwork", () => {
    const blocked = validateFixture((registry) => { registry.credits[0].creditStatus = "blocked"; });
    expect(blocked.stderr).toContain("cannot be page-visible");

    const malformed = validateFixture((registry) => {
      registry.credits[0].links = [{ label: "Artist", url: "http://example.com" }];
    });
    expect(malformed.stderr).toContain("malformed or non-HTTPS link");

    const uncleared = validateFixture((registry) => {
      registry.credits[0].artworkDisplayStatus = "approved";
      registry.credits[0].artwork = [{
        id: "nari-model-archive-test",
        title: "Nari model",
        src: registry.assetFamilies[0].trackedAssets[0],
        alt: "Nari's supplied character model",
        width: 714,
        height: 1800,
        assetFamilyId: "supplied-nari-character",
        category: "Character artwork",
        caption: "Archive validation fixture"
      }];
    });
    expect(uncleared.stderr).toContain("non-approved family supplied-nari-character");
  });

  it("accepts a fully described archive piece from its approved tracked family", () => {
    const approved = validateFixture((registry) => {
      const family = registry.assetFamilies.find(({ id }) => id === "storybook-environments");
      if (family) family.publicationStatus = "approved";
      const credit = registry.credits.find(({ id }) => id === "website-storybook-artwork");
      if (!credit || !family) throw new Error("Fixture requires the website storybook records");
      credit.artworkDisplayStatus = "approved";
      credit.artwork = [{
        id: "haven-sunset-archive-piece",
        title: "Haven at sunset",
        src: family.trackedAssets[0],
        alt: "An illustrated autumn room in the Haven",
        width: 1672,
        height: 941,
        assetFamilyId: family.id,
        category: "Website environment",
        caption: "Approved archive fixture",
        year: 2026
      }];
    });
    expect(approved.status).toBe(0);
  });

  it("renders every public group from data without exposing blocked artwork", async () => {
    const html = readFileSync(`dist/${CreditsPage}`, "utf8").split('id="main-content"')[1].split("</main>")[0];
    expect(html).toContain("The people behind");
    expect(html).toContain("Somber Crow");
    expect(html).toContain("Awaiting confirmation");
    // Owner-directed site decoration is separate from the permission-gated contributor archive.
    expect(html).not.toContain('aria-label="Approved artwork archive"');
    for (const image of html.match(/<img\b[^>]*>/g) ?? []) {
      expect(image).toContain('data-creator-art="correspondence"');
    }
    expect(html).not.toContain("Do not publish");
  });

  it("keeps the registry free of private evidence fields", () => {
    const source = readFileSync(resolve("src/data/artCredits.json"), "utf8");
    expect(source).not.toMatch(/contract|privateMessage|email|legalName|approvalEvidence/i);
  });
});
