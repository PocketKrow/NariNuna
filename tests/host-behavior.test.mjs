// Verify the emitted static-host contract over HTTP; this local server does not attest a production provider.
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { startBrowserPreview } from "../scripts/browser-preview.mjs";

it("serves deep documents, redirects directory URLs, revalidates HTML and gives missing routes a real 404", async () => {
  const preview = await startBrowserPreview();
  try {
    const deep = await fetch(`${preview.origin}/haven/`);
    expect(deep.status).toBe(200);
    expect(deep.headers.get("cache-control")).toBe("public, max-age=0, must-revalidate");
    const html = await deep.text();
    const asset = html.match(/(?:src|href)="(\/assets\/[^"]+)"/)[1];
    const compiled = await fetch(preview.origin + asset);
    expect(compiled.headers.get("cache-control")).toBe("public, max-age=31536000, immutable");
    expect(compiled.headers.get("content-security-policy")).toContain("sha256-");
    const redirect = await fetch(`${preview.origin}/haven?from=test`, { redirect: "manual" });
    expect(redirect.status).toBe(301);
    expect(redirect.headers.get("location")).toBe("/haven/?from=test");
    const missing = await fetch(`${preview.origin}/room-does-not-exist/`);
    expect(missing.status).toBe(404);
    expect(await missing.text()).toBe(readFileSync("dist/404.html", "utf8"));
  } finally { await preview.close(); }
});
