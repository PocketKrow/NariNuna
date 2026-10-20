// Astro's tiny inline island loaders need hashes, never an unsafe-inline script exception.
import { createHash } from "node:crypto";
import { readFile, writeFile, rm } from "node:fs/promises";
import projectPages from "../src/data/projectPages.json" with { type: "json" };

import { siteConfiguration, sitemap } from "./site-metadata.mjs";

const site = siteConfiguration();
const hashes = new Set();
for (const { document } of projectPages) {
  const html = await readFile(`dist/${document}`, "utf8");
  for (const [, attributes, source] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=/.test(attributes) || !source.trim()) continue;
    hashes.add(`'sha256-${createHash("sha256").update(source).digest("base64")}'`);
  }
}
let headers = await readFile("public/_headers", "utf8");
if (!site.production) headers = headers.replace("/*\n", "/*\n  X-Robots-Tag: noindex, nofollow\n");
await writeFile("dist/_headers", headers.replace("script-src 'self';", `script-src 'self' ${[...hashes].sort().join(" ")};`));
console.log(`Generated static-host CSP for ${hashes.size} distinct inline island loaders.`);

// Generate discovery files from the same route registry and origin as the document shell.
const map = sitemap(projectPages, site);
if (map) {
  await writeFile("dist/sitemap.xml", map);
  const robots = await readFile("public/robots.txt", "utf8");
  await writeFile("dist/robots.txt", `${robots.trim()}\nSitemap: ${site.origin}/sitemap.xml\n`);
} else {
  await rm("dist/sitemap.xml", { force: true });
  await writeFile("dist/robots.txt", "User-agent: *\nDisallow: /\n");
}
