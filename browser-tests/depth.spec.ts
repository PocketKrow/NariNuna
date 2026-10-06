// Regressions exercise delivered alpha planes, bounded motion, disposal and actual requests, rather than selector presence alone.
import { expect, test } from "@playwright/test";
import { depthArtwork } from "../src/data/roomDepth";
import manifest from "../src/data/responsive-artwork.runtime.json" with { type: "json" };

for (const width of [320, 390, 768, 1440, 1920, 3840]) {
  test(`depth layers preserve static composition at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width <= 390 ? 568 : 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const path of ["/", "/meet-nari/", "/streams/", "/nail-studio/", "/haven/", "/resources/", "/work-with-nari/", "/stories/", "/support/"]) {
      await page.goto(path);
      await expect(page.locator(".room-arrival__stage")).toHaveAttribute("role", "img");
      await expect(page.locator("h1")).toBeVisible();
      const image = page.locator(".room-arrival__resident img");
      await image.evaluate((element: HTMLImageElement) => element.decode());
      expect(await image.evaluate((element: HTMLImageElement) => {
        const bounds = element.getBoundingClientRect();
        const stage = element.closest(".room-arrival__stage")!.getBoundingClientRect();
        return bounds.left >= stage.left && bounds.right <= stage.right + 1 && bounds.top >= stage.top && bounds.bottom <= stage.bottom + 1 && getComputedStyle(element).objectFit === "contain";
      }), path).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), path).toBe(false);
    }
  });
}

test("touch delivers lightweight motion and excludes large desktop prop layers", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 667 }, hasTouch: true, reducedMotion: "no-preference" });
  const page = await context.newPage();
  const requests: string[] = [];
  page.on("request", (request) => requests.push(new URL(request.url()).pathname));
  await page.goto("/");
  await expect.poll(() => requests.some((url) => /\/touch\./.test(url))).toBe(true);
  expect(requests.some((url) => /\/(motion|atmosphere)\./.test(url))).toBe(false);
  const desktopProps = [depthArtwork.hearth, depthArtwork.curtain].flatMap((key) => manifest[key].candidates.map(({ src }) => src));
  expect(requests.filter((url) => desktopProps.includes(url))).toEqual([]);
  await page.locator(".haven-corners").scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => page.evaluate(() => document.getAnimations().filter((animation) => animation.playState === "running").length)).toBe(0);
  await context.close();
});

test("desktop planes travel at distinct bounded depths and restore when preferences change", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".room-arrival")).toHaveAttribute("data-depth-active", "true");
  await page.mouse.move(1320, 350);
  const transforms = () => page.locator(".room-arrival [data-depth]").evaluateAll((elements) => elements.map((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41));
  await expect.poll(async () => Math.max(...await transforms())).toBeGreaterThan(5);
  const values = await transforms();
  expect(values[0]).toBeLessThan(values[values.length - 1]);
  expect(values.every((value) => Math.abs(value) <= 12.1)).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(async () => (await transforms()).every((value) => value === 0)).toBe(true);
  await expect(page.locator(".room-arrival")).not.toHaveAttribute("data-depth-active", "true");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".room-arrival")).toHaveAttribute("data-depth-active", "true");
});

test("missing layered artwork preserves text and navigation", async ({ page }) => {
  await page.route(/\/media\/responsive\/(character-|layer-|ghostie-ghostie-(welcome|doorway))/, (route) => route.abort());
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Nari");
  await page.getByRole("link", { name: "Meet Nari", exact: true }).first().click();
  await expect(page).toHaveURL(/\/meet-nari\//);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  expect(errors).toEqual([]);
});
