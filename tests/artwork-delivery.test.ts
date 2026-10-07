// Byte/hash and selection contracts protect retained originals and emitted candidates; runtime projection equality rejects stale or oversized metadata.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import generated from "@/data/responsive-artwork.json";
import runtime from "@/data/responsive-artwork.runtime.json";
import { artworkCandidates, artworkSrc, artworkSrcset } from "@/data/artworkDelivery";
import { communityGhostieArtwork, environmentArtwork, storybookPostcards } from "@/data/artwork";
import models from "@/data/model-delivery.json";
import identity from "@/data/creator-identity.json";

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

  it("preserves original-model sources and emits clean, non-upscaled transparent derivatives", () => {
    for (const asset of Object.values(models)) {
      expect(hash(readFileSync(asset.source))).toBe(asset.sourceSha256);
      for (const candidate of asset.candidates) {
        const bytes = readFileSync(`public${candidate.src}`);
        expect(hash(bytes)).toBe(candidate.sha256);
        expect(bytes.length).toBe(candidate.bytes);
        expect(candidate.width).toBeLessThanOrEqual(asset.width);
        expect(candidate.height).toBe(Math.round(asset.height * candidate.width / asset.width));
        expect(bytes.includes(Buffer.from("EXIF"))).toBe(false);
        expect(bytes.includes(Buffer.from("XMP "))).toBe(false);
        expect(bytes[20] & 0b00010000).toBeTruthy();
      }
    }
    const largest = Math.max(...models.portrait.candidates.map(({ bytes }) => bytes));
    const ghost = Math.max(...manifest[communityGhostieArtwork.cozy].candidates.filter(({ width }) => width <= 256).map(({ bytes }) => bytes));
    expect(largest + ghost).toBeLessThan(150_000);
  });
  it("keeps the identity master, model provenance and clean share delivery synchronized", () => {
    expect(hash(readFileSync(identity.source))).toBe(identity.sourceSha256);
    expect(hash(readFileSync(identity.master))).toBe(identity.masterSha256);
    const delivery = readFileSync(`public${identity.src}`);
    expect(hash(delivery)).toBe(identity.sha256);
    expect(delivery.length).toBe(identity.bytes);
    expect(identity.bytes).toBeLessThan(100_000);
    expect(delivery.includes(Buffer.from("Exif"))).toBe(false);
    expect(readFileSync("public/favicon.svg", "utf8")).toBe(readFileSync("src/assets/source/minimal/nari-monogram.svg", "utf8"));
  });

});
