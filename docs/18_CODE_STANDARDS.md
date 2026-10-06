> **6 October 2026 experience v2:** [Document 44](44_IMMERSIVE_HAVEN.md) owns the layered Home, new alpha assets, contextual residents, tiered touch/desktop motion, evidence and rollback. It supersedes the frozen-art/mobile-exclusion statements below; rights and release gates remain.

# Code Standards

> **2026-10-03 Astro migration:** Jake explicitly requested the rebuild in Astro. ADR-011 and [42 — Astro rebuild](42_ASTRO_REBUILD.md) own the current route, shell, dependency, validation and rollback contracts. Vite-MPA/client-router paths below are dated history. Product content, imagery, privacy and release approval boundaries still apply.

> 2026-09-07 implementation delta: [integrated visual refinement](34_DISTINCTIVE_UI_REFINEMENT.md) records current layouts, style ownership, content disclosures, and observed QA. Earlier implementation descriptions below are historical where superseded; product and release requirements remain in force.

**Status:** `ACTIVE`  
**Owns:** TypeScript, Vue, content, SCSS, browser behavior, dependencies, errors, naming, review quality  
**Update trigger:** Architecture, tooling, format/lint, state, or coding convention changes

## General engineering rules

- Inspect existing behavior and owning documentation before editing.
- Prefer the smallest coherent implementation that closes the active contract.
- Keep product content, Vue behavior, styles, assets, and records in their documented layers.
- Use semantic names tied to purpose, not accidents such as `purple-box` or `left-thing`.
- Preserve unrelated code and user changes.
- Remove dead code only after references, behavior, and rollback are understood.
- Do not commit lorem ipsum, fake data, TODO-driven shells, commented-out old implementations, or nonfunctional controls.
- Comments explain intent, constraints, or non-obvious browser behavior; they do not narrate syntax.
- Production console output should be quiet.

## TypeScript

- Keep strict TypeScript and `noEmit` checking.
- Avoid `any`, unjustified non-null assertions, and casts used only to silence errors.
- Narrow unknown data at trust boundaries.
- Use literal unions for themes, states, kinds, and content ratings.
- Prefer `satisfies` and readonly/static arrays where they preserve useful literal information.
- Keep DOM/timer/media-query types explicit and guard nullable references.
- Do not declare rich target interfaces and imply runtime validation exists.

Example for future content:

```ts
export const resources = [
  {
    id: "example-id",
    state: "draft",
    relationship: "none"
  }
] as const satisfies readonly ResourceItem[];
```

Approved production records need provenance; this structural example is not publishable content.

## Vue components

- Use `<script setup lang="ts">`.
- Define typed props and emits.
- Treat props/imported records as readonly; derive display state with computed values.
- Keep state local to the smallest owner.
- Use native links for navigation and buttons for actions.
- Use lifecycle hooks to clean listeners, observers, timers, animation contexts, and object URLs.
- Prefer owned template refs over broad document queries when component scope is available.
- Split a component when it owns meaningful behavior, reuse, state, or an accessibility contract—not to chase a line count.
- Do not make the global shell own route-specific copy.
- Do not reimplement header/footer/theme logic inside page components.

## Composables and global state

A composable has one clear browser/reactive responsibility and lifecycle-safe cleanup. If a function merely transforms a value, use a utility rather than disguising it as a composable.

Avoid:

- composables returning unrelated bags of refs;
- unreviewed module-level mutable singletons;
- a global store for page-local interactions;
- persisted state without a privacy/expiry need.

The active Nari atmosphere has no preference singleton or persistence. Haven door, menu and floorboard state remain local; the dormant reduced-motion helper owns one listener per consumer.

## Content modules

- Public strings remain UTF-8 source.
- One canonical record owns each volatile/repeated destination or item.
- Use stable IDs/slugs; labels may change without breaking identity.
- Store verification/review dates as ISO `YYYY-MM-DD`.
- Validate HTTPS and allowed origins.
- Keep content rating and publish state explicit when the family supports them.
- Never put private URLs, notes, credentials, or development-only endpoints in public data.
- Do not mutate imported content at runtime.
- Retiring content should require a record/state change, not layout surgery.

## HTML and routing

- Preserve one real HTML entry per documented route inside the repository-level `pages/` document root.
- Keep Vue page implementations in `src/pages/`; do not scatter route-entry folders across the repository root.
- Each entry owns accurate title, description, robots, viewport, theme color, icons/manifest, fixed atmosphere, and module entry.
- Primary top-level navigation uses ordinary anchors.
- Route paths are lowercase kebab-case with trailing slash, except `404.html`.
- Keep Vite entries, Router records, validator, tests, navigation, metadata, and docs synchronized.
- Do not use a universal SPA rewrite or conceal a missing document behind client fallback.

## SCSS and CSS

- Use SCSS for organization and CSS custom properties for semantic runtime tokens.
- Preserve the actual `main.scss` order: foundations → shared world/material refinements → image selection and reading rhythm → face-safe → mobile-first. Scoped room files own interior composition.
- Prefer low-specificity class selectors and shallow nesting.
- Do not style by generated Vue scope attribute, brittle DOM depth, or text content.
- Avoid `!important` except a documented accessibility/preference override.
- Prefer logical properties where clear.
- Use `clamp()` for bounded fluid behavior, not every value.
- Never rely on viewport height alone for critical mobile content.
- Keep raw colors restricted to documented art/contrast/secret exceptions.
- Tokens represent shared decisions; do not create a token for every one-off art-directed offset.

