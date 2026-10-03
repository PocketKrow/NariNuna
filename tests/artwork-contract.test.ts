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
    const ghostieComponent = readFileSync(resolve(process.cwd(), "src/components/art/GhostieArt.vue"), "utf8");
    const uniqueGhosties = [...new Set(Object.values(communityGhostieArtwork))];

    expect(uniqueGhosties).toHaveLength(12);
    expect(ghostieComponent).toContain("communityGhostieArtwork[variant]");
    expect(ghostieComponent).toContain("<ResponsiveArtwork");
    expect(ghostieComponent).toContain('width="1254"');
    expect(ghostieComponent).toContain("background: transparent");
    expect(ghostieComponent).toContain("drop-shadow");
    expect(ghostieComponent).not.toContain("<canvas");
    expect(ghostieComponent).not.toContain("drawImage");
    expect(ghostieComponent).not.toContain("removeConnectedPaper");
    expect(ghostieComponent).not.toContain("ghostie-strip");
    expect(ghostieComponent).not.toContain("#fffaf3");

    for (const asset of uniqueGhosties) {
      const bytes = readFileSync(resolve(process.cwd(), "src/assets/source/delivery", asset.replace(/^\//, "")));
      expect(bytes.toString("ascii", 8, 12)).toBe("WEBP");
      expect(bytes.toString("ascii", 12, 16)).toBe("VP8X");
      expect(bytes[20] & 0b00010000).toBeTruthy();
      expect(bytes.readUIntLE(24, 3) + 1).toBe(1254);
      expect(bytes.readUIntLE(27, 3) + 1).toBe(1254);
    }

    const consumers = [
      "src/pages/meet-nari/index.astro",
      "src/pages/nail-studio/index.astro",
      "src/pages/haven/index.astro",
      "src/pages/support/index.astro",
      "src/pages/404.astro",
      "src/components/layout/SiteHeader.vue"
    ];

    for (const path of consumers) {
      const source = readFileSync(resolve(process.cwd(), path), "utf8");
      expect(source).toContain("GhostieArt");
      expect(source).not.toContain("GhostieIllustration");
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

  it("keeps the Nari atmosphere active while preserving the existing room artwork family", () => {
    const worldStyles = readFileSync(resolve(process.cwd(), "src/styles/_world.scss"), "utf8");

    expect(worldStyles).not.toContain(environmentArtwork.homeSunset);
    const homePage = readFileSync(resolve(process.cwd(), "src/pages/index.astro"), "utf8");
    expect(homePage).toContain("heroStyle(environmentArtwork.homeSunset)");
    expect(worldStyles).not.toContain(environmentArtwork.homeNight);
    expect(worldStyles).not.toContain(environmentArtwork.homeDaylight);
    expect(retainedAssetExists(environmentArtwork.homeSunset)).toBe(true);
    expect(retainedAssetExists(environmentArtwork.homeNight)).toBe(true);
    expect(retainedAssetExists(environmentArtwork.homeDaylight)).toBe(true);
  });

  it("integrates Nari into distinct Home and Meet Nari hero paintings without separate model overlays", () => {
    const homePage = readFileSync(resolve(process.cwd(), "src/pages/index.astro"), "utf8");
    const meetPage = readFileSync(resolve(process.cwd(), "src/pages/meet-nari/index.astro"), "utf8");
    const meetHero = meetPage.slice(0, meetPage.indexOf("</section>") + "</section>".length);

    expect(environmentArtwork.meetNari).not.toBe(environmentArtwork.homeSunset);
    expect(meetHero).toContain("environmentArtwork.meetNari");
    expect(meetHero).toContain("character-intro--integrated");
    expect(homePage).not.toContain("nariArtwork.fullbody");
    expect(meetHero).not.toContain("nariArtwork.portrait");
  });

  it("keeps secret Prinny artwork out of indexing and ordinary primary navigation", () => {
    const secretDocument = readFileSync(resolve(process.cwd(), "dist/the-prinny-cult/index.html"), "utf8");
    const primaryNavigation = readFileSync(resolve(process.cwd(), "src/data/navigation.ts"), "utf8");
    expect(secretDocument).toContain('content="noindex, nofollow"');
    expect(primaryNavigation).not.toContain("/the-prinny-cult/");
  });
});
