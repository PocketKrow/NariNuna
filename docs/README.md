# Nari Nuna's Haven — Documentation Hub

Current implementation: [43 — vNext experience, authority, source owners, validation and rollback](43_VNEXT_EXPERIENCE.md). Older tour/Passport and hero-cascade descriptions are superseded.


> **2026-10-03 Astro migration:** Jake explicitly requested the rebuild in Astro. ADR-011 and [42 — Astro rebuild](42_ASTRO_REBUILD.md) own the current route, shell, dependency, validation and rollback contracts. Vite-MPA/client-router paths below are dated history. Product content, imagery, privacy and release approval boundaries still apply.

This directory owns the product contracts, engineering guidance, and release evidence. Start with the current audit; dated implementation logs preserve history rather than defining today's branch status.

**Repository:** public `SomberKrow/NariNuna`
**Implementation baseline:** `main` at `d1b495cd8aa0be5aaaa8a9255e2bc756d9b5491e`, 11 September 2026; Credits/copy review evidence dated 12 September
**Merged baseline:** through PR #21; Credits and copy humanization are on a separate review branch
**Current status:** client review; production approvals and manual QA remain pending
**Security:** four affected development packages; zero production dependency advisories in this audit. See [document 36](36_MAIN_SECURITY_AND_KNOWN_ISSUES.md).

Current maintenance: [37 — size and validation](37_SIZE_MAINTENANCE.md), [38 — code ownership](38_CODE_OWNERSHIP.md), [39 — asset disposition](39_ASSET_DISPOSITION.md), [40 — credits and copy humanization](40_CREDITS_AND_COPY_HUMANIZATION.md), [41 — Haven depth and release readiness](41_HAVEN_DEPTH_AND_RELEASE_READINESS.md).

## Start here

Choose the path that matches the work. Do not read every file blindly and hope the important constraint sticks.

### Product or creative direction

1. [`00_PROJECT_SOURCE_OF_TRUTH.md`](00_PROJECT_SOURCE_OF_TRUTH.md)
2. [`17_CURRENT_STATE_AUDIT.md`](17_CURRENT_STATE_AUDIT.md)
3. [`01_BRAND_WORLD_AND_ART_DIRECTION.md`](01_BRAND_WORLD_AND_ART_DIRECTION.md)
4. [`02_INFORMATION_ARCHITECTURE_AND_USER_JOURNEYS.md`](02_INFORMATION_ARCHITECTURE_AND_USER_JOURNEYS.md)
5. [`03_PAGE_BY_PAGE_EXPERIENCE_SPEC.md`](03_PAGE_BY_PAGE_EXPERIENCE_SPEC.md)
6. [`05_CONTENT_STRATEGY_AND_COPY_GUIDE.md`](05_CONTENT_STRATEGY_AND_COPY_GUIDE.md)
7. [`20_CONTENT_INVENTORY.md`](20_CONTENT_INVENTORY.md)

### UI, component, or motion work

1. [`00_PROJECT_SOURCE_OF_TRUTH.md`](00_PROJECT_SOURCE_OF_TRUTH.md)
2. [`04_DESIGN_SYSTEM_AND_COMPONENT_LANGUAGE.md`](04_DESIGN_SYSTEM_AND_COMPONENT_LANGUAGE.md)
3. [`09_INTERACTION_AND_MOTION_SPEC.md`](09_INTERACTION_AND_MOTION_SPEC.md)
4. [`10_ACCESSIBILITY_PERFORMANCE_PRIVACY_SECURITY.md`](10_ACCESSIBILITY_PERFORMANCE_PRIVACY_SECURITY.md)
5. [`19_DESIGN_REVIEW_RUBRIC.md`](19_DESIGN_REVIEW_RUBRIC.md)
6. The affected page contract in [`03_PAGE_BY_PAGE_EXPERIENCE_SPEC.md`](03_PAGE_BY_PAGE_EXPERIENCE_SPEC.md)

