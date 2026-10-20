# Governance and Decision Log

## 2026-10-07 — Main-preserving refinement

Jake's attached brief explicitly selects the current Main design, directs a new branch from Main and a separate review PR, and requests targeted density/composition changes plus supplied-model-preserving artwork. All routes and Astro architecture remain. Minimalist PRs #31/#32 remain separate experiments. [Document 44](44_MAIN_REFINEMENT.md) records the audit, implementation and evidence; ASSET-2026-022 records generated derivatives, prompts and unresolved approvals. Review/Netlify-preview authorization does not authorize merge or production release or settle Nari's final likeness, model artist, derivative, credit, canon, contact or rights decisions.

## 2026-09-12 — Haven depth and explicit release gate

Jake directed implementation of the Phase Two handoff except Media Kit. Authorized scope is production-readiness data/tooling, archive-capable Credits with contextual access, a local-only Haven Passport, a few cross-room continuity details, rendered QA and synchronized documentation on a branch based on open PR #22. Full Nari content replacement remains deferred. This authority does not approve public artwork/derivative/franchise rights, Nari wording/canon, contact information, Discord, host/domain, merge, deployment or release; the new gate must preserve those blockers rather than marking them complete.

**Status:** `ACCEPTED` for implementation and review on `kiva/haven-depth-release-readiness`.

## 2026-09-09 — main-branch documentation and security reconciliation

Jake requested README and necessary documentation updates against current main, including known bugs and security/exploit status. Baseline: `fa83954f09938a864fd53f6a26739e50e2277970`, merged PR #18 including crop commit `45501ea`. Earlier ACTIVE/open/stacked entries below preserve the authority at the time of implementation; those branch descriptions are superseded by this observed merged baseline.

This documentation-only review records passing automated checks, four affected development packages from npm audit, zero production dependency advisories, and unresolved manual/host/approval work. It does not apply dependency fixes, claim a zero-day, grant rights, approve release, merge, or deploy. See documents 17 and 36. Rollback is a normal revert of the documentation commit.

## 2026-09-09 — Nari-centered image framing

Jake explicitly requested shifting the Home painting left and making Nari the focal point throughout character-led imagery. Authorized CSS crop refinement of the existing supplied-model-derived review paintings, with image-specific phone/desktop focal positions and preserved copy readability. No regenerated art, source modification, new asset rights, merge, or deployment is included.

## 2026-09-09 — shared journey polish and desktop parity

Jake explicitly requested a general polish of the recent mobile work and extension of the guided room path to desktop. This supersedes the previous phone-only scope for `RoomPassage.vue`: the same nine-room journey may appear on tablet and desktop with a compact horizontal composition. The implementation also cleans up mobile directory feedback, safe-area spacing, and menu state when crossing into desktop navigation. Existing room artwork, route order, MPA anchors, hidden-room exclusion, and product/release boundaries continue to apply. PRs #16 and #17 were observed merged before this branch began.

**Status:** `ACCEPTED` for implementation and review on `kiva/journey-polish-desktop`.

## 2026-09-09 — connected mobile journey

Jake clarified that improved responsive layout is not sufficient by itself: the phone site should feel like one experience. PR #17 may connect the existing ordinary rooms with chapter-ordered, direct-document previous/next navigation; reuse the approved room notes in the expanded directory; and add restrained progressive cross-document transitions with a reduced-motion equivalent. This does not authorize new routes, lore, assets, external destinations, hidden-room promotion, desktop recomposition, merge, deployment, or release.

**Status:** `ACTIVE`

## 2026-09-09 — mobile readability and focus continuation

After PR #16 merged, Jake authorized a focused continuation pass from the new `main` head. The follow-up may improve mobile control readability, touch sizing, current-room wayfinding, and keyboard containment without replacing the approved route silhouettes. It does not authorize new routes/content/assets, desktop redesign, deployment, production release, or changes to rights and approval blockers.

**Status:** `ACTIVE`

