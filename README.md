# Nari Nuna's Haven

A warm illustrated Astro website for Nari: streaming, self-taught nail art, community and creative collaboration. Twelve real static documents, focused Vue islands and ordinary links. The v1 engineering candidate preserves Main’s illustrated refinement merged in PR #33.

## Run

Node.js 22.13+ and npm:

```bash
npm ci
npm run dev
```

Production artifact and checks:

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

## Deploy to Google Cloud (Compute Engine VM)

This website is built as static files. On an existing Linux Compute Engine VM, use **Nginx to serve the generated `dist/` directory**. Node.js is required on the build machine only; the deployed website needs no running Node application, database or Astro adapter. The build can run on the administrator's workstation, CI or the VM.

These instructions target a Compute Engine VM. GCP account access, billing, VM administration, DNS, certificates, firewall rules, monitoring, operating-system updates and deployment/rollback are the hosting operator's responsibility. No GCP credentials are required by the website source.

### 1. Prepare their hosting environment

The hosting operator must:

- Install and manage Nginx on the VM using instructions appropriate to its operating system.
- Reserve/assign a stable external IP when exposing the VM directly, and point the approved domain's DNS to it. If an existing load balancer fronts the VM, use that endpoint instead.
- Configure the GCP and host firewalls for the chosen HTTP/HTTPS setup. Keep administrative access restricted.
- Configure HTTPS for the approved domain, redirect HTTP to HTTPS, and choose the canonical host. TLS may terminate on Nginx or an existing load balancer.
- Choose a dedicated document root and deployment user. Serve only the built artifact, never the repository root, source artwork or `node_modules/`.

Google's [Compute Engine web-server guide](https://docs.cloud.google.com/compute/docs/tutorials/basic-webserver-apache) covers VM access and networking using Apache as its example; the production server recommended here is Nginx. See also [static external IP configuration](https://docs.cloud.google.com/compute/docs/ip-addresses/configure-static-external-ip-address).

### 2. Build the production artifact

Use Node.js 22.13+ and npm. Check out the agreed deployment revision before building. Replace the example origin below with the approved real HTTPS domain; do not deploy with the example value.

```bash
git clone https://github.com/PocketKrow/NariNuna.git
cd NariNuna

export NARI_DEPLOY_CONTEXT=production
export NARI_SITE_ORIGIN="https://their-domain.example"

npm ci --include=dev
npm run check
```

For an existing checkout, select the agreed revision rather than cloning again. Development dependencies are needed during the build, even when the serving environment is production.

`npm run check` performs linting, type checks, the complete build pipeline, artifact validators, unit tests and local HTTP verification. It generates `dist/`, including canonical/social metadata, the public sitemap and the CSP hashes required by Astro's island loaders. Do not replace it with bare `astro build`.

Without explicit production context, builds deliberately remain noindex previews. Production context requires `NARI_SITE_ORIGIN`; neither the request hostname nor a temporary GCP endpoint is automatically treated as the canonical domain. The artifact assumes hosting at the domain root.

### 3. Publish with Nginx

Upload the **contents** of `dist/` to a versioned release directory and configure Nginx's document root to serve that directory. For example, a deployment-managed `current` symlink can select the active release. The administrator chooses paths and permissions appropriate to the VM.

Required Nginx behavior:

| Concern | Required configuration/result |
| --- | --- |
| Directory pages | Serve `index.html` within route directories, including direct requests to `/haven/` and `/meet-nari/` |
| Canonical paths | Redirect directory URLs without the trailing slash to their slash form, preserving query strings |
| Missing paths | Serve the branded `404.html` with HTTP **404**; do not use an SPA rewrite to `index.html` |
| HTML and unversioned files | `Cache-Control: public, max-age=0, must-revalidate` |
| `/assets/*` and `/media/responsive/*` | `Cache-Control: public, max-age=31536000, immutable` on successful asset responses; never overwrite bytes at an immutable URL |
| Security | Apply the generated security headers, including the complete CSP and loader hashes |
| Transfer | Enable gzip or Brotli where supported for eligible HTML, CSS, JavaScript and XML |

**Nginx does not automatically interpret `_headers`.** Translate the policy in **generated `dist/_headers`** into the server's actual response-header configuration. Do not copy the unhashed `public/_headers` CSP: it would block island hydration. Regenerate and deploy the matching header configuration with every build. On Nginx configurations where location-level `add_header` directives replace inherited headers, repeat/include the security policy in locations that set their own cache headers. See the [Nginx header-module documentation](https://nginx.org/en/docs/http/ngx_http_headers_module.html).

Keep the generated HTTPS-upgrade policy for production HTTPS. The repository's loopback HTTP test-server exception is not a production hosting setting. Check Nginx configuration with `nginx -t` before reloading it through the VM's normal service-management process.

**Do not use `npm start`, `npm run preview` or `npm run dev` as the production web server.** They are development/preview tools; fixing the preview startup contract does not change the static hosting architecture. See [Astro's preview documentation](https://docs.astro.build/en/reference/cli-reference/#astro-preview).

### 4. Verify, update and roll back

Before public launch, complete the existing approval and release checks in the [deployment and release runbook](docs/15_DEPLOYMENT_AND_RELEASE_RUNBOOK.md). A successful build does not clear unresolved release-readiness records.

After publishing, the hosting operator should:

1. Direct-load the registered routes and verify the real domain's canonical URLs and `/sitemap.xml`.
2. Confirm that a nonexistent URL returns the branded page with HTTP 404.
3. Inspect actual response headers, HTTPS redirects, cache policies and compression. A configuration file alone does not prove that GCP/Nginx applied it.
4. Check browser console/network output and exercise the mobile menu, three-knock invitation/reset and thumbnail fallback. Confirm no CSP or hydration failures.
5. Record the deployed revision/artifact and retain the previous working artifact **with its matching security-header configuration**.

For subsequent approved updates, build the selected revision again, validate it, and switch the artifact/header configuration together using the administrator's deployment procedure. Roll back to the previous verified pair if needed. A Node process does not need to remain running after the build.

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

`npm start` provides foreground local preview at 0.0.0.0:8080; `npm start -- --host 127.0.0.1 --port 8081` overrides those defaults. It requires `dist/`. Astro preview is not a production server: deploy the full pipeline’s static artifact and generated header policy. See [the deployment runbook](docs/15_DEPLOYMENT_AND_RELEASE_RUNBOOK.md).

Builds default to noindex previews with no canonical/sitemap. Only an explicit `NARI_DEPLOY_CONTEXT=production` plus the approved HTTPS `NARI_SITE_ORIGIN` emits absolute production metadata and the public sitemap. The final origin/host remain owner inputs; no domain is invented.

Read [the vNext implementation and current evidence](docs/43_VNEXT_EXPERIENCE.md), [the documentation hub](docs/README.md), and `AGENTS.md` before making changes. Earlier documents are dated history where superseded by the current implementation records.
