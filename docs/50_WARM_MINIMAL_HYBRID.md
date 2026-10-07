# Warm minimalist NariNuna hybrid

Current owner direction: Jake's 2026-10-07 attached handoff. Preserve the original late-autumn Haven aesthetic and Nari-specific identity, with the minimalist version's shorter pages, hierarchy and breathing room. This is a continuation of the existing Astro implementation, not a new scaffold. Review branch: `kiva/nari-warm-minimal-hybrid`, based on PR #31's corrected-art commit `5e84409`. ADR-017 supersedes the pale-lavender-only composition and five-primary-page structure. Main and PR #31 remain unchanged.

## Page responsibilities

| Document | Purpose | Secondary content |
| --- | --- | --- |
| Home `/` | Nari invites you to a warm sofa nook; Twitch and Meet lead | Exactly three illustrated links: Streams, Creativity, Haven |
| Meet `/meet-nari/` | Short personal introduction and repaired two-arm greeting | Three traits and a short kindness/boundaries note |
| Streams `/streams/` | The shared broadcast/controller moment and Twitch | Three existing outbound Shorts, with optional failure-safe thumbnails |
| Creativity `/nail-studio/` | Active personal nail practice | Honest real-work gallery hold and curating tools/resources |
| Haven `/haven/` | Welcome, community identity, “Kindness has a backbone” | Values before an optional three-knock door, then compact optional support |
| Work `/work-with-nari/` | Writing desk and three collaboration categories | Clear brief: idea, timing, deliverables, usage and compensation; existing public-profile contact |
| Credits `/credits/` | Footer utility attribution | Prior maker cameo; honest pending records |
| 404 `/404.html` | Direct Home recovery | Prior wayfinding cameo |

No invented nail photographs, personal history, approved resource endorsements, business inbox, schedule, live status, sponsor metrics or Reaper canon. Financial support never buys access or time. The supplied model remains the only character-design authority. The temporary Ghostie/sun/moon mark is retained; it is already appropriate to this direction and no canonical/cultural meaning is assigned.

## Composition and art owners

`_creator.scss` remains the single SCSS owner. Warm paper, oak/cocoa, restrained amber, lavender, emerald and small handwritten notes restore the original atmosphere. One primary artwork leads each major page. Complete proportional images use no cover crop or silhouette clipping; Ghosties belong in the scene. Home uses a shared illustrated destination strip; Meet uses compact text traits; Streams uses a horizontal preview treatment; other content uses plain typographic spreads. Header is full-name branding, five desktop destination labels, two quick watch links and a native mobile menu. Footer owns the six-profile directory and Credits without duplicating the full navigation.

Six built-in image generation/editing calls produce warm versions of the five previously accepted page poses plus a new model-anchored Haven doorway. Previous masters, original model sources, utility scenes, identity/favicon/share and delivery files remain. Exact prompts and source masters: `src/assets/source/warm-hybrid/`. Intake and unresolved rights: ASSET-2026-025. The anime preparation script's `--hybrid-only` mode updates six slots and records five hashed, non-upscaled, metadata-clean WebPs per slot. The existing 150,000-byte image limit, 25,000-byte initial JS/CSS gzip limit and zero optional effect graph remain.

Finite CSS scene entrance and hover feedback provide motion; reduced motion disables both. No new dependency, WebGL, GSAP, client router, island, backend, tracking, player or storage. Richness comes from the paintings.

## Door and routing

`HavenDoor.astro` emits a native `details` disclosure with the existing Discord destination. With JavaScript, a native button counts three deliberate clicks/Enter/Space/taps, updates a polite status, and opens the existing disclosure without a timer or focus jump. “Come straight in” skips the ritual and returns focus to the opener. Without JavaScript, a single native disclosure action opens it. No persistence or visit tracking; a document reload resets the knocks. Financial support is a separate final section, never a condition for entry.

Eight real Astro documents and five retired-route 301 migrations. Streams/Haven are restored native routes. Stories goes to Streams/#moments; Resources to Creativity/#resources; Support to Haven/#support; the retired hidden room to Haven/#values. Connections `/links/` goes to Streams. Because fragments never reach the server, legacy /links/#community and #support land on explicit footer links to the corresponding Haven sections; /links/#moments lands on the actual collection. All slash, no-slash and index.html variants are recorded in `public/_redirects`; `routeRedirects.json` owns migration intent. Ordinary anchors and the portable Netlify header/CSP/404 contract remain.