## 2026-09-09 — distinct mobile room compositions

Jake supplied the mobile-overhaul continuation brief and authorized implementation and review evidence on PR #16. The phone layer may replace the repeated caption-card treatment with route-specific silhouettes, simplify the mobile directory, expose text labels beside Home social icons, preserve direct Resources shelves, update behavior contracts, and synchronize current documentation. This does not authorize merging PR #16, deployment, public release, new canon/content, new asset rights, or a change in the existing release blockers.

**Status:** `ACTIVE`

## 2026-09-08 — experience refinement stacked on Haven doorway

Jake supplied the experience-refinement execution brief and authorized one integrated implementation and review PR. The work may strengthen route-owned composition, fix keyboard continuity, improve build-budget reporting, and synchronize current operational documentation. It does not authorize merging PR #12, merging the stacked PR, deployment, release, new canon/content, asset deletion, or a change in rights posture. The repository's current public visibility is recorded as operational fact, not as publication approval.

**Status:** `ACTIVE`

## 2026-09-07 — one integrated visual implementation

Owner requested an immediate full UI refinement instead of phased handoffs. Implemented route-specific post-hero compositions within the existing Vue/MPA/SCSS architecture, incorporating PR #10 maintenance. This authorizes implementation and review delivery, not a new canon, asset-rights approval, merge, or public release. See [scope and evidence](34_DISTINCTIVE_UI_REFINEMENT.md).

**Status:** `ACTIVE`  
**Owns:** Authority, approvals, durable architecture/product decisions, content expiry, conflict and change control  
**Update trigger:** A decision is proposed/accepted/reversed, authority changes, or approval/expiry policy changes

## Authority ladder

When evidence conflicts:

1. Nari's explicit current recorded approval.
2. `00_PROJECT_SOURCE_OF_TRUTH.md`.
3. Rights-cleared canonical asset/content record.
4. Accepted decision in this log.
5. Relevant specialist documentation.
6. Current implementation.
7. Mockups, old packets, public references, generated placeholders, and assumptions.

Jake owns final product/repository direction. Nari owns her public identity, canon, personal meaning, approved public content, and permission decisions that are hers to grant. Artists/rights holders retain authority over the uses they control. Technical maintainers may choose implementation details only inside those approved boundaries.

## Approval matrix

| Decision/content | Required authority | Technical reviewer | Evidence location |
|---|---|---|---|
| Identity/canon/voice | Nari + Jake for product integration | Implementer | Content approval record + this log |
| Character/emote/logo art use | Rights holder/owner + Nari/Jake placement approval | Asset implementer | Asset intake record |
| Heritage wording/art | Nari + relevant rights holder | Content/asset implementer | Approval + asset record |
| Nail work/education | Nari + photographer/rights holder as applicable | Content/privacy reviewer | Content + asset records |
| Community story/media | Nari + participant/rights permissions | Privacy/moderation reviewer | Content/asset records |
| Metrics/partnerships/contact | Nari or delegated business owner | Content reviewer | Source snapshot/approval |
| Architecture/dependencies | Jake/technical owner | Implementer/reviewer | ADR in this log |
| Accessibility/performance budget exception | Jake/product owner | Implementer with evidence | Decision + release record |
| Hosting/domain/release | Jake/account owner | Technical operator | Deployment/release record |
| Legal/license/analytics policy | Owner; counsel where appropriate | Technical operator | Decision/reference, not private contract |

Do not commit private contracts, private messages, credentials, or legal identities as evidence. Record a safe owner-controlled reference.

## Decision states

| State | Meaning |
|---|---|
| `PROPOSED` | Under review; must not be treated as product truth |
| `ACCEPTED` | Active decision and implementation constraint |
| `SUPERSEDED` | Replaced by a named newer decision |
| `REJECTED` | Considered and deliberately not chosen |
| `DEFERRED` | Valid question without current need/input |

Use `templates/DECISION_RECORD.md` for substantial new decisions, then summarize the accepted result here.

