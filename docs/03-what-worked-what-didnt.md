# What Worked / What Didn't — Retrospective

_An honest retrospective of the work on the site. Paste into the "What worked / didn't" tab._

## What worked

- **Token-based design system.** Because colors live as CSS variables, adding dark mode was mostly a matter of overriding tokens rather than editing every component. This paid off repeatedly.
- **Crawlable fallback content in `index.html`.** The `#root` fallback means non-JS crawlers and AI answer engines still read real content about who you are and the projects. Most React SPAs ship a blank root and lose this. Verified present in the deployed HTML.
- **Per-page SEO component.** Each route sets its own title/description/canonical/OG, plus JSON-LD where relevant. Clean and consistent.
- **PDF deck via print CSS.** Fixed 16:9 landscape page sizing made the exported PDF match the on-screen slides instead of reflowing.
- **Accessibility pass.** Real buttons, keyboard-operable audio controls, focus management on route change, and reduced-motion support materially improved the baseline.
- **Repositioning around AI-assisted work.** Sahay as the lead AI UX case study, WanderAI as a "currently building" page, and the FAQ/schema updates gave the site a clear Product/UX/AI story.
- **Mockup-first for the redesign.** Exploring the 3D direction in standalone HTML mockups avoided committing risky changes to the live site.

## What didn't (and the lessons)

- **Tailwind config changes need a dev-server restart.** After enabling `darkMode: 'class'`, the running dev server kept serving stale CSS without the `dark:` utilities, which produced a confusing "nothing changed" phase. Lesson: restart the dev server after touching `tailwind.config.js`; production builds always regenerate fresh, which masked the problem.
- **First dark palette was too muddy.** The initial dark values (`#0f0f11` bg, `#1a1a1e` surface, `#f4f4f5` text) sat too close together and read as low-contrast. Reworked to a true-black base (`#08080a`) with brighter text.
- **Hardcoded dark hex instead of tokens (first attempt).** The initial dark-mode conversion baked literal hex values into ~460 utility classes, so improving the palette didn't propagate. Fixed by switching those to token-based `dark:` classes.
- **Gradient cards missed in the first dark pass.** Light gradient callouts (`from-indigo-50 to-purple-50`) stayed light while their text turned light — unreadable. Added dark gradient variants.
- **Accent indigo on black is technically low-contrast.** Pinning the brand indigo in dark mode keeps the identity but the logo/accent links sit around 2–2.5:1. Mitigated with a subtle halo; flagged as a known tradeoff, not fully WCAG-compliant for those specific elements.
- **Figma embeds are fragile.** The Adult You prototype embed went blank until switched to the `embed.figma.com` format; embeds also depend on the file staying shared as "Anyone with the link can view."
- **The 3D/redesign direction stalled on differentiation.** Two motion mockups (Convergence vs. Depth-of-field) looked too similar at a glance because the difference was purely in the load animation. Resolved by adding replay buttons and exaggerating the motion, but the direction wasn't finalized.

## Known open items

- **Google Search Console** not set up (owner task): submit the sitemap, confirm indexing, watch queries.
- **`sameAs` is LinkedIn-only.** Adding other real profiles (Behance, Dribbble, Medium) would strengthen the entity for answer engines.
- **Per-project OG images** still use the headshot for every page.
- **WanderAI** uses placeholder visuals until real screenshots exist.
- **Accent-on-black contrast** for logo/links is a deliberate branding-over-compliance choice worth revisiting.
- **Dead code:** `TalofaCaseStudy_complete.tsx`, `ProjectCard.tsx` could be removed.
