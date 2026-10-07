> **Current direction, 2026-10-06:** [44 — Minimal Creator Reconstitution](44_MINIMAL_CREATOR_RECONSTITUTION.md) supersedes the environment-first layout, twelve-route contract, room navigation, doorway/secret interaction and WebGL requirements below. Earlier implementation descriptions are historical. Canon, truthful content, source preservation, rights and production approval boundaries remain.

# QA and Acceptance Criteria

> **2026-10-05 vNext:** [Document 43](43_VNEXT_EXPERIENCE.md) owns the current experience. The guided bottom passage and Passport are retired; prior descriptions below are historical. Astro/static content, rights and release boundaries remain. All painted arrivals now have one composition owner; CSS/GSAP and selective deferred Three.js replace Motion-V.


> **2026-10-03 Astro migration:** Jake explicitly requested the rebuild in Astro. ADR-011 and [42 — Astro rebuild](42_ASTRO_REBUILD.md) own the current route, shell, dependency, validation and rollback contracts. Vite-MPA/client-router paths below are dated history. Product content, imagery, privacy and release approval boundaries still apply.

> 2026-09-07 implementation delta: [integrated visual refinement](34_DISTINCTIVE_UI_REFINEMENT.md) records current layouts, style ownership, content disclosures, and observed QA. Earlier implementation descriptions below are historical where superseded; product and release requirements remain in force.

**Status:** Automated foundation previously recorded as passing; final production matrix incomplete  
**Owns:** Test layers, evidence status, per-route acceptance, release blockers  
**Update trigger:** Any behavior/content changes, evidence is rerun, or release environment changes

## Evidence language

| Status | Meaning |
|---|---|
| `PASS` | Observed with named method, date, commit, and environment |
| `FAIL` | Observed behavior violates the criterion |
| `PENDING` | Required check not yet performed on the relevant version/environment |
| `BLOCKED` | Check cannot complete without external input or rights/infrastructure |
| `N/A` | Explicitly not applicable, with reason |

Intent, code review, or a previous commit's result is not a current `PASS`.

## Current Phase E client-review evidence — 2026-09-02

The Phase E working tree passed `npm ci` and the full `npm run check` pipeline after Phases A–D. The final Phase E commit adds only the shared-header More/Escape stabilization, its contract assertion, and synchronized evidence documentation; the full gate is rerun on that commit before publication. See `docs/32_PHASE_E_VALIDATION.md` for exact observed counts, route/asset coverage, pending manual viewport and assistive-technology checks, blockers, and rollback boundaries. This is client-review evidence, not production release clearance.

## Historical snapshot

The prior implementation handoff recorded these observations on 2026-08-13 for commit `b65e1c5a6da5a35f4f4f5969465c13f32f277912`:

- `npm run check` passed: lint, TypeScript, four Vitest tests, production build, eleven-document validator.
- Desktop cloud preview at 1363×936 had no horizontal overflow.
- Light theme updated document theme color; Ghostie reveal opened.
- Haven door and floorboard sequence completed; secret route rendered without global shell.
- Secret metadata was `noindex, nofollow`; oath/Rule Eleven interaction completed.
- Cross-document View Transition errors were removed with the feature.

This is retained as historical evidence, not automatically carried forward. The final release record must replace it with current commit/environment evidence.

## Automated repository gate

Run from a clean checkout:

```bash
npm ci
npm run check
```

The gate includes:

- ESLint;
- strict Vue/TypeScript checking;
- Vitest content contracts;
- production MPA build;
- deterministic credit-registry validation;
- existence/metadata/asset-reference validation for twelve HTML documents.

Current gaps to consider expanding before release:

- exact equality among Vite entries, router records, validator pages, and documented route registry;
- duplicate navigation labels/route names;
- allowed external origins and new-tab rel attributes;
- fixed Nari atmosphere metadata across all twelve documents and absence of stale preference runtime;
- publish-state filtering when target content schemas arrive;
- broken/expired volatile-content checks where automatable;
- generated public image metadata/size budget checks.

`npm run verify:release` is intentionally separate. It first proves the current build, then evaluates machine-readable manual approvals and rights facts derived from Credits. A nonzero result is expected while genuine release blockers remain and must not be added to normal `npm run check`.

Phase Two browser attempt, 12 September 2026: the cloud Chrome session could not reach the container-only loopback preview, and the stacked PR did not receive a Netlify deploy-preview URL during the review window. GitHub's Node 22 Quality Gate passed, but no rendered, keyboard, zoom, reduced-motion, contrast, Firefox or screen-reader result is promoted to `PASS`. Exact details remain in [document 41](41_HAVEN_DEPTH_AND_RELEASE_READINESS.md).

