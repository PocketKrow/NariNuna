// Run from repository root after Astro. Missing documents, metadata or compiled asset references fail the build; this is not browser rendering.
import assert from "node:assert/strict";
import { siteConfiguration, pageMetadata, sitemap } from "./site-metadata.mjs";
import projectPages from "../src/data/projectPages.json" with { type: "json" };
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const site = siteConfiguration();
const pages = projectPages.map(({ document }) => document);

for (const record of projectPages) {
  const page = record.document;
  const output = resolve("dist", page);
  await access(output);
  const html = await readFile(output, "utf8");
  const metadata = pageMetadata(record, site);
  if (metadata.canonical) {
    assert.ok(html.includes(`<link rel="canonical" href="${metadata.canonical}"`), `${page} canonical mismatch`);
    assert.ok(html.includes(`<meta property="og:url" content="${metadata.canonical}"`), `${page} og:url mismatch`);
  } else assert.ok(!html.includes('rel="canonical"') && !html.includes('property="og:url"'), `${page} must not advertise a canonical`);
  assert.equal(html.includes('name="robots" content="noindex, nofollow"'), metadata.noindex, `${page} robots mismatch`);
  if (metadata.image) {
    await access(resolve("public", `.${record.socialImage}`));
    assert.ok(html.includes(`property="og:image" content="${metadata.image}"`), `${page} social image mismatch`);
    assert.ok(html.includes(`name="twitter:image" content="${metadata.image}"`), `${page} Twitter image mismatch`);
  }
  if (!html.includes('name="viewport"')) {
    throw new Error(`${page} is missing viewport metadata`);
  }
  if (!html.includes('name="theme-color"')) {
    throw new Error(`${page} is missing theme-color metadata`);
  }
  if (!html.includes("/assets/")) {
    throw new Error(`${page} is missing its compiled asset references`);
  }
}

console.log(`Validated ${pages.length} built HTML documents.`);

const expectedMap = sitemap(projectPages, site);
if (expectedMap) {
  assert.equal(await readFile("dist/sitemap.xml", "utf8"), expectedMap);
  assert.ok((await readFile("dist/robots.txt", "utf8")).includes(`Sitemap: ${site.origin}/sitemap.xml`));
} else {
  await assert.rejects(access("dist/sitemap.xml"));
  assert.equal(await readFile("dist/robots.txt", "utf8"), "User-agent: *\nDisallow: /\n");
}
