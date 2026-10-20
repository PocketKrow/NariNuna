// Static documents own routing; Vue integration renders existing primitives and hydrates only explicit islands.
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

import { siteConfiguration } from "./scripts/site-metadata.mjs";
const site = siteConfiguration();

export default defineConfig({
  site: site.production ? site.origin : undefined,
  output: "static",
  // Config defaults remain overridable by CLI flags; repeating --port/--host makes Astro parse arrays.
  server: process.env.npm_lifecycle_event === "start" ? { host: "0.0.0.0", port: 8080 } : undefined,
  scopedStyleStrategy: "attribute",
  trailingSlash: "always",
  integrations: [vue()],
  build: { assets: "assets" },
  vite: { build: { assetsInlineLimit: 0 } }
});
