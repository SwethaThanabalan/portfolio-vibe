import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

/* ═══════════════════════════════════════════════════════════════
   CASE STUDY DECK
   Immersive scroll deck for SEPTA, Sahay, Monster Walk.
   Uses the portfolio brand system. Print to PDF via browser.
═══════════════════════════════════════════════════════════════ */

let slideCounter = 0

type SlideProps = {
  children: React.ReactNode
  variant?: 'bg' | 'surface' | 'dark'
}

function Slide({ children, variant = 'bg' }: SlideProps) {
  slideCounter += 1
  const num = String(slideCounter).padStart(2, '0')
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

const Deck = () => {
  slideCounter = 0

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="deck bg-white">
      <SEO
        title="Case Study Deck | Swetha Thanabalan | Product Designer"
        description="Selected product design case studies: SEPTA transit redesign, Sahay AI home maintenance companion, and Monster Walk re-engagement strategy."
        path="/deck"
      />

      {/* ══════════ TITLE ══════════ */}
      <Slide variant="bg">
        <Eyebrow>Product Design Case Studies</Eyebrow>
        <h1 className="type-display mb-6" style={{ maxWidth: '18ch' }}>
          Selected product design work.
        </h1>
        <p className="type-lead mb-10">
          Swetha Thanabalan, Product Designer with an HCI background and a commercial photography
          background, currently building AI-assisted products.
        </p>
        <div className="grid grid-cols-3 gap-6" style={{ maxWidth: '640px' }}>
          <div className="border-t-2 pt-3" style={{ borderTopColor: 'var(--accent)' }}>
            <p className="type-meta-label mb-1" style={{ color: 'var(--accent)' }}>01</p>
            <p className="type-body font-medium">SEPTA Transit Redesign</p>
          </div>
          <div className="border-t-2 pt-3" style={{ borderTopColor: 'var(--accent)' }}>
            <p className="type-meta-label mb-1" style={{ color: 'var(--accent)' }}>02</p>
            <p className="type-body font-medium">Sahay AI Home Companion</p>
          </div>
          <div className="border-t-2 pt-3" style={{ borderTopColor: 'var(--accent)' }}>
            <p className="type-meta-label mb-1" style={{ color: 'var(--accent)' }}>03</p>
            <p className="type-body font-medium">Monster Walk Re-entry</p>
          </div>
        </div>
      </Slide>

      {/* ══════════ ABOUT ══════════ */}
      <Slide variant="surface">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <Eyebrow>About</Eyebrow>
            <h2 className="type-h1 mb-6" style={{ maxWidth: '18ch' }}>
              I didn't start in product design. I started behind a camera.
            </h2>
            <div className="space-y-4 type-body-lg">
              <p>
                I moved from commercial photography into marketing and SEO, then into product
                design through an HCI master's at Drexel University. Photography taught me to
                notice what others overlook and to think about how framing changes understanding.
              </p>
              <p>
                Today I work across user research, interaction design, prototyping, and
                AI-assisted product development, having designed across India, Canada, and the
                United States.
              </p>
            </div>
          </div>
          <div className="md:col-span-2">
            <figure>
              <img
                src="/PortfolioPictureswetha.jpg"
                alt="Swetha Thanabalan"
                className="w-full border border-[var(--border)]"
                style={{ aspectRatio: '3/4', objectFit: 'cover' }}
                loading="eager"
              />
              <figcaption className="type-caption mt-3">Commercial photographer → product designer</figcaption>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ══════════════════════════════════════════
          PROJECT 1 — SEPTA
      ══════════════════════════════════════════ */}

      {/* Cover */}
      <Slide variant="dark">
        <Eyebrow>Case Study 01 · Mobile Transit Experience Redesign</Eyebrow>
        <h2 className="type-display mb-6" style={{ maxWidth: '20ch' }}>
          SEPTA: rebuilding trust in a transit app people depend on.
        </h2>
        <p className="type-lead" style={{ color: 'rgba(255,255,255,0.7)' }}>
          A rider-first redesign of SEPTA's mobile app, centered on how people actually plan trips.
        </p>
        <p className="type-caption mt-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Context: Academic project. No backend access. Research and design only.
        </p>
      </Slide>

      {/* Snapshot */}
      <Slide variant="bg">
        <Eyebrow>Snapshot</Eyebrow>
        <h2 className="type-h1 mb-8" style={{ maxWidth: '22ch' }}>
          Riders were forced to use Google Maps alongside SEPTA.
        </h2>
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <p className="type-meta-label">Role</p>
            <p className="type-meta">Product Designer</p>
          </div>
          <div>
            <p className="type-meta-label">Timeline</p>
            <p className="type-meta">3 months</p>
          </div>
          <div>
            <p className="type-meta-label">Methods</p>
            <p className="type-meta">Interviews, heuristic evaluation, usability testing</p>
          </div>
          <div>
            <p className="type-meta-label">Tools</p>
            <p className="type-meta">Figma, Miro, Notion</p>
          </div>
        </div>
        <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#4a8c5c' }}>
          <p className="type-body font-medium">
            SEPTA later launched a revamped app with the same features I identified: map
            integration, biometric login, and predictive search.
          </p>
        </div>
      </Slide>

      {/* Research */}
      <Slide variant="surface">
        <Eyebrow>User research</Eyebrow>
        <h2 className="type-h1 mb-10" style={{ maxWidth: '20ch' }}>
          Interviews surfaced a trust problem underneath the usability issues.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#c9a96e' }}>
            <p className="type-metric mb-1">100%</p>
            <p className="type-body-sm">of 8 interviewed commuters kept Google Maps open while using SEPTA.</p>
          </div>
          <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#c9a96e' }}>
            <p className="type-metric mb-1">6 / 8</p>
            <p className="type-body-sm">test sessions hit login failures, breaking trust in the app's reliability.</p>
          </div>
          <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#c9a96e' }}>
            <p className="type-metric mb-1">4+ taps</p>
            <p className="type-body-sm">to find a route, and users still couldn't locate it. Navigation reflected the org chart, not user mental models.</p>
          </div>
        </div>
      </Slide>

      {/* Key decision */}
      <Slide variant="bg">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Product decision</Eyebrow>
            <h2 className="type-h1 mb-6" style={{ maxWidth: '18ch' }}>
              Make the map the core interaction layer.
            </h2>
            <div className="space-y-5">
              <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: '#c9a96e' }}>
                <p className="type-meta-label mb-1">Finding</p>
                <p className="type-body">Even "quick lookup" users thought spatially first, they wanted to see where they were going.</p>
              </div>
              <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: 'var(--accent)' }}>
                <p className="type-meta-label mb-1">Decision</p>
                <p className="type-body">Map as the primary layer. Routes, stops, and real-time updates overlaid, not siloed in tabs.</p>
              </div>
              <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: '#4a8c5c' }}>
                <p className="type-meta-label mb-1">Result</p>
                <p className="type-body">Users could plan, track, and adjust trips without leaving the app.</p>
              </div>
            </div>
          </div>
          <figure>
            <img src="/NextStopBetterSEPTAExperience.png" alt="SEPTA redesign: map-first experience" className="w-full border border-[var(--border)]" loading="lazy" />
          </figure>
        </div>
      </Slide>

      {/* Outcome */}
      <Slide variant="dark">
        <Eyebrow>Outcome</Eyebrow>
        <h2 className="type-display mb-8" style={{ maxWidth: '20ch' }}>
          The redesign matched how riders actually plan trips.
        </h2>
        <div className="grid md:grid-cols-2 gap-6" style={{ maxWidth: '760px' }}>
          <p className="type-body">Map-first navigation replaced the buried tab. Biometric login and persistent sessions removed the trust-breaking logout loops.</p>
          <p className="type-body">Schedule search dropped from 4+ taps to 2. Accessibility was built into the system, not bolted on.</p>
        </div>
      </Slide>

      {/* ══════════════════════════════════════════
          PROJECT 2 — SAHAY
      ══════════════════════════════════════════ */}

      <Slide variant="dark">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Case Study 02 · AI-Assisted Home Maintenance Product</Eyebrow>
            <h2 className="type-display mb-6" style={{ maxWidth: '20ch' }}>
              Sahay: confidence before contractors.
            </h2>
            <p className="type-lead" style={{ color: 'rgba(255,255,255,0.7)' }}>
              An AI home maintenance companion that helps homeowners understand problems before
              deciding what to do next.
            </p>
          </div>
          <figure>
            <img
              src="/SAHAY(3).png"
              alt="Sahay: diagnose home issues, learn to fix them, or hire a trusted pro, all in one place"
              className="w-full"
              loading="lazy"
            />
          </figure>
        </div>
      </Slide>

      {/* Snapshot */}
      <Slide variant="bg">
        <Eyebrow>Snapshot</Eyebrow>
        <h2 className="type-h1 mb-8" style={{ maxWidth: '22ch' }}>
          Homeowners want confidence before they spend money on a repair.
        </h2>
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <p className="type-meta-label">Role</p>
            <p className="type-meta">Product Designer & Researcher (initiated project, led research)</p>
          </div>
          <div>
            <p className="type-meta-label">Timeline</p>
            <p className="type-meta">2 academic quarters</p>
          </div>
          <div>
            <p className="type-meta-label">Team</p>
            <p className="type-meta">3 people (I led research and design direction)</p>
          </div>
          <div>
            <p className="type-meta-label">Tools</p>
            <p className="type-meta">Figma, FigJam, Figma Make, Google Forms</p>
          </div>
        </div>
        <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#4a8c5c' }}>
          <p className="type-body font-medium">
            Research-driven pivot from service marketplace to AI guidance product. Validated
            through information architecture and user flow testing.
          </p>
        </div>
      </Slide>

      {/* Research synthesis */}
      <Slide variant="surface">
        <Eyebrow>Research synthesis</Eyebrow>
        <h2 className="type-h1 mb-8" style={{ maxWidth: '22ch' }}>
          Interview notes grouped into four recurring themes.
        </h2>
        <figure>
          <img src="/Overview of Sahay.png" alt="Sahay research synthesis: four affinity-mapping themes" className="w-full border border-[var(--border)]" loading="lazy" />
          <figcaption className="type-caption mt-3">Affinity mapping across maintenance behavior, urgency, trust, and DIY decision-making.</figcaption>
        </figure>
      </Slide>

      {/* Research artifact — DIY affinity board */}
      <Slide variant="bg">
        <Eyebrow>Research evidence</Eyebrow>
        <h2 className="type-h1 mb-8" style={{ maxWidth: '24ch' }}>
          Homeowners piece together fixes across many disconnected sources.
        </h2>
        <figure>
          <img src="/Research(2).jpg" alt="DIY Approach to Home Repairs affinity board with interview notes and AI-summarized insights" className="w-full border border-[var(--border)]" loading="lazy" />
          <figcaption className="type-caption mt-3">Affinity board: participants relied on YouTube, Google, Reddit, and family, and hesitated because they couldn't judge urgency or cost.</figcaption>
        </figure>
      </Slide>

      {/* Key decision — the pivot */}
      <Slide variant="bg">
        <Eyebrow>The pivot</Eyebrow>
        <h2 className="type-h1 mb-10" style={{ maxWidth: '20ch' }}>
          From transactional marketplace to intelligent companion.
        </h2>
        <div className="grid md:grid-cols-2 gap-px border border-[var(--border)]">
          <div className="p-8" style={{ backgroundColor: 'var(--finding)' }}>
            <p className="type-meta-label mb-3">What we assumed</p>
            <p className="type-h3 mb-2">Service Marketplace</p>
            <p className="type-body-sm">Help people find and book contractors faster.</p>
          </div>
          <div className="p-8" style={{ backgroundColor: 'var(--outcome)' }}>
            <p className="type-meta-label mb-3">What research revealed</p>
            <p className="type-h3 mb-2">AI-Powered Home Companion</p>
            <p className="type-body-sm">Help people understand problems and make informed decisions before spending money.</p>
          </div>
        </div>
      </Slide>

      {/* Finding -> decision -> response */}
      <Slide variant="bg">
        <Eyebrow>Finding → decision → design</Eyebrow>
        <h2 className="type-h1 mb-10" style={{ maxWidth: '22ch' }}>
          Move issue understanding ahead of provider discovery.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: '#c9a96e' }}>
            <p className="type-meta-label mb-2">Research finding</p>
            <p className="type-body">Users struggled to judge urgency, identify symptoms, and decide whether an issue needed a professional.</p>
          </div>
          <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: 'var(--accent)' }}>
            <p className="type-meta-label mb-2">Product decision</p>
            <p className="type-body">Help users assess the problem first, before booking anything.</p>
          </div>
          <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: '#4a8c5c' }}>
            <p className="type-meta-label mb-2">Design response</p>
            <p className="type-body">AI-assisted assessment: describe symptoms, get urgency guidance, choose DIY or a pro.</p>
          </div>
        </div>
      </Slide>

      {/* Outcome */}
      <Slide variant="dark">
        <Eyebrow>Outcome</Eyebrow>
        <h2 className="type-display mb-8" style={{ maxWidth: '22ch' }}>
          In testing, users described Sahay as a home partner.
        </h2>
        <p className="type-lead" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '52ch' }}>
          That language signaled the product felt different from existing solutions. I advocated
          for keeping DIY guidance when there was internal pressure to cut it, and usability
          testing validated it as one of the strongest features.
        </p>
      </Slide>

      {/* ══════════════════════════════════════════
          PROJECT 3 — MONSTER WALK
      ══════════════════════════════════════════ */}

      <Slide variant="dark">
        <Eyebrow>Case Study 03 · Mobile Game Product Experience</Eyebrow>
        <h2 className="type-display mb-6" style={{ maxWidth: '20ch' }}>
          Monster Walk: redesigning the emotional re-entry moment.
        </h2>
        <p className="type-lead" style={{ color: 'rgba(255,255,255,0.7)' }}>
          A behavioral re-entry strategy for a fitness game losing lapsed users after 7 days of
          inactivity.
        </p>
      </Slide>

      {/* Snapshot */}
      <Slide variant="bg">
        <Eyebrow>Snapshot</Eyebrow>
        <h2 className="type-h1 mb-8" style={{ maxWidth: '24ch' }}>
          Research showed lapsed users hesitated to return, mostly out of guilt and uncertainty.
        </h2>
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <p className="type-meta-label">Role</p>
            <p className="type-meta">Product Designer (Research → Strategy → Testing)</p>
          </div>
          <div>
            <p className="type-meta-label">Timeline</p>
            <p className="type-meta">3 months (beta)</p>
          </div>
          <div>
            <p className="type-meta-label">Stakeholders</p>
            <p className="type-meta">Founder, coaches, power users, gaming advisor</p>
          </div>
          <div>
            <p className="type-meta-label">Methods</p>
            <p className="type-meta">Concept testing, stakeholder interviews</p>
          </div>
        </div>
        <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#4a8c5c' }}>
          <p className="type-metric mb-1">4 shipped</p>
          <p className="type-body-sm">recommendations implemented in the live product.</p>
        </div>
      </Slide>

      {/* Before state */}
      <Slide variant="surface">
        <Eyebrow>Before</Eyebrow>
        <h2 className="type-h1 mb-8" style={{ maxWidth: '22ch' }}>
          The return moment felt fragmented.
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { src: '/Design Process(4).jpg', n: '01 Daily Tasks' },
            { src: '/Design Process(5).jpg', n: '02 Welcome Back' },
            { src: '/Design Process(6).jpg', n: '03 Item Received' },
            { src: '/Design Process(7).jpg', n: '04 Gameplay Return' },
          ].map((s) => (
            <figure key={s.n}>
              <img src={s.src} alt={`Monster Walk old experience: ${s.n}`} className="w-full border border-[var(--border)]" loading="lazy" />
              <p className="type-caption mt-2">{s.n}</p>
            </figure>
          ))}
        </div>
      </Slide>

      {/* Key decision */}
      <Slide variant="bg">
        <Eyebrow>Product decision</Eyebrow>
        <h2 className="type-h1 mb-10" style={{ maxWidth: '22ch' }}>
          Concept testing over A/B testing.
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <p className="type-body-lg">
            With limited beta traffic and a 3-month window, A/B testing would only measure which
            concept users clicked, not why they felt ready to return. I made the case to the
            founder for moderated concept testing instead.
          </p>
          <div className="space-y-4">
            <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: '#c9a96e' }}>
              <p className="type-body-sm">A/B testing measures clicks, not emotional readiness.</p>
            </div>
            <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: '#4a8c5c' }}>
              <p className="type-body-sm">Concept testing surfaces emotional reactions in real time, which is what this problem needed.</p>
            </div>
          </div>
        </div>
      </Slide>

      {/* Shipped */}
      <Slide variant="bg">
        <Eyebrow>Shipped in live product</Eyebrow>
        <h2 className="type-h1 mb-8" style={{ maxWidth: '22ch' }}>
          From concept to live game.
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { src: '/IMG_9275.PNG', t: 'Quest guidance in context' },
            { src: '/IMG_9276.PNG', t: 'Contextual monster interaction' },
            { src: '/IMG_8534.PNG', t: 'Character-led guidance' },
          ].map((s) => (
            <figure key={s.t}>
              <img src={s.src} alt={`Live Monster Walk: ${s.t}`} className="w-full border border-[var(--border)]" loading="lazy" />
              <p className="type-caption mt-2">{s.t}</p>
            </figure>
          ))}
        </div>
      </Slide>

      {/* Outcome */}
      <Slide variant="dark">
        <Eyebrow>Outcome</Eyebrow>
        <h2 className="type-display mb-8" style={{ maxWidth: '20ch' }}>
          4 recommendations shipped in the live product.
        </h2>
        <p className="type-lead" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '52ch' }}>
          In a 3-month beta internship with no post-launch access and no live metrics, I built the
          behavioral framework that shaped how Monster Walk welcomes users back.
        </p>
      </Slide>

      {/* ══════════ CLOSING ══════════ */}
      <Slide variant="bg">
        <Eyebrow>Contact</Eyebrow>
        <h2 className="type-display mb-8" style={{ maxWidth: '20ch' }}>
          Get in touch
        </h2>
        <div className="flex flex-col gap-3">
          <a href="mailto:tys.swetha@gmail.com" className="type-h3 text-[var(--text)] hover:text-[var(--accent)] transition-colors">tys.swetha@gmail.com</a>
          <a href="https://www.linkedin.com/in/swethathanabalan/" target="_blank" rel="noopener noreferrer" className="type-body text-[var(--accent)] hover:underline">linkedin.com/in/swethathanabalan</a>
          <Link to="/" className="type-body text-[var(--muted)] hover:text-[var(--text)] transition-colors mt-4">← Back to portfolio</Link>
        </div>
      </Slide>

      {/* Hint (screen only) */}
      <p className="deck-hint" style={{ position: 'fixed', bottom: '3vh', left: '50%', transform: 'translateX(-50%)', fontSize: 'var(--type-caption-size)', color: 'var(--muted)', zIndex: 50 }}>
        Scroll · Print to PDF via browser
      </p>
    </div>
  )
}

export default Deck
