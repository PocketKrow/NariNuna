> **6 October 2026 experience v2:** [Document 44](44_IMMERSIVE_HAVEN.md) owns the layered Home, new alpha assets, contextual residents, tiered touch/desktop motion, evidence and rollback. It supersedes the frozen-art/mobile-exclusion statements below; rights and release gates remain.

# Current State Audit

> **2026-10-05 vNext:** [Document 43](43_VNEXT_EXPERIENCE.md) owns the current experience. The guided bottom passage and Passport are retired; prior descriptions below are historical. Astro/static content, rights and release boundaries remain. All painted arrivals now have one composition owner; CSS/GSAP and selective deferred Three.js replace Motion-V.


> **2026-10-03 Astro migration:** Jake explicitly requested the rebuild in Astro. ADR-011 and [42 — Astro rebuild](42_ASTRO_REBUILD.md) own the current route, shell, dependency, validation and rollback contracts. Vite-MPA/client-router paths below are dated history. Product content, imagery, privacy and release approval boundaries still apply.

**Reviewed:** 12 September 2026. **Repository:** public `SomberKrow/NariNuna`.
**Main baseline:** `d1b495cd8aa0be5aaaa8a9255e2bc756d9b5491e`, merged PR #21.
**Implementation under review:** `kiva/credits-humanization`; this record does not claim its merge or deployment.

## Current implementation

Twelve real HTML documents share Vue, explicit lazy route modules and ordinary anchor navigation. Credits joins More/footer navigation and the ten-room passage without becoming a primary header item. A structured public-safe registry classifies ten asset/contribution families and drives nine public credit records; no contributor artwork renders because no related display permission is recorded. The three-knock Haven threshold, tiny optional floorboard/Prinny route and existing content boundaries remain intact.

The humanization pass shortens obvious template language on Home, Meet Nari, Nail Studio, Haven, Resources, Work With Nari and Story Time. Streams and Support were audited and retained because their direct copy already met the established modes. Missing Nari wording, artist identities, links, real nail work and permissions remain honest holds.

The merged maintenance baseline adds a compact browser artwork manifest while preserving full tooling provenance and every responsive/source raster byte. It removed 59 obsolete cult CSS groups, merged one adjacent identical-selector doorway block without changing declaration order, and added responsibility/contract comments across the baseline code. All 121 vectors retain an ownership classification.

The README, route contracts and owning asset/content documents now describe the Credits system. No dependency, artwork byte, source-retention contract or release approval changes.

The Phase Two review branch adds a separate production release gate, an archive-capable Credits projection with contextual credit links on five significant illustrated routes, a ten-room versioned local Haven Passport, and four restrained cross-room discoveries. No account, tracking, backend, new asset, route or dependency was added. Media Kit work and the full Nari content replacement remain explicitly outside this pass.

## Observed validation

Node **24.19.0**, npm **11.9.0** locally. CI selects Node 22; consult the PR checks for its result.

| Check | Observed result |
| --- | --- |
| Fresh `npm ci` | Passed against the unchanged lockfile |
| `npm run check` | Passed: ESLint, strict Vue/TS, 76 tests in 16 files, 12-document production build, credit/document/artwork/performance validators and HTTP preview |
| HTTP preview check | 12 documents, 137 essential asset entries and all 27 supplied Prinny designs |
| Credit validator | 9 records across 10 explicitly classified families |
| Shared JS + CSS graph | 65.53 KB gzip / 120 KB budget |
| Credits route additions | 4.67 KB JS gzip / 35 KB; 1.32 KB CSS gzip / 12 KB |
| Asset changes | None; existing retained and delivery bytes are untouched |

Phase Two checkpoint on `kiva/haven-depth-release-readiness`: `npm run check` passed with 86 tests in 19 files, twelve built and directly served documents, 137 essential asset checks, all 27 retained Prinny designs and all existing gzip budgets. `npm run verify:release` rebuilt successfully and then failed on the explicit unresolved production blockers, which is the required result.

GitHub's Node 22 Quality Gate passed on the initial PR #23 implementation commit. The cloud Chrome session could not reach the container-only preview, and the stacked PR did not receive a Netlify deploy-preview URL during the review window. No new rendered browser or assistive-technology result is claimed.

[Document 37](37_SIZE_MAINTENANCE.md) owns exact before/after sizes, validation methods, scope limits and rollback. [Document 38](38_CODE_OWNERSHIP.md) owns code coverage; [document 39](39_ASSET_DISPOSITION.md) records the retained asset candidates.

## Corrections and remaining work

Reduced-motion fragment navigation now requests instant movement while preserving history precedence and fragment targets. The retained preference helper has per-consumer listeners, preventing one unmount from silencing another. The dormant summoner uses responsive artwork instead of requesting a relocated original. The obsolete immutable-cache rule for the empty generated-media family was removed; current content-addressed cache rules remain.

Chromium was absent and installation failed with network timeouts. No new browser screenshots, keyboard walkthrough, DPR/network measurement, zoom/reflow, screen-reader, contrast or field-performance result is claimed. Lossy social/image recompression, candidate pruning and broad active-style consolidation remain deferred until that evidence is available. Structural equivalence is useful evidence, not a substitute for complete rendered QA.

Four dependency advisories remain open under [document 36](36_MAIN_SECURITY_AND_KNOWN_ISSUES.md); the unchanged lockfile was deliberately kept separate from metadata/CSS work. Host headers, actual unknown-route status, cache revalidation and atomic deployment/rollback remain unverified. No zero-day or active exploitation was established.

## Release boundary

The repository and tracked assets are public. Historical “private-review” wording describes authorization scope, not access restriction. Nari-only final approval, identity/canon, derivative/display/franchise rights/credits, real nail work, recommended resources, public business contact, canonical Discord destination, host/domain and final accessibility/visual review remain open. This maintenance branch neither resolves those decisions nor authorizes merge/release/deployment.
