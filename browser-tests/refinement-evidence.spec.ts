import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { expect, test, type Page } from "@playwright/test";

test.skip(!process.env.NARI_REVIEW_LABEL, "Run explicitly for paired base/candidate review.");

// These are review artifacts, not automatically accepted visual baselines.
// Use the real font stack and the same runner for both base and candidate builds.
async function settle(page: Page): Promise<void> {
  await page.waitForFunction(() => [...document.querySelectorAll('astro-island[client="load"]')].every((island) => !island.hasAttribute("ssr")));
  await page.evaluate(() => document.fonts.ready);
}
for (const width of [390, 1440]) {
  test(`review evidence: production typography at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("https://i.ytimg.com/**", (route) => route.abort());
    for (const [name, path] of [
      ["home", "/"], ["meet", "/meet-nari/"], ["streams", "/streams/"], ["nails", "/nail-studio/"],
      ["haven", "/haven/"], ["resources", "/resources/"], ["work", "/work-with-nari/"], ["stories", "/stories/"],
    ]) {
      await page.goto(path);
      await settle(page);
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((element: HTMLImageElement) => element.decode().catch(() => undefined));
      }
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await testInfo.attach(`${name}-${width}-production-fonts`, { body: await page.screenshot({ fullPage: true }), contentType: "image/png" });
      if (process.env.NARI_REVIEW_SNAPSHOT === "1" && name === "nails") {
        const normalization = await page.addStyleTag({ content: ':root { --font-display: "DejaVu Serif"; --font-body: "DejaVu Sans"; --font-detail: "DejaVu Sans Mono"; }' });
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        const snapshot = await page.screenshot({ fullPage: true });
        console.info("NARI_REVIEW_SNAPSHOT " + JSON.stringify({ name, width, data: snapshot.toString("base64") }));
        await normalization.evaluate((node) => node.remove());
      }
      // Optional inline previews let a reviewer inspect CI renders without a local browser or artifact extractor.
      if (process.env.NARI_REVIEW_INLINE === "1" && ((name === "nails") || (name === "resources" && width === 1440) || (name === "work" && width === 390))) {
        const preview = await page.screenshot({ fullPage: true, type: "jpeg", quality: 45 });
        console.info("NARI_REVIEW_IMAGE " + JSON.stringify({ name, width, build: process.env.NARI_REVIEW_LABEL, data: preview.toString("base64") }));
      }
    }
  });
}

test("review evidence: desktop Haven requested-file gzip before and after the doorway", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => Object.defineProperty(navigator, "hardwareConcurrency", { value: 8 }));
  const requested = new Set<string>();
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.origin === "http://127.0.0.1:4175" && /\.(js|css)$/.test(url.pathname)) requested.add(url.pathname);
  });
  const measure = () => [...requested].sort().map((path) => ({
    path, gzipBytes: gzipSync(readFileSync(resolve(process.env.NARI_PREVIEW_ROOT ?? "dist", `.${path}`))).byteLength,
  }));
  await page.goto("/haven/");
  await settle(page);
  await page.waitForTimeout(2200);
  const arrivalOnly = measure();
  const stateBeforeDoor = await page.locator("[data-atmosphere]").getAttribute("data-atmosphere-state");
  await page.locator("#haven-door").scrollIntoViewIfNeeded();
  const supported = await page.evaluate(() => {
    const context = document.createElement("canvas").getContext("webgl2");
    if (!context) return false;
    try {
      return [context.VERTEX_SHADER, context.FRAGMENT_SHADER].every((shader) => (context.getShaderPrecisionFormat(shader, context.HIGH_FLOAT)?.precision ?? 0) > 0);
    } finally {
      context.getExtension("WEBGL_lose_context")?.loseContext();
    }
  });
  if (supported) await expect(page.locator("[data-atmosphere]")).toHaveAttribute("data-atmosphere-state", "active");
  await page.waitForTimeout(300);
  const doorwayVisit = measure();
  const report = {
    method: "Sum of gzip-compressed local JS/CSS files requested at 1440x900, 8 cores, no reduced motion, same runner; not HTTP transfer timings or Core Web Vitals.",
    build: process.env.NARI_REVIEW_LABEL ?? "candidate",
    stateBeforeDoor, supported,
    arrivalOnly: { gzipBytes: arrivalOnly.reduce((sum, file) => sum + file.gzipBytes, 0), files: arrivalOnly },
    doorwayVisit: { gzipBytes: doorwayVisit.reduce((sum, file) => sum + file.gzipBytes, 0), files: doorwayVisit },
  };
  console.info("HAVEN_NETWORK_REVIEW " + JSON.stringify(report));
  await testInfo.attach("haven-requested-gzip.json", { body: JSON.stringify(report, null, 2), contentType: "application/json" });
});

test("review evidence: actual interaction styles", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("https://i.ytimg.com/**", (route) => route.abort());
  const observations = [];
  for (const [path, linkSelector, paperSelector] of [
    ["/stories/", ".media-card--album > a", ".memory-album__pages"],
    ["/nail-studio/", ".studio-workbench__notes .text-link", ".studio-workbench__notes"],
    ["/work-with-nari/", ".letter-link", ".collaboration-letter"],
  ]) {
    await page.goto(path);
    await settle(page);
    const link = page.locator(linkSelector).first();
    await link.hover();
    const hover = await link.evaluate((node) => getComputedStyle(node.querySelector("h3") ?? node).color);
    await link.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    const outline = await link.evaluate((node) => {
      const style = getComputedStyle(node);
      return { color: style.outlineColor, width: style.outlineWidth, style: style.outlineStyle, token: style.getPropertyValue("--focus"), focused: node.matches(":focus-visible") };
    });
    const background = await page.locator(paperSelector).evaluate((node) => getComputedStyle(node).backgroundColor);
    observations.push({ path, hover, outline, background });
    await testInfo.attach(path.split("/")[1] + "-focused-paper", { body: await page.locator(paperSelector).screenshot(), contentType: "image/png" });
  }
  console.info("NARI_INTERACTION_REVIEW " + JSON.stringify({ build: process.env.NARI_REVIEW_LABEL, observations }));
});
