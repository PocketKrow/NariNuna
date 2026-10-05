# Main Security and Known Issues

> **2026-10-05 vNext:** A targeted upstream `http-cache-semantics` update from 4.2.0 to 4.3.0 resolves GHSA-ch52-4w7c-c8xp without changing Astro 7.3.5. The fresh full audit reports zero vulnerabilities. [Document 43](43_VNEXT_EXPERIENCE.md) owns current evidence; earlier audit counts below are historical.


> **2026-10-03:** The Astro rebuild has a new lockfile and current audit/exposure analysis in [document 42](42_ASTRO_REBUILD.md). Package counts below are historical and do not describe that branch.

**Review date:** 9 September 2026
**Audited revision:** `fa83954f09938a864fd53f6a26739e50e2277970` (`main`, merged PR #18)
**Change scope:** documentation and audit evidence only; no fixes to dependencies or runtime

## 11 September 2026 maintenance recheck

Baseline main `8c7fe67`, Node 24.19.0/npm 11.9.0. Fresh [full audit](evidence/2026-09-11-maintenance/npm-audit.json) still reports four affected development packages (two high, two moderate); [production-only audit](evidence/2026-09-11-maintenance/npm-audit-production.json) reports zero. Package declarations and lockfile are unchanged; dependency remediation remains a separate focused follow-up. The 9 September findings below remain dated evidence.

The maintenance branch corrects reduced-motion fragment scrolling, per-consumer listener lifetime in the dormant helper, and the dormant Ghostie’s nonpublic image lookup. It removes the obsolete immutable-cache rule for the empty generated-media family. Browser/host verification is still pending. See [document 37](37_SIZE_MAINTENANCE.md); no zero-day or exploitation claim is made.

## Read this result correctly

The fresh full npm audit reports **four affected development packages: two high and two moderate**, representing eight distinct advisory IDs (Vitest and its mocker share one advisory). The production-only audit reports **zero known advisories**. These are registry findings against the lockfile, not proof of exploitability through the deployed website. The affected paths are ESLint and Vitest tooling; the application has no server-side dependency runtime when only `dist/` is served.

**Zero-days / exploitation:** none confirmed in this review. The findings below are published advisories with fixes available. No active exploitation, compromise, or new application exploit was demonstrated. No claim is made that unknown vulnerabilities do not exist. This was source/configuration inspection and dependency auditing, not a penetration test, full Git-history secret scan, host assessment or forensic investigation.

## Evidence and reproducibility

Local Node 24.19.0 and npm 11.9.0; CI is configured separately for Node 22.

```bash
npm ci
npm run check
npm audit --json
npm audit --omit=dev --json
npm ls vitest @vitest/mocker brace-expansion js-yaml
```

- [Full raw npm audit](evidence/2026-09-09-main/npm-audit.json)
- [Production-only raw npm audit](evidence/2026-09-09-main/npm-audit-production.json)
- Full repository gate passed: 68 tests / 14 files, 11 served documents, 137 essential assets, 27 Prinny designs.
- Source inspection covered entry/router failure handling, header focus behavior, local content/outbound URLs, HTML shells, CSP/cache configuration, dependency paths and CI.
- Targeted source keyword review found no credential candidate in the inspected application/configuration scope. This is not a dedicated secret scanner, historical scan or binary-media privacy review.
- GitHub open-issue search returned none. Dependabot/secret-scanning alerts, repository protection settings and private vulnerability reporting configuration were not inspected.

Registry results change over time. Preserve this dated evidence and add a new dated result after remediation rather than silently relabelling it clean.

## Confirmed dependency findings — open

Upstream severity is shown as reported by npm; it is not a website-specific risk score. Patch targets below are minimum versions outside the reported affected ranges, not a tested update for this repository.

| ID | Locked dependency path | Severity | Advisory / minimum patch | Exposure and action |
|---|---|---|---|---|
| SEC-01 | `vitest@4.1.10` → `@vitest/mocker@4.1.10` | Moderate (two affected package entries) | [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9); 4.1.11 | Registry reports redirect-mock path traversal/arbitrary file read. Test configuration uses Node and `vitest run`; a remotely reachable affected mocker endpoint was not established. Update the Vitest family coherently and keep development/test services off untrusted networks. |
| SEC-02 | `eslint@9.39.4` → `minimatch@3.1.5` → `brace-expansion@1.1.14` | High | [GHSA-3jxr-9vmj-r5cp](https://github.com/advisories/GHSA-3jxr-9vmj-r5cp), [GHSA-mh99-v99m-4gvg](https://github.com/advisories/GHSA-mh99-v99m-4gvg), [GHSA-rgw5-rvv9-x895](https://github.com/advisories/GHSA-rgw5-rvv9-x895); 1.1.18 covers these reported 1.x ranges | Crafted expansion input can exhaust CPU/memory. This path belongs to lint tooling; no public form/API feeds it. Refresh the compatible transitive resolution and test lint/build. The separate `brace-expansion@5.0.9` path is not flagged. |
| SEC-03 | `eslint@9.39.4` → `@eslint/eslintrc@3.3.5` → `js-yaml@4.1.1` | High | [GHSA-h67p-54hq-rp68](https://github.com/advisories/GHSA-h67p-54hq-rp68), [GHSA-52cp-r559-cp3m](https://github.com/advisories/GHSA-52cp-r559-cp3m), [GHSA-5p4m-2wfm-xmqj](https://github.com/advisories/GHSA-5p4m-2wfm-xmqj), [GHSA-2883-xcg3-v3hh](https://github.com/advisories/GHSA-2883-xcg3-v3hh); 4.3.2 covers these reported 4.x ranges | Crafted YAML can cause excessive CPU consumption. Current lint config is JavaScript; no application YAML upload/parser route was found. Refresh the compatible lint dependency resolution and rerun checks. |

Advisory evidence comes from the saved npm report. GitHub's current brace-expansion and js-yaml advisory pages were also read to confirm the latest affected ranges and patch floors; the Vitest advisory page could not be fetched by web lookup, so that entry relies on the registry report rather than claimed full advisory-page verification.

**Remediation owner:** repository maintainer (Jake/Panda or delegated implementer). Treat these as the next maintenance task; do not dismiss developer/CI exposure because production dependencies are clean. Prefer a reviewed compatible lockfile refresh; avoid a blind `npm audit fix --force`. Review package/lockfile changes, run `npm ci`, the full gate and both audits, and confirm the resolved paths with `npm ls`. Record remaining advisories with explicit triage. No patch has been applied or validated by this docs PR.

## Security boundaries and hardening register

| ID / status | Confirmed evidence | Implication and closure criteria |
|---|---|---|
| SEC-04 — intentional public behavior | `src/data/socials.ts` holds the invite; `HavenDoor.vue` reveals its anchor after three knocks; hidden route exists in `pages/` and router | The ritual can be skipped by inspecting public files; `noindex` does not protect the hidden room. No confidential data belongs there. Verify Discord moderation/membership rules at the destination; private access would require a separately approved trusted boundary. |
| SEC-05 — host verification pending | `public/_headers` declares CSP, permissions, referrer/no-sniff and asset caching | The file does not prove a provider emits the policy. No explicit HTML cache rule or HSTS is defined here. Before launch observe actual HTTPS, CSP/frame restrictions, HTML revalidation, hashed caching, real 404 status and rollback. Host selection/configuration remains an owner decision. |
| SEC-06 — known policy compromise | CSP permits `style-src 'unsafe-inline'`, but not inline scripts | Hardening opportunity, not a demonstrated XSS. Narrow only after inventorying runtime style requirements and testing motion/layout; preserve script restrictions. |
| SEC-07 — CI hardening gap | `.github/workflows/ci.yml` uses `actions/checkout@v4` and `actions/setup-node@v4`, read-only contents permission, `npm ci` and `npm run check` | Actions use mutable major tags. No explicit audit/secret-scan step or Dependabot config exists in the tracked workflow configuration. Consider full-SHA action pinning and an explicit advisory policy. Hosted scanner/protection settings are unknown, not assumed disabled. |
| SEC-08 — development exposure | `vite.config.ts` binds the dev server to `0.0.0.0` and allows `terminal.local` | Binding is a development configuration, not an exploit finding or production server. Use `npm run dev -- --host 127.0.0.1` for local-only work; do not expose test/dev services to untrusted networks. Serve built `dist/` through the selected production host. |
| SEC-09 — known privacy exception | Three `i.ytimg.com` thumbnail URLs; `MediaCard.vue` uses no-referrer and fallback art | The remote host still receives network metadata. Reapprove selected clips/rights and verify failure states; use approved local art if the exception is removed. |
| SEC-10 — public source/rights boundary | Repository is public and includes tracked source artwork | Files outside `public/` are excluded from ordinary static output, not confidential in GitHub. Close rights/credit/privacy review before release; do not upload private approval packets. Changing repository visibility or history is not part of this task. |

No `v-html`, `innerHTML` or `eval` use was found in inspected application source; recovery text uses `textContent`. Reviewed new-tab links specify `noopener noreferrer`. These are useful controls, not comprehensive XSS or supply-chain clearance.

## Functional limitations and verification backlog

No newly reproduced rendering/interaction defect was established in this pass. Keep pending visual checks distinct from confirmed failures.

| ID / status | Evidence / impact | Owner and closure |
|---|---|---|
| QA-01 — pending | PR #18 changed the shared desktop passage and final character crops; recorded final rendered review is pending | Implementer/client: inspect ordinary routes at 320/390/768/1440px, final focal positions, 200% text, keyboard, menu resize and reduced motion; record browser/device evidence |
| QA-02 — pending | Automated checks do not establish native zoom, screen-reader or contrast conformance | QA owner: physical Pixel 9, desktop/mobile screen reader, 400% zoom, measured contrast and failed-media checks per document 12 |
| LIMIT-01 — confirmed | HTML entries contain an empty `#app` and a `noscript` message; Vue renders content | Content/navigation depend on JavaScript; this true MPA is not prerendered content. Entry-script download failure occurs before recovery code can run. If resilient no-JS content becomes required, scope a separate prerender/fallback design and verify failure behavior |
| LIMIT-02 — confirmed | Shared legacy SCSS layers still overlap | Maintainer: consolidate only with visual comparisons; preserve final phone/crop authority and existing performance budgets |
| RELEASE-01 — blocked/pending | Final client, identity, asset rights/credits, portfolio, resources, professional contact and Discord decisions remain unresolved | Jake/Nari/rights holders: record approved inputs and release-time destination checks; no fabricated content or approvals |
| RELEASE-02 — pending | No production host, fresh Lighthouse series or field evidence verified here | Release owner: complete document 15; verify root-path deployment, metadata/domain, headers, routes, error status, performance and rollback |

## Updating this register

For each changed item record the reviewed commit, date, evidence, affected dependency/component, exposure, mitigation and closure test. Link newly confirmed bugs to issues when created. Keep exploit payloads, private reports, credentials and private community details out of public docs. If a new non-public vulnerability is found, agree a verified private reporting route with the maintainer; no security inbox or enabled GitHub reporting feature is invented here.

This register documents main's condition. It does not merge code, deploy, approve release, or certify absence of vulnerabilities.
