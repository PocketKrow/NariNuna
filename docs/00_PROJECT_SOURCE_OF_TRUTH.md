# Project Source of Truth

> **2026-10-07 Main refinement:** Jake selected current Main's warm illustrated Haven for refinement: retain its routes, rooms, storytelling and rich materials with approximately 15% restraint. Do not use minimalist PR #31 or hybrid PR #32 as the base. [Document 44](44_MAIN_REFINEMENT.md) owns this implementation/audit and review evidence. Existing canon, rights and production approvals retain their status.

> **2026-10-05 vNext:** [Document 43](43_VNEXT_EXPERIENCE.md) owns the current experience. The guided bottom passage and Passport are retired; prior descriptions below are historical. Astro/static content, rights and release boundaries remain. All painted arrivals now have one composition owner; CSS/GSAP and selective deferred Three.js replace Motion-V.


> **2026-10-03 Astro migration:** Jake explicitly requested the rebuild in Astro. ADR-011 and [42 — Astro rebuild](42_ASTRO_REBUILD.md) own the current route, shell, dependency, validation and rollback contracts. Vite-MPA/client-router paths below are dated history. Product content, imagery, privacy and release approval boundaries still apply.

**Authority:** Highest project document below Nari's explicit current approval  
**Status:** `LOCKED` product foundation; production clearance `BLOCKED`  
**Reviewed:** 2026-08-13  
**Implementation snapshot:** `b65e1c5a6da5a35f4f4f5969465c13f32f277912`  
**Update trigger:** Any change to identity, audience, routes, stack, public claims, launch scope, or blocker status

## 2026-09-12 credits and copy implementation

The `kiva/credits-humanization` review branch adds `/credits/` as a secondary public room, a public-safe structured attribution registry, deterministic validation, and a bounded copy-humanization pass. Unknown artists, links, permissions and Nari wording remain explicitly pending. Credit approval and permission to display artwork are separate; no new contributor artwork is displayed on Credits. See [document 40](40_CREDITS_AND_COPY_HUMANIZATION.md). This implementation records unresolved release blockers rather than clearing them.

The dependent `kiva/haven-depth-release-readiness` review branch adds a separate failing-until-cleared production gate, archive-ready approved-artwork projection, contextual credit access, a local ten-room Passport and four restrained cross-room discoveries. Jake removed Media Kit from this pass; the professional contact blocker remains tracked without creating a kit or route. No existing release blocker is cleared by this implementation. See [document 41](41_HAVEN_DEPTH_AND_RELEASE_READINESS.md).

## 2026-09-11 implementation maintenance

