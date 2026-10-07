# Anime creator revision — observed review evidence

Observed 2026-10-07 UTC on the follow-up revision to `kiva/nari-minimal-reconstitution`, PR #31. Document 45 remains the historical evidence for the prior composition. Owner-selected direction: light lavender/warm cream, model-matching clean anime shading, and new poses preserving Nari's character design. No merge or production release is authorized or performed.

## Selected artwork and delivery

Seven accepted transparent PNG illustration masters: `nari-welcome`, `nari-nails`, `ghostie-play`, `ghostie-bloom`, `lavender-flourish`, `correspondence`, and `ghostie-recovery`. Available exact prompts, the bloom Ghostie design brief and master files are retained under `src/assets/source/anime-creator/`; machine-readable master SHA-256, reference, crop and derivative records are in `src/data/anime-artwork.json`. Original supplied character masters and previous review sources are retained unchanged. Two Nari poses were inspected against the supplied model for complexion, eye/hair/tail color, asymmetric ears, accessories, tattoo and costume. Final character adoption is still Nari's decision; model/public derivative rights and attribution remain unresolved.

Forty-three transparent WebP candidates use hashed filenames, intrinsic dimensions, proportional resizing without upscaling, explicit source crop records, stripped delivery metadata and a 150 KB per-file cap. Transparent padding is retained for composition. The Nail Studio illustration is explicitly labeled as illustration rather than real nail work. Supporting Ghosties are custom review art, not official emotes. The share composition is 1200×630; the delivered JPEG is 66,811 bytes. The hashed Ghostie favicon is 64×64. Every primary document has a deliberate illustration slot; the footer shares the lavender flourish.

## Local checks

- `npm ci`: passed.
- `npm run check`: passed ESLint, Astro/Vue type checking (zero errors/warnings/hints), credit classification (9 records / 12 families), seven-document static build, CSP generation, performance checks, 51 tests across 13 files, and HTTP verification of 187 essential identity/environment assets plus all 27 supplied Prinny designs.
- Initial JS + CSS: 4.00 KB gzip per route against the 25 KB budget. Optional/deferred application graph: zero. No hydrated islands or canvas.
- `npm run verify:browser`: passed all seven documents at 320, 390, 768, 1024, 1440 and 1920 CSS pixels, including decoding each image, no horizontal overflow, one h1/main, no application runtime/CSP errors, keyboard menu/Escape/focus return, six exact 301 migrations, branded unknown-path 404, reduced-motion removal, and 320px navigation without JavaScript.
- Manual decoded-image screenshots inspected: Home at 320/390/768/1024/1440/1920; Meet and Nails at 390/1440; Links/Work at 1440; Credits at 390. New artwork has transparent surroundings, unobscured faces and readable links. Earlier quick screenshots were superseded by image-decoded captures where necessary.
- Fresh DPR-1 full-page image transfer observations, including lazy artwork after scrolling: Home 53,924 bytes at 320px and 103,806 bytes at 768/1024/1920; Nails 39,642 bytes at 390 and 67,024 at 1440; Meet 50,936 at both inspected widths; Credits 12,992 at 390. These are image-body totals, not a Lighthouse score or a high-DPR measurement.

The Playwright Chromium installer was attempted and failed because its downloaded archive was truncated/invalid. Local browser checks instead used available Chromium 153.0.8010.0 through `NARI_BROWSER_PATH`; the standard Playwright-managed browser installation was not claimed. Visual baselines use deterministic DejaVu Sans and reduced motion.

## Release boundaries

`node scripts/verify-release.mjs` returned the expected blocked production result. Existing final rights, wording/canon, real nail photography, contact/domain/host, public-release accessibility/cross-browser and rollback gates remain open. Automated axe and reflow checks do not constitute a named screen-reader review, Firefox/WebKit review, browser UI 400% zoom review or Nari's final approval. No pending approval is marked complete by this visual revision. PR #30 and main are untouched.

Remote CI and preview results will be reported with the PR after they are observed.

`npm run verify:visual-update`: eight composition baselines regenerated after decoded-image inspection; all eight passed (Home, Meet, Links, Nails at 390/1440px).

`npm run verify:experience`: all 19 Chromium tests passed. This includes axe on all documents at 390/1440, the open mobile menu, eight current composition snapshots, image failure/blocked WebGL, no-JavaScript routes, history navigation, and reflow at 320/390/768/1920/3840 (200% root text size on the three narrow viewports). No browser family beyond Chromium is claimed.
