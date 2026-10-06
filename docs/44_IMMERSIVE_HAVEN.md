# Immersive Haven — experience v2

Jake's 6 October 2026 asset/experience brief authorizes this isolated visual-review rebuild. Baseline: `0bd732e3d3ae33437b3f4cf284273b9ec1332e5b`, the head of open PR #28 stacked on #27. Neither fix is lost; no merge or production deployment is performed. This document supersedes document 43's frozen-source rule and mobile runtime exclusion, while retaining its static Astro, Vue islands, ordinary navigation, rights, accessibility and lifecycle boundaries.

## Artwork audit and decisions

Inspected contact sheets cover the retained room paintings, postcards, source Ghosties, Nari derivatives, motifs, supplied artwork/emotes, hidden-room environments and all 27 collection designs. `asset-inventory.json` is the complete automated served-file/hash/reference census; the delivery inventory protects relocated/retired sources. Generated responsive derivatives are checked against their masters and hashes rather than treated as additional original art. Source paintings are intentionally not overwritten.

| Family | Finding | Decision |
|---|---|---|
| Home sunset | Strong portrait and window composition, but flattened character/seat and foreground | Preserve original; create aligned empty-room plate and faithful character extraction. Separate real planes for room, Nari, resident, practical light and nearby still life. |
| Meet, Streams, Nails, common room, Resources, Work, Stories | Strong room-specific content; existing Nari/background are flattened | Retain integrated paintings; add independently delivered environmental framing, a contextual resident and light direction. These are additive depth compositions, not claims that every painted object was segmented. |
| Daybreak, midnight, old doorway gathering | Alternate/retired review art | Preserve outside active delivery. Do not silently reintroduce theme controls or duplicate downloads. |
| Doorway interior | Existing portrait framed for the three-knock interaction | Preserve responsive loading, state and focus contracts. Add a distinct blanket-carrying visitor and CSS light response driven by actual knock state. |
| Eight postcards | Native proportions correct after #28; useful small glimpses | Preserve sources/candidates. Home gains window-sill objects and residents outside the painting, not a cover crop. |
| Twelve community poses | Individually authored 1254² alpha, expressive; semantic aliases overstate physical diversity | Retain all twelve; add distinct welcome and doorway originals. Header wave now resolves to the real wave. No invented pose count or mass regeneration. |
| Existing Ghostie variants | Sleeping/study/nail/gaming/protective poses are already distinct | Reuse contextual poses near shelves, journal edges, broadcast ledge and practice paper. Fit whole silhouettes; no square-card cropping. |
| Older generic + five storybook Ghostie families | Different stylistic languages, mostly inactive | Preserve as rollback/reference; do not mix these families into the active interface. |
| Supplied model, cozy illustration, three storybook character derivatives | Identity/canon/artist rights remain unresolved | Preserve bytes and mappings. Only Home's existing painted character gets background extraction, not a new identity. |
| Official emotes and 27 supplied Prinnies | Authored/source-specific designs and separate rights boundaries | Retain; no generated replacement, animation or invented lore. |
| Motifs (lavender, leaves, ribbon, sparkles, wisps) | Supporting art, several inactive | Retain; avoid covering all sections with repeated glitter or symbolic motifs. |
| OG/share art and identity marks | Existing route metadata and brand | Preserve; a layered screen is not a new canon/brand approval. |
| New v2 masters and working copies | Six source outputs, two matched 1672×941 Home plates, four standalone alpha props/companions | Separate `src/assets/source/vnext/`; full generation, derivative, hash, safe-area and rights records in ASSET-2026-022. |
| Credits/release registry | Existing pending/blocked records | Add one classified revision family; model-derived Home plates remain blocked. No fabricated adoption, rights or release clearance. |

## Composition and ownership

`roomDepth.ts` owns room identities, foreground choice, light mode, residents and unitless depth coefficients. It is server-only; no full asset/provenance registry enters optional chunks. `RoomArrival.astro` delivers semantic scenes and responsive planes; `arrival.scss` owns their geometry, overscan, safe reading lane and directional illumination. Nari's new Home plane has the original framing and a lower depth coefficient than its foregrounds. The static composition is complete with JavaScript disabled.

Home has an actual empty window-seat backdrop with Nari separated from it, a welcoming tea-cup companion on the seat, an amber foreground still life and independent illumination. Other paintings keep Nari integrated while separate curtains/foregrounds and companions establish nearer depth. Copy never moves. The three Home destinations become glimpses on a sill rather than flat postcards with centered clip-art.

`RoomCompanion.astro` owns decorative, lazy, intrinsic-size companions in the interiors. The journal has layered page edges/bookmark; Resources residents sit by shelves, the broadcast room keeps its sleepy ledge, Nail Studio keeps its paper practice notes, Work its shy correspondence companion, and Stories its cozy album companion. No metrics, contact, portfolio photography, lore or service claim is added.

Lighting follows painted sources: amber window light, desk pools, lavender monitor reflection, lantern glow. The Haven doorway's light changes through CSS `:has()` based on existing step classes; it does not own or delay interaction state.

## Progressive enhancement

| Tier | Eligibility | Delivered behavior |
|---|---|---|
| Static | Reduced motion or detectable save-data; also no JavaScript/chunk failure | Complete art, readable content, normal links, all controls usable |
| Touch | Small viewport or coarse pointer, motion allowed | Tiny one-shot material settling via native Web Animations; no GSAP/Three, no perpetual frame loop |
| Depth | Fine pointer, ≥1024px, motion allowed | GSAP/ScrollTrigger scroll depth and bounded pointer response of scene-owned planes; independent coefficients, no text hiding or pinning |
| Atmosphere | Existing capable desktop + validated WebGL2 | Home/Haven only: 72 softly glowing depth-scaled motes, capped ~30fps/buffer/DPR, real knock response and pause control |

