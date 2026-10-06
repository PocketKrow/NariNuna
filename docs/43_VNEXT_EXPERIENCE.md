> **6 October 2026 experience v2:** [Document 44](44_IMMERSIVE_HAVEN.md) owns the layered Home, new alpha assets, contextual residents, tiered touch/desktop motion, evidence and rollback. It supersedes the frozen-art/mobile-exclusion statements below; rights and release gates remain.

# NariNuna vNext experience

Owner instruction: Jake's 5 October 2026 handoff explicitly authorizes a substantial experience redesign based on `kiva/astro-rebuild` / PR #24, removal of the bottom guided tour, GSAP/ScrollTrigger, selective Three.js and a new review PR. The baseline is `fea296225e5e57721b60d91797eb173738b8590a`. This document supersedes older passage/Passport, Motion-V and hero-cascade instructions. Implementation/review authority does not authorize merge or production release.

## Product and composition

The ten ordinary public destinations remain, plus the independent noindex Prinny joke room and branded 404. The header, More directory, ordinary footer and four existing contextual discoveries provide navigation. There is no previous/next rail, room counter, Passport, visit tracking or replacement tour. `rooms.ts` retains descriptions solely for ordinary navigation.

All nine illustrated arrivals now use `components/astro/RoomArrival.astro` with one SCSS object owner, `styles/objects/arrival.scss`. Artwork selection still uses `heroStyle` and the three mutually exclusive density-band preloads. The desktop copy lane leaves Nari clear; phones show a deliberate art plate above copy. Meet, Nails and Work use warm paper on small screens. Each route keeps a specific annotation and crop. The bounded wide-screen canvas prevents enormous 4K crops.

Home introduces Nari through the existing window painting, a clear Haven invitation and compact social controls. Below it, three illustrated room objects provide direct access to streaming, nails and community. These are a choice of destinations, not a guided path. Meet Nari becomes an asymmetric journal spread with small entry Ghosties and a quieter boundary note. Nails uses an illustrated workspace plate beside practice paper; the real-photo hold and personal-practice scope remain explicit. Haven's values become a paper charter before its three-knock doorway. The doorway keeps deterministic Vue state and focus/reset contracts, with a small Ghostie on the second knock and a cleaner frame. Other room content retains its existing meaningful broadcast, shelves, correspondence, album, support and credit-ledger devices beneath the recomposed openings.

364 obsolete hero/widget selector groups were removed from the shared historical layers. The empty `_face-safe.scss` and replaced `_mobile-first.scss` were retired. Retained interior rules remain in the existing foundation files; this is a substantial reduction, not a claim that every legacy interior rule has been rewritten. New geometry is not layered on the old hero selectors.

All existing raster/source bytes, provenance, rights records, credit states, factual claims and outbound destinations remain. Procedural light/dust is code decoration; it does not use or redraw character textures. No new canonical lore, imagery, metrics, schedule, contact, service, testimonial, or approval is adopted.

## Experience ownership and loading

