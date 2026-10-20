import { expect, test, type Locator, type Page } from "@playwright/test";

// Measure computed interaction colors: default-state axe scans do not exercise hover or focus.
async function contrast(foreground: Locator, background: Locator, property = "color"): Promise<number> {
  const color = await foreground.evaluate((node, key) => getComputedStyle(node).getPropertyValue(key), property);
  const paper = await background.evaluate((node) => getComputedStyle(node).backgroundColor);
  const luminance = (value: string) => {
    const channels = value.match(/[\d.]+/g)?.slice(0, 3).map(Number);
    if (!channels || channels.length !== 3) throw new Error(`Unexpected computed color: ${value}`);
    return channels.map((channel) => {
      const component = channel / 255;
      return component <= 0.04045 ? component / 12.92 : ((component + 0.055) / 1.055) ** 2.4;
    }).reduce((sum, component, index) => sum + component * [0.2126, 0.7152, 0.0722][index], 0);
  };
  const first = luminance(color);
  const second = luminance(paper);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}
async function focusContrast(link: Locator, paper: Locator): Promise<number> {
  const outline = await link.evaluate((node) => {
    const style = getComputedStyle(node);
    return { style: style.outlineStyle, width: parseFloat(style.outlineWidth) };
  });
  expect(outline.style, "A visible outline must actually be painted").not.toBe("none");
  expect(outline.width, "Retain the shared focus outline geometry").toBeGreaterThanOrEqual(3);
  return contrast(link, paper, "outline-color");
}
async function settle(page: Page): Promise<void> {
  await page.waitForFunction(() => [...document.querySelectorAll('astro-island[client="load"]')].every((island) => !island.hasAttribute("ssr")));
}

for (const width of [390, 1440]) {
  test(`album hover and keyboard focus contrast at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("https://i.ytimg.com/**", (route) => route.abort());
    await page.goto("/stories/");
    await settle(page);
    const paper = page.locator(".memory-album__pages");
    const link = page.locator(".media-card--album > a").first();
    const heading = link.locator("h3");
    await link.hover();
    expect(await contrast(heading, paper), "Album title on hover").toBeGreaterThanOrEqual(4.5);
    await page.mouse.move(0, 0);
    await link.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(link).toBeFocused();
    expect(await link.evaluate((node) => node.matches(":focus-visible"))).toBe(true);
    expect(await contrast(heading, paper), "Album title with keyboard focus").toBeGreaterThanOrEqual(4.5);
    expect(await focusContrast(link, paper), "Album focus outline on paper").toBeGreaterThanOrEqual(3);
  });
}

for (const [path, surface, selector] of [
  ["/nail-studio/", ".studio-workbench__notes", ".studio-workbench__notes .text-link"],
  ["/work-with-nari/", ".collaboration-letter", ".letter-link"],
] as const) {
  test(`paper link keyboard focus contrast on ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await settle(page);
    const link = page.locator(selector);
    await link.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(link).toBeFocused();
    expect(await link.evaluate((node) => node.matches(":focus-visible"))).toBe(true);
    expect(await focusContrast(link, page.locator(surface))).toBeGreaterThanOrEqual(3);
    expect(await contrast(link, page.locator(surface))).toBeGreaterThanOrEqual(4.5);
  });
}

for (const width of [320, 390, 430, 768, 1440, 1920]) {
  test(`Home discovers Haven before the invitation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width <= 430 ? 568 : 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const action = page.locator(".arrival-actions .button").first();
    await action.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("http://127.0.0.1:4175/haven/");
    expect(await page.evaluate(() => scrollY)).toBe(0);
    const charter = page.locator(".haven-charter");
    expect(await charter.evaluate((node) => Boolean(node.compareDocumentPosition(document.querySelector("#haven-door")!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  });
}

test("Haven leaves the atmosphere unloaded until the doorway approaches", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => Object.defineProperty(navigator, "hardwareConcurrency", { value: 8 }));
  const requests: string[] = [];
  page.on("request", (request) => {
    if (/\/assets\/atmosphere\./.test(request.url())) requests.push(request.url());
  });
  await page.goto("/haven/");
  await settle(page);
  expect(await page.locator("#haven-door").evaluate((node) => node.getBoundingClientRect().top)).toBeGreaterThan(1200);
  // Allow the existing post-load/idle scheduler to run without reaching the door.
  await page.waitForTimeout(2200);
  expect(requests, "No graphics request for a visitor reading the arrival and charter").toEqual([]);
  await expect(page.locator("[data-atmosphere]")).toHaveAttribute("data-atmosphere-state", "static");
  await page.locator("#haven-door").scrollIntoViewIfNeeded();
  // Existing capability tests cover machines that cannot create a valid renderer.
  const supported = await page.evaluate(() => !!document.createElement("canvas").getContext("webgl2"));
  test.skip(!supported, "No WebGL2; pre-door network exclusion was still checked.");
  await expect(page.locator("[data-atmosphere]")).toHaveAttribute("data-atmosphere-state", "active");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-atmosphere]")).toHaveAttribute("data-atmosphere-state", "static");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("[data-atmosphere]")).toHaveAttribute("data-atmosphere-state", "active");
});

for (const path of ["/meet-nari/", "/nail-studio/", "/work-with-nari/"]) {
  test(`mobile paper introduction retains a dark focus outline on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await settle(page);
    const link = page.locator(".room-arrival__copy .artwork-credit-link, .room-arrival__copy .button").first();
    await link.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(link).toBeFocused();
    expect(await focusContrast(link, page.locator(".room-arrival__body"))).toBeGreaterThanOrEqual(3);
  });
}

test("Haven fragment entry can enhance without changing three knocks", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => Object.defineProperty(navigator, "hardwareConcurrency", { value: 8 }));
  await page.goto("/haven/#haven-door");
  await settle(page);
  for (const label of ["Give the first knock", "Give the second knock", "Promise kindness · third knock"]) {
    await page.getByRole("button", { name: label, exact: true }).last().click();
  }
  await expect(page.getByRole("link", { name: /Enter Nari's Haven on Discord/ })).toBeFocused();
});

test("Haven remains usable when its deferred graphics import fails", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => Object.defineProperty(navigator, "hardwareConcurrency", { value: 8 }));
  await page.route(/\/assets\/atmosphere\./, (route) => route.abort());
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/haven/#haven-door");
  await settle(page);
  for (const label of ["Give the first knock", "Give the second knock", "Promise kindness · third knock"]) {
    await page.getByRole("button", { name: label, exact: true }).last().click();
  }
  await expect(page.getByRole("link", { name: /Enter Nari's Haven on Discord/ })).toBeFocused();
  await expect(page.locator("[data-atmosphere]")).toHaveAttribute("data-atmosphere-state", "static");
  expect(errors).toEqual([]);
});
