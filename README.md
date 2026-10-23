# Nari Nuna's Haven

A warm illustrated Astro website for Nari: streaming, self-taught nail art, community and creative collaboration. Twelve real static documents, focused Vue islands and ordinary links. The v1 engineering candidate preserves Main’s illustrated refinement merged in PR #33.

## Run

Node.js 22.13+ and npm:

```bash
npm ci
npm run dev
```

Local build checks and preview:

```bash
npm run check
npm run preview
```

Browser checks:

```bash
npx playwright install chromium
npm run verify:browser
npm run verify:experience
```

`NARI_BROWSER_PATH` can select an existing Chromium executable. `npm run verify:browsers` covers Chromium + Firefox after both are installed; `npm run verify:release-browsers` adds WebKit. Eight visual baselines cover Home, Meet Nari, Haven and Nails at 390/1440px. Inspect deliberate changes before running `npm run verify:visual-update`.

## Deploy to Google Cloud Run

The client uses **Cloud Run services with source deployment and Google's Node.js buildpacks**. Cloud Run builds the source into a container and launches the entrypoint selected by the buildpack, normally the `start` script in `package.json`. The website remains an Astro static build: the serving process delivers the generated files in `dist/`; no SSR migration or database is required.

This replaces the earlier Compute Engine VM instructions. The client does not need to provision a VM, install Nginx manually, reserve a VM IP or maintain an operating system for this deployment path. Cloud Run handles external HTTPS; the serving process receives HTTP inside the container.

**Current repository status:** `npm run build` produces the validated static artifact, but `npm start` still runs `astro preview --ignore-lock`. Astro preview is a local QA server, not the production entrypoint. The existing start configuration also defaults to port 8080 instead of reading Cloud Run's supplied `PORT`. A production static-serving entrypoint is still required before this repository can be treated as production-ready for Cloud Run. Updating this README does not implement that runtime change.

### 1. Configure the source build

Use the repository root as the source directory and Google's Node.js buildpack path in the client's existing Cloud Run/source-build integration. Deploy an agreed revision. Keep `package-lock.json` committed.

Configure these as **build environment variables**, not only runtime/service variables:

| Build variable | Value / purpose |
| --- | --- |
| `GOOGLE_NODEJS_VERSION` | `22.x.x`, selecting the CI-tested Node 22 line; the project requires Node 22.13+ |
| `GOOGLE_NODE_RUN_SCRIPTS` | `build`, running the repository's full build script |
| `NARI_DEPLOY_CONTEXT` | `production` for the approved public site |
| `NARI_SITE_ORIGIN` | The approved canonical HTTPS origin, with no path, query, fragment or credentials |

The custom build step needs both `dependencies` and `devDependencies`: TypeScript and other validators run during the build. Google's buildpack installs both for configured custom build steps by default; avoid install/build overrides that omit development dependencies.

The existing `build` script includes type checks, credit validation, Astro generation, generated CSP hashes and document/performance validation. Do not override it with bare `astro build`, skip it with an empty `GOOGLE_NODE_RUN_SCRIPTS`, or build the site on each container startup. CI's broader `npm run check` remains the quality gate.

The production origin is baked into canonical/social metadata and the sitemap. Changing only runtime variables will not rewrite already-built HTML; rebuild after an origin change. Preview builds should keep preview context so they remain noindex. A temporary Cloud Run URL is not automatically adopted as the production canonical origin.

### 2. Complete the application startup contract

Before production deployment, the repository's `start` script must launch a production static server that:

- Serves only the built `dist/` artifact and requires no build tools at startup.
- Listens on `0.0.0.0` and the injected `PORT` environment variable, with 8080 as a local default.
- Serves directory indexes and trailing-slash routes, and returns branded `404.html` responses with HTTP **404**.
- Applies the policy in generated `dist/_headers`, including exact CSP hashes; a Node server does not automatically interpret this file.
- Revalidates HTML/unversioned files and applies immutable caching to successful responses under `/assets/` and `/media/responsive/`.
- Starts in the foreground, fails clearly if the build is missing, and handles Cloud Run shutdown signals cleanly.

Any package needed by that entrypoint must be available as a production dependency. `npm run preview` remains the local Astro preview command.

Cloud Run injects `PORT` into the ingress container, defaulting to 8080; do not hardcode the serving port or bind only to localhost. Cloud Run terminates TLS, so the application should serve HTTP internally. External HTTPS security headers still apply: the repository's loopback HTTP QA exception is not the production policy.

Once this entrypoint is implemented and validated, the client's source-deployment workflow can build the repository and start it through `package.json`, without manual VM administration. Until then, a successful source build or a working preview process is not proof of a supported production deployment.

### 3. Verify the build and deployed revision

Local build verification uses Node.js 22.13+ and npm. Replace the example origin with the approved real domain:

```bash
export NARI_DEPLOY_CONTEXT=production
export NARI_SITE_ORIGIN="https://their-domain.example"

npm ci --include=dev
npm run check
```

This verifies the artifact; it does not certify the pending production entrypoint. After the startup change, exercise the production entrypoint with a nondefault `PORT`, direct routes, real 404s and emitted headers before deploying.

