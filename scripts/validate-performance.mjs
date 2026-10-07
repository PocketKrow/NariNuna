// Measure the browser payload actually referenced by each Astro document, including static and dynamic island imports.
import projectPages from "../src/data/projectPages.json" with { type: "json" };
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { resolve } from "node:path";
import ts from "typescript";

const assets = JSON.parse(readFileSync("src/data/responsive-artwork.json", "utf8")).artworks;
const filesFor = (html) => new Set([...html.matchAll(/(?:src|href|component-url|renderer-url)="(\/assets\/[^"?#]+\.(?:js|css))"/g)].map((match) => match[1]));
// Parse generated JavaScript rather than guessing quote style; Rolldown may use template literals.
function graph(files, includeDynamic = false) {
  const found = new Set(files);
  for (const file of found) {
    if (!file.endsWith(".js")) continue;
    const source = readFileSync(`dist${file}`, "utf8");
    if (/sourceFile|sourceSha256|GENERATED FILE/.test(source)) throw new Error(`Provenance leaked into browser bundle: ${file}`);
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    const add = (literal) => {
      if (!literal || !ts.isStringLiteralLike(literal)) return;
      const dependency = literal.text;
      if (!dependency.endsWith(".js")) return;
      const path = dependency.startsWith("/") ? dependency : resolve("dist", file.slice(1), "..", dependency).slice(resolve("dist").length);
      if (!path.startsWith("/assets/")) throw new Error(`Unexpected runtime dependency ${path}`);
      found.add(path);
    };
    const walk = (node) => {
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) add(node.moduleSpecifier);
      if (includeDynamic && ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) add(node.arguments[0]);
      ts.forEachChild(node, walk);
    };
    walk(ast);
  }
  return found;
}
for (const { document, title } of projectPages) {
  const html = readFileSync(`dist/${document}`, "utf8");
  const entries = filesFor(html);
  const files = graph(entries);
  const fullGraph = graph(entries, true);
  const deferred = [...fullGraph].filter((file) => !files.has(file));
  const deferredBytes = deferred.reduce((sum, file) => sum + gzipSync(readFileSync(`dist${file}`)).length, 0);
  if (deferredBytes > 0) throw new Error(`${document}: optional enhancement graph must not include deferred effects: ${deferredBytes}`);
  const inlineBytes = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter(([, attributes, source]) => !/\bsrc=/.test(attributes) && source.trim())
    .reduce((sum, [, , source]) => sum + gzipSync(source).length, 0);
  const bytes = inlineBytes + [...files].reduce((sum, file) => sum + gzipSync(readFileSync(`dist${file}`)).length, 0);
  if (bytes > 25_000) throw new Error(`${document}: browser JS + CSS exceeds 25 KB gzip: ${bytes}`);
  console.log(`${title}: initial JS + CSS ${Number(bytes / 1000).toFixed(2)} KB gzip / 25 KB; optional graph ${(deferredBytes / 1000).toFixed(2)} KB / 0 KB`);
}
for (const [source, asset] of Object.entries(assets)) {
  for (const candidate of asset.candidates) {
    const bytes = readFileSync(`dist${candidate.src}`).length;
    const maximum = source.endsWith("scenes/haven-sunset.webp") ? 160_000 : 150_000;
    if (bytes !== candidate.bytes || bytes > maximum) throw new Error(`Artwork budget mismatch: ${candidate.src}`);
  }
}
const models = JSON.parse(readFileSync("src/data/model-delivery.json", "utf8"));
for (const asset of Object.values(models)) {
  for (const candidate of asset.candidates) {
    const bytes = readFileSync(`dist${candidate.src}`).length;
    if (bytes !== candidate.bytes || bytes > 150_000) throw new Error(`Model budget mismatch: ${candidate.src}`);
  }
}
for (const { document } of projectPages) {
  const html = readFileSync(`dist/${document}`, "utf8");
  if (/astro-island|<canvas|rel="preload"/.test(html)) throw new Error(`${document}: unnecessary hydration, canvas or preload`);
}
const anime = JSON.parse(readFileSync("src/data/anime-artwork.json", "utf8")).artworks;
for (const art of Object.values(anime)) {
  for (const candidate of art.candidates) {
    const bytes = readFileSync(`dist${candidate.src}`).length;
    if (bytes !== candidate.bytes || bytes > 150_000) throw new Error(`Anime artwork budget mismatch: ${candidate.src}`);
  }
}
console.log("Validated retained/source-model and custom-anime budgets; no hydrated islands, effect graphs or environment preloads.");

// Bound the entire Home image collection even when a high-density browser chooses
// every largest candidate and loads the three lazy destination previews.
const homeHtml = readFileSync("dist/index.html", "utf8");
const homeImageSets = new Set([...homeHtml.matchAll(/<img\b[^>]*>/g)].map(([tag]) =>
  tag.match(/srcset="([^"]+)"/)?.[1] ?? tag.match(/src="([^"]+)"/)?.[1] ?? ""));
const homeImageBytes = [...homeImageSets].reduce((total, candidates) => total + Math.max(...candidates.split(",").map((candidate) => {
  const src = candidate.trim().split(/\s/)[0];
  if (!src.startsWith("/media/")) throw new Error(`Unexpected Home image source: ${src}`);
  return readFileSync(`dist${src}`).length;
})), 0);
if (homeImageBytes > 250_000) throw new Error(`Home image collection exceeds 250 KB: ${homeImageBytes}`);
console.log(`Home complete image collection: ${(homeImageBytes / 1000).toFixed(2)} KB / 250 KB at maximum candidate sizes.`);

const identity = JSON.parse(readFileSync("src/data/creator-identity.json", "utf8"));
if (readFileSync(`dist${identity.src}`).length !== identity.bytes || identity.bytes > 100_000) throw new Error("Social preview budget mismatch");
