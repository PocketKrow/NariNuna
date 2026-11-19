# PR 39 — content and artwork composition

18 November 2026. Review branch: `codex/nari-first-visit`, starting from `a61ff3c3fa0476df7fe377c156f9dcb4a9ba4a34`. Jake requested a UI/asset-use overhaul focused on spacing, positioning and disconnected Ghosties. This continues PR #39; it does not merge or release it.

## Layout decisions

- Keep the existing autumn paintings, Nari identity, native navigation and Astro/Vue architecture. No artwork-byte changes. A follow-up validation fix updates the existing Astro dependency from 7.3.5 to 7.4.13 to clear the dependency audit; the stack is unchanged.
- Home: arrival → schedule → three room entrances → featured clip → welcome room. The gaming companion belongs to the clip footer and its next action. The clip uses a bounded widescreen frame with its full thumbnail contained.
- Meet Nari: the reading companion sits in the journal masthead. The protective companion belongs to the boundaries heading; it no longer occupies a large empty column. At desktop widths the three journal entries share one horizontal paper spread below their introduction.
- Haven: the caring companion signs off the values on their paper surface, before the door. On tablet and desktop, the charter uses a two-by-two reading grid under its heading to remove the empty introductory side column.
- Nail Studio: two practice notes share the desktop workbench. The truthful photography hold sits below them as a short notice, with its own small companion. Mobile stacks the practice notes.
- Support: compact illustrations stay with each free-support note; money remains secondary.
- Shared: reduce stacked section padding and heading gaps, remove the duplicate late spacing override, align phone hero gutters with the content and reduce secondary desktop arrival height. Top-aligned painting crops preserve heads when banners become shallower. Hero height remains content-driven for wrapping/zoom.

## Owners and asset disposition

`styles/objects/arrival.scss` owns banners; `_room-language.scss` owns section rhythm; page templates and their `styles/rooms/` files own interior placement. Vue child selectors are explicitly global within an owned parent scope so Astro scoping does not prevent intended sizing.

Existing Ghostie variants, original source masters, responsive derivatives, credit-family records and public-release statuses remain unchanged. `sizes` now follows the small rendered companion slots. No new likeness, canon, schedule, service, contact or approval is introduced. This is implementation authority for the requested review, not artwork adoption or production clearance.

## Evidence

- Clean `npm ci`: passed on Node 24.22.3.
- `npm run check`: passed after the composition changes and Astro audit fix: lint, Astro/Vue/TypeScript diagnostics, twelve-page static build, credits/assets/performance validators, 95 passing tests (one environment-dependent startup skip), and HTTP verification of twelve documents, 165 essential assets and 27 retained Prinnies.
- Baseline PR preview was visually inspected in desktop Chrome for Home and Meet Nari.
- Local Chromium launch is blocked by the execution environment's Unix socket restriction. Playwright's browser download returned an invalid archive. The browser verification command was attempted; it is not recorded as a pass.
- Updated desktop preview reviewed on Home, Meet Nari and Nail Studio: the gaming Ghostie is contained in the clip footer and the reader is attached to the journal masthead. The evidence collector now waits for visible-island thumbnail fallback before collecting images, skips hidden images, and covers 320, 390, 768 and 1440px, including Support. Previously it timed out on hidden mobile illustrations or detached thumbnail nodes. CI results remain separate from the manual review. Minimum-width, reduced-motion, keyboard, assistive-technology and native zoom approval are not inferred from source or unit tests.
- Full and production dependency audits after the Astro update: zero reported vulnerabilities.
- Existing screenshot baselines are not silently regenerated; material composition differences require review.

Rollback: revert the focused composition commit. All original art remains available.

## Review follow-up — 19 November 2026

CI-produced 390px Home, Meet Nari, Haven and Nails captures were visually reviewed, along with desktop Home, Meet, Haven, Nails and Support. The full desktop captures revealed tall empty columns in Meet and Haven; the final spread layout addresses these instead of filling them with more decoration.

The existing full browser checks also found a low-contrast public-profile link on the Work paper. Its normal, hover and focus colors now use the dark paper interaction token. The Haven keyboard-navigation test now selects the named Explore the Haven link instead of assuming the first hero button goes to Haven (that button now opens the featured clip).
