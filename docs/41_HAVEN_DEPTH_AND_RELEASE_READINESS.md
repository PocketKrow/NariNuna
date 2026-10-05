# Haven Depth and Release Readiness

> **2026-10-05 vNext:** [Document 43](43_VNEXT_EXPERIENCE.md) owns the current experience. The guided bottom passage and Passport are retired; prior descriptions below are historical. Astro/static content, rights and release boundaries remain. All painted arrivals now have one composition owner; CSS/GSAP and selective deferred Three.js replace Motion-V.


**Date:** 12 September 2026  
**Baseline:** open PR #22 head `d3200d7a9f68c195d9d3cb1474b920bd9715137e`  
**Review branch:** `kiva/haven-depth-release-readiness`  
**Release status:** `BLOCKED` by the explicit production gate

## Scope

This pass implements production-readiness tooling, archive-capable Credits, contextual artwork attribution, a local Haven Passport, four cross-room continuity details and rendered QA. It adds no route, dependency, backend, account, analytics, new artwork or invented real-world information.

Media Kit work is deliberately removed from scope at Jake's direction. The full Nari content/voice replacement remains deferred until Nari supplies and approves her real information.

## Production release gate

`src/data/releaseReadiness.json` stores only decisions that require human evidence. `scripts/verify-release.mjs` derives build integrity and artwork/attribution blockers from the built documents and canonical Credits registry. The command is intentionally separate from development quality:

```bash
npm run check
npm run verify:release
```

The first command may pass while the second correctly fails. `verify:release` rejects malformed records, unknown statuses, missing required categories, unresolved blocking items, pending attribution, unsafe family rights and missing build output. Resolved items require a public-safe evidence reference; private contracts and messages remain outside the repository.

Current blocking categories are artwork/rights, Nari content/canon, real Nail Studio content, professional contact and Discord verification, production host/domain/headers/cache/404/rollback, final accessibility/visual QA and the final production dependency audit.

## Credits and artwork archive

Artwork remains nested under its canonical credit. Each future archive piece requires a stable ID, tracked asset family, title, category, caption, alt text, intrinsic dimensions and optional verified year. The validator permits it only when its specific family is approved for publication and the parent credit explicitly approves artwork display. Approved images use `ResponsiveArtwork`; high-resolution originals are never exposed by the archive.

No current artwork was marked approved. Credits therefore shows one restrained empty-state note rather than an empty masonry grid or fabricated thumbnails.

`ArtworkCreditLink.vue` resolves a stable public credit ID and points to the real ledger fragment. Home, Meet Nari, Nail Studio, Haven and Story Time use it for significant illustrated work. The artist/status text remains in one registry.

## Haven Passport

The Passport derives all ten rooms from `havenJourney`. `useHavenPassport.ts` stores only canonical visited paths under `nari-haven-passport:v1`. It filters unknown paths, old versions and malformed data; catches read/write/remove failures; and retains a current-document memory fallback. The secret Prinny route, 404 and unknown paths are excluded.

`HavenPassport.vue` is an optional disclosure inside `RoomPassage`. It exposes an announced progress value, compact stamps and a quiet reset button. Completion adds only a line of acknowledgement. It never gates Discord, support, downloads, navigation or hidden content, and its only transition is removed under reduced motion.

## Cross-room continuity

Four data-owned discoveries connect existing rooms without becoming a second navigation system: Meet Nari → Work, Nail Studio → Resources, Resources → Streams and Haven → Story Time. Each is a real labelled document link with visible focus. No Prinny promotion, fake click target, personal anecdote or heavyweight artwork was introduced.

## Automated evidence

Fresh baseline before editing:

- `npm ci`: passed.
- `npm run check`: passed with 76 tests in 16 files, twelve built/direct-served documents, the existing Credits validator and all budgets.

Implementation checkpoint:

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: passed with 86 tests in 19 files.
- `npm run build`: passed with all twelve document, credit, artwork and performance validators.
- `npm run verify:release`: built successfully and then returned `NOT READY FOR PUBLIC RELEASE`, as intended.

## Rendered QA availability

The cloud Chrome session could not open the container-only preview because loopback addresses are blocked by that browser environment. The stacked PR received no Netlify deploy-preview URL during the review window, although GitHub's Node 22 Quality Gate completed successfully. Therefore no rendered viewport, keyboard, zoom, reduced-motion, contrast or screen-reader `PASS` is claimed for this commit. Firefox, a named screen reader, physical Pixel 9 and production-host behavior remain `PENDING`. This limitation is recorded in the release data rather than being papered over with structural tests.

## Rollback

Revert the focused Phase Two commit. This removes the release data/script, archive projection, contextual links, Passport and discoveries without deleting existing artwork, the canonical Credits foundation or PR #22 copy work. Clearing local Passport data is not required for rollback; the unused versioned key is inert.
