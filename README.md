# Nari Nuna's Haven

A warm illustrated Astro home for Nari: five labelled room objects lead to streaming, self-taught nail art, biography, community and collaboration. Twelve real static documents, focused Vue islands and ordinary links. The new room artwork preserves the supplied character model unchanged.

## Run

Node.js 22.13+ and npm:

```bash
npm ci
npm run dev
```

Production artifact and checks:

```bash
npm run check
npm run preview
```

Browser checks:

```bash
npx playwright install chromium
npm run verify:browser
npm run verify:experience
```

`NARI_BROWSER_PATH` can select an existing Chromium executable. `npm run verify:browsers` covers Chromium + Firefox after both are installed; `npm run verify:release-browsers` adds WebKit. Eight visual baselines cover Home, Meet Nari, Haven and Nails at 390/1440px. Inspect deliberate changes before running `npm run verify:visual-update`.

## Architecture and source owners

| Concern | Owner |
|---|---|
| Static routes, shared metadata and preloads | `src/pages/`, `src/layouts/SiteLayout.astro`, `src/data/projectPages.json` |
| Illustrated arrivals | `src/components/astro/RoomArrival.astro`, `src/styles/objects/arrival.scss` |
| Room compositions and shared materials | `src/styles/rooms/`, `src/styles/_materials.scss` |
| Menu, three-knock door, floorboard, thumbnail fallback | Focused Vue components; no SPA/client router |
| Deferred choreography/atmosphere | `src/experiences/`, `src/shaders/` |
| Content, destinations and descriptions | Typed `src/data/` records; `rooms.ts` is a description registry, not a tour |
| Responsive artwork | Full provenance + compact runtime manifest, unchanged hashed WebP candidates |
| Credits and approval boundaries | `src/data/artCredits.json`, offline validator and independent release gate |
| Tests | Vitest, built-artifact validators, Playwright + axe and eight composition snapshots |

Astro 7, Vue 3, strict TypeScript, SCSS, Lucide, GSAP/ScrollTrigger and selective Three.js. No backend, CMS, database, account, analytics, form, iframe, heavy media player, Tailwind or UI kit. Native View Transitions were evaluated and disabled after rapid history navigation exposed browser abort errors. All navigation is immediate ordinary document navigation.

The static website is complete without decorative JavaScript. Required islands hydrate explicitly. Optional motion/graphics wait until load/idle, are skipped for reduced motion/save-data/mobile/coarse input and dispose on navigation/preferences. Home and Haven alone have a canvas. Pause/resume, visibility suspension and context-loss fallback keep atmosphere optional.

Initial JS/CSS stays below 120 KB gzip per route. Optional enhancement graph has an independent 180 KB ceiling; a capable Home/Haven session may transfer that additional code. Artwork budgets and exact CSP loader hashes remain enforced. Motion-V, the guided bottom room passage and Passport have been removed.

## Product and release boundaries

Preserve approved copy, original artwork, source masters, privacy, credit and permission records. Nail Studio is personal learning/practice; illustrated workspaces do not impersonate real nail work. Support never buys attention or access. The Prinny joke room remains separate and noindex. Resources, private biography, metrics, schedules, partnerships, contact and lore are never invented.

`npm run verify:release` intentionally remains blocked until client/content/rights/production-host/manual-QA records are cleared. The former `http-cache-semantics` advisory is resolved by the targeted upstream 4.3.0 patch; Astro remains 7.3.5 and the current full audit reports zero vulnerabilities.

Read [the home rebuild and current evidence](docs/44_NARIS_HOME_REBUILD.md), [the documentation hub](docs/README.md), and `AGENTS.md` before making changes. Earlier documents are dated history where superseded by the current implementation records.
