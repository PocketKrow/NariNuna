// Verify HTTP retrieval and metadata, not pixels or final host headers. Own an ephemeral static preview unless NARI_PREVIEW_URL is supplied; always close the owned listener.
import { siteConfiguration, pageMetadata } from "./site-metadata.mjs";
import projectPages from "../src/data/projectPages.json" with { type: "json" };
import { existsSync } from "node:fs";
import assert from "node:assert/strict";
import { startBrowserPreview } from "./browser-preview.mjs";
import { readdir, readFile } from "node:fs/promises";

const preview = process.env.NARI_PREVIEW_URL ? undefined : await startBrowserPreview();
const origin = process.env.NARI_PREVIEW_URL ?? preview.origin;

try {
const site = siteConfiguration();
const routes = projectPages.map((page) => [page.path, page.title, pageMetadata(page, site).image]);

const requiredAssets = [
  "/media/nari/nari-model-fullbody.webp",
  "/media/nari/nari-model-portrait.webp",
  "/media/storybook/characters/nari-painted-welcome.webp",
  "/media/storybook/characters/nari-painted-portrait.webp",
  "/media/storybook/characters/nari-painted-avatar.webp",
  "/media/nari/nari-comfy-original.webp",
  "/media/emotes/nari-comfy.webp",
  "/media/emotes/nari-panic.webp",
  "/media/storybook/ghosties/ghostie-shy.webp",
  "/media/storybook/ghosties/ghostie-chaos.webp",
  "/media/storybook/ghosties/ghostie-cozy.webp",
  "/media/storybook/ghosties/ghostie-nails.webp",
  "/media/storybook/ghosties/ghostie-heart.webp",
  "/media/storybook/share/nari-home-social.jpg",
  "/media/storybook/share/nari-meet-social.jpg",
  "/favicon.png"
];

for (const [route, expectedTitle, expectedPreview] of routes) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, `${route} should direct-load with its expected status`);
  assert.match(response.headers.get("content-type") ?? "", /text\/html/, `${route} should be HTML`);

  const html = (await response.text()).replaceAll("&#39;", "'");
  assert.match(html, new RegExp(`<title>[^<]*${expectedTitle.replaceAll("?", "\\?")}`), `${route} needs its own title`);

  if (expectedPreview) {
    assert.match(html, new RegExp(`property="og:image" content="${expectedPreview}"`), `${route} needs the correct social preview`);
    assert.match(html, /name="twitter:card" content="summary_large_image"/, `${route} needs a Twitter card`);
  } else {
    assert.match(html, /name="robots" content="noindex/, `${route} must remain non-indexable`);
  }
}

const generated = JSON.parse(await readFile("src/data/responsive-artwork.json", "utf8"));
for (const artwork of Object.values(generated.artworks)) {
  assert.ok(existsSync(artwork.sourceFile), `Missing retained source: ${artwork.sourceFile}`);
  requiredAssets.push(...artwork.candidates.map(({ src }) => src));
}

for (const asset of requiredAssets) {
  const response = await fetch(new URL(asset, origin));
  assert.equal(response.status, 200, `Required real character or room asset is unavailable: ${asset}`);
  const content = await response.arrayBuffer();
  assert.ok(content.byteLength > 0, `Required asset is unexpectedly empty: ${asset}`);
}

const prinnyFiles = (await readdir(new URL("../public/media/prinny-cult/roster/", import.meta.url)))
  .filter((filename) => filename.endsWith(".webp"));
assert.equal(prinnyFiles.length, 27, "The supplied collection must retain exactly 27 original Prinny designs");

for (const filename of prinnyFiles) {
  const response = await fetch(new URL(`/media/prinny-cult/roster/${filename}`, origin));
  assert.equal(response.status, 200, `Supplied Prinny derivative is unavailable: ${filename}`);
}

console.log(`Verified ${routes.length} independently served HTML documents, ${requiredAssets.length} essential identity/environment assets, and all ${prinnyFiles.length} supplied Prinny designs.`);
} finally {
  await preview?.close();
}
