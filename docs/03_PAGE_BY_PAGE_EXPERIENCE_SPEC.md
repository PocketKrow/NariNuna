> **Current direction, 2026-10-06:** [44 — Minimal Creator Reconstitution](44_MINIMAL_CREATOR_RECONSTITUTION.md) supersedes the environment-first layout, twelve-route contract, room navigation, doorway/secret interaction and WebGL requirements below. Earlier implementation descriptions are historical. Canon, truthful content, source preservation, rights and production approval boundaries remain.

# Page-by-Page Experience Specification

> **2026-10-05 vNext:** [Document 43](43_VNEXT_EXPERIENCE.md) owns the current experience. The guided bottom passage and Passport are retired; prior descriptions below are historical. Astro/static content, rights and release boundaries remain. All painted arrivals now have one composition owner; CSS/GSAP and selective deferred Three.js replace Motion-V.


> 2026-09-07 implementation delta: [integrated visual refinement](34_DISTINCTIVE_UI_REFINEMENT.md) records current layouts, style ownership, content disclosures, and observed QA. Earlier implementation descriptions below are historical where superseded; product and release requirements remain in force.

> 2026-09-08 mobile delta: below `48rem`, ordinary chapter openings use an art-first composition with overlapping copy, and Resources proceeds directly from its opening into the three shelves without category jump links. Desktop composition, shelf IDs, content order, actions, and publication gates are unchanged. See [document 35](35_MOBILE_FIRST_OVERHAUL.md).

**Status:** `IMPLEMENTED` foundation; final content/art acceptance `BLOCKED`  
**Owns:** Page purpose, sequence, dependencies, responsive behavior, failure state, and acceptance  
**Implementation files:** `src/pages/*.vue`, route HTML documents, page selectors in `src/styles/_pages.scss`  
**Update trigger:** Page composition, responsibility, primary action, dependency, or public claim changes

## 2026-08-23 authentic-artwork composition update

The owner-directed review redesign changes Home from a long scrolling gateway page to a single composed desktop viewport: actual Nari full-body model, theme-specific illustrated Haven room, concise welcome, verified social dock, a Haven action, and a Meet Nari link. The earlier three-card room rail was removed in the 2026-09-08 final quality pass. Mobile may scroll naturally. Home deliberately suppresses the shared footer; the remaining ordinary pages retain it.

Meet Nari centers the supplied model portrait and official emotes. Streams, Nail Studio, Haven, Resources, Work With Nari, Support, Stories, and 404 each receive route-specific scene, Ghostie, emote, or state artwork. The Nail Studio still contains no fabricated portfolio, client service, or qualification. The hidden optional room displays all 27 owner-supplied Prinny designs while keeping approved character identity/canon records empty. Exact route-by-route assets and outstanding public-rights blockers are recorded in [`23_AUTHENTIC_ARTWORK_IMPLEMENTATION.md`](23_AUTHENTIC_ARTWORK_IMPLEMENTATION.md).

## 2026-09-01 visual-composition refinement

The approved content and route responsibilities remain intact. Home now lets its face-safe hero and two actions carry the arrival without a secondary room rail. Meet Nari presents its three existing identity pillars as one asymmetrical illustrated spread rather than three equal cards. Streams gives Twitch dominant live-room weight, treats YouTube as a supporting archive destination, and varies the existing featured-moment shelf through the shared `MediaCard`. These are composition changes only; no routes or external destinations were added.

The same page-specific composition standard now extends to the remaining ordinary pages. Nail Studio uses a workbench sequence around its honest portfolio hold; Haven reads as a staggered community charter before the unchanged doorway; Resources separates its dominant category shelf from a dense varied demonstration catalog; Work presents collaboration fit and public links as an editorial ledger; Story Time treats one existing moment as the lead archive piece; and Support turns its three free-support actions into an illustrated generosity sequence. The hidden room, 404, page copy, routes, data, and external destinations remain unchanged.

## 2026-09-02 Nari-only review demo

Phase A removes the public atmosphere selector and fixes every route to Nari for client review. This is a reversible implementation proposal, not recorded Nari/Panda approval or a rewrite of the locked historical direction. See [`28_NARI_ONLY_ATMOSPHERE_DEMO.md`](28_NARI_ONLY_ATMOSPHERE_DEMO.md).

## 2026-09-02 environmental-continuity refinement

