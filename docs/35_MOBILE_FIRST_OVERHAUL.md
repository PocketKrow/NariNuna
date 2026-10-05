# Mobile-first experience overhaul

> **2026-10-05 vNext:** [Document 43](43_VNEXT_EXPERIENCE.md) owns the current experience. The guided bottom passage and Passport are retired; prior descriptions below are historical. Astro/static content, rights and release boundaries remain. All painted arrivals now have one composition owner; CSS/GSAP and selective deferred Three.js replace Motion-V.


**Status:** PRs #16 and #17 `MERGED`; shared journey polish `IMPLEMENTED` on `kiva/journey-polish-desktop` for client review; production clearance remains blocked
**Date:** 2026-09-09
**Branches:** `kiva/mobile-first-overhaul`; `kiva/mobile-refinement-pass-2`
**Scope:** Phone composition, compact navigation, narrow-width reflow, Resources wayfinding, and room-to-room continuity across phone, tablet, and desktop

## Outcome

The phone experience is now a sequence of distinct rooms rather than one desktop composition or one reusable caption card scaled down. Below `48rem`, each ordinary route owns a different first-screen silhouette while keeping the approved artwork, copy, route, and content order:

| Route | Phone opening |
|---|---|
| Home | Full-height illustrated arrival with copy and the labelled social directory integrated into the lower scene |
| Meet Nari | Portrait above a notebook-page introduction |
| Streams | Full-bleed broadcast art joined to a dark console with a gold rail |
| Haven | Tall doorway composition with the welcome copy embedded in the light path |
| Work With Nari | Polaroid-like artwork tucked behind a cream correspondence sheet |
| Resources | Shelf image joined to an open-book/spine treatment |
| Nail Studio | Full artwork followed by a clipped workbench note |
| Story Time | Mounted album photograph followed by its paper caption |
| Support | Arched room crop beside a personal note |

Desktop and tablet opening composition remains owned by the existing layers at `48rem` and above; the shared room passage now also appears below those openings and their content. The mobile menu exposes all eight ordinary rooms as a plain two-column directory, collapsing to one column at the narrowest widths. It retains native disclosure behavior, current-page state, Escape-to-close behavior, and focus return without decorative numbering.

Resources continues directly into its three shelves. The redundant category jump links remain removed, while stable section IDs and the Nail Studio cross-link remain intact.

## Continuation refinement

The follow-up pass keeps the nine silhouettes intact and resolves the remaining small-control issues found during visual review:

- Home social labels now render at 13px without truncation; the primary Haven action is 14px with a 48px target.
- The open mobile directory contains Tab and Shift+Tab focus between its close control, eight room links, and Twitch link. Escape still closes the panel and returns focus to the menu control.
- The current room gains an inset gold marker in addition to its existing `aria-current` state.
- Haven knock count, progress labels, and stage copy now render at 12–13px on phones.
- The optional floorboard reveal and hidden-room return link use 14px interactive text and at least 44px targets.

## Connected journey refinement

The next client-review pass turns the separate rooms into a continuous mobile visit without replacing their individual compositions:

- Every ordinary public route ends with a compact, doorway-shaped passage showing the current room's place in the nine-stop journey.
- Large previous/next-room anchors follow the site's actual chapter order: Home, Meet Nari, Streams, Nail Studio, Haven, Resources, Work With Nari, Story Time, and Support. Support returns visitors to Home.
- The shared passage reuses the existing room notes rather than adding lore or promotional copy. Those notes now live in `src/data/journey.ts`, which is also the single ordered journey registry.
- The expanded phone menu reads as a Haven directory: each room keeps a clear destination label and gains its existing one-line room note. The panel fills the available short-screen height and remains scrollable.
- Same-origin document changes use a short progressive-enhancement transition. Reduced-motion preference disables cross-document navigation animation, and the 404 and hidden Prinny routes do not render the journey passage.

## Implementation contract

| Concern | Implementation |
|---|---|
| Phone authority | `src/styles/_mobile-first.scss`, imported last from `main.scss` |
| Breakpoint | Phone rules apply below `48rem`; existing desktop/tablet opening composition remains unchanged; shared passage adapts at `48rem` |
| Opening ownership | Shared spacing/type/control rules stop at the system layer; each route receives its own silhouette and material treatment |
| Interior ownership | Existing route SFC SCSS continues to own journal, desk, workbench, shelves, ledger, album, and gratitude-wall sections |
| Social labels | `SocialDock.vue` provides visible text; `_polish.scss` keeps the desktop icon-only default; the Home phone composition reveals the labels |
| Mobile navigation | Flat eight-room directory in `SiteHeader.vue`; the desktop primary/More hierarchy is unchanged |
| Room continuity | `RoomPassage.vue` and `src/data/journey.ts` connect the nine ordinary public rooms in chapter order at every width |
| Resources | Category jump navigation removed; all shelves, records, disclosures, and stable section IDs retained |
| Accessibility | One H1 per document, no horizontal overflow in the observed matrix, touch-sized menu controls, focus return, and existing reduced-motion behavior |

No route, dependency, approved copy, external destination, artwork record, canon claim, or MPA behavior changed.

## Recorded validation from PRs #16 and #17

Browser review covered all 11 HTML documents at `320×844`, `390×844`, `430×932`, `667×375`, and `768×1024` CSS pixels. Every route exposed exactly one H1 and no horizontal overflow. A separate `390×844` pass with the document root text size set to 200% produced the same result across all 11 documents.

