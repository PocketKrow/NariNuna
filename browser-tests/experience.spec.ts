import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import pages from "../src/data/projectPages.json" with { type: "json" };

for (const width of [390, 1440]) {
  test(`all documents pass axe at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of pages) {
      await page.goto(route.path);
      const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(result.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(({ target }) => target) }))).toEqual([]);
    }
  });
  for (const [name, path] of [["home", "/"], ["meet", "/meet-nari/"], ["links", "/links/"], ["nails", "/nail-studio/"]] as const) {
    test(`${name} composition at ${width}px`, async ({ page, browserName }) => {
      test.skip(browserName !== "chromium", "Raster baselines belong to Chromium.");
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await page.addStyleTag({ content: ':root { --font-display: "DejaVu Serif"; --font-body: "DejaVu Sans"; }' });
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((el: HTMLImageElement) => el.decode().catch(() => undefined));
      }
      await page.evaluate(() => scrollTo(0, 0));
      await expect(page).toHaveScreenshot(`${name}-${width}.png`, { fullPage: true });
    });
  }
}

test("native menu passes axe and releases focus on Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 667 });
  await page.goto("/");
  await page.locator(".mobile-menu summary").click();
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations).toEqual([]);
  await page.keyboard.press("Tab"); await page.keyboard.press("Escape");
  await expect(page.locator(".mobile-menu summary")).toBeFocused();
  await expect(page.locator(".mobile-menu")).not.toHaveAttribute("open");
});

test("all static documents work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 568 } });
  const page = await context.newPage();
  for (const route of pages) {
    await page.goto(`http://127.0.0.1:4175${route.path}`);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  }
  await context.close();
});

test("image failure and blocked WebGL leave content and platforms usable", async ({ page }) => {
  await page.route(/\/media\//, (route) => route.abort());
  await page.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null; });
  const errors: string[] = [];
  const remote: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => { if (!new URL(request.url()).hostname.includes("127.0.0.1")) remote.push(request.url()); });
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Nari Nuna");
  await expect(page.getByRole("link", { name: /Watch on Twitch/ })).toBeVisible();
  await expect(page.locator("canvas, astro-island")).toHaveCount(0);
  expect(errors).toEqual([]); expect(remote).toEqual([]);
});

test("document navigation retains back and forward behavior", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.locator('.desktop-nav a[href="/meet-nari/"]').click();
  await expect(page).toHaveURL(/\/meet-nari\//);
  await page.goBack(); await expect(page).toHaveURL("http://127.0.0.1:4175/");
  await page.goForward(); await expect(page).toHaveURL(/\/meet-nari\//);
});

for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 568 }, { width: 768, height: 900 }, { width: 1920, height: 1080 }, { width: 3840, height: 2160 }]) {
  test(`reflow and enlargement at ${viewport.width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" }); await page.setViewportSize(viewport);
    for (const { path } of pages) {
      await page.goto(path);
      if (viewport.width <= 768) await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), path).toBe(false);
      await expect(page.locator("h1")).toBeVisible();
    }
  });
}
