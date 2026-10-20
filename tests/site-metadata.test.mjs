// Exercise configuration boundaries and route discovery independently of a chosen production domain.
import { describe, expect, it } from "vitest";
import pages from "../src/data/projectPages.json" with { type: "json" };
import { siteConfiguration, pageMetadata, sitemap } from "../scripts/site-metadata.mjs";

describe("production metadata", () => {
  it("requires an explicit production context and approved origin", () => {
    expect(() => siteConfiguration({ NARI_DEPLOY_CONTEXT: "production" })).toThrow(/NARI_SITE_ORIGIN/);
    for (const value of ["http://example.com", "https://localhost", "https://127.0.0.1", "https://example.com/path", "https://user:pass@example.com", "https://example.com/?q=x", "https://example.com/#x"]) {
      expect(() => siteConfiguration({ NARI_SITE_ORIGIN: value })).toThrow();
    }
    expect(() => siteConfiguration({ NARI_DEPLOY_CONTEXT: "prod" })).toThrow();
  });
  it("keeps previews noindex without advertising a temporary canonical", () => {
    for (const env of [{}, { NARI_SITE_ORIGIN: "https://example.com" }]) {
      const config = siteConfiguration(env);
      expect(pageMetadata(pages[0], config)).toMatchObject({ noindex: true, canonical: undefined });
      expect(sitemap(pages, config)).toBeNull();
    }
  });
  it("makes every public URL absolute and omits secret and 404 from discovery", () => {
    const config = siteConfiguration({ NARI_SITE_ORIGIN: "https://example.com/", NARI_DEPLOY_CONTEXT: "production" });
    for (const page of pages) {
      const metadata = pageMetadata(page, config);
      if (page.socialImage) {
        expect(metadata.canonical).toBe(`https://example.com${page.path}`);
        expect(metadata.image).toBe(`https://example.com${page.socialImage}`);
        expect(metadata.noindex).toBe(false);
      } else expect(metadata).toMatchObject({ canonical: undefined, noindex: true });
    }
    const xml = sitemap(pages, config);
    expect(xml.match(/<loc>/g)).toHaveLength(10);
    expect(xml).not.toMatch(/the-prinny-cult|404\.html/);
  });
});
