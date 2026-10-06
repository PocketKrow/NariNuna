import { expect, test, type Page } from "@playwright/test";

async function requireGraphics(page: Page): Promise<void> {
  const supported = await page.evaluate(() => {
    const context = document.createElement("canvas").getContext("webgl2");
    if (!context) return false;
    try {
      return [context.VERTEX_SHADER, context.FRAGMENT_SHADER].every((shader) => (context.getShaderPrecisionFormat(shader, context.HIGH_FLOAT)?.precision ?? 0) > 0);
    } finally {
      context.getExtension("WEBGL_lose_context")?.loseContext();
    }
  });
  test.skip(!supported, "Browser lacks usable WebGL2 for graphics fault injection; unavailable-context cases still run.");
}

for (const fault of ["unavailable", "creation throws", "probe precision", "canvas precision", "precision throws"] as const) {
  test(`WebGL fallback: ${fault}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    if (fault !== "unavailable" && fault !== "creation throws") await requireGraphics(page);
    await page.addInitScript((mode) => {
      Object.defineProperty(navigator, "hardwareConcurrency", { value: 8 });
      if (mode === "unavailable" || mode === "creation throws") {
        HTMLCanvasElement.prototype.getContext = new Proxy(HTMLCanvasElement.prototype.getContext, {
          apply(target, element, args) {
            if (args[0] === "webgl2") {
              document.documentElement.dataset.webglFault = mode;
              if (mode === "creation throws") throw new Error("Test: context blocked");
              return null;
            }
            return Reflect.apply(target, element, args);
          },
        });
      } else {
        WebGL2RenderingContext.prototype.getShaderPrecisionFormat = new Proxy(WebGL2RenderingContext.prototype.getShaderPrecisionFormat, {
          apply(target, context: WebGL2RenderingContext, args) {
            if (mode !== "canvas precision" || (context.canvas instanceof HTMLCanvasElement && context.canvas.matches("[data-atmosphere]"))) {
              document.documentElement.dataset.webglFault = mode;
              if (mode === "precision throws") throw new Error("Test: shader query blocked");
              return null;
            }
            return Reflect.apply(target, context, args);
          },
        });
      }
    }, fault);
    const errors: string[] = [];
    const chunks: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("request", (request) => { if (/\/assets\/atmosphere\./.test(request.url())) chunks.push(request.url()); });
    await page.route("https://i.ytimg.com/**", (route) => route.abort());
    for (const path of ["/", "/haven/"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("data-webgl-fault", fault);
      await expect(page.locator("[data-atmosphere]")).toHaveAttribute("data-atmosphere-state", "static");
      await expect(page.locator("[data-atmosphere-control]")).toBeHidden();
      await expect(page.locator("h1")).toBeVisible();
      if (fault !== "canvas precision") expect(chunks).toEqual([]);
      else expect(chunks.length).toBeGreaterThan(0);
    }
    await page.getByRole("link", { name: "Meet Nari", exact: true }).first().click();
    await expect(page).toHaveURL(/\/meet-nari\//);
    expect(errors).toEqual([]);
  });
}

test("active atmosphere disposes after real context loss", async ({ page }) => {
  await requireGraphics(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => Object.defineProperty(navigator, "hardwareConcurrency", { value: 8 }));
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const field = page.locator("[data-atmosphere]");
  await expect(field).toHaveAttribute("data-atmosphere-state", "active");
  const lost = await field.evaluate((canvas: HTMLCanvasElement) => {
    const extension = canvas.getContext("webgl2")?.getExtension("WEBGL_lose_context");
    if (!extension) return false;
    extension.loseContext();
    return true;
  });
  expect(lost).toBe(true);
  await expect(field).toHaveAttribute("data-atmosphere-state", "static");
  await expect(page.locator("[data-atmosphere-control]")).toBeHidden();
  expect(errors).toEqual([]);
});

test("a rejected draw stops the atmosphere without a page error", async ({ page }) => {
  await requireGraphics(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => Object.defineProperty(navigator, "hardwareConcurrency", { value: 8 }));
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const field = page.locator("[data-atmosphere]");
  await expect(field).toHaveAttribute("data-atmosphere-state", "active");
  await page.evaluate(() => {
    WebGL2RenderingContext.prototype.drawArrays = new Proxy(WebGL2RenderingContext.prototype.drawArrays, {
      apply() {
        document.documentElement.dataset.webglFault = "draw rejected";
        throw new Error("Test: graphics draw rejected");
      },
    });
  });
  await expect(page.locator("html")).toHaveAttribute("data-webgl-fault", "draw rejected");
  await expect(field).toHaveAttribute("data-atmosphere-state", "static");
  await expect(page.locator("[data-atmosphere-control]")).toBeHidden();
  expect(errors).toEqual([]);
});