On the resulting Cloud Run revision, verify:

1. Successful startup/readiness on the injected port.
2. Direct route loads, canonical/social URLs, `/sitemap.xml` and preview/public indexing behavior.
3. Real response security/cache headers and the absence of CSP/hydration failures.
4. The mobile menu, three-knock invitation/reset, disabled-JavaScript invitation and thumbnail fallback.
5. A usable previous revision for rollback, retaining each revision's matching artifact and CSP policy.

The existing approval and release criteria in the [deployment and release runbook](docs/15_DEPLOYMENT_AND_RELEASE_RUNBOOK.md) still apply. This section owns the Cloud Run hosting guidance; the runbook's generic static-host contract does not imply that a VM or manual file upload is required.

### Hosting responsibilities and references

The client/hosting operator owns the Google Cloud project, billing, permissions, source-build trigger, Cloud Run service settings, public access/ingress, domain configuration, monitoring and revision rollout/rollback. Application changes belong in the repository; no GCP credentials belong in source code.

Official references: [source deployment](https://docs.cloud.google.com/run/docs/deploying-source-code), [Node.js buildpack build/start behavior](https://docs.cloud.google.com/docs/buildpacks/nodejs), [Cloud Run port/TLS/runtime contract](https://docs.cloud.google.com/run/docs/container-contract), and [Astro preview limitations](https://docs.astro.build/en/reference/cli-reference/#astro-preview).

## Architecture and source owners

| Concern | Owner |
|---|---|
| Static routes, shared metadata and preloads | `src/pages/`, `src/layouts/SiteLayout.astro`, `src/data/projectPages.json` |
| Illustrated arrivals | `src/components/astro/RoomArrival.astro`, `src/styles/objects/arrival.scss` |
| Room compositions and shared materials | `src/styles/rooms/`, `src/styles/_materials.scss` |
| Menu, three-knock door, floorboard, thumbnail fallback | Focused Vue components; no SPA/client router |
| Deferred choreography/atmosphere | `src/experiences/`, `src/shaders/` |
| Content, destinations and descriptions | Typed `src/data/` records; `rooms.ts` is a description registry, not a tour |
| Responsive artwork | Full provenance + compact runtime manifest, unchanged hashed WebP candidates |
| Credits and approval boundaries | `src/data/artCredits.json`, offline validator and independent release gate |
| Tests | Vitest, built-artifact validators, Playwright + axe and eight composition snapshots |

Astro 7, Vue 3, strict TypeScript, SCSS, Lucide, GSAP/ScrollTrigger and selective Three.js. No backend, CMS, database, account, analytics, form, iframe, heavy media player, Tailwind or UI kit. Native View Transitions were evaluated and disabled after rapid history navigation exposed browser abort errors. All navigation is immediate ordinary document navigation.

The static website is complete without decorative JavaScript. Required islands hydrate explicitly. Optional motion/graphics wait until load/idle, are skipped for reduced motion/save-data/mobile/coarse input and dispose on navigation/preferences. Home and Haven alone have a canvas. Pause/resume, visibility suspension and context-loss fallback keep atmosphere optional.

Initial JS/CSS stays below 120 KB gzip per route. Optional enhancement graph has an independent 180 KB ceiling; a capable Home/Haven session may transfer that additional code. Artwork budgets and exact CSP loader hashes remain enforced. Motion-V, the guided bottom room passage and Passport have been removed.

## Product and release boundaries

Preserve approved copy, original artwork, source masters, privacy, credit and permission records. Nail Studio is personal learning/practice; illustrated workspaces do not impersonate real nail work. Support never buys attention or access. The Prinny joke room remains separate and noindex. Resources, private biography, metrics, schedules, partnerships, contact and lore are never invented.

`npm run verify:release` rebuilds through the complete pipeline and remains blocked until actual client/content/rights/production-host/manual-QA records are cleared. On 19 October 2026, `npm audit --json` and `npm audit --omit=dev --json` both reported zero vulnerabilities after targeted Vue 3.5.44, selector parser 7.1.6 and source-map-js 1.2.2 patches. Reproduce audits on the intended lockfile; CI checks both trees at moderate severity or higher. This is dated evidence, not a permanent guarantee.

`npm start` currently provides foreground Astro preview at 0.0.0.0:8080; caller host/port flags override those defaults. It requires `dist/`. The Cloud Run production entrypoint remains pending as described in [the Cloud Run deployment section](#deploy-to-google-cloud-run).

Builds default to noindex previews with no canonical/sitemap. Only an explicit `NARI_DEPLOY_CONTEXT=production` plus the approved HTTPS `NARI_SITE_ORIGIN` emits absolute production metadata and the public sitemap. Cloud Run is the selected hosting service; the approved production origin and client-specific service settings remain operator inputs.

Read [the vNext implementation and current evidence](docs/43_VNEXT_EXPERIENCE.md), [the documentation hub](docs/README.md), and `AGENTS.md` before making changes. Earlier documents are dated history where superseded by the current implementation records.
