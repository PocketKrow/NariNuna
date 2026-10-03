# Nari Nuna’s Haven

A character-led late-fall refuge connecting Nari’s streams, self-taught nail art, community, stories and public profiles. Twelve prerendered Astro documents share focused Vue islands and responsive artwork; each room retains its own composition and metadata.

**Current architecture:** Astro 7 static MPA with Vue 3 islands, strict TypeScript and SCSS. The owner-directed rebuild starts from `main` at `c8af50f5921ea8851e738b310b16d24ce2b8fdbf`. [Migration and verification](docs/42_ASTRO_REBUILD.md) owns the current implementation; older dated architecture records are historical.

**Status:** client review. The active site uses one Nari atmosphere; final theme direction, canon, content, rights/credits, contact/Discord, host/domain and release QA decisions remain open. Public repository visibility is not artwork permission or production clearance.

## Start and verify

Use Node.js **22.13+** and npm. CI selects Node 22; the lockfile owns exact versions.

```bash
npm ci
npm run dev
```

```bash
npm run check
```

The required gate runs ESLint, strict Astro/Vue/TypeScript checks, the production build and validators, Vitest against the artifact, then HTTP preview verification. `dist/` is generated output; do not commit it.

| Command | Purpose |
| --- | --- |
| `npm run build` | Typecheck, validate credits, build the twelve documents and enforce document/artwork/graph budgets |
| `npm run validate:credits` | Validate attribution records, asset-family coverage, links and artwork-display boundaries |
| `npm run preview` | Serve the existing production build locally |
| `npm run verify:browser` | Chromium checks on the built artifact with its actual CSP; install once with `npx playwright install chromium` |
| `npm run verify:preview` | Start/stop a local preview and verify documents/assets; `NARI_PREVIEW_URL` can target an existing preview |
| `npm run lint` / `npm run typecheck` / `npm test` | Run an individual gate while editing |
| `npm run audit:assets` | Read-only asset reference/hash inventory; candidates are not deletion permission |
| `npm run artwork:prepare` | Regenerate responsive WebPs plus full and compact manifests; requires Python/Pillow with WebP |
| `npm audit --json` | Explicit full dependency advisory check; may exit nonzero when findings exist |
| `npm audit --omit=dev --json` | Separate production dependency advisory check |

`.npmrc` disables automatic install audits. A passing quality gate does not mean the dependency audit is clean. Current audit results and exposure analysis are in [the Astro rebuild record](docs/42_ASTRO_REBUILD.md); the dated maintenance audit in document 36 describes an older lockfile.

## Architecture and owners

Astro 7, Vue 3 islands, strict TypeScript, SCSS and Lucide. Vite remains the internal compiler and Vitest tooling; there is no client router or full-app bootstrap. Motion for Vue is retained only by the existing dormant Ghostie widget. Keep npm and the committed lockfile. No Tailwind, second scaffold, backend, CMS, analytics, account, form handler or embedded player is part of this foundation.

| Location | Responsibility |
| --- | --- |
| `src/pages/` | Twelve native Astro routes and page-specific compositions |
| `src/layouts/SiteLayout.astro` | Document metadata, preloads, landmarks and shared shell |
| `src/data/projectPages.json` | Shared document registry for build entries, preloads and validation |
| `astro.config.mjs`, `vitest.config.ts` | Static build with Vue integration; separate Vue/composable test compiler |
| `src/components/layout/` | Header, keyboard-aware mobile directory, ten-room passage and compact room-specific footer |
| `src/components/haven/`, `src/composables/useHavenDoor.ts` | Three-knock invitation, deferred interior, focus transfer, reset and optional floorboard |
| `src/components/art/` | Single-root native image delivery and decorative/meaningful Ghostie semantics |
| `src/components/ui/MediaCard.vue` | Outbound clips with a local fallback when remote thumbnails fail |
| `src/data/` | Local editorial records, destinations and artwork lookup keys |
| `src/styles/main.scss` | Explicit global cascade; final focal and phone layers follow shared foundations |
| `src/styles/rooms/` | Scoped page interiors, materials and reading layouts |
| `public/` | Directly served assets and host/crawler configuration; Astro copies every file |
| `src/assets/source/` | Retained source/retired artwork and preservation inventory; excluded from deployment |
| `scripts/`, `tests/` | Build, delivery, preservation and behavior contracts |

Top-level navigation uses ordinary anchors. Astro prerenders the page body, header and footer at build time. Only the menu, Passport, three-knock doorway, floorboard and media fallbacks hydrate. The hidden page supplies its own main landmark and sends no island JavaScript. `RoomPassage.astro` excludes recovery and secret routes. Native document navigation owns fragments and history; page content remains readable without JavaScript.

The complete [code ownership record](docs/38_CODE_OWNERSHIP.md) explains active versus dormant modules, per-file maintenance comments, strict JSON and imported SVG treatment. Dormant `GhostieSummoner`, `SectionHeading`, resource demo fixtures and the retained Prinny registry are not instructions to restore retired UI.

## Documents and navigation

| URL | Room and invariant |
| --- | --- |
| `/` | Centered Nari arrival, six public profiles, CTA to `/haven/#haven-door` |
| `/meet-nari/` | Introduction, identity journal and protective promise; preserve mobile reading space |
| `/streams/` | Twitch/YouTube and curated clips; no embedded player or fabricated schedule |
| `/nail-studio/` | Illustrated workspace, self-taught practice and honest real-photo hold |
| `/haven/` | Values before Discord; exactly three knocks; optional floorboard after the invitation |
| `/resources/` | Curating state with `#nail-desk`, `#creator-shelf`, `#game-pile`; no demo recommendations |
| `/work-with-nari/` | Painted correspondence, `#collaboration-note`, native public directory at `#nari-links` |
| `/stories/` | Curated memory album; no restored left stripe or invented stories |
| `/support/` | Free participation first, optional Throne/Twitch links and clear boundaries |
| `/credits/` | Public-safe creative ledger with explicit verified, pending and project-created states |
| `/the-prinny-cult/` | Tiny standalone noindex joke with two exits; all 27 supplied designs remain retained |
| `/404.html` | Independent recovery document; production unknown-path HTTP status belongs to the host |

