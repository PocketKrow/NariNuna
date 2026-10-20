// Keep production approval separate from the development gate. Automated facts are derived; only human decisions live in readiness data.
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { siteConfiguration } from "./site-metadata.mjs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { validateCreditRegistry } from "./validate-credits.mjs";

const statuses = new Set(["resolved", "pending", "blocked", "manual-review", "not-applicable"]);
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const rightsSafe = new Set(["approved", "not-applicable"]);
const thirdPartySafe = new Set(["cleared", "not-applicable"]);

export function validateReleaseReadiness(readiness, registry, automatic = {}) {
  const errors = [];
  const blockers = [];
  const notices = [];
  const passes = [];

  if (!readiness || typeof readiness !== "object") return { errors: ["Readiness data must be an object."], blockers, notices, passes };
  if (!Number.isInteger(readiness.schemaVersion) || readiness.schemaVersion < 1) errors.push("schemaVersion must be a positive integer.");
  if (!Array.isArray(readiness.requiredCategories) || readiness.requiredCategories.length === 0) errors.push("requiredCategories must be a non-empty array.");
  if (!Array.isArray(readiness.items)) errors.push("items must be an array.");
  if (errors.length) return { errors, blockers, notices, passes };

  const categorySet = new Set(readiness.items.map((item) => item?.category));
  for (const category of readiness.requiredCategories) {
    if (typeof category !== "string" || !idPattern.test(category)) errors.push(`Invalid required category: ${category ?? "<missing>"}.`);
    else if (!categorySet.has(category)) errors.push(`Missing required readiness category: ${category}.`);
  }

  const ids = new Set();
  for (const item of readiness.items) {
    if (!idPattern.test(item?.id ?? "")) errors.push(`Readiness item has an invalid id: ${item?.id ?? "<missing>"}.`);
    if (ids.has(item?.id)) errors.push(`Duplicate readiness item id: ${item?.id ?? "<missing>"}.`);
    ids.add(item?.id);
    if (!idPattern.test(item?.category ?? "")) errors.push(`Readiness item ${item?.id ?? "<missing>"} has an invalid category.`);
    if (!statuses.has(item?.status)) errors.push(`Readiness item ${item?.id ?? "<missing>"} has an unknown status.`);
    if (!item?.summary?.trim()) errors.push(`Readiness item ${item?.id ?? "<missing>"} needs a summary.`);
    if (typeof item?.releaseBlocking !== "boolean") errors.push(`Readiness item ${item?.id ?? "<missing>"} needs a boolean releaseBlocking value.`);
    if (item?.status === "resolved" && !item?.evidenceRef?.trim()) errors.push(`Resolved readiness item ${item?.id ?? "<missing>"} needs a public-safe evidenceRef.`);

    if (item?.status === "resolved" || item?.status === "not-applicable") passes.push(item);
    else if (item?.releaseBlocking) blockers.push(item);
    else notices.push(item);
  }

  const creditErrors = validateCreditRegistry(registry);
  if (creditErrors.length) errors.push(...creditErrors.map((error) => `Credit registry: ${error}`));
  else passes.push({ id: "credit-registry-classified", summary: "Credit registry is structurally classified." });

  for (const family of registry?.assetFamilies ?? []) {
    const safe = family.publicationStatus === "approved"
      && rightsSafe.has(family.websiteUseStatus)
      && rightsSafe.has(family.derivativeUseStatus)
      && thirdPartySafe.has(family.thirdPartyStatus)
      && rightsSafe.has(family.approvalStatus);
    if (!safe) blockers.push({ id: `rights-${family.id}`, summary: `${family.label} still has unresolved publication, use, derivative, third-party, or approval status.` });
  }

  if ((registry?.credits ?? []).some((credit) => credit.creditStatus === "pending" || credit.creditStatus === "blocked")) {
    blockers.push({ id: "pending-attribution", summary: "One or more creative contributions still need verified public attribution." });
  } else {
    passes.push({ id: "attribution-resolved", summary: "No pending or blocked attribution records remain." });
  }

  if (automatic.buildIntegrity) passes.push({ id: "build-integrity", summary: "The current production artifact passed the repository build validators." });
  else blockers.push({ id: "build-integrity", summary: "The current production artifact has not passed the repository build validators." });

  return { errors, blockers, notices, passes };
}

// A fresh successful pipeline is evidence; a stale dist directory is not.
export function runBuildValidation(cwd = process.cwd()) {
  const build = spawnSync("npm", ["run", "build"], { cwd, stdio: "inherit", shell: process.platform === "win32" });
  return build.status === 0 && !build.error;
}

function printReport(result) {
  console.log("\nNari Nuna — Production Release Readiness\n");
  console.log("PASS");
  for (const item of result.passes) console.log(`✓ ${item.summary}`);
  if (!result.passes.length) console.log("— No passing checks recorded");

  if (result.notices.length) {
    console.log("\nNON-BLOCKING");
    for (const item of result.notices) console.log(`• ${item.summary}`);
  }

  console.log("\nBLOCKED");
  for (const item of [...result.errors.map((summary) => ({ summary })), ...result.blockers]) console.log(`✗ ${item.summary}`);
  if (!result.errors.length && !result.blockers.length) console.log("— No release blockers");

  const passed = result.errors.length === 0 && result.blockers.length === 0;
  console.log(`\nResult: ${passed ? "RELEASE GATE PASSED" : "NOT READY FOR PUBLIC RELEASE"}\n`);
  return passed;
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const readinessPath = resolve(process.argv[2] ?? "src/data/releaseReadiness.json");
  const registryPath = resolve(process.argv[3] ?? "src/data/artCredits.json");
  const readiness = JSON.parse(readFileSync(readinessPath, "utf8"));
  const registry = JSON.parse(readFileSync(registryPath, "utf8"));
  const buildIntegrity = runBuildValidation();
  const result = validateReleaseReadiness(readiness, registry, { buildIntegrity });
  if (!siteConfiguration().production) result.blockers.push({ id: "production-metadata", summary: "Release requires NARI_DEPLOY_CONTEXT=production and the approved NARI_SITE_ORIGIN; this artifact is a noindex preview." });
  if (!printReport(result)) process.exitCode = 1;
}
