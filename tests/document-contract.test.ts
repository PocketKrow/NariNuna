import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import pages from "@/data/projectPages.json";
import redirects from "@/data/routeRedirects.json";
import { primaryNavigation, footerNavigation } from "@/data/navigation";

describe("minimal creator document contracts", () => {
  it("keeps seven independent documents, five primary destinations and matching metadata", () => {
    expect(pages).toHaveLength(7);
    expect(new Set(pages.map(({ id }) => id)).size).toBe(7);
    expect(primaryNavigation).toHaveLength(5);
    for (const { href } of [...primaryNavigation, ...footerNavigation]) expect(pages.some(({ path }) => path === href)).toBe(true);
    for (const page of pages) {
      expect(existsSync(`src/pages/${page.source}`)).toBe(true);
      const html = readFileSync(`dist/${page.document}`, "utf8").replaceAll("&#39;", "'");
      expect(html).toContain(`<title>${page.title}`);
      expect(html.match(/<h1\b/g)).toHaveLength(1);
      expect(html.match(/<main\b/g)).toHaveLength(1);
      expect(html).toContain('data-theme="nari"');
      expect(html).toContain('name="theme-color" content="#fffaf4"');
      expect(html).toContain(`data-route="${page.routeName}"`);
      expect(html).not.toMatch(/astro-island|<canvas|room-arrival|haven-passport|room-passage/);
    }
  });
  it("gives retired URLs a real redirect to a matching document and fragment", () => {
    const rules = readFileSync("dist/_redirects", "utf8");
    for (const { fromPath, to } of redirects) {
      expect(rules).toContain(`${fromPath} ${to} 301!`);
      expect(rules).toContain(`${fromPath}index.html ${to} 301!`);
      const [destination, fragment] = to.split("#");
      const target = pages.find(({ path }) => path === destination)!;
      expect(target).toBeDefined();
      if (fragment) expect(readFileSync(`dist/${target.document}`, "utf8")).toContain(`id="${fragment}"`);
      expect(existsSync(`dist${fromPath}index.html`)).toBe(false);
    }
  });
  it("exposes the primary platforms on Home and preserves current-page navigation", () => {
    const html = readFileSync("dist/index.html", "utf8");
    expect(html).toContain('href="https://www.twitch.tv/nari_nuna"');
    expect(html).toContain('href="https://www.youtube.com/@Nari_Nuna"');
    expect(html).toContain('fetchpriority="high"');
    for (const page of pages.filter(({ id }) => id !== "notFound" && id !== "credits")) {
      const html = readFileSync(`dist/${page.document}`, "utf8");
      expect(html).toContain(`href="${page.path}" aria-current="page"`);
    }
  });
});
