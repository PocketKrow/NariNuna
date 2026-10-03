// Test the emitted policy against the exact island scripts the browser will execute.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import pages from "@/data/projectPages.json";

describe("static Astro security policy", () => {
  it("allows every inline loader with its exact hash and no blanket script exception", () => {
    const headers = readFileSync("dist/_headers", "utf8");
    const scriptPolicy = headers.match(/script-src ([^;]+);/)?.[1];
    expect(scriptPolicy).toContain("'self'");
    expect(scriptPolicy).not.toMatch(/unsafe-inline|unsafe-eval/);
    for (const { document } of pages) {
      const html = readFileSync(`dist/${document}`, "utf8");
      for (const [, attributes, source] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
        if (/\bsrc=/.test(attributes) || !source.trim()) continue;
        expect(scriptPolicy).toContain(`'sha256-${createHash("sha256").update(source).digest("base64")}'`);
      }
    }
    expect(headers).toContain("frame-src 'none'");
    expect(headers).toContain("object-src 'none'");
  });
});
