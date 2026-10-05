// Astro's tiny inline island loaders need hashes, never an unsafe-inline script exception.
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import projectPages from "../src/data/projectPages.json" with { type: "json" };

const hashes = new Set();
for (const { document } of projectPages) {
  const html = await readFile(`dist/${document}`, "utf8");
  for (const [, attributes, source] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=/.test(attributes) || !source.trim()) continue;
    hashes.add(`'sha256-${createHash("sha256").update(source).digest("base64")}'`);
  }
}
const headers = await readFile("public/_headers", "utf8");
await writeFile("dist/_headers", headers.replace("script-src 'self';", `script-src 'self' ${[...hashes].sort().join(" ")};`));
console.log(`Generated static-host CSP for ${hashes.size} distinct inline island loaders.`);
