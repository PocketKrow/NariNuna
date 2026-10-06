import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import pages from "../src/data/projectPages.json" with { type: "json" };

async function settle(page: Page): Promise<void> {
  await page.waitForFunction(() => [...document.querySelectorAll('astro-island[client="load"]')].every((el) => !el.hasAttribute("ssr")));
  await page.evaluate(() => document.fonts.ready);
}
async function scan(page: Page): Promise<void> {
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(({ target }) => target) }))).toEqual([]);
}

for (const width of [320, 390, 768, 1440]) {
  test(`room objects remain labelled native destinations without JavaScript at ${width}px`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 900 } });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4175/');
    const destinations = ['/streams/', '/nail-studio/', '/meet-nari/', '/haven/', '/work-with-nari/'];
    const links = page.locator('.home-room__objects > a');
    await expect(links).toHaveCount(5);
    for (let index = 0; index < destinations.length; index++) {
      const link = links.nth(index);
      await expect(link).toHaveAttribute('href', destinations[index]);
      await expect(link.locator('strong')).toBeVisible();
      await link.scrollIntoViewIfNeeded();
      const label = link.locator('.room-object__label');
      expect(await label.evaluate((el) => {
        const r = el.getBoundingClientRect();
        return document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)?.closest('a') === el.closest('a');
      })).toBe(true);
      await link.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(`http://127.0.0.1:4175${destinations[index]}`);
      await page.goBack();
    }
    await context.close();
  });
}
for (const width of [390, 1440]) {
  test(`all routes pass axe at ${width}px`, async ({ page }) => {
    // This one test scans twelve documents; allow slow CI hosts without relaxing axe assertions.
    test.setTimeout(90_000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("https://i.ytimg.com/**", (route) => route.abort());
    for (const route of pages) {
      await page.goto(route.path);
      await settle(page);
      await scan(page);
      await expect(page.locator(".room-passage, .haven-passport")).toHaveCount(0);
    }
  });
  for (const [name, path] of [["home", "/"], ["meet", "/meet-nari/"], ["haven", "/haven/"], ["nails", "/nail-studio/"]] as const) {
    test(`${name} composition at ${width}px`, async ({ page, browserName }) => {
      // Eight Linux Chromium baselines; other engines run interaction/accessibility checks without sharing raster expectations.
      test.skip(browserName !== "chromium", "Visual baselines belong to the Chromium PR job.");
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await settle(page);
      // Normalize Linux test fonts so CI checks composition rather than the host's optional serif aliases.
      await page.addStyleTag({ content: ':root { --font-display: "DejaVu Serif"; --font-body: "DejaVu Sans"; --font-detail: "DejaVu Sans Mono"; }' });
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((element: HTMLImageElement) => element.decode().catch(() => undefined));
      }
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await expect(page).toHaveScreenshot(`${name}-${width}.png`, { fullPage: true });
    });
  }
}

test("navigation and every doorway state pass axe", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 667 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/haven/"); await settle(page);
  await page.getByRole("button", { name: "Open navigation" }).click(); await scan(page);
  await page.keyboard.press("Escape");
  for (const label of ["Give the first knock", "Give the second knock", "Promise kindness · third knock"]) {
    await page.getByRole("button", { name: label, exact: true }).last().click();
    await scan(page);
  }
  await expect(page.getByRole("link", { name: /Enter Nari's Haven on Discord/ })).toBeVisible();
  await page.getByRole("button", { name: "Close the door behind me" }).click();
  await scan(page);
});

test("static documents survive JavaScript and enhancement failure", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 568 } });
  const page = await context.newPage();
  for (const route of pages) {
    await page.goto(`http://127.0.0.1:4175${route.path}`);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  }
  await context.close();
});

test("reduced motion, save-data and mobile never fetch decorative runtimes", async ({ browser }) => {
  for (const mode of ["reduced", "save-data", "mobile"] as const) {
    const context = await browser.newContext({ reducedMotion: mode === "reduced" ? "reduce" : "no-preference", viewport: { width: mode === "mobile" ? 390 : 1440, height: 900 } });
    if (mode === "save-data") await context.addInitScript(() => Object.defineProperty(navigator, "connection", { value: { saveData: true } }));
    const page = await context.newPage();
    const enhancements: string[] = [];
    page.on("request", (request) => { if (/\/assets\/(motion|atmosphere)\./.test(request.url())) enhancements.push(request.url()); });
    await page.goto("http://127.0.0.1:4175/"); await settle(page);
    await page.waitForTimeout(1800);
    expect(enhancements).toEqual([]);
    await expect(page.getByRole("button", { name: "Pause atmosphere" })).toBeHidden();
    await context.close();
  }
});

test("optional chunk failure leaves the page and navigation usable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.route(/\/assets\/(motion|atmosphere)\./, (route) => route.abort());
  const errors: string[] = []; page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/"); await settle(page); await page.waitForTimeout(1800);
  await expect(page.locator("h1")).toContainText("Nari");
  await page.getByRole("link", { name: "Meet Nari", exact: true }).first().click();
  await expect(page).toHaveURL(/\/meet-nari\//);
  expect(errors).toEqual([]);
});

test("capable desktop can pause atmosphere and switch to static mode", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => Object.defineProperty(navigator, "hardwareConcurrency", { value: 8 }));
  await page.goto("/"); await settle(page);
  const supported = await page.evaluate(() => !!document.createElement("canvas").getContext("webgl2"));
  test.skip(!supported, "Browser lacks WebGL2; static fallback is covered separately.");
  const field = page.locator("[data-atmosphere]");
  await expect(field).toHaveAttribute("data-atmosphere-state", "active");
  await page.getByRole("button", { name: "Pause atmosphere" }).click();
  await expect(field).toHaveAttribute("data-atmosphere-state", "paused");
  await page.getByRole("button", { name: "Resume atmosphere" }).click();
  await expect(field).toHaveAttribute("data-atmosphere-state", "active");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(field).toHaveAttribute("data-atmosphere-state", "static");
  await expect(page.getByRole("button", { name: "Pause atmosphere" })).toBeHidden();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(field).toHaveAttribute("data-atmosphere-state", "active");
  await page.getByRole("button", { name: "Pause atmosphere" }).click();
  await expect(field).toHaveAttribute("data-atmosphere-state", "paused");
});


test("native navigation retains back and forward behavior", async ({ page }) => {
  const errors: string[] = []; page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.getByRole("link", { name: "Meet Nari", exact: true }).first().click();
    await expect(page).toHaveURL(/\/meet-nari\//);
    await page.goBack({ waitUntil: "domcontentloaded" }); await expect(page).toHaveURL("http://127.0.0.1:4175/");
    await page.goForward({ waitUntil: "domcontentloaded" }); await expect(page).toHaveURL(/\/meet-nari\//);
    await page.goBack({ waitUntil: "domcontentloaded" });
  }
  expect(errors).toEqual([]);
});


for (const viewport of [{ width: 390, height: 568 }, { width: 768, height: 900 }, { width: 1920, height: 1080 }, { width: 3840, height: 2160 }]) {
  test(`short phone, text enlargement or wide layout at ${viewport.width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize(viewport);
    for (const path of ["/", "/meet-nari/", "/haven/", "/nail-studio/", "/work-with-nari/"]) {
      await page.goto(path); await settle(page);
      if (viewport.width <= 768) await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${path} at ${viewport.width}px`).toBe(false);
      await expect(page.locator("h1")).toBeVisible();
    }
  });
}
