# Main refinement — 7 October 2026

Jake's attached brief selects current Main at `9ac7be3e7b27eb76973debf54b3724087ad69b22`: approximately 85% existing composition, 15% restraint. Branch `kiva/nari-main-refinement` starts from that exact commit. PRs #31/#32 are not implementation parents. This authorizes a separate review PR and its existing Netlify preview, not merge or production release.

## Audit before implementation

| Route | Keep | Trim | Refine | Replace / add |
| --- | --- | --- | --- | --- |
| Home | Window-seat arrival, full name, socials, Haven/Meet actions, three corners | Duplicate shelf introduction and extra corner micro-labels | Smaller, unified name; physical postcard shelf; artwork-safe phone plate | Model-anchored welcome with Ghostie occupying the cushion |
| Meet Nari | Arrival → journal → protective promise, symbolism boundaries | Repeated list of roles and role chips; three competing entry mascots | One Ghostie reading over the journal; quieter entry markers | Retain the existing arrival painting |
| Streams | Broadcast room, lead clip and two supporting moments, Story Time path | Duplicate scene annotation, signal chips and second Twitch/YouTube action set | Compact tuning note, simpler desk edge | Nari at the controller while a headphone Ghostie interferes with a cable |
| Nail Studio | Personal practice, workbench, Resources fragment, honest gallery hold | Love/glitter chips and repeated self-taught prose | Scene-safe workbench framing; concise practice notes | Nari actually painting a practice tip; Ghostie investigating polish |
| Haven | Common room, full charter, three knocks, floorboard | Repeated welcome caption beneath the mascot | Preserve values → invitation priority and existing door behavior | Retain existing community and doorway scenes |
| Resources | Library, three named shelves, factual curating state, disclosure policy | Hero signal chip and repeated disclaimer language | Sparse shelves remain intentionally furnished | Retain library; no invented recommendations |
| Work | Correspondence, collaboration categories, brief, public directory | Repeated margin copy and second masthead label | More compact letter spacing, clear fragments | Nari writing on open paper while Ghostie delivers an envelope |
| Story Time | Separate saved-memory album and approved clips | Redundant album explanation | Preserve bound-paper rhythm and memory/privacy boundary | Retain lantern painting |
| Support | Presence first, gratitude wall, subordinate wishlist, boundaries | Duplicate icons alongside purposeful Ghosties; second wishlist CTA | Less competing note decoration | Retain common-room illustration and blanket companion |
| Credits / secret / 404 | Attribution dispositions, original Prinnies, exits, metadata | Nothing without evidence | Regression review only | No new assets or scope |

## Contracts

Preserve Astro static documents, Vue islands, strict TypeScript, SCSS, Lucide, native navigation, routes, all factual destinations and selective existing effects. New paintings use the supplied model derivative as identity reference and Main paintings only as style references. Source masters and existing delivery candidates remain retained. New artwork is noncanonical review material, linked to the existing storybook credit family; model artist/derivative/public-use rights and Nari adoption remain unresolved. See asset record ASSET-2026-022 for exact generation prompts, hashes, derivative and crop records.

Rollback is a normal revert of the refinement commit; previous masters and Main remain available.

## Implemented outcome

All twelve documents and their destinations remain. The nine illustrated public rooms retain their existing signature compositions. Changes remove duplicate arrival annotations, repeated roles/signals, extra micro-labels, redundant actions and overlapping decorative icons. Home retains its arrival, social dock, two lead actions and three favorite corners, now with a smaller unified name and full illustrated postcards. Meet retains the journal and protective promise with one reading Ghostie. Haven retains the full charter, three-knock door and secret floorboard behavior.

Four versioned paintings strengthen Home, Streams, Nails and Work. Nari and Ghosties participate in the rooms rather than sitting beside UI. Complete scene framing replaces accidental cover crops on arrival paintings and the nail workbench; Ghostie slots constrain both dimensions. Existing source masters and all 121 previous immutable responsive candidates remain unchanged. Twenty-eight new candidates bring the total to 149. The selected PNG masters, exact prompts, rejected Streams drafts, hashes, delivery derivatives and unresolved approval dispositions are recorded in ASSET-2026-022 and its inventories. No dependencies, router, effects runtime or factual external destinations changed.

## Observed validation

Executed on the final code/artifact with Node 24.19.0, npm 11.9.0 and Chromium 153.0.8010.0. `NARI_BROWSER_PATH` selected an installed Chromium after Playwright's browser download returned a truncated archive. CI uses the repository's existing Node 22 and managed Chromium workflow; local results do not predeclare CI results.

| Check | Observed result |
| --- | --- |
| Fresh `npm ci` | Passed; unchanged dependency manifest and lockfile |
| `npm run check` | Passed lint, Astro/Vue strict types, build/CSP/credit/image/performance validators, all 98 tests in 20 files, and HTTP preview checks for 12 documents, 165 essential assets and 27 supplied Prinnies |
| `NARI_BROWSER_PATH=/path/to/installed/chromium npm run verify:browser` | Passed all 12 routes at 320/390/768/1440px; direct navigation, no overflow/runtime/CSP/hydration errors, menu focus/Escape/resize, exactly three knocks and focus transfer/reset, secret entry/return, failed-thumbnail fallback, live reduced motion, branded HTTP 404, and usable 320px no-JS navigation |
| `NARI_BROWSER_PATH=/path/to/installed/chromium npm run verify:experience` | All 27 Chromium tests passed, zero skips: route axe checks, eight composition snapshots, menu/door states, no-JS, reduced motion/save-data/mobile exclusions, optional chunk and WebGL failures, static mode/pause, back/forward, short phone, 200% root text, and 1920/3840 layouts |
| Composition baselines | Eight Home/Meet/Haven/Nails snapshots at 390/1440px updated after rendered inspection, then matched by the full experience suite |
| Additional rendered layout audit | 36 checks across nine illustrated routes at 390/768/1440/1920px: no horizontal overflow, failed local images or Ghostie bounding-box clipping; inspected representative desktop/tablet/phone arrivals, workbench, journal, letter, shelves, gratitude wall and Haven |
| Artwork integrity/budgets | Previous manifest records unchanged; selected PNG metadata empty; candidate metadata/hash/size tests pass; new full-scene candidates at most 146,700 bytes, within existing budgets |
| Runtime budgets | Home 57.15KB gzip and Haven 67.66KB against 120KB initial JS+CSS; optional graph 174.85KB against 180KB; every route within its existing limits |
| `git diff --check` | Passed |

This pass uses Main's single Nari palette; historical Dark/Light picker proposals are not restored. Automated axe/contrast and 200% root-text reflow results do not constitute a named screen-reader or native browser-zoom review. Firefox/WebKit, physical devices, native 400% zoom, external service availability, and live Netlify header/cache behavior were not established by these local checks. The production release gate has not been cleared. Final Nari artwork adoption and existing model-artist/derivative/public-use rights approvals remain pending; review-preview authorization does not resolve them. Main and prior exploratory PRs remain untouched.
