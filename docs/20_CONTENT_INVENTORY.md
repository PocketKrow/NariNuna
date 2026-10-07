> **Current direction, 2026-10-06:** [44 — Minimal Creator Reconstitution](44_MINIMAL_CREATOR_RECONSTITUTION.md) supersedes the environment-first layout, twelve-route contract, room navigation, doorway/secret interaction and WebGL requirements below. Earlier implementation descriptions are historical. Canon, truthful content, source preservation, rights and production approval boundaries remain.

# Content Inventory

> 2026-09-07 implementation delta: [integrated visual refinement](34_DISTINCTIVE_UI_REFINEMENT.md) records current layouts, style ownership, content disclosures, and observed QA. Earlier implementation descriptions below are historical where superseded; product and release requirements remain in force.

**Status:** Current implementation mapped; production content partially blocked  
**Owns:** Where public content lives, current record state, source/approval/expiry need, duplication and migration targets  
**Implementation snapshot:** `b65e1c5a6da5a35f4f4f5969465c13f32f277912`  
**Update trigger:** Public copy/data/link/media/page metadata enters, moves, changes, or retires

## Purpose

This inventory prevents content from disappearing into component templates without an owner. It maps current implementation to source, volatility, approval need, and future migration.

It is not a copy dump. Exact public wording remains in source/data and approved content records.

## 2026-08-23 authentic-artwork content delta

Shared authentic identity assets now live in `src/data/artwork.ts`; authentic supplied Prinny derivative references live in `src/data/prinnyCult.ts`; platform shortcuts are rendered through `src/components/ui/SocialDock.vue`. Home now owns a concise desktop-single-viewport arrival rather than the prior long-form Home section inventory below. Meet Nari owns actual model/emote presentation; every remaining page owns its own scene/Ghostie/emote composition while retaining honest content holds. Nine indexable HTML entry documents own Open Graph/Twitter titles, descriptions, and locally hosted preview artwork; secret and 404 documents remain non-indexable and have no promotional previews. All new first-person copy, identity wording, generated support-art adoption, and supplied character/emote/Prinny artwork still require final Nari/rights-holder review before a public release.

## Shared content

| Content | Current owner | State | Volatility / next action |
|---|---|---|---|
| Primary/footer navigation | `src/data/navigation.ts` | Implemented | Stable; sync route registries/docs |
| Social directory | `src/data/socials.ts` | Implemented, checked 2026-08-13 | Volatile; reverify before release |
| Twitch/Discord/Throne constants | `src/data/socials.ts` | Implemented | Discord/support require final approval/recheck |
| Featured moments | `src/data/media.ts` | Implemented, three general Shorts | Nari selection/rating approval and link recheck |
| Community values | `src/data/content.ts` | Implemented | Nari final wording review |
| Resource category holds | `src/data/content.ts` | Implemented `curating` | Replace/extend only with approved items |
| Identity pillars | `src/data/content.ts` | Implemented | Review after canon resolution |
| Header/brand/Watch live | `SiteHeader.vue` | Implemented | Brand art/copy and destination recheck |
| Footer statement/social subset | `SiteFooter.vue` | Implemented | Final placeholder/privacy wording review |
| Theme labels | No live owner in Phase A demo | Proposed removal | Await Nari/Panda review; restore from Git history if rejected |
| Ghostie reminder | `GhostieSummoner.vue` | Implemented placeholder voice | Approve final mascot/copy |

## Metadata inventory

Each entry document currently owns title, description, fixed Nari theme color, icons/manifest, and atmosphere metadata. Secret/404 own robots intent.

Production additions pending:

- canonical URLs after domain selection;
- rights-cleared Open Graph/social images;
- final route descriptions after content approval;
- any structured data only after claim/privacy review.

Metadata is public content and follows the same approval rules as the page.

## Home

| Section | Current content owner | Current state | Production dependency |
|---|---|---|---|
| Hero | `HomePage.vue` | Implemented with environment placeholder | Final hero art/crop and copy approval |
| Room gateway rail | Removed by owner direction | Retired | Shared header and two Home actions own onward navigation |
| Host note/quote | Template copy | Implemented with Ghostie placeholder | Canonical Nari portrait and approved quote/copy |
| Three moments | `featuredMoments` | Implemented | Final selected-media approval |
| Haven invitation | Template copy | Implemented | Community/Discord final state |
| Professional strip | Template copy | Implemented | Contact/media-kit scope review |

Migration note: the former page-local gateway data and postcard rail were removed rather than migrated; no second consumer exists.

## Meet Nari

| Content | Current state | Blocker |
|---|---|---|
| Identity hero/role tags | Neutral implemented copy | Final canon wording |
| Three identity pillars | Shared local data | Final canon/voice review |
| Emerald meaning | Implemented | Nari final approval |
| Sun/moon meaning | Conservative personal wording | Nari wording + approved art if displayed |
| Boundary statement | Implemented | Nari final copy review |
| Lore chapter | Explicit hold | CatDog/Grim Reaper decision |
| Character portrait | Ghostie placeholder | Current render/version/rights/credit |

## Streams

