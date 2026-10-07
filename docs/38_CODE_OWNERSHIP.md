> **Current direction, 2026-10-06:** [44 — Minimal Creator Reconstitution](44_MINIMAL_CREATOR_RECONSTITUTION.md) supersedes the environment-first layout, twelve-route contract, room navigation, doorway/secret interaction and WebGL requirements below. Earlier implementation descriptions are historical. Canon, truthful content, source preservation, rights and production approval boundaries remain.

> Current ownership: document 44 and ADR-013 supersede the historical room/component table below. The active cascade is `_creator.scss`; unused room styles, MediaCard, SectionHeading, GhostieArt and ArtworkCreditLink have been deleted. Astro owns all seven documents; only SocialDock and ResponsiveArtwork remain as server-rendered Vue primitives.

# Code ownership and maintenance comments

> **2026-10-05 vNext:** [Document 43](43_VNEXT_EXPERIENCE.md) owns the current experience. The guided bottom passage and Passport are retired; prior descriptions below are historical. Astro/static content, rights and release boundaries remain. All painted arrivals now have one composition owner; CSS/GSAP and selective deferred Three.js replace Motion-V.


> **2026-10-03 Astro migration:** Jake explicitly requested the rebuild in Astro. ADR-011 and [42 — Astro rebuild](42_ASTRO_REBUILD.md) own the current route, shell, dependency, validation and rollback contracts. Vite-MPA/client-router paths below are dated history. Product content, imagery, privacy and release approval boundaries still apply.

**Reviewed:** 11 September 2026, maintenance branch based on `8c7fe67`.

The 101 baseline code-bearing files and the new reduced-motion regression test have local explanatory coverage. Notes explain responsibility, ordering, failure/cleanup, semantic regions and cascade boundaries; they are not a comment on every line. Existing substantive comments remain. Source-only TS/SCSS comments do not constitute a delivery-size regression; public HTML/vector comments can remain in deployment.

Coverage below records the ownership review and actual annotation location, not a regex-based quality gate. Behavioral risk is checked separately: 23 active templates compile identically; global CSS declarations match the baseline after excluding 59 unused cult groups; nine inline style blocks preserve declaration order. Browser keyboard, visual, network and accessibility review remain pending. Comments must never satisfy a missing implementation accidentally in source-string tests.

## Primary code inventory

All entries below were reviewed for responsibility and given/retained explanatory source comments. The SVG and strict-data exceptions follow this table.

