# Cohesive Haven refinement — 20 October 2026

## Scope and source

Jake's implementation handoff authorizes a feature branch and one review PR targeting fresh Main, preserving the current Haven. Branch `kiva/haven-cohesive-refinement`, PR #36, starts from `cadc39162dac9f5d32d4c27b4b5dcb2f47118010`. No open PRs were returned at inspection. Main's existing [quality run](https://github.com/PocketKrow/NariNuna/actions/runs/39360949974) was successful; that remains baseline evidence.

The local execution tool returned **“No usable execution environment is available.”** Therefore builds, rendered regressions, paired screenshots and network comparisons use GitHub Actions. Source inspection alone does not establish visual quality. No font, illustration, crop, navigation ranking, dependency or release approval is changed.

## Implemented owners

| Problem | Change and owner |
| --- | --- |
| Lavender album-title hover on parchment | `MediaCard.vue` selects normal/interactive heading tokens per presentation, with the same readable treatment on keyboard focus. Album cards opt into the paper surface. |
| Source-derived paper focus risk (baseline link color checks passed) | `_tokens.scss` defines dark/paper focus and interaction colors; `_base.scss` owns `data-surface="paper"` and shared outline geometry. Album, practice notes and collaboration letter declare paper. Mobile paper introductions set the same focus token in `objects/arrival.scss`. The Work-only focus override is removed. |
| Home skips community values | Home's primary action says “Explore the Haven” and links to `/haven/`. Existing `#haven-door` fragments, charter order, three knocks, native invitation fallback and focus/reset behavior remain. |
| Duplicate clips promoted as a different archive | Streams names the same-clips album; Story Time explicitly describes its shared selection. The charter discovery makes the same distinction. No story or anecdote is invented. |
| Empty resource shelf suggested as an existing guide | Nail Studio's link says the shelf is still curating; its discovery is a bookmark for that shelf, not a guide. Stable resource fragments remain. |
| Haven downloads graphics while visitors read the arrival | `lifecycle.ts` observes atmosphere canvases with 300px proximity before probing shaders or importing Three. One import promise serves eligible canvases per generation. Observers disconnect on preference/layout changes and page exit; stale async work cannot mount. Existing renderer visibility, pause/resume, disposal and BFCache handling remain. Without observation support, artwork stays static. |
| Stale style comments / duplicate adjacent rule | Correct retired face-safe/Vue-page ownership comments and merge the adjacent header-link declarations. No global layer reordering or broad cascade rewrite. |

The door and floorboard retain `client:load`: prompt keyboard operation, fragment entry, focus and failure fallbacks take priority over speculative hydration savings. Media recovery also remains immediate. Shared motion remains deferred after load/idle; only eligible, nearby artwork requests the graphics graph.

## Evidence workflow

The test-only first commit (`38d4709`) ran against the unchanged implementation. [Baseline regression run](https://github.com/PocketKrow/NariNuna/actions/runs/39479040980) reproduced nine failures: album-title hover at both 390/1440px measured **1.7464:1**, Home skipped to the doorway at six widths, and Haven requested `atmosphere.GT4b4-Og.js` before the doorway. The other 33 browser cases passed, including the two paper-link color checks. Consequently the source-derived Nail Studio focus concern is not classified as a reproduced contrast defect; surface tokens make the contract explicit, and final tests also require a painted 3px outline. The baseline passed clean installation, both zero-vulnerability audits, lint/types/build, all 106 tests in 23 files, HTTP checks, the twelve-route Chromium smoke and the production-origin build.

- `browser-tests/refinement.spec.ts` measures computed album hover/focus colors and paper outlines, the values-first Home journey at 320/390/430/768/1440/1920px, pre-door network exclusion, fragment entry and failed graphics import.
- Existing `verify:browser` still covers all twelve routes, mobile menu/Escape/resize, three knocks/reset, no-JS and image failures. Existing experience cases cover axe, preferences, graphics failures, history, reflow and eight accepted composition baselines. Those baselines are not regenerated.
- A PR-only `refinement-review` job builds the candidate and exact PR base on the same runner. Explicit review tests capture eight pages at 390/1440px using the real font stack and failed-remote-thumbnail fallback, and record requested local JS/CSS gzip sizes before/after reaching the door.
- `scripts/browser-preview.mjs` accepts an optional local `NARI_PREVIEW_ROOT` for the paired review; default behavior remains `dist`. Both artifacts use the same preview server, browser, fonts, viewport and measurement method.
- The `haven-refinement-review` artifact contains `review-base/` and `review-candidate/` screenshots plus JSON reports. These are review material, not visually approved baselines.
- The review job also runs Firefox behavior/accessibility. CI's existing quality and production-origin jobs retain all audits, budget, CSP, metadata, artwork and HTTP checks.

Requested-file gzip is computed from files the browser requested, excluding images. It is **not** actual compressed HTTP transfer, production timing, LCP, CLS or field Core Web Vitals. Final measured totals belong in the dated evidence/update once jobs complete.

## Deliberately pending

| Handoff area | Reason and executable next step |
| --- | --- |
| Nail workbench/gallery recomposition | Existing source shows repeated workspace/practice content, but no local rendered inspection is available. Inspect the paired production-font screenshots before changing proportions or removing artwork. Keep the honest real-photo hold. |
| Meet Nari / Resources / Work density and wide/tablet composition | Inspect the same-runner page comparisons and the existing tablet/short-screen checks; make specific layout adjustments only from rendered evidence. This pass does not claim a completed aesthetic redesign. |
| Typography | Retain the existing display fallback stack and optional locally installed Inter/system body stack. No new font payload or unverified license is introduced. Real-stack CI screenshots expose Linux rendering; macOS/Windows variation and native enlarged-text review remain pending. |
| Broad SCSS ownership consolidation | Active layers overlap. Continue one owner at a time with rendered comparisons; do not append another polish layer or reorder the cascade blind. |
| Native zoom / assistive technology / physical devices | Run named screen-reader, native 400% zoom and real-device checks on the reviewed candidate. Automated checks do not stand in for them. |
| WebKit / actual hosting / external service availability | Not established by this PR's CI plan. Run applicable release-browser/host checks before release. No infrastructure is modified. |

## Owner inputs

- Approved real nail photographs, captions/technique context, credit/rights and metadata/privacy records.
- A dedicated public professional contact, if desired; the current public-profile fallback remains truthful.
- Distinct stories with Nari/participant/privacy approval; otherwise keep the shared clip album explicit.
- Actual resource selections with Nari's context, relationship disclosures and review dates.
- Final public wording/canon, artwork adoption, existing rights/attribution and release decisions.

None of these inputs is inferred from repository visibility or an existing painting. Existing readiness/approval records remain unresolved.

## Rollback

Close the unmerged draft to leave Main unchanged. After a separately authorized merge, normally revert the refinement commits; retain source masters and previous-good static artifacts. Reverting lifecycle restores eager post-idle graphics loading. No data migration or dependency rollback is needed.
