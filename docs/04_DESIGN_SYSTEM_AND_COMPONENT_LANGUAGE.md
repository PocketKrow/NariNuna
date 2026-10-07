> **2026-10-06 owner revision:** [46 — Custom Anime Creator Art](46_ANIME_CREATOR_ART_DIRECTION.md) and ADR-014 supersede the first minimal visual iteration: light lavender/warm cream, model-faithful new poses and a custom clean-anime asset family. The seven-document architecture, truthful content, original-source preservation and production approval boundaries remain.

> **Current direction, 2026-10-06:** [44 — Minimal Creator Reconstitution](44_MINIMAL_CREATOR_RECONSTITUTION.md) supersedes the environment-first layout, twelve-route contract, room navigation, doorway/secret interaction and WebGL requirements below. Earlier implementation descriptions are historical. Canon, truthful content, source preservation, rights and production approval boundaries remain.

# Design System and Component Language

**Status:** `IMPLEMENTED` foundation; final contrast/art review `PENDING`  
**Owns:** Exact tokens, typography, layout, breakpoints, component semantics, visual state rules  
**Implementation files:** `src/styles/_tokens.scss`, `_base.scss`, `_components.scss`, `_pages.scss`, `_responsive.scss`, `_mobile-first.scss`
**Update trigger:** Token, primitive, component, breakpoint, type, focus, or shared state changes

## Design-system principles

1. **Semantic before decorative.** Components and tokens describe purpose, not a random hex or one-off page mood.
2. **One authored Haven atmosphere for review.** Phase A exposes Nari only while preserving semantic token boundaries and the existing artwork family.
3. **Atmospheric does not mean vague.** Text, controls, focus, states, and destinations remain explicit.
4. **Mobile is composition.** Content reorders and density changes; it is not a scaled desktop screenshot.
5. **Components earn reuse.** Abstract a repeated behavior or semantic pattern, not every repeated `<div>`.

## Source layering

| File | Responsibility | Must not own |
|---|---|---|
| `_tokens.scss` | Fonts, spacing, radii, shadows, motion, theme values | Page selectors or component layout |
| `_base.scss` | Reset, document, typography, focus, utilities | Page-specific composition |
| `_components.scss` | Shared shell, navigation, buttons, cards, theme, media, Ghostie | One-off page sections |
| `_pages.scss` | Route composition and page-level section patterns | Token definitions |
| `_responsive.scss` | Cross-system breakpoint recomposition and preferences | A duplicate desktop system |
| `_mobile-first.scss` | Final phone-only art-first chapter and density authority below `48rem` | Desktop/tablet composition or component behavior |
| `main.scss` | Import order only | Actual styles |

The legacy and room layers retain their existing order; `_mobile-first.scss` is the final phone-only authority after `_face-safe.scss`. Changing this order can change cascade behavior and requires visual regression review. See [`35_MOBILE_FIRST_OVERHAUL.md`](35_MOBILE_FIRST_OVERHAUL.md).

## Theme color tokens

Phase A exposes only the Nari column below. Dark and Light remain part of historical product direction and retained artwork provenance, but they are not active runtime states in this client-review demo.

## Environmental material language

Phase B adds a shared post-banner material primitive in `_feedback.scss`. Every affected route uses the same inset geometry, semantic color mixing, fine border treatment, and low-contrast depth; route-specific `--room-material` values change only the physical cue. The current map is journal, broadcast desk, workbench, rug, shelving, correspondence, album, and gratitude wall. These layers are decorative pseudo-elements with no text or interaction, so document meaning and order remain complete when decoration is unavailable. See `29_ENVIRONMENTAL_CONTINUITY.md`.

| Semantic token | Nari | Dark | Light | Intended use |
|---|---|---|---|---|
| `--bg` | `#2a1820` | `#130d13` | `#efe1cd` | Document atmosphere |
| `--bg-raised` | `#3b222e` | `#211522` | `#f8eddd` | Raised environmental sections |
| `--bg-soft` | `#4b2a38` | `#301c2d` | `#e3cfbf` | Soft depth/media fallback |
| `--bg-inset` | `#211218` | `#0c090d` | `#d7bfae` | Deep/inset rooms and footer |
| `--surface` | `#f2dfcf` | `#e4d5dd` | `#fff8eb` | Primary readable object surface |
| `--surface-soft` | `#dfc6c2` | `#bcaabc` | `#ead5d0` | Secondary surface/action |
| `--text` | `#f9ede2` | `#f4eaf1` | `#321f27` | Text on atmosphere |
| `--text-muted` | `#d9c4c1` | `#c9b7c7` | `#715761` | Secondary text on atmosphere |
| `--ink` | `#2c1821` | `#1a111a` | `#2a1820` | Text on light surfaces |
| `--ink-muted` | `#6f4c58` | `#5d4859` | `#73545c` | Secondary text on surfaces |
| `--plum` | `#8f607d` | `#71516f` | `#8b5e7b` | Material/decorative accent |
| `--lavender` | `#c6a6d4` | `#aa8fc3` | `#9b79ad` | Spectral/soft accent |
| `--rose` | `#cf8d8f` | `#a8737e` | `#bd777a` | Warm supporting accent |
| `--ember` | `#df8a55` | `#bd754c` | `#b95f35` | Primary warm action/emphasis |
| `--cream` | `#f9e8d6` | `#eaddd4` | `#fff8eb` | High-contrast action/light material |
| `--emerald` | `#4fc59e` | `#58c7a5` | `#167b62` | Meaningful signal/selection/discovery |
| `--emerald-ink` | `#0b4c3d` | `#093e32` | `#f1fff9` | Text placed on emerald |
| `--focus` | `#72e2bc` | `#7ce6c2` | `#087b5e` | Focus outline |

