# Original-model delivery for minimal reconstitution

Date: 2026-10-06. Authority: Jake's explicit original-model-only redesign/review instruction, within existing supplied-art intake scope. This is delivery preparation, not new character design or public-use approval.

Sources: existing `public/media/nari/nari-model-fullbody.webp` (888×2400 RGBA) and `nari-model-portrait.webp` (883×1360 RGBA), derived by the existing supplied-archive pipeline. Original model archive master and prior intake remain unchanged. Current source and each derivative SHA-256, dimensions, byte count and path: `src/data/model-delivery.json`.

Transform: Pillow LANCZOS proportional resize, WebP quality 80/method 6, alpha retained, no crop/recolor/redraw/upscale/animation, metadata not forwarded. Widths 160/240/320/480/640/original delivery width. Masters/source copies are not overwritten. Content-addressed responsive URLs retain existing immutable-cache policy. Rerun: `npm run artwork:model`.

Uses: original-source portrait on Home, original fullbody on Meet Nari. Supporting family is established from existing individually painted transparent Ghosties and lavender; no new supporting master is generated. Official platform glyphs reuse current SocialDock vectors. All existing ownership, unknown artist, required credit, website-use and final Nari/rights approvals retain their registry status. Model context credit resolves to the existing Nari character-attribution-pending record; supporting illustrations resolve to existing website-storybook-artwork. No new legal permission or canonical adoption is asserted.

## Minimal identity and social preview

`prepare-creator-identity.py` creates a 1200×630 share composition using only the supplied original portrait pixels, proportional non-upscaled resize, site-owned typography and warm-paper geometry. No likeness synthesis or pose/expression change. The PNG composition master is retained in `src/assets/source/minimal/`; JPEG delivery is content-addressed and metadata-clean. `creator-identity.json` records source/master/delivery hashes and dimensions. Typography rasterizes system DejaVu Serif/Sans; no font file is embedded or redistributed. The original Nari image's artist/website/derivative rights remain unresolved, so this family is blocked for production until confirmed; website-authored text and composition are not new permission for the underlying model.

A hand-authored `nari-monogram.svg` master and served `favicon.svg` use site-native geometry, emerald, paper and lavender, with no character likeness. The active shell retires the old painted-character favicon/apple icon/installation manifest links; existing files remain retained. All social metadata now uses the new original-model composition rather than the retired illustrated rooms. Registry family `minimal-creator-identity` tracks these two delivery assets with pending adoption and model-rights status. No canonical domain or approval is invented.
