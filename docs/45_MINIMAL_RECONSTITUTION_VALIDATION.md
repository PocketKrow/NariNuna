# Minimal reconstitution — observed validation

Date: 2026-10-06. Candidate: `kiva/nari-minimal-reconstitution`, based directly on main `9ac7be3e7b27eb76973debf54b3724087ad69b22`. This record covers the implementation tree committed with it; documentation changes do not imply a new production approval. PR #30 and main are unchanged.

Environment: Node 24.19.0, npm 11.9.0, Linux; Chromium-family Chrome for Testing headless shell 154.0.8037.92. Standard Playwright Chromium installation failed because its downloaded archive was truncated/invalid. Full Chrome startup failed on the environment's blocked Unix socket. The official standalone headless shell worked without that startup requirement; tests ran using `NARI_BROWSER_PATH`. CI uses its normal Playwright installer, Node 22 and deterministic DejaVu screenshot fonts.

## Commands and observed results

| Command | Observed result |
| --- | --- |
| `npm ci` | PASS, final patched lockfile; 520 packages installed |
| `npm run check` | PASS: lint; Astro + Vue strict typecheck (zero errors/warnings/hints); 9 credit records / 11 classified families; 7-document build; emitted CSP; artwork, identity, bundle budgets; 49 tests in 12 files; HTTP preview |
| `npm run verify:browser` with `NARI_BROWSER_PATH` | PASS: all seven documents at 320/390/768/1024/1440/1920px, one h1/main, all images load, no overflow/runtime/CSP errors; keyboard menu; Escape/focus return; resize; six native 301 migrations; 404 status; reduced motion; no-JavaScript document navigation |
| `npm run verify:visual-update` with `NARI_BROWSER_PATH` | PASS: 8 newly reviewed composition baselines (Home, Meet Nari, Nails, Links at 390/1440px); former Haven snapshots retired |
| `npm run verify:experience` with `NARI_BROWSER_PATH` | PASS: 19 tests, including comparison against those baselines; axe WCAG 2 A/AA + 2.1 AA scans of all seven documents at 390/1440px and the open menu; no violations; no-JavaScript documents; image failure/blocked WebGL; history; 200% root text enlargement at 320/390/768px and normal reflow up to 3840px |
| `npm audit --omit=dev --json` | PASS: 0 reported vulnerabilities after Vue 3.5.42 / source-map-js 1.2.2 security patches |
| `npm audit --json` | 1 moderate development-tool finding (`postcss-selector-parser`); 0 high/critical. It is not included in the production-only audit and is retained as a follow-up |
| `node scripts/verify-release.mjs` | EXPECTED BLOCKED: real production identity/artwork/contact/invite/host/manual-approval decisions remain unresolved; the gate was not weakened |
| `node scripts/noindex-preview.mjs` | PASS: adds noindex/nofollow within the existing global header block while preserving CSP and cache sections; applied only by Netlify review contexts |
| `git diff --check` | PASS |

Early failures were corrected: unavailable Lucide platform exports replaced by the site's existing glyph paths; oversize derivative re-encoded within budget; original character credit fragment fixed; retired tests migrated to actual document/content contracts; text enlargement overflow fixed through intrinsic sizing and safe wrapping. Unused room styles/components were removed in the final cleanup, and the browser sweep includes 1024px. Final checks and the browser sweep were rerun after that cleanup; the visual/experience results cover the same unchanged emitted composition. No failed check is represented as passing.

HTTP preview proves seven served documents, 143 essential identity/environment asset entries and all 27 original Prinny designs still available. Retired public pages are absent as documents and old content is archived as text. Native 301s land on real destinations and existing fragments. Local browser QA reads emitted CSP; zero inline script blanket exemptions and no third-party page requests were observed. No original model/source/archive is deleted or rewritten.

## Performance evidence

| Measurement | Original main | New candidate |
| --- | ---: | ---: |
| Home initial JS + CSS gzip | 56.97 KB | about 3.7 KB |
| Home deferred effect graph gzip | 174.85 KB | 0 KB |
| Initial per-document budget | 120 KB | 25 KB |
| Deferred effect budget | 180 KB | 0 KB |
| Hydrated islands | Present | 0 |
| Initial local Home image body bytes at 390px, DPR 1 | Not measured | 38,788 B |
| Initial local Home image body bytes at 1440px, DPR 1 | Not measured | 99,828 B |
| New 1200×630 share JPEG | N/A | 74,959 B |

The shared external menu script is 331 B before gzip; shared CSS is approximately 12.8 KB before gzip. Image totals are observed selected responsive candidates for model + lavender + cozy Ghostie; the artwork source payload is not sent. The high-priority original portrait uses a 240px candidate on the tested phone and 480px on desktop. These are local transfer/bundle measurements, not field LCP/CLS or Lighthouse scores. All original source/hash/alpha and metadata checks pass.

## Assets and limits

New: 12 proportional original-model WebP delivery derivatives, native monogram favicon (retained SVG master), original-model share composition (retained PNG master + optimized JPEG), provenance/delivery records. Reused: original supplied Nari fullbody/portrait, existing individual cozy/heart/nail/broken-page Ghosties, lavender and local platform glyphs. Supporting art is composed with breathing room; no Nari likeness is synthesized. Existing art, source masters, official emotes and 27 supplied Prinnies remain retained. Production rights, attribution and final Nari/client adoption remain open, including the new identity composite's underlying original-model rights.

Not yet verified: real Firefox/WebKit devices, named screen-reader combinations, actual browser-UI 400% zoom, final client approval, production host headers/cache/redirects/domain, live platform/invite identity freshness, field LCP/CLS. Existing social records retain their historical verification dates. No business inbox, nail examples, schedule, statistics, partnership or contact fact is invented. Real nail photos remain an explicit hold.

Rollback: no merge or production deployment is performed. Review the competing PR; leave it unmerged to keep the present production site. If later adopted, revert its implementation commit or restore the prior verified artifact through the normal deployment workflow.
