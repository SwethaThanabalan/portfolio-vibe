import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import AnimatedSection from '../components/AnimatedSection'

/* ═══════════════════════════════════════════════════════════════
   ABOUT — editorial system matching case studies
═══════════════════════════════════════════════════════════════ */

const timeline = [
  {
    year: '2018–2020',
    title: 'Commercial Photography',
    text: 'Learned to observe before acting. Every frame was a decision about what to include, exclude, and emphasize. Developed an instinct for visual hierarchy.',
  },
  {
    year: '2020–2021',
    title: 'Marketing & SEO',
    text: 'Shifted from creating visuals to understanding why people find things. Learned how language, structure, and positioning shape discovery. Started seeing products as systems.',
  },
  {
    year: '2021–2022',
    title: 'SEO Research at a fintech company',
    text: 'While optimizing search performance, I kept gravitating toward the product itself. Why did some interfaces feel trustworthy and others didn\'t?',
  },
  {
    year: '2022–2024',
    title: 'HCI at Drexel University',
    text: 'Formally entered the field. Design isn\'t about screens, it\'s about decisions. Learned to frame problems, validate assumptions, and build with intention.',
  },
  {
    year: '2023–Present',
    title: 'Product Design',
    text: 'Now I think in systems. I connect research to strategy to interface to outcome. Every project asks: what\'s the real problem, and who does this serve?',
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
                I didn't start in product design. I started behind a camera.
              </h1>
              <p className={`type-lead transition-all duration-1000 delay-200 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                Product Designer with an HCI background, working across user research, interaction design, prototyping, design systems, and AI-assisted product development.
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
                <figcaption className="type-caption mt-3">Commercial photographer → product designer</figcaption>
              </figure>
            </div>
          </div>
        </section>


        {/* THE PATH */}
        <section className="layout-content mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">The path here</h2>
            <div className="space-y-5 type-body-lg">
              <p>As a commercial photographer, I spent years thinking about how products are presented, styled, and experienced visually. Product photography taught me how small details completely change perception.</p>
              <p>Over time, my work expanded into marketing and SEO, eventually leading me to work as an SEO research assistant at a fintech company. While analyzing competitors and improving search performance, I found myself increasingly focused on the product itself, especially the interface.</p>
              <p>At first, I thought UX/UI design was mostly about designing interfaces. Once I formally stepped into the field, that perspective changed completely.</p>
            </div>
          </AnimatedSection>
        </section>


        {/* TIMELINE */}
        <section className="layout-content mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-8">The journey</h2>
          </AnimatedSection>

          <div className="space-y-8">
            {timeline.map((stage, i) => (
              <AnimatedSection key={stage.year} animation="fade-up" delay={i * 80}>
                <div className="grid md:grid-cols-4 gap-4 md:gap-8 border-l-4 border-[var(--border)] pl-6">
                  <div className="md:col-span-1">
                    <p className="type-meta-label mb-1">{stage.year}</p>
                    <p className="type-body font-medium">{stage.title}</p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="type-body">{stage.text}</p>
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
              I see myself as a hybrid product designer with foundations in visual storytelling, marketing strategy, SEO thinking, and user-centered design.
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
