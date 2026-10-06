// Byte/hash and selection contracts protect retained originals and emitted candidates; runtime projection equality rejects stale or oversized metadata.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import generated from "@/data/responsive-artwork.json";
import runtime from "@/data/responsive-artwork.runtime.json";
import { artworkCandidates, artworkSrc, artworkSrcset, heroSources } from "@/data/artworkDelivery";
import { communityGhostieArtwork, environmentArtwork, storybookPostcards } from "@/data/artwork";
import { routeHeroArtwork } from "../scripts/hero-preloads";

const manifest = generated.artworks;

const hash = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");

describe("responsive artwork delivery", () => {
  it("ships exactly the selection projection without losing or reordering candidates", () => {
    const expected = Object.fromEntries(Object.entries(manifest).map(([key, asset]) => [key, {
      width: asset.width,
      height: asset.height,
      candidates: asset.candidates.map(({ src, width, height }) => ({ src, width, height }))
    }]));
    expect(runtime).toEqual(expected);
  });

  it("preserves source identity, alpha, dimensions and content-addressed byte budgets", () => {
    for (const asset of Object.values(manifest)) {
      expect(hash(readFileSync(asset.sourceFile))).toBe(asset.sourceSha256);
      let lastWidth = 0;
      for (const candidate of asset.candidates) {
        const bytes = readFileSync(`public${candidate.src}`);
        expect(bytes.length).toBe(candidate.bytes);
        expect(bytes.length).toBeLessThanOrEqual(150_000);
        expect(hash(bytes)).toBe(candidate.sha256);
        expect(candidate.src).toContain(`.${candidate.sha256.slice(0, 16)}.webp`);
        expect(candidate.width).toBeGreaterThan(lastWidth);
        expect(candidate.width).toBeLessThanOrEqual(asset.width);
        expect(candidate.height).toBe(Math.round(asset.height * candidate.width / asset.width));
        expect(bytes.toString("ascii", 8, 12)).toBe("WEBP");
        expect(bytes.includes(Buffer.from("EXIF"))).toBe(false);
        expect(bytes.includes(Buffer.from("XMP "))).toBe(false);
        if (asset.alpha) {
          expect(bytes.toString("ascii", 12, 16)).toBe("VP8X");
          expect(bytes[20] & 0b00010000).toBeTruthy();
          expect(bytes.readUIntLE(24, 3) + 1).toBe(candidate.width);
          expect(bytes.readUIntLE(27, 3) + 1).toBe(candidate.height);
        }
        lastWidth = candidate.width;
      }
    }
  });

  it("provides small header images, capped candidates, and no original fallback", () => {
    expect(artworkSrc(communityGhostieArtwork.wave, 48)).toContain("-64.");
    expect(artworkSrc(communityGhostieArtwork.wave, 96)).toContain("-128.");
    expect(artworkSrc(environmentArtwork.homeSunset, 4000)).toContain("-1672.");
    expect(artworkSrcset(storybookPostcards.streams)).toContain("128w");
    expect(() => artworkCandidates("/missing.webp")).toThrow("Missing responsive artwork");
  });

  it("budgets all five object layers, inhabitants, portrait and background on Home", () => {
    const maximum = (source: string, width = Infinity) => Math.max(...manifest[source as keyof typeof manifest].candidates.filter((candidate) => candidate.width <= width).map((candidate) => candidate.bytes));
    const total = maximum(environmentArtwork.homeSunset)
      + ["monitor", "polish", "album", "door", "letter"].reduce((sum, name) => sum + maximum(`/media/haven/objects/${name}.webp`), 0)
      + ["sleepy", "mischief", "welcome", "messenger"].reduce((sum, name) => sum + maximum(`/media/haven/ghosties/${name}.webp`, 256), 0)
      + maximum("/media/haven/objects/foreground.webp", 480)
      + maximum(communityGhostieArtwork.wave, 128)
      + readFileSync("public/media/nari/nari-model-portrait.webp").length;
    // Doc 44 documents the composed-room adjustment; per-image and JS budgets stay unchanged.
    expect(total).toBeLessThanOrEqual(600_000);
    const component = readFileSync("src/components/art/ResponsiveArtwork.vue", "utf8");
    expect(component).toContain('loading: "lazy"');
  });

  it("gives all nine ordinary documents matching CSS/picture/preload candidates", () => {
    expect(Object.keys(routeHeroArtwork)).toHaveLength(9);
    expect(routeHeroArtwork["404.html"]).toBeUndefined();
    expect(routeHeroArtwork["the-prinny-cult/index.html"]).toBeUndefined();
    for (const source of Object.values(routeHeroArtwork)) {
      const sources = heroSources(source);
      expect(sources).toHaveLength(3);
      for (const band of sources) {
        for (const entry of band.srcset.split(", ")) {
          const [url, density] = entry.split(" ");
          expect(band.background).toContain(`url("${url}") ${density}`);
          expect(artworkCandidates(band.source).some((candidate) => candidate.src === url)).toBe(true);
        }
      }
    }
  });
});
