import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import AnimatedSection from '../components/AnimatedSection'

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
    <div className="min-h-screen bg-white">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <div 
          className="h-full bg-indigo-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar />
      
      <main className="pt-32 pb-32">
        {/* 1. HERO SECTION */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <AnimatedSection animation="fade-in">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-12 transition-colors group">
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to projects
            </Link>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              When Recovery Fails: A UX Teardown of Amazon's Order Cancellation Flow
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={100}>
            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              An analysis of error recovery during high-stakes checkout
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Role</div>
                <div className="text-gray-900">UX Designer (Independent Analysis)</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Focus Areas</div>
                <div className="text-gray-900">Interaction Design, Error Recovery, Customer Experience</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Reading Time</div>
                <div className="text-gray-900">3 min</div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 2. CONTEXT */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Context</h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <ul className="space-y-3 text-lg text-gray-700">
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
                  <span>Emotional state: urgency + pressure</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </section>

        {/* 3. THE CORE PROBLEM */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Core Problem</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>Address cannot be edited post-order.</p>
              <p>Only option: cancel and rebuild.</p>
              <p>Cancellation reason does not trigger contextual system response.</p>
              <p>Lightning deal constraint increases stress.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6">
              <p className="text-lg text-gray-900 font-semibold">
                This is a breakdown in recovery design, not a functional bug.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* 4. CURRENT FLOW BREAKDOWN */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Current Flow Breakdown</h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Navigate to orders</h3>
                    <p className="text-gray-600">User must locate the order in their order history</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Select "Cancel items"</h3>
                    <p className="text-gray-600">Initiate cancellation for all 15 items</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Choose cancellation reason</h3>
                    <p className="text-gray-600 mb-3">System asks: "Why are you canceling?"</p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                      <p className="text-gray-900 font-medium">Option selected: "Need to change shipping address"</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    4
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Confirm cancellation</h3>
                    <p className="text-gray-600">Order is canceled. No further assistance offered.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    5
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Manually rebuild cart</h3>
                    <p className="text-gray-600">User must search for and re-add all 15 items</p>
                    <div className="mt-3 bg-red-50 border-l-4 border-red-500 p-4">
                      <p className="text-gray-900 font-medium">Lightning deal may no longer be available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 space-y-4">
              <h3 className="font-semibold text-gray-900 text-xl">Key Issues:</h3>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">×</span>
                  <span>Redundant cognitive load</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">×</span>
                  <span>Missed opportunity in reason selection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">×</span>
                  <span>System rigidity</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </section>

        {/* 5. UX ANALYSIS */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">UX Analysis</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>Applying Norman's Action Cycle reveals a breakdown at the <span className="font-semibold text-gray-900">Interpretation stage</span>.</p>
              
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">User Goal:</h3>
                  <p>Change shipping address</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">System Action:</h3>
                  <p>Asks for cancellation reason</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">User Input:</h3>
                  <p>"Need to change shipping address"</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">System Response:</h3>
                  <p className="text-red-600 font-semibold">Nothing. Order canceled. End of interaction.</p>
                </div>
              </div>

              <p className="font-semibold text-gray-900">The system ignores user intent despite explicitly asking for it.</p>
              <p>There is no meaningful feedback loop.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6">
              <p className="text-lg text-gray-900">
                The system collects data but doesn't act on it. This is a missed opportunity to close the recovery loop.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* 6. ATTENTION TO DETAIL OBSERVATIONS */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Attention to Detail Observations</h2>
            <p className="text-lg text-gray-700 mb-8">Micro-interaction gaps that impact macro-level trust.</p>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="bg-white border-l-4 border-indigo-600 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Observation 1: Reason Selection Theater</h3>
                <p className="text-gray-700 mb-3">
                  Cancellation reason includes "Need to change shipping address" as an option.
                </p>
                <p className="text-gray-700 font-semibold">
                  But the system does nothing with that input.
                </p>
                <p className="text-gray-600 mt-3 italic">
                  Why ask if you won't respond? This creates false expectations and erodes trust.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-white border-l-4 border-indigo-600 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Observation 2: No Lightning Deal Safeguard</h3>
                <p className="text-gray-700 mb-3">
                  No warning that canceling may result in losing time-sensitive pricing.
                </p>
                <p className="text-gray-700 font-semibold">
                  No acknowledgment of urgency context.
                </p>
                <p className="text-gray-600 mt-3 italic">
                  The system treats all cancellations equally, regardless of stakes.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="bg-white border-l-4 border-indigo-600 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Observation 3: No Cart Preservation</h3>
                <p className="text-gray-700 mb-3">
                  After cancellation, the 15-item cart is gone.
                </p>
                <p className="text-gray-700 font-semibold">
                  User must manually search and re-add every item.
                </p>
                <p className="text-gray-600 mt-3 italic">
                  The system knows what was ordered. It could offer to restore the cart with a corrected address.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <div className="bg-white border-l-4 border-indigo-600 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Observation 4: Emotional Friction Increases Abandonment Risk</h3>
                <p className="text-gray-700 mb-3">
                  The combination of urgency, manual effort, and uncertainty creates decision paralysis.
                </p>
                <p className="text-gray-700 font-semibold">
                  Users may abandon the purchase entirely rather than rebuild.
                </p>
                <p className="text-gray-600 mt-3 italic">
                  Recovery friction directly impacts conversion.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 7. CUSTOMER-FIRST REFLECTION */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Customer-First Reflection</h2>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="text-xl text-gray-900 font-semibold">
                Strong systems should anticipate mistakes, not penalize them.
              </p>
              
              <p>Designing for human error means:</p>
              
              <ul className="space-y-3 ml-6">
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
                  <span>Closing the feedback loop when you ask for input</span>
                </li>
              </ul>

              <p className="pt-6 border-t border-indigo-200">
                This teardown isn't about criticizing Amazon. It's about recognizing that even mature systems have recovery gaps.
              </p>
              
              <p className="font-semibold text-gray-900">
                The best opportunities for UX improvement often live in the moments when things go wrong.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* Back to projects */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="border-t border-gray-200 pt-12">
            <Link 
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              View all projects
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AmazonTeardownCaseStudy
