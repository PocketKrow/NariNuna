import redirects from "../src/data/routeRedirects.json" with { type: "json" };
import { writeFile } from "node:fs/promises";
// Native HTTP redirects at Netlify; no SPA rewrite, client router or redirect pages.
const rules = redirects.flatMap(({ fromPath, to }) => [fromPath, fromPath.slice(0, -1), `${fromPath}index.html`].map((from) => `${from} ${to} 301!`));
await writeFile("public/_redirects", `${rules.join("\n")}\n`);