| File | Classification | Local explanation |
| --- | --- | --- |
| `.github/workflows/ci.yml` | tooling / regression | Read-only permissions, locked Node 22 install and the actual quality-gate boundary. |
| `eslint.config.mjs` | tooling / regression | Apply Vue template linting and TypeScript parsing together; formatting exceptions preserve authored markup without disabling correctness rules. |
| `pages/404.html` | active | Document metadata/registry synchronization; generated hero preload or noindex boundary. |
| `pages/haven/index.html` | active | Document metadata/registry synchronization; generated hero preload or noindex boundary. |
| `pages/index.html` | active | Document metadata/registry synchronization; generated hero preload or noindex boundary. |
| `pages/meet-nari/index.html` | active | Document metadata/registry synchronization; generated hero preload or noindex boundary. |
| `pages/nail-studio/index.html` | active | Document metadata/registry synchronization; generated hero preload or noindex boundary. |
| `pages/resources/index.html` | active | Document metadata/registry synchronization; generated hero preload or noindex boundary. |
| `pages/stories/index.html` | active | Document metadata/registry synchronization; generated hero preload or noindex boundary. |
| `pages/streams/index.html` | active | Document metadata/registry synchronization; generated hero preload or noindex boundary. |
| `pages/support/index.html` | active | Document metadata/registry synchronization; generated hero preload or noindex boundary. |
| `pages/the-prinny-cult/index.html` | active | Document metadata/registry synchronization; generated hero preload or noindex boundary. |
| `pages/work-with-nari/index.html` | active | Document metadata/registry synchronization; generated hero preload or noindex boundary. |
| `scripts/audit-assets.mjs` | tooling / regression | Read-only public-asset inventory from repository root. |
| `scripts/hero-preloads.ts` | tooling / regression | Build-time registry projection; use the same hero bands as CSS/picture consumers to prevent competing image downloads. |
| `scripts/prepare-client-assets.sh` | tooling / regression | Supplied input paths, connected-background removal, retained originals and asset-pack copy provenance. |
| `scripts/prepare-responsive-artwork.py` | tooling / regression | Source preservation, non-upscaling, budget loop, immutable hashes and synchronized full/runtime output. |
| `scripts/prepare-storybook-assets.sh` | tooling / regression | Master-directory inputs, output replacement, crop/alpha decisions and retained versus public destinations. |
| `scripts/validate-build.mjs` | tooling / regression | Run from repository root after Vite. |
| `scripts/validate-performance.mjs` | tooling / regression | Run from repository root on dist. |
| `scripts/verify-preview.mjs` | tooling / regression | Verify HTTP retrieval and metadata, not pixels or final host headers. |
| `src/App.vue` | active | Own the shell decision and body route marker used by composition CSS. |
| `src/components/art/GhostieArt.vue` | active | Map named Ghostie poses through the responsive registry. |
| `src/components/art/ResponsiveArtwork.vue` | active | Native single-img delivery with intrinsic dimensions. |
| `src/components/haven/HavenDoor.vue` | active | Presentation and focus owner for the three-knock sequence. |
| `src/components/haven/LooseFloorboard.vue` | active | One optional local toggle exposes the tiny basement link. |
| `src/components/layout/RoomPassage.vue` | active | Derive adjacent rooms from the reviewed journey order. |
| `src/components/layout/SiteFooter.vue` | active | Select a room-specific closing note and a deliberate subset of public profiles without duplicating volatile destinations. |
| `src/components/layout/SiteHeader.vue` | active | Own mobile-directory state, native More disclosure and keyboard focus. |
| `src/components/layout/SiteShell.vue` | active | Shared landmarks for ordinary documents; RoomPassage decides its own route eligibility. |
| `src/components/ui/GhostieSummoner.vue` | dormant / retained | Dormant optional visitor widget; SiteShell does not mount it. |
| `src/components/ui/MediaCard.vue` | active | One outbound link owns each clip. |
| `src/components/ui/SectionHeading.vue` | dormant / retained | Dormant reusable heading retained for maintenance; current room pages own distinct headers. |
| `src/components/ui/SocialDock.vue` | active | Render the shared public-profile directory in its reviewed order. |
| `src/composables/useHavenDoor.ts` | active | Three-knock state, one-way image eligibility, observer fallback and cleanup. |
| `src/composables/useReducedMotion.ts` | dormant / retained | Retained motion preference helper for the dormant summoner; each consumer must own and release its own media-query listener. |
| `src/data/artwork.ts` | active | Logical responsive keys versus direct asset URLs and retained alternate scenes. |
| `src/data/artworkDelivery.ts` | active | Compact runtime lookup, sorted-width/capped selection and shared hero-band algorithms. |
| `src/data/content.ts` | active | Shared editorial records for values, shelves and identity. |
| `src/data/easterEgg.ts` | active | Only this supplied design appears in the tiny joke; the full collection remains publicly retained by separate asset contracts. |
| `src/data/journey.ts` | active | Ordered nine-room journey, independent of header grouping. |
| `src/data/media.ts` | active | Curated outbound moments, not a live feed. |
| `src/data/navigation.ts` | active | Canonical document destinations and visibility groups. |
| `src/data/prinnyCult.ts` | dormant / retained | Retained collection and contract data, not the current tiny page UI. |
| `src/data/resources.ts` | dormant / retained | Retained client-demo fixture used by tests only. |
| `src/data/socials.ts` | active | One public-profile directory feeds Home, Work and footer links. |
| `src/main.ts` | active | Bootstrap each real HTML document after its lazy route is ready; stale chunks get one guarded automatic recovery attempt. |
| `src/pages/HavenPage.vue` | active | Values precede the three-knock Discord threshold; the optional floorboard follows it. |
| `src/pages/HomePage.vue` | active | Own the uninterrupted Home arrival, centered character framing and single Haven destination; the shared shell supplies the room passage. |
| `src/pages/MeetNariPage.vue` | active | Own the introduction, identity journal and boundary note. |
| `src/pages/NailStudioPage.vue` | active | Present self-taught practice and the illustrated desk honestly. |
| `src/pages/NotFoundPage.vue` | active | Independent recovery view with a clear Home exit. |
| `src/pages/PrinnyCultPage.vue` | active | Standalone noindex Easter egg with two exits upstairs. |
| `src/pages/ResourcesPage.vue` | active | Render three stable shelf fragments with curating copy. |
| `src/pages/StoriesPage.vue` | active | Present the same curated moments as Streams in an album. |
| `src/pages/StreamsPage.vue` | active | Own the Twitch/YouTube broadcast desk. |
| `src/pages/SupportPage.vue` | active | Keep free support first and the optional wishlist subordinate. |
| `src/pages/WorkWithNariPage.vue` | active | Own the correspondence letter and native public-profile directory. |
| `src/router/index.ts` | active | Use browser history to resolve the current MPA document; top-level links remain ordinary anchors. |
| `src/router/routes.ts` | active | Lazy page modules correspond to the real documents in projectPages.json. |
| `src/router/scrollBehavior.ts` | active | Restore history before handling fragments; named shelves and the Haven door must remain valid direct-entry destinations. |
| `src/styles/_artwork-delivery.scss` | active | Density-band selection only; media thresholds must match heroBands in artworkDelivery.ts. |
| `src/styles/_base.scss` | active | Document defaults, reading primitives, focus/skip-link behavior and opt-in page transitions. |
| `src/styles/_chapters.scss` | active | Global route-signature materials and pacing. |
| `src/styles/_components.scss` | active | Global buttons, header/footer foundations and retained UI primitives. |
| `src/styles/_face-safe.scss` | active | Final character focal positions across desktop and tablet. |
| `src/styles/_mobile-first.scss` | active | Final phone composition layer after face-safe. |
| `src/styles/_pages.scss` | active | Legacy global page foundations retained where ownership overlaps. |
| `src/styles/_polish.scss` | active | Shared refinement layer after storybook, before chapters and final responsive layers. |
| `src/styles/_responsive.scss` | active | Foundation breakpoints and preference overrides. |
| `src/styles/_room-language.scss` | active | Shared interior typography and reading rhythm; each scoped room stylesheet owns its composition and decorative device. |
| `src/styles/_storybook.scss` | active | Integrated painting treatment over world geometry: palette, veils and room atmosphere. |
| `src/styles/_tokens.scss` | active | Semantic Nari palette, spacing, typography and motion values. |
| `src/styles/_world.scss` | active | Shared world geometry and initial hero composition. |
| `src/styles/main.scss` | active | Cascade entry: foundations, shared world/material layers, then image selection, reading rhythm, focal positions and final phone composition. |
| `src/styles/rooms/haven.scss` | active | Scoped textile charter and doorway approach. |
| `src/styles/rooms/meet-nari.scss` | active | Scoped identity journal and protective promise. |
| `src/styles/rooms/nails.scss` | active | Scoped illustrated workbench, learning notes and real-portfolio hold. |
| `src/styles/rooms/resources.scss` | active | Scoped three-shelf library and recommendation policy. |
| `src/styles/rooms/stories.scss` | active | Scoped memory album spacing and closing navigation. |
| `src/styles/rooms/streams.scss` | active | Scoped broadcast desk: lead/supporting hierarchy, centered thumbnails and tuning links. |
| `src/styles/rooms/support.scss` | active | Scoped free-support notes and subordinate wishlist. |
| `src/styles/rooms/work.scss` | active | Scoped painted correspondence margin, letter and native directory. |
| `src/types/content.ts` | active | Types describe current local content, not runtime validation or approved future CMS records. |
| `src/utils/chunkRecovery.ts` | active | Storage is optional: a denied write must never trigger an uncontrolled reload loop or erase already-mounted content. |
| `src/vite-env.d.ts` | active | Keep the Vite ambient triple-slash directive first. |
| `tests/artwork-contract.test.ts` | tooling / regression | Public-art inventory and source-string contracts prevent accidental identity replacement or retired UI restoration; they do not establish visual quality or rights. |
| `tests/artwork-delivery.test.ts` | tooling / regression | Byte/hash and selection contracts protect retained originals and emitted candidates; runtime projection equality rejects stale or oversized metadata. |
| `tests/asset-retention.test.ts` | tooling / regression | Exact hashes protect relocated masters and retired artwork. |
| `tests/chunk-recovery.test.ts` | tooling / regression | Storage doubles exercise one-attempt recovery and denied-storage behavior; no real browser reload is performed. |
| `tests/content-contract.test.ts` | tooling / regression | Local record and source contracts protect route count, safe destinations and content boundaries; no external destination is fetched. |
| `tests/document-contract.test.ts` | tooling / regression | Inspect every real HTML entry and registry to prevent metadata drift and accidental SPA collapse; serving is checked separately. |
| `tests/editorial-rhythm.test.ts` | tooling / regression | Source-level guards retain distinct room compositions and responsive reading rules. |
| `tests/environmental-signatures.test.ts` | tooling / regression | Structural style/source guards protect the room material language. |
| `tests/face-safe-composition.test.ts` | tooling / regression | Source-level crop and silhouette guards preserve intended focal variables; they cannot prove a face remains visible at a particular viewport. |
| `tests/haven-door.test.ts` | tooling / regression | Vue lifecycle hooks and IntersectionObserver are mocked; real refs/computed values exercise knock limits, reset and deferred-image eligibility. |
| `tests/interaction-contract.test.ts` | tooling / regression | Source-level navigation, focus and room-content invariants. |
| `tests/nari-atmosphere-demo.test.ts` | tooling / regression | Check deterministic Nari-only metadata and absence of persisted theme UI. |
| `tests/navigation-scroll.test.ts` | tooling / regression | Exercise fragment, history and ordinary-entry scroll decisions directly; preference mocks do not simulate physical browser motion. |
| `tests/reduced-motion.test.ts` | tooling / regression | Independent consumer lifetime under mocked mount/unmount and media-query events. |
| `tests/responsive-artwork-component.test.ts` | tooling / regression | SSR-rendered markup verifies single-image roots, attribute fallthrough and native picture ordering; network candidate choice requires a browser. |
| `vite.config.ts` | tooling / regression | Build eleven registry-owned HTML entries from pages into dist. |

