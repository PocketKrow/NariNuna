// Check deterministic Nari-only metadata and absence of persisted theme UI. This is implementation evidence, not final client acceptance.
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import projectPages from "@/data/projectPages.json";

function sourceAt(path: string): string {
  return readFileSync(path, "utf8");
}

describe("Nari-only atmosphere demo", () => {
  it("keeps every document on the Nari atmosphere without a pre-paint preference runtime", () => {
    for (const { document } of projectPages) {
      const html = sourceAt(`dist/${document}`);

      expect(html).toContain('<html lang="en" data-theme="nari">');
      expect(html).toContain('name="theme-color" content="#2a1820"');
      expect(html).not.toContain("theme-boot.js");
    }

    expect(existsSync("public/theme-boot.js")).toBe(false);
  });

  it("removes the public theme control and persisted theme state", () => {
    const header = sourceAt("src/components/layout/SiteHeader.vue");
    const styles = [
      "src/styles/_tokens.scss",
      "src/styles/_world.scss",
      "src/styles/_polish.scss",
      "src/styles/_storybook.scss"
    ].map(sourceAt).join("\n");

    expect(header).not.toContain("ThemeSwitcher");
    expect(existsSync("src/components/ui/ThemeSwitcher.vue")).toBe(false);
    expect(existsSync("src/composables/useTheme.ts")).toBe(false);
    expect(styles).not.toMatch(/data-theme=["'](?:dark|light)["']/);
    expect(styles).toContain("--bg:");
    expect(styles).toContain("--story-surface:");
    expect(styles).toContain("--story-accent:");
  });
});