## Accepted decisions

### ADR-010 — Public-safe creative credit registry

**State:** `ACCEPTED` for implementation; contributor verification and publication rights remain `PENDING`/`BLOCKED` per family
**Date:** 2026-09-12
**Decision:** Add `/credits/` as a secondary real document and keep public attribution in one validated local registry. Track credit status, family publication state and artwork-display approval separately. Known pending/blocked dispositions are valid; an unclassified meaningful family is not.
**Reason:** Makes missing attribution visible and maintainable without overloading delivery metadata or publishing private evidence.
**Consequences:** New meaningful art families require a registry disposition and asset record where applicable. Blocked records cannot render; artwork cannot appear on Credits without explicit display clearance.
**Revisit when:** A contributor confirms public wording/link, a family gains or loses permission, or the project adopts a private rights-management system.

### ADR-001 — True Vite MPA with shared Vue Router runtime

**State:** `ACCEPTED`  
**Date:** 2026-08-13  
**Decision:** Build eleven real HTML entries with ordinary document navigation. Each mounts the shared Vue app; Router resolves the initial path and lazy page module.  
**Reason:** Preserves route-specific documents/metadata/direct loading while satisfying the Vue Router requirement and avoiding duplicated application structure.  
**Consequences:** Entry, Router, validator, test, metadata, and docs registries must stay synchronized. Universal SPA rewrites are prohibited.  
**Revisit when:** Hosting cannot serve directory indexes, requirements demand subpath deployment, or a measured navigation problem justifies a reviewed alternative.

### ADR-002 — Three semantic atmospheres with pre-paint persistence

**State:** `ACCEPTED`  
**Date:** 2026-08-13  
**Decision:** Nari, Dark, and Light are one Haven at different hours, implemented through semantic CSS tokens and external pre-Vue theme boot.  
**Reason:** Provides personal choice and atmosphere without fragmenting brand/layout or flashing the wrong theme.  
**Consequences:** Theme allowlist, storage key, colors, controls, and final art need synchronized review.  
**Revisit when:** Canonical art requires a revised theme model or user research shows the control is confusing.

### ADR-003 — Static, privacy-first content delivery

**State:** `ACCEPTED`  
**Date:** 2026-08-13  
**Decision:** Use reviewed local typed content and outbound links; no runtime feeds, embeds, analytics, form, CMS, account, or backend in the foundation.  
**Reason:** Reduces tracking, failure, security, performance, cost, and maintenance while content volume/workflow is still small.  
**Consequences:** Volatile content is manually curated/reverified; new integrations require full privacy/security/ownership design.  
**Revisit when:** A real editorial/operational workflow cannot be maintained with local records.

### ADR-004 — Honest placeholders instead of fabricated production content

**State:** `ACCEPTED`  
**Date:** 2026-08-13  
**Decision:** Use original, visibly noncanonical environment/Ghostie placeholders and honest holds; never copy public creator assets or generate fake nail work/lore/metrics.  
**Reason:** The site can establish architecture/world without misrepresenting Nari or violating rights.  
**Consequences:** Public launch remains blocked until placeholders are replaced or explicitly adopted with rights/credit approval.  
**Revisit when:** Canonical assets/content arrive.

### ADR-005 — Discord is progressive narrative, not a global conversion

**State:** `ACCEPTED`  
**Date:** 2026-08-13  
**Decision:** Reveal Discord after community values through the Haven door; do not repeat it as a global primary CTA.  
**Reason:** The Haven represents behavior and belonging, not merely a server invite.  
**Consequences:** Invite failure needs a safe state; interaction must retain keyboard/touch/reduced-motion parity.  
**Revisit when:** Nari changes community onboarding or Discord ceases to be the destination.

### ADR-006 — Support never buys access or ownership

