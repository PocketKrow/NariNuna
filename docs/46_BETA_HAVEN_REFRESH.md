# Complete Haven beta refresh

Date: 2 November 2026. Branch: `beta`. Draft PR: #37. Parent: `467c81431681089601d87350b9772521b092e00c`.

Jake requested a complete refresh with specialist subagents. The deliverable is a coherent illustrated Haven across Home, shared navigation and nine public interior rooms, delivered to the existing beta review with fresh build, browser, responsive and accessibility evidence. This supersedes older branch summaries and does not clear production approvals.

## Direction and source owners

Retain the late-fall illustration family, cocoa/plum atmosphere, lavender, cream paper, sparse emerald and big-sister voice. Use meaningful frames, physical materials, compact headings and clear actions. No new raster assets or pixel sprites were needed; original masters, delivery artwork and credit/permission records remain unchanged.

| Surface | Owning files / behavior |
| --- | --- |
| Shared arrivals | `RoomArrival.astro`, `objects/arrival.scss`: inset painting, readable placard, full desktop art, native breadcrumb |
| Header | `SiteHeader.vue`: visible Meet/Streams/Haven/Nails, Work in More, complete mobile directory. First-link focus, contained keyboard path, inert background, Escape return |
| Footer | `SiteFooter.astro`: framed farewell, core rooms and current-page state, wrapping under enlarged text |
| Home | `pages/index.astro`, `rooms/home.scss`: three equal room entrances, manual schedule, one existing curated clip with local fallback, welcome/Meet path |
| Meet | Framed journal, boundary note and native section shortcuts |
| Streams | Lead clip/supporting stack, real channel actions, native section shortcuts |
| Nails | Framed workbench, practice notes, honest gallery hold, narrow copy stack |
| Haven | Charter jump, framed textile/paper charter, threshold heading after values, unchanged knock/floorboard behavior |
| Resources | Shelf index and stronger shelf materials; no fabricated recommendations |
| Work | Concise correspondence and framed public profiles; no invented contact |
| Support | Free support first, pinned notes, optional wishlist with boundaries |
| Stories | Lead memory and album spread using the existing shared clips |
| Credits | Framed thank-you, continuous paper ledger, unchanged creator names/links/statuses, compact native permissions disclosure; approved archive branch retained |

Each interior remains in its route Astro file and `styles/rooms/` stylesheet. Twelve routes, native document links, metadata/preload registry, privacy boundaries and the optional hidden room are retained. Reuse and attribution do not establish new display/derivative rights.

## Schedule authoring

`src/data/schedule.ts` remains `null` until Nari supplies plans. A helper checks strict UTC `publishedAt`/`expiresAt`, nonempty entries and the build timestamp. Future, expired, malformed or empty records show the honest hold. Display labels/time zones stay as supplied; there is no conversion, Twitch feed or in-site editor.

Static HTML does not disappear at expiry without another build. Rebuild when publishing/replacing and before expiry. README contains the complete shape. Focused deterministic tests cover null, valid/boundary publication, future/expiry and invalid data without pinning the live record to null.

## Engineering and verification contracts

- Home social links wrap while retaining touch targets.
- Menu focus/background restoration is verified through actual interaction.
- Haven story/action grid and footer content can shrink and wrap; enlarged-text checks measure actual interactive bounds rather than only document scroll width (which can conceal clipping).
- Paper links use ink-safe colors. Charter numeral columns size to their content.
- Narrow schedule hold gives text the whole paper width; decorative Ghostie is omitted where it squeezes text.
- Compatible dependency remediation is validated with clean installation, lint, tests and both dependency audits. Scoped development-only Minimatch 11 overrides are removed when upstream declares a patched dependency. No client framework major or runtime dependency is added.
- Node requirement is 22.19+, already required by baseline Undici 8; CI uses latest Node22.
- Composition tests block volatile remote thumbnails, scroll/hydrate visible islands before resolving current images, skip deliberately hidden art and decode current local fallback art. Controlled thumbnail failures are filtered only where tests deliberately inject them; other runtime/CSP failures remain fatal.

## Observed evidence

Fresh source checkpoint: clean installation and `npm run check` passed with lint, strict types (60 files, zero diagnostics), 110 tests passed / one environment skip, twelve static documents, 165 essential assets and all 27 supplied Prinny designs. All payload/artwork validators passed. Both dependency audits reported zero vulnerabilities; ESLint's matched set remained exactly 92 files before/after the scoped override. Final browser/snapshot verification is pending at this checkpoint. Prior interrupted-session results are historical until repeated. Managed Chromium downloads previously returned truncated archives; any temporary browser workaround stays outside application dependencies and is identified in the observed results. Automated scans/viewport simulation do not establish screen-reader, native zoom or physical-device conformance.

## Review and rollback

The existing draft PR is the destination; no merge or production release. Actual schedules, nail photographs, resource recommendations, canon/contact/invite, artwork rights/adoption and remaining host/manual inputs keep their actual status.

Rollback by reverting refresh commits to parent `467c814`, rebuilding and rerunning the browser/route gate. No data migration or source-art deletion is involved. Screenshots are review evidence, not client approval.
