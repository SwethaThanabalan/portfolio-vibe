import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import AnimatedSection from '../components/AnimatedSection'

/* ═══════════════════════════════════════════════════════════════
   WANDERAI — Work in progress
   Not a finished case study. Shows how I am learning to build
   closer to implementation using AI-assisted development.
═══════════════════════════════════════════════════════════════ */

/* Steps in the AI-assisted building workflow progression */
const workflowSteps = [
  {
    label: 'Ad hoc prompts',
    text: 'I started by asking the AI assistant to make changes as they came to mind, one request at a time.',
  },
  {
    label: 'Repeated unintended changes',
    text: 'Asking it to modify one area sometimes affected other parts of the product. I kept adding "do not change anything else" to each prompt.',
  },
  {
    label: 'Documented constraints',
    text: 'Instead of repeating that constraint every time, I wrote the rules and expectations for the project into Markdown files.',
  },
  {
    label: 'Phase-specific Markdown files',
    text: 'I created separate Markdown files for different phases of the build so the guidance matched what I was working on.',
  },
  {
    label: 'Steering document',
    text: 'I used a steering document to keep the assistant aligned with the product and design decisions that were already made.',
  },
  {
    label: 'More controlled iteration',
    text: 'With scope and decisions written down, changes became more predictable and I spent less time correcting unintended edits.',
  },
]

const WanderAI = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--bg)]">
      <SEO
        title="WanderAI | Currently Building | Swetha Thanabalan"
        description="A work-in-progress project where I design and build closer to implementation using AI-assisted development. Notes on product direction, current screens, and how my workflow is changing."
        path="/project/wanderai"
        type="article"
      />

      <Navbar />

      <main id="main-content" className="pt-32 pb-32">

        {/* ═══════════════════════════════════════════
            HERO
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
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-medium text-white mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Currently building
            </span>
            <h1 className="type-h1 mb-8">
              WanderAI
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <p className="type-lead mb-8">
              A project I am actively building. I am putting it on my portfolio not as a finished case study, but to show how I am learning to work closer to implementation and use AI-assisted development as part of my design process.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150}>
            <div className="decision-block">
              <p className="type-body-sm font-semibold mb-1">A note on where this stands</p>
              <p className="type-body">This is a work in progress. The direction, screens, and workflow below reflect the current state and will keep changing as I build. I am a product designer building closer to implementation, not a software engineer.</p>
            </div>
          </AnimatedSection>
        </section>


        {/* ═══════════════════════════════════════════
            WHAT + WHY
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">
          <div className="grid md:grid-cols-2 gap-10">
            <AnimatedSection animation="fade-up">
              <h2 className="type-h3 mb-4">What I'm building</h2>
              <p className="type-body">
                WanderAI is an AI-assisted travel planning experience. I am designing the product and building working screens in parallel, rather than handing off static designs.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={100}>
              <h2 className="type-h3 mb-4">Why I'm building it</h2>
              <p className="type-body">
                I wanted to close the gap between design and implementation. Building it myself lets me feel how design decisions hold up in real code, and where they need to change once they meet a working product.
              </p>
            </AnimatedSection>
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            CURRENT DIRECTION
        ═══════════════════════════════════════════ */}
        <section className="bg-surface py-12 mb-16">
          <div className="layout-content">
            <AnimatedSection animation="fade-up">
              <h2 className="type-h2 mb-6">Current product direction</h2>
              <p className="type-body-lg mb-6">
                The current direction centers on helping someone go from a rough travel idea to a plan they can act on, with AI assisting along the way. This is the working direction today and is likely to shift as I keep building and testing.
              </p>
            </AnimatedSection>
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            CURRENT SCREENS
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Current screens</h2>
            <p className="type-body-lg mb-8">
              A snapshot of where the build is right now. These are in progress and will change.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="grid sm:grid-cols-2 gap-6">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="aspect-[4/3] border border-[var(--border)] bg-white flex items-center justify-center"
                >
                  <span className="font-editorial text-3xl text-[#1a1a1a]">WanderAI</span>
                </div>
              ))}
            </div>
            <p className="type-caption mt-3">Screens are placeholders until I capture current builds.</p>
          </AnimatedSection>
        </section>


        {/* ═══════════════════════════════════════════
            LEARNING TO DESIGN WITH AN AI CODING ASSISTANT
        ═══════════════════════════════════════════ */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Learning to design with an AI coding assistant</h2>
            <div className="space-y-6 type-body-lg">
              <p>
                When I first started prompting changes in Kiro, I noticed that asking it to modify one area could sometimes affect other parts of the product. In Figma Make, I could select a specific part of the interface and work mainly within that area. With Kiro, I had to be much more explicit about scope.
              </p>
              <p>
                At first I kept adding instructions like "do not change anything else." I realized I did not want to repeat that constraint every time. So I started creating Markdown files that documented the rules and expectations for the project. I also created separate Markdown files for different phases of the build, and used a steering document to keep the assistant aligned with the product and design decisions that had already been made.
              </p>
              <p>
                The point was not the prompt itself. It was that I recognized a pattern of repeated unwanted changes and built a more structured workflow to reduce them.
              </p>
            </div>
          </AnimatedSection>

          {/* Progression */}
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-12">
              <ol className="relative border-l border-[var(--border)] ml-2">
                {workflowSteps.map((step, i) => (
                  <li key={i} className="ml-6 mb-8 last:mb-0">
                    <span className="absolute -left-[9px] flex items-center justify-center w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[10px] font-semibold">
                      {i + 1}
                    </span>
                    <p className="type-body font-semibold mb-1">{step.label}</p>
                    <p className="type-body-sm">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </AnimatedSection>
        </section>


        {/* ═══════════════════════════════════════════
            WHAT I'M LEARNING / WORKFLOW SHIFT
        ═══════════════════════════════════════════ */}
        <section className="bg-surface py-12 mb-16">
          <div className="layout-content">
            <AnimatedSection animation="fade-up">
              <h2 className="type-h2 mb-6">How my workflow is changing</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedSection animation="fade-up" delay={50}>
                <div className="space-y-3">
                  <h3 className="type-h3">What I'm learning</h3>
                  <ul className="space-y-3 text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">→</span> Design decisions read differently once they exist in working code.</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">→</span> Being explicit about scope matters as much as the design itself.</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">→</span> Writing decisions down keeps the build aligned over time.</li>
                  </ul>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="space-y-3">
                  <h3 className="type-h3">Moving between design and implementation</h3>
                  <ul className="space-y-3 text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">→</span> I move between designing a screen and building it in the same session.</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">→</span> I document product and design decisions so they carry into the build.</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">→</span> I iterate in smaller, scoped steps to keep changes predictable.</li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            NAVIGATION
        ═══════════════════════════════════════════ */}
        <section className="layout-content">
          <AnimatedSection animation="fade-up">
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
          </AnimatedSection>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default WanderAI