- Astro owns documents, metadata, readable content, materials and navigation.
- Vue owns menu, Haven doorway, floorboard and media fallback state.
- `experiences/core/lifecycle.ts` loads optional modules only after the load event and an idle opportunity. Generation checks discard pending imports after navigation/preferences change. Pagehide disposes; persisted pageshow restores.
- `capabilities.ts` rejects reduced motion and save-data. Mobile/coarse pointers also skip decorative runtimes. Graphics additionally require a wide viewport, at least four reported CPU threads and working WebGL2. `experiences/core/webgl.ts` owns nullable/throwing shader-precision checks and safe context release; both the pre-download probe and the actual rendering canvas must pass.
- GSAP 3.15.0 / ScrollTrigger shifts artwork by at most 18px and material objects by 12px. It does not hide readable content, pin sections, hijack scrolling or move navigation. MatchMedia/context teardown returns styles to static values.
- Three.js uses a WebGL2 renderer, 48 deterministic soft motes, capped pixel ratio, capped drawing buffer and approximately 30fps. Home uses warm/lavender dust. Haven's doorway receives a sparse emerald response based on the actual knock state. There is no camera drift, WebGPU requirement, external shader/texture, audio or whole-site canvas.
- The atmosphere has a keyboard-accessible pause/resume control. Rendering stops offscreen and when the document is hidden. Disposal releases observers, animation frames, renderer, geometry, material, handlers and context. Context loss falls back to the static scene.
- Missing enhancement chunks leave content and ordinary navigation usable.
- Native CSS cross-document View Transitions were evaluated. Chromium 153 reports “Transition was aborted because of invalid state. ViewTransition opt-in disabled” during repeated rapid back/forward, despite correct destinations. The native transition rules and dead keyframes are removed for this pass. Normal document navigation remains immediate; no errors are hidden, links delayed or ClientRouter introduced. Revisit only after a browser-supported solution passes the same stress test.

## Dependencies, licensing and removal

Motion-V, its dormant GhostieSummoner and the now-unused reduced-motion composable are removed. GSAP uses its distributed Standard License; Three.js is MIT. Their code runs locally with no remote script, account or telemetry integration. Axe (MPL-2.0) and Playwright Test (Apache-2.0) are development-only accessibility/regression tools; Three types (MIT) are development-only. Remove the experience component script, decorative canvas/control, `experiences/` and `shaders/` to retire effects; static page content and artwork remain intact. Remove the corresponding dependencies and update budget/tests/docs in the same change.

Astro Content Collections were considered for stories/resources/nail sets/credits. There are currently three structured clip records, intentionally empty real nail work, curated resource holds and a credit registry already subject to stricter permission validation. A schema migration would add a second content authority without new editorial content. Keep the typed records and canonical credits JSON for this pass; revisit collections when approved entries arrive.

## Performance and security

The original 120 KB gzip **initial** JS/CSS gate remains. The previous regex failed to follow imports emitted as template literals; it is replaced with a TypeScript AST traversal for static and dynamic module edges. Every route reports both its initial graph and the conservative reachable optional graph. A separate 180 KB gzip ceiling bounds the explicitly authorized deferred GSAP + Three.js enhancement. The conservative graph includes the available Three chunk on all illustrated arrivals, but browser capability/element checks fetch it only on Home and Haven. The graphics runtime's uncompressed size exceeds Vite's 500 KB warning threshold; it is deliberately isolated and never part of initial or mobile transfer. Do not interpret deferred transfer as free: a capable Home/Haven session loads roughly 174 KB gzip extra. No initial budget or artwork budget is raised.

Existing exact inline-loader CSP hashes, no-iframe/no-media policy, responsive artwork budgets, rights gates and static Netlify configuration remain. The previously tracked `http-cache-semantics` advisory GHSA-ch52-4w7c-c8xp now has an upstream fix. A targeted lockfile update to 4.3.0 resolves it without changing Astro 7.3.5; the fresh full audit reports zero vulnerabilities. The static/local-artwork exposure boundary remains documented historically. No destructive downgrade or blanket audit-fix command was used.

## Validation and review

Commands:

```bash
npm ci
npm run check
npx playwright install chromium
npm run verify:browser
npm run verify:experience
```

`verify:browser` covers all twelve routes at 320/390/768/1440, errors/CSP, menu focus/resize, three knocks/focus/reset, floorboard return, failed thumbnails, 404 and no-JS navigation. `verify:experience` adds axe scans at 390/1440, menu/door states, eight visual baselines, static documents at 320×568, request-level reduced/save-data/mobile runtime exclusion, optional-chunk failure, graphics pause/preference disposal and back/forward navigation.

