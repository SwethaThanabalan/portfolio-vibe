# What We've Done — Change Log

_A running record of the work done on swethathanabalan.com. Grounded in the actual commits and code. Paste this into the "What we've done" tab of the portfolio doc._

## Overview

The site is a React + TypeScript + Vite single-page app, styled with Tailwind CSS and a custom CSS-variable design system, deployed to GitHub Pages at **swethathanabalan.com** via a GitHub Actions workflow (build on push to `main`).

---

## 1. Case study deck (PDF-exportable)

- Built two decks: a full immersive deck at `/deck` and a tight recruiter-first deck at `/deck/quick`.
- Added a "Download PDF" button that uses the browser's print flow.
- Iterated on print CSS several times to fix PDF export problems:
  - Moved from pixel page sizing to a fixed 16:9 landscape page so slides match the on-screen layout.
  - Fixed content overflow by compressing type/spacing in print and forcing two-column slides to keep the image on the right.

## 2. Accessibility pass (toward WCAG 2.1 AA)

- Raised low-contrast text tokens so body/caption/label text clears 4.5:1.
- Made the FlipCard a real button with `aria-pressed` and an accessible label.
- Reworked the audio players in case studies: labeled play/pause, a slider-role seek bar with keyboard support, `aria-expanded` disclosures, and a transcript.
- Added `controls` to autoplay/loop videos, gated autoplay behind `prefers-reduced-motion`, and added text alternatives.
- Fixed landmarks and skip-link targets; ensured a single `<main id="main-content">` per route.
- Added route-change focus management + an `aria-live` page announcement (`RouteChangeHandler`).
- Added `aria-expanded`/`aria-controls` to the mobile nav toggle; hid decorative separators.
- Gated JS-driven motion (footer parallax, smooth scroll) behind `prefers-reduced-motion`.

## 3. Full dark mode

- Enabled Tailwind class-based dark mode with a no-flash init script in `index.html`.
- Added dark color tokens via a `.dark` override, plus a persistent, system-aware `ThemeToggle` in the navbar.
- Converted the case-study and component colors to token-based `dark:` variants.
- Refined the dark palette to a true-black base (`#08080a`) with brighter text after the first pass read as muddy.
- Kept the brand indigo identical in dark mode (logo, CTA button, accent links) with a subtle light halo for legibility on black.
- Added subtle per-theme 3D drop shadows to filled buttons.
- Fixed light gradient cards (Market Validation, Reflection) that were unreadable in dark mode.

**Key lesson:** the dev server has to be restarted after changing `tailwind.config.js` — Tailwind reads its config once at startup, so the `dark:` utilities weren't generated until a fresh boot. This caused a "nothing changed" phase during the dark-mode work.

## 4. Portfolio repositioning (Product / UX / AI-assisted)

- Reordered the homepage featured grid and later set the order to: Adult You, Sahay, Monster Walk, SEPTA.
- Added a "More work" section (WanderAI, Amazon teardown).
- **Sahay** strengthened as the lead AI UX case study: clarified the marketplace → issue-first pivot, added an explicit AI flow, a non-functional-prototype disclaimer, a trust & control section, and a "Where I would take this next" future-work section.
- **WanderAI**: added a lightweight "Currently building" work-in-progress page showing the AI-assisted build workflow (ad hoc prompts → repeated unintended changes → documented constraints → phase-specific Markdown files → steering document → more controlled iteration). Placeholder uses centered "WanderAI" text on white (no borrowed image).
- **Talofa / Monster Walk**: made the Welcome Back problem and problem-framing gaps easier to scan.
- **Adult You**: updated the interactive prototype embed to the current Figma proto flow using the `embed.figma.com` format.

## 5. SEO / AEO

- Updated `sitemap.xml` (added `/project/wanderai`, `/deck/quick`; aligned priorities).
- Refreshed the crawlable fallback content in `index.html` so non-JS crawlers and answer engines get current, accurate content.
- Added a branded `favicon.svg` (an "S" monogram) replacing the default Vite icon.
- Enriched the `Person` JSON-LD schema (roles, `knowsAbout`, `knowsTool`, description, image, `seeks`).
- Added `FAQPage` structured data (roles, tools, methods, AI workflow, background).
- Added a matching visible FAQ on the About page so the visible content and schema align.
- Reworded the FAQ answers to read more human (varied rhythm, fewer AI-writing tells).

## 6. Design exploration (not shipped)

- Explored modernizing the visual direction with tactile / faux-3D treatments.
- Built standalone mockups (`mockup/` folder): a tactile homepage, a "Convergence" direction, and a "Depth of field + convergence" hybrid.
- Direction discussion is ongoing; nothing from the 3D exploration has been deployed.

---

## Deployment notes

- Push to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci`, `npm run build`, and deploys `dist/` to GitHub Pages.
- `dist/` and `node_modules/` are not committed; CI rebuilds fresh.
- SPA routes 404 to `curl` but work in-browser via the GitHub Pages SPA redirect script in `index.html`.
