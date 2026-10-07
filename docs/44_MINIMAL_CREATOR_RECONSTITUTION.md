> **2026-10-06 owner revision:** [46 — Custom Anime Creator Art](46_ANIME_CREATOR_ART_DIRECTION.md) and ADR-014 supersede the first minimal visual iteration: light lavender/warm cream, model-faithful new poses and a custom clean-anime asset family. The seven-document architecture, truthful content, original-source preservation and production approval boundaries remain.

# Minimal Creator Reconstitution

Authority: Jake's 2026-10-06 attached execution handoff. Accepted for implementation and review, not production release. Branch starts from main `9ac7be3e7b27eb76973debf54b3724087ad69b22`; PR #30 is not its base.

## Product

Nari is the subject: a warm, playful creator with chaotic big-sister energy and a creative life beyond Twitch. Five main destinations answer who she is, where to watch, where to find her, what she enjoys and how to propose work. Minimal means fewer competing ideas, not missing identity. Reject room/object navigation, tour, Passport, loading ceremony, cursor effects, canvas and giant display type.

## Documents and migration

| Destination | Responsibility |
| --- | --- |
| `/` | Original-model portrait, concise greeting, immediate Twitch/YouTube, one compact personal note |
| `/meet-nari/` | Existing truthful personality, creative interests and community values |
| `/nail-studio/` | Self-taught personal practice; explicit real-photograph hold; no services |
| `/links/` | Twitch/YouTube hierarchy, other profiles, three retained clips, community, optional support |
| `/work-with-nari/` | Retained collaboration fit, useful brief and truthful unpublished-inbox state |
| `/credits/` | Existing public-safe credit registry; only display-approved archive pieces may render |
| `/404.html` | Local illustrated recovery with Home exit and noindex |

| Retired path | Native 301 destination |
| --- | --- |
| `/streams/` | `/links/` |
| `/stories/` | `/links/#moments` |
| `/haven/` | `/links/#community` |
| `/resources/` | `/nail-studio/#nail-desk` |
| `/support/` | `/links/#support` |
| `/the-prinny-cult/` | `/meet-nari/#community` |

`routeRedirects.json` generates `public/_redirects` including slashless and index.html aliases. The local browser QA server applies the same 301s. Old page sources live as nonexecuting `.astro.txt` files under `docs/archive/minimal-reconstitution/`. No empty redirect documents or SPA rewrites are built. Legacy resource fragments remain anchored in Nails; Work's `collaboration-note` and `nari-links` remain.

## Composition and assets

Warm paper, ink, muted lavender and a deep emerald accent form one semantic token system. Restrained serif display type and readable system body text load no remote fonts. Thin rules and borderless editorial groupings establish rhythm. A quiet oval portrait mat, retained lavender sprig and one cozy Ghostie compose Home around the original Nari model. Mobile has a separate reading order: greeting, identity art, platform actions, description. All character pixels come from existing supplied-model delivery sources; no generated model or changed identity.

`NariModel.astro` delivers optimized, alpha-preserving, uncropped, non-upscaled WebP copies. `prepare-model-artwork.py` owns generation, `model-delivery.json` retains source hashes/bytes/dimensions and derivative integrity. Original fullbody/portrait copies are unchanged; supplied source/archive references retain their prior records. `ArtImage.astro` reuses the existing responsive artwork lookup for fully visible cozy/heart/nail/404 Ghosties and lavender. Icons reuse existing platform glyphs. A new site-native monogram favicon and original-model social composition have retained SVG/PNG masters and a separate source/hash record; no character art is synthesized or external artwork introduced.

Existing character/emote/generated-art family rights in `artCredits.json` stay pending/blocked as previously recorded. No permission or Nari adoption is inferred. The old social/share artwork and painted icons are retained but removed from active metadata. The new original-model share composition and monogram remain subject to their recorded adoption/model-rights status before production. Nails contains no invented examples.

## Architecture and motion

Astro owns shell, metadata, layout and native navigation. Current pages have zero hydrated Vue islands. Vue/Lucide remain installed for server-rendered icon/social/credit primitives and useful existing component infrastructure; no Vue runtime is sent to visitors. Native details/summary provides the mobile menu with no-JavaScript support. A small external script adds Escape/focus return and desktop-resize closure; the menu remains in normal document flow, not modal.

The new `_creator.scss` exclusively owns the visual cascade. Previous room SCSS and unused MediaCard, SectionHeading, GhostieArt and ArtworkCreditLink components are removed; their history remains in Git. Finite 500ms CSS identity entrance and 180ms button hover are optional; reduced motion disables both. No decorative perpetual animation is used. GSAP, Three.js and Three types are removed with their obsolete runtime modules; no new dependency is added. The final audit also prompted narrow security patch updates to Vue 3.5.42 (including its matching server renderer) and source-map-js 1.2.2; no framework migration or broad tooling upgrade. No tracking, embed, runtime platform API, form, account or backend.

## Performance and validation

Budget is tightened from 120 KB to 25 KB gzip initial JS+CSS per document; deferred effect budget is now zero. Standard responsive-art hash/retention/rights/security gates remain. Original model derivative cap is 150 KB; responsive sources never upscale. No environment preload or redundant font preload exists. Direct initial high-priority model images identify the LCP resource without an extra preload.

`npm run check` runs lint, Astro/Vue strict typechecking, credit registry, seven-document build, emitted CSP, image/bundle validators, Vitest and HTTP preview. Browser verification tests the built artifact under emitted CSP, every route at 320/390/768/1440/1920px, native keyboard/no-JavaScript navigation, image loading, migration/404 and reduced motion. Playwright additionally covers axe on every route at 390/1440px, image failure, document history, 200% text enlargement and up to 3840px, plus eight composition baselines. Retired interaction/WebGL tests are replaced by actual document/migration/content/resilience assertions; artwork preservation tests remain.

Current observed evidence belongs in `45_MINIMAL_RECONSTITUTION_VALIDATION.md`; no historical result should be carried forward. Actual device, assistive-technology, field LCP/CLS, external destination identity/invite freshness, rights, client final approval and host production behavior remain separate gates. Netlify branch/deploy previews append `X-Robots-Tag: noindex, nofollow`. Production is unchanged until an authorized merge/promotion.

## Rollback

This is a competing branch from main, not a rewrite of PR #30. Do not merge it. Leave it unmerged to keep production as-is, or revert the implementation commit if adopted later. Original/source art, retained derivatives, registry facts and retired-content archive are preserved.
