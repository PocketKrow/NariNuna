// Protect semantic paintings and complete copy in the built documents. Computed crops are checked in browser QA.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import pages from "@/data/projectPages.json";
describe("single-owner arrival compositions", () => {
  it.each(pages.filter(({ hero }) => hero !== null))("keeps $path complete in static HTML", ({ document }) => {
    const html = readFileSync(`dist/${document}`, "utf8");
    expect(html).toContain("room-arrival__painting");
    expect(html).toContain('role="img"');
    expect(html).toMatch(/aria-label="[^"]+"/);
    expect(html).toContain(document === 'index.html' ? 'home-room__welcome' : 'room-arrival__copy');
    expect(html).toMatch(/<h1\b/);
    expect(html).not.toMatch(/room-passage|haven-passport/);
  });
});
