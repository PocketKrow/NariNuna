import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { discordUrl } from "../src/data/socials";
import pages from "../src/data/projectPages.json" with { type: "json" };

async function settle(page: Page): Promise<void> {
  await page.waitForFunction(() => [...document.querySelectorAll('astro-island[client="load"]')].every((el) => !el.hasAttribute("ssr")));
  await page.evaluate(() => document.fonts.ready);
}
async function scan(page: Page): Promise<void> {
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(({ target }) => target) }))).toEqual([]);
}
for (const width of [390, 1440]) {
  test(`all routes pass axe at ${width}px`, async ({ page }) => {
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

// The invitation is a native disclosure until the required door island has actually mounted.
for (const failure of ["disabled-js", "blocked-door-module"] as const) {
  test(`community invitation survives ${failure}`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: failure !== "disabled-js", viewport: { width: 320, height: 568 } });
    const page = await context.newPage();
    if (failure === "blocked-door-module") await page.route(/\/assets\/HavenDoor\./, (route) => route.abort());
    await page.goto("http://127.0.0.1:4175/haven/");
    const disclosure = page.locator(".haven-invitation-fallback");
    await expect(disclosure).toBeVisible();
    await disclosure.locator("summary").focus();
    await page.keyboard.press("Enter");
    const invite = disclosure.getByRole("link", { name: /Join Nari's Haven on Discord/ });
    await expect(invite).toBeVisible();
    await expect(invite).toHaveAttribute("href", discordUrl);
    expect(await page.locator(".haven-charter").evaluate((charter) => Boolean(charter.compareDocumentPosition(document.querySelector(".haven-invitation-fallback")!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
    await expect(page.getByRole("button", { name: "Give the first knock", exact: true }).last()).toBeDisabled();
    await context.close();
  });
}

for (const control of ["painted-door", "story-action"] as const) {
  test(`three keyboard knocks and focus/reset via ${control}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("**/*.webp", (route) => route.abort());
    await page.goto("/haven/"); await settle(page);
    await expect(page.locator(".haven-invitation-fallback")).toHaveCount(0);
    const invitation = page.getByRole("link", { name: /Enter Nari's Haven on Discord/ });
    for (const label of ["Give the first knock", "Give the second knock", "Promise kindness · third knock"]) {
      await expect(invitation).toHaveCount(0);
      const buttons = page.getByRole("button", { name: label, exact: true });
      await (control === "painted-door" ? buttons.first() : buttons.last()).focus();
      await page.keyboard.press("Enter");
    }
    await expect(invitation).toBeFocused();
    await expect(invitation).toHaveAttribute("href", discordUrl);
    await page.getByRole("button", { name: "Close the door behind me" }).focus();
    await page.keyboard.press("Enter");
    await expect(invitation).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Give the first knock", exact: true }).last()).toBeFocused();
  });
}
