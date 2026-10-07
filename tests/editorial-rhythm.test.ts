import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
describe("creator content and boundaries", () => {
  it("keeps the collaboration brief before an honest public-profile contact path", () => {
    const html = readFileSync("dist/work-with-nari/index.html", "utf8");
    expect(html.indexOf("Creator collaborations")).toBeLessThan(html.indexOf("Tell her what you have in mind."));
    expect(html.indexOf("Tell her what you have in mind.")).toBeLessThan(html.indexOf('id="nari-links"'));
    expect(html).toContain("A dedicated business inbox hasn't been published yet.");
    expect(html).not.toMatch(/<form|mailto:/);
  });
  it("puts values before Discord and free presence before optional support", () => {
    const html = readFileSync("dist/links/index.html", "utf8");
    expect(html.indexOf("Respect, care")).toBeLessThan(html.indexOf('href="https://discord.com/invite/'));
    expect(html.indexOf("Just being here")).toBeLessThan(html.indexOf("Nari's Throne wishlist"));
    expect(html).toContain("Financial support never buys access");
    expect(html.match(/href="https:\/\/www.youtube.com\/shorts\//g)).toHaveLength(3);
    expect(html).not.toMatch(/<form|<iframe|<video|autoplay/);
  });
  it("keeps nail practice honest without invented work, services or resources", () => {
    const html = readFileSync("dist/nail-studio/index.html", "utf8");
    expect(html).toContain("Nari's own approved photographs");
    expect(html).toContain("No salon services or bookings");
    expect(html.replace(/&#39;|&#x27;/g, "'")).toContain("Illustration, not Nari's nail work.");
    expect(html).not.toContain('href="/resources/');
  });
});