## Strict formats and retained outputs

| File/family | Owner and update contract |
| --- | --- |
| `package.json` | npm scripts, engine and declared architecture. Document changes in technical architecture; install/audit behavior is explained in README and `.npmrc`. |
| `package-lock.json` | npm-generated exact resolution. Never hand-annotate or edit internals; changes require a focused dependency diff and fresh install/gate/audits. |
| `tsconfig.json` | Strict Vue/TS compile boundary; `vue-tsc` is the acceptance check. No JSON comments. |
| `src/data/projectPages.json` | `vite.config.ts`, Router records, hero-preload generator and document tests. Preserve eleven documents and Support’s existing social-image mapping. |
| `src/data/responsive-artwork.json` | Full integrity record from `prepare-responsive-artwork.py`; tests and validators consume hashes/bytes/settings. Never import it from browser code. |
| `src/data/responsive-artwork.runtime.json` | Compact generated projection from the same operation; keys, dimensions and ordered candidates are compared exactly by Vitest. No notice or provenance is shipped. |
| `src/assets/source/delivery/inventory.json` | Retained asset source path, previous URL and exact hashes. `asset-retention.test.ts` protects every entry. |
| `public/site.webmanifest` | Strict install metadata linked by HTML entries; icons and their sizes must remain synchronized. It does not imply a service worker/offline implementation. |
| `docs/evidence/**/npm-*.json` | Dated npm audit output. Preserve past evidence and create a new dated record; a zero count is time-bound. |
| `public/_headers` | Host-specific URL patterns, with `#` comments. `/*` is the all-path rule; current inline style bindings need the existing CSP allowance. |
| `public/robots.txt` | Crawler policy with supported `#` comments; not access control. |
| `.npmrc`, `.gitignore` | npm/cache/ignored-output intent, with native `#` comments; Python bytecode is explicitly ignored. |
| Raster artwork | Binary bytes remain unchanged; role, retention, crop/alpha and regeneration are documented in the generator and asset records. |