**State:** `ACCEPTED`  
**Date:** 2026-08-13  
**Decision:** Free support and presence precede financial methods; financial support grants no access, obligation, ownership, or claim on time/boundaries.  
**Reason:** Protects Nari and community dignity and avoids manipulative monetization.  
**Consequences:** No urgency, ranking, intimacy tier, or dominant donation UI.  
**Revisit when:** Support methods change; core boundary remains unless Nari/Jake explicitly revise it.

### ADR-007 — Hidden room is accessible, original, and non-private

**State:** `ACCEPTED`  
**Date:** 2026-08-13  
**Decision:** Keep an optional hidden joke route found through a visible-button floorboard sequence, with visible exit, noindex, and no franchise assets/private information.  
**Reason:** Rewards curiosity without making a required task inaccessible or creating copyright/privacy risk.  
**Consequences:** Obscurity is not security; `P` shortcut remains optional.  
**Revisit when:** The joke no longer fits Nari or introduces maintenance/rights cost.

### ADR-008 — Owner-authorized model-anchored storybook reillustration

**State:** `ACCEPTED_FOR_PRIVATE_REVIEW`; public-release derivative/model rights `BLOCKED`

**Date:** 2026-08-23

**Decision owner:** Repository/product owner Jake; Nari retains final public identity and likeness approval.

**Decision:** Preserve the supplied original Nari model, supplied cozy illustration, official static emotes, and all 27 original Prinny designs. At the owner's explicit subsequent direction, create an identity-preserving storybook Nari reillustration and bespoke character-led environments using the supplied real `Model_File.png` as reference. Never derive identity from public imagery, guess a replacement model, redraw Prinnies, invent character canon, or present generated nail paintings as real work.

**Identity invariants:** Warm tan adult complexion, emerald eyes, long chocolate hair with blunt bangs and purple-gradient tips, asymmetric floppy dark dog ear and pointed cat ear with white tuft, fluffy brown-to-purple tail, off-shoulder lavender sheer-sleeve top, tightly laced black corset, layered lavender/black skirt, distressed black thigh-highs, chunky black boots, delicate sun/moon jewelry, subtle shoulder tattoo, and caring protective big-sister expression.

**Reason:** The previous actual-model-over-generic-room execution did not meet the owner's visual direction; integrated model-faithful painting gives Nari an individual creative world without discarding her identity.

**Consequences:** Identify derivatives honestly; retain original artwork and official emotes; record generated prompts and provenance; leave artist, model derivative, publication, credit, franchise, and final Nari approvals open. This supersedes the previous blanket private-review no-reillustration constraint only for explicitly model-anchored owner-requested work; public-reference generation remains forbidden.
**Revisit when:** Nari accepts/rejects the portrayal, an original artist restricts derivatives, public rights are resolved, or the canonical model changes.

### ADR-009 — Centralized multi-page HTML document root

**State:** `ACCEPTED`  
**Date:** 2026-08-25  
**Decision:** Keep all eleven real HTML entries inside the repository-level `pages/` directory and configure Vite to use that directory as its document root. Keep Vue page components in `src/pages/`, public assets in `public/`, and production output in `dist/`.  
**Reason:** Removes route-only folders from the repository root and makes the client handoff easier to understand without discarding the true MPA or adding a routing workaround.  
**Consequences:** Public URLs, direct document loading, per-page metadata, Vue entry, static-host output, and the hidden room remain unchanged. Route additions and document-reading tests must use the `pages/` source location.  
**Revisit when:** A future Vite/hosting requirement cannot support a separate document root without compromising the existing route contract.

## Open decisions