Interaction review at `390×844` confirmed all eight mobile menu destinations, Tab/Shift+Tab containment, Escape closure, and focus return to the menu trigger. The Haven doorway progressed through all three knocks, revealed the Discord action only in the open state, and returned to the first-knock state with focus restored after reset. Home was also reviewed at `1363×936`; no desktop overflow or opening-composition regression was observed. Meet Nari and Resources were inspected beyond their openings to confirm the journal and shelf treatments remain distinct.

The connected-journey browser review covered all nine ordinary routes at `320×844` and `390×844`. Every route rendered one H1, its correct progress state, 52–77px passage links, and no horizontal overflow. All nine were also rechecked at `390×844` with a 200% root text size; no passage or page overflow appeared. The expanded directory fit a `390×667` short screen, retained internal scrolling, and kept all room targets at roughly 80px. Tab/Shift+Tab containment, Escape closure/focus return, real document navigation from Home to Meet Nari, 404/Prinny exclusion, and desktop passage suppression at 1348px were observed.

`npm run check` passes lint, strict type checking, 68 Vitest checks across 14 files, the production build, asset/budget validation, and direct preview verification for all 11 documents. Shared JS plus CSS is 72.80 KB gzip against the 120 KB budget. The largest route CSS remains Haven at 5.36 KB against 12 KB, and the largest combined route graph is Haven at 84.17 KB. Preview validation covers 137 essential identity/environment assets and all 27 supplied Prinny designs.

## Remaining release work

This is review evidence, not production clearance. The environment did not provide a physical Pixel 9, native browser zoom telemetry, a named screen reader, measured contrast tooling, or the production host. Those checks, content/rights closure, and client approval remain pending under the existing release contract.

## Rollback

Revert the focused mobile-overhaul or experiential follow-up commit. The connected-journey layer is isolated to `RoomPassage.vue`, `src/data/journey.ts`, the shell/header/footer wiring, the progressive transition rules, tests, and this documentation; it requires no data migration or asset rollback.

## Shared journey polish — 2026-09-09

`kiva/journey-polish-desktop` extends the passage to all viewport widths. Below `48rem` it retains a stacked threshold; from `48rem` it places the current-room note beside previous/next navigation with the chapter rail beneath. Home retains its existing full opening and gains the passage below it, so the desktop document now continues beyond that opening.

The passage has a semantic H2, a visible current-room label, an existing destination note under the next room, quieter framing, non-shrinking arrows, explicit unclipped focus rings, and a rail whose column count follows the registry. The rail indicates chapter position, not tracked browsing history. All route links remain real document anchors; Support returns to Home.

The mobile directory gains hover feedback, one current-room marker instead of a redundant underline, dynamic viewport sizing, safe-area padding, and contained overscroll. Crossing into desktop navigation closes mobile state, clears the body scroll lock, and moves focus to a visible desktop link if focus was in the mobile controls. The panel and desktop control breakpoint now agree at `56rem`.

### Observed evidence for this pass

- `npm ci` completed successfully.
- `npm run check` passed: lint, strict TypeScript, 68 tests across 14 files, production build, 11 HTML documents, 137 essential assets, and all 27 supplied Prinny designs.
- Shared JS + CSS: approximately 73.06 KB gzip / 120 KB; Haven CSS: 5.36 KB / 12 KB; largest combined graph: approximately 84.43 KB.
- `git diff --check` passed.
- No fresh rendered viewport, keyboard, contrast, or device evidence is claimed: the local browser executable was absent, its official download timed out, and the cloud browser rejected the local preview URL with `ERR_BLOCKED_BY_CLIENT`.

### Review next

Render all nine ordinary rooms at 320, 390, 768, and 1440px; inspect the passage and its transition into each footer. Check 200% text sizing, focus outlines, previous/next destinations, Support-to-Home closure, the excluded 404/Prinny routes, and reduced motion. Open the mobile menu, widen through 896px, and verify body scrolling resumes and keyboard focus remains visible. Keep this pass in draft until rendered review is complete.

Rollback: revert the focused shared-journey polish commit; no migration, dependency, or asset rollback is required.

## Character focal-point follow-up — 2026-09-09

Jake requested a leftward adjustment to the Home painting and stronger emphasis on Nari throughout character-led images. Inspected the served source paintings for Home, Meet Nari, Streams, Nails, Haven/Support, Stories, Work, Resources, and the doorway interior. The eight character-led hero routes now use individual horizontal focal points in `_face-safe.scss`; `_mobile-first.scss` consumes those points rather than overriding Home, Nails, Haven, Support, Streams, and Work with scenery-biased positions. Desktop adjustments preserve the text lane. Higher cover-position percentages shift the painting left when horizontal cropping occurs; they do not shift an image that already exactly fits its width.

Home changes from the effective 64% phone crop to 80%, with its desktop focal point moving from 77% to 86%. Meet Nari uses 82% on phones; Nails 100%; Haven 78%; Support 84%; Stories 100%; Streams 88%; Work 100%. These are image-specific crop positions, not subject coordinates or a universal centering rule. Resources has no Nari figure and retains its existing crop. The portrait doorway interior already uses a centered crop and is retained. No asset pixels, source files, delivery sizes, rights records, or copy changed.

Source artwork was visually inspected. Full rendered/device confirmation remains pending under the browser limitation above; source inspection is not a claim of viewport QA. Rollback: revert the focused crop follow-up commit.
