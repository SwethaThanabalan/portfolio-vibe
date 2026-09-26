# CLAUDE.md — Project context for AI assistants

This file orients an AI coding assistant working on this repository. Read it first.

## What this is

The personal portfolio of **Swetha Thanabalan** (Product / UX / Visual Designer),
live at **swethathanabalan.com**. It is a client-rendered single-page app.

- **Stack:** React 18 + TypeScript, Vite 5, Tailwind CSS 3 (class-based dark mode),
  React Router 7, `react-helmet-async` for head tags.
- **Styling:** a custom CSS-variable design system in `src/index.css` (tokens), plus
  Tailwind utilities. See `docs/04-brand-guidelines.md` and `brand/design-tokens.json`.
- **Hosting:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).

## Run / build / deploy

```bash
npm install
npm run dev      # local dev server (Vite)
npm run build    # tsc + vite build -> dist/
npm run preview  # preview the production build
```

- **Deploy:** pushing to `main` triggers the GitHub Actions workflow, which runs
  `npm ci`, `npm run build`, and publishes `dist/` to GitHub Pages. **Pushing to main
  deploys to the live site.** Confirm with the user before pushing.
- CI rebuilds from source, so `dist/` and `node_modules/` are **not committed**.

## Critical conventions & gotchas (learned the hard way)

1. **Restart the dev server after editing `tailwind.config.js`.** Tailwind reads its
   config once at startup; changes (like dark-mode utilities) won't appear via HMR and
   will look like "nothing changed." Production builds always regenerate fresh.
2. **Colors go through tokens.** Prefer `var(--token)` / `dark:bg-[var(--surface)]`
   over hardcoded hex. An early dark-mode pass hardcoded ~460 hex values and they
   didn't track palette changes; that was reworked to tokens.
3. **Keep the brand indigo (`#4338ca`) identical in dark mode** for the logo, the CTA
   button, and accent links. It's a deliberate branding choice; a subtle light halo
   (`text-shadow`) is used for legibility on the near-black background.
4. **Respect `prefers-reduced-motion`** in all CSS and JS animation.
5. **Never invent findings, metrics, product outcomes, or features** in case-study
   copy. Only use facts the user provides. This is a hard rule.
6. **Writing voice:** plain and human; avoid AI-writing tropes (negative parallelism,
   rule-of-three padding, "leverage/utilize/seamlessly," em-dash overuse, dramatic
   fragments). Reference: tropes.fyi.
7. **Figma embeds** use the `embed.figma.com/proto/...?embed-host=share` format and
   depend on the file being shared "Anyone with the link can view." The legacy
   `figma.com/embed?url=` wrapper rendered blank.
8. **Deck print CSS** (in `src/index.css`, `@media print`) is tuned for a fixed 16:9
   landscape page so the PDF matches on-screen slides. Don't revert to px page sizing.

## Where things live

- Routes & dispatch: `src/App.tsx` (`ProjectRouter` picks the case-study component by id)
- Project content: `src/data/projects.ts` (single source of truth) + `src/types.ts`
- Homepage grid order: `src/components/WorkGrid.tsx` (`FEATURED` + `MORE_WORK` arrays)
- Design tokens: `src/index.css` `:root` and `.dark`
- SEO/meta/JSON-LD/crawlable fallback: `src/components/SEO.tsx` + `index.html`

## Companion docs (in `docs/`)

- `01-what-weve-done.md` — full change log
- `02-site-structure.md` — architecture, routes, components
- `03-what-worked-what-didnt.md` — retrospective + known open items
- `04-brand-guidelines.md` — colors, type, spacing, tokens, voice
- `05-content-and-assets.md` — content inventory + asset manifest (unused files flagged)
- `06-urls-and-seo.md` — route/URL map + SEO-preservation checklist
- `07-todo-after-migration.md` — outstanding tasks (analytics, resume, cleanup, etc.)
- `brand/design-tokens.json` — machine-readable tokens

## Known open items

- Google Search Console not set up (owner task).
- `sameAs` schema is LinkedIn-only; add other profiles when available.
- Per-project OG images still default to the headshot.
- WanderAI uses placeholder visuals until real screenshots exist.
- Dead code: `src/pages/TalofaCaseStudy_complete.tsx`, `src/components/ProjectCard.tsx`.
- A tactile / faux-3D redesign was explored in `mockup/` but not shipped.
