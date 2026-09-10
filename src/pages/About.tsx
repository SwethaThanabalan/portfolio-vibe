import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import AnimatedSection from '../components/AnimatedSection'

/* ═══════════════════════════════════════════════════════════════
   ABOUT — editorial system matching case studies
═══════════════════════════════════════════════════════════════ */

const skills = [
  {
    label: 'Photography',
    status: 'Still active — freelance and personal',
    text: 'Trained me to observe closely and understand how framing, light, and composition change what people notice. That instinct now shapes how I approach interfaces.',
  },
  {
    label: 'Marketing & SEO',
    status: 'Still active — my own online presence',
    text: 'Taught me how people find, judge, and decide. I use it to build my own presence and to think about products as systems people navigate, not just screens.',
  },
  {
    label: 'HCI at Drexel University',
    status: 'MS, 2022–2024',
    text: 'Gave me the formal foundation: research methods, problem framing, validation, and the understanding that design is about decisions, not screens.',
  },
  {
    label: 'Product Design',
    status: 'Where it all converges',
    text: 'The workflow that ties everything together. I connect research to strategy to interface to outcome, drawing on observation, positioning, and craft from everything else I do.',
  },
]

const principles = [
  {
    title: 'Structure before polish',
    text: 'I focus on defining the right problem, validating assumptions, and building foundations before refining surfaces.',
  },
  {
    title: 'Research is a decision-making tool',
    text: 'I research to reduce risk, challenge assumptions, and make defensible recommendations, not to check a box.',
  },
  {
    title: 'AI accelerates, it doesn\'t replace thinking',
    text: 'I use AI tools to explore faster and reduce friction. But the judgment, framing, and strategic decisions are mine.',
  },
  {
    title: 'Empathy is a skill, not a buzzword',
    text: 'Understanding users means asking uncomfortable questions, sitting with ambiguity, and challenging your own assumptions.',
  },
]

const About = () => {
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => setHeroVisible(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEO
        title="About Swetha Thanabalan | Product Designer"
        description="Product Designer with an HCI background, commercial photography experience, and expertise in user research, interaction design, design systems, and AI-assisted workflows."
        path="/about"
      />
      <Navbar />

      <main id="main-content" className="pt-32 pb-32">

        {/* HERO */}
        <section className="layout-content mb-20">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-3">
              <p className={`type-eyebrow mb-4 transition-all duration-700 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
                About — Swetha Thanabalan
              </p>
              <h1
                className={`type-h1 mb-6 transition-all duration-1000 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                Product design is where everything I do comes together.
              </h1>
              <p className={`type-lead transition-all duration-1000 delay-200 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                I still shoot photography, run my own online presence, and take on freelance design and photo work. Product design is the intersection of all of it, one workflow built from skills I keep sharpening on their own.
              </p>
            </div>
            <div className={`md:col-span-2 transition-all duration-1000 delay-300 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <figure>
                <img
                  src="/PortfolioPictureswetha.jpg"
                  alt="Swetha Thanabalan"
                  className="w-full border border-[var(--border)]"
                  style={{ aspectRatio: '3/4', objectFit: 'cover' }}
                  loading="eager"
                />
                <figcaption className="type-caption mt-3">Product designer, photographer, and marketer</figcaption>
              </figure>
            </div>
          </div>
        </section>


        {/* THE THROUGH-LINE */}
        <section className="layout-content mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">The through-line</h2>
            <div className="space-y-5 type-body-lg">
              <p>I didn't collect these skills and move on from them. I still do all of them. I shoot photography, both freelance and for myself. I use marketing to build and run my own online presence. I take on freelance design work. Each one stays sharp because I keep practicing it.</p>
              <p>Product design is where they meet. Photography taught me to observe closely and understand how framing changes what people see. Marketing taught me how people find, judge, and decide. Design gave me the tools to build for those decisions. The common thread is studying how people perceive and choose, then designing around it.</p>
              <p>I think of it as learning each skill on its own first, then tying them into one workflow. Product design is that workflow.</p>
            </div>
          </AnimatedSection>
        </section>


        {/* SKILLS THAT CONVERGE */}
        <section className="layout-content mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-3">The skills that feed it</h2>
            <p className="type-body-lg mb-8">Each of these is a practice I still keep up. Product design is where they combine.</p>
          </AnimatedSection>

          <div className="space-y-6">
            {skills.map((s, i) => (
              <AnimatedSection key={s.label} animation="fade-up" delay={i * 80}>
                <div className="grid md:grid-cols-4 gap-4 md:gap-8 border-l-4 pl-6" style={{ borderLeftColor: i === skills.length - 1 ? 'var(--accent)' : 'var(--border)' }}>
                  <div className="md:col-span-1">
                    <p className="type-body font-medium mb-1">{s.label}</p>
                    <p className="type-meta-label">{s.status}</p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="type-body">{s.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>


        {/* HOW I THINK */}
        <section className="bg-surface py-14 mb-20">
          <div className="layout-content">
            <AnimatedSection animation="fade-up">
              <h2 className="type-h2 mb-6">How I think</h2>
              <div className="space-y-5 type-body-lg">
                <p>During an internship, my mentor encouraged me to talk about the rough patches, what failed, what changed, and why decisions were made, instead of focusing only on polished outcomes. That reframed how I present work.</p>
                <p>Empathy is one of my biggest strengths as a designer. I ask probing questions, look for patterns in behavior, and try to get to the root of problems instead of settling for surface-level answers.</p>
                <p>Having worked across India, Canada, and the United States, I've become especially interested in how people from different backgrounds experience products differently. Context shapes everything.</p>
              </div>
            </AnimatedSection>
          </div>
        </section>


        {/* WHAT I BELIEVE */}
        <section className="layout-content mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-8">What I believe</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((p, i) => (
              <AnimatedSection key={p.title} animation="fade-up" delay={i * 80}>
                <div className="border-l-4 border-indigo-300 pl-5 py-2">
                  <h3 className="type-h3 mb-2">{p.title}</h3>
                  <p className="type-body">{p.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>


        {/* TODAY */}
        <section className="layout-content mb-20">
          <AnimatedSection animation="fade-up">
            <blockquote className="type-quote">
              I'm a product designer who kept the crafts that led me here: observation from photography, positioning from marketing, and research from HCI, working as one.
            </blockquote>
          </AnimatedSection>
        </section>


        {/* CTA */}
        <section className="layout-content">
          <AnimatedSection animation="fade-up">
            <div className="border-t border-[var(--border)] pt-12">
              <p className="type-body-lg mb-8">
                If you're looking for a designer who thinks in systems, asks hard questions, and brings structure to ambiguity, let's talk.
              </p>
              <a
                href="mailto:tys.swetha@gmail.com"
                className="group inline-flex items-center gap-3 type-h3 text-[var(--text)] transition-colors duration-300 hover:text-[var(--accent)]"
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
          </AnimatedSection>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default About