## Manual test matrix

Every ordinary route plus secret and 404 must be covered. Use final content/assets.

### Viewports

| Width | Purpose |
|---:|---|
| 320px | Minimum supported reflow |
| 390px | Common narrow mobile composition |
| 768px | Tablet/intermediate layout |
| ≥1280px | Wide desktop hierarchy/crop |

Also test 200% text zoom and 400% page zoom rather than treating fixed widths as accessibility proof.

### Preferences/themes

- Nari atmosphere on every direct-loaded route.
- Historical `dark` or `light` local-storage values do not affect first paint or hydrated state.
- No theme selector or theme-specific keyboard stop is present in the Phase A demo.
- Reduced motion on before load.
- Preference changed while page is open.
- Increased contrast where browser/OS support permits.
- Keyboard-only.
- Screen-reader smoke combination(s) recorded.
- Images blocked/remote thumbnail failed for affected pages.

## Product acceptance

- [ ] Site feels specifically like Nari's Haven, not a generic VTuber template or social directory.
- [ ] One public identity is internally coherent and explicitly approved.
- [ ] Streams, Nail Studio, and Haven are equal product pillars.
- [ ] Community language includes dignity, respect, care, cooperation, boundaries, and room for difference.
- [ ] Professional path is clear without fabricated metrics/contact/partnerships.
- [ ] Support begins with optionality and contains no entitlement/dark pattern.
- [ ] No fake schedule, review, product, testimonial, sponsor, service, contact, or lore remains.
- [ ] Every placeholder is replaced or explicitly adopted with owner/rights/credit approval.

## Route and MPA acceptance

- [ ] Twelve expected HTML documents exist in `dist/`.
- [ ] Each direct-loads from the production host.
- [ ] Refresh, trailing slash, and back/forward preserve the Nari atmosphere across documents.
- [ ] Top-level links remain document anchors.
- [ ] Page modules remain lazy and only relevant route content initializes.
- [ ] Unknown route maps to branded `404.html` with intended status behavior.
- [ ] Secret route is absent from ordinary navigation and search intent.
- [ ] Canonical URLs and metadata match final domain/routes.

## Shared-shell acceptance

- [ ] Skip link is first, visible on focus, and reaches main.
- [ ] Header current state is correct on every route.
- [ ] Mobile menu opens/closes by pointer, keyboard, Escape, and link selection.
- [ ] Mobile focus order/containment/return decision is verified.
- [ ] Theme buttons are labelled, pressed state is announced, and pre-paint flash is absent.
- [ ] Footer links and selected socials are current and not a dense link wall.
- [ ] Ghostie opens/closes without obscuring content or flooding announcements.

## Page acceptance

### Home

- [ ] Hero establishes Haven and one primary action.
- [ ] Social dock, Haven CTA, Meet Nari path, and shared navigation provide clear onward routes without a secondary gateway rail.
- [ ] Final art crop/veil maintains contrast at every target width/theme.
- [ ] Selected moments remain usable when thumbnails fail.
- [ ] Discord and financial support do not dominate arrival.

### Meet Nari

- [ ] Canonical CatDog/Grim Reaper wording is approved and coherent.
- [ ] Character art is current, permitted, credited, and crop-tested.
- [ ] Emerald and sun/moon meaning remain personal and textual.
- [ ] No private identity, inferred heritage, or credential leakage.

### Streams

- [ ] Selected clips are approved, reachable, representative, and correctly rated.
- [ ] Twitch/YouTube/VOD links are current.
- [ ] No autoplay, iframe, platform SDK, or fake schedule.
- [ ] Adult content is opt-in before navigation.

### Nail Studio

- [ ] Gallery contains only Nari's approved real work.
- [ ] Every image has rights/credit/metadata/privacy record and good responsive detail.
- [ ] Techniques/materials/education are factual and scoped.
- [ ] No service, licensure, client, sanitation guarantee, or medical inference.

### The Haven

- [ ] Values appear before invite.
- [ ] Door works through every state with pointer/touch/keyboard/reduced motion.
- [ ] Canonical Discord resolves to intended guild; failure path is tested.
- [ ] Floorboard is optional, understandable, and not hover-only.

### Resources

- [ ] Every published item is approved and reviewed.
- [ ] Material relationships are visible.
- [ ] Prices/availability are dated or omitted.
- [ ] Curating states contain no fake products.

### Work With Nari

- [ ] Fit, boundaries, process, and approved next step are clear.
- [ ] Metrics have first-party dated records and approval.
- [ ] Contact is explicitly public/business-approved.
- [ ] No dead form, private email, or response-time promise.

### Support