`--line`, `--line-dark`, `--page-glow`, and `--grain-opacity` also change by theme. They create separation and atmosphere; they do not carry essential meaning.

### Raw-color exceptions

Raw colors currently appear where a semantic token cannot guarantee contrast across imagery or the isolated secret room:

- hero copy/veil over fixed environment art;
- button text over known ember/cream fills;
- secret-room palette;
- semi-transparent shadows/overlays.

New raw colors require a reason. A page-specific hex that merely resembles an existing semantic token should use the token.

### Color-use rules

- Emerald is sparse and semantic.
- Ember is the normal primary warm action, not every link.
- Cream provides readable high-contrast action over environment art.
- Plum/lavender create material identity and spectral atmosphere.
- Selection uses text/shape/state plus color.
- Final contrast must be measured in every theme and interaction state; token intent is not proof.

## Typography tokens and hierarchy

```css
--font-display: Iowan Old Style, Baskerville, "Times New Roman", serif;
--font-body: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-detail: ui-monospace, "SFMono-Regular", Consolas, monospace;
```

| Element | Current scale | Use |
|---|---|---|
| `h1` | `clamp(2.7rem, 7vw, 6.8rem)`; mobile `clamp(2.65rem, 15vw, 4.4rem)` | One page thesis; keep copy concise |
| `h2` | `clamp(2rem, 4.2vw, 3.8rem)` | Room/section threshold |
| `h3` | `clamp(1.35rem, 2.2vw, 1.8rem)` | Card or content title |
| Body | `1rem / 1.65` | Reading and controls |
| Lead | approx. `1.08–1.3rem / 1.7` | One supporting paragraph |
| Eyebrow | `0.72rem`, bold, tracked monospace | Short category/status only |

Rules:

- One meaningful `h1` per route view.
- Keep body lines near 60–70 characters when composition permits.
- Do not put essential instructions only in tiny monospace.
- `text-wrap: balance` supports headings; do not hard-break every line for aesthetics.
- Italic display emphasis may carry warmth, never the only semantic distinction.

## Spacing, radius, depth, and motion

### Spacing scale

| Token | Value | Typical use |
|---|---:|---|
| `--space-1` | `0.25rem` | Micro gap |
| `--space-2` | `0.5rem` | Inline/compact gap |
| `--space-3` | `0.75rem` | Control/card internal gap |
| `--space-4` | `1rem` | Base spacing |
| `--space-5` | `1.5rem` | Card padding/small section relationship |
| `--space-6` | `2rem` | Standard panel padding |
| `--space-7` | `3rem` | Section internal separation |
| `--space-8` | `4.5rem` | Large composition gap |
| `--space-9` | `6.5rem` | Desktop section padding |

At ≤56rem, `--space-9` becomes `5rem`; at ≤45rem, `--space-8` becomes `3.5rem` and `--space-9` becomes `4.25rem`.

### Shape and depth

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `0.55rem` | Small controls/notes |
| `--radius-md` | `1rem` | Cards/panels |
| `--radius-lg` | `1.75rem` | Major room objects |
| `--radius-pill` | `999px` | Compact actions/status only |
| `--shadow-soft` | Warm 1rem/3rem shadow | Resting surface |
| `--shadow-deep` | Warm 1.5rem/4rem shadow | Floating/active object |

### Layout constants

- Content width: `76rem` plus responsive gutter.
- Gutter: `clamp(1rem, 4vw, 3rem)`; becomes `clamp(1rem, 5vw, 1.5rem)` below 45rem.
- Header: `4.75rem`.
- Minimum document width: `20rem` (320px).

### Motion constants

- Fast: `160ms`.
- Base: `280ms`.
- Ease-out: `cubic-bezier(0.22, 1, 0.36, 1)`.

Longer image emphasis may reach 500ms. No content waits for choreography.

## Responsive breakpoints