Phase B carries the chapter-banner environment into each ordinary route through restrained material cues rather than additional hero art. Meet Nari uses journal rules; Streams uses broadcast-desk rails; Nail Studio uses workbench boards and lacquer glints; Haven uses a rug lattice that darkens toward the doorway; Resources uses shelf uprights and ledges; Work uses correspondence rules; Story Time uses an album spine; and Support uses the quietest stitched-wall rhythm. Home remains unchanged because its existing single-scene composition already satisfies the environmental goal. Content order, actions, routes, artwork, and truth boundaries are unchanged. See [`29_ENVIRONMENTAL_CONTINUITY.md`](29_ENVIRONMENTAL_CONTINUITY.md).

## Shared page contract

Every ordinary page uses `SiteShell` and therefore receives:

- first-focusable skip link;
- shared sticky header and primary navigation;
- fixed Nari atmosphere metadata in the Phase A client-review demo;
- one `<main id="main-content">` region;
- shared footer on every ordinary page except the intentionally single-viewport Home arrival;
- low-priority Ghostie summoner;
- global focus, reduced-motion, responsive, and contrast styles.

The hidden room intentionally bypasses `SiteShell`. Every external media item is a thumbnail/text card and outbound link; no player SDK, autoplay, or embedded social feed loads.

Every page review asks:

1. Can the visitor name the page's purpose in the first meaningful viewport?
2. Is there one obvious next action without suppressing alternatives?
3. Is every claim approved and every image permitted?
4. Does the composition work at 320, 390, 768, and wide desktop?
5. Does the page remain complete with images blocked and motion reduced?
6. Does the route direct-load as its own document?

## Home — `/`

**Implementation:** `index.html`, `src/pages/HomePage.vue`  
**Primary audience:** All arrivals  
**Job:** Establish the Haven and route viewers, nail learners, community visitors, and professional visitors without becoming a link wall.  
**Emotional outcome:** “I can come in as I am, and there is more here.”

### Required sequence

1. Nari Haven environment and actual supplied Nari character model.
2. Concise big-sister identity, verified social dock, and primary Twitch action.
3. Secondary Meet Nari action.
4. The arrival remains complete inside the desktop viewport; deeper content belongs to its owning room and the shared header rather than a Home link rail.

### Action hierarchy

- Primary: Enter the Haven doorway sequence.
- Secondary: Meet Nari.
- Contextual: enter Streams, Nail Studio, Haven, or Work With Nari through the shared navigation.
- Not allowed in hero: direct Discord invite, Throne, affiliate product, newsletter, or generic all-links button.

### Asset and content dependencies

- responsive Haven environment with copy-safe crop;
- approved Nari portrait or explicit original placeholder;
- selected media with content rating, source, and verification date;
- approved high-level identity sentence.

### Responsive contract

- Hero copy remains left-weighted with an art-specific veil.
- At 45rem and below, the art uses the documented mobile `object-position`; re-test when art changes.
- The environmental painting receives the space previously reserved for the removed gateway rail.
- Host portrait precedes copy on narrow screens.
- Buttons become full-width only at the smallest breakpoint, not tablet by default.
- Fixed Ghostie never obscures hero or CTA.

### Failure and honesty states

- Broken remote thumbnail preserves title, description, and destination.
- Missing character art retains a visible placeholder label.
- No live-status claim is made unless sourced in real time; “Watch live” names Twitch but does not assert Nari is currently live.

### Acceptance

- The Haven identity and available next actions are understandable without scrolling.
- First viewport is not seven equal actions.
- Hero copy meets contrast in every theme and crop.
- LCP image uses an appropriate `srcset` candidate and explicit dimensions.
- Page has no copied platform/character art or hidden support pressure.

## Meet Nari — `/meet-nari/`

**Implementation:** `meet-nari/index.html`, `src/pages/MeetNariPage.vue`  
**Primary audience:** Fans, new viewers, professional visitors  
**Job:** Present a warm, specific, privacy-safe public identity and name unresolved canon honestly.  
**Emotional outcome:** “I understand who Nari is without being invited into private life.”

### Required sequence

1. Identity hero and roles.
2. Three connected pillars: big-sister warmth, playful chaos, nail-art curiosity.
3. Emerald and sun/moon meaning.
4. Protection and boundary statement.
5. Explicit lore hold until canon is approved.

### Action hierarchy

- Primary contextual continuation: The Haven.
- Secondary: relevant creative/stream rooms if later introduced.
- No forced social follow or support action.

