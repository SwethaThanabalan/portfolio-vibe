# Swetha Thanabalan Portfolio (new design)

Static site: one `index.html` plus `assets/`. No build step and no framework.
It replaces the React/Vite site in the `portfolio-vibe` repo (served at swethathanabalan.com through GitHub Pages).

## Run locally
```
python3 -m http.server 8000
# open http://localhost:8000
```

## How it's organized
- Everything lives in `index.html`: the styles in one `<style>` block, the scripts at the bottom.
- Pages are hash routes in that one file:
  - `#` (home)
  - `#sahay`
  - `#monster-walk`
  - `#septa`
  - `#adult-you`
  - `#about`
  - `#photography`
  - `#graphic-design`
- Each page is a `<section data-page hidden>`. A small router shows the section that matches `location.hash` and sets the page title.
- Fonts load from Google Fonts: Fraunces (headings), Inter (body), Caveat (handwritten notes).
- `assets/sahay-app/` is a built, working Sahay prototype. The Sahay page embeds it in an iframe.
- `assets/photography/` and `assets/graphic/` hold the two gallery pages' images. Every image needs alt text; the gallery lightbox reads it.
- `assets/about/` holds the About page's photos and the dance video. They appear as photo stacks you tap to flip through (`[data-deck]`).
- Theme: light, dark and high-contrast, through CSS variables on `:root` and the theme menu in the nav.

## Copy rules (keep these when editing)
- Short and plain, with no em dashes and no invented facts or metrics.
- Project pages use a neutral voice, with no "I" or "we". The one exception is Key decisions, which uses an explicit "I".
- Never label anything "case study", and don't mention years.
- Keep a diplomatic tone: nothing that reads as complaining or attacking anyone.

## Before going live (to do)
The new design doesn't have these yet. The old React site did:
1. **SEO/AEO tags.** Add, per page:
   - a meta description, canonical URL, and Open Graph and Twitter tags
   - Person, WebSite and FAQPage JSON-LD (the old `index.html` in `portfolio-vibe` has these to reuse)
2. **Real URLs instead of hash routes.** Search engines don't index `#sahay` as its own page. Ideally give each project its own path (for example `/project/sahay/`) with real HTML.
3. **Keep old links working.** Redirect the old addresses:
   - `/project/sahay-home-companion` to Sahay
   - `/project/talofa-games-retention` to Monster Walk
   - `/project/septa-mobile-redesign` to SEPTA
   - `/project/adult-you-platform` to Adult You
   - `/about` to About

   Also decide what happens to `/deck`, `/deck/quick`, `/project/wanderai` and `/project/amazon-cancellation-teardown`.
4. **Update `sitemap.xml` and `robots.txt`**, and keep the `CNAME` file (`swethathanabalan.com`).
5. **GitHub Pages workflow.** The old `deploy.yml` runs `npm ci` and `npm run build`. For this static site, deploy the folder as-is, or replace the workflow with a plain Pages upload.
6. **Not carried over from the old site:**
   - WanderAI
   - Amazon cancellation teardown
   - the /deck case-study decks
   - the About FAQ

   Decide whether to drop them or bring them back later as a "More work" section.
7. **Large files.** `assets/hero-hike.mp4` (~6.6 MB) and `assets/about/dance.mp4` (~6 MB) could be compressed further if load speed matters.

## Project pages for search engines
`index.html` shows each project by hash route (`/#sahay`), which search engines treat as the home page.
So each project also has a real address, generated from `index.html`:

- `/project/sahay/`, `/project/monster-walk/`, `/project/septa/`, `/project/adult-you/`
- each has its own title, description, canonical link, social tags and structured data, and appears in `sitemap.xml`
- the old `/project/<old-name>/` addresses redirect to them

After editing `index.html`, regenerate them (the deploy workflow also does this):
```
python3 scripts/build-project-pages.py
```
About, Photography and Graphic design are still hash routes. Add them to `PROJECTS`/`OTHER_PAGES` in the script if they should get their own addresses too.