The eight snapshots are Linux Chromium full-page compositions with reduced motion, fully decoded local images and test-only DejaVu font normalization. Actual design review also uses the site's normal system font stack. Font/engine differences can affect pixels: regenerate only after inspecting a deliberate composition change. CI attaches screenshots/traces on failure. PRs use Chromium; main adds Firefox; `verify:release-browsers` also includes WebKit. A missing engine is a limitation, not a pass.

Observed on 5 October 2026 against the final built artifact, using Node 24.19.0, npm 11.9.0 and Chromium 153.0.8010.0:

| Check | Observed result |
|---|---|
| `npm run check` | Lint passed; Astro/Vue types have zero errors/warnings; 12 documents built; 89 tests in 19 files passed; HTTP preview and asset validators passed |
| `npm run verify:browser` | All 12 routes at 320/390/768/1440; no overflow/runtime/CSP/hydration errors; menu, three knocks, reset, secret return, 404, image failure and no-JS checks passed |
| `npm run verify:experience` | Original 17-case suite passed locally with zero skips; all-route axe scans at 390/1440 and menu/door-state scans have zero reported violations; eight inspected snapshots match. The final suite has 20 cases after splitting the layout matrix by viewport |
| Additional experience checks | Short 390×568 screens, 200% root text at 390/768 and 1920/3840 layouts passed; rapid back/forward has no page errors; active WebGL2 pause/resume and reduced-motion disposal passed |
| Runtime request exclusion | Reduced motion, save-data and mobile request checks fetch no decorative runtime; blocked enhancement chunks preserve readable content/navigation |
| Payload | Home 56.73 KB and Haven 67.25 KB initial JS/CSS gzip; every route under 120 KB; reachable optional graph 174.44 KB under the separate 180 KB ceiling |
| Artwork/provenance | No diff in `public/` or `src/assets/`; original hashes, candidate sizes and nine hero preload sets validated |
| Dependency audit | Zero vulnerabilities in the full audit; raw report in `evidence/2026-10-05-vnext/npm-audit.json` |
| Public release gate | `node scripts/verify-release.mjs` deliberately exits 1 with unresolved rights/client/production/manual-QA records; it has not been cleared by this review work |

The official local Playwright browser download returned an incomplete archive. An existing-compatible Chromium binary was obtained outside the repository and selected through `NARI_BROWSER_PATH`; it is not a project dependency. CI installs its normal locked Playwright Chromium on Node 22 and repeats the gate. The first CI run passed the build, 89 unit tests, route smoke, axe, all eight snapshots and active WebGL checks. Its single combined 20-document layout test exceeded the 45-second per-test budget on that host. The unchanged assertions are now four independently timed viewport cases; their focused local rerun passed. The final 20-case suite runs in CI without relaxing the per-test timeout or screenshot threshold. Firefox/WebKit were not available locally and are not claimed as passes. Physical devices, a named screen reader, native page zoom/high contrast and client/rights/release decisions remain pending. Automated 200% root text is not a substitute for native 400% page-zoom review. Snapshot screenshots use existing review artwork; they are not publication-rights approval.

## Rollback

Revert the vNext commit or use the PR #24 artifact. No source-art deletion, data migration, backend, account or new external service is involved. Do not merge or publish production without Jake's instruction.

## 5 October 2026 — shader precision and canvas recovery fix

Jake reported `THREE.WebGLRenderer` reading `.precision` from a null `getShaderPrecisionFormat()` result in the deployed atmosphere. Three r186 assumes a non-null shader precision object; the previous guard tested only WebGL2 context existence. The underlying reason for his browser returning null is unknown. MDN documents null as a valid error result: <https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderPrecisionFormat>.

The focused `kiva/webgl-precision-fallback` branch starts from merged main `e9bac95`. `webgl.ts` checks vertex/fragment high-float precision and context-loss state before the graphics import and again on the actual canvas. The renderer receives that exact validated context. Missing/zero/null/throwing support leaves a static composition and hidden atmosphere control. Rendering/resize exceptions stop animation and dispose resources. No library/browser API is patched in production, no precision result is fabricated, and no dependency, artwork, content, CSS or release approval changes.

