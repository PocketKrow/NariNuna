# ASSET-2026-022 — Model-anchored anime creator family

Date: 2026-10-07 UTC / 2026-10-06 owner local date. Status: owner-authorized implementation/review; final Nari adoption and underlying model/public-production rights remain pending/blocked.

Authority: Jake explicitly rejected the first minimal composition and selected light lavender/warm cream, clean anime shading matching the supplied model, and new poses preserving the exact character design. This authorizes the new artwork and revision of review PR #31; it does not authorize merge or production release.

## Source, ownership and uses

Only the supplied `public/media/nari/nari-model-fullbody.webp` and `nari-model-portrait.webp` establish character identity. Their hashes and original intake are unchanged; `model-delivery.json` records them. No public-profile image, external character, franchise or guessed model is a source.

Creator: project-generated using the built-in image-generation tool. Original model artist attribution remains unresolved in the existing character record. Generated supporting Ghosties, florals, nail tools and correspondence details are project review artwork, not official emotes or real nail work. Public-safe credit remains in the website artwork ledger; no artist approval is inferred.

Allowed by this implementation instruction: model-anchored pose illustration, custom supporting art, local review composition, proportionate responsive resizing, crop/reframing, compression and metadata cleaning, finite CSS presentation. Character recoloring, redesign, new clothing, invented biography, fake portfolio, new heritage meaning and replacement source masters are prohibited. Final public website/derivative rights, Nari adoption and required artist credit remain unresolved.

## Invariants and visual inspection

Compare adult tan complexion and proportions, emerald eyes, blunt bangs, brown/violet hair and tail, floppy dog ear at viewer left and upright white-tuft cat ear at viewer right, small white ghost ear charm, gold bells/red ribbons, moon choker, shoulder sun tattoo, lavender blouse and sheer dotted balloon sleeves, black laced corset, gold celestial chains, lavender/black skirt, distressed thigh-high stockings and black platform boots. Only pose/expression/framing may change. Reject significant drift and retain only the inspected candidate.

Master PNGs and available exact prompt text are retained under `src/assets/source/anime-creator/`. Machine-readable SHA-256, dimensions, alpha, bytes, crop, master/reference and derivative records belong to `src/data/anime-artwork.json`. Web delivery is metadata-clean, non-upscaled WebP under content-addressed `/media/anime/` URLs. Do not serve PNG masters.

Privacy inspection: illustrated fictional character and objects only; no real photographs, correspondence, addresses, screens, labels, personal data, community member likeness, watermark or platform logo is requested. Supporting nail objects are explicitly illustration, never portfolio evidence. Inspect metadata and alpha before delivery.

Hero character receives high loading priority and intrinsic dimensions; other images are lazy except a route's main visual. Responsive sizes follow actual CSS. Decorative art uses empty alt; character illustrations identify the visible pose and model-derived review status in their provenance, with adjacent credit access. Text and links remain usable if artwork fails. Artwork is never the sole navigation label.

Final QA, responsive/budget results and exact selected master inventory are recorded in document 47 after execution. Every production approval state remains unchanged until recorded by its actual authority.

Prompt retention limitation: the exact bloom Ghostie generation prompt was not recovered; `ghostie-bloom.brief.txt` preserves its design brief and explicitly labels that limitation. Other accepted poses/supporting art retain exact prompts, including the nail alpha-cleaning edit.
