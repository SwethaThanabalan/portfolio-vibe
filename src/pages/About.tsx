import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ═══════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════ */

/** Scroll-triggered visibility with IntersectionObserver */
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

/** Parallax offset based on scroll position */
const useParallaxOffset = (range = 40) => {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handle = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const wh = window.innerHeight
      if (rect.top < wh && rect.bottom > 0) {
        const progress = (wh - rect.top) / (wh + rect.height)
        setOffset((progress - 0.5) * range)
      }
    }
    window.addEventListener('scroll', handle, { passive: true })
    handle()
    return () => window.removeEventListener('scroll', handle)
  }, [range])

  return { ref, offset }
}

/* ═══════════════════════════════════════════════════════════════
   SMALL COMPONENTS
═══════════════════════════════════════════════════════════════ */

/** Floating sticky note — handwritten feel */
const StickyNote = ({ children, rotate = -2, className = '' }: { children: React.ReactNode; rotate?: number; className?: string }) => (
  <div
    className={`bg-amber-50 border border-amber-200/60 shadow-md px-5 py-4 text-sm text-gray-700 leading-relaxed max-w-[220px] ${className}`}
    style={{ transform: `rotate(${rotate}deg)`, fontFamily: "'Georgia', serif", fontStyle: 'italic' }}
  >
    {children}
  </div>
)

/** Annotation label — small floating text */
const Annotation = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-block text-xs uppercase tracking-[0.2em] text-gray-400 font-medium ${className}`}>
    {children}
  </span>
)

/** Section label that fades in on scroll */
const SectionLabel = ({ children }: { children: React.ReactNode }) => {
  const { ref, visible } = useReveal(0.3)
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <p className="text-sm font-semibold text-gray-400 uppercase tracking-[0.15em]">
        {children}
      </p>
    </div>
  )
}

/** Pull quote — large editorial statement */
const PullQuote = ({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' | 'center' }) => {
  const { ref, visible } = useReveal(0.2)
  const alignClass = align === 'right' ? 'ml-auto text-right' : align === 'center' ? 'mx-auto text-center' : ''
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <blockquote
        className={`text-gray-900 font-medium ${alignClass}`}
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
          lineHeight: '1.3',
          maxWidth: '24ch',
          letterSpacing: '-0.02em',
        }}
      >
        {children}
      </blockquote>
    </div>
  )
}

/** Observation card — hover to reveal */
const ObservationCard = ({ title, detail }: { title: string; detail: string }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      className="group relative border border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-gray-400 hover:shadow-sm"
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded(!expanded) }}
    >
      <p className="text-base font-medium text-gray-900 leading-snug">{title}</p>
      <div
        className={`overflow-hidden transition-all duration-400 ease-out ${expanded ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}
      >
        <p className="text-sm text-gray-600 leading-relaxed">{detail}</p>
      </div>
      <div className="absolute top-4 right-4 w-5 h-5 flex items-center justify-center">
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-45' : 'rotate-0'}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
    </div>
  )
}