### Asset, illustration, photography, or emote work

1. [`00_PROJECT_SOURCE_OF_TRUTH.md`](00_PROJECT_SOURCE_OF_TRUTH.md)
2. [`06_ASSET_MANIFEST_AND_ART_PIPELINE.md`](06_ASSET_MANIFEST_AND_ART_PIPELINE.md)
3. [`01_BRAND_WORLD_AND_ART_DIRECTION.md`](01_BRAND_WORLD_AND_ART_DIRECTION.md)
4. [`templates/ASSET_INTAKE_RECORD.md`](templates/ASSET_INTAKE_RECORD.md)
5. [`23_AUTHENTIC_ARTWORK_IMPLEMENTATION.md`](23_AUTHENTIC_ARTWORK_IMPLEMENTATION.md)
6. [`24_STORYBOOK_ART_DIRECTION_AND_PROMPTS.md`](24_STORYBOOK_ART_DIRECTION_AND_PROMPTS.md)
7. The destination page contract in [`03_PAGE_BY_PAGE_EXPERIENCE_SPEC.md`](03_PAGE_BY_PAGE_EXPERIENCE_SPEC.md)

### Architecture, routing, or data work

1. [`00_PROJECT_SOURCE_OF_TRUTH.md`](00_PROJECT_SOURCE_OF_TRUTH.md)
2. [`17_CURRENT_STATE_AUDIT.md`](17_CURRENT_STATE_AUDIT.md)
3. [`07_TECHNICAL_ARCHITECTURE.md`](07_TECHNICAL_ARCHITECTURE.md)
4. [`18_CODE_STANDARDS.md`](18_CODE_STANDARDS.md)
5. [`08_CONTENT_DATA_SCHEMAS.md`](08_CONTENT_DATA_SCHEMAS.md)
6. [`14_REPOSITORY_OPERATIONS.md`](14_REPOSITORY_OPERATIONS.md)
7. [`12_QA_ACCEPTANCE_CRITERIA.md`](12_QA_ACCEPTANCE_CRITERIA.md)

### Release or deployment work

1. [`13_HANDOFF_TO_SOL_HIGH.md`](13_HANDOFF_TO_SOL_HIGH.md)
2. [`12_QA_ACCEPTANCE_CRITERIA.md`](12_QA_ACCEPTANCE_CRITERIA.md)
3. [`15_DEPLOYMENT_AND_RELEASE_RUNBOOK.md`](15_DEPLOYMENT_AND_RELEASE_RUNBOOK.md)
4. [`10_ACCESSIBILITY_PERFORMANCE_PRIVACY_SECURITY.md`](10_ACCESSIBILITY_PERFORMANCE_PRIVACY_SECURITY.md)
5. [`templates/RELEASE_EVIDENCE_RECORD.md`](templates/RELEASE_EVIDENCE_RECORD.md)

### New AI implementation session

1. Root [`AGENTS.md`](../AGENTS.md)
2. [`21_AI_ASSISTED_WORKFLOW.md`](21_AI_ASSISTED_WORKFLOW.md)
3. [`00_PROJECT_SOURCE_OF_TRUTH.md`](00_PROJECT_SOURCE_OF_TRUTH.md)
4. [`17_CURRENT_STATE_AUDIT.md`](17_CURRENT_STATE_AUDIT.md)
5. [`13_HANDOFF_TO_SOL_HIGH.md`](13_HANDOFF_TO_SOL_HIGH.md)
6. The specialist path for the requested work

## Document map

