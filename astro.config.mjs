// Static documents own routing; Vue integration renders existing primitives and hydrates only explicit islands.
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

export default defineConfig({
  output: "static",
  scopedStyleStrategy: "attribute",
  trailingSlash: "always",
  integrations: [vue()],
  build: { assets: "assets" },
  vite: { build: { assetsInlineLimit: 0 } }
});
