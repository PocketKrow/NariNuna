import { expect, test, type Locator, type Page } from "@playwright/test";
import pages from "../src/data/projectPages.json" with { type: "json" };

async function requireDecoded(image: Locator): Promise<void> {
  // Firefox can reject decode while a lazy request or hydration srcset replacement is still starting.
  // Retry the actual decode; a missing or invalid image still fails rather than being ignored.
  await expect.poll(() => image.evaluate(async (element: HTMLImageElement) => {
    try { await element.decode(); return element.complete && element.naturalWidth > 0; }
    catch { return false; }
  })).toBe(true);
}

async function checkGhosties(page: Page): Promise<void> {
  const figures = page.locator(".ghostie-art");
  expect(await figures.count()).toBeGreaterThan(0);
  for (const figure of await figures.all()) {
    await figure.scrollIntoViewIfNeeded();
    const image = figure.locator("img");
    await requireDecoded(image);
    const result = await figure.evaluate((element) => {
      const image = element.querySelector("img")!;
      const art = image.getBoundingClientRect();
      const slot = element.getBoundingClientRect();
      const tolerance = 1;
      const contains = (bounds: DOMRect) => art.left >= bounds.left - tolerance && art.right <= bounds.right + tolerance && art.top >= bounds.top - tolerance && art.bottom <= bounds.bottom + tolerance;
      const clips: string[] = [];
      for (let ancestor: HTMLElement | null = element; ancestor; ancestor = ancestor.parentElement) {
        const style = getComputedStyle(ancestor);
        const bounds = ancestor.getBoundingClientRect();
        if ((["hidden", "clip"].includes(style.overflowX) && (art.left < bounds.left - tolerance || art.right > bounds.right + tolerance)) ||
          (["hidden", "clip"].includes(style.overflowY) && (art.top < bounds.top - tolerance || art.bottom > bounds.bottom + tolerance))) clips.push(ancestor.className || ancestor.tagName);
      }
      return { fitsSlot: contains(slot), clips, fit: getComputedStyle(image).objectFit, loaded: image.naturalWidth > 0, visibleSize: Math.min(art.width, art.height) };
    });
    expect(result.loaded).toBe(true);
    expect(result.fit).toBe("contain");
    expect(result.fitsSlot, await figure.getAttribute("class")).toBe(true);
    expect(result.clips).toEqual([]);
    expect(result.visibleSize).toBeGreaterThan(20);
  }
}

async function checkPostcards(page: Page, selector: string): Promise<void> {
  const images = page.locator(selector);
  expect(await images.count()).toBeGreaterThan(0);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await requireDecoded(image);
    const result = await image.evaluate((element: HTMLImageElement) => {
      const style = getComputedStyle(element);
      const bounds = element.getBoundingClientRect();
      const width = bounds.width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
      const height = bounds.height - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth);
      return { fit: style.objectFit, ratioError: Math.abs(height - width * element.naturalHeight / element.naturalWidth) };
    });
    expect(result.fit).toBe("contain");
    expect(result.ratioError).toBeLessThanOrEqual(1);
  }
}

for (const width of [320, 390, 768, 1440]) {
  test(`Ghostie silhouettes fit every slot at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const { id, path } of pages) {
      await page.goto(path);
      if (id !== "prinnyCult") await checkGhosties(page);
      if (path === "/") await checkPostcards(page, ".haven-corner__frame img");
      if (path === "/nail-studio/") await checkPostcards(page, ".studio-workbench__scene img");
      if (path === "/resources/") await checkPostcards(page, ".resource-shelf__heading img");
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    }
  });
}

test("Ghosties fit enlarged text and the second-knock doorway", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 667 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/meet-nari/", "/nail-studio/", "/haven/", "/support/"]) {
    await page.goto(path);
    await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    await checkGhosties(page);
  }
  await page.goto("/haven/");
  for (const label of ["Give the first knock", "Give the second knock"]) await page.getByRole("button", { name: label, exact: true }).last().click();
  await expect(page.locator(".haven-threshold__visitor")).toBeVisible();
  await checkGhosties(page);
});