The lifecycle schedules after load/idle, rejects stale imports, disposes on pagehide, restores on BFCache entry, and responds to motion/layout/save-data changes. Scene observers stop pointer response offscreen; there is no independent perpetual Ghostie drift. Touch animations are finite and cancel on visibility/preference changes. GSAP context disposal removes transforms and ScrollTriggers. Existing WebGL precision, context-loss, renderer-failure and canvas-renewal guards from #27 remain intact.

Ordinary Astro documents remain the navigation model. Native View Transitions are not reintroduced. No new dependency, runtime feed, 3D model, sound, persistence or external service.

## Delivery and performance

The **120 KB initial JS/CSS** and **180 KB optional graph** ceilings remain unchanged. Mobile imports only the tiny touch module. Desktop prop plates use an art-directed transparent source below 1024px, so hidden artwork does not download on phones. The Home character plane is capped at 1280px delivery, with its preserved 1672px original; the background retains 1672px. Home's near still life is capped at 256px delivery, intentionally softer than the character. Every image candidate remains below the existing 150/160 KB per-image ceilings.

The old Home unit test measured a single painting and header Ghostie at 200 KB. It now measures the actual layered composition (background + character + resident + prop + header) against the project's pre-existing **250 KB first-viewport artwork ceiling**. This changes the measured composition, not the project budget. Request-level checks and the final evidence below report actual transfers; the full possible responsive candidates are not all fetched.

Pipeline: `python3 scripts/prepare-depth-artwork.py` then `npm run artwork:prepare`. Original PNGs and migration sources are immutable. Normalization adds transparent safe areas to standalone props/Ghosties; aligned Home plates receive no padding/crop. Candidate generation strips metadata and never upscales. The build ships only local content-addressed derivatives. ASSET-2026-022 retains exact successful built-in prompts and provenance.

## Validation

Observed on Node 24.19.0 / Chromium 153, against the final built artifact:

- Fresh `npm ci` and `npm run check` passed: lint, strict types (zero diagnostics), build, artwork/credit/CSP validators, 101 unit tests in 21 files, and twelve independently served documents with 160 essential assets and all 27 supplied Prinnies.
- `NARI_BROWSER_PATH=/tmp/chromium npm run verify:browser` passed all twelve routes at 320/390/768/1440, menu focus/keyboard, three knocks/reset, floorboard/secret room, failed thumbnails, 404 and no-JavaScript navigation, with no reported overflow/runtime/CSP/hydration errors.
- `NARI_BROWSER_PATH=/tmp/chromium npm run verify:experience`: **41 passed, zero skips**. Includes all-route axe at 390/1440, static layers and full resident geometry across nine rooms at 320/390/768/1440/1920/3840, short phone height, 200% root text, blocked chunks/artwork, bounded independent plane transforms, reduced-motion disposal/restart, native back/forward, the preserved #27 precision/context-loss/draw-failure cases, and #28 silhouette regressions.
- Eight composition baselines were deliberately updated after visual inspection of the normal-font Home/Meet/Haven/Nails compositions at 390/1440; the full suite then compared and passed those baselines.
- Home initial JS/CSS: **58.46 KB gzip**. Highest initial route: Haven **68.85 KB**. Full optional illustrated graph: **175.59 KB gzip**. Unchanged ceilings: 120/180 KB.
- Fresh-context request measurements: Home hero plus header **239,814 bytes** at 1440 and 3840 (DPR 1), **229,270 bytes** at 390 (DPR 2), all under 250,000 bytes. Counts include the initial header candidate even where hydration reuses the resident's cached candidate. Browser lazy-prefetch of below-fold windows/companions is reported separately in `request-measurements.json`, not hidden in the first-viewport figure. Mobile fetched touch only, neither desktop motion/atmosphere nor desktop prop plates; reduced-motion desktop fetched no effect module.

Evidence is in `docs/evidence/2026-10-06-experience-v2/`. The asset census was generated from an isolated checkout of the staged review tree, excluding unregistered intermediate candidate experiments. Temporary Chromium was selected via `NARI_BROWSER_PATH`; its official download failed with HTTP 502/truncated archives. Firefox/WebKit download fallback succeeded; Firefox required local sandbox relaxation to create pages, while WebKit cannot launch because this host lacks its GTK/GStreamer and other shared libraries. Firefox 153 completed: **27 passed, 14 skipped, zero failures**. Eight skipped cases are Chromium-only raster baselines; six require usable WebGL2, unavailable in this Firefox session. The two no-context/creation-failure cases still passed. Its temporary local config set `security.sandbox.content.level: 0` and `MOZ_DISABLE_CONTENT_SANDBOX`, `MOZ_DISABLE_RDD_SANDBOX`, `MOZ_DISABLE_GMP_SANDBOX` to 1; normal repository/CI browser settings are unchanged. Five Chromium Ghostie cases were rerun and passed after hardening decode checks to retry actual image decoding during lazy loading/hydration. Work's tablet grid was corrected after Firefox exposed overflow at 200% root text; postcard framing now excludes the new companion. Physical devices, native browser zoom/screen reader, final client/artwork adoption and release clearance remain unverified. Automated text enlargement is not native zoom.

## Rollback and review boundary

Revert this isolated experience-v2 commit to restore #28's source/mappings, static paintings and desktop-only enhancements together. No source master deletion, data migration or irreversible operation. Review work does not resolve production permissions or authorize merge/deployment. Base the review PR on #28 while it is open; once #27/#28 merge, retarget to `main` and reconcile normally without dropping either fix.
