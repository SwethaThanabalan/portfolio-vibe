import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedSection from '../components/AnimatedSection'

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-32">
        {/* HERO SECTION */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <AnimatedSection animation="fade-in">
              <div className="w-full max-w-[400px] mx-auto md:mx-0">
                <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden">
                  {/* Placeholder for profile image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Headline and Introduction */}
            <AnimatedSection animation="fade-up" delay={100}>
              <div>
                <h1 
                  className="font-bold text-gray-900 mb-6"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    lineHeight: '1.1'
                  }}
                >
                  Hi, I'm Swetha.
                </h1>
                <p 
                  className="text-gray-700 leading-relaxed"
                  style={{
                    fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)'
                  }}
                >
                  Product designer focused on turning ambiguous ideas into structured product experiences.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* WHAT I DO / HOW I THINK SECTION */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left Column - Labels */}
            <AnimatedSection animation="fade-up">
              <div className="md:col-span-1">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  What I Do
                </h2>
              </div>
            </AnimatedSection>

            {/* Right Column - Content */}
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="md:col-span-2 space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  I design products from 0→1, bringing structure to ambiguity and clarity to complex problems. My work spans research, interaction design, and system thinking.
                </p>
                <p>
                  I believe good design isn't about following trends—it's about understanding user needs, challenging assumptions, and building experiences that scale.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mt-16">
            {/* Left Column - Labels */}
            <AnimatedSection animation="fade-up">
              <div className="md:col-span-1">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  How I Think
                </h2>
              </div>
            </AnimatedSection>

            {/* Right Column - Content */}
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="md:col-span-2 space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  I approach design with a research-first mindset. I ask questions, validate assumptions, and iterate based on evidence—not intuition alone.
                </p>
                <p>
                  My background in marketing taught me to think strategically about user behavior, positioning, and product-market fit. I bring that lens to every design decision.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* STRENGTHS SECTION */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Core Capabilities</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedSection animation="fade-up" delay={0}>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">0→1 Product Design</h3>
                <p className="text-gray-600 text-sm">Building products from scratch with structure and clarity</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={50}>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Interaction Design</h3>
                <p className="text-gray-600 text-sm">Crafting intuitive flows and micro-interactions</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Design Systems</h3>
                <p className="text-gray-600 text-sm">Creating scalable component libraries and patterns</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={150}>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">UX Research</h3>
                <p className="text-gray-600 text-sm">Validating assumptions through testing and analysis</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Prototyping</h3>
                <p className="text-gray-600 text-sm">Building interactive prototypes to test concepts</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={250}>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">User Testing</h3>
                <p className="text-gray-600 text-sm">Running structured tests to gather insights</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CURRENTLY EXPLORING SECTION */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Currently Exploring</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                AI-assisted design workflows
              </span>
              <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                Gamification patterns
              </span>
              <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                Design systems at scale
              </span>
              <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                Behavioral psychology in UX
              </span>
              <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                Cross-platform design
              </span>
            </div>
          </AnimatedSection>
        </section>

        {/* BEYOND DESIGN SECTION */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Beyond Design</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                When I'm not designing, I'm exploring new coffee shops, reading about behavioral psychology, experimenting with creative tools, or planning my next travel adventure. I believe the best design inspiration comes from outside the design world.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* CTA SECTION */}
        <section className="max-w-4xl mx-auto px-6">
          <AnimatedSection animation="fade-up">
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Let's Connect</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                I'm always interested in hearing about new projects, collaboration opportunities, or just chatting about design.
              </p>
              <a 
                href="mailto:tys.swetha@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  color: 'white'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
              >
                Email me
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