- [ ] Presence/free support precedes financial support.
- [ ] No urgency, ranking, access, ownership, or guilt language.
- [ ] Throne/other methods are current and clearly external.

### Story Time

- [ ] Only approved/privacy-reviewed records render.
- [ ] Draft/retired records render nothing.
- [ ] Ratings/warnings appear before adult content.
- [ ] Participant permission/redaction/removal path exists where relevant.

### Credits

- [ ] Every meaningful current artwork family has an explicit disposition.
- [ ] Confirmed names and links have evidence; pending entries do not imply verification.
- [ ] Blocked records and non-approved artwork never render.
- [ ] The page remains complete and understandable with images blocked.
- [ ] Long names, missing optional links, card wrapping and status labels reflow at target widths.
- [ ] Contextual artwork links resolve to real Credits records and fragment targets.
- [ ] Archive imagery renders only from the explicitly approved tracked family through responsive delivery.

### Haven Passport and discoveries

- [ ] Entering each ordinary journey room records that canonical path locally; repeat visits do not duplicate stamps.
- [ ] Malformed, old-version or unavailable storage cannot break the page.
- [ ] Reset clears only Haven Passport progress; the secret route and 404 are excluded.
- [ ] The disclosure, progress, stamps and reset remain keyboard-operable, readable at zoom and meaningful with reduced motion.
- [ ] Environmental discoveries are real labelled links, preserve visible focus and never expose or gate the secret route.

### Secret and 404

- [ ] Secret has visible exit, original assets, buttons, optional shortcut, capped state, and `noindex`.
- [ ] Secret contains no private information or franchise imagery.
- [ ] 404 has no external dependency and provides a clear Home action.
- [ ] Host-level unknown-route behavior is observed.

## Accessibility acceptance

- [ ] Automated scan has no critical/serious issues, followed by manual review.
- [ ] One meaningful `h1`, correct landmarks/headings, and understandable link names.
- [ ] Keyboard-only route/custom-interaction matrix passes.
- [ ] Screen-reader smoke matrix passes with recorded tools.
- [ ] 200% text and 400% page zoom reflow without lost content/controls.
- [ ] No horizontal page overflow at 320px caused by content.
- [ ] All Nari-atmosphere states meet contrast target with final art.
- [ ] Reduced motion preserves meaning and removes decorative movement.
- [ ] No focus ring is clipped/covered; fixed UI does not obscure targets.

## Performance acceptance

- [ ] Shared and route chunks remain within documented gzip budgets.
- [ ] Responsive image candidates load as intended; no source master is accidentally public.
- [ ] Explicit dimensions prevent material layout shift.
- [ ] Production mobile/field-style measurement targets LCP <2.5s p75 and CLS <0.1.
- [ ] Initial network contains zero unapproved third-party JS/iframes.
- [ ] Final nail-detail imagery balances fidelity and transfer size through visual review.

## Privacy, rights, and security acceptance

- [ ] Every final asset has owner, creator, permission, credit, crop, derivative, and local-hosting record.
- [ ] Public photo derivatives pass EXIF/GPS and visual privacy inspection.
- [ ] No private contact/location/message/family detail or client secret exists.
- [ ] External links are HTTPS, current, and use safe rel behavior.
- [ ] CSP/permissions/referrer/no-sniff/frame/cache headers are observed in production.
- [ ] Dependency, secret, license, and content-rights review passes on release commit.
- [ ] No analytics/form/embed/integration exists without its approved privacy/security design.

## Deployment and rollback acceptance

- [ ] Production domain, HTTPS, canonical metadata, and preview indexing are correct.
- [ ] HTML revalidation and hashed-asset immutable caching behave as designed.
- [ ] Atomic deployment or equivalent prevents mixed old/new asset state.
- [ ] Previous-known-good deployment is identified.
- [ ] Rollback is executed in rehearsal or production-safe verification and documented.
- [ ] Post-deploy smoke checks cover every route, core interaction, links, headers, and network.

## Release command sequence

```bash
npm ci
npm run check
npm run preview
```

Then complete the manual matrix and `templates/RELEASE_EVIDENCE_RECORD.md`. Release is blocked by any critical failure, missing rights/canon approval, unknown host behavior, or unreviewed private content.

## 2026-09-05 performance gate addition

`npm run check` now includes source/derivative hash, alpha, byte and dimension contracts; the capped complete Home image composition; stale-chunk recovery; built hero preloads; and unique transitive gzip JS/CSS limits. Local evidence: 56 passing tests across 10 files and 11 passing document/routes. Image-byte improvements are not Lighthouse scores. See `33_RESPONSIVE_ARTWORK_PERFORMANCE.md` for exact observations and remaining browser/mobile/release gates.