## SVG ownership

All 121 SVGs are retained. The 103 vectors in the streams, nails, resources, work, motifs, states and UI families are imported asset-pack snapshots copied by `prepare-client-assets.sh`. Their pack locations and copy contract are documented at that source boundary; no upstream generator is present in the repository. Do not invent one or annotate every generated shape.

The remaining 18 environment/Prinny vectors have concise local XML maintenance comments, preserving viewBox geometry, IDs, titles and descriptions. Their original generator is unrecorded. The comparison removed comments and normalized only inter-element whitespace; all 121 files retained identical remaining XML. No geometry, color, path, transform, gradient, filter, alpha or accessible text was edited.

| SVG | Ownership | Role |
| --- | --- | --- |
| `public/media/environments/haven-common-room.svg` | Retained editable snapshot | The Ghosties' cozy common room |
| `public/media/environments/haven-room-daylight.svg` | Retained editable snapshot | Nari's Haven on a bright autumn afternoon |
| `public/media/environments/haven-room-night.svg` | Retained editable snapshot | Nari's Haven after the moon comes out |
| `public/media/environments/haven-room-sunset.svg` | Retained editable snapshot | Nari's Haven at the golden edge of evening |
| `public/media/environments/streams-room.svg` | Retained editable snapshot | Nari's late-night streaming desk |
| `public/media/motifs/motif-autumn-leaf.svg` | Imported pack | motif-autumn-leaf |
| `public/media/motifs/motif-charm-trinket.svg` | Imported pack | motif-charm-trinket |
| `public/media/motifs/motif-cute-warning.svg` | Imported pack | motif-cute-warning |
| `public/media/motifs/motif-emerald-eye-spark.svg` | Imported pack | motif-emerald-eye-spark |
| `public/media/motifs/motif-fabric-stitch.svg` | Imported pack | motif-fabric-stitch |
| `public/media/motifs/motif-ghost-wisp.svg` | Imported pack | motif-ghost-wisp |
| `public/media/motifs/motif-heart-spark.svg` | Imported pack | motif-heart-spark |
| `public/media/motifs/motif-lavender-sprig-1.svg` | Imported pack | motif-lavender-sprig-1 |
| `public/media/motifs/motif-lavender-sprig-2.svg` | Imported pack | motif-lavender-sprig-2 |
| `public/media/motifs/motif-nail-polish-swipe.svg` | Imported pack | motif-nail-polish-swipe |
| `public/media/motifs/motif-ribbon-accent.svg` | Imported pack | motif-ribbon-accent |
| `public/media/motifs/motif-sickle-silhouette.svg` | Imported pack | motif-sickle-silhouette |
| `public/media/motifs/motif-soft-star.svg` | Imported pack | motif-soft-star |
| `public/media/motifs/motif-soul-flame.svg` | Imported pack | motif-soul-flame |
| `public/media/motifs/motif-sun-moon-celestial.svg` | Imported pack | motif-sun-moon-celestial |
| `public/media/nails/nails-brushstroke-divider-01.svg` | Imported pack | Nails brushstroke divider 01 |
| `public/media/nails/nails-brushstroke-divider-02.svg` | Imported pack | Nails brushstroke divider 02 |
| `public/media/nails/nails-brushstroke-divider-03.svg` | Imported pack | Nails brushstroke divider 03 |
| `public/media/nails/nails-environment-support.svg` | Imported pack | Nails environment support |
| `public/media/nails/nails-glitter-accent-01.svg` | Imported pack | Nails glitter accent 01 |
| `public/media/nails/nails-glitter-accent-02.svg` | Imported pack | Nails glitter accent 02 |
| `public/media/nails/nails-glitter-accent-03.svg` | Imported pack | Nails glitter accent 03 |
| `public/media/nails/nails-glitter-accent-04.svg` | Imported pack | Nails glitter accent 04 |
| `public/media/nails/nails-glitter-accent-05.svg` | Imported pack | Nails glitter accent 05 |
| `public/media/nails/nails-glitter-accent-06.svg` | Imported pack | Nails glitter accent 06 |
| `public/media/nails/nails-glitter-accent-07.svg` | Imported pack | Nails glitter accent 07 |
| `public/media/nails/nails-glitter-accent-08.svg` | Imported pack | Nails glitter accent 08 |
| `public/media/nails/nails-glitter-accent-09.svg` | Imported pack | Nails glitter accent 09 |
| `public/media/nails/nails-glitter-accent-10.svg` | Imported pack | Nails glitter accent 10 |
| `public/media/nails/nails-manicure-station-vignette.svg` | Imported pack | Nails manicure station vignette |
| `public/media/nails/nails-polish-bottle-illustration.svg` | Imported pack | Nail polish bottle illustration |
| `public/media/nails/nails-polish-ghostie.svg` | Imported pack | Nails polish ghostie |
| `public/media/prinny-cult/prinny-altar.svg` | Retained editable snapshot | Prinny Cult altar |
| `public/media/prinny-cult/prinny-cult-banner.svg` | Retained editable snapshot | Prinny Cult banner |
| `public/media/prinny-cult/prinny-cult-easteregg-reward.svg` | Retained editable snapshot | Prinny Cult easter egg reward |
| `public/media/prinny-cult/prinny-cult-entry-state.svg` | Retained editable snapshot | Prinny Cult entry state |
| `public/media/prinny-cult/prinny-cult-room.svg` | Retained editable snapshot | Prinny Cult room |
| `public/media/prinny-cult/prinny-membership-seal.svg` | Retained editable snapshot | Prinny Cult membership seal |
| `public/media/prinny-cult/prinny-offering-box.svg` | Retained editable snapshot | Prinny Cult offering box |
| `public/media/prinny-cult/prinny-pedestal.svg` | Retained editable snapshot | Prinny Cult pedestal |
| `public/media/prinny-cult/prinny-rank-badge-set.svg` | Retained editable snapshot | Prinny rank badge set |
| `public/media/prinny-cult/prinny-roster-card-template.svg` | Retained editable snapshot | Prinny roster card template |
| `public/media/prinny-cult/prinny-summoning-circle.svg` | Retained editable snapshot | Prinny Cult summoning circle |
| `public/media/prinny-cult/prinny-titleplate-template.svg` | Retained editable snapshot | Prinny titleplate template |
| `public/media/prinny-cult/prinny-warning-sign.svg` | Retained editable snapshot | Prinny Cult warning sign |
| `public/media/resources/resources-divider-celestial.svg` | Imported pack | resources-divider-celestial |
| `public/media/resources/resources-divider-lavender.svg` | Imported pack | resources-divider-lavender |
| `public/media/resources/resources-divider-wisp.svg` | Imported pack | resources-divider-wisp |
| `public/media/resources/resources-environment-support.svg` | Imported pack | Resources environment support vignette |
| `public/media/resources/resources-helper-ghostie.svg` | Imported pack | Resources helper ghostie |
| `public/media/resources/resources-section-icon-community.svg` | Imported pack | resources-section-icon-community |
| `public/media/resources/resources-section-icon-creator.svg` | Imported pack | resources-section-icon-creator |
| `public/media/resources/resources-section-icon-external-link.svg` | Imported pack | resources-section-icon-external-link |
| `public/media/resources/resources-section-icon-important.svg` | Imported pack | resources-section-icon-important |
| `public/media/resources/resources-section-icon-nails.svg` | Imported pack | resources-section-icon-nails |
| `public/media/resources/resources-section-icon-safety.svg` | Imported pack | resources-section-icon-safety |
| `public/media/resources/resources-section-icon-streaming.svg` | Imported pack | resources-section-icon-streaming |
| `public/media/resources/resources-section-icon-technical.svg` | Imported pack | resources-section-icon-technical |
| `public/media/resources/resources-section-icon-wellness.svg` | Imported pack | resources-section-icon-wellness |
| `public/media/states/state-404-lost-ghostie.svg` | Imported pack | 404 Lost Ghostie |
| `public/media/states/state-500-chaos-ghostie.svg` | Imported pack | 500 Chaos Ghostie |
| `public/media/states/state-coming-soon.svg` | Imported pack | Coming Soon |
| `public/media/states/state-contact-sent.svg` | Imported pack | Contact Sent |
| `public/media/states/state-empty-gallery.svg` | Imported pack | Empty Gallery |
| `public/media/states/state-empty-streams.svg` | Imported pack | Empty Streams |
| `public/media/states/state-loading.svg` | Imported pack | Loading |
| `public/media/states/state-no-results.svg` | Imported pack | No Results |
| `public/media/states/state-restricted.svg` | Imported pack | Restricted |
| `public/media/states/state-success.svg` | Imported pack | Success |
| `public/media/streams/streams-card-clips.svg` | Imported pack | Streams clips category artwork |
| `public/media/streams/streams-card-highlights.svg` | Imported pack | Streams highlights category artwork |
| `public/media/streams/streams-card-vods.svg` | Imported pack | Streams VOD archive category artwork |
| `public/media/streams/streams-loading-state.svg` | Imported pack | Streams loading state |
| `public/media/streams/streams-no-videos-state.svg` | Imported pack | Streams no videos state |
| `public/media/streams/streams-offline-state.svg` | Imported pack | Streams offline state |
| `public/media/streams/streams-platform-tiktok.svg` | Imported pack | TikTok |
| `public/media/streams/streams-platform-twitch.svg` | Imported pack | Twitch |
| `public/media/streams/streams-platform-youtube.svg` | Imported pack | YouTube |
| `public/media/ui/badges/badge-chaotic.svg` | Imported pack | badge-chaotic |
| `public/media/ui/badges/badge-community.svg` | Imported pack | badge-community |
| `public/media/ui/badges/badge-cozy.svg` | Imported pack | badge-cozy |
| `public/media/ui/badges/badge-ghostie-approved.svg` | Imported pack | badge-ghostie-approved |
| `public/media/ui/badges/badge-live.svg` | Imported pack | badge-live |
| `public/media/ui/badges/badge-nails.svg` | Imported pack | badge-nails |
| `public/media/ui/badges/badge-work.svg` | Imported pack | badge-work |
| `public/media/ui/decorations/button-decoration-set.svg` | Imported pack | button-decoration-set |
| `public/media/ui/decorations/form-field-decoration-set.svg` | Imported pack | form-field-decoration-set |
| `public/media/ui/decorations/social-link-button-style-set.svg` | Imported pack | social-link-button-style-set |
| `public/media/ui/nav/nav-haven-icon.svg` | Imported pack | nav-haven-icon |
| `public/media/ui/nav/nav-home-icon.svg` | Imported pack | nav-home-icon |
| `public/media/ui/nav/nav-meetnari-icon.svg` | Imported pack | nav-meetnari-icon |
| `public/media/ui/nav/nav-nails-icon.svg` | Imported pack | nav-nails-icon |
| `public/media/ui/nav/nav-prinnycult-icon.svg` | Imported pack | nav-prinnycult-icon |
| `public/media/ui/nav/nav-resources-icon.svg` | Imported pack | nav-resources-icon |
| `public/media/ui/nav/nav-streams-icon.svg` | Imported pack | nav-streams-icon |
| `public/media/ui/nav/nav-work-icon.svg` | Imported pack | nav-work-icon |
| `public/media/ui/theme/toggle-theme-icon-dark.svg` | Imported pack | toggle-theme-icon-dark |
| `public/media/ui/theme/toggle-theme-icon-light.svg` | Imported pack | toggle-theme-icon-light |
| `public/media/ui/theme/toggle-theme-icon-nari.svg` | Imported pack | toggle-theme-icon-nari |
| `public/media/ui/utility/ui-icon-arrow-left.svg` | Imported pack | ui-icon-arrow-left |
| `public/media/ui/utility/ui-icon-arrow-right.svg` | Imported pack | ui-icon-arrow-right |
| `public/media/ui/utility/ui-icon-check.svg` | Imported pack | ui-icon-check |
| `public/media/ui/utility/ui-icon-chevron-down.svg` | Imported pack | ui-icon-chevron-down |
| `public/media/ui/utility/ui-icon-close.svg` | Imported pack | ui-icon-close |
| `public/media/ui/utility/ui-icon-copy.svg` | Imported pack | ui-icon-copy |
| `public/media/ui/utility/ui-icon-expand.svg` | Imported pack | ui-icon-expand |
| `public/media/ui/utility/ui-icon-external-link.svg` | Imported pack | ui-icon-external-link |
| `public/media/ui/utility/ui-icon-info.svg` | Imported pack | ui-icon-info |
| `public/media/ui/utility/ui-icon-menu.svg` | Imported pack | ui-icon-menu |
| `public/media/ui/utility/ui-icon-volume-muted.svg` | Imported pack | ui-icon-volume-muted |
| `public/media/ui/utility/ui-icon-volume.svg` | Imported pack | ui-icon-volume |
| `public/media/ui/utility/ui-icon-warning.svg` | Imported pack | ui-icon-warning |
| `public/media/work/work-business-card-graphic.svg` | Imported pack | Work business card graphic |
| `public/media/work/work-contact-vignette.svg` | Imported pack | Work contact vignette |
| `public/media/work/work-environment-support.svg` | Imported pack | Work environment support |
| `public/media/work/work-inquiry-ghostie.svg` | Imported pack | Inquiry ghostie |
