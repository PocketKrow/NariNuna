// Exact hashes protect relocated masters and retired artwork. These tests intentionally reject deleting or silently recompressing preserved sources.
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import inventory from "../src/assets/source/delivery/inventory.json";
import intake from "../src/assets/source/vnext/intake.json";
import generated from "@/data/responsive-artwork.json";

describe("source and retired artwork preservation", () => {
  it("retains every relocated byte outside public delivery with traceable provenance", () => {
    expect(new Set(inventory.assets.map(({ previousUrl }) => previousUrl)).size).toBe(inventory.assets.length);
    for (const asset of inventory.assets) {
      const bytes = readFileSync(asset.sourceFile);
      expect(bytes.length).toBe(asset.bytes);
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(asset.sha256);
      expect(existsSync(`public${asset.previousUrl}`)).toBe(false);
    }
  });

  it("records each responsive source independently of its logical runtime lookup key", () => {
    expect(generated._generated).toContain("npm run artwork:prepare");
    for (const [key, artwork] of Object.entries(generated.artworks)) {
      const source = inventory.assets.find(({ previousUrl }) => previousUrl === key);
      const revision = intake.find(({ workingFile }) => workingFile === artwork.sourceFile);
      expect(source?.sourceFile ?? revision?.workingFile).toBe(artwork.sourceFile);
      expect(source?.sha256 ?? revision?.workingSha256).toBe(artwork.sourceSha256);
      expect(artwork.candidates.every(({ src }) => src.startsWith("/media/responsive/"))).toBe(true);
    }
  });
});