### Dependencies and blockers

- canonical CatDog ↔ Grim Reaper wording;
- current character render/version;
- artist credit and website/crop/derivative rights;
- Nari-approved heritage wording and art if expanded.

### Responsive contract

- Portrait/placeholder moves before copy below 56rem.
- Symbol columns stack below 45rem.
- Decorative lore image may hide; the lore explanation may not.
- Role tags wrap without becoming tiny or horizontally scrollable.

### Privacy and truth rules

- No legal name, precise location, age/birthday, private family/relationship detail, offline employment, or inferred biography.
- Heritage meaning is written as Nari's personal meaning, never generalized culture trivia.
- Do not merge identities in copy, illustration, metadata, or alt text.

### Acceptance

- Nari's roles feel like one person, not separate brands.
- Emerald meaning is textual and not color-only.
- Placeholder/canon state is unmistakable.
- Professional visitors learn personality and boundaries without private information.

## Streams — `/streams/`

**Implementation:** `streams/index.html`, `src/pages/StreamsPage.vue`, `src/data/media.ts`  
**Primary audience:** New and returning viewers  
**Job:** Communicate the feeling of a Nari stream and provide verified live/archive paths.  
**Emotional outcome:** “This sounds fun, warm, conversational, and a little chaotic.”

### Required sequence

1. Stream-feel hero.
2. Three-signal expectation panel.
3. Curated media moments.
4. Channel/content map.
5. Honest schedule state.

### Action hierarchy

- Primary: Twitch.
- Secondary: VOD archive and main YouTube.
- Story Time may continue the on-site journey.

### Data requirements

Each media moment requires unique ID, title, description, platform, HTTPS source, thumbnail/alt or fallback, content rating, state, and verification date. Nari approval is required before the release set is final.

### Responsive and media contract

- Signal panel stacks beneath copy at narrow widths.
- Media grid collapses 3 → 2 → 1.
- No controls below a 44px practical touch target.
- No Twitch/YouTube iframe, autoplay, feed script, or surprise audio.
- Adult-marked VODs receive visible opt-in context before navigation.

### Failure and stale states

- “No fixed schedule published here” is valid.
- Stale schedules are removed, not left with a quiet outdated badge.
- Failed thumbnails retain functional text links.
- If a selected clip is deleted, retire the record and re-review the set; do not redirect to an unrelated upload.

### Acceptance

- Experience precedes platform promotion.
- Selected clips are representative, approved, reachable, and correctly rated.
- Network inspection shows no third-party script or iframe.
- The page still makes sense with remote images blocked.

## Nail Studio — `/nail-studio/`

**Implementation:** `nail-studio/index.html`, `src/pages/NailStudioPage.vue`  
**Primary audience:** Nail learners, craft-curious viewers, collaborators  
**Job:** Treat Nari's self-taught practice as flagship creative and educational work without inventing professional services.  
**Emotional outcome:** “This craft is taken seriously, and the limits are honest.”

### Required sequence

1. Tactile studio atmosphere hero.
2. Gallery, process notes, and tool-cabinet pillars.
3. Reserved real-work gallery.
4. Scope and safety note.

### Action hierarchy

- Primary after content exists: approved gallery or guide.
- Secondary: related Resources.
- Never: Book now, services, clients, salon, consultation, medical advice.

### Asset and content dependencies

- original nail photographs at sufficient detail;
- creator/photographer permission;
- labels, techniques, materials, and dates approved by Nari;
- metadata/privacy inspection;
- educational claims reviewed and appropriately sourced;
- product relationships disclosed.

### Gallery contract

- Use semantic figures/cards with explicit dimensions and responsive sources.
- Preserve color and detail; do not over-compress or beauty-retouch the result.
- Captions own title, context, technique, and credit; alt describes visible design.
- Generated environment art may set atmosphere but never occupy a portfolio slot.
- A detail view must be keyboard, touch, screen-reader, and reduced-motion complete before introduction.

### Responsive contract

- Hero retains desk detail while veil protects text.
- Gallery becomes one readable column when detail would otherwise become too small.
- Fine-detail images may justify a larger budget only with recorded review.

### Safety contract

- Nari's firsthand practice is not medical authority.
- Allergy, infection, chemical exposure, or nail-health topics include a scope statement and point health decisions to a qualified professional.
- No “safe for everyone,” sanitation guarantee, or diagnosis.