| Content | Current state | Volatility/action |
|---|---|---|
| Stream-feel hero/signals | Page-local copy | Nari tone approval |
| Selected moments | Typed media data | Reverify and approve selection/rating |
| Twitch/main YouTube/VOD | Shared social data | Reverify before release |
| Content map | Page-local summary | Confirm current content modes |
| Schedule | Honest no-schedule hold | Add only with maintained source/expiry |

## Nail Studio

| Content | Current state | Blocker/action |
|---|---|---|
| Environment hero | Original placeholder | Final environment adoption/replacement |
| Gallery/process/tool pillars | Page-local holds | Approved content model |
| Gallery | Numbered empty-state frames | Real nail images, labels, rights, privacy |
| Education | Scope statement only | Approved guides, sources, safety wording |
| Resources/products | No published items | Nari use/review + relationship disclosure |

Never migrate generated nail examples into this inventory as production work.

## The Haven

| Content | Current owner/state | Action |
|---|---|---|
| Hero/found-family copy | `HavenPage.vue`, implemented | Nari final wording review |
| Four values | `communityValues`, implemented | Nari final approval |
| Haven door stages | `HavenDoor.vue`, implemented | Review voice and final invite failure path |
| Discord | Shared constant, candidate | Reverify intended guild at release |
| Floorboard/secret threshold | Component copy, implemented | Keep optional/original; final joke review |

## Resources

2026-09-10 review refinement: the client-preview sample section and its runtime import are removed. The three curating shelves and recommendation policy remain. Historical demo data is retained as an unused fixture, not bundled page content.

| Content | Current state | Target |
|---|---|---|
| Three categories | `curating` | Approved item records |
| Disclosure principles | Implemented | Final legal/owner wording if affiliates publish |
| Social directory | Shared links | Ongoing verification/retirement |

Every future resource needs why, best-for, relationship, disclosure, review date, source, and publish state.

## Work With Nari

2026-09-10 review refinement: the writing-desk margin uses the existing responsive painted correspondence postcard instead of `work-contact-vignette.svg`. No new identity art or contact claim was introduced.

| Content | Current state | Blocker/action |
|---|---|---|
| Hero/evidence stance | Implemented | Nari professional-tone approval |
| Three fit categories | Page-local provisional categories | Approve exact offerings/examples |
| Inquiry process | Context/scope/fit | Approve against real contact workflow |
| Contact | Honest Linktree/X hold | Business email/form/media kit decision |
| Metrics/partnerships | None | First-party approval records only |

## Support

| Content | Current state | Action |
|---|---|---|
| Presence/optionality | Implemented | Nari final wording approval |
| Free support methods | Implemented | Review for tone/current relevance |
| Throne | Shared constant | Reverify availability/destination |
| Other financial methods/tiers | None | Add only with boundary/disclosure approval |

## Story Time

| Content | Current state | Target |
|---|---|---|
| Archive introduction | Implemented | Final voice approval |
| Current shelf | Reuses selected media | Reverify media |
| Story records | None | Target schema + privacy/approval/removal workflow |
| VOD route | Shared social record | Reverify and preserve adult opt-in context |

## Credits

| Content | Current state | Action |
|---|---|---|
| Credit groups and records | Structured public-safe registry | Replace pending labels only with verified public wording |
| Asset-family dispositions | Ten explicit current/future families | Add every new meaningful family before use |
| Contributor artwork | None displayed | Require separate display approval and tracked optimized asset |
| Correction path | Existing public-profile directory | Keep private evidence and contact details out of the registry |

## Secret and 404

- Secret oath/Rule Eleven/counter copy is page-local, original, optional, and pending final joke approval.
- Secret includes no private content and must remain absent from global navigation.
- 404 copy is stable system recovery; re-review only if route/brand tone changes.

## Content gaps by launch severity

| Severity | Gap |
|---:|---|
| Critical | Canonical identity/lore and current character art |
| Critical | Official/adopted Ghostie/logo rights |
| Critical | Real Nail Studio launch content or explicit reduced launch scope |
| Critical | Host/domain/license/legal decisions |
| High | Canonical Discord and approved professional contact |
| High | Final public copy approval across core routes |
| Medium | Resources, stories, media kit, metrics, schedule, additional support methods |
| Medium | Final social metadata/share art |

## Duplication and drift watchlist

- Twitch appears as a shared constant and also a literal URL in `SiteHeader.vue`; synchronize or centralize if it changes.
- Theme names/colors exist in token CSS, pre-paint script, composable, and control options.
- Route lists exist in Vite, Router, navigation, validator, tests, and docs.
- Selected media appears on Home, Streams, and Stories from one shared array—preserve this single source.
- Placeholder-status wording appears in pages/footer/docs and must retire together.
- Current implemented interfaces and richer target schemas must not be conflated.

## Content change procedure

1. Identify the inventory row and page responsibility.
2. Complete approval/provenance/asset records.
3. Determine stable vs volatile and set review/expiry.
4. Update the canonical source module/component/metadata.
5. Add/adjust type and repository invariants.
6. Review all consumers and failure/empty state.
7. Update this inventory, content/schema/page/QA/governance docs.
8. Record observed result and retirement of prior content.