| File | Owns | Update when |
|---|---|---|
| `00_PROJECT_SOURCE_OF_TRUTH` | Product thesis, locked decisions, canon, blockers, authority | A product decision or launch blocker changes |
| `01_BRAND_WORLD_AND_ART_DIRECTION` | Emotional world, visual grammar, themes, art briefs | Visual direction or canonical art changes |
| `02_INFORMATION_ARCHITECTURE_AND_USER_JOURNEYS` | Navigation, journeys, CTA hierarchy, route ownership | A route, audience, or navigation priority changes |
| `03_PAGE_BY_PAGE_EXPERIENCE_SPEC` | Per-route composition, dependencies, mobile and acceptance | A page's content order or responsibility changes |
| `04_DESIGN_SYSTEM_AND_COMPONENT_LANGUAGE` | Tokens, color values, typography, layout, components | Shared visual primitives or tokens change |
| `05_CONTENT_STRATEGY_AND_COPY_GUIDE` | Voice, claims, approvals, volatile content | Public wording or editorial rules change |
| `06_ASSET_MANIFEST_AND_ART_PIPELINE` | Asset inventory, provenance, rights, transforms, replacement | Any asset enters, changes, or leaves the project |
| `07_TECHNICAL_ARCHITECTURE` | Runtime, MPA/router design, modules, invariants, extension recipes | Architecture, dependencies, or build behavior changes |
| `08_CONTENT_DATA_SCHEMAS` | Implemented and target content contracts | A data shape or publication workflow changes |
| `09_INTERACTION_AND_MOTION_SPEC` | State machines, timing, input parity, reduced motion | Interactive behavior changes |
| `10_ACCESSIBILITY_PERFORMANCE_PRIVACY_SECURITY` | Nonfunctional budgets and threat boundaries | A budget, integration, host, or risk changes |
| `11_IMPLEMENTATION_PHASES` | Roadmap, gates, ownership, current status | Work moves between blocked, active, and complete |
| `12_QA_ACCEPTANCE_CRITERIA` | Automated/manual test matrix and release gates | Evidence changes or a new behavior ships |
| `13_HANDOFF_TO_SOL_HIGH` | Fast, exact handoff for the next implementation pass | The handoff baseline or immediate priority changes |
| `14_REPOSITORY_OPERATIONS` | Branching, reviews, dependency and docs discipline | Team workflow changes |
| `15_DEPLOYMENT_AND_RELEASE_RUNBOOK` | Host contract, deployment, verification, rollback | Provider/domain/release procedure changes |
| `16_GOVERNANCE_AND_DECISION_LOG` | Approval authority, ADRs, content expiry, change control | A durable decision or approval is recorded |
| `17_CURRENT_STATE_AUDIT` | Confirmed implementation, strengths, gaps, debt, keep/replace/decide map | A material implementation or evidence baseline changes |
| `18_CODE_STANDARDS` | TypeScript, Vue, SCSS, content, dependency, error and review conventions | Coding/tooling conventions change |
| `19_DESIGN_REVIEW_RUBRIC` | Hard failures, weighted visual/product quality threshold | Design direction or approval threshold changes |
| `20_CONTENT_INVENTORY` | Current public content locations, state, source, volatility, gaps | Public content enters, moves, changes, or retires |
| `21_AI_ASSISTED_WORKFLOW` | Agent context, evidence labels, protocol, stop and handoff rules | AI/repository workflow changes |
| `22_GLOSSARY` | Canonical project/design/engineering/status language | A durable term changes or becomes ambiguous |
| `23_AUTHENTIC_ARTWORK_IMPLEMENTATION` | Owner-supplied identity assets, private-review authority, route composition, artwork provenance, and remaining launch blockers | Real character/emote/Prinny artwork, supporting visual families, or their permission posture changes |
| `40_CREDITS_AND_COPY_HUMANIZATION` | Credits registry/page implementation, copy classification, validation evidence and unresolved rights/content | Credit architecture, public attribution, display approval or this humanization pass changes |
| `41_HAVEN_DEPTH_AND_RELEASE_READINESS` | Release gate, artwork archive, contextual credit access, Passport, discoveries and current QA evidence | Any Phase Two behavior, blocker, evidence or rollback changes |
| `24_STORYBOOK_ART_DIRECTION_AND_PROMPTS` | Owner-authorized model-anchored storybook direction, identity invariants, image prompts, visual route map, and derivative pipeline | Storybook character, environment, Ghostie, social preview, or private-review derivative authority changes |
| `28_NARI_ONLY_ATMOSPHERE_DEMO` | Reversible Phase A client-review demo, implementation boundary, and rollback contract | The Nari-only proposal, runtime, or client decision changes |
| `29_ENVIRONMENTAL_CONTINUITY` | Phase B room-material map, shared rules, and validation contract | Post-banner environmental material or section continuity changes |
| `30_PAGE_SIGNATURE_DEVICES` | Phase C one-device-per-route map and decorative-content boundary | A route's recognizable presentation device changes |
| `31_DE_CARDIFICATION_AND_RHYTHM` | Phase D noninteractive chrome and route-pacing contract | Container boundaries, radius discipline, or chapter rhythm changes |
| `32_PHASE_E_VALIDATION` | Phase E automated evidence, manual matrix status, limitations, and rollback | Final validation is rerun or preview/release evidence changes |
| `36_MAIN_SECURITY_AND_KNOWN_ISSUES` | Dated dependency advisories, known limitations, security boundaries, remediation and evidence | An advisory, issue, verification, or mitigation changes |
| `35_MOBILE_FIRST_OVERHAUL` | Phone composition, mobile navigation, Resources simplification, validation, and rollback | The narrow-width layout, menu, or Resources wayfinding changes |

