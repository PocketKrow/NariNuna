# 44 — Nari’s home rebuild

2026-10-06 owner-requested review branch: `kiva/naris-home-rebuild`, based on main `9ac7be3e7b27eb76973debf54b3724087ad69b22`. This document supersedes doc 43’s arrival composition and active image choices. Architecture, factual content, rights boundaries and release gates remain governed by existing records.

## Result and source owners

Home is a layered dusk room with five visible native object links: monitor → Streams, polish → Nail Studio, album → Meet Nari, door → Haven, letter → Work With Nari. Persistent cream labels work without hover or JavaScript. The header and footer retain secondary destinations. Mobile uses a separately generated vertical room and a large two-column arrangement; the monitor spans both columns. No router, tour, mandatory animation or sound was added.

`havenArtwork.ts` owns composition keys and destinations; `RoomObject.astro` and `HavenImage.astro` render static object layers. `home.scss` owns responsive placement, focus and brief local gestures. `RoomArrival.astro` and `arrival.scss` own related interior views and a visible return link. Interior copy, real moments, voluntary support, legitimate public destinations, the three-knock door and optional floorboard remain intact.

All active room illustrations and postcards now use related newly authored environments. Four Ghostie inhabitants recur at the broadcast desk, polish, common room and correspondence desk. Shared Ghostie containment is transparent, padded and uses `object-fit: contain`; image dimensions come from the delivery manifest rather than old hardcoded dimensions. Background, prop and foreground layers are independent; foreground has no pointer events. Existing deferred GSAP shallow parallax and optional Three atmosphere retain failure cleanup, pause, reduced-motion and capability gates.

## Character fidelity

No new character image was generated. Supplied original model references and records were inspected; historical generated Nari paintings were treated as nonauthoritative. Home’s album and Meet’s paper frame use the untouched supplied portrait. ASSET-022 and the hashed provenance record specify references, cropping, source retention and pending rights. Existing background-removal artifacts in the source are not silently repainted. Framing is reversible and does not modify the model.

## Asset delivery and budget adjustment

Preserved PNG masters, rejected envelope V1 and full prompts stay offline. Metadata-clean source exports, hashed responsive WebP candidates, postcard exports and eight 1200×630 social images are recorded. No raster contains navigation text. `npm run artwork:prepare` reproduces all delivery candidates without upscaling or mutation.

Per-image ceiling remains 150 KB; new scene encoding may descend to quality 40 to meet the existing 148 KB generator limit. Initial JS/CSS remains 120 KB gzip, optional graph 180 KB. The old 200 KB Home-art assumption counted one flattened painting and one Ghostie. The measured conservative sum is 594,876 bytes; the new composed-room ceiling is 600 KB, counting the maximum delivery size of all five object layers, four 256px inhabitants, foreground, header Ghostie, background and unchanged 87.7 KB portrait. This explicit adjustment enables independent native objects; actual browser selections are measured separately. Interior postcards and supporting art remain lazy. Model masters and historical images are retained outside runtime selection.

## Validation evidence

Local evidence: `npm ci` and `npm run check` passed; 101 Vitest contracts, twelve built documents, metadata, credit classification, CSP hashes, per-image budgets and HTTP retrieval passed. `npm run audit:assets` passed after its obsolete pages-directory assumption was corrected. The Chromium route/island sweep passed at 320/390/768/1440px. All 31 Playwright checks passed, including axe across twelve routes at phone/desktop, keyboard-only object links with JavaScript disabled at four widths, three-knock focus behavior, history, reduced motion/save-data/mobile gating, optional chunk failure, context-loss/precision/draw failures and 200% text reflow. Eight Home/Meet/Haven/Nails compositions at 390/1440px were visually reviewed before baseline replacement. Additional Home renders were reviewed at 320/1024/1920px; all principal interiors were reviewed on phone/desktop. Fresh comparison passed all eight snapshots. The final route/island sweep and independent phone/desktop axe sweep also passed. The twelve-document axe tests now have a scoped 90-second deadline: the prior 45-second aggregate deadline could expire on the final document under concurrent load; assertions remain unchanged.

Local runtime: Node 24.19 and Chromium 153. The usual Playwright Chromium download was truncated; a temporary browser runtime outside the repository supplied the executable via `NARI_BROWSER_PATH`. No browser dependency or binary was added to the project. CI uses the repository’s Node 22 and Playwright-managed Chromium. Firefox/WebKit, screen-reader use and owner approval are not established by this evidence. Existing release validation remains intentionally blocked pending client/content/rights/host/manual-QA approval; completing the implementation does not clear those gates.

## Known content and review gates

Approved real nail photographs and curated resource recommendations have not been supplied; their existing honest holds remain. The Work page retains confirmed public links and its collaboration note; no private contact route was invented. Artist/model rights, public adoption of generated artwork, final credit wording and production host approval remain owner decisions. Firefox/WebKit and assistive-technology review must not be claimed from Chromium automation.

## Rollback

Revert this branch’s implementation commit to restore the previous compositions. Original sources, prior hashed candidates and existing asset records are preserved. Do not merge or replace production automatically. Review the PR preview and confirm model framing, mobile placements and content holds before a separately authorized release.