/** Timeline stage */
const TimelineStage = ({ year, title, reflection, artifact, index }: {
  year: string; title: string; reflection: string; artifact: string; index: number
}) => {
  const { ref, visible } = useReveal(0.2)
  return (
    <div
      ref={ref}
      className={`relative grid md:grid-cols-12 gap-6 md:gap-10 transition-all duration-800 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Left — year + line */}
      <div className="md:col-span-3 flex md:flex-col items-baseline md:items-end gap-3 md:gap-1 md:text-right">
        <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">{year}</span>
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      </div>
      {/* Center dot */}
      <div className="hidden md:flex md:col-span-1 justify-center relative">
        <div className="w-3 h-3 rounded-full bg-gray-900 mt-1.5 relative z-10" />
        <div className="absolute top-4 bottom-0 w-px bg-gray-200" style={{ left: '50%' }} />
      </div>
      {/* Right — content */}
      <div className="md:col-span-8 pb-12">
        <p className="text-gray-700 leading-relaxed mb-3">{reflection}</p>
        <p className="text-sm text-gray-400 italic">{artifact}</p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */

const About = () => {
  const [heroVisible, setHeroVisible] = useState(false)
  const portraitParallax = useParallaxOffset(50)

  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => setHeroVisible(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      <main className="pt-28 pb-32">

        {/* ═══════════════════════════════════════════
            HERO — Immersive editorial opening
        ═══════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 mb-40">
          <div className="relative grid md:grid-cols-12 gap-8 md:gap-6 items-start">

            {/* Headline — spans left, overlaps image area */}
            <div className="md:col-span-7 relative z-10 pt-8 md:pt-16">
              <Annotation className={`mb-6 block transition-all duration-700 delay-100 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
                About — Swetha Thanabalan
              </Annotation>
              <h1
                className={`font-bold text-gray-900 leading-[1.05] transition-all duration-1000 ease-out ${
                  heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
                  letterSpacing: '-0.035em',
                  maxWidth: '16ch',
                }}
              >
                I didn't start in product design. I started behind a camera.
              </h1>

              {/* Floating sticky note — editorial texture */}
              <div className={`mt-12 transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <StickyNote rotate={-1.5}>
                  "How something is framed changes how it's understood."
                </StickyNote>
              </div>
            </div>

            {/* Portrait — editorial placement, partially overlapping */}
            <div
              className={`md:col-span-5 md:absolute md:right-0 md:top-0 md:w-[45%] transition-all duration-1200 ease-out delay-300 ${
                heroVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.97]'
              }`}
              ref={portraitParallax.ref}
            >
              <div
                className="relative"
                style={{ transform: `translateY(${portraitParallax.offset}px)`, transition: 'transform 0.15s linear' }}
              >
                {/* Image with creative crop */}
                <div className="overflow-hidden rounded-2xl shadow-xl shadow-gray-300/30">
                  <img
                    src="/PortfolioPictureswetha.jpg"
                    alt="Swetha Thanabalan"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: '3/4' }}
                    loading="eager"
                  />
                </div>
                {/* Caption overlapping bottom */}
                <p className="absolute -bottom-6 left-4 text-xs text-gray-400 tracking-wide bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  Commercial photographer → product designer
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            THE PATH — Narrative with visual texture
        ═══════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <SectionLabel>The path here</SectionLabel>
            </div>
            <div className="md:col-span-8">
              <RevealBlock delay={0}>
                <div className="space-y-8 text-lg text-gray-700 leading-relaxed" style={{ maxWidth: '58ch' }}>
                  <p className="text-xl text-gray-900 leading-relaxed font-medium">
                    As a commercial photographer, I spent years thinking about how products are presented, styled, and experienced visually.
                  </p>
                  <p>
                    Product photography taught me how small details completely change perception. Whether it was composition, lighting, or styling, every decision shaped how people connected with what they were looking at.
                  </p>
                </div>
              </RevealBlock>

              <RevealBlock delay={100}>
                <div className="space-y-8 text-lg text-gray-700 leading-relaxed mt-10" style={{ maxWidth: '58ch' }}>
                  <p>
                    Over time, my work naturally expanded into marketing and SEO, eventually leading me to work as an SEO research assistant at a fintech company. While analyzing competitors and improving search performance, I found myself becoming increasingly focused on the product itself, especially the interface.
                  </p>
                  <p>
                    At first, I thought UX/UI design was mostly about designing interfaces. Once I formally stepped into the field, that perspective changed completely.
                  </p>
                </div>
              </RevealBlock>
            </div>
          </div>
        </section>

        {/* ─── Pull Quote 1 — full-width editorial break ─── */}
        <section className="max-w-6xl mx-auto px-6 py-20 mb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50/80 to-transparent rounded-3xl" />
          <div className="relative grid md:grid-cols-12">
            <div className="md:col-span-8 md:col-start-3">
              <PullQuote>The real work starts long before the screens.</PullQuote>
            </div>
          </div>
          {/* Floating annotation */}
          <div className="absolute top-6 right-8 hidden md:block">
            <StickyNote rotate={2} className="opacity-70">
              Realization from my first UX internship
            </StickyNote>
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            VISUAL TIMELINE — Journey with artifacts
        ═══════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 mb-40">
          <div className="mb-16">
            <SectionLabel>The journey</SectionLabel>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-[calc(25%+2rem)] top-0 bottom-0 w-px bg-gray-200" />

            <TimelineStage
              index={0}
              year="2018–2020"
              title="Commercial Photography"
              reflection="Learned to observe before acting. Every frame was a decision about what to include, exclude, and emphasize. Developed an instinct for visual hierarchy that I didn't yet have a name for."
              artifact="📷 Product shoots, editorial compositions, lighting studies"
            />
            <TimelineStage
              index={1}
              year="2020–2021"
              title="Marketing & SEO"
              reflection="Shifted from creating visuals to understanding why people find things. Learned how language, structure, and positioning shape discovery. Started seeing products as systems, not just surfaces."
              artifact="📊 Competitor analyses, keyword maps, content strategies"
            />
            <TimelineStage
              index={2}
              year="2021–2022"
              title="SEO Research → Interface Curiosity"
              reflection="While optimizing search performance at a fintech company, I kept gravitating toward the product itself. Why did some interfaces feel trustworthy and others didn't? That question wouldn't leave me alone."
              artifact="🔍 Heuristic evaluations, interface annotations, research notes"
            />
            <TimelineStage
              index={3}
              year="2022–2023"
              title="UX/UI Design"
              reflection="Formally entered the field. Quickly realized design isn't about screens — it's about decisions. Learned to frame problems, validate assumptions, and build with intention."
              artifact="✏️ Wireframes, user flows, usability test scripts"
            />
            <TimelineStage
              index={4}
              year="2023–Present"
              title="Product Thinking"
              reflection="Now I think in systems. I connect research to strategy to interface to outcome. Every project is a chance to ask: what's the real problem here, and who does this actually serve?"
              artifact="🧠 Strategy decks, research syntheses, design systems"
            />
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            HOW I THINK — with layered background
        ═══════════════════════════════════════════ */}
        <section className="relative py-28 mb-32" style={{ backgroundColor: '#f8f8f6' }}>
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\'/%3E%3Cpath d=\'M0 40L40 0\' stroke=\'%23000\' stroke-width=\'.5\'/%3E%3C/svg%3E")', backgroundSize: '40px 40px' }} />

          <div className="max-w-5xl mx-auto px-6 relative">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <SectionLabel>How I think</SectionLabel>
              </div>
              <div className="md:col-span-8">
                <RevealBlock>
                  <div className="space-y-8 text-lg text-gray-700 leading-relaxed" style={{ maxWidth: '58ch' }}>
                    <p>
                      One moment that especially changed my perspective was during an internship conversation with my mentor. Instead of focusing only on polished outcomes, she encouraged me to talk about the rough patches — what failed, what changed, and why decisions were made throughout the process.
                    </p>
                    <p>
                      I've learned that empathy is one of my biggest strengths as a designer. I naturally ask probing questions, look for patterns in behavior, and try to get to the root of problems instead of settling for surface-level answers.
                    </p>
                    <p>
                      Having worked across India, Canada, and the United States, I've become especially interested in how people from different backgrounds experience products differently. Context shapes everything.
                    </p>
                  </div>
                </RevealBlock>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Pull Quote 2 ─── */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <PullQuote align="right">Small details shape trust.</PullQuote>
        </section>


        {/* ═══════════════════════════════════════════
            THINGS I NOTICE — Interactive observations
        ═══════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 mb-40">
          <div className="mb-12">
            <SectionLabel>Things I notice</SectionLabel>
            <p className="mt-4 text-gray-500 text-base max-w-[50ch]">
              The small things that catch my eye. Hover or tap to expand.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ObservationCard
              title="Tiny interaction details products overlook"
              detail="Loading states that feel dead. Transitions that jump instead of ease. Micro-moments where trust is built or broken in 200ms."
            />
            <ObservationCard
              title="Apps that fail international users"
              detail="Name fields that reject non-Latin characters. Date formats that assume American conventions. Onboarding flows that don't account for cultural context."
            />
            <ObservationCard
              title="Interfaces optimized for metrics, not trust"
              detail="Dark patterns disguised as engagement features. Confirmation dialogs designed to confuse. Products that measure clicks but not confidence."
            />
            <ObservationCard
              title="Products hiding weak UX behind polished visuals"
              detail="Beautiful gradients over broken flows. Pixel-perfect components with no error states. Design systems that look great in Figma but collapse in edge cases."
            />
            <ObservationCard
              title="How framing changes perception"
              detail="The same feature described as 'limitation' or 'focus.' The same data presented as loss or opportunity. Words shape experience as much as pixels do."
            />
            <ObservationCard
              title="The gap between 'user-centered' and actually listening"
              detail="Teams that run usability tests but ignore uncomfortable findings. Research that validates decisions already made. Empathy as performance vs. practice."
            />
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            PRINCIPLES — with hover interactions
        ═══════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <SectionLabel>What I believe</SectionLabel>
            </div>
            <div className="md:col-span-8">
              <RevealBlock>
                <div className="space-y-2" style={{ maxWidth: '58ch' }}>
                  <PrincipleItem
                    title="Structure before polish"
                    description="Good products aren't built on aesthetics alone. I focus on defining the right problem, validating assumptions, and building foundations before refining surfaces."
                  />
                  <PrincipleItem
                    title="Research is a decision-making tool"
                    description="I don't research to check a box. I research to reduce risk, challenge assumptions, and make defensible recommendations."
                  />
                  <PrincipleItem
                    title="AI accelerates, it doesn't replace thinking"
                    description="I use AI tools to explore faster, generate options, and reduce friction in my workflow. But the judgment, the framing, and the strategic decisions are mine."
                  />
                  <PrincipleItem
                    title="Empathy is a skill, not a buzzword"
                    description="Understanding users means asking uncomfortable questions, sitting with ambiguity, and being willing to challenge your own assumptions."
                  />
                </div>
              </RevealBlock>
            </div>
          </div>
        </section>

        {/* ─── Pull Quote 3 ─── */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <PullQuote>AI accelerates my workflow, but the thinking is still mine.</PullQuote>
        </section>


        {/* ═══════════════════════════════════════════
            PHOTOGRAPHY & OBSERVATION — Cinematic break
        ═══════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 mb-40">
          <RevealBlock>
            <div className="relative bg-gray-900 rounded-3xl overflow-hidden p-10 md:p-16">
              <div className="relative z-10 max-w-[48ch]">
                <Annotation className="text-gray-500 mb-6 block">Observation</Annotation>
                <p
                  className="text-white/90 leading-relaxed font-light"
                  style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)' }}
                >
                  Photography trained me to observe before acting. To notice what others overlook. To understand that how something is framed changes how it's understood. That instinct carries into every product decision I make.
                </p>
              </div>
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-800/50 to-transparent" />
            </div>
          </RevealBlock>
        </section>


        {/* ═══════════════════════════════════════════
            TODAY — Statement
        ═══════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <RevealBlock>
            <p
              className="text-gray-900 font-medium"
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                lineHeight: '1.35',
                maxWidth: '34ch',
                letterSpacing: '-0.015em',
              }}
            >
              Today, I see myself as a hybrid product designer with foundations in visual storytelling, marketing strategy, SEO thinking, and user-centered design.
            </p>
          </RevealBlock>
        </section>


        {/* ═══════════════════════════════════════════
            CTA — Editorial close
        ═══════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6">
          <RevealBlock>
            <div className="border-t border-gray-200 pt-16">
              <p className="text-lg text-gray-700 mb-10" style={{ maxWidth: '42ch' }}>
                If you're looking for a designer who thinks in systems, asks hard questions, and brings structure to ambiguity — let's talk.
              </p>
              <a
                href="mailto:tys.swetha@gmail.com"
                className="group inline-flex items-center gap-3 text-lg font-medium text-gray-900 transition-all duration-300 hover:text-[var(--accent)]"
              >
                <span>tys.swetha@gmail.com</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </RevealBlock>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default About


/* ═══════════════════════════════════════════════════════════════
   HELPER COMPONENTS (defined after main export for readability)
═══════════════════════════════════════════════════════════════ */

/** Reveal block — fades content in on scroll */
function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal(0.12)
  return (
    <div
      ref={ref}
      className={`transition-all duration-900 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/** Principle item with hover state */
function PrincipleItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="group p-6 -mx-6 rounded-xl transition-all duration-300 hover:bg-gray-50/80 hover:shadow-sm cursor-default">
      <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[var(--accent)]">
        {title}
      </h3>
      <p className="text-base text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}
