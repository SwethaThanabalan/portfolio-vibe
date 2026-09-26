# Content Inventory & Asset Manifest

_Grounded in the codebase and `public/` folder. Use this to make sure nothing is lost in a migration._

## Pages & their content

| Route | Component | Content summary |
|---|---|---|
| `/` | `Home` | Hero (rotating-word headline, CTAs), Selected Work grid, Capabilities |
| `/about` | `About` | Bio, "range" timeline, "how I think," principles, FAQ (Quick answers), contact CTA |
| `/project/sahay-home-companion` | `SahayCaseStudy` | AI home-maintenance case study; AI flow; trust & control; future work; YouTube demo embed |
| `/project/wanderai` | `WanderAI` | "Currently building" WIP page; AI-assisted build workflow progression |
| `/project/talofa-games-retention` | `TalofaCaseStudy` | Monster Walk re-entry; trailer + concept videos; audio summary |
| `/project/adult-you-platform` | `AdultYouCaseStudy` | 0→1 gamified learning; Figma prototype embed; audio summary |
| `/project/amazon-cancellation-teardown` | `AmazonTeardownCaseStudy` | UX teardown |
| `/project/septa-mobile-redesign` | `StrategicCaseStudy` | SEPTA redesign; Figma prototype + file links; audio summary |
| `/deck` | `Deck` | Full immersive deck (print to PDF) |
| `/deck/quick` | `DeckQuick` | Recruiter-first deck (print to PDF) |
| `/mockup-preview` | `MockupPreview` | Internal iPhone mockup preview |

Project copy (titles, descriptors, results, roles, tools, case-study fields) all lives
in `src/data/projects.ts`. That file is the content source of truth for the grid and
several case studies.

## Assets in `public/` — IN USE

| File | Used by |
|---|---|
| `SAHAY(3).png` | Sahay thumbnail |
| `NextStopBetterSEPTAExperience.png` | SEPTA thumbnail |
| `MonsterWalkCover.png` | Monster Walk thumbnail |
| `AdultYouLogLight.png` | Adult You thumbnail |
| `PortfolioPictureswetha.jpg` | Headshot (About + OG image) |
| `Overview of Sahay.png`, `Research(1).jpg`, `Research(2).jpg`, `Research(5).png` | Sahay research figures |
| `Design Process(2)/(4)/(5)/(6)/(7).jpg` | Talofa case study figures |
| `Monsterwalk Audit.png` | Talofa audit |
| `IMG_8534.PNG`, `IMG_9275.PNG`, `IMG_9276.PNG` | Monster Walk screens |
| `MonsterInteraction.png` | MockupPreview |
| `Streak.mov`, `Monster Interaction.mov`, `Hidden Monster.mov` | Talofa concept videos |
| `SeptaProjectAudioSummary.mp3` | Audio summary (used across case studies) |
| `portfolioamazoncasestudy.jpg` | Amazon teardown |
| `favicon.svg` | Site favicon |
| `robots.txt`, `sitemap.xml`, `404.html` | SEO / SPA routing |

## Assets in `public/` — LIKELY UNUSED (0 references in code)

_Confirm with the owner before deleting — some may be intended for future use._

- `Concept3.png`
- `DailyStreak.png`
- `Design Process.jpg` (note: variants (2)/(4)/(5)/(6)/(7) ARE used; the base one is not)
- `MW Before.jpg`
- `Research(3).jpg`
- `Capstone 3.mp4`
- `happy-cartoon-poodle-transparent.gif`
- `vintage-post-box-mirrored-no-background.png`
- Standalone mockup HTML in `public/`: `about-mockup.html`, `contact-mockup.html`,
  `curtain-mockup.html`, `letter-animations.html`, `mailbox-mockup.html`,
  `mockup-preview.html`, `nav-mockup.html`, `particle-mockup.html` (old prototypes)

## External / embedded content (must be reconnected in any migration)

- **Google Fonts:** Fraunces, Inter, Cedarville Cursive (loaded in `index.html`).
- **YouTube embeds:** Sahay demo; Monster Walk trailer.
- **Figma embeds:** Adult You prototype (`embed.figma.com` proto format); SEPTA prototype + file links (in `projects.ts`).
- **Unsplash placeholder images:** several non-featured projects in `projects.ts` still use Unsplash URLs (e-commerce, health, fintech, education) — these are demo/sample projects, not real work.

## Notes

- Some projects in `projects.ts` (e-commerce, mental-health, fintech, education) are
  sample/placeholder entries not shown in the live grid. Decide whether to keep or remove.
- Filenames contain spaces and parentheses (`Design Process(2).jpg`) — preserve exact
  names or update all references if renaming.
