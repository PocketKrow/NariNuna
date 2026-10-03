// Shared route/hero projection used by delivery tests; SiteLayout renders these bands directly into Astro heads.
import projectPages from "../src/data/projectPages.json" with { type: "json" };
import { environmentArtwork } from "../src/data/artwork.ts";

export const routeHeroArtwork: Record<string, string> = Object.fromEntries(
  projectPages.filter(({ hero }) => hero !== null).map(({ document, hero }) => {
    if (!hero || !(hero in environmentArtwork)) throw new Error(`Unknown hero for ${document}: ${hero}`);
    return [document, environmentArtwork[hero as keyof typeof environmentArtwork]];
  })
);
