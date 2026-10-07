import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import manifest from "@/data/anime-artwork.json";
import identity from "@/data/creator-identity.json";
import pages from "@/data/projectPages.json";

const hash = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");

describe("model-anchored anime delivery integrity", () => {
  it("retains the inspected transparent masters and clean proportional non-upscaled delivery", () => {
    for (const art of Object.values(manifest.artworks)) {
      const master = readFileSync(art.source);
      expect(hash(master)).toBe(art.sourceSha256);
      expect(master.length).toBe(art.sourceBytes);
      expect(master.readUInt32BE(16)).toBe(art.sourceWidth);
      expect(master.readUInt32BE(20)).toBe(art.sourceHeight);
      expect(master[25]).toBe(6); // PNG RGBA: do not flatten generated alpha.
      for (const candidate of art.candidates) {
        const bytes = readFileSync(`public${candidate.src}`);
        expect(hash(bytes)).toBe(candidate.sha256);
        expect(bytes.length).toBe(candidate.bytes);
        expect(bytes.length).toBeLessThanOrEqual(150_000);
        expect(candidate.width).toBeLessThanOrEqual(art.sourceWidth);
        expect(candidate.height).toBe(Math.round(art.height * candidate.width / art.width));
        expect(bytes.toString("ascii", 12, 16)).toBe("VP8X");
        expect(bytes[20] & 0b00010000).toBeTruthy();
        expect(bytes.includes(Buffer.from("EXIF"))).toBe(false);
        expect(bytes.includes(Buffer.from("XMP "))).toBe(false);
        expect(candidate.src).toContain(candidate.sha256.slice(0, 16));
      }
    }
  });
  it("gives every built document a custom-art slot and serves no source master", () => {
    for (const { document } of pages) {
      const html = readFileSync(`dist/${document}`, "utf8");
      expect(html).toContain("data-creator-art=");
      expect(html).not.toMatch(/src\/assets\/source|sourceSha256|\.prompt\.txt/);
    }
    const icon = readFileSync(`public${identity.faviconSrc}`);
    expect(hash(icon)).toBe(identity.faviconSha256);
    expect(icon.length).toBeLessThan(10_000);
  });
});
