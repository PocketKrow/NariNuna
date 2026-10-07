> **Current direction, 2026-10-06:** [44 — Minimal Creator Reconstitution](44_MINIMAL_CREATOR_RECONSTITUTION.md) supersedes the environment-first layout, twelve-route contract, room navigation, doorway/secret interaction and WebGL requirements below. Earlier implementation descriptions are historical. Canon, truthful content, source preservation, rights and production approval boundaries remain.

# Deployment and Release Runbook

> **2026-10-03 Astro migration:** Jake explicitly requested the rebuild in Astro. ADR-011 and [42 — Astro rebuild](42_ASTRO_REBUILD.md) own the current route, shell, dependency, validation and rollback contracts. Vite-MPA/client-router paths below are dated history. Product content, imagery, privacy and release approval boundaries still apply.

**Status:** Provider/domain `BLOCKED`; provider-neutral artifact contract `DEFINED`  
**Owns:** Build artifact, host requirements, environment configuration, verification, release, rollback, post-release checks  
**Update trigger:** Provider, domain, routing, headers, cache, CI/CD, preview, or rollback procedure changes

## Release principle

The repository produces a portable static artifact. A provider may host it, but must not become an alternate source of truth. Source changes flow from `SomberKrow/NariNuna`; generated hosting mirrors do not flow back into architecture.

No production release occurs until critical canon, rights, privacy, accessibility, host, and rollback gates in `12_QA_ACCEPTANCE_CRITERIA.md` pass.

## Current security review before release

At main `fa83954` (9 September 2026), the full gate passes but the separate dependency audit reports four affected development packages. See [document 36](36_MAIN_SECURITY_AND_KNOWN_ISSUES.md) for patch targets, exposure and raw evidence. Run both `npm audit --json` and `npm audit --omit=dev --json` against the intended release lockfile and resolve or explicitly triage findings; `npm run check` does not currently include an advisory gate. Neither a clean production-only audit nor a passing build clears host or manual security review.

## Artifact contract

From a clean checkout:

```bash
npm ci
npm run check
npm run verify:release
```

Expected artifact: `dist/` containing:

- `index.html`;
- directory-index documents for Meet Nari, Streams, Nail Studio, Haven, Resources, Work, Support, Stories, and the hidden room;
- `404.html`;
- hashed compiled assets under `assets/`;
- local media under `media/`;
- icons, manifest, robots, and compatible static-host files.

Do not deploy the Vite development server. Do not upload source masters from `src/assets/source/` as public files.

## Required host behavior

| Requirement | Reason | Verification |
|---|---|---|
| HTTPS | Integrity/privacy baseline | Browser and command-line header check |
| Directory indexes | Every route is a real document | Direct-load each trailing-slash route |
| Branded 404 mapping | Unknown route recovery | Request a unique nonexistent path |
| Root-relative asset support | Documents reference `/assets`, `/media` | Inspect nested route network |
| Security headers | CSP/privacy/framing/permissions | Observe response headers, not config file |
| Immutable hashed asset caching | Efficient stable delivery | Inspect `Cache-Control` on hashed assets |
| HTML revalidation | Avoid stale document/chunk references | Inspect HTML cache policy |
| Atomic deploy or equivalent | Avoid mixed old/new hashes | Provider behavior and rollout test |
| Rollback | Safe recovery | Identify and rehearse previous-good artifact |
| Preview protection/noindex | Avoid accidental draft indexing | Inspect preview access and robots headers/meta |

## Root-path assumption

The current build uses root-relative routes and assets and assumes deployment at the domain root, not `/subdirectory/`.

If subpath deployment becomes a requirement, do not patch random URLs. Record an architecture decision covering Vite `base`, Router history base, navigation/data links, manifest/icons, metadata/canonical URLs, static host routing, and tests.

## Provider configuration inputs

Before implementation, record:

- provider and account owner;
- production domain and DNS owner;
- deployment source branch and trigger;
- preview behavior/access;
- build image/runtime and Node version;
- build command and publish directory;
- routing/404 syntax;
- header/cache syntax and limitations;
- environment variables (public only; no client secrets);
- access roles and emergency owner;
- logs/retention and privacy posture;
- rollback mechanism and retention;
- canonical URL and redirect policy.

Do not invent values in repository documentation before these are chosen.

## Build configuration

Recommended provider-neutral settings:

```text
Runtime: Node.js 22.13 or newer compatible 22.x
Install: npm ci
Build: npm run check
Publish: dist
```

If the provider separates test and build steps, keep `npm run check` as a required gate and avoid rebuilding from a different dependency state.

The site requires no server runtime and no secret environment variables. Any `VITE_*` variable will be visible in client output.

## Routing contract

Direct requests must serve:

```text
/                         -> dist/index.html
/meet-nari/               -> dist/meet-nari/index.html
/streams/                 -> dist/streams/index.html
/nail-studio/             -> dist/nail-studio/index.html
/haven/                   -> dist/haven/index.html
/resources/               -> dist/resources/index.html
/work-with-nari/          -> dist/work-with-nari/index.html
/support/                 -> dist/support/index.html
/stories/                 -> dist/stories/index.html
/credits/                 -> dist/credits/index.html
/the-prinny-cult/         -> dist/the-prinny-cult/index.html
/unknown-path             -> dist/404.html with intended host status
```

Do not configure a universal rewrite to `index.html`; that would erase the true MPA and can produce incorrect metadata/status behavior.