| ID | Question | State | Blocks | Safe default |
|---|---|---|---|---|
| DEC-001 | How do CatDog and Grim Reaper identities connect? | `PROPOSED`/awaiting Nari | Canonical identity launch | Neutral big-sister wording |
| DEC-002 | Which character/Ghostie/logo assets are current and website-cleared? | `DEFERRED` pending assets/rights | Canonical visual launch | Labelled original placeholders |
| DEC-003 | What nail sets/guides launch first? | `DEFERRED` pending content | Flagship Nail Studio | Honest gallery hold |
| DEC-004 | Which Discord code is canonical and maintained? | `DEFERRED` pending release | Community action | Reverify candidate or hide |
| DEC-005 | What is the public business contact/media kit? | `DEFERRED` | Formal inquiry | Linktree/X only; no promise |
| DEC-006 | Which resources, affiliations, support methods, stories, and schedule workflow are approved? | `DEFERRED` | Optional content systems | Curating/no-schedule states |
| DEC-007 | Which host/domain and redirect/header/cache strategy? | `DEFERRED` | Production deployment | Portable artifact only |
| DEC-008 | What license/legal/analytics policy applies? | `DEFERRED` | Production operations | All rights reserved; collect nothing |

## Content review and expiry

| Content | Review trigger |
|---|---|
| Social/platform link | Before every release and on reported failure |
| Discord invite | Immediately before release and after community changes |
| Schedule/event | On every change; expire automatically after event window |
| Metric | New measurement window; never roll forward old value silently |
| Partnership/campaign | At campaign end or term/status change |
| Product/resource/price | On review date, relationship change, or product/version change |
| Character/model art | Model/branding update or rights-term change |
| Community story/media | Participant request, moderation concern, or privacy context change |
| Safety/technical education | Source/guidance change or planned review date |

Retire stale content rather than hiding its age through vague copy.

## Conflict procedure

1. Identify the exact conflicting statements/files.
2. Determine their authority and dates.
3. Preserve the safer public state while resolving the conflict.
4. Ask the correct authority one focused question.
5. Record the approved answer and evidence reference.
6. Update source of truth, specialist docs, code/data, tests, and release status together.
7. Mark the old decision/content superseded or retired; do not silently rewrite history.

## Decision quality test

A durable decision record explains:

- problem and current evidence;
- decision and authority;
- alternatives meaningfully considered;
- product/technical/rights/privacy/accessibility consequences;
- implementation owners/files;
- verification and rollback;
- conditions that would justify revisiting it.

It must not include private credentials, contracts, or irrelevant conversation transcripts.

## Governance completion

The project is governed well when a future builder can answer:

- What is locked, and by whom?
- What is implemented versus merely desired?
- Which assets/claims are permitted and current?
- What is blocked, and what exact evidence closes it?
- Why does the architecture look this way?
- How does a decision change safely?
- Who rechecks volatile content?
- How is a release proven and rolled back?

If those answers exist only in someone's memory, the system is not finished.

## 2026-09-05 authorized performance implementation

Jake requested application of the attached performance review to existing PR #9. This authorizes resizing/compression and delivery changes to the retained artwork within the existing private-review scope. Implemented responsive hashed copies, matching route preloads, deferred doorway loading, immutable caching only for new content-addressed paths, automated byte budgets, and guarded stale-chunk recovery. No visual redesign, source destruction, dependency migration, budget exception, new identity/content/rights approval, merge, or production release. See `33_RESPONSIVE_ARTWORK_PERFORMANCE.md`; all unresolved client/public-release approvals retain their previous state.

## 2026-09-10 owner review refinements

Jake requested a new review PR from main: loosen Meet Nari mobile copy; remove the Haven charter's lower protrusion and doorway lattice; make the optional floorboard reveal more tactile; remove Resources client samples; replace the Work margin SVG with painted artwork; remove Story Time's left stripe at every width. This authorizes the focused implementation and PR, not merge or production deployment. Existing work-correspondence artwork is reused; no new canonical art or public claims are adopted.

Validation: clean `npm ci` and `npm run check` passed locally on Node 24.19.0: lint, typecheck, 68 tests in 14 files, build/asset/performance validators, and 11 served HTML documents with 137 essential assets and 27 supplied Prinny designs. Browser visual/keyboard/reduced-motion verification remains pending: Chromium was absent and its download timed out. Inspect 320/390/768/wide, floorboard open/close, and the five changed pages in the PR preview.

