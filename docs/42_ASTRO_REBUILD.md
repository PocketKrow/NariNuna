# Astro rebuild — 2026-10-03

> **2026-10-05 vNext:** [Document 43](43_VNEXT_EXPERIENCE.md) owns the current experience. The guided bottom passage and Passport are retired; prior descriptions below are historical. Astro/static content, rights and release boundaries remain. All painted arrivals now have one composition owner; CSS/GSAP and selective deferred Three.js replace Motion-V.


## Authority and outcome

Jake requested a ground-up Astro rebuild of NariNuna, preserving the current website and reusing Vue as needed. ADR-011 supersedes the older Vite document scaffold and client-router contracts. Baseline: `main` at `c8af50f5921ea8851e738b310b16d24ce2b8fdbf`. Review branch: `kiva/astro-rebuild`.

All twelve routes now have native Astro templates. Their artwork, copy, destinations, signature compositions, fixed Nari atmosphere, hidden-room behavior and publication boundaries are preserved. There are no changes to artwork bytes, source masters, responsive manifests, identity/canon, contact details, recommendations, service claims or approval records.

## Current source ownership

| Owner | Responsibility |
| --- | --- |
| `astro.config.mjs` | Static output, trailing-slash documents, official Vue integration, existing asset directory and attribute style scoping |
| `src/pages/index.astro`, nested route `index.astro`, `404.astro` | Native page bodies; local data maps and conditionals execute at build time |
| `src/layouts/SiteLayout.astro` | Metadata, body route markers, responsive hero preloads, shared landmarks, no-JavaScript room navigation and secret-shell bypass |
| `src/data/projectPages.json` | Route, source/output filename, title, descriptions, social image, hero and visual route identity |
| `SiteFooter.astro`, `RoomPassage.astro` | Build-time room notes, footer and adjacent-room navigation |
| `SiteHeader.vue` | SSR-safe current-path prop; browser listeners start only on mount; immediate menu hydration |
| `HavenPassport.vue` | Idle hydration; versioned local room stamps with existing storage-denied fallback |
| `HavenDoor.vue`, `LooseFloorboard.vue` | Immediate interactive islands; three keyboard knocks, focus transfer/reset and optional basement reveal |
| `MediaCard.vue` | SSR clip links with immediate hydration; recognizes thumbnails that failed before hydration and restores the local illustration |
| Existing Vue artwork, social and discovery primitives | Render into static HTML without client directives; only interactive parents bring their dependencies to the browser |
| `scripts/secure-build.mjs` | Hash exact inline island loaders and append their CSP permissions to generated `dist/_headers`; no unsafe-inline/eval script allowance |
| `scripts/validate-performance.mjs` | Follow emitted document/island import graphs, enforce 120 KB gzip including inline loaders, preserve image budgets and matched hero preloads |
| `scripts/verify-preview.mjs` | Own a foreground Astro preview and verify twelve documents, identity/environment assets and all 27 retained Prinny derivatives |
| `scripts/verify-browser.mjs`, `browser-preview.mjs` | Reproducible Chromium checks on the current static artifact with its emitted CSP applied |
| `vitest.config.ts`, `tests/` | Separate Vue/composable compiler and assertions against actual Astro output |

The old root `pages/` HTML scaffold, Vue page modules, App/main bootstrap, client router, Vite app config and mount-only chunk-recovery helper/tests are retired. Native navigation owns URL fragments, back/forward and document changes. A failed island import cannot erase the prerendered page body. Existing dormant components and source artwork stay retained.

The Streams room’s two Vue `:deep` selectors become Astro `:global` selectors while preserving their targets. Page and shell styles retain attribute scoping so original selector priority and responsive composition survive the migration.

## Dependencies and maintenance

Astro 7.3.5 and `@astrojs/vue` 7.0.3 provide static generation and the Vue renderer. `@astrojs/check` checks native page templates. Astro’s current lint integration requires ESLint 10; ESLint, its JS rules and the Vue lint integration were upgraded compatibly so the migration does not introduce the older parser’s vulnerable glob dependencies. Vitest’s compatible 4.1.11 patch resolves its audit finding. Playwright 1.62.1 is development-only and runs browser checks. These packages use MIT licenses. No runtime network service, proprietary infrastructure, telemetry script, tracking or second framework is introduced.

