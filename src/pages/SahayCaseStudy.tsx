import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import AnimatedSection from '../components/AnimatedSection'

/* ═══════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════ */

const useReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handle = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress((window.pageYOffset / total) * 100)
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])
  return progress
}

/* ═══════════════════════════════════════════════════════════════
   SMALL COMPONENTS
═══════════════════════════════════════════════════════════════ */

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal(0.12)
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function Callout({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'insight' | 'shift' }) {
  const styles = {
    insight: { backgroundColor: 'var(--decision)', borderColor: 'var(--accent)' },
    shift: { backgroundColor: 'var(--finding)', borderColor: '#c9a96e' },
    default: { backgroundColor: 'var(--surface)', borderColor: 'var(--border)' },
  }
  const s = styles[variant]
  return (
    <Reveal>
      <div className="border-l-4 pl-6 py-5 my-8" style={{ backgroundColor: s.backgroundColor, borderLeftColor: s.borderColor }}>
        <p className="type-body font-medium">{children}</p>
      </div>
    </Reveal>
  )
}

function PullQuote({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useReveal(0.2)
  return (
    <div ref={ref} className={`py-10 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <blockquote className="type-quote">
        {children}
      </blockquote>
    </div>
  )
}

function MetadataGrid() {
  return (
    <Reveal delay={200}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-8 border-t border-[var(--border)]">
        <div>
          <p className="type-meta-label">Role</p>
          <p className="type-meta">Product Designer & Researcher (initiated project, led research strategy)</p>
        </div>
        <div>
          <p className="type-meta-label">Duration</p>
          <p className="type-meta">2 Academic Quarters</p>
        </div>
        <div>
          <p className="type-meta-label">Team</p>
          <p className="type-meta">3 People (I led research and design direction)</p>
        </div>
        <div>
          <p className="type-meta-label">Tools</p>
          <p className="type-meta">Figma, FigJam, Figma Make, Google Forms</p>
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-[var(--border-subtle)]">
        <p className="type-meta-label">Key outcome</p>
        <p className="type-meta">Research revealed homeowners need confidence, not contractor listings. Pivoted product from marketplace to AI guidance companion. Validated through information architecture testing and user flow validation.</p>
      </div>
    </Reveal>
  )
}

function ContributionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block type-tag border-b border-indigo-300 dark:border-indigo-700 text-indigo-700 pb-px">
      {children}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN CASE STUDY
═══════════════════════════════════════════════════════════════ */

const SahayCaseStudy = () => {
  const scrollProgress = useScrollProgress()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--bg)]">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 dark:bg-[var(--surface)] z-50">
        <div className="h-full bg-indigo-600 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      <SEO
        title="Sahay | AI Home Maintenance Product Design Case Study | Swetha Thanabalan"
        description="Product design case study: AI-powered home maintenance companion. User research, information architecture, interaction design, prototyping, and usability testing."
        path="/project/sahay-home-companion"
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "Sahay: AI-Assisted Home Maintenance Product",
          "description": "AI-powered home maintenance companion helping homeowners understand problems before deciding what to do next.",
          "author": { "@type": "Person", "name": "Swetha Thanabalan" },
          "keywords": "Product Design, User Research, AI UX, Interaction Design, Information Architecture, Prototyping, Usability Testing"
        }}
      />

      <Navbar />

      <main id="main-content" className="pt-32 pb-32">

        {/* ═══════════════════════════════════════════
            1. HERO
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-in">
            <Link to="/#work" className="inline-flex items-center text-[var(--muted)] hover:text-[var(--text)] mb-12 transition-colors group">
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to projects
            </Link>
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <h1 className="type-h1 mb-8">
              Sahay: Confidence before contractors
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <p className="type-lead mb-12">
              An AI-powered home maintenance companion that helps homeowners understand problems before deciding what to do next.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <MetadataGrid />
          </AnimatedSection>
        </section>


        {/* ═══════════════════════════════════════════
            2. ORIGIN + PROBLEM (merged, compressed)
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">

          <Reveal>
            <h2 className="type-h2 mb-6">
              Homeowners wanted to understand a problem before hiring anyone.
            </h2>
          </Reveal>

          <Reveal delay={50}>
            <div className="text-flow type-body mb-8">
              <p>
                This project started from lived experience. Whenever something went wrong at home, I found myself bouncing between Google, YouTube, Reddit, and contractor sites with no way to know what was actually wrong, how serious it was, or who to trust.
              </p>
              <p>
                Every existing platform assumes users already know what they need. They skip straight to "find a pro" without helping people understand the problem first.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="border-l-2 border-l-red-300 pl-4 py-2">
                <p className="type-body-sm font-semibold mb-1">Fragmented</p>
                <p className="type-body-sm">5+ platforms to diagnose one issue</p>
              </div>
              <div className="border-l-2 border-l-amber-300 pl-4 py-2">
                <p className="type-body-sm font-semibold mb-1">Uncertain</p>
                <p className="type-body-sm">No urgency assessment before spending money</p>
              </div>
              <div className="border-l-2 border-l-blue-300 pl-4 py-2">
                <p className="type-body-sm font-semibold mb-1">Trust deficit</p>
                <p className="type-body-sm">Platforms prioritize booking over understanding</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="decision-block">
              <p className="type-body-sm font-semibold mb-1">My role</p>
              <p className="type-body">I initiated the project, identified the opportunity, recruited two teammates, and led research strategy from day one.</p>
            </div>
          </Reveal>
        </section>


        {/* ═══════════════════════════════════════════
            4. RESEARCH PROCESS
        ═══════════════════════════════════════════ */}
        <section className="bg-surface py-12 mb-16">
          <div className="layout-content">

            <Reveal>
              <h2 className="type-h2 mb-6">
                We talked to homeowners, renters, and shared housing participants.
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Reveal delay={50}>
                <div>
                  <h3 className="type-h3 mb-4">Primary research</h3>
                  <ul className="list-flow text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">•</span> Homeowner interviews</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">•</span> Renter interviews</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">•</span> Shared housing participants</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">•</span> Survey (Google Forms)</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div>
                  <h3 className="type-h3 mb-4">Secondary research</h3>
                  <ul className="list-flow text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">•</span> Competitive analysis of service platforms</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">•</span> DIY resource ecosystem mapping</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">•</span> Existing marketplace evaluation</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="finding-block">
                <h3 className="type-h3 mb-5">Key research findings</h3>
                <div className="space-y-4">
                  {[
                    'Users rarely start with service marketplaces. They start with Google, YouTube, Reddit, friends.',
                    'Users try solving issues themselves first before hiring anyone.',
                    'Trust matters more than convenience when choosing a professional.',
                    'Existing platforms focus on hiring, not understanding.',
                    'Users struggle to determine urgency without expert input.',
                    'Users want a combination of DIY support and professional help.',
                    'Users prefer understanding the problem before booking services.',
                  ].map((finding, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-xs font-medium text-[var(--muted)] min-w-[1.5rem]">{i + 1}.</span>
                      <p className="type-body">{finding}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            4b. RESEARCH SYNTHESIS
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Research synthesis</h2>
            <p className="type-body-lg mb-10">
              Interview notes were grouped into recurring themes around maintenance behavior, urgency, trust, and DIY decision-making.
            </p>
          </AnimatedSection>

          {/* Overview */}
          <AnimatedSection animation="fade-up" delay={100}>
            <figure className="media-frame mb-16">
              <img
                src="/Overview of Sahay.png"
                alt="Overview of four research synthesis themes: home maintenance experiences, desired features, attitudes toward apps, and DIY approach"
                className="w-full border border-[var(--border)]"
                loading="lazy"
              />
              <figcaption className="type-caption mt-3">Affinity mapping across four themes. Two findings drove the product direction.</figcaption>
            </figure>
          </AnimatedSection>

          {/* Finding 1 -> Decision -> Response */}
          <AnimatedSection animation="fade-up" delay={150}>
            <div className="mb-16">
              <figure className="media-frame mb-8">
                <img
                  src="/Research(1).jpg"
                  alt="FigJam board: Desired Features in Home Repair App: notes grouped by urgency, trust, feature requests, and dealbreakers"
                  className="w-full border border-[var(--border)]"
                  loading="lazy"
                />
                <figcaption className="type-caption mt-3">Desired Features in Home Repair App. Sticky notes from interviews grouped by theme.</figcaption>
              </figure>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: '#c9a96e' }}>
                  <p className="type-meta-label mb-2">Research finding</p>
                  <p className="type-body">Participants repeatedly struggled to judge urgency, identify symptoms, and decide whether an issue required professional help.</p>
                </div>
                <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: 'var(--accent)' }}>
                  <p className="type-meta-label mb-2">Product decision</p>
                  <p className="type-body">Move issue understanding ahead of provider discovery. Help users assess the problem before spending money.</p>
                </div>
                <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: '#4a8c5c' }}>
                  <p className="type-meta-label mb-2">Design response</p>
                  <p className="type-body">AI-assisted issue assessment: describe symptoms, receive urgency guidance, then choose DIY instructions or professional support.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Finding 2 -> Decision -> Response */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mb-12">
              <figure className="media-frame mb-8">
                <img
                  src="/Research(2).jpg"
                  alt="FigJam board: DIY Approach to Home Repairs: notes showing how users research problems across YouTube, Google, Reddit, and family"
                  className="w-full border border-[var(--border)]"
                  loading="lazy"
                />
                <figcaption className="type-caption mt-3">DIY Approach to Home Repairs. Users rely on fragmented sources and hesitate due to ambiguity about severity.</figcaption>
              </figure>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: '#c9a96e' }}>
                  <p className="type-meta-label mb-2">Research finding</p>
                  <p className="type-body">Users bounce between 5+ sources (YouTube, Google, Reddit, family) to diagnose one issue. No single resource reduces ambiguity.</p>
                </div>
                <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: 'var(--accent)' }}>
                  <p className="type-meta-label mb-2">Product decision</p>
                  <p className="type-body">Consolidate fragmented information into one guided flow. Reduce the number of sources a homeowner needs to consult.</p>
                </div>
                <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: '#4a8c5c' }}>
                  <p className="type-meta-label mb-2">Design response</p>
                  <p className="type-body">Conversational AI diagnosis with structured DIY guidance, replacing the multi-source research process with a single trusted companion.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>


        {/* ═══════════════════════════════════════════
            5. THE TURNING POINT
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">

          <PullQuote>
            People wanted to know what was wrong before deciding whether to call a contractor.
          </PullQuote>

          <Reveal>
            <div className="text-flow type-body-lg">
              <p>
                We started out assuming people needed a better way to find service providers.
              </p>
              <p className="type-lead font-medium">
                Research showed that was wrong. People needed confidence before deciding whether they needed a service provider at all.
              </p>
              <p>
                That finding changed what we were building.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid md:grid-cols-2 gap-px mt-12 border border-[var(--border)]">
              <div className="bg-[var(--finding)] p-8">
                <p className="type-meta-label">What we assumed</p>
                <p className="type-h3 text-[var(--text)]">Service marketplace</p>
                <p className="type-body-sm mt-2">Help people find and book contractors faster</p>
              </div>
              <div className="bg-[var(--outcome)] p-8">
                <p className="type-meta-label">What research revealed</p>
                <p className="type-h3 text-[var(--text)]">AI-powered home companion</p>
                <p className="type-body-sm mt-2">Help people understand problems and make informed decisions</p>
              </div>
            </div>
          </Reveal>

          <Callout variant="shift">
            The original concept focused on connecting users with services. Because people needed to understand a problem before deciding what to do, we moved to an issue-first experience, and the product decisions below follow from that.
          </Callout>
        </section>


        {/* ═══════════════════════════════════════════
            6. PRODUCT STRATEGY & AI DIRECTION
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">

          <Reveal>
            <h2 className="type-h2 mb-8">
              Homeowners describe a problem and get guidance right away
            </h2>
          </Reveal>

          <Reveal delay={50}>
            <div className="text-flow type-body-lg">
              <p>
                During the project, more people were turning to AI for everyday problems. Teammates also used AI at work, which shaped our sense of what was possible.
              </p>
              <p>
                We began exploring a conversational AI model where homeowners could describe their issue naturally and get structured, step-by-step guidance.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {[
                { label: 'AI Diagnosis', desc: 'Identify likely issues from user descriptions' },
                { label: 'AI Explanations', desc: 'Plain-language breakdowns of what is happening' },
                { label: 'Urgency Assessment', desc: 'Help users understand severity and timing' },
                { label: 'AI Summaries', desc: 'Synthesize home data into actionable insights' },
                { label: 'DIY Guidance', desc: 'Step-by-step instructions when appropriate' },
                { label: 'Decision Support', desc: 'Help users choose between DIY and professional help' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-[var(--surface)] rounded-subtle p-5 border border-gray-100 dark:border-[var(--border)]">
                  <p className="type-body-sm font-semibold mb-1">{item.label}</p>
                  <p className="type-body-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="type-body text-[var(--muted)] mt-8 italic">
              We used Figma Make to quickly prototype AI-driven interactions and test them with real users.
            </p>
          </Reveal>
        </section>


        {/* ═══════════════════════════════════════════
            6b. HOW THE AI EXPERIENCE WAS DESIGNED
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">

          <Reveal>
            <h2 className="type-h2 mb-6">
              Designing the AI experience
            </h2>
            <p className="type-body-lg mb-8">
              I designed the AI interaction around a single idea: help people understand the problem before asking them to decide what to do about it. The user describes the problem, Sahay explains what is likely going on, and then it suggests a path the user can choose to follow.
            </p>
          </Reveal>

          <Reveal delay={50}>
            <ol className="relative border-l border-[var(--border)] ml-2 mb-10">
              {[
                { label: 'Describe the problem', text: 'The user describes the home-maintenance problem using text, image, or voice.' },
                { label: 'Sahay analyzes the input', text: 'Sahay reviews the information the user provided to understand the problem.' },
                { label: 'Ask follow-up questions', text: 'When it needs more context, it asks follow-up questions before making a recommendation.' },
                { label: 'Recommend a path', text: 'Once it has enough information, it recommends one of two paths: DIY, or third-party professional help.' },
                { label: 'Personalize to skill level', text: 'The recommendation also considers the user\'s DIY skill level, which is collected during onboarding.' },
                { label: 'DIY → Issue Tracker', text: 'If the user chooses DIY, the issue is added to the Issue Tracker so they can keep updating and managing it.' },
                { label: 'Professional → relevant options', text: 'If the user chooses professional help, the app shows relevant third-party options for the problem in another section.' },
              ].map((step, i) => (
                <li key={i} className="ml-6 mb-8 last:mb-0">
                  <span className="absolute -left-[9px] flex items-center justify-center w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[10px] font-semibold">
                    {i + 1}
                  </span>
                  <p className="type-body font-semibold mb-1">{step.label}</p>
                  <p className="type-body-sm">{step.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Callout variant="shift">
            The AI was not functional in the prototype. This case study walks through an example scenario to show how the interaction would work.
          </Callout>
        </section>


        {/* ═══════════════════════════════════════════
            6c. TRUST & CONTROL
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">

          <Reveal>
            <h2 className="type-h2 mb-6">
              The user stays in control of the decision
            </h2>
            <p className="type-body-lg mb-8">
              Sahay gathers information and recommends a direction, but the user decides what happens next. The system does not act on the user's behalf or push them down a single path.
            </p>
          </Reveal>

          <Reveal delay={50}>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: '#c9a96e' }}>
                <p className="type-meta-label mb-2">AI's role</p>
                <p className="type-body">Understand the problem through the description and any follow-up questions, then recommend a direction.</p>
              </div>
              <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: 'var(--accent)' }}>
                <p className="type-meta-label mb-2">User's role</p>
                <p className="type-body">Decide whether to follow the DIY path or seek professional help. The recommendation is only a suggestion.</p>
              </div>
              <div className="border-l-4 pl-5 py-1" style={{ borderLeftColor: '#4a8c5c' }}>
                <p className="type-meta-label mb-2">Personalization</p>
                <p className="type-body">The recommendation is tailored using the user's DIY skill level from onboarding, so the guidance fits what they are comfortable attempting.</p>
              </div>
            </div>
          </Reveal>
        </section>


        {/* ═══════════════════════════════════════════
            7. INFORMATION ARCHITECTURE & USER FLOWS
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">

          <Reveal>
            <h2 className="type-h2 mb-8">
              We validated flows before building screens.
            </h2>
          </Reveal>

          <Reveal delay={50}>
            <div className="text-flow type-body-lg">
              <p>
                Because we planned to prototype AI-driven experiences, we validated the information architecture and user flows first. We created detailed end-to-end flows and tested them with participants.
              </p>
              <p>Participants clearly supported:</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-4 mb-8 list-flow ml-1 type-body-lg">
              <li className="flex items-start gap-3"><span className="text-green-600 dark:text-green-400 mt-1">✓</span> Problem-first navigation: start with "what's wrong" instead of "find a pro"</li>
              <li className="flex items-start gap-3"><span className="text-green-600 dark:text-green-400 mt-1">✓</span> Understanding before booking: diagnosis precedes action</li>
              <li className="flex items-start gap-3"><span className="text-green-600 dark:text-green-400 mt-1">✓</span> Guided decision making: the system helps users decide instead of only listing options</li>
            </ul>
          </Reveal>

          <Callout>
            Feedback from flow testing let us refine the experience before high-fidelity design began, which saved design and development time.
          </Callout>

          {/* IA diagram — wider for readability */}
          <Reveal delay={150}>
            <div className="media-frame mt-10">
              <img
                src="/Research(5).png"
                alt="Information architecture diagram and user flow validation"
                className="w-full border border-[var(--border)]"
              />
              <p className="caption mt-3 px-6 md:px-0">Information architecture and user flow diagram. Validated with participants before high-fidelity work began.</p>
            </div>
          </Reveal>
        </section>


        {/* ═══════════════════════════════════════════
            8. DESIGN PRINCIPLES
        ═══════════════════════════════════════════ */}
        <section className="bg-surface py-12 mb-16">
          <div className="layout-content">

            <Reveal>
              <h2 className="type-h2 mb-6">
                Design principles
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              <Reveal delay={50}>
                <div className="bg-white dark:bg-[var(--bg)] rounded-subtle p-6 border border-gray-200 dark:border-[var(--border)] h-full">
                  <div className="text-2xl mb-3">🧭</div>
                  <h3 className="type-h3 mb-2">Confidence first</h3>
                  <p className="type-body-sm">Help the user understand the problem and feel less anxious before asking them to act or spend money.</p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="bg-white dark:bg-[var(--bg)] rounded-subtle p-6 border border-gray-200 dark:border-[var(--border)] h-full">
                  <div className="text-2xl mb-3">🤝</div>
                  <h3 className="type-h3 mb-2">Feels like a companion</h3>
                  <p className="type-body-sm">The product should feel like a knowledgeable friend who talks things through and is on the user's side.</p>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <div className="bg-white dark:bg-[var(--bg)] rounded-subtle p-6 border border-gray-200 dark:border-[var(--border)] h-full">
                  <div className="text-2xl mb-3">⚖️</div>
                  <h3 className="type-h3 mb-2">Offer DIY and professional help</h3>
                  <p className="type-body-sm">Don't force one path. Show both options and explain when each makes sense.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            9. KEY DESIGN DECISIONS
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">

          <Reveal>
            <h2 className="type-h2 mb-6">
              Final solution
            </h2>
            <p className="type-body-lg mb-8">
              The interactive prototype covers onboarding, AI diagnosis, DIY guidance, and professional booking.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="media-frame relative aspect-video w-full rounded-subtle overflow-hidden border border-gray-200 dark:border-[var(--border)] shadow-sm">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/O67w4i0cTFg?si=AbfgtsdcDOJDs7TI"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </Reveal>
        </section>


        <section className="layout-content mb-16">

          {/* Decision 1: Onboarding */}
          <Reveal>
            <div className="mb-6">
              <h3 className="type-h3 mb-4">Decision 01: Rethinking onboarding</h3>
              <div className="text-flow type-body-lg">
                <p>
                  Originally, we wanted to collect extensive homeowner information upfront, including home age, systems, past repairs, and appliance inventory. Testing revealed this created too much friction. Users abandoned or rushed through it.
                </p>
                <p>
                  I helped rethink this. Instead of a long list of questions, I designed a short onboarding that feeds into a MyHome experience. AI then summarizes the important information, so users do less work and still get a personalized experience.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="bg-red-50 dark:bg-red-950/30 rounded-subtle p-5">
                  <p className="type-meta-label text-red-700 dark:text-red-300">Before</p>
                  <p className="type-body-sm">Long questionnaire upfront → high drop-off</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/30 rounded-subtle p-5">
                  <p className="type-meta-label text-green-700 dark:text-green-300">After</p>
                  <p className="type-body-sm">Minimal input → AI-generated home summary → progressive detail</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Decision 2: MyHome Dashboard */}
          <Reveal>
            <div className="mb-6">
              <h3 className="type-h3 mb-4">Decision 02: MyHome dashboard</h3>
              <div className="text-flow type-body-lg">
                <p>
                  I designed MyHome as a central hub that is useful from the first visit, rather than a static profile page. The dashboard shows maintenance reminders, AI-generated insights about the home, and quick access to diagnosis.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                <ContributionTag>Designed by me</ContributionTag>
                <ContributionTag>Personalization strategy</ContributionTag>
                <ContributionTag>AI summary integration</ContributionTag>
              </div>
            </div>
          </Reveal>

          {/* Decision 3: AI Home Summary */}
          <Reveal>
            <div className="mb-6">
              <h3 className="type-h3 mb-4">Decision 03: AI-generated home summary</h3>
              <div className="text-flow type-body-lg">
                <p>
                  I introduced AI-generated home summaries. Instead of asking users to document everything by hand, the system combines onboarding data, past interactions, and home details into one overview.
                </p>
                <p>
                  Participants responded well to it, and many named it as one of the most valuable parts of the experience.
                </p>
              </div>
              <Callout variant="insight">
                "This feels like the app actually knows my home." Usability testing participant
              </Callout>
            </div>
          </Reveal>

          {/* Decision 4: DIY Experience: The Story */}
          <Reveal>
            <div className="mb-8">
              <h3 className="type-h3 mb-4">Decision 04: Advocating for DIY guidance</h3>
              <div className="text-flow type-body-lg">
                <p>
                  Some team members questioned whether DIY support should remain in the product. During early user flow testing, participants initially focused more on diagnosis and service booking. There was internal pressure to simplify by removing it.
                </p>
                <p>
                  I believed DIY guidance was essential because it came straight from our core research finding: users want to understand and try simple fixes before hiring a professional.
                </p>
                <p className="text-[var(--text)] font-medium">
                  I argued for keeping the feature and designed the DIY experience.
                </p>
                <p>
                  Later usability testing supported the decision: participants often pointed to DIY support as one of the strongest and most distinctive features.
                </p>
              </div>

              <Callout variant="shift">
                I stuck with the research findings even when the team leaned the other way.
              </Callout>
            </div>
          </Reveal>
        </section>


        {/* ═══════════════════════════════════════════
            10. MY CONTRIBUTIONS
        ═══════════════════════════════════════════ */}
        <section className="bg-surface py-12 mb-16">
          <div className="layout-content">

            <Reveal>
              <h2 className="type-h2 mb-6">
                My contributions
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              <Reveal delay={50}>
                <div className="space-y-6">
                  <h3 className="type-h3">Strategy & Research</h3>
                  <ul className="list-flow text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2"><span className="text-indigo-600">→</span> Initiated the project from personal insight</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600">→</span> Recruited and assembled the team</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600">→</span> Defined the research strategy</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600">→</span> Conducted interviews and synthesis</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600">→</span> Participated in product strategy decisions</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="space-y-6">
                  <h3 className="type-h3">Design & Validation</h3>
                  <ul className="list-flow text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2"><span className="text-indigo-600">→</span> Designed the onboarding experience</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600">→</span> Designed the MyHome dashboard</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600">→</span> Designed the AI home summary experience</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600">→</span> Designed the DIY guidance experience</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600">→</span> Validated information architecture</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600">→</span> Mapped and validated user flows</li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            11. USABILITY TESTING RESULTS
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">

          <Reveal>
            <h2 className="type-h2 mb-8">
              Participants described Sahay as a home partner
            </h2>
          </Reveal>

          <Reveal delay={50}>
            <div className="text-flow type-body-lg mb-6">
              <p>
                Across testing sessions, participants responded positively to AI document summaries, the home maintenance log, conversational AI, and the integrated DIY + professional support model.
              </p>
              <p>
                Participants also described Sahay as <strong>"a smart home partner"</strong> rather than "a home maintenance app," which suggested it felt different from existing products.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'AI document summaries',
                'Home maintenance log',
                'Conversational AI diagnosis',
                'Integrated DIY + professional support',
                'AI-generated home summary',
                'Problem-first navigation',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-green-50 dark:bg-green-950/30 rounded-subtle px-5 py-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="type-body-sm">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <PullQuote>
            Participants were reacting to what the product promised more than to what the AI could actually do.
          </PullQuote>
        </section>


        {/* ═══════════════════════════════════════════
            12. REFLECTION
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">

          <Reveal>
            <h2 className="type-h2 mb-8">
              Lessons for AI product design
            </h2>
          </Reveal>

          <Reveal delay={50}>
            <div className="text-flow type-body-lg">
              <p>
                Participants saw Sahay as a home companion and responded to the overall vision more than to the actual AI capabilities.
              </p>
              <p>
                Because this was a prototype, we couldn't build a working AI model, so the AI experience didn't deliver the intelligence the concept implied.
              </p>
            </div>
          </Reveal>

          <Callout variant="insight">
            People judge an AI product mainly on the quality of the AI interaction itself, so what the product promises has to match what it delivers.
          </Callout>
        </section>


        {/* ═══════════════════════════════════════════
            12b. WHERE I WOULD TAKE THIS NEXT
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">

          <Reveal>
            <h2 className="type-h2 mb-6">
              Next steps
            </h2>
            <p className="type-body-lg mb-8">
              I did not design detailed uncertainty or failure states during this project. These are the questions I would work through next; none of them were part of the prototype.
            </p>
          </Reveal>

          <Reveal delay={50}>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'What should happen if the system does not have enough information to make a recommendation?',
                'What happens if an uploaded image is unclear or unusable?',
                'What happens when multiple problems seem possible at once?',
                'How should the system communicate that it is unsure, rather than sounding confident?',
                'What happens if the user disagrees with the recommendation?',
                'When should the system stop asking questions and simply recommend professional help?',
              ].map((q, i) => (
                <div key={i} className="border border-[var(--border)] rounded-subtle p-5 bg-[var(--surface)]">
                  <p className="type-body-sm">{q}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Callout>
            Most of them come down to how an AI-assisted product should behave when it is uncertain or wrong.
          </Callout>
        </section>


        {/* ═══════════════════════════════════════════
            13. KEY TAKEAWAYS
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">
          <Reveal>
            <div className="bg-gray-900 p-10 md:p-14">
              <h2 className="type-h2 text-white">Takeaways</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <p className="type-body-sm font-semibold text-indigo-400">Product thinking</p>
                    <p className="type-body-sm text-gray-300 dark:text-gray-600">Changed the product direction from marketplace to companion based on research, and questioned the original brief.</p>
                  </div>
                  <div>
                    <p className="type-body-sm font-semibold text-indigo-400">Research-driven decisions</p>
                    <p className="type-body-sm text-gray-300 dark:text-gray-600">Argued for keeping DIY guidance when the team wanted to cut it; usability testing later supported the decision.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="type-body-sm font-semibold text-indigo-400">AI product design</p>
                    <p className="type-body-sm text-gray-300 dark:text-gray-600">Explored conversational AI as the core interaction and learned that people judge AI products mainly on the quality of the AI.</p>
                  </div>
                  <div>
                    <p className="type-body-sm font-semibold text-indigo-400">Strategic initiative</p>
                    <p className="type-body-sm text-gray-300 dark:text-gray-600">Identified the opportunity, recruited the team, led research, and designed key experiences, from concept through validation.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>


        {/* ═══════════════════════════════════════════
            NAVIGATION
        ═══════════════════════════════════════════ */}
        <section className="layout-content">
          <Reveal>
            <div className="border-t border-gray-200 dark:border-[var(--border)] pt-12 flex justify-between items-center">
              <Link to="/#work" className="group inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All projects
              </Link>
              <Link to="/about" className="group inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                About me
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default SahayCaseStudy