## Authority and conflict resolution

When two sources disagree, use this order:

1. Nari's explicit, current, recorded approval.
2. `00_PROJECT_SOURCE_OF_TRUTH.md`.
3. A rights-cleared canonical asset/content record.
4. An accepted decision in `16_GOVERNANCE_AND_DECISION_LOG.md`.
5. The relevant specialist document in this suite.
6. Existing implementation behavior.
7. Assumptions, mockups, public references, and generated placeholders.

Implementation is evidence, not automatic product authority. Documentation is intent, not proof that code behaves that way. Both must stay synchronized.

## Status vocabulary

Use these words consistently:

| State | Meaning |
|---|---|
| `LOCKED` | Approved direction; changing it requires a recorded decision |
| `IMPLEMENTED` | Present in code at the documented snapshot |
| `VERIFIED` | Observed through a named check with dated evidence |
| `PENDING` | Known work with no external dependency |
| `BLOCKED` | Cannot truthfully finish without approval, rights, data, or infrastructure |
| `PLACEHOLDER` | Deliberately temporary and visibly noncanonical |
| `RETIRED` | No longer used; retained only when history or rollback requires it |

Never use “done,” “production-ready,” or “approved” without naming the evidence and authority.

## Change discipline

Every material pull request must answer five questions:

1. Which product or page contract authorizes this change?
2. Which files own the behavior?
3. What content, asset, privacy, or rights records changed?
4. What automated and manual evidence was observed?
5. Which documentation now describes the new truth?

Use the records under [`templates/`](templates/) instead of inventing approval formats in issue comments.

## Current release posture

The codebase now includes an owner-requested authentic-artwork review implementation using the supplied Nari model, supplied character art, official static emotes, and all 27 supplied Prinny designs. It is **not cleared for public production release**. The critical blockers are final canonical identity wording, documented artist/owner/website/franchise permissions and credits, real nail-work content, final Discord and professional contact decisions, host/domain configuration, and final manual accessibility/mobile/rights review.

Unknown is a valid state. Fabricated certainty is not.

## 2026-09-05 delivery pass

See [`33_RESPONSIVE_ARTWORK_PERFORMANCE.md`](33_RESPONSIVE_ARTWORK_PERFORMANCE.md) for responsive artwork, preloads, immutable caching, deferred doorway loading, guarded recovery, budgets, and observed evidence.
