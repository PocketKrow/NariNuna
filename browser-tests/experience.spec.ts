import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import pages from "../src/data/projectPages.json" with { type: "json" };

// Optional remote preview failure is deterministic; source art and links stay real.
test.beforeEach(async ({ page }) => { await page.route("https://i.ytimg.com/**", (route) => route.abort()); });

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
  for (const [name, path] of [["home", "/"], ["meet", "/meet-nari/"], ["streams", "/streams/"], ["haven", "/haven/"], ["nails", "/nail-studio/"], ["work", "/work-with-nari/"], ["credits", "/credits/"], ["not-found", "/404.html"]] as const) {
    test(`${name} composition at ${width}px`, async ({ page, browserName }) => {
      test.skip(browserName !== "chromium", "Raster baselines belong to Chromium.");
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await page.addStyleTag({ content: ':root { --font-display: "DejaVu Sans"; --font-body: "DejaVu Sans"; }' });
      for (const image of await page.locator("img").all()) {
        if (await image.isVisible()) await image.scrollIntoViewIfNeeded();
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
  await context.route("https://i.ytimg.com/**", (route) => route.abort());
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
  expect(errors).toEqual([]); expect(remote.every((url) => new URL(url).hostname === "i.ytimg.com")).toBe(true);
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

test("Haven opens after three keyboard knocks without moving focus; reduced motion preserves entry", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/haven/");
  const button = page.locator(".door-knock");
  await expect(button).toHaveAccessibleName("Knock on the Haven door");
  await button.focus();
  for (const count of [1, 2]) {
    await page.keyboard.press("Enter");
    await expect(page.locator(".door-status")).toContainText(count === 1 ? "One knock" : "Two knocks");
    await expect(page.locator(".haven-door")).not.toHaveAttribute("open");
    await expect(button).toBeFocused();
  }
  await page.keyboard.press("Space");
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(button).toHaveAccessibleName("The door is open");
  await expect(button).toBeFocused();
  await expect(page.getByRole("link", { name: /Come hang out on Discord/ })).toBeVisible();
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations).toEqual([]);
  await page.reload();
  await expect(page.locator(".haven-door")).not.toHaveAttribute("open");
});

test("Haven supports touch entry, a direct entry option and native no-JS disclosure", async ({ browser, page }) => {
  await page.goto("/haven/");
  await page.getByRole("button", { name: "Come straight in" }).click();
  await expect(page.getByRole("link", { name: /Come hang out on Discord/ })).toBeVisible();
  await expect(page.locator(".door-knock")).toBeFocused();
  const touch = await browser.newContext({ hasTouch: true, viewport: { width: 320, height: 568 } });
  const touchPage = await touch.newPage();
  await touchPage.goto("http://127.0.0.1:4175/haven/");
  for (let i = 0; i < 3; i++) await touchPage.locator(".door-knock").tap();
  await expect(touchPage.getByRole("link", { name: /Come hang out on Discord/ })).toBeVisible();
  await touch.close();
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 568 } });
  const staticPage = await context.newPage();
  await staticPage.goto("http://127.0.0.1:4175/haven/");
  const disclosure = staticPage.locator(".haven-door");
  await disclosure.locator("summary").focus(); await staticPage.keyboard.press("Enter");
  await expect(disclosure).toHaveAttribute("open");
  await expect(staticPage.getByRole("link", { name: /Come hang out on Discord/ })).toBeVisible();
  await context.close();
});

test("all footer profiles and failed Streams clip previews remain usable", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".footer-profiles .social-dock a")).toHaveCount(6);
  for (const link of await page.locator(".footer-profiles .social-dock a").all()) await expect(link).toHaveAccessibleName(/opens in a new tab/);
  await page.goto("/streams/"); await page.locator(".moments").scrollIntoViewIfNeeded();
  for (const image of await page.locator("main [data-optional-preview]").all()) await expect(image).toBeHidden();
  await expect(page.locator(".moment-preview")).toHaveCount(3);
  await expect(page.locator("iframe, video")).toHaveCount(0);
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations).toEqual([]);
});

test("optional clip images load lazily when their image source is available", async ({ page }) => {
  await page.unroute("https://i.ytimg.com/**");
  // A tiny valid raster fixture isolates image loading from remote availability.
  await page.route("https://i.ytimg.com/**", (route) => route.fulfill({ contentType: "image/png", body: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aDAAAAABJRU5ErkJggg==", "base64") }));
  await page.goto("/"); await page.goto("/streams/"); await page.locator(".moments").scrollIntoViewIfNeeded();
  for (const image of await page.locator("main [data-optional-preview]").all()) {
    await expect(image).toBeVisible();
    expect(await image.evaluate(async (el: HTMLImageElement) => { await el.decode(); return el.naturalWidth; })).toBe(1);
  }
  await expect(page.locator("iframe, video")).toHaveCount(0);
});