## Responsive implementation

- Start from content behavior at 320px, not named devices.
- Recompose order, crop, grid, density, and action priority.
- Add a breakpoint only when content demonstrates a failure that current thresholds cannot solve.
- Touch/keyboard functionality does not depend on hover.
- Fixed UI must survive zoom, short height, browser chrome, and safe-area review.
- Test final art at the CSS `object-position` actually shipped.

## Motion code

- CSS handles small state transitions; Motion for Vue handles isolated component transitions.
- Animate transform/opacity where possible.
- No endless `requestAnimationFrame`, particle canvas, layout animation loop, autoplay media, or scroll hijacking.
- Honor the shared reduced-motion preference at initial render and during changes.
- Clean up listeners/timers and test repeated navigation/activation.
- Motion may not gate content or delay navigation.

## Images

- Follow `06_ASSET_MANIFEST_AND_ART_PIPELINE.md` before code integration.
- Use `<picture>`/`srcset` when the layout can select meaningful sizes or art direction.
- Always set intrinsic dimensions.
- `sizes` must reflect the CSS composition.
- Eager/high-priority is reserved for the actual route LCP image.
- Decorative images use empty alt; informative art gets concise useful alt and visible credit/context.
- Broken optional imagery must not remove the title, destination, or core meaning.

## Links and errors

- External URLs are HTTPS and reviewed.
- New-tab links use `noopener noreferrer` and announce the behavior.
- A failure-capable action needs a visible failure state; do not swallow promises.
- Expired Discord/media/contact content falls back honestly.
- Unknown routes preserve a usable recovery action.
- Avoid exceptions during rapid interaction/navigation.

## Dependencies

A new dependency requires:

- documented requirement;
- evidence the platform/current stack cannot solve it cleanly;
- bundle/runtime/maintenance impact;
- license compatibility;
- privacy/security review;
- focused introduction and tests;
- removal plan for anything it replaces.

Do not add Tailwind, component kits, a second icon pack, another animation wrapper, or a state library for a handful of local needs. All `VITE_*` values are public.

## Security and data boundaries

- Never render untrusted raw HTML.
- External Markdown/CMS content requires schema validation and allowlist sanitization.
- No secret, token, webhook, private ID, or credential in client code/config.
- A form requires a real server/privacy/error/spam design.
- Hidden/noindex paths contain no private data.
- Do not log private content or approval evidence.

## Formatting

Follow existing ESLint and style conventions. Introduce an automated formatter only as a deliberate mechanical change, ideally separate from visual/content work. Avoid repository-wide whitespace churn in a focused feature PR.

## Review questions

- Which documented contract authorizes the change?
- Does the correct layer own it?
- Is state as local and typed as practical?
- Are failure, keyboard, reduced-motion, mobile, and privacy behavior complete?
- Did a dependency/raw color/global abstraction enter without justification?
- Which automated and manual evidence was actually observed?
- Are docs, approvals, assets, tests, and rollback synchronized?

## Maintenance ownership — 2026-09-06

- Use `ResponsiveArtwork` for registered inline art: `artwork`, meaningful `alt` (or empty for decoration), and accurate `sizes`. Lazy/async/auto-priority are defaults. Explicit eager/high priority belongs only to the hero; the Home ornament retains its existing eager behavior. Native hero `<picture>` sources still use `heroSources`; the component contributes only the image element, preserving direct-child selectors. Existing authored width/height attributes remain valid fallthrough overrides.
- `GhostieArt` owns Ghostie semantics/appearance and delegates delivery to that component. Do not paste manifest lookups into pages.
- Generated JSON identifies itself and groups records under `artworks`. Edit the source file, run `npm run artwork:prepare`, and review hashes/budgets/quality. Never substitute a historical lookup key for an image URL.
- `projectPages.json` owns document metadata shared by build, preview and preload checks. Router component imports stay explicit in `router/routes.ts`; contract tests protect equality. Navigation remains a separate product decision.
- `useHavenDoor` owns the three-knock counter and image eligibility/observer lifecycle. Narrative stages and CSS motion remain in `HavenDoor.vue`; there is no timer-based state machine.
- `_chapters.scss` owns chapter materials, signatures and content rhythm (formerly `_feedback.scss`). `_face-safe.scss` remains last. The older world/storybook/polish layers still overlap; broad reordering requires viewport comparisons. The maintenance change removed only superseded declarations while preserving surviving rule order and syntax fallbacks.

## Whole-code maintenance coverage

Every owned maintained code file needs local purpose/contract comments, with meaningful state transitions, semantic regions, failure/cleanup, ordering and cascade dependencies explained where they occur. Avoid syntax narration, private context and commented-out implementations. Never treat a detected comment marker as proof of adequate explanation. [Document 38](38_CODE_OWNERSHIP.md) records each baseline file plus imported/generated/strict-data exceptions.

Strict JSON and web manifests do not accept comments. Document the owner/generator instead; generated runtime artwork data stays compact. Imported vector packs retain source-boundary provenance; editable SVG notes preserve viewBox/IDs/titles. Keep shebangs, XML declarations and TypeScript reference directives in their required positions. Source-string tests remain limited evidence and must not accidentally pass solely because a comment repeats the target implementation.