Next and Nuxt would duplicate the selected document framework. Three.js has no product requirement in this preserved illustrated website and would add a graphics runtime without useful behavior. Removal/rollback is one migration revert and its prior lockfile, or redeployment of the baseline artifact. No source artwork is deleted by either path.

## Reproduction

```bash
npm ci
npm run check
npx playwright install --with-deps chromium
npm run verify:browser
```

For an already installed browser, `NARI_BROWSER_PATH=/absolute/path/to/chromium npm run verify:browser` selects it. CI installs Chromium and runs the browser gate after the ordinary gate. `npm run build` checks types/credits, emits static pages, generates CSP hashes and validates documents/performance. Tests that inspect rendered page content require that current build; `npm run check` owns the correct build-before-test order.

Use `dist/_headers`, including generated hashes, when hosting the artifact. Copying the source `public/_headers` over that output would block Astro’s island loaders. The browser verification server applies the emitted policy; actual hosting configuration remains a separate deployment check.

## Observed evidence

Local environment: Node 24.19.0, npm 11.9.0, Chromium from Playwright-compatible tooling. Before editing, fresh `npm ci` and the full baseline `npm run check` passed: 86 tests in 19 files, twelve built/served documents, 137 essential asset entries and 27 retained Prinny designs.

The rebuilt gate passed a fresh `npm ci`, lint, strict Astro and Vue/TypeScript checks (zero errors/warnings/hints), credit validation, twelve-page static generation, document/image/JS-CSS budgets, 88 tests in 20 files and HTTP preview verification. Home’s external graph plus inline loaders is 62.90 KB gzip; the largest route is Haven at 74.06 KB, both below the 120 KB gate. Browser verification passed all twelve routes at 320/390/768/1440px with their emitted CSP: one main/heading, no horizontal overflow, no page exceptions, no CSP/hydration failures, and early failed thumbnail recovery.

Observed interactions: mobile scroll lock, Tab containment, Escape focus return, resize cleanup, desktop More/Escape, precisely three keyboard knocks, Discord focus transfer and reset, floorboard reveal, standalone noindex secret room and exits, cross-document Passport persistence/reset, storage-denied fallback, live reduced-motion changes, missing-route 404, and 320px reading/navigation with JavaScript disabled.

Baseline/new screenshots of Home, Meet Nari and Haven at 390px and 1440px had identical dimensions and no pixels differing by more than 10 RGB channel levels. Streams initially showed failed SSR thumbnails; the mounted-state recovery fixes that migration defect. Browser test assertions preserve working links and local image fallbacks.

Generated inline CSP hash coverage is tested against every document. Responsive asset bytes/hashes, intrinsic sizes, transparency, retained originals and route preloads remain covered by the existing artifact/data contracts. No artwork file was modified.

## Security audit and limitations

The final full `npm audit --json` reports **3 high package findings**, all one root issue: `http-cache-semantics` 4.2.0, propagated to Astro and its Vue integration. [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp) has no published patched version at this check. npm’s proposed force fix downgrades Astro to 2.10.9 and breaks the selected integration; it is not applied.

Installed Astro imports this dependency in `dist/assets/build/remote.js` for its remote image-cache policy. This project uses registered local raster delivery and ordinary remote YouTube thumbnail `<img>` elements, not Astro remote image optimization, user sessions, response caching or a server adapter. The deployed artifact is HTML/CSS/browser JS and contains no Node cache runtime. These facts bound observed exposure; they do not declare the package patched. Reassess before adding remote image optimization or server rendering, and adopt an upstream patch when available.

Firefox/Safari, physical-device, screen-reader, native zoom/reflow, full contrast and actual-host header/cache checks remain pending. Existing client, identity, art/derivative/franchise permissions, recommendations, business contact, canonical community destination and production release decisions retain their recorded status. The review PR is not a merge, production deployment or approval.
