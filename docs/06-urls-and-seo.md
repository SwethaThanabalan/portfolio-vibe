# URLs & SEO Preservation

_Protect these in any migration or restructure so indexing and shares don't break._

## Live URLs (do not break)

| URL | In sitemap | Notes |
|---|---|---|
| `https://swethathanabalan.com/` | yes (1.0) | Home |
| `/about` | yes (0.8) | |
| `/deck` | yes (0.6) | |
| `/deck/quick` | yes (0.6) | |
| `/project/sahay-home-companion` | yes (0.9) | |
| `/project/wanderai` | yes (0.8, weekly) | WIP, changes often |
| `/project/talofa-games-retention` | yes (0.9) | |
| `/project/septa-mobile-redesign` | yes (0.9) | |
| `/project/adult-you-platform` | yes (0.6) | |
| `/project/amazon-cancellation-teardown` | yes (0.5) | |
| `/mockup-preview` | no | internal, intentionally not indexed |

If any of these paths change in a migration, add **301 redirects** from old → new to
preserve rankings and existing links.

## SEO / AEO setup currently in place

- **Per-page meta** via `src/components/SEO.tsx`: title, description, canonical, Open
  Graph, Twitter card, optional JSON-LD.
- **Structured data (JSON-LD) in `index.html`:**
  - `Person` (roles, `knowsAbout`, `knowsTool`, description, image, `seeks`)
  - `WebSite`
  - `FAQPage` (roles, tools, methods, AI workflow, background) — mirrored by a visible
    FAQ on the About page (keep them in sync).
- **Case studies** set `CreativeWork` JSON-LD via the SEO component.
- **Crawlable fallback content** inside `#root` in `index.html`: real headline, intro,
  project list, and capabilities so non-JS crawlers and AI answer engines get content.
  **Keep this updated when the featured projects or positioning change.**
- **`robots.txt`** allows all and points to the sitemap.
- **`favicon.svg`** branded "S" monogram.
- **GitHub Pages SPA routing:** `404.html` + a redirect script in `index.html` so deep
  links to client-side routes resolve. Any new host must replicate SPA fallback
  (serve `index.html` for unknown routes) or the deep links 404.

## Migration checklist (SEO-safe)

- [ ] Preserve all URLs above, or add 301 redirects old → new.
- [ ] Carry over `sitemap.xml` and update it if routes change; resubmit in Search Console.
- [ ] Carry over `robots.txt`.
- [ ] Reproduce per-page titles/descriptions/canonicals.
- [ ] Reproduce the `Person` / `WebSite` / `FAQPage` JSON-LD.
- [ ] Reproduce (and update) the crawlable fallback content, or use SSR/SSG so real
      content ships in the initial HTML (a rebuild on Next.js/Astro would make the
      fallback unnecessary because pages render server-side).
- [ ] Keep the visible About FAQ in sync with the FAQPage schema.
- [ ] Preserve the CNAME / custom domain (`swethathanabalan.com`) and HTTPS.
- [ ] Keep OG image working (currently the headshot); consider per-project OG images.

## Owner tasks (not code)

- Set up **Google Search Console**, verify the domain, submit the sitemap, watch coverage.
- Add other real profiles (Behance, Dribbble, Medium) to the `Person` schema `sameAs`.