An additional regression reproduced a lost-canvas reuse bug: reduced motion on disposed the context, then reduced motion off could not restart it. Disposal now replaces the inert decorative canvas after releasing its owned observers/listeners/resources. The old context is lost; later preference or persisted-page re-entry can obtain a fresh context. The same pause/resume control remains usable after recovery.

Observed on this fix's final built artifact with Node 24.19.0 / npm 11.9.0 / Chromium 153.0.8010.0:

- Fresh `npm ci` and `npm run check` passed: lint/types, 12-document build, artwork/CSP/payload/HTTP validators and 98 unit tests in 20 files.
- `npm run verify:browser` passed all 12 routes at 320/390/768/1440 and the menu, three-knock/reset, hidden-room, image-failure, 404 and no-JavaScript contracts.
- Focused Chromium experience checks passed nine cases, with zero skips: unavailable/throwing context creation, null precision on the probe and actual canvas, throwing precision queries, real context loss, rejected draw, pause/resume and reduced-motion off/on recovery, and runtime exclusion for reduced motion/save-data/mobile. Both Home and Haven fault cases keep content/navigation usable with no collected page or console errors. The off/on recovery test failed before canvas replacement and passed afterward.
- Home/Haven initial JS/CSS are 56.97/67.49 KB gzip; the conservative optional graph is 174.85 KB, within the unchanged 120/180 KB gates.

The official browser download again returned a truncated archive. A temporary external Chromium binary selected with `NARI_BROWSER_PATH` supplied local validation without altering project dependencies. The new graphics-injection tests skip only when an engine lacks usable WebGL2; unavailable/throwing context cases still run. Firefox/WebKit and Jake's specific browser/driver environment were not tested locally. The existing full axe/screenshot suite was not rerun locally for this nonvisual fix; the PR quality gate runs it. No merge or deployment is authorized by this report. Rollback is a normal revert of this focused fix.

## 6 October 2026 — complete Ghostie silhouettes in cards

Jake reported cropped Ghosties throughout the card sections. The shared wrapper hid overflow while its square image was sized only by width; a desktop journal image measured 88px tall inside an 80px slot. The inline home/resource paintings were forced from their native 16:9 into 16:10, and the studio painting into 4:3 with `object-fit: cover`, cutting off the Ghostie at the right edge.

The focused `kiva/ghostie-card-fit` branch stacks on PR #27 (`f34d6a0`). `GhostieArt.vue` now contains the image within both slot dimensions, adds a small inset and leaves the silhouette/drop shadow unclipped. Desktop journal slots are square so their original display size is retained. Home, studio and resource postcard images use their intrinsic proportions and `contain`. Source masters, responsive candidates, dependencies, content and hero crops are unchanged.

Observed on the final built artifact with Node 24.19.0 / npm 11.9.0 / temporary Chromium 153.0.8010.0 selected through `NARI_BROWSER_PATH`:

- Fresh `npm ci` and `npm run check` passed: lint/types, 12-document build, artwork/CSP/payload/HTTP validators and 98 unit tests in 20 files. Final browser-test lint passed.
- `npm run verify:browser` passed all twelve routes at 320/390/768/1440 and the existing menu, door/reset, secret room, failed-image, 404 and no-JavaScript contracts.
- Five new geometry regressions passed with zero skips: all twelve documents at those four widths, complete Ghostie slots and native postcard proportions, plus 200% root text and the second-knock visitor at 390px. All-route axe scans passed at 390/1440 with zero reported violations.
- Eight intentional Chromium composition baselines were regenerated and visually inspected at 390/1440. The regression also checks loading and horizontal overflow; no asset bytes in `public/` or `src/assets/` changed.

Firefox/WebKit and physical devices were not tested locally. The existing CI gate repeats the full Chromium experience suite. This card-layout fix does not change release approvals; rollback is a normal revert of its focused commit.