## Validation and boundaries

Current-pass observed results are appended after checks run. Historical evidence belongs to the earlier documents. Automated gates include `npm ci`, `npm run check`, `verify:browser`, axe, rendered composition, keyboard/touch/no-JS door, history, reflow, reduced motion and image failures. External platform identity checks are reported separately from URL syntax/static link preservation; unavailable or login-blocked surfaces stay unverified.

The review implementation does not grant Nari's final visual/canon adoption, original artist/model derivative permissions or production release clearance. Existing release-readiness and rights registries keep those states. No merge, production deployment, forced rewrite or source deletion is part of this pass.

Rollback: leave this branch unmerged, or normally revert the hybrid implementation commit to PR #31's corrected minimal build. Existing main/live build remains an independent reference. The exact remote PR, commit, checks and preview status are recorded after delivery.

### Observed review evidence — 2026-10-07

- `npm ci`: locked install passed; package lock and dependencies unchanged.
- `npm run check`: lint, strict Astro/Vue/TS checks (46 files; zero diagnostics), credit validation (9 records / 15 families), eight static documents, 52 tests in 13 files, and portable HTTP/asset validation passed. Retained identity/environment inventory and all 27 supplied Prinny sources remain available.
- Payload: 4.21–4.80 KB initial JS/CSS gzip per document against 25 KB; zero optional effect graph. Largest warm-scene candidate 142,088 bytes against 150,000. The complete Home image collection, including all three lazy destination previews and the reused mark, is bounded at 233,370 bytes even if every maximum candidate loads. Small destination previews cap at 320px; primary scenes retain 720px delivery for their bounded 650px display.
- `NARI_BROWSER_PATH=… npm run verify:browser`: eight documents at 320/390/768/1024/1440/1920 CSS px passed image decode, overflow, h1/main, runtime/CSP, menu focus/Escape/resize, five 301 migrations, branded unknown-path 404, reduced-motion and no-JS checks.
- `npm run verify:experience` with the same browser: all 31 checks passed. Zero axe WCAG A/AA violations on eight documents at 390/1440px and on the open menu/door and failed-clip state; 16 deterministic composition snapshots; history; 200% root-text enlargement at 320/390/768px; wide 1920/3840px reflow; keyboard Enter/Space and focus retention through three knocks; reload reset; touch; bypass; native no-JS door; blocked images/WebGL; optional preview success/failure and accessible profile names.
- Visually inspected all eight routes at 390/1440px using normal site fonts, plus the Home/Haven/Streams compositions at 320/768px. Reviewed six full source scenes for character identity, companions, framing and the corrected Meet hands. Full proportional artwork and readable content remain visible without overlap or clipped silhouettes. Snapshots use DejaVu Sans for deterministic CI; the normal site uses its display serif/system body stack.
- Environment: Node 24.19.0, Linux, Chromium 153.0.8010.0 via an existing local binary. The prescribed Playwright Chromium install was attempted but its downloaded archive was truncated; no dependency or CI workflow change was needed. GitHub CI repeats the gate on Node 22 with its managed Chromium. Firefox/WebKit, an actual named screen reader, and production 400% browser zoom are not claimed by this local evidence.
- External profile/video/invite strings are preserved from the existing verified records. Fresh direct checks were network/login restricted or throttled; this pass does not claim renewed external account or invite availability. Unknown nail photos, resources and dedicated business contact remain honest waiting states.
- `node scripts/verify-release.mjs`: deliberately remains **NOT READY FOR PUBLIC RELEASE** because the existing rights, Nari wording/canon, real work/contact, production host/domain and final release review records are unresolved. Review checks do not silently clear those approval records. Nari Dark/Light themes remain retired by the preceding review proposal; this pass reviews the one active warm atmosphere.

Branch: `kiva/nari-warm-minimal-hybrid`, based on corrected PR #31 (`5e84409`). The branch includes exact source prompts, retained masters, hashed delivery candidates, asset intake, route contracts and refreshed composition baselines. Remote PR/check/preview evidence belongs to the GitHub PR description so it can be updated without a self-referential commit.
