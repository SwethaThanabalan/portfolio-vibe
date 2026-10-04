import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedSection from '../components/AnimatedSection'
import SEO from '../components/SEO'

const AmazonTeardownCaseStudy = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.pageYOffset / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--bg)]">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 dark:bg-[var(--surface)] z-50">
        <div 
          className="h-full bg-indigo-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <SEO
        title="Amazon UX Teardown | Error Recovery Analysis | Swetha Thanabalan"
        description="UX analysis of Amazon's order cancellation flow examining error recovery, interaction design, and customer experience during high-stakes checkout."
        path="/project/amazon-cancellation-teardown"
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "UX Teardown of Amazon's Order Cancellation Flow",
          "description": "Analysis of error recovery during high-stakes checkout examining interaction design and customer experience.",
          "author": { "@type": "Person", "name": "Swetha Thanabalan" },
          "keywords": "UX Analysis, Interaction Design, Error Recovery, Customer Experience"
        }}
      />

      <Navbar />
      
      <main id="main-content" className="pt-32 pb-32">
        {/* 1. HERO SECTION */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-in">
            <Link to="/#work" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-12 transition-colors group">
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to projects
            </Link>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up">
            <h1 className="type-h1 mb-8 leading-tight">
              A UX teardown of Amazon's order cancellation flow
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={100}>
            <p className="type-lead mb-12">
              How Amazon handles a mistake during a time-sensitive checkout
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-[var(--border)]">
              <div>
                <div className="type-meta-label">Role</div>
                <div className="text-gray-900 dark:text-gray-100">UX Designer (Independent Analysis)</div>
              </div>
              <div>
                <div className="type-meta-label">Focus Areas</div>
                <div className="text-gray-900 dark:text-gray-100">Interaction Design, Error Recovery, Customer Experience</div>
              </div>
              <div>
                <div className="type-meta-label">Reading Time</div>
                <div className="text-gray-900 dark:text-gray-100">3 min</div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 2. CONTEXT */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Context</h2>
            <div className="bg-gray-50 dark:bg-[var(--surface)] rounded-subtle p-8">
              <ul className="list-flow type-body-lg">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-3 mt-1">•</span>
                  <span>Prime Day lightning deal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-3 mt-1">•</span>
                  <span>15-item order placed to wrong address</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-3 mt-1">•</span>
                  <span>Time-sensitive purchase</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-3 mt-1">•</span>
                  <span>Emotional state: rushed and under pressure</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </section>

        {/* 3. THE CORE PROBLEM */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">The core problem</h2>
            <div className="text-flow type-body-lg">
              <p>The address can't be edited after the order is placed, so the only option is to cancel and rebuild the order.</p>
              <p>Choosing a cancellation reason doesn't change what the system does next, and the lightning deal timer adds stress.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-600 rounded-r-xl p-6">
              <p className="type-body-lg font-semibold text-[var(--text)]">
                Nothing here is broken in the technical sense. The problem is how the flow helps a user recover from a mistake.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* 4. CURRENT FLOW BREAKDOWN */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">The current flow</h2>
            <div className="text-flow type-body-lg mb-12">
              <p>The user goes through a multi-step cancellation process that ignores the reason they gave for cancelling.</p>
            </div>
          </AnimatedSection>

          {/* Visual Diagram */}
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="media-frame mb-4">
              <img 
                src="/portfolioamazoncasestudy.jpg" 
                alt="Amazon cancellation flow analysis diagram."
                className="w-full rounded-subtle shadow-lg"
              />
            </div>
            <p className="type-body-sm italic text-center mb-12">
              Cognitive walkthrough of the Amazon cancellation flow highlighting the gap between user intent and system feedback.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 space-y-4">
              <h3 className="type-h3">Key issues</h3>
              <ul className="list-flow type-body-lg">
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 mt-1">×</span>
                  <span>Repeated, unnecessary effort</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 mt-1">×</span>
                  <span>Missed opportunity in reason selection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 mt-1">×</span>
                  <span>System rigidity</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </section>

        {/* 5. UX ANALYSIS */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">UX analysis</h2>
            <div className="text-flow type-body-lg">
              <p>Applying Norman's Action Cycle reveals a breakdown at the <span className="font-semibold text-gray-900 dark:text-gray-100">Interpretation stage</span>.</p>
              
              <p className="font-semibold text-gray-900 dark:text-gray-100">The system asks the user why they're cancelling, then ignores the answer, so there's no useful feedback.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-600 rounded-r-xl p-6">
              <p className="type-body-lg text-[var(--text)]">
                If the system acted on the reason, it could help the user fix the order instead of starting over.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* 6. ATTENTION TO DETAIL OBSERVATIONS */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Detailed observations</h2>
            <p className="type-body-lg mb-8">Small interaction gaps that add up to a loss of trust.</p>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="bg-white dark:bg-[var(--bg)] border-l-4 border-indigo-600 p-6 rounded-r-lg">
                <h3 className="type-h3">Observation 1: the cancellation reason does nothing</h3>
                <p className="text-gray-700 dark:text-gray-200 mb-3">
                  Cancellation reason includes "Need to change shipping address" as an option.
                </p>
                <p className="text-gray-700 dark:text-gray-200 font-semibold">
                  But the system does nothing with that input.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-3 italic">
                  Asking for a reason and then ignoring it sets an expectation the system doesn't meet, which costs trust.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-white dark:bg-[var(--bg)] border-l-4 border-indigo-600 p-6 rounded-r-lg">
                <h3 className="type-h3">Observation 2: no warning about the lightning deal</h3>
                <p className="text-gray-700 dark:text-gray-200 mb-3">
                  No warning that canceling may result in losing time-sensitive pricing.
                </p>
                <p className="text-gray-700 dark:text-gray-200 font-semibold">
                  No acknowledgment of urgency context.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-3 italic">
                  The system treats all cancellations equally, regardless of stakes.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="bg-white dark:bg-[var(--bg)] border-l-4 border-indigo-600 p-6 rounded-r-lg">
                <h3 className="type-h3">Observation 3: the cart isn't saved</h3>
                <p className="text-gray-700 dark:text-gray-200 mb-3">
                  After cancellation, the 15-item cart is gone.
                </p>
                <p className="text-gray-700 dark:text-gray-200 font-semibold">
                  User must manually search and re-add every item.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-3 italic">
                  The system knows what was ordered. It could offer to restore the cart with a corrected address.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <div className="bg-white dark:bg-[var(--bg)] border-l-4 border-indigo-600 p-6 rounded-r-lg">
                <h3 className="type-h3">Observation 4: stress makes abandoning more likely</h3>
                <p className="text-gray-700 dark:text-gray-200 mb-3">
                  Time pressure, manual effort, and uncertainty together make it hard to decide what to do.
                </p>
                <p className="text-gray-700 dark:text-gray-200 font-semibold">
                  Users may abandon the purchase entirely rather than rebuild.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-3 italic">
                  Friction during recovery can cost a sale.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 7. CUSTOMER-FIRST REFLECTION */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Reflection</h2>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-subtle p-8 text-flow type-body-lg">
              <p className="type-h3 text-[var(--text)]">
                Good systems expect mistakes and make them easy to fix.
              </p>
              
              <p>Designing for human error means:</p>
              
              <ul className="list-flow ml-6">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-3 mt-1">•</span>
                  <span>Supporting recovery without punishment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-3 mt-1">•</span>
                  <span>Reducing friction in high-stress moments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-3 mt-1">•</span>
                  <span>Considering emotional context in interaction design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-3 mt-1">•</span>
                  <span>Acting on input after asking for it</span>
                </li>
              </ul>

              <p className="pt-6 border-t border-indigo-200 dark:border-indigo-800">
                I wrote this teardown to look at recovery design, which even mature products like Amazon can get wrong.
              </p>
              
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Some of the most useful UX improvements are in the moments when something goes wrong.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* Back to projects */}
        <section className="layout-content">
          <div className="border-t border-gray-200 dark:border-[var(--border)] pt-12">
            <Link 
              to="/#work"
              className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group"
            >
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              View all projects
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AmazonTeardownCaseStudy
