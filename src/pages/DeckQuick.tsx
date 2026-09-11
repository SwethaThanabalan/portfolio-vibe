import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

/* ═══════════════════════════════════════════════════════════════
   QUICK DECK — tight 10-slide version for recruiter first-pass / PDF
   Same brand system. Print to PDF via browser.
═══════════════════════════════════════════════════════════════ */

let n = 0

type SlideProps = {
  children: React.ReactNode
  variant?: 'bg' | 'surface' | 'dark'
}

function Slide({ children, variant = 'bg' }: SlideProps) {
  n += 1
  const num = String(n).padStart(2, '0')
  return (
    <section className={`deck-slide deck-slide--${variant}`}>
      <span className="deck-num">{num}</span>
      <div className="deck-inner">{children}</div>
    </section>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="deck-eyebrow type-eyebrow mb-4">{children}</p>
}

/* One-slide project summary: problem, role, what I did, outcome, one visual */
function ProjectSlide({
  eyebrow, title, image, imageAlt, problem, role, did, outcome, outcomeLabel = 'Outcome',
}: {
  eyebrow: string; title: string; image: string; imageAlt: string
  problem: string; role: string; did: string; outcome: string; outcomeLabel?: string
}) {
  return (
    <Slide variant="bg">
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="type-h1 mb-6" style={{ maxWidth: '20ch' }}>{title}</h2>
          <div className="space-y-4">
            <div>
              <p className="type-meta-label mb-1">Problem</p>
              <p className="type-body">{problem}</p>
            </div>
            <div>
              <p className="type-meta-label mb-1">My role</p>
              <p className="type-body">{role}</p>
            </div>
            <div>
              <p className="type-meta-label mb-1">What I did</p>
              <p className="type-body">{did}</p>
            </div>
            <div className="border-l-4 pl-4 py-1" style={{ borderLeftColor: '#4a8c5c' }}>
              <p className="type-meta-label mb-1">{outcomeLabel}</p>
              <p className="type-body font-medium">{outcome}</p>
            </div>
          </div>
        </div>
        <figure>
          <img src={image} alt={imageAlt} className="w-full border border-[var(--border)]" loading="lazy" />
        </figure>
      </div>
    </Slide>
  )
}

const DeckQuick = () => {
  n = 0

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="deck bg-white" id="main-content" role="main" aria-label="Portfolio overview deck">
      <SEO
        title="Portfolio Overview | Swetha Thanabalan | Product Designer"
        description="A quick overview of Swetha Thanabalan's product design work: SEPTA transit redesign, Sahay AI home companion, and Monster Walk re-engagement."
        path="/deck/quick"
      />

      {/* 01 — TITLE */}
      <Slide variant="bg">
        <Eyebrow>Product Designer · Overview</Eyebrow>
        <h1 className="type-display mb-6" style={{ maxWidth: '20ch' }}>
          A designer who covers the whole funnel.
        </h1>
        <p className="type-lead mb-8">
          Swetha Thanabalan. I research it, design it, make it look right, and understand how it
          gets adopted, drawing on professional photography, marketing, and an HCI master's.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="mailto:tys.swetha@gmail.com" className="type-body text-[var(--accent)] hover:underline">tys.swetha@gmail.com</a>
          <a href="https://www.linkedin.com/in/swethathanabalan/" target="_blank" rel="noopener noreferrer" className="type-body text-[var(--accent)] hover:underline">linkedin.com/in/swethathanabalan</a>
        </div>
      </Slide>

      {/* 02 — SKILLS / TOOLS / EDUCATION AT A GLANCE */}
      <Slide variant="surface">
        <Eyebrow>At a glance</Eyebrow>
        <h2 className="type-h1 mb-10" style={{ maxWidth: '22ch' }}>
          Range across research, design, visual craft, and adoption.
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <p className="type-meta-label mb-3">Design</p>
            <ul className="space-y-1">
              <li className="type-body-sm">Product Design</li>
              <li className="type-body-sm">Interaction Design</li>
              <li className="type-body-sm">Visual / UI Design</li>
              <li className="type-body-sm">UX &amp; UX Research</li>
              <li className="type-body-sm">Prototyping</li>
            </ul>
          </div>
          <div>
            <p className="type-meta-label mb-3">Adoption</p>
            <ul className="space-y-1">
              <li className="type-body-sm">Marketing &amp; SEO</li>
              <li className="type-body-sm">Public Relations</li>
              <li className="type-body-sm">Content strategy</li>
              <li className="type-body-sm">Professional photography</li>
            </ul>
          </div>
          <div>
            <p className="type-meta-label mb-3">Tools</p>
            <ul className="space-y-1">
              <li className="type-body-sm">Figma, FigJam</li>
              <li className="type-body-sm">Figma Make</li>
              <li className="type-body-sm">Miro, Notion</li>
              <li className="type-body-sm">Adobe Creative Suite</li>
              <li className="type-body-sm">Google Analytics, Ahrefs</li>
            </ul>
          </div>
          <div>
            <p className="type-meta-label mb-3">Education</p>
            <ul className="space-y-2">
              <li className="type-body-sm">MS Human-Computer Interaction, Drexel University</li>
              <li className="type-body-sm">Postgrad, Public Relations, Fanshawe</li>
              <li className="type-body-sm">Postgrad, Advanced Photography, Fanshawe</li>
              <li className="type-body-sm">BSc Communication, University of Madras</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* 03 — SEPTA */}
      <ProjectSlide
        eyebrow="01 · Mobile Transit Experience Redesign"
        title="SEPTA: rebuilding trust in a transit app people depend on."
        image="/NextStopBetterSEPTAExperience.png"
        imageAlt="SEPTA redesign: map-first experience"
        problem="Riders were forced to use Google Maps alongside SEPTA. Login loops and buried navigation eroded trust."
        role="Product Designer. Research, IA, and interaction design. Academic project."
        did="Made the map the core interaction layer, added biometric login, and cut schedule search from 4+ taps to 2."
        outcome="SEPTA later shipped an app with the same features I identified: map integration, biometric login, predictive search."
        outcomeLabel="Market validation"
      />

      {/* 04 — SAHAY */}
      <ProjectSlide
        eyebrow="02 · AI-Assisted Home Maintenance Product"
        title="Sahay: confidence before contractors."
        image="/SAHAY(3).png"
        imageAlt="Sahay: diagnose home issues, learn to fix them, or hire a trusted pro"
        problem="Homeowners piece together fixes across YouTube, Google, Reddit, and family, unable to judge urgency or cost."
        role="Product Designer & Researcher. Initiated the project and led research and design direction across a 3-person team."
        did="Ran interviews and synthesis, then pivoted the product from a service marketplace to AI-assisted issue guidance."
        outcome="Research-driven pivot validated through IA and user-flow testing. Users described it as a home partner, not a maintenance app."
      />

      {/* 05 — MONSTER WALK */}
      <ProjectSlide
        eyebrow="03 · Mobile Game Product Experience"
        title="Monster Walk: redesigning the emotional re-entry moment."
        image="/IMG_9275.PNG"
        imageAlt="Live Monster Walk Daily Quests implementation"
        problem="A fitness game was losing lapsed users after 7 days. The return moment felt fragmented and discouraging."
        role="Product Designer (Research → Strategy → Testing). 3-month beta internship at Talofa."
        did="Ran concept testing over A/B testing to read emotional readiness, then designed a reassuring re-entry flow."
        outcome="4 recommendations shipped in the live product, including daily quests and contextual monster interactions."
        outcomeLabel="Shipped"
      />

      {/* 06 — CLOSING */}
      <Slide variant="dark">
        <Eyebrow>Let's talk</Eyebrow>
        <h2 className="type-display mb-6" style={{ maxWidth: '22ch' }}>
          Research, interaction, visual, and a read on adoption, in one designer.
        </h2>
        <div className="flex flex-col gap-3 mt-8">
          <a href="mailto:tys.swetha@gmail.com" className="type-h3" style={{ color: '#fff' }}>tys.swetha@gmail.com</a>
          <a href="https://www.linkedin.com/in/swethathanabalan/" target="_blank" rel="noopener noreferrer" className="type-body" style={{ color: 'rgba(255,255,255,0.85)' }}>linkedin.com/in/swethathanabalan</a>
          <Link to="/deck" className="type-body mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>See the full case studies →</Link>
        </div>
      </Slide>

      {/* Download button (screen only, hidden in print) */}
      <button
        onClick={() => window.print()}
        className="deck-download"
        aria-label="Download deck as PDF"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download PDF
      </button>

      <p className="deck-hint" style={{ position: 'fixed', bottom: '3vh', left: '50%', transform: 'translateX(-50%)', fontSize: 'var(--type-caption-size)', color: 'var(--muted)', zIndex: 50 }}>
        In the print dialog, choose "Save as PDF"
      </p>
    </div>
  )
}

export default DeckQuick
