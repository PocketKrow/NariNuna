# Deployment and Release Runbook

Current contract: 19 October 2026. Repository `PocketKrow/NariNuna`, Astro static output; no Node adapter or production application server is required. Host/account/domain remain owner decisions. A hosting panel’s start field is not authority to change the architecture.

## Install, develop and preview

Node 22.13+ (CI: Node 22), npm and committed lockfile:

```bash
npm ci
npm run dev
npm run check
npm run preview
```

`dev` serves source with hot reload. `check` runs lint, full build/validators, tests and static HTTP checks. `preview` requires an existing `dist/` and defaults to localhost:4321. For issue #34’s preview contract:

```bash
npm start
npm start -- --host 127.0.0.1 --port 8081
```

`start` defaults to 0.0.0.0:8080; caller flags override configuration defaults. It calls Astro directly rather than forwarding through another npm script. Both preview scripts use `--ignore-lock` to stay in the foreground even in agent environments; stop them with Ctrl+C. Missing output produces Astro’s build-required error, never a development fallback. Failed binds/startup must exit or report failure visibly. The host/port startup regression runs real HTTP requests; process groups are stopped in `finally` blocks.

[Astro preview](https://docs.astro.build/en/reference/cli-reference/#astro-preview) is not a production server. Do not use `npm start` as the production serving contract. A container/server configuration can be supplied when the actual host is confirmed; no paid vendor or unknown operational endpoint is selected here.

## Environment and discovery

| Variable | Contract |
| --- | --- |
| `NARI_DEPLOY_CONTEXT` | `preview` by default, or explicit `production` |
| `NARI_SITE_ORIGIN` | Approved public HTTPS origin only, e.g. the eventual canonical host; no path, query, credentials, fragment or port |
| `NARI_BROWSER_PATH` | Optional existing Chromium executable for local QA |
| `NARI_PREVIEW_URL` | Optional externally managed URL for HTTP artifact verification; not a canonical source |
| `NARI_PREVIEW_PORT` | Optional local browser-QA listener port; otherwise ephemeral |

Set build variables in the build process environment. They are configuration, not secrets. No client/server secret is required. Production builds fail without `NARI_SITE_ORIGIN`; ordinary local work does not require it. Do not substitute a temporary deployment/localhost domain. Preview builds stay noindex even if an approved origin is available: no canonical/og:url or sitemap is emitted, robots disallows crawling and generated headers add `X-Robots-Tag`. Noindex is not access control.

An explicit production build emits absolute canonical/og:url and social-image URLs, trailing-slash public URLs and a ten-route sitemap. The optional secret room and 404 remain noindex and absent from discovery. Production robots references the sitemap and discourages the secret route.

## Production artifact

After the origin is approved, export both production variables, then run:

```bash
npm ci
npm run check
npm audit --audit-level=moderate
npm audit --omit=dev --audit-level=moderate
npm run verify:release-browsers
npm run verify:release
```

`verify:release` also rebuilds through the full pipeline, including when invoked directly as `node scripts/verify-release.mjs`; it does not infer validator success from existing files. It remains nonzero until actual approval/rights/manual/host records are cleared. Never use bare `astro build` as the deployment pipeline: it omits CSP/discovery generation and artifact validators. Publish only validated `dist/`; do not upload source masters or replace generated `dist/_headers` with the unhashed source file.

The chosen static host must apply `dist/_headers` or its accurate native equivalent. Many servers ignore `_headers`: copy the generated CSP value including every inline-loader hash into the server’s actual response-header configuration. Apply the general rules to all responses; override caching for the two immutable path families below. Confirm policy from real HTTP responses and browser hydration. Do not add blanket script `unsafe-inline`/`unsafe-eval` permissions.

| Resource/behavior | Required host result |
| --- | --- |
| `/`, ten public/optional route directories | Directory index documents at their registered paths; direct loads and refresh work |
| Directory URL without slash | Redirect to the trailing-slash form, preserving query |
| Unknown URL | Branded `404.html` with HTTP 404; no SPA 200 rewrite |
| HTML, robots, manifest, unversioned media/icons | Revalidate: `public, max-age=0, must-revalidate` |
| `/assets/*`, `/media/responsive/*` | `public, max-age=31536000, immutable`; never replace bytes under these URLs |
| Security | Generated CSP, nosniff, referrer and permissions policy on actual responses |
| Transport | HTTPS; canonical-host redirects; Brotli/gzip for eligible HTML/JS/CSS/XML where supported |
| Release/rollback | Atomic artifact promotion and a known previous-good artifact |

The artifact assumes deployment at domain root. Do not patch individual paths for subdirectory hosting. HSTS and alternate-host redirects require the confirmed domain and HTTPS policy; they are not guessed here.

## Verification and release evidence

On the exact intended artifact, run all routes, links/fragments, the branded real 404, no-JS navigation, menu focus/Escape, both three-knock controls/reset, invitation with disabled JS/blocked island, floorboard/secret return, image failure and optional graphics failure. Inspect 320/390/430, tablet, desktop and very wide. Record named browsers, keyboard, reduced motion, contrast, native zoom and screen-reader evidence separately from automated scans/root-font reflow.

The local browser server models emitted header/cache and directory/404 behavior for regression checks. It omits only CSP `upgrade-insecure-requests` on its loopback HTTP responses because WebKit otherwise rewrites assets to a nonexistent TLS listener; all loader hashes and other directives remain exact, and generated production headers retain HTTPS enforcement. It does not prove host header parsing, compression, HTTPS, external invite validity or production rollback. Before promotion, inspect actual host responses, nested assets, console/CSP, cache/compression and unknown status, and rehearse rollback. Reverify the existing Discord invite and external destinations immediately before launch. No messages to Nari/Panda are part of this workflow.

## Owner checklist and rollback

The current audit lists the exact missing approvals/content/infrastructure/manual evidence. Keep `releaseReadiness.json` and Credits truthful; final version/tag/release is a separate owner action. Do not mark 1.0.0 or clear approval statuses because automation passed.

Rollback by a normal revert of the focused commits or promotion of the previous-good verified artifact. Verify routes, headers and primary actions after rollback. Do not reset history, delete source artwork or silently reapply a failed artifact.
