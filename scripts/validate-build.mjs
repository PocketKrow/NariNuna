// Run from repository root after Astro. Missing documents, metadata or compiled asset references fail the build; this is not browser rendering.
import projectPages from "../src/data/projectPages.json" with { type: "json" };
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const pages = projectPages.map(({ document }) => document);

for (const page of pages) {
  const output = resolve("dist", page);
  await access(output);
  const html = await readFile(output, "utf8");
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
