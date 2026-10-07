# NariNuna Repository Instructions

These instructions apply to the entire repository.

## Mission

Build and maintain Nari Nuna's personal creator website as a distinctive, factual, rights-cleared, privacy-safe static Astro multi-page website with focused Vue islands. Keep Nari first, using faithful poses anchored only to the supplied original model. Preserve Nari's warmth, big-sister voice, nail-art learning, community boundaries, and project-specific visual identity. Do not turn it into a generic VTuber template, link wall, corporate creator site, or unmaintainable effects demo.

## Read before editing

For any substantial task, read:

1. `docs/README.md` for the task-specific route.
2. `docs/00_PROJECT_SOURCE_OF_TRUTH.md`.
3. `docs/17_CURRENT_STATE_AUDIT.md`.
4. `docs/16_GOVERNANCE_AND_DECISION_LOG.md`.
5. The specialist documents and source files that own the change.

Asset work requires `docs/06_ASSET_MANIFEST_AND_ART_PIPELINE.md`. Engineering work requires `docs/07_TECHNICAL_ARCHITECTURE.md` and `docs/18_CODE_STANDARDS.md`. Visual approval uses `docs/19_DESIGN_REVIEW_RUBRIC.md`. Release work uses docs `12` and `15`.

## Authority and evidence

- Nari owns her public identity/canon/personal meaning and approvals she can grant.
- Jake owns product, repository, and release direction.
- Rights holders own the uses they control.
- Current code proves behavior but does not overrule approved product truth.
- Unknowns remain unknown; do not invent public certainty.
- Label historical results as recorded until rerun.

Never claim a test, build, branch, commit, PR, deployment, link, right, or approval without direct evidence.

## Locked architecture

- Astro 7 static output + strict TypeScript + SCSS; Vue/Lucide may render static primitives on the server. There are currently no hydrated islands, GSAP, Three.js, canvas, client router or environment-first layouts. CSS micro-motion only.
- npm with committed lockfile and Node.js 22.13+.
- Eight prerendered documents: six primary pages, Credits and 404. Native Netlify 301 redirects retire five old routes; `routeRedirects.json` owns migration.
- Ordinary anchors for top-level document navigation.
- Shared `SiteLayout.astro`; static page bodies/footer; explicit Vue client directives only for behavior.
- Metadata derives from `projectPages.json`; no scene preloads. Models use sized responsive images with preserved originals and explicitly authorized model-anchored poses; never restore the removed root `pages/` scaffold.
- Phase A review branch: one Nari atmosphere with semantic tokens; Dark/Light removal remains a reversible client-review proposal, not an approved product-foundation change.
- Local typed content; no backend, CMS, analytics, form, account, or embeds in the foundation.
- No Tailwind, general UI kit, second scaffold, SPA rewrite, or client secrets.

ADR-011 records Jake’s explicit 2026-10-03 Astro migration instruction. `docs/42_ASTRO_REBUILD.md` supersedes the dated Vite path/route/tooling instructions in older documents. ADR-012 and `docs/43_VNEXT_EXPERIENCE.md` authorize the vNext redesign, tour/Passport retirement and optional effects. ADR-013 and document 44 supersede the room-led product and effect requirements. ADR-014 and document 46 authorize new model-faithful poses and custom anime supporting assets. ADR-015 and document 48 refine the connected Haven shell, provisional mark, Creativity/Connections labels and optional thumbnails/disclosure. ADR-016 and document 49 refine seven distinct inhabited character scenes. ADR-017 and document 50 restore the original autumn Haven warmth within the minimal structure. Further departures require an accepted decision record.

## Product and content boundaries

- Safe identity: “Nari, your chaotic big-sister VTuber.”
- Do not merge CatDog and Grim Reaper canon without Nari approval.
- Never generate/redraw Nari from public references. Owner-authorized private-review reillustration may use only the supplied real model and must preserve every identifying character trait; public use remains separately blocked until rights and Nari's approval are recorded.
- Nail Studio is self-taught practice/education, not services, clients, licensure, or medical authority.
- Discord follows values in Haven; an optional three-knock door has direct-entry and native no-JS disclosure paths. Support never buys access, ownership, obligation, or time.
- Do not invent lore, metrics, schedule, testimonials, partnerships, resources, affiliate status, contact details, credentials, or private biography.
- Adult content is opt-in and labelled.

## Assets and privacy

- Public visibility and artist credit are not website permission.
- Complete an asset record before ingesting character, emote, logo, nail, community, sponsor, or heritage art.
- Preserve source masters; create non-upscaled metadata-clean web derivatives.
- Record owner, creator, rights, credit, crop, derivative, local-host, animation, and restrictions.
- Never publish private identity, location, contact, family, messages, community data, raw metadata, or revealing backgrounds/filenames.
- Keep current generated project art visibly noncanonical until explicitly adopted.

## Engineering standards

- Inspect before editing and preserve unrelated changes.
- Make the smallest coherent integrated change.
- Keep state local; keep recurring/volatile content typed and removable.
- Use native semantic elements and visible focus.
- Clean listeners/timers/observers/animations.
- Keep SCSS layer ownership and semantic tokens.
- Recompose mobile from 320px; honor reduced motion and the active Nari atmosphere.
- Add dependencies only with documented need, impact, license/privacy review, tests, and removal plan.
- Update code, tests, docs, inventories, approvals, decisions, and evidence together.

## Validation

Required automated gate:

```bash
npm ci
npm run check
```

For shell, page, navigation or island changes also run `npx playwright install chromium` once, then `npm run verify:browser` on the current built artifact. `NARI_BROWSER_PATH` can select an existing Chromium binary.

Then perform relevant manual checks from `docs/12_QA_ACCEPTANCE_CRITERIA.md`: direct routes, the active Nari atmosphere, 320/390/768/wide, keyboard/focus, reduced motion, zoom/reflow, screen reader, contrast, network/performance, error states, links, rights, and privacy. The warm paper/autumn Haven hybrid in document 50 is the current owner-requested review direction. The connected refinement is document 48; the preceding inhabited-artwork pass is document 49; the current hybrid is document 50. Historic room/theme review criteria are superseded by document 44.

Report only observed results.

## Git and scope safety

- Use focused branches/commits and explicit staging in mixed worktrees.
- Do not merge, mark the existing draft PR ready, force push, delete source masters, release, or deploy without explicit authorization.
- Do not commit private approval evidence, credentials, caches, or `dist/` unless repository policy explicitly changes.
- Prefer normal reverts and previous-good deployments over destructive resets.

## Stop and ask

Stop for one focused owner decision when work would settle canon, rights, private/public data, heritage meaning, nail service/medical claims, Discord/contact/metrics, analytics/forms/backend/CMS, paid/vendor-locked infrastructure, host/domain/legal/license, destructive operations, merge/release, or a major architecture departure.

Do not stop for an implementation detail already governed clearly by the documentation.

## Handoff

Lead with the result. Name branch/commit/PR or exact local state, key files, checks and observed results, routes/themes/viewports covered, approval/asset/privacy records, limitations/blockers, rollback, and one executable next step. The handoff must not depend on private conversation history.
