// Read-only public-asset inventory from repository root. Static matches include dormant registries; retention and dynamic consumers require human review.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { createHash } from "node:crypto";
import generated from "../src/data/responsive-artwork.json" with { type: "json" };

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

// Literal references are evidence for review, not proof of reachability or safe deletion.
// Templates, CSS and content registries can build URLs dynamically (notably the Prinny roster).
const scan = (roots) => roots.flatMap(files).filter((path) => /\.(vue|ts|scss|html|json|mjs|sh|py|md)$/.test(path))
  .map((path) => [path, readFileSync(path, "utf8")]);
const runtime = scan(["src"]).filter(([path]) => !path.startsWith("src/assets/") && !path.endsWith("responsive-artwork.json"));
const contracts = scan(["scripts", "tests", "docs"]);
const candidates = new Set(Object.values(generated.artworks).flatMap(({ candidates }) => candidates.map(({ src }) => src)));
const assets = files("public").map((path) => {
  const url = `/${relative("public", path)}`;
  const references = runtime.filter(([, source]) => source.includes(url)).map(([path]) => path);
  const records = contracts.filter(([, source]) => source.includes(url)).map(([path]) => path);
  const role = candidates.has(url) ? "generated-delivery"
    : references.length ? "runtime-reference"
    : url.startsWith("/media/prinny-cult/roster/") ? "retained-collection"
    : !url.startsWith("/media/") ? "static-site-file"
    : records.length ? "contract-or-provenance-reference" : "unreferenced-review";
  return { url, bytes: statSync(path).size, sha256: createHash("sha256").update(readFileSync(path)).digest("hex"), role, references, records };
});
const totals = {};
for (const { role, bytes } of assets) {
  totals[role] ??= { files: 0, bytes: 0 };
  totals[role].files++;
  totals[role].bytes += bytes;
}
console.log(JSON.stringify({ note: "Review candidates only; this command never deletes files. Source preservation is recorded in src/assets/source/delivery/inventory.json.", totals, assets }, null, 2));
