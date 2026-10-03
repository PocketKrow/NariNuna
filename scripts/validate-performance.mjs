// Measure the browser payload actually referenced by each Astro document, including static and dynamic island imports.
import projectPages from "../src/data/projectPages.json" with { type: "json" };
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { resolve } from "node:path";

const assets = JSON.parse(readFileSync("src/data/responsive-artwork.json", "utf8")).artworks;
const filesFor = (html) => new Set([...html.matchAll(/(?:src|href|component-url|renderer-url)="(\/assets\/[^"?#]+\.(?:js|css))"/g)].map((match) => match[1]));
function graph(files) {
  const found = new Set(files);
  for (const file of found) {
    if (!file.endsWith(".js")) continue;
    const source = readFileSync(`dist${file}`, "utf8");
    if (/sourceFile|sourceSha256|GENERATED FILE/.test(source)) throw new Error(`Provenance leaked into browser bundle: ${file}`);
    // Bundled imports and modulepreload dependencies are relative to the importing chunk.
    for (const [, dependency] of source.matchAll(/["'](\.\.?\/[^"']+\.js)["']/g)) {
      const path = resolve("dist", file.slice(1), "..", dependency).slice(resolve("dist").length);
      if (!path.startsWith("/assets/")) throw new Error(`Unexpected runtime dependency ${path}`);
      found.add(path);
    }
  }
  return found;
}
for (const { document, title } of projectPages) {
  const html = readFileSync(`dist/${document}`, "utf8");
  const files = graph(filesFor(html));
  const inlineBytes = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter(([, attributes, source]) => !/\bsrc=/.test(attributes) && source.trim())
    .reduce((sum, [, , source]) => sum + gzipSync(source).length, 0);
  const bytes = inlineBytes + [...files].reduce((sum, file) => sum + gzipSync(readFileSync(`dist${file}`)).length, 0);
  if (bytes > 120_000) throw new Error(`${document}: browser JS + CSS exceeds 120 KB gzip: ${bytes}`);
  console.log(`${title}: browser JS + CSS ${Number(bytes / 1000).toFixed(2)} KB gzip / 120 KB`);
}
for (const [source, asset] of Object.entries(assets)) {
  for (const candidate of asset.candidates) {
    const bytes = readFileSync(`dist${candidate.src}`).length;
    const maximum = source.endsWith("scenes/haven-sunset.webp") ? 160_000 : 150_000;
    if (bytes !== candidate.bytes || bytes > maximum) throw new Error(`Artwork budget mismatch: ${candidate.src}`);
  }
}
const heroDocuments = projectPages.filter(({ hero }) => hero !== null).map(({ document }) => document);
for (const document of heroDocuments) {
  const html = readFileSync(`dist/${document}`, "utf8");
  const preloads = [...html.matchAll(/<link\b(?:[^">]|"[^"]*")*>/g)].map(([tag]) => tag).filter((tag) => tag.includes('rel="preload"'));
  if (preloads.length !== 3) throw new Error(`${document} requires three mutually exclusive hero bands`);
  for (const tag of preloads) {
    for (const attribute of ['as="image"', 'imagesrcset=', 'media=', 'fetchpriority="high"']) {
      if (!tag.includes(attribute)) throw new Error(`${document} missing ${attribute}`);
    }
    for (const [, url] of tag.matchAll(/(\/media\/responsive\/[^\s",]+\.webp)/g)) readFileSync(`dist${url}`);
  }
}
console.log("Validated served artwork budgets and nine route-specific hero preloads.");