Rollback: revert the focused refinement commit. Existing source artwork and historical demo fixture remain retained.

## 2026-09-11 preservation-first size and maintenance pass

Jake supplied the repository optimization handoff and directed continuation. Scope: compact browser artwork metadata with retained full provenance; remove proven obsolete cult styles; consolidate only adjacent identical-selector blocks with ordered-declaration equivalence; explanatory comments across owned code; syntax-safe ownership for generated/strict data and vectors; operational documentation and review PR. Reduced-motion fragment handling and dormant widget/listener defects identified in the handoff are corrected separately from byte savings.

No public content, raster bytes, crop, source/retention contract, architecture, dependency version, client/right approval, merge or deployment is changed. Chromium installation failed, so lossy encoding and broader active-cascade restructuring remain deferred. Structural comparison and automated gate evidence, exact metrics and rollback are in [document 37](37_SIZE_MAINTENANCE.md). This records implementation authority, not release clearance.

### ADR-011 — Static Astro documents with focused Vue islands

**Date:** 2026-10-03. **Status:** accepted for the owner-requested implementation/review. **Authority:** Jake explicitly requested a ground-up Astro rebuild preserving the website, with Vue reuse as needed. This supersedes ADR-001 and ADR-009’s Vite/client-router implementation choices.

Astro owns all twelve native page templates, the shared document shell, metadata and responsive preloads. Existing Vue art primitives render at build time; the menu, Passport, doorway, floorboard and media fallbacks hydrate explicitly. There is no client router, empty app mount or second framework scaffold. Next/Nuxt would duplicate routing; Three.js would add an unused graphics runtime. All retained artwork, copy, external destinations, route paths and review/release boundaries remain.

Consequences: meaningful initial HTML and no-JavaScript navigation; independent component state; CSP hashes for Astro’s inline island loaders; browser failure checks covering early SSR-thumbnail errors. New MIT tooling: Astro, official Vue integration/checker and compatible Astro lint plugin. Playwright is development-only browser verification. The old app bootstrap, router and mount-specific chunk recovery are retired. Vite remains in the test toolchain.

Current source owners, tests, dependency impact, limitations and recorded checks are in [document 42](42_ASTRO_REBUILD.md). Rollback: revert this focused migration or restore the baseline’s build artifact. This records implementation authority; it does not merge or release the build or settle client/artwork approvals.


### ADR-012 — NariNuna vNext experience

**Date:** 2026-10-05. **Status:** accepted for owner-requested implementation and review. Jake's attached handoff explicitly authorizes substantial recomposition on the Astro PR #24 foundation, clean retirement of the bottom guided tour and related progress presentation, CSS/GSAP/ScrollTrigger and selective deferred Three.js, new browser/accessibility coverage and a new review PR. This supersedes the dated tour/Passport, Motion-V and no-WebGL/no-parallax rules for this bounded experience layer.

Astro still owns all static content and native documents; Vue owns actual interaction. One RoomArrival/material object replaces the overlapping hero cascade. Room descriptions and natural navigation remain; passage, Passport and visit storage are removed. Graphics are local procedural atmosphere only on Home/Haven, with capability gating, pause/resume, preference/visibility disposal and static fallback. Keep the 120 KB initial gzip gate and add a separate 180 KB deferred enhancement graph gate with accurate module parsing. This explicitly authorized optional transfer is disclosed; it is not hidden by the initial metric. No backend, CMS, new external integration, canon, asset-rights decision, merge or production release is authorized. Native document transitions were evaluated and retired after rapid history navigation reproduced browser-level abort errors; ordinary navigation stays immediate.

New dependencies: GSAP (distributed Standard License), Three.js (MIT), development-only Three types, Playwright Test and axe. Motion-V is removed. Content Collections were considered and deferred because current approved records already have typed/permission validation and new editorial entries are unavailable. Source owners, evidence, limits and rollback are in document 43. Revert this experience commit to restore the PR #24 composition and tour; source artwork is untouched.
