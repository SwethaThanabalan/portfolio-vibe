# Portfolio — To-Do After Migration

_Things worth doing that aren't done yet. Ordered by leverage, not effort. "(you)" = owner
task only you can do; "(code)" = an assistant can implement._

## Priority 1 — Highest leverage

### 1. Set up Google Search Console (you)
Verify the domain, submit `sitemap.xml`, watch the coverage and query reports. This is the
only way to confirm the SEO/AEO work is actually landing — whether Google has indexed the
site and what people search to find you. ~15 minutes. Nothing else in SEO matters until
this is done.

### 2. Add analytics (code)
The site currently has none — zero visibility into whether recruiters visit, which case
studies they open, or where they drop off. Add a privacy-friendly tool (Plausible, or free
GA4). Until this exists, every decision about the site is a guess.

### 3. Add a downloadable resume + LinkedIn button (code)
There's no PDF resume anywhere; recruiters expect one. Add a clear "Resume" download link
(drop the PDF into `public/`) and a visible LinkedIn button in the nav or hero. The deck
covers depth; a one-page resume is table stakes for applications.

## Priority 2 — Credibility

### 4. Get at least one testimonial (you)
No social proof exists on the site. One or two quotes from managers/teammates at Talofa or
Adult You would add credibility that design polish can't. Highest credibility-per-effort
on this list.

### 5. Finish or reconsider WanderAI (you + code)
It's featured as "Currently building" but has placeholder visuals and an inferred
description ("AI-assisted travel planning" — confirm this is accurate). An empty WIP page
can read as less impressive than not having it. Either add real screenshots soon or decide
whether it earns its spot right now.

## Priority 3 — Cleanup

### 6. Delete the fake sample projects (code)
`src/data/projects.ts` still contains sample entries with Unsplash stock images
(e-commerce, fintech, mental-health, education). They're not in the live grid, but they're
in the data and could surface if the code changes. Remove them so nothing fake can appear.

### 7. Remove dead code (code)
`src/pages/TalofaCaseStudy_complete.tsx` and `src/components/ProjectCard.tsx` are
unused/superseded. Delete to avoid confusing a new assistant.

### 8. Clean unused assets in `public/` (code — confirm each first)
Likely unused (0 code references): `Concept3.png`, `DailyStreak.png`, `Design Process.jpg`
(the base one; the numbered variants ARE used), `MW Before.jpg`, `Research(3).jpg`,
`Capstone 3.mp4`, `happy-cartoon-poodle-transparent.gif`,
`vintage-post-box-mirrored-no-background.png`, and the old mockup HTML files
(`about-mockup.html`, `contact-mockup.html`, `curtain-mockup.html`,
`letter-animations.html`, `mailbox-mockup.html`, `mockup-preview.html`, `nav-mockup.html`,
`particle-mockup.html`). Confirm each before deleting — "unused in code" doesn't mean "you
don't want it."

## Priority 4 — Known tradeoffs to revisit (optional)

### 9. Accent-on-black contrast
The brand indigo (`#4338ca`) on the dark background for the logo and accent links sits
around 2–2.5:1, below WCAG AA. Deliberate branding-over-compliance choice with a halo
mitigation. Revisit if strict accessibility compliance becomes a requirement.

### 10. Per-project OG images
Every page's social/link preview uses the headshot. Case studies could use their own
thumbnails so shares (and AI citations) show the actual work.

### 11. Add other profiles to schema
The `Person` schema's `sameAs` is LinkedIn-only. Add Behance/Dribbble/Medium if available;
it strengthens the entity for answer engines.

## Deliberately NOT doing (not oversights)

- No automated tests / error boundary — unnecessary for a portfolio of this size.
- No CMS — content in `projects.ts` is fine at this scale.