Decide and test canonical behavior for non-trailing-slash requests. Prefer one redirect form rather than serving duplicate URL variants.

## Header baseline

The host must reproduce or improve the intent in `public/_headers`:

- content-type sniffing disabled;
- strict referrer behavior;
- camera/microphone/geolocation/payment and unnecessary APIs disabled;
- CSP defaults to self, permits only required image origin, and blocks frames/media/objects;
- framing denied;
- base/form actions restricted;
- HTTPS upgrade on production;
- immutable caching for versioned compiled assets and generated media.

Review `style-src 'unsafe-inline'` as a known policy compromise. Never add `unsafe-eval` or `unsafe-inline` to scripts to make a feature convenient.

HSTS requires domain/HTTPS confidence. Decide max-age/includeSubDomains/preload implications deliberately and verify the actual emitted header.

## Cache policy

Recommended intent:

| Resource | Policy intent |
|---|---|
| Hashed `/assets/*` | Long-lived immutable |
| Versioned/local generated media | Long-lived; invalidate through filename change when content changes |
| HTML documents | Revalidate/no long stale cache |
| Manifest, robots, icons | Explicit short/revalidation policy unless versioned |
| 404 | Revalidate; avoid long-lived accidental response |

Responsive artwork under `/media/responsive/` is content-addressed; generated media and compiled assets also receive immutable cache headers. Preserve filename/content integrity and never replace bytes under an immutable URL. Unversioned icons, other media and HTML need a separately verified host policy.

## Domain and metadata cutover

After the final domain is approved:

1. Configure DNS and HTTPS.
2. Choose canonical host form (`www` or apex) and redirect the other.
3. Add canonical URLs to every public HTML entry.
4. Add rights-cleared Open Graph/social metadata and route-specific images where approved.
5. Confirm secret/404 robots metadata.
6. Update manifest start URL/scope/name as needed.
7. Verify favicon/apple icons and browser theme colors.
8. Verify social preview crawlers do not receive preview/private URLs.
9. Update public references only after production is stable.

Do not add canonical URLs pointing to a temporary preview domain.

## Pre-release procedure

1. Freeze the intended release commit.
2. Confirm all critical approval, asset, privacy, and license records.
3. Run clean install and `npm run check`.
4. Preview the exact artifact locally.
5. Complete page, theme, viewport, keyboard, screen-reader, zoom, reduced-motion, link, image-failure, and network matrix.
6. Scan public derivatives for metadata and inspect visual privacy.
7. Verify external destinations, Discord guild, rating, and volatile content.
8. Compare bundle/image budgets.
9. Complete `templates/RELEASE_EVIDENCE_RECORD.md` with commit and environment.
10. Identify previous-good deployment and rollback operator.
11. Deploy to a protected/noindex preview using the same host behavior.
12. Verify preview headers/routes/404/caches/HTTPS before production promotion.

## Production deployment

1. Deploy/promote the exact verified artifact or commit.
2. Confirm atomic completion before public navigation.
3. Run smoke checks from a clean browser profile and a second network/device where practical.
4. Inspect response headers and network requests.
5. Direct-load every route, secret, and unknown path.
6. Verify theme persistence across documents.
7. Test primary outbound links without submitting private data.
8. Record deployment identifier, time, operator, and result.

## Post-deploy smoke matrix

- Home hero/art, social dock, Haven CTA, and Meet Nari path.
- Header current state and mobile menu.
- Nari/Dark/Light pre-paint and persistence.
- Streams selected media/text fallbacks.
- Nail gallery/hold and final detail behavior.
- Haven door, invite destination, floorboard, secret exit/counter.
- Work contact and Support destination.
- 404 response and Home recovery.
- CSP console/network, third-party requests, caching, layout shift.
- Keyboard/focus on at least one ordinary route and custom interaction.

## Rollback triggers

Rollback or immediately disable the focused content when:

- private or unlicensed material is public;
- identity/canon is materially wrong;
- critical route/asset fails;
- 404/routing sends users to incorrect documents;
- security headers/CSP are missing or dangerously weakened;
- a client secret appears;
- critical accessibility obstruction prevents navigation/action;
- mixed deployment assets cause runtime failure;
- an external destination is compromised or points to the wrong identity.

## Rollback procedure

1. Identify the last known-good deployment/commit.
2. Promote/redeploy it through the provider's normal recoverable mechanism.
3. Purge only the affected caches when necessary; avoid broad destructive actions without understanding scope.
4. Verify every route, headers, and critical asset after rollback.
5. Disable/revoke/rotate affected external credentials or links when applicable.
6. Record incident, public impact, rollback time, remaining cache/external risk, and corrective owner.
7. Fix forward in a focused reviewed change; do not silently reapply the failed release.

## Monitoring without surveillance

Basic provider uptime/build health may be used if it does not add visitor tracking. Before adding client-side analytics or real-user monitoring, approve purpose, fields, processor, consent/legal basis, sampling, retention, access, and deletion.

Build/deployment alerts should name repository/commit/status, not include private content or credentials.

## Release completion

A release is complete when:

- the exact release commit and deployment ID are recorded;
- automated and manual gates pass;
- production routes, headers, caches, metadata, links, network, and rollback are observed;
- no critical blocker remains;
- the release evidence and governance log are updated;
- remaining noncritical work has an owner and honest status.
