// Inspect real Astro sources and built documents; a route must exist independently of JavaScript.
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import projectPages from "@/data/projectPages.json";
import { primaryNavigation, footerNavigation } from "@/data/navigation";

describe("Astro document contracts", () => {
  it("keeps metadata, source routes and navigation synchronized", () => {
    const paths = projectPages.map(({ path }) => path);
    expect(new Set(paths).size).toBe(12);
    expect(new Set(projectPages.map(({ id }) => id)).size).toBe(12);
    for (const { href } of [...primaryNavigation, ...footerNavigation]) expect(paths).toContain(href);
    for (const page of projectPages) {
      expect(existsSync(`src/pages/${page.source}`)).toBe(true);
      const html = readFileSync(`dist/${page.document}`, "utf8").replaceAll("&#39;", "'");
      expect(html).toContain(`<title>${page.title}`);
      expect(html.match(/<h1\b/g)).toHaveLength(1);
      expect(html.match(/<main\b/g)).toHaveLength(1);
      expect(html).toContain('data-theme="nari"');
      expect(html).toContain(`data-route="${page.routeName}"`);
      if (page.socialImage) expect(html).toContain(`property="og:image" content="${page.socialImage}"`);
      else expect(html).toContain('content="noindex, nofollow"');
    }
  });
  it("renders meaningful page content without a full-app mount or client router", () => {
    const home = readFileSync("dist/index.html", "utf8");
    const secret = readFileSync("dist/the-prinny-cult/index.html", "utf8");
    expect(home).toContain("Your favorite chaotic big sister.");
    expect(home).toContain("Find the common room");
    expect(home).not.toContain('id="app"');
    expect(secret).toContain("A suspicious little dood.");
    expect(secret).not.toMatch(/astro-island|site-header|room-passage/);
  });
});
