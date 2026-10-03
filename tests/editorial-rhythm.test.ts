import { readFileSync } from "node:fs";
// Source-level guards retain distinct room compositions and responsive reading rules. They are not screenshot or computed-layout assertions.
import { describe, expect, it } from "vitest";
const WorkPage = "work-with-nari/index.html";
const StreamsPage = "streams/index.html";
const ResourcesPage = "resources/index.html";
const SupportPage = "support/index.html";

// Protect visitor journeys in rendered output, rather than historical CSS spellings.
describe("room reading order", () => {
  it("puts collaboration fit and the brief before the social directory", async () => {
    const html = readFileSync(`dist/${WorkPage}`, "utf8");
    expect(html.indexOf("Creator collaborations")).toBeLessThan(html.indexOf("Tell her what you have in mind."));
    expect(html.indexOf("Tell her what you have in mind.")).toBeLessThan(html.indexOf('id="nari-links"'));
    expect(html).toContain("A dedicated business inbox hasn't been published yet.");
    expect(html).not.toMatch(/<form|mailto:/);
  });

  it("leads with real clips after the stream opening", async () => {
    const html = readFileSync(`dist/${StreamsPage}`, "utf8");
    expect(html.indexOf("The Kim Possible moment")).toBeLessThan(html.indexOf("Want the whole evening?"));
    expect(html.match(/href="https:\/\/www.youtube.com\/shorts\//g)).toHaveLength(3);
    expect(html).not.toMatch(/<iframe|<video|autoplay|No pretend live schedule/);
  });

  it("omits client samples while retaining the honest curating state", async () => {
    const html = readFileSync(`dist/${ResourcesPage}`, "utf8");
    expect(html).not.toMatch(/Client preview|Demonstration only:|Demo entry|Practice-station reset/);
    expect(html).toContain("The shelves are sparse on purpose");
    expect(html).toContain("Empty space beats a recommendation");
    expect(html).toContain("A recommendation should earn its place.");
  });

  it("puts free support before the wishlist and preserves the boundary", async () => {
    const html = readFileSync(`dist/${SupportPage}`, "utf8");
    expect(html.indexOf("Just be here")).toBeLessThan(html.indexOf("There's a wishlist, too."));
    expect(html).toContain("Financial support never buys access");
    expect(html).not.toMatch(/<form|<iframe/);
  });
});