The maintenance branch starts from main `8c7fe67` (merged PR #20). It preserves current public content, art and product boundaries while reducing runtime metadata and retired CSS, documenting code ownership and correcting reduced-motion maintenance defects. Current evidence is [document 37](37_SIZE_MAINTENANCE.md). Dated baseline statements below remain historical; no new canon, asset-rights, theme or release approval is inferred.

## 2026-09-09 current-main reconciliation

Audited `main` is `fa83954f09938a864fd53f6a26739e50e2277970`, including merged PR #18 and Nari-centered crops. Earlier stacked/open-branch descriptions below are dated history. The site has one Nari atmosphere and a nine-room journey on mobile, tablet, and desktop. Implementation and merge history do not settle the outstanding client, rights, content, or release decisions. Current evidence and risks are owned by [document 17](17_CURRENT_STATE_AUDIT.md) and [document 36](36_MAIN_SECURITY_AND_KNOWN_ISSUES.md).

## 2026-09-08 experience-refinement review state

The repository is currently public. The active implementation remains a client-review build with unresolved public-release rights, canon, content, contact, hosting, and manual-QA decisions; repository visibility does not clear those blockers. The review branch `kiva/nari-experience-refinement` is stacked on open PR #12 so the doorway work remains intact and independently reviewable.

This refinement gives the existing journal, broadcast desk, shelves, workbench, Haven charter, correspondence, memory album, support notes, clean Home arrival, and 404 recovery stronger material hierarchy. It adds no new public claim, route, asset, dependency, integration, backend, or approval. The Nari-only atmosphere remains a reversible client-review proposal rather than a recorded final client decision.

## 2026-08-23 owner-directed authentic-artwork implementation update

The repository owner first directed that the site retain Nari's real model and original Prinnies, then explicitly authorized an identity-preserving reillustration of Nari to create a distinctive, cohesive private-review website. The implementation retains the supplied `Model_File.png`, supplied `Assets/comfy.png`, supplied static emotes, and all 27 unchanged-as-design `Assets/PrinnysForThrow/*.png` derivatives. Its storybook character and character-led environments are derived from the actual supplied model, never public references or a guessed replacement identity. Asymmetric ears, emerald eyes, brown-to-purple hair and tail, lavender/corset silhouette, complexion, accessories, and warm adult demeanor are mandatory invariants. Owner-directed private review is not public-release or model-artist derivative-rights approval; see ADR-008 and `docs/24_STORYBOOK_ART_DIRECTION_AND_PROMPTS.md`.

This owner instruction authorizes implementation and review in the private repository; it does **not** establish Nari's final public-copy approval, artist ownership, exact website rights, required attribution, or franchise-related permissions. Public launch remains blocked until those records are completed. The hidden room remains optional, `noindex, nofollow`, absent from normal navigation, and uses the supplied designs without inventing approved names, ranks, biographies, or canon. See [`23_AUTHENTIC_ARTWORK_IMPLEMENTATION.md`](23_AUTHENTIC_ARTWORK_IMPLEMENTATION.md).

## Product thesis

Nari Nuna's Haven is a lived-in late-fall refuge built around one public identity with several real rooms: VTuber and gamer, self-taught nail artist and educator-at-heart, chaotic protective big sister, and community host. It turns a scattered set of creator links into a coherent place visitors can enter, understand, and remember.

The emotional journey is:

> arrival → comfort → curiosity → discovery → belonging

The professional journey is shorter:

> credibility → fit → boundaries → approved contact

The site succeeds when a visitor can say, “This could only belong to Nari,” while still finding the next action without deciphering a fandom maze.

## The promise

The Haven promises four things:

1. **Personality without fiction.** Nari's warmth, chaos, craft, and boundaries are specific; unapproved lore and credentials are not invented to fill space.
2. **Belonging without ownership.** Community and support never create entitlement to Nari, her time, or other people in the Haven.
3. **Craft without counterfeit proof.** Nail learning is flagship content, but generated or stock work never impersonates Nari's portfolio.
4. **Atmosphere without obstruction.** Art, themes, Ghosties, and secrets make the site memorable without blocking navigation, accessibility, performance, or privacy.

## Definition of “holy shit, this is mine”

The desired reaction does not come from more decoration. It comes from recognition and coherence:

- the Haven feels like one place at three times of day;
- Nari's roles feel connected rather than arranged as a link wall;
- the Nail Studio is treated with the same importance as streaming;
- warmth and sharp boundaries coexist in both copy and interaction design;
- every visual asset feels authored, credited, and intentionally placed;
- mobile feels composed, not compressed;
- professional visitors can evaluate fit without sterilizing Nari;
- hidden delight rewards curiosity but never becomes required navigation;
- placeholders are honest and removable;
- the implementation remains maintainable after the launch excitement fades.

## Audiences and priority

| Priority | Audience | Primary need | Success signal |
|---:|---|---|---|
| 1 | Current Ghosties and Haven members | Recognition, belonging, reliable doors | Values feel true; Discord is discoverable after context |
| 2 | Viewers arriving from clips or live platforms | Understand Nari quickly | Reach a representative stream/video with correct expectations |
| 3 | Nail-art learners and craft-curious visitors | See authentic work and learning process | Find approved work, process notes, and disclosed resources |
| 4 | Creators, collaborators, sponsors, and brands | Evaluate fit and boundaries | Understand possible work and reach an approved professional route |
| 5 | Optional supporters | Help without pressure | See free support first and understand that money grants no access |

No audience is optimized through deceptive urgency, surveillance, fake scarcity, or fabricated social proof.

## Locked product decisions

### Identity and world

- The public-safe identity is **“Nari, your chaotic big-sister VTuber.”**
- Nari's Haven is the central world and community concept, not merely a Discord label.
- The world is a cozy fall-sunset/early-evening sleepover refuge: lavender, plum, cocoa, cream, ember light, creative clutter, pillows, blankets, and friendly spectral presence.
- Nari, Dark, and Light are three atmospheres in the same Haven, not unrelated skins.
- Emerald is a sparse signature signal tied to Nari's eyes and meaningful states.
- Sun-and-moon meaning stays personal to Nari's approved Mexicana heritage wording. The project does not invent history or imitate cultural motifs.
- Found-family energy is emotional reference only. The site does not copy *Fairy Tail*, Disgaea/Prinny, or any other franchise identity or assets.

### Content and experience

- Nail learning is a first-class pillar beside streams and community.
- Current public scope supports “self-taught nail artist” and work on herself. Do not imply licensing, clients, salon services, bookings, medical authority, or professional credentials.
- Discord is progressively discovered after community values; it is not a repeated global conversion button.
- Support is optional and never buys access, priority, ownership, obligation, or a claim on Nari's time.
- Professional content may be concise, but it remains recognizably Nari and contains no invented metrics, partnerships, or response promises.
- No autoplay sound, autoplay video, background stream, social-feed scrape, or third-party player on initial load.
- The hidden Prinny Cult is optional, easy to exit, `noindex`, and excluded from normal navigation. The owner-directed private review displays the 27 supplied original collection designs without redrawing or inventing lore; public display remains blocked until all underlying character/franchise/artist rights are verified.

### Technical foundation

- True Vite multi-page application with twelve real HTML documents; Credits is secondary/footer navigation and does not become a primary header destination.
- Vue 3, TypeScript, Vite, Vue Router, SCSS, Motion for Vue, and Lucide.
- Normal top-level document navigation; Vue Router resolves and lazy-loads the current page within each entry.
- No Tailwind, general UI kit, CMS, database, analytics, account system, or fake form in the current scope.
- npm with committed lockfile; Node.js 22.13+.
- Mobile support begins at 320 CSS px.
- WCAG 2.2 AA is the public-launch target.
- Reduced motion, keyboard parity, visible focus, three-theme continuity, and direct route loading are release requirements.

## Canon and unresolved identity

The approved planning packet describes a warm, joy-spreading Grim Reaper. Current first-party profiles consistently describe and depict a half-cat/half-dog “CatDog” big-sister VTuber. No approved source currently explains whether these are versions, layers, evolutions, or unrelated concepts.

This is a launch blocker, not an invitation to improvise.

Until Nari resolves it:

- use neutral big-sister VTuber wording;
- never generate or redraw Nari from public references; only an explicit owner-authorized, identity-preserving private-review reillustration grounded in the actual supplied model is permitted, without resolving public derivative rights or inventing lore;
- do not merge CatDog traits with Grim Reaper lore;
- keep the Meet Nari lore room visibly held;
- treat public images as references, not website licenses;
- record Nari's final wording in the content approval template and governance log.

## Route contract

| Route | Document | Navigation | Product responsibility |
|---|---|---|---|
| `/` | `pages/index.html` | Primary | Clean one-screen desktop arrival, actual Nari identity, verified social dock, Haven CTA, and Meet Nari path |
| `/meet-nari/` | `pages/meet-nari/index.html` | Primary | Privacy-safe identity, roles, symbols, boundaries, lore status |
| `/streams/` | `pages/streams/index.html` | Primary | Stream feeling, curated moments, live/archive doors, schedule truth |
| `/nail-studio/` | `pages/nail-studio/index.html` | Primary | Authentic nail practice, education, future approved gallery |
| `/haven/` | `pages/haven/index.html` | Primary | Community values, belonging, progressive Discord discovery |
| `/resources/` | `pages/resources/index.html` | Primary | Reviewed recommendations and material-relationship disclosure |
| `/work-with-nari/` | `pages/work-with-nari/index.html` | Primary | Collaboration fit, boundaries, process, approved contact |
| `/stories/` | `pages/stories/index.html` | Secondary | Curated, privacy-reviewed memories and media |
| `/support/` | `pages/support/index.html` | Secondary | Free and financial support with explicit boundaries |
| `/credits/` | `pages/credits/index.html` | Secondary | Public-safe creative credits, pending attribution and display-permission boundaries |
| `/the-prinny-cult/` | `pages/the-prinny-cult/index.html` | Hidden | Optional original joke reward |
| `/404.html` | `pages/404.html` | System | Static-host recovery |

Adding, removing, renaming, or re-ranking a route requires updates to architecture, IA, page specs, validation, tests, metadata, and deployment behavior.

## Repository truth

| Concern | Confirmed implementation |
|---|---|
| Canonical repository | Public `SomberKrow/NariNuna`; public visibility is not asset or release permission |
| Default / current review | `main`; `kiva/nari-experience-refinement` stacked on open PR #12 |
| Package manager | npm, committed `package-lock.json` |
| Runtime floor | Node.js 22.13+ |
| Framework | Vue 3.5.x + TypeScript 5.9.x |
| Build | Vite 8.2.x true MPA |
| Navigation | Vue Router 5.2.x + ordinary top-level anchors |
| Styling | SCSS + semantic CSS custom properties |
| Motion | Motion for Vue for isolated UI; CSS for small states |
| Validation | ESLint, `vue-tsc`, Vitest, Vite build, HTML output validator |
| Deployment | Provider and production domain not locked |
| Trusted backend | None |
| Forms/analytics/CMS | None |

Exact installed versions come from `package-lock.json`, not this prose.

## Terminology

| Term | Approved use |
|---|---|
| Nari's Haven / the Haven | Website world and community space; proper name |
| Ghosties | Public community/mascot term; never a donor tier |
| Nari theme | Default sunset and amber-lamp atmosphere |
| Dark theme | Same Haven at night; warm near-black/plum |
| Light theme | Same Haven in bright autumn afternoon; cream/linen |
| Nail Studio | Creative and educational room; not a salon or services claim |
| Story Time | Selected, approved stories and media; not an automated feed |
| Work With Nari | Professional collaboration route; not a corporate rebrand |
| placeholder | Explicit temporary project asset/content state; never canonical by implication |

## Current asset truth

No Nari-supplied production artwork was available at the implementation snapshot. The repository contains three locally generated and visibly noncanonical placeholder families:

- Haven environment;
- lavender Ghostie mascot;
- Nail Studio environment with no person, hands, finished nails, brand, or service claim.

No Nari model, commissioned banner, emote, panel, logo, or nail photograph has been copied or hotlinked. Three YouTube thumbnails support verified outbound Shorts without loading a player.

Every asset change is governed by `06_ASSET_MANIFEST_AND_ART_PIPELINE.md`. Public visibility is not permission.

## Public-link truth

The implementation snapshot contains these destinations, last recorded as checked on 2026-08-13:

- Twitch: <https://www.twitch.tv/nari_nuna>
- YouTube: <https://www.youtube.com/@Nari_Nuna>
- VOD archive: <https://www.youtube.com/@NariNunaVod>
- X: <https://x.com/Nari_Nuna>
- TikTok: <https://www.tiktok.com/@narinuna>
- Instagram: <https://www.instagram.com/narinunagotu>
- Linktree: <https://linktr.ee/NariNuna>
- Throne: <https://throne.com/narinuna>
- Discord candidate: <https://discord.com/invite/f25YtvtnbV>

Verification dates are volatile evidence. Recheck links, handles, invite destination, content rating, and ownership before release. Do not silently substitute a nearby account.

## Privacy and truth boundary

Do not publish:

- legal/private identity, precise location, private phone or email;
- private family, relationship, home, moving, or employment details;
- private messages, Discord content, or community identifiers without approval;
- raw files containing EXIF/IPTC/GPS or revealing filenames/backgrounds;
- fabricated lore, testimonials, schedule, metrics, partnerships, services, credentials, or price claims;
- secrets, API keys, webhooks, tokens, moderation credentials, or affiliate credentials;
- adult-marked content without advance opt-in labeling.

Every `VITE_*` value is public. The client has no trusted secret boundary.

## Launch blockers and safe defaults

| Decision/input | Severity | Safe current state | Clearance evidence |
|---|---:|---|---|
| CatDog ↔ Grim Reaper canon | Critical | Neutral big-sister copy; lore hold | Nari-approved wording record |
| Current character/model art | Critical | Ghostie placeholder | Owner/artist/rights/crop record |
| Official Ghostie/emotes/logo | Critical for canonical visual launch | Original placeholder labelled | Website-use and derivative approval |
| Real nail gallery/education | Critical for flagship promise | Honest empty gallery | Approved originals, labels, review, EXIF scan |
| Canonical Discord invite | Critical for community CTA | Candidate only; reverify/hide on failure | Destination verification at release |
| Professional contact/media kit | High | Public Linktree/X only; no form/numbers | Approved contact and metric snapshots |
| Stories/resources/schedule | Medium | Curating/no-schedule states | Per-record approval and provenance |
| Hosting/domain/headers/rollback | Critical for production | Portable static artifact | Completed release evidence record |
| License/legal/analytics choice | Critical for operations | All rights reserved; collect nothing | Owner decision and, where needed, counsel |

## Explicit non-goals

- Linktree clone or exhaustive social wall on Home.
- Generic purple VTuber template, streamer-neon dashboard, glassmorphism card farm, or corporate creator kit.
- Ecommerce, nail bookings, salon services, accounts, user posts, DMs, chat, or Discord replacement.
- Runtime platform scraping, algorithmic feeds, autoplay embeds, or surveillance analytics.
- Lore encyclopedia built from inference.
- Multi-brand framework abstracted before a second real consumer exists.
- Deployment-provider lock-in before the host is chosen.

## Decision test

Before accepting a product change, answer:

1. Does it make Nari more specific or merely make the site busier?
2. Is the claim approved and the asset permitted?
3. Does the change preserve the Haven's warmth and boundaries?
4. Does it work at 320px, with keyboard, reduced motion, and all themes?
5. Does it preserve the true MPA and static-host portability?
6. Is the maintenance owner and expiry rule clear?

If any answer is unknown, record the unknown. Do not style around it.
