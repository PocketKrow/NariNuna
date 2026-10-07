import { readFileSync } from "node:fs";
// Structural style/source guards protect the room material language. Rendered appearance still requires browser comparison.
import { describe, expect, it } from "vitest";
import pages from "@/data/projectPages.json";
// Layout freedom must preserve semantic headings, sized art, and usable destinations.
describe("interior page semantics", () => {
  it.each(pages.map(({ title, document }) => [title, document] as const))("keeps %s readable and navigable without decoration", async (_name, page) => {
    const html = readFileSync(`dist/${page}`, "utf8");
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).not.toMatch(/<h[123][^>]*>\s*<\/h[123]>/);
    for (const image of html.match(/<img\b[^>]*>/g) ?? []) {
      expect(image).toMatch(/\balt(?:=|\s|>)/);
      expect(image).toMatch(/\bwidth="\d+"/);
      expect(image).toMatch(/\bheight="\d+"/);
    }
    for (const link of html.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? []) {
      expect(link).toMatch(/rel="[^"]*noopener[^"]*"/);
      expect(link).toMatch(/rel="[^"]*noreferrer[^"]*"/);
    }
    for (const anchor of html.matchAll(/href="#([^"]+)"/g)) {
      expect(html).toContain(`id="${anchor[1]}"`);
    }
  });
});
