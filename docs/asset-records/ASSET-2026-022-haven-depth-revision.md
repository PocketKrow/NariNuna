# ASSET-2026-022 — Haven depth revision

Date: 6 October 2026. Authority: Jake's attached **NariNuna vNext — Asset Revision & Immersive Experience Rebuild** authorizes asset revision and a separate review PR. Owner-directed implementation/review only. Publication, final Nari adoption and credit wording remain **pending**; no existing model/identity/franchise right is cleared.

Six original built-in imagegen outputs are preserved as PNG masters in `src/assets/source/vnext/masters/`. The original Home scene is a style/lighting reference for the two prop plates; the existing heart Ghostie is the family reference for two distinct poses. The additional Home pair removes Nari from the background and extracts her existing painted likeness into a matching alpha plane; it inherits the unresolved model-derivative rights. Official emotes, supplied model bytes, franchise designs and nail photography are unchanged. Exact successful prompts are preserved in [the prompt record](ASSET-2026-022-prompts.md). Source/working hashes, dimensions, safe areas and status are in `src/assets/source/vnext/intake.json`.

| Asset | Intended use | Generation and derivative treatment |
|---|---|---|
| `hearth-still-life` | Home/library/Haven/Stories foreground | Original lantern, two unlettered books, tea mug and lavender, transparent alpha. Complete canvas downscaled into 6% padding; no cropping. |
| `lavender-curtain` | Meet/Streams/Nails/Work/Support frame | Original plum/lavender curtain with warm left edge and hanging lavender; transparent alpha. Complete canvas fitted inside 6% padding. |
| `ghostie-welcome` | Home foreground, header wave, Home destination residents | Distinct waving companion in a lavender cup, matching the cream/plum family. Complete canvas fitted inside 10% padding. |
| `ghostie-doorway` | Haven arrival, common-room destination, second-knock visitor | Distinct leaning companion carrying a folded blanket. Complete canvas fitted inside 10% padding. |
| `haven-room` | Home background and preloads | Inpainted empty window seat, aligned 1672×941 canvas. Opaque; no additional padding or crop. |
| `nari-window-seat` | Home character depth plane | Background extraction of the current Home Nari, aligned 1672×941 canvas. No padding/crop so it remains seated in the room. The original bottom-edge framing is retained. |

Tool-returned originals are copied without mutation. `prepare-depth-artwork.py` performs only reproducible delivery normalization, no artistic editing. `prepare-responsive-artwork.py` makes metadata-clean, non-upscaled, content-addressed WebP candidates through the existing manifest; no source master is served. Runtime selection contains no source paths or rights notes. Background alpha is real, not a drawn checkerboard. Edge glow on the props is intentional and shown against the dark room during review.

The credits registry adds `haven-depth-revision`, classified by `website-storybook-artwork`. Model-derived Home plates remain blocked for publication and derivative clearance; third-party concerns remain recorded and final adoption stays pending. The new props/companions also remain pending approval. Credits' artwork archive stays empty. Owner/source: NariNuna website project / built-in imagegen commissioned by Jake's implementation request; outside artist identity not claimed. Final ownership/license/adoption review remains unresolved. Reference inheritance does not imply underlying model rights.

Privacy review: generated props/companions show no private names, location, messages, metadata, real nail work or external marks. Prompt references are already-retained project review art. Original PNG metadata is not browser-delivered; WebP candidates reject EXIF/XMP. Decorative placements have empty alternative text; the room painting's useful description remains on the scene group.

Rollback: revert the experience-v2 commit to return mappings, consumers and generated candidates together. Retained source inventory remains byte-identical.
