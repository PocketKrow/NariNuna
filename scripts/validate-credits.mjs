// Validate the public-safe credit registry without network access. Known pending/blocked states are valid; missing classification is not.
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const creditStatuses = new Set(["verified", "pending", "internal", "not-required", "blocked"]);
const displayStatuses = new Set(["approved", "not-approved", "not-applicable"]);
const publicationStatuses = new Set(["approved", "pending", "blocked"]);
const rightsStatuses = new Set(["approved", "pending", "blocked", "not-applicable"]);
const thirdPartyStatuses = new Set(["cleared", "pending", "concern", "not-applicable"]);
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function assetExists(asset) {
  const relative = asset.replace(/^\//, "");
  return existsSync(resolve("public", relative)) || existsSync(resolve("src/assets/source/delivery", relative)) || existsSync(resolve("src/assets/source/vnext/delivery", relative));
}

export function validateCreditRegistry(registry) {
  const errors = [];
  if (!registry || typeof registry !== "object") return ["Registry must be an object."];
  for (const key of ["groups", "assetFamilies", "credits"]) {
    if (!Array.isArray(registry[key])) errors.push(`${key} must be an array.`);
  }
  if (errors.length) return errors;

  const ensureUniqueIds = (records, label) => {
    const seen = new Set();
    for (const record of records) {
      if (!idPattern.test(record.id ?? "")) errors.push(`${label} has an invalid id: ${record.id ?? "<missing>"}.`);
      if (seen.has(record.id)) errors.push(`Duplicate ${label} id: ${record.id}.`);
      seen.add(record.id);
    }
    return seen;
  };

  const groupIds = ensureUniqueIds(registry.groups, "group");
  const familyIds = ensureUniqueIds(registry.assetFamilies, "asset family");
  ensureUniqueIds(registry.credits, "credit");
  const classifiedFamilies = new Set();
  const artworkIds = new Set();

  for (const family of registry.assetFamilies) {
    if (!publicationStatuses.has(family.publicationStatus)) errors.push(`Asset family ${family.id} has an unknown publication status.`);
    for (const field of ["websiteUseStatus", "derivativeUseStatus", "approvalStatus"]) {
      if (!rightsStatuses.has(family[field])) errors.push(`Asset family ${family.id} has an unknown ${field}.`);
    }
    if (!thirdPartyStatuses.has(family.thirdPartyStatus)) errors.push(`Asset family ${family.id} has an unknown thirdPartyStatus.`);
    if (!Array.isArray(family.trackedAssets)) errors.push(`Asset family ${family.id} must provide trackedAssets.`);
    for (const asset of family.trackedAssets ?? []) {
      if (typeof asset !== "string" || !asset.startsWith("/")) errors.push(`Asset family ${family.id} has an invalid tracked asset path.`);
      else if (!assetExists(asset)) errors.push(`Asset family ${family.id} points to a missing tracked asset: ${asset}.`);
    }
    if (family.assetRecord && !existsSync(resolve(family.assetRecord))) errors.push(`Asset family ${family.id} points to a missing asset record: ${family.assetRecord}.`);
  }

  for (const credit of registry.credits) {
    if (!groupIds.has(credit.groupId)) errors.push(`Credit ${credit.id} references unknown group ${credit.groupId}.`);
    if (!creditStatuses.has(credit.creditStatus)) errors.push(`Credit ${credit.id} has an unknown credit status.`);
    if (!displayStatuses.has(credit.artworkDisplayStatus)) errors.push(`Credit ${credit.id} has an unknown artwork display status.`);
    if (!Array.isArray(credit.roles) || credit.roles.length === 0) errors.push(`Credit ${credit.id} needs at least one role.`);
    if (!credit.displayName?.trim() || !credit.contribution?.trim() || !credit.creditText?.trim()) errors.push(`Credit ${credit.id} needs meaningful public attribution text.`);
    if (!Array.isArray(credit.assetFamilyIds) || credit.assetFamilyIds.length === 0) errors.push(`Credit ${credit.id} needs at least one asset family.`);
    if (new Set(credit.assetFamilyIds ?? []).size !== (credit.assetFamilyIds ?? []).length) errors.push(`Credit ${credit.id} repeats an asset family.`);
    if (credit.pageVisible && credit.creditStatus === "blocked") errors.push(`Blocked credit ${credit.id} cannot be page-visible.`);

    for (const familyId of credit.assetFamilyIds ?? []) {
      if (!familyIds.has(familyId)) errors.push(`Credit ${credit.id} references unknown asset family ${familyId}.`);
      else classifiedFamilies.add(familyId);
    }

    for (const link of credit.links ?? []) {
      try {
        const parsed = new URL(link.url);
        if (parsed.protocol !== "https:") throw new Error("HTTPS required");
        if (!link.label?.trim()) errors.push(`Credit ${credit.id} has a link without a label.`);
      } catch {
        errors.push(`Credit ${credit.id} has a malformed or non-HTTPS link: ${link.url ?? "<missing>"}.`);
      }
    }

    if (credit.creditStatus === "verified" && (!credit.links?.length || /^attribution|^details/i.test(credit.displayName))) {
      errors.push(`Verified credit ${credit.id} needs a confirmed name and approved public link.`);
    }

    if (credit.artworkDisplayStatus === "approved") {
      if (credit.creditStatus === "blocked") errors.push(`Blocked credit ${credit.id} cannot approve artwork display.`);
      if (!Array.isArray(credit.artwork) || credit.artwork.length === 0) errors.push(`Credit ${credit.id} approves display without an artwork reference.`);
      for (const artwork of credit.artwork ?? []) {
        if (!idPattern.test(artwork?.id ?? "")) errors.push(`Credit ${credit.id} has artwork with an invalid id: ${artwork?.id ?? "<missing>"}.`);
        if (artworkIds.has(artwork?.id)) errors.push(`Duplicate artwork id: ${artwork?.id ?? "<missing>"}.`);
        artworkIds.add(artwork?.id);
        if (!artwork?.title?.trim() || !artwork?.category?.trim() || !artwork?.caption?.trim()) errors.push(`Artwork ${artwork?.id ?? "<missing>"} needs a title, category, and caption.`);
        if (artwork?.year !== undefined && (!Number.isInteger(artwork.year) || artwork.year < 1900 || artwork.year > new Date().getUTCFullYear())) errors.push(`Artwork ${artwork?.id ?? "<missing>"} has an invalid year.`);
        if (!credit.assetFamilyIds?.includes(artwork?.assetFamilyId)) errors.push(`Artwork ${artwork?.id ?? "<missing>"} references a family outside credit ${credit.id}.`);
        const family = registry.assetFamilies.find((candidate) => candidate.id === artwork?.assetFamilyId);
        if (family && family.publicationStatus !== "approved") errors.push(`Credit ${credit.id} displays artwork from non-approved family ${family.id}.`);
        if (family && Array.isArray(family.trackedAssets) && !family.trackedAssets.includes(artwork?.src)) errors.push(`Artwork ${artwork?.id ?? "<missing>"} is not tracked by family ${family.id}.`);
        if (!artwork?.src || !assetExists(artwork.src)) errors.push(`Credit ${credit.id} displays a missing artwork asset: ${artwork?.src ?? "<missing>"}.`);
        if (!artwork?.alt?.trim()) errors.push(`Credit ${credit.id} displays artwork without meaningful alt text.`);
        if (!Number.isInteger(artwork?.width) || artwork.width <= 0 || !Number.isInteger(artwork?.height) || artwork.height <= 0) {
          errors.push(`Credit ${credit.id} displays artwork without valid intrinsic dimensions.`);
        }
      }
    } else if ((credit.artwork ?? []).length > 0) {
      errors.push(`Credit ${credit.id} includes artwork while display is ${credit.artworkDisplayStatus}.`);
    }
  }

  for (const familyId of familyIds) if (!classifiedFamilies.has(familyId)) errors.push(`Asset family ${familyId} has no explicit credit disposition.`);
  return errors;
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const registryPath = process.argv[2] ?? "src/data/artCredits.json";
  const registry = JSON.parse(readFileSync(resolve(registryPath), "utf8"));
  const errors = validateCreditRegistry(registry);

  if (errors.length) {
    for (const error of errors) console.error(`Credit registry: ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`Validated ${registry.credits.length} credit records across ${registry.assetFamilies.length} classified asset families.`);
  }
}
