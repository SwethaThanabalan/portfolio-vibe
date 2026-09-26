# Current Live Website Structure

_The architecture of swethathanabalan.com as it exists in the codebase. Paste into the "Site structure" tab._

## Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite 5
- **Styling:** Tailwind CSS 3 (class-based dark mode) + a custom CSS-variable design system in `src/index.css`
- **Routing:** React Router 7 (`BrowserRouter`)
- **Head/meta:** `react-helmet-async`
- **Hosting:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

## Routes

| Path | Page component | Notes |
|---|---|---|
| `/` | `Home` | Hero + Selected Work grid + Capabilities |
| `/project/:id` | `ProjectRouter` → specific case study | Dispatches by project id |
| `/about` | `About` | Bio, range, principles, FAQ |
| `/deck` | `Deck` | Full immersive case study deck |
| `/deck/quick` | `DeckQuick` | Tight recruiter-first deck |
| `/mockup-preview` | `MockupPreview` | Internal iPhone mockup preview |

### `ProjectRouter` dispatch (in `src/App.tsx`)

- `sahay-home-companion` → `SahayCaseStudy`
- `wanderai` → `WanderAI` (work-in-progress page)
- `talofa-games-retention` → `TalofaCaseStudy`
- `adult-you-platform` → `AdultYouCaseStudy`
- `amazon-cancellation-teardown` → `AmazonTeardownCaseStudy`
- otherwise, if `scope` + `strategicDecision` exist → `StrategicCaseStudy`; else `ProjectDetail`

## Homepage work grid (`src/components/WorkGrid.tsx`)

- **Featured:** `adult-you-platform`, `sahay-home-companion`, `talofa-games-retention`, `septa-mobile-redesign`
- **More work:** `wanderai`, `amazon-cancellation-teardown`

## Key components (`src/components/`)

- `Navbar` — sticky nav, skip link, mobile menu, `ThemeToggle`
- `Hero` — headline with `RotatingWord`, CTAs, `InteractiveBlobField` background
- `WorkGrid` / `WorkCard` — project grid and cards (WorkCard shows a "Currently building" badge when descriptor matches)
- `Capabilities` — capability groups
- `Footer` — indigo footer block with social links
- `ThemeToggle` — light/dark toggle, persists to localStorage, follows system preference
- `RouteChangeHandler` — scroll reset + focus management + page announce on navigation
- `SEO` — per-page title/description/canonical/OG/Twitter + optional JSON-LD
- Supporting: `AnimatedSection`, `CursorFollower`, `FlipCard`, `HeroBackground`, `InteractiveBlobField`, `IPhoneMockup`, `ParallaxImage`, `ProjectCard`, `RotatingWord`, `CaseStudy`

## Pages (`src/pages/`)

`Home`, `About`, `Deck`, `DeckQuick`, `MockupPreview`, `ProjectDetail`, `SahayCaseStudy`, `WanderAI`, `TalofaCaseStudy`, `AdultYouCaseStudy`, `AmazonTeardownCaseStudy`, `StrategicCaseStudy`.

_Note: `TalofaCaseStudy_complete.tsx` and `ProjectCard.tsx` appear to be unused / superseded (dead code)._

## Data

- `src/data/projects.ts` — the single source of project content (title, descriptor, keywords, result, thumbnail, description, role, tools, and case-study-specific fields).
- `src/types.ts` — the `Project` interface.

## SEO / discoverability artifacts

- `index.html` — meta tags, `Person` + `WebSite` + `FAQPage` JSON-LD, a no-flash theme script, a GitHub Pages SPA redirect script, and crawlable fallback content inside `#root`.
- `public/sitemap.xml`, `public/robots.txt`, `public/favicon.svg`
- `public/404.html` + SPA redirect for client-side routing on GitHub Pages

## Design system

- Defined as CSS variables in `src/index.css` `:root`, with a `.dark` override block.
- See `04-brand-guidelines.md` and `design-tokens.json` for the full token set.
