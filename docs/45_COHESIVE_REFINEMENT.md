# Cohesive Haven refinement — 20 October 2026

## Scope and source

Jake's implementation handoff authorizes a feature branch and one review PR targeting fresh Main, preserving the current Haven. Branch `kiva/haven-cohesive-refinement`, PR #36, starts from `cadc39162dac9f5d32d4c27b4b5dcb2f47118010`. No open PRs were returned at inspection. Main's existing [quality run](https://github.com/PocketKrow/NariNuna/actions/runs/39360949974) was successful; that remains baseline evidence.

The local execution tool returned **“No usable execution environment is available.”** Therefore builds, rendered regressions, paired screenshots and network comparisons use GitHub Actions. Source inspection alone does not establish visual quality. No font, illustration, crop, navigation ranking, dependency or release approval is changed.

## Implemented owners

| Problem | Change and owner |
| --- | --- |
| Lavender album-title hover on parchment | `MediaCard.vue` selects normal/interactive heading tokens per presentation, with the same readable treatment on keyboard focus. Album cards opt into the paper surface. |
| Mint focus on paper, confirmed by paired computed-style evidence | `_tokens.scss` defines dark/paper focus and interaction colors; `_base.scss` owns `data-surface="paper"` and shared outline geometry. Album, practice notes and collaboration letter declare paper. Mobile paper introductions set the same focus token in `objects/arrival.scss`. The Work-only focus override is removed. |
| Home skips community values | Home's primary action says “Explore the Haven” and links to `/haven/`. Existing `#haven-door` fragments, charter order, three knocks, native invitation fallback and focus/reset behavior remain. |
| Duplicate clips promoted as a different archive | Streams names the same-clips album; Story Time explicitly describes its shared selection. The charter discovery makes the same distinction. No story or anecdote is invented. |
| Empty resource shelf suggested as an existing guide | Nail Studio's link says the shelf is still curating; its discovery is a bookmark for that shelf, not a guide. Stable resource fragments remain. |
| Haven downloads graphics while visitors read the arrival | `lifecycle.ts` observes atmosphere canvases with 300px proximity before probing shaders or importing Three. One import promise serves eligible canvases per generation. Observers disconnect on preference/layout changes and page exit; stale async work cannot mount. Existing renderer visibility, pause/resume, disposal and BFCache handling remain. Without observation support, artwork stays static. |
| Nail Studio repeats the same painting before the real-work hold | Keep the arrival painting once; place the honest real-photo hold at the start of the workbench alongside concise practice/curating notes. Retain all artwork assets and attribution access in the arrival. |
| Resources over-explains empty shelves | Three compact curating shelves retain their IDs and descriptions; remove repeated illustrations/example lists and place the discovery beside the library index rather than in a separate grid row. No recommendations are invented. |
| Stale style comments / duplicate adjacent rule | Correct retired face-safe/Vue-page ownership comments and merge the adjacent header-link declarations. No global layer reordering or broad cascade rewrite. |

The door and floorboard retain `client:load`: prompt keyboard operation, fragment entry, focus and failure fallbacks take priority over speculative hydration savings. Media recovery also remains immediate. Shared motion remains deferred after load/idle; only eligible, nearby artwork requests the graphics graph.

## Evidence workflow

The test-only first commit (`38d4709`) ran against the unchanged implementation. [Baseline regression run](https://github.com/PocketKrow/NariNuna/actions/runs/39479040980) reproduced nine failures: album-title hover at both 390/1440px measured **1.7464:1**, Home skipped to the doorway at six widths, and Haven requested `atmosphere.GT4b4-Og.js` before the doorway. The other 33 browser cases passed, including the two paper-link color checks. Those initial coarse color assertions were insufficient: paired computed-style evidence subsequently confirmed mint paper outlines at **1.2857:1** on album/Nail Studio, with Work already dark. Final regressions resolve CSS colors through browser-painted pixels and require an opaque, painted 3px outline. The baseline passed clean installation, both zero-vulnerability audits, lint/types/build, all 106 tests in 23 files, HTTP checks, the twelve-route Chromium smoke and the production-origin build.

- `browser-tests/refinement.spec.ts` measures computed album hover/focus colors and paper outlines, the values-first Home journey at 320/390/430/768/1440/1920px, pre-door network exclusion, fragment entry and failed graphics import.
- Existing `verify:browser` still covers all twelve routes, mobile menu/Escape/resize, three knocks/reset, no-JS and image failures. Existing experience cases cover axe, preferences, graphics failures, history, reflow and eight accepted composition baselines. Only the two Nail Studio baselines are updated after direct inspection of the old phone baseline and new phone/desktop renders; the other six baselines remain unchanged.
- A PR-only `refinement-review` job builds the candidate and exact PR base on the same runner. Explicit review tests capture eight pages at 390/1440px using the real font stack and failed-remote-thumbnail fallback, and record requested local JS/CSS gzip sizes before/after reaching the door.
- `scripts/browser-preview.mjs` accepts an optional local `NARI_PREVIEW_ROOT` for the paired review; default behavior remains `dist`. Both artifacts use the same preview server, browser, fonts, viewport and measurement method.
- The `haven-refinement-review` artifact contains explicitly saved `base/` and `candidate/` screenshots plus JSON reports. These are review material, not visually approved baselines.
- The review job also runs Firefox behavior/accessibility. CI's existing quality and production-origin jobs retain all audits, budget, CSP, metadata, artwork and HTTP checks.

Requested-file gzip is computed from files the browser requested, excluding images. It is **not** actual compressed HTTP transfer, production timing, LCP, CLS or field Core Web Vitals. The measured checkpoint below records the observed values and exact source commit.

## Observed measurement checkpoint

[Run 39481778577](https://github.com/PocketKrow/NariNuna/actions/runs/39481778577) exercised code commit `f5369144eff99bbbe9ae04d8a99d7e2221fc06a2` against base `cadc391` on Ubuntu, Node 22.23.3 and managed Playwright browsers. It passed `npm ci`, both zero-vulnerability audits, the 106 repository tests, build/HTTP/asset/CSP/metadata/budget checks, twelve-route Chromium smoke, the test-origin production build, all eight explicit base/candidate review cases, and Firefox with **33 passed / 19 deliberate exclusions**. Chromium experience had **47 passed / 4 explicit review-only skips / one Haven phone snapshot wrap difference**. The follow-up restores an appropriately descriptive two-line saved-clip label rather than replacing that baseline. Read the final PR checks for the subsequent commit's result.

| Comparable Haven observation | Base | Candidate |
| --- | ---: | ---: |
| Arrival-only requested JS/CSS, sum of per-file gzip bytes | 241,656 | 111,225 |
| Same visit after approaching the doorway | 241,656 | 241,852 |
| Atmosphere state before doorway | active | static |
| Home initial build graph, KB gzip | 57.93 | 58.12 |
| Haven initial build graph, KB gzip | 68.70 | 68.90 |
| Complete optional graph, KB gzip | 174.85 | 174.85 |

The arrival-only reduction is **130,431 bytes / 53.97%** under the same 1440×900 desktop conditions, with eight cores and no reduced motion. Full optional behavior remains available; build/runtime budgets are unchanged. [Recorded network and interaction observations](../evidence/2026-10-20-cohesive-refinement/measurements.json) preserve exact requested files and computed styles.

Paired computed styles produce album-hover contrast **1.7464 → 8.0960:1** and paper-focus contrast **1.2857 → 13.5953:1**, keeping a solid 3px outline. Work's existing dark focus was retained through the shared paper contract. Nail Studio's normalized phone composition is **2811 → 2365px** tall at 390px width (446px / 15.87% shorter); the painting is shown once and the real-work hold precedes notes.

The reviewer inspected the retained Nail phone baseline plus fresh Nail phone/desktop production and normalized renders, Work phone rendering, and both base/candidate Resources desktop renders. The paired job captured Home, Meet, Streams, Nail Studio, Haven, Resources, Work and Stories at 390/1440px with the real stack; screenshot generation is not a claim that every page/state received manual visual approval.

The first evidence upload found no persisted files despite successful captures. Explicit independent `review-evidence/base/` and `candidate/` files now back the final upload, separate from disposable test attachments. Temporary inline-image/PNG logging has been removed. No production artifact, source master or private evidence is committed.

## Deliberately pending

| Handoff area | Reason and executable next step |
| --- | --- |
| Nail workbench/gallery review | Inspected the retained 390px baseline and new 390/1440px production-font and normalized CI renders. The duplicate illustration is removed and the honest hold now precedes/joins concise notes. Update only the two Nail Studio baselines after that inspection. |
| Broader Meet Nari / Work / tablet composition | Inspected Work at 390px and kept its existing letter/brief structure. Resources at 1440px showed repeated shelf illustrations/examples and an isolated second grid row: remove those empty-shelf decorations and move discovery beside the index, preserving fragments/policy. Inspected both base/candidate 1440px renders: the shorter shelf composition preserves the library identity and puts the discovery beside the index. Broader art-direction changes remain outside this bounded pass. |
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
