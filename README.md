> **2026-10-06 connected Haven revision:** [docs/48_CONNECTED_MINIMAL_HAVEN.md](docs/48_CONNECTED_MINIMAL_HAVEN.md) / ADR-015 adds provisional full-name branding, coherent shared navigation/footer, natural Home presentation, a new Meet welcome banner, Creativity/Connections and optional clip/Haven context. Existing URLs, source preservation and release boundaries remain.

> Current visual direction: [46 — Custom Anime Creator Art](docs/46_ANIME_CREATOR_ART_DIRECTION.md). Owner-selected light lavender/warm cream, faithful new model-anchored poses and seven custom master illustrations. [47 — observed revision validation](docs/47_ANIME_CREATOR_VALIDATION.md) owns current evidence; earlier results describe the first review iteration.

# Nari Nuna

A minimal, personal creator website. Nari's original model leads; Twitch and YouTube are immediately reachable, with nail-art practice, community values and clear public links close by.

Astro 7 builds a true static MPA with TypeScript and SCSS. Five primary pages: Home, Nari, Nails, Links and Work. Credits and a custom 404 remain quiet utilities. Vue/Lucide render selected primitives at build time; the current website has no hydrated islands, SPA router, GSAP, Three.js, backend, tracking or embeds.

```bash
npm ci
npm run check
npx playwright install chromium
npm run verify:browser
npm run verify:experience
npm run dev
```

Node 22.13+; npm with committed lockfile. `NARI_BROWSER_PATH` optionally selects an installed Chromium binary. `npm run artwork:model` prepares original-model delivery copies; it requires Pillow, like the existing art pipeline. `npm run artwork:identity` prepares the original-model social preview and retains its composition master. `npm run artwork:prepare` continues to own the retained general artwork family.

See [current product, routes, assets and architecture](docs/44_MINIMAL_CREATOR_RECONSTITUTION.md), [validation evidence](docs/45_MINIMAL_RECONSTITUTION_VALIDATION.md), [repository instructions](AGENTS.md), and [documentation index](docs/README.md). Six retired routes receive native 301 redirects; their useful source content remains archived. Netlify deploy previews use `npm run check` and append noindex headers. There is no universal SPA rewrite.

This is an owner-requested review build. Existing final identity/artwork/rights/contact/invite and production-release decisions remain unresolved in their existing registries. `npm run verify:release` remains the separate failing-until-cleared production gate. Do not merge or promote without owner authorization.