Header priority is Home brand, Meet Nari, Streams, Haven and Work. More contains Resources, Nails, Story Time, Support and Credits. The ten-room journey has its own deliberate order in `journey.ts`; it appears on mobile and desktop.

## Artwork and performance

Render active scene/postcard/Ghostie lookup keys through `ResponsiveArtwork`, `heroStyle` or `heroSources`. Those keys may resemble former URLs, but originals now live outside `public/`. Supplied identity/emote/Prinny records still use direct public URLs.

The generator writes two synchronized representations:

- `responsive-artwork.json`: full source/candidate hashes, source locations, dimensions, encoder quality and byte evidence for tooling/tests.
- `responsive-artwork.runtime.json`: generated strict JSON containing only intrinsic dimensions and ordered candidate URL/dimensions for browser selection.

Do not hand-edit either output. The projection equality test rejects missing, reordered or stale candidates. Browser code must not import full provenance. The performance validator also rejects known provenance markers in shared JavaScript.

The existing 121 content-addressed WebPs retain their exact bytes, aspect ratios, alpha and crops. Hero CSS, native picture sources and head preloads share 768/1280/1672 width bands and density choices. Never change one consumer independently or reuse an immutable filename for different bytes. Door interior eligibility is deferred until proximity, focus or a knock; image failure never blocks the invitation.

| Existing budget | Ceiling |
| --- | ---: |
| Shared JS + CSS graph | 120 KB gzip |
| Additional route JS graph | 35 KB gzip |
| Additional route CSS graph | 12 KB gzip |
| Responsive candidate test ceiling | 150,000 bytes |
| Conservative Home composition | 200,000 bytes |

Graph gzip uses Node’s default `gzipSync` and unique emitted files. Shared bytes are reused across route graphs; do not add every row together or call a deployment-size saving an initial-page transfer saving. Source comments normally disappear from browser JavaScript/CSS; HTML/SVG comments may remain.

[Document 37](docs/37_SIZE_MAINTENANCE.md) owns exact before/after measurements, bounded CSS cleanup and current limitations. [Document 33](docs/33_RESPONSIVE_ARTWORK_PERFORMANCE.md) explains image selection. [The asset pipeline](docs/06_ASSET_MANIFEST_AND_ART_PIPELINE.md) and [asset disposition](docs/39_ASSET_DISPOSITION.md) own preservation.

## Safe maintenance

Read [AGENTS.md](AGENTS.md), the [documentation hub](docs/README.md), [source of truth](docs/00_PROJECT_SOURCE_OF_TRUTH.md), [current audit](docs/17_CURRENT_STATE_AUDIT.md), [governance](docs/16_GOVERNANCE_AND_DECISION_LOG.md) and the relevant specialist owner before substantial work.

Preserve source masters, public copy, character framing, semantic landmarks, focus continuity, reduced motion and direct fragment URLs. Add useful comments for responsibilities, state transitions, cleanup, ordering and cascade dependencies. Strict JSON and binary/imported outputs use owner/generator documentation rather than invalid inline comments.

For a new route, update the HTML entry, document registry, explicit Router import, page component, approved navigation/journey visibility, metadata/art mapping and owning docs together. Run the full gate and direct-load the built URL. Do not flatten distinct room designs into a generic template.

Use a focused branch and normal reversible commits. No force push, source-master deletion, merge, release or deployment is authorized as an optimization side effect.

## Browser and release checks

Automated source, SSR, build and HTTP checks do not establish rendered parity. Check all twelve routes at 320, 390, 768 and 1920 CSS px; include responsive thresholds, DPR 1/2, short phones and relevant wide screens. Exercise menus, Escape/Tab/focus return, all door steps/reset, floorboard/secret exits, thumbnail failure, fragments, refresh and back/forward. Complete reduced motion, zoom/reflow, screen reader, contrast and physical-device review.

The maintenance environment could not install Chromium. Structural equivalence is recorded; browser screenshots, network transfer and keyboard evidence remain pending. Lossy image changes and broad active-cascade consolidation were therefore deferred.

`public/_headers` expresses host intent, not verified production behavior. Its opening `/*` is a URL pattern, not a CSS comment. Only hashed built assets and responsive artwork receive immutable caching. Preserve the CSP’s current inline-style allowance while Vue binds artwork variables; remote thumbnails are limited to `i.ytimg.com`.

Deployment requires an approved host/domain, HTTPS, directory indexes, an actual unknown-path 404 response, effective headers, HTML revalidation and atomic rollback. Never put credentials in source or `VITE_*` variables. A hidden route, `noindex` or robots rule is not access control.

Release procedure and rollback are in [document 15](docs/15_DEPLOYMENT_AND_RELEASE_RUNBOOK.md); QA acceptance is in [document 12](docs/12_QA_ACCEPTANCE_CRITERIA.md). Rights and client approval remain separate from a green build.

## License and content authority

No repository license grants general reuse. Respect owner/artist/franchise rights and recorded restrictions. Nari owns her identity, voice and public content; Jake owns product/repository/release direction. Do not invent canon, credentials, services, testimonials, metrics, resources, inboxes or approval records.
