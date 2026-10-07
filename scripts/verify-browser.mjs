// Verify the exact built artifact under its emitted CSP. No public deployment.
import assert from "node:assert/strict";
import { chromium } from "playwright";
import pages from "../src/data/projectPages.json" with { type: "json" };
import redirects from "../src/data/routeRedirects.json" with { type: "json" };
import { startBrowserPreview } from "./browser-preview.mjs";
const preview = await startBrowserPreview();
const browser = await chromium.launch({ executablePath: process.env.NARI_BROWSER_PATH, headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] }).catch(async (error) => { await preview.close(); throw error; });
const log = [];
try {
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    await context.route("https://i.ytimg.com/**", (route) => route.abort());
    for (const { path } of pages) {
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (event) => { if (event.type() === "error" && /Content Security Policy|Hydration/.test(event.text())) errors.push(event.text()); });
      await page.goto(preview.origin + path);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").count(), 1, `${width}px ${path}: h1`);
      assert.equal(await page.locator("main").count(), 1, `${width}px ${path}: main`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width}px ${path}: overflow`);
      for (const image of await page.locator("img").all()) {
        if (await image.getAttribute("data-optional-preview") !== null) {
          // Explicitly optional thumbnails have separately tested failure-safe outbound links.
          if (await image.isVisible()) await image.scrollIntoViewIfNeeded();
          continue;
        }
        await image.scrollIntoViewIfNeeded();
        assert.equal(await image.evaluate(async (image) => { await image.decode().catch(() => {}); return image.naturalWidth > 0; }), true, `${width}px ${path}: image loads`);
      }
      assert.equal(errors.length, 0, `${width}px ${path}: ${errors.join("; ")}`);
      assert.equal(await page.locator("astro-island, canvas").count(), 0);
      await page.close();
    }
    await context.close();
  }
  log.push("Seven documents at 320/390/768/1024/1440/1920px: local sized images load (optional thumbnails blocked), one h1/main, no overflow or runtime/CSP errors; no hydrated islands or canvas.");
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(preview.origin);
  const summary = page.locator(".mobile-menu summary");
  await summary.focus(); await page.keyboard.press("Enter");
  assert.equal(await page.locator(".mobile-menu").getAttribute("open"), "");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("href")), "/");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".mobile-menu").getAttribute("open"), null);
  assert.equal(await summary.evaluate((el) => el === document.activeElement), true);
  await summary.click(); await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForFunction(() => !document.querySelector(".mobile-menu").open);
  log.push("Native mobile menu opens by keyboard; links are in normal tab order; Escape closes and returns focus; desktop resize closes it.");
  for (const { fromPath, to } of redirects) {
    const response = await context.request.get(preview.origin + fromPath, { maxRedirects: 0 });
    assert.equal(response.status(), 301); assert.equal(response.headers().location, to);
    await page.goto(preview.origin + fromPath);
    assert.equal(new URL(page.url()).pathname + new URL(page.url()).hash, to);
  }
  log.push("All six retired URLs return 301 and land on their intended document/fragment.");
  assert.equal((await page.goto(preview.origin + "/missing-page/")).status(), 404);
  assert.match(await page.locator("h1").innerText(), /Ghostie moved/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(preview.origin);
  assert.equal(await page.locator("[data-nari-model]").evaluate((el) => getComputedStyle(el).animationName), "none");
  log.push("Unknown URL returns branded 404; reduced motion removes the model entrance.");
  await context.close();
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
  const staticPage = await nojs.newPage();
  await staticPage.goto(preview.origin);
  await staticPage.locator(".mobile-menu summary").click();
  await staticPage.locator('.mobile-menu a[href="/meet-nari/"]').click();
  assert.equal(new URL(staticPage.url()).pathname, "/meet-nari/");
  log.push("At 320px with JavaScript disabled, native menu and ordinary document navigation work.");
  await nojs.close();
  console.log(JSON.stringify({ passed: log }, null, 2));
} finally { await browser.close(); await preview.close(); }