Breakpoints are content thresholds, not device names.

| Threshold | System response |
|---:|---|
| `70rem` | Compact nav labels; 3-column grids become 2; last item may span |
| `56rem` | Mobile navigation panel; primary split layouts stack; header utilities reflow |
| `45rem` | Major grids become one column; hero crops/veils change; density reduces |
| `30rem` | Nav becomes one column; button rows become full-width; footer/secret compress |

New breakpoints require a demonstrated content failure that existing thresholds cannot solve. Do not add viewport folklore such as “iPhone breakpoint.”

## Component inventory

| Component/pattern | File/owner | Contract | Primary risk |
|---|---|---|---|
| `SiteShell` | `components/layout/SiteShell.vue` | Skip, header, main, footer, Ghostie | Duplicate landmarks/shell |
| `SiteHeader` | `components/layout/SiteHeader.vue` | MPA anchors, active state, mobile panel | Focus/overflow/current route |
| `SiteFooter` | `components/layout/SiteFooter.vue` | Belonging, secondary routes, selected socials | Becoming a link dump |
| `GhostieSummoner` | `components/ui/GhostieSummoner.vue` | User-triggered low-priority delight | Obstruction/live-region noise |
| `MediaCard` | `components/ui/MediaCard.vue` | Thumbnail + explicit outbound source | Remote failure/privacy |
| `SectionHeading` | `components/ui/SectionHeading.vue` | Consistent section threshold | Heading-level misuse |
| `HavenDoor` | `components/haven/HavenDoor.vue` | Four-state value-to-invite narrative | Fake security/invite expiry |
| `LooseFloorboard` | `components/haven/LooseFloorboard.vue` | Optional three-step discovery | Required task hidden |
| `.button` family | `_components.scss` | Priority, touch size, focus, reduced motion | Too many equal primaries |
| Home arrival actions | `HomePage` + shared Home layers | Haven primary, Meet Nari secondary | Rebuilding the removed room rail or creating an equal-action link wall |
| honest holds | page components | Explain missing truth and safe route | Fake demo/skeleton content |

## Control variants

| Variant | Use | Do not use for |
|---|---|---|
| Ember | Normal primary warm action | Danger/error or every CTA |
| Cream | High-contrast action over environmental art | Low-priority utility |
| Emerald | Meaningful entry, confirmation, or discovery | Decorative social links |
| Soft | Secondary action on readable surface | Primary hero action |
| Outline/Ghost | Lower priority or alternate | Sole control on weak contrast |
| Text link | Directional/source relationship | Ambiguous generic action |

Buttons are at least 3rem high by default; the compact header utility is 2.55rem. Visible focus is a 3px semantic outline with 4px offset. Hover lift is enhancement only.

## State language

| State | Visual and semantic requirement |
|---|---|
| Default | Clear affordance and label |
| Hover | Optional lift/color; never sole content reveal |
| Focus | High-visibility ring; no clipping |
| Active/pressed | Immediate state response |
| Selected | Text/icon/shape plus color; `aria-pressed`/`aria-current` where applicable |
| Unavailable | Plain-language reason and safe alternative |
| Loading | Reserved dimensions; no branded spinner for normal route chunks |
| Error | Preserve task/destination text |
| Reduced motion | Same content/state; transforms and long transitions removed |
| Increased contrast | Stronger borders and critical microcopy weight |

## Image and icon language

- Lucide icons support meaning and are tree-shaken imports.
- Adjacent text names the action; redundant icons are `aria-hidden`.
- No icon-only button lacks an accessible label.
- Do not fake Twitch, YouTube, Discord, or other brand marks with Lucide.
- Decorative environment art has empty alt when nearby HTML contains the meaning.
- Informative character/nail/community art receives concise subject/function alt and separate credit/caption.

## Anti-patterns

- glass dashboard grids;
- random gradients as hierarchy;
- giant typography with no content balance;
- tiny low-contrast navigation;
- every control as a pill;
- generic purple on every surface;
- neutral-black Dark and stark-white Light themes;
- hover-only disclosure;
- decorative parallax or animation loops;
- per-page raw-color systems that bypass semantic tokens;
- text baked into images;
- reusable component abstractions that erase page identity.

## Adding or changing a component

1. Identify a real repeated behavior or semantic contract.
2. Name the state, inputs, outputs, keyboard behavior, and reduced-motion behavior.
3. Use existing tokens; add a token only if it represents a reusable decision.
4. Place shared structure in the correct SCSS layer.
5. Test the active Nari atmosphere at four target widths, keyboard, focus, zoom, and reduced motion. Restore three-theme QA only if the client rejects the Phase A proposal.
6. Update this inventory, the relevant page spec, interaction spec, and QA matrix.
7. Record screenshots/evidence in the pull request without uploading private or uncleared art.
