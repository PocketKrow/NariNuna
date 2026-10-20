// Validate production approval records and derived artwork facts entirely offline.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { validateReleaseReadiness } from "../scripts/verify-release.mjs";

const canonicalReadiness = JSON.parse(readFileSync(resolve("src/data/releaseReadiness.json"), "utf8"));
const canonicalRegistry = JSON.parse(readFileSync(resolve("src/data/artCredits.json"), "utf8"));

function passingFixtures() {
  const readiness = structuredClone(canonicalReadiness);
  for (const item of readiness.items) {
    item.status = "resolved";
    item.evidenceRef = `RELEASE-TEST-${item.id}`;
  }
  const registry = structuredClone(canonicalRegistry);
  for (const family of registry.assetFamilies) {
    family.publicationStatus = "approved";
    family.websiteUseStatus = "approved";
    family.derivativeUseStatus = "approved";
    family.thirdPartyStatus = "cleared";
    family.approvalStatus = "approved";
  }
  for (const credit of registry.credits) credit.creditStatus = "internal";
  return { readiness, registry };
}

describe("production release readiness", () => {
  it("handles resolved, pending blocking, and unresolved non-blocking items", () => {
    const { readiness, registry } = passingFixtures();
    readiness.items[0].status = "pending";
    let result = validateReleaseReadiness(readiness, registry, { buildIntegrity: true });
    expect(result.blockers.some(({ id }) => id === readiness.items[0].id)).toBe(true);

    readiness.items[0].releaseBlocking = false;
    result = validateReleaseReadiness(readiness, registry, { buildIntegrity: true });
    expect(result.notices.some(({ id }) => id === readiness.items[0].id)).toBe(true);

    readiness.items[0].status = "resolved";
    readiness.items[0].evidenceRef = "RELEASE-TEST-RESOLVED";
    result = validateReleaseReadiness(readiness, registry, { buildIntegrity: true });
    expect(result.passes.some(({ id }) => id === readiness.items[0].id)).toBe(true);
  });

  it("rejects malformed records and unknown statuses", () => {
    const { readiness, registry } = passingFixtures();
    readiness.items[0].summary = "";
    readiness.items[1].status = "mostly-done";
    const result = validateReleaseReadiness(readiness, registry, { buildIntegrity: true });
    expect(result.errors.join(" ")).toContain("needs a summary");
    expect(result.errors.join(" ")).toContain("unknown status");

    readiness.items[0] = null;
    expect(() => validateReleaseReadiness(readiness, registry, { buildIntegrity: true })).not.toThrow();
  });

  it("blocks an unresolved artwork-family rights state derived from Credits", () => {
    const { readiness, registry } = passingFixtures();
    registry.assetFamilies[0].derivativeUseStatus = "pending";
    const result = validateReleaseReadiness(readiness, registry, { buildIntegrity: true });
    expect(result.blockers.some(({ id }) => id === `rights-${registry.assetFamilies[0].id}`)).toBe(true);
  });

  it("rejects a missing required readiness category", () => {
    const { readiness, registry } = passingFixtures();
    const missing = readiness.requiredCategories[0];
    readiness.items = readiness.items.filter((item) => item.category !== missing);
    const result = validateReleaseReadiness(readiness, registry, { buildIntegrity: true });
    expect(result.errors).toContain(`Missing required readiness category: ${missing}.`);
  });

  it("accepts a complete passing fixture", () => {
    const { readiness, registry } = passingFixtures();
    const result = validateReleaseReadiness(readiness, registry, { buildIntegrity: true });
    expect(result.errors).toEqual([]);
    expect(result.blockers).toEqual([]);
  });
});

it("does not mistake stale HTML for successful build validation", async () => {
  const { mkdtempSync, mkdirSync, writeFileSync, rmSync } = await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { runBuildValidation } = await import("../scripts/verify-release.mjs");
  const root = mkdtempSync(`${tmpdir()}/nari-release-test-`);
  try {
    mkdirSync(`${root}/dist`);
    writeFileSync(`${root}/dist/index.html`, "stale artifact");
    const fixture = (code) => JSON.stringify({ scripts: { build: `node -e "process.exit(${code})"` } });
    writeFileSync(`${root}/package.json`, fixture(1));
    expect(runBuildValidation(root)).toBe(false);
    writeFileSync(`${root}/package.json`, fixture(0));
    expect(runBuildValidation(root)).toBe(true);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
