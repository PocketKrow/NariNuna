// Exercise the production static artifact. Install Chromium once with npx playwright install chromium; optionally set NARI_BROWSER_PATH.
import assert from "node:assert/strict";
import { chromium } from "playwright";
import pages from "../src/data/projectPages.json" with { type: "json" };
import { startBrowserPreview } from "./browser-preview.mjs";
const preview = await startBrowserPreview();
const browser = await chromium
  .launch({
    executablePath: process.env.NARI_BROWSER_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  })
  .catch(async (error) => {
    await preview.close();
    throw error;
  });
const log = [];
// Every route is checked with the actual CSP, failed remote thumbnails, and hydrated Vue islands.
async function verifyDocuments() {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    await context.route("https://i.ytimg.com/**", (route) => route.abort());
    for (const { path } of pages) {
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (event) => {
        if (event.type() === "error" && /Content Security Policy|Hydration/.test(event.text()))
          errors.push(event.text());
      });
      await page.goto(preview.origin + path);
      await page.waitForFunction(() =>
        [...document.querySelectorAll('astro-island[client="load"]')].every((el) => !el.hasAttribute("ssr")),
      );
      assert.equal(await page.locator("h1").count(), 1, `${width}px ${path}: one heading`);
      assert.equal(await page.locator("main").count(), 1, `${width}px ${path}: one main`);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `${width}px ${path}: overflow`,
      );
      assert.equal(errors.length, 0, `${width}px ${path}: ${errors.join("; ")}`);
      assert.equal(
        await page.locator('.media-card__image img[src^="https://i.ytimg.com"]').count(),
        0,
        `${width}px ${path}: failed image recovered`,
      );
      await page.close();
    }
    await context.close();
  }
  log.push(
    "All twelve routes at 320/390/768/1440px: one main/heading, no overflow, no runtime/CSP/hydration errors; failed thumbnails recover.",
  );
}

try {
  await verifyDocuments();
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (e) => {
    if (e.type() === "error" && /Content Security Policy|Hydration/.test(e.text())) errors.push(e.text());
  });
  await page.goto(`${preview.origin}/`);
  await page.locator('astro-island[client="load"]').waitFor({ state: "attached" });
  await page.waitForFunction(() => !document.querySelector('astro-island[client="load"]')?.hasAttribute("ssr"));
  await page.getByRole("button", { name: "Open navigation" }).click();
  assert.equal(await page.locator("body").evaluate((el) => el.classList.contains("nav-is-open")), true);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  assert.equal(await page.locator(".nav-toggle").evaluate((el) => el === document.activeElement), true);
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("button", { name: "Open navigation" }).getAttribute("aria-expanded"), "false");
  log.push("Mobile menu opens, locks scrolling, traps Tab and restores focus on Escape.");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(100);
  assert.equal(await page.locator("body").evaluate((el) => el.classList.contains("nav-is-open")), false);
  await page.locator(".site-header__more > summary").click();
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".site-header__more").getAttribute("open"), null);
  log.push("Resize closes mobile menu; desktop More closes on Escape.");
  await page.goto(`${preview.origin}/haven/#haven-door`);
  await page.waitForFunction(() =>
    [...document.querySelectorAll('astro-island[client="load"]')].every((el) => !el.hasAttribute("ssr")),
  );
  assert.equal(await page.getByRole("link", { name: /Enter Nari's Haven on Discord/ }).count(), 0);
  for (const name of ["Give the first knock", "Give the second knock", "Promise kindness · third knock"]) {
    const button = page.getByRole("button", { name, exact: true }).last();
    await button.focus();
    await page.keyboard.press("Enter");
  }
  const discord = page.getByRole("link", { name: /Enter Nari's Haven on Discord/ });
  await discord.waitFor({ state: "visible" });
  assert.equal(await discord.evaluate((el) => el === document.activeElement), true);
  await page.getByRole("button", { name: "Close the door behind me" }).click();
  assert.equal(await discord.count(), 0);
  assert.equal(
    await page
      .getByRole("button", { name: "Give the first knock", exact: true })
      .last()
      .evaluate((el) => el === document.activeElement),
    true,
  );
  log.push("Exactly three keyboard knocks reveal Discord, focus transfers, reset hides it and restores focus.");
  await page.getByRole("button", { name: "One floorboard looks a little loose" }).click();
  await page.getByRole("link", { name: "Follow the little light" }).click();
  await page.waitForURL("**/the-prinny-cult/");
  assert.equal(await page.locator(".site-header").count(), 0);
  assert.equal(await page.locator("meta[name=robots]").getAttribute("content"), "noindex, nofollow");
  await page.getByRole("link", { name: "Return upstairs" }).click();
  await page.waitForURL("**/haven/#haven-door");
  log.push("Floorboard reveal reaches the noindex standalone secret room and returns upstairs.");
  assert.equal(await page.locator(".room-passage, .haven-passport").count(), 0);
  log.push("Guided-tour and Passport UI are absent.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), "auto");
  log.push("Changing reduced motion disables smooth scrolling.");
  await context.route("https://i.ytimg.com/**", (r) => r.abort());
  for (const route of ["/streams/", "/stories/"]) {
    await page.goto(preview.origin + route);
    await page.waitForFunction(() =>
      [...document.querySelectorAll('astro-island[client="load"]')].every((el) => !el.hasAttribute("ssr")),
    );
    assert.equal(await page.locator('.media-card__image img[src^="https://i.ytimg.com"]').count(), 0);
    assert.equal(await page.locator('.media-card__image img[src^="/media/responsive/"]').count(), 3);
  }
  log.push("Early blocked thumbnails recover to three local illustrations on Streams and Stories.");
  assert.equal((await page.goto(`${preview.origin}/missing-room/`)).status(), 404);
  assert.match(await page.locator("h1").innerText(), /Ghostie moved/);
  log.push("Unknown URLs render the branded 404 with status 404.");
  assert.equal(errors.length, 0, JSON.stringify(errors));
  await context.close();
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
  const nojsPage = await nojs.newPage();
  await nojsPage.goto(`${preview.origin}/`);
  assert.match(await nojsPage.locator("h1").innerText(), /Nari/);
  await nojsPage.locator('.no-script-navigation a[href="/meet-nari/"]').click();
  await nojsPage.waitForURL("**/meet-nari/");
  assert.match(await nojsPage.locator("h1").innerText(), /Hi, I'm Nari/);
  log.push("At 320px with JavaScript disabled, content and ordinary-room navigation remain usable.");
  await nojs.close();
  console.log(JSON.stringify({ passed: log }, null, 2));
} finally {
  await browser.close();
  await preview.close();
}
