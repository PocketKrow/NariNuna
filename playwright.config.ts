import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./browser-tests",
  fullyParallel: false,
  timeout: 45_000,
  workers: 1,
  reporter: "list",
  snapshotPathTemplate: "{testDir}/snapshots/{arg}{ext}",
  expect: { timeout: 15_000, toHaveScreenshot: { animations: "disabled", maxDiffPixelRatio: 0.01 } },
  use: { baseURL: "http://127.0.0.1:4175", trace: "retain-on-failure" },
  webServer: { command: "node scripts/serve-browser-preview.mjs", url: "http://127.0.0.1:4175", reuseExistingServer: false },
  projects: [
    { name: "chromium", use: { browserName: "chromium", launchOptions: { executablePath: process.env.NARI_BROWSER_PATH, args: ["--no-sandbox", "--disable-dev-shm-usage", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] } } },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
});
