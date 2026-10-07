// Public-art inventory and source-string contracts prevent accidental identity replacement or retired UI restoration; they do not establish visual quality or rights.
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { communityGhostieArtwork, environmentArtwork, ghostieArtwork, nariArtwork, officialEmotes, storybookPostcards } from "@/data/artwork";
import { prinnyCultAssets, prinnyRosterCapacity, suppliedPrinnyArtwork } from "@/data/prinnyCult";

function retainedAssetExists(assetPath: string): boolean {
  return existsSync(resolve(process.cwd(), "public", assetPath.replace(/^\//, "")))
    || existsSync(resolve(process.cwd(), "src/assets/source/delivery", assetPath.replace(/^\//, "")));
}

describe("approved-source artwork contracts", () => {
  it("preserves both owner-authorized storybook Nari and her untouched supplied identity", () => {
    expect(retainedAssetExists(nariArtwork.fullbody)).toBe(true);
    expect(retainedAssetExists(nariArtwork.portrait)).toBe(true);
    expect(retainedAssetExists(nariArtwork.avatar)).toBe(true);
    expect(retainedAssetExists(nariArtwork.suppliedModel)).toBe(true);
    expect(retainedAssetExists(nariArtwork.suppliedPortrait)).toBe(true);
    expect(retainedAssetExists(nariArtwork.cozy)).toBe(true);
    expect(nariArtwork.fullbody).toContain("/media/storybook/characters/");
    expect(nariArtwork.suppliedModel).toContain("/media/nari/");
    expect(Object.values(officialEmotes).every(retainedAssetExists)).toBe(true);
  });

  it("gives every shared Ghostie and room illustration a real asset", () => {
    expect(Object.values(ghostieArtwork).every(retainedAssetExists)).toBe(true);
    expect(Object.values(communityGhostieArtwork).every(retainedAssetExists)).toBe(true);
    expect(Object.values(environmentArtwork).every(retainedAssetExists)).toBe(true);
    expect(Object.values(storybookPostcards).every(retainedAssetExists)).toBe(true);
  });

  it("uses individually authored transparent Ghosties without sprite cropping or canvas processing", () => {
    const uniqueGhosties = [...new Set(Object.values(communityGhostieArtwork))];

    expect(uniqueGhosties).toHaveLength(12);
    for (const asset of uniqueGhosties) {
      const bytes = readFileSync(resolve(process.cwd(), "src/assets/source/delivery", asset.replace(/^\//, "")));
      expect(bytes.toString("ascii", 8, 12)).toBe("WEBP");
      expect(bytes.toString("ascii", 12, 16)).toBe("VP8X");
      expect(bytes[20] & 0b00010000).toBeTruthy();
      expect(bytes.readUIntLE(24, 3) + 1).toBe(1254);
      expect(bytes.readUIntLE(27, 3) + 1).toBe(1254);
    }

  });

  it("retains all 27 supplied Prinny designs without fabricating roster lore", () => {
    expect(suppliedPrinnyArtwork).toHaveLength(prinnyRosterCapacity);
    expect(new Set(suppliedPrinnyArtwork.map(({ assetId }) => assetId)).size).toBe(prinnyRosterCapacity);
    expect(suppliedPrinnyArtwork.every(({ src }) => retainedAssetExists(src))).toBe(true);
  });

  it("gives the hidden cult original optimized sanctuary and altar environments", () => {
    expect(retainedAssetExists(prinnyCultAssets.sanctumPainting)).toBe(true);
    expect(retainedAssetExists(prinnyCultAssets.altarPainting)).toBe(true);

    for (const asset of [prinnyCultAssets.sanctumPainting, prinnyCultAssets.altarPainting]) {
      const bytes = readFileSync(resolve(process.cwd(), "public", asset.replace(/^\//, "")));
      expect(bytes.toString("ascii", 8, 12)).toBe("WEBP");
      expect(bytes.byteLength).toBeLessThan(400_000);
    }
  });

  it("uses the owner-authorized model-anchored pose family on Home and Meet Nari", () => {
    for (const document of ["index.html", "meet-nari/index.html"]) {
      const html = readFileSync(`dist/${document}`, "utf8");
      expect(html).toContain("data-nari-model");
      expect(html).toMatch(/data-creator-art="welcome(?:-portrait)?"/);
      expect(html).not.toContain("nari-painted");
      expect(html).not.toMatch(/room-arrival|<canvas|astro-island/);
    }
  });
});