### Acceptance

- Every displayed work is real, approved, credited, metadata-clean, and accurately described.
- Visitors cannot reasonably infer a salon/service offering.
- The gallery is excellent with real content or honestly absent—never counterfeit.

## The Haven — `/haven/`

**Implementation:** `haven/index.html`, `HavenPage.vue`, `HavenDoor.vue`, `LooseFloorboard.vue`  
**Primary audience:** Current and prospective community members  
**Job:** Make values tangible, create belonging, and reveal Discord after context.  
**Emotional outcome:** “This room is warm because it has standards.”

### Required sequence

1. Values hero.
2. Four community principles.
3. Found-family signals.
4. Progressive Haven door.
5. Optional loose floorboard.

### Haven door state contract

| State | Meaning | Action |
|---:|---|---|
| 0 | The Haven is more than an invite | Knock gently |
| 1 | Difference belongs; cruelty does not | Leave the armor by the door |
| 2 | Kindness and boundaries are promised | Promise kindness |
| 3 | Invite becomes available | Enter Discord or reset |

This is narrative context, not authentication. The destination anchor only exists in state 3.

### Invite failure contract

At release, verify that the selected code resolves to the intended guild. If it fails:

- hide or disable the final external action;
- say the doorway is being repaired;
- provide only a verified public routing surface;
- preserve all values content and local interaction;
- do not guess, scrape, or rotate another code.

### Responsive and accessibility contract

- Door art stacks above content below 56rem.
- Controls remain ordinary buttons with visible text.
- State change is understandable without progress-bar color or motion.
- Floorboard advances through three labelled knocks, reveals an original supplied Prinny gatekeeper, and accepts the visible `Dood.` password.
- Incorrect passwords give harmless text feedback; the hidden-route anchor exists only after the correct answer.
- The physical floorboard illustration and password options work with keyboard, touch, and reduced motion.
- Secret remains optional and absent from ordinary task paths.

### Acceptance

- Values explicitly include dignity, respect, care, cooperation, boundaries, and room for different energy levels.
- “Positive vibes only” is not used to suppress real concerns.
- Discord never appears globally as a pressured conversion.
- Pointer, touch, and keyboard complete both interactions.

## Resources — `/resources/`

**Implementation:** `resources/index.html`, `ResourcesPage.vue`, `src/data/content.ts`  
**Primary audience:** Nail learners, creators, viewers  
**Job:** Hold approved recommendations with context and transparent relationships.  
**Emotional outcome:** “Nari is sharing what helped, not running a storefront.”

### Required sequence

1. Recommendation promise.
2. Curating/published categories.
3. Disclosure principles.
4. Verified social directory.

### Publication gate per item

- Nari has used/reviewed or explicitly approved the item.
- The “why” and “best for” text is factual.
- Relationship is one of none, affiliate, gifted, or sponsored.
- Material connection has a visible disclosure.
- Price/availability claims are dated or omitted.
- Destination is HTTPS and verified.

### Acceptance

- Curating states explain the standard without fake products.
- No affiliate relationship is hidden.
- No urgency, discount theater, or universal-safety claim.
- Whole-card links have visible focus and readable purpose.

## Work With Nari — `/work-with-nari/`

**Implementation:** `work-with-nari/index.html`, `WorkWithNariPage.vue`  
**Primary audience:** Brands, creators, collaborators  
**Job:** Explain fit, process, boundaries, and the approved next step quickly.  
**Emotional outcome:** “Nari is distinctive, prepared, and easy to evaluate.”

### Required sequence

1. Professional-but-Nari hero.
2. Evidence-before-numbers statement.
3. Potential fit categories.
4. Context/scope/fit inquiry process.
5. Approved contact or honest hold.

### Claims gate

- Metrics require first-party source, platform, metric definition, measurement window, and publication approval.
- Partnerships/case studies require permission and current-status review.
- Deliverables, usage rights, approvals, compensation, and deadlines are named as discussion topics, not pre-agreed terms.
- Contact information must be explicitly public/business-approved.

### Acceptance

- Fit and next step are clear without fake numbers or testimonials.
- Copy remains warm and specific, not generic creator-economy jargon.
- No private email or nonfunctional form appears.
- Mobile is concise and unobstructed.

## Support — `/support/`

**Implementation:** `support/index.html`, `SupportPage.vue`  
**Primary audience:** Visitors choosing whether/how to support  
**Job:** Establish that presence counts, then offer free and optional financial actions without entitlement.  
**Emotional outcome:** “I do not owe money to belong here.”

