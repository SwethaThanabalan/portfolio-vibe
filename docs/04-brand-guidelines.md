# Brand Guidelines

_Extracted from the live codebase (`src/index.css`, `tailwind.config.js`). These are the real, shipped values. Paste into the "Brand guidelines" tab._

## Voice & tone

- **Positioning:** Product Designer, UX Designer, and Visual Designer. Research → everything between → adoption. A convergent background (photography, communication, marketing, HCI) applied to product.
- **Personality:** unique, classy, bold, confident — through restraint and craft, not volume.
- **Writing:** plain and human. Vary sentence rhythm. Avoid AI-writing tells (negative parallelism, rule-of-three padding, "leverage/utilize/seamlessly," em-dash overuse, dramatic fragments). Never invent findings, metrics, or features.

## Color — light theme

| Token | Value | Use |
|---|---|---|
| `--bg` | `#fafaf9` | Page background (warm off-white) |
| `--surface` | `#f5f4f0` | Raised sections / panels |
| `--text` | `#1a1a1a` | Primary text / headings |
| `--text-secondary` | `#4a4a4a` | Body text |
| `--text-tertiary` | `#5c5c5c` | Tertiary text |
| `--muted` | `#5f5f68` | Labels, captions, meta |
| `--border` | `#e5e4e0` | Borders / dividers |
| `--border-subtle` | `#eeede9` | Subtle dividers |
| `--card` | `#ffffff` | Card backgrounds |
| `--accent` | `#4338ca` | Brand indigo (primary) |
| `--accent-hover` | `#3730a3` | Indigo hover |
| `--finding` | `#f8f5ee` | Callout: finding (warm) |
| `--decision` | `#f0f3f9` | Callout: decision (cool) |
| `--outcome` | `#f0f7f0` | Callout: outcome (green) |

## Color — dark theme (`.dark`)

| Token | Value | Notes |
|---|---|---|
| `--bg` | `#08080a` | True-black base |
| `--surface` | `#17171b` | Raised surface (clearly separated) |
| `--text` | `#ffffff` | Primary text |
| `--text-secondary` | `#e4e4e7` | Body text |
| `--text-tertiary` | `#c9c9d1` | Tertiary |
| `--muted` | `#a9a9b4` | Muted |
| `--border` | `#33333b` | Borders |
| `--card` | `#17171b` | Cards |
| `--accent` | `#4338ca` | Brand indigo kept identical to light (with subtle halo for legibility) |
| `--accent-hover` | `#3730a3` | |
| `--finding` / `--decision` / `--outcome` | `#2a271c` / `#1a2236` / `#16281c` | Dark callout tints |

Callout accent borders used across case studies: gold `#c9a96e`, indigo `var(--accent)`, green `#4a8c5c`.

## Typography

- **Heading / display:** Fraunces (serif). Weights 400 / 600 / 700, plus italic for accent words.
- **Body:** Inter. Weights 400 / 500 / 600.
- **Handwritten (logo):** Cedarville Cursive.

### Type scale (role tokens, fluid via `clamp()`)

| Role | Size | Weight | Line height | Notes |
|---|---|---|---|---|
| Display | `clamp(2.5rem, 5.5vw, 4.5rem)` | 400 | 1.08 | Hero headline only |
| H1 | `clamp(2rem, 4vw, 2.75rem)` | 400 | 1.15 | Case study title |
| H2 | `clamp(1.5rem, 2.5vw, 1.875rem)` | 400 | 1.2 | Section heading |
| H3 | `clamp(1.125rem, 1.5vw, 1.25rem)` | 600 | 1.3 | Subsection |
| Eyebrow | `0.6875rem` | 600 | 1.4 | Uppercase label, `0.1em` tracking |
| Lead | `clamp(1.125rem, 1.4vw, 1.25rem)` | 400 | 1.6 | Intro paragraph |
| Body large | `1.0625rem` | 400 | 1.7 | |
| Body | `0.9375rem` | 400 | 1.7 | Default |
| Body small | `0.875rem` | 400 | 1.6 | |
| Metric | `clamp(2rem, 3vw, 2.5rem)` | 400 | 1 | Fraunces |
| Quote | `clamp(1.25rem, 2.2vw, 1.625rem)` | 400 | 1.35 | Fraunces |

## Spacing scale

`0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 2.5 / 3 / 4 / 5 / 6 / 8` rem (`--space-1`…`--space-32`).
Section gap `5rem`; subsection gap `2.5rem`.

## Layout widths

- Reading: `640px`
- Content: `820px`
- Wide: `1080px`
- Max: `1200px`

## Radius

- `--radius-0`: `0` (editorial default for images)
- `--radius-sm`: `3px`
- `--radius-md`: `6px` (buttons)
- `--radius-lg`: `8px`

## Motion

- Fast `150ms`, base `300ms`, reveal `600ms`.
- Ease-out `cubic-bezier(0.16, 1, 0.3, 1)`; ease-in-out `cubic-bezier(0.4, 0, 0.2, 1)`.
- All motion must respect `prefers-reduced-motion`.

## Components / patterns

- **Buttons:** filled indigo with white text, `--radius-md`, subtle `.btn-3d` shadow that lifts on hover.
- **Cards:** editorial framing, thin `--border`, no rounded corners on images by default.
- **Callouts:** left-border blocks (finding = gold, decision = indigo, outcome = green).
- **Logo:** "Swetha Thanabalan" in Cedarville Cursive, indigo, with a subtle light halo in dark mode.
- **Badges:** pill, indigo background, e.g. "Currently building" with a pulsing dot.

## Accessibility principles

- Text contrast targets 4.5:1 (AA). Known exception: brand indigo on the dark background for the logo/accent links (~2–2.5:1) — a deliberate branding choice with a halo mitigation.
- Real semantic elements (`<button>`, landmarks, single `<main id="main-content">`).
- Focus management on route change; visible focus outlines.
- Reduced-motion respected across CSS and JS animation.