### Required sequence

1. Presence-is-enough hero.
2. Explicit financial boundary.
3. Free support methods.
4. Optional approved financial destination.

### Prohibited patterns

- countdowns, scarcity, guilt, hardship implication;
- donor rankings, public status tiers, intimacy promises;
- sticky donation UI or financial action before optionality;
- language implying control, access, ownership, or a claim on Nari's time.

### Acceptance

- A visitor who spends nothing is explicitly valued.
- Throne remains secondary to presence/sharing/kindness.
- External commerce is clearly identified and optional.
- Unavailable support methods are removed rather than replaced with guesses.

## Story Time — `/stories/`

**Implementation:** `stories/index.html`, `StoriesPage.vue`, future typed story records  
**Primary audience:** Fans, VOD visitors, returning community  
**Job:** Preserve selected public moments intentionally rather than scraping a feed.  
**Emotional outcome:** “These memories were chosen and cared for.”

### Required sequence

1. Archive purpose.
2. Current selected moments.
3. Future story-system promise and public VOD route.

### Publication gate

- approved publish state;
- privacy review;
- source/provenance;
- content rating and warning where needed;
- participant permission/redaction for community material;
- removal/correction owner;
- optional rights-cleared asset.

### Acceptance

- Drafts render nothing publicly.
- Adult material is opt-in before preview/navigation.
- Removing a record does not require layout surgery.
- Private messages and casual stream remarks are not assumed permanently publishable.

## Credits — `/credits/`

**Implementation:** `credits/index.html`, `CreditsPage.vue`, `src/data/artCredits.{json,ts}`
**Primary audience:** Artists, contributors, Nari, maintainers and visitors checking provenance
**Job:** Name confirmed makers, keep incomplete attribution visible, and separate public credit approval from artwork-display permission.
**Emotional outcome:** “The work and the people behind it are being treated carefully.”

### Required sequence

1. Brief explanation of the honest credit policy.
2. Registry-driven creative groups and contributor/pending entries.
3. Clear verified, awaiting-confirmation and project-created states.
4. Correction path through existing public profiles.

### Acceptance

- No artist, link, ownership, commission term or permission is guessed.
- Blocked records never render publicly; known pending records remain valid and visible.
- Credit approval and artwork-display approval are separate fields.
- The page remains understandable with no images and ships no source master.
- Every meaningful registered asset family has an explicit disposition.
- Credits remains secondary/footer navigation and a real MPA document.

## Hidden Prinny Cult — `/the-prinny-cult/`

**Implementation:** `the-prinny-cult/index.html`, `PrinnyCultPage.vue`  
**Primary audience:** Optional explorers  
**Job:** Reward curiosity with a theatrical, accessible, entirely optional Prinny initiation and the untouched supplied collection.  
**Emotional outcome:** “That was absurdly committed and clearly extra.”

Required:

- immediate visible return link and a second clear exit after the experience;
- `noindex, nofollow` metadata and no normal-navigation placement;
- supplied original Prinny designs and existing project-made ceremonial assets only;
- a full-width, purpose-painted, character-free underground sanctuary featuring three separately composed actual supplied Prinnies and a readable warning plaque;
- a second purpose-painted, character-free ceremonial altar with three individually labelled, sequentially enabled candle/offering/oath hotspots;
- three explicitly labelled, button-operated rites: light the candle, offer the sardine, and speak `DOOD`;
- an optional tongue-in-cheek oath before the visitor-only ceremonial role appears;
- all 27 supplied artwork designs with their existing neutral alt text, optional noncanonical witness whispers, and no fabricated individual names, biographies, ranks, or canon;
- three plainly fictional rules that reinforce safety, kindness, and the joke;
- an optional sardine counter capped at 11 with polite status and a visitor-only bonus title;
- responsive composition from 320px, reduced-motion parity, and no autoplay audio;
- no global shell by design, required information, financial ask, or conversion.

Obscurity is not security. Never store private content on this route.

## 404 — `/404.html`

**Implementation:** `404.html`, `NotFoundPage.vue`  
**Job:** Explain the failure and return home.  
**Required:** `noindex`, no external dependency, explicit Home action, host-level unknown-route mapping.  
**Acceptance:** Direct host testing proves unknown URLs actually serve this document with the intended status behavior.
