import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import AnimatedSection from '../components/AnimatedSection'
import { projects } from '../data/projects'

const StrategicCaseStudy = () => {
  const { id } = useParams()
  const project = projects.find((p: any) => p.id === id)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showAudioPlayer, setShowAudioPlayer] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [quickSummaryMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showQuickSummary, setShowQuickSummary] = useState(false)
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.pageYOffset / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project not found</h1>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700">Back to home</Link>
        </div>
      </div>
    )
  }

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
        {/* 1. OPENING HOOK */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-in">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-12 transition-colors group">
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to projects
            </Link>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-12 leading-tight">
              {project.title}
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-xl text-gray-700 leading-relaxed space-y-6 mb-16">
              {project.openingHook?.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </AnimatedSection>

          {/* Recruiter Utilities */}
          <AnimatedSection animation="fade-up" delay={150}>
            <div className="flex flex-wrap items-center gap-6  text-sm text-gray-600" style={{ marginBottom: '50px' }}>
              {/* 60-sec Overview */}
              <button
                onClick={() => {
                  setShowAudioPlayer(!showAudioPlayer)
                  if (!showAudioPlayer) setShowQuickSummary(false)
                }}
                className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                60-sec overview
              </button>

              {/* Quick Summary */}
              <button
                onClick={() => {
                  setShowQuickSummary(!showQuickSummary)
                  if (!showQuickSummary) setShowAudioPlayer(false)
                }}
                className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick summary
              </button>

              {/* Read Time */}
              <div className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                3 min read
              </div>
            </div>

            {/* Quick Summary (Collapsible) */}
            <div 
              className="overflow-hidden transition-all"
              style={{ 
                maxHeight: showQuickSummary ? '600px' : '0',
                opacity: showQuickSummary ? 1 : 0,
                transitionDuration: prefersReducedMotion ? '0ms' : '260ms',
                transitionTimingFunction: prefersReducedMotion ? 'linear' : 'cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              <div style={{ paddingBottom: '32px' }}>
                <p className="text-base text-gray-700 leading-relaxed" style={{ maxWidth: '65ch' }}>
                  SEPTA's mobile app was widely used for ticketing and trip planning, yet purchasing a ticket required seven steps and reflected internal navigation categories rather than rider intent, creating confusion and reduced trust. Research showed that sixty-eight percent of sessions involved ticketing, but usability testing revealed only a forty-five percent task success rate. To address the structural misalignment, I reduced primary navigation from five tabs to three, merged overlapping trip functions, elevated ticketing as a persistent primary action, introduced biometric login with persistent sessions, and integrated a map-first interaction model. These prioritization decisions reduced ticket steps by fifty-seven percent, improved task success from forty-five to ninety-two percent, and resulted in all eight usability participants completing ticket purchase unassisted. Reframing the information architecture around rider intent rebuilt trust and reduced cognitive load in a system people depend on daily.
                </p>
              </div>
            </div>

            {/* Audio Player (Collapsible) */}
            <div 
              className="overflow-hidden transition-all duration-260"
              style={{ 
                maxHeight: showAudioPlayer ? '200px' : '0',
                opacity: showAudioPlayer ? 1 : 0
              }}
            >
              <div className="border border-gray-200 rounded-lg p-6 " style={{ marginBottom: '50px' }}>
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center hover:bg-indigo-800 transition-colors"
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-700 w-0" />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0:00</span>
                      <span>1:00</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors hover:underline"
                >
                  {showTranscript ? 'Hide' : 'Show'} transcript
                </button>

                {showTranscript && (
                  <div className="mt-4 text-sm text-gray-700 leading-relaxed border-t border-gray-200 pt-4">
                    <p className="mb-3">
                      SEPTA's mobile app served thousands of daily commuters, but riders didn't trust it. The core issue wasn't visual design—it was prioritization.
                    </p>
                    <p className="mb-3">
                      Ticketing, the most critical action, required seven steps and was buried three levels deep. Meanwhile, 68% of sessions involved buying tickets. Navigation reflected internal org structure, not how people actually plan trips. Every user we tested relied on Google Maps alongside SEPTA because the app lacked integrated spatial planning.
                    </p>
                    <p className="mb-3">
                      We made three strategic moves. First, we restructured navigation from five tabs to three and elevated ticketing as a persistent action. Second, we made the map the primary interaction layer—not a secondary feature. Third, we implemented biometric login to make authentication invisible.
                    </p>
                    <p className="mb-3">
                      Results: task success jumped from 45% to 92%. Ticket purchase dropped from seven steps to three. All eight usability participants completed purchases unassisted.
                    </p>
                    <p>
                      The lesson: trust is infrastructure. Good information architecture reflects user intent, not organizational charts.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Metadata */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-200">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Role</div>
                <div className="text-gray-900">{project.role}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Scope</div>
                <div className="text-gray-900">{project.scope}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Methods</div>
                <div className="text-gray-900">{project.methods}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Impact</div>
                <div className="text-gray-900">{project.impact}</div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 2. THE PROBLEM / TRUST GAP */}
        {project.problem && (
          <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
            <AnimatedSection animation="fade-up">
              <div className="prose prose-lg max-w-none">
                {quickSummaryMode ? (
                  // SMART Quick Summary
                  <div className="space-y-8">
                    <div>
                      <div className="text-sm font-bold text-gray-900 mb-3">Situation</div>
                      <p className="text-base text-gray-700 leading-relaxed">
                        SEPTA's mobile app was widely used for ticketing and trip planning but required seven steps to complete a ticket purchase. Navigation reflected internal categories rather than rider intent, leading to confusion and reduced trust.
                      </p>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-gray-900 mb-3">Measurable Problem</div>
                      <ul className="text-base text-gray-700 leading-relaxed space-y-2">
                        <li>• 68% of sessions involved ticketing</li>
                        <li>• Ticket purchase required 7 screens</li>
                        <li>• Task success rate was 45% in usability testing</li>
                      </ul>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-gray-900 mb-3">Action</div>
                      <ul className="text-base text-gray-700 leading-relaxed space-y-2">
                        <li>• Reduced navigation from 5 tabs to 3</li>
                        <li>• Merged overlapping trip functions</li>
                        <li>• Elevated ticketing as a persistent primary action</li>
                        <li>• Introduced biometric login and persistent sessions</li>
                        <li>• Integrated a map-first interaction model</li>
                      </ul>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-gray-900 mb-3">Results</div>
                      <ul className="text-base text-gray-700 leading-relaxed space-y-2">
                        <li>• 57% reduction in ticket steps (7 → 3)</li>
                        <li>• Task success improved from 45% to 92%</li>
                        <li>• 8/8 participants completed ticket purchase unassisted</li>
                      </ul>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-gray-900 mb-3">Takeaway</div>
                      <p className="text-base text-gray-700 leading-relaxed">
                        Reframing information architecture around rider intent rebuilt trust and reduced cognitive load in a high-dependency system.
                      </p>
                    </div>
                  </div>
                ) : (
                  // Full content
                  project.problem.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**')) {
                    const title = paragraph.match(/\*\*(.*?)\*\*/)?.[1]
                    const content = paragraph.replace(/\*\*(.*?)\*\*/, '').trim()
                    return (
                      <div key={i} className="" style={{ marginBottom: '50px' }}>
                        {title && <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>}
                        {content && <p className="text-lg text-gray-700 leading-relaxed">{content}</p>}
                      </div>
                    )
                  }
                  return <p key={i} className="text-lg text-gray-700 leading-relaxed mb-6">{paragraph}</p>
                })
                )}
              </div>
            </AnimatedSection>
          </section>
        )}

        {/* 3. RESEARCH → INSIGHTS */}
        {!quickSummaryMode && project.researchInsights && (
          <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-gray-900 " style={{ marginBottom: '50px' }}>Research → Insights</h2>
            </AnimatedSection>
            
            <div className="space-y-8">
              {project.researchInsights.map((insight, index) => (
                <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                  <div className="border-l-4 border-indigo-600 pl-6">
                    <div className="text-sm font-semibold text-indigo-600 mb-2">
                      {insight.activity}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">
                      → {insight.insight}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-semibold">Why it matters:</span> {insight.why}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>
        )}

        {/* 4. STRATEGIC DECISION 01 */}
        {!quickSummaryMode && project.strategicDecision && (
          <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{project.strategicDecision.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed " style={{ marginBottom: '50px' }}>{project.strategicDecision.context}</p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="font-semibold text-gray-900 mb-3">Options considered:</div>
                <ul className="space-y-2">
                  {project.strategicDecision.options.map((option, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span className="text-gray-700">{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="mb-6">
                <div className="font-semibold text-gray-900 mb-2">Tradeoffs:</div>
                <p className="text-gray-700 leading-relaxed">{project.strategicDecision.tradeoffs}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6 mb-6">
                <div className="font-semibold text-gray-900 mb-2">Decision:</div>
                <p className="text-gray-700 leading-relaxed">{project.strategicDecision.decision}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <div className="mb-6">
                <div className="font-semibold text-gray-900 mb-2">Reasoning:</div>
                <p className="text-gray-700 leading-relaxed">{project.strategicDecision.reasoning}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={500}>
              <div className="bg-green-50 rounded-xl p-6">
                <div className="font-semibold text-gray-900 mb-2">Impact:</div>
                <p className="text-gray-700 leading-relaxed">{project.strategicDecision.impact}</p>
              </div>
            </AnimatedSection>
          </section>
        )}

        {/* 5. ADDITIONAL STRATEGIC DECISIONS */}
        {!quickSummaryMode && project.additionalDecisions && project.additionalDecisions.map((decision, index) => (
          <section key={index} className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{decision.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{decision.context}</p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6 mb-6">
                <div className="font-semibold text-gray-900 mb-2">Decision:</div>
                <p className="text-gray-700 leading-relaxed">{decision.decision}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-green-50 rounded-xl p-6">
                <div className="font-semibold text-gray-900 mb-2">Impact:</div>
                <p className="text-gray-700 leading-relaxed">{decision.impact}</p>
              </div>
            </AnimatedSection>
          </section>
        ))}

        {/* 6. DESIGN EXECUTION */}
        {!quickSummaryMode && project.designExecution && (
          <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-gray-900 " style={{ marginBottom: '50px' }}>Design Execution</h2>
            </AnimatedSection>

            <div className="space-y-10">
              {project.designExecution.changes.map((change, index) => (
                <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{change.title}</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div className="bg-red-50 rounded-lg p-4">
                        <div className="text-sm font-semibold text-red-700 mb-2">Before</div>
                        <div className="text-gray-700">{change.before}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-sm font-semibold text-green-700 mb-2">After</div>
                        <div className="text-gray-700">{change.after}</div>
                      </div>
                    </div>
                    <div className="text-gray-600">
                      <span className="font-semibold">Rationale:</span> {change.rationale}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {project.designExecution.removed.length > 0 && (
              <AnimatedSection animation="fade-up" delay={400}>
                <div className="mt-10 bg-gray-50 rounded-xl p-6">
                  <div className="font-semibold text-gray-900 mb-3">What we removed:</div>
                  <ul className="space-y-2">
                    {project.designExecution.removed.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-400 mr-2">×</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            )}
          </section>
        )}

        {/* 7. FIGMA PROTOTYPE */}
        {!quickSummaryMode && project.figmaPrototype && (
          <section className="max-w-6xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
            <AnimatedSection animation="fade-up">
              <div className="rounded-xl overflow-hidden shadow-2xl bg-gray-100" style={{ height: '600px' }}>
                <iframe
                  src={project.figmaPrototype}
                  allowFullScreen
                  className="w-full h-full"
                  title="SEPTA Prototype"
                />
              </div>
              {project.figmaFile && (
                <div className="mt-4 text-center">
                  <a
                    href={project.figmaFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    View full Figma file
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </AnimatedSection>
          </section>
        )}

        {/* 8. OUTCOME & IMPACT */}
        {project.outcome && (
          <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-gray-900 " style={{ marginBottom: '50px' }}>Outcome & Impact</h2>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <div className="" style={{ marginBottom: '50px' }}>
                <div className="font-semibold text-gray-900 mb-4">Key metrics:</div>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.outcome.metrics.map((metric, index) => (
                    <div key={index} className="bg-indigo-50 rounded-lg p-4">
                      <div className="text-gray-900 font-medium">{metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="" style={{ marginBottom: '50px' }}>
                <div className="font-semibold text-gray-900 mb-4">Validation:</div>
                <ul className="space-y-3">
                  {project.outcome.validation.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {project.outcome.marketValidation && (
              <AnimatedSection animation="fade-up" delay={300}>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 " style={{ marginBottom: '50px' }}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Market Validation</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">{project.outcome.marketValidation}</p>
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection animation="fade-up" delay={400}>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="font-semibold text-gray-900 mb-2">Limitations:</div>
                <p className="text-gray-700">{project.outcome.limitations}</p>
              </div>
            </AnimatedSection>
          </section>
        )}

        {/* 9. REFLECTION */}
        {project.reflection && (
          <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-gray-900 " style={{ marginBottom: '50px' }}>
                {project.reflection.title}
              </h2>
            </AnimatedSection>

            <div className="space-y-6">
              <AnimatedSection animation="fade-up" delay={100}>
                <div>
                  <div className="font-semibold text-gray-900 mb-2">What worked:</div>
                  <p className="text-gray-700 leading-relaxed">{project.reflection.worked}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <div>
                  <div className="font-semibold text-gray-900 mb-2">What I'd improve:</div>
                  <p className="text-gray-700 leading-relaxed">{project.reflection.improve}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
                  <div className="font-semibold text-gray-900 mb-4 text-lg">What I learned:</div>
                  <div className="prose prose-lg max-w-none">
                    {project.reflection.learned.split('\n\n').map((paragraph, i) => {
                      if (paragraph.startsWith('**')) {
                        const title = paragraph.match(/\*\*(.*?)\*\*/)?.[1]
                        const content = paragraph.replace(/\*\*(.*?)\*\*/, '').trim()
                        return (
                          <div key={i} className="mb-6">
                            {title && <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>}
                            {content && <p className="text-gray-700 leading-relaxed">{content}</p>}
                          </div>
                        )
                      }
                      if (paragraph.startsWith('- **')) {
                        return (
                          <ul key={i} className="space-y-3 mb-6">
                            {paragraph.split('\n').map((line, j) => {
                              const match = line.match(/- \*\*(.*?)\*\*(.*)/)
                              if (match) {
                                return (
                                  <li key={j} className="flex items-start">
                                    <span className="text-indigo-600 mr-2 mt-1">•</span>
                                    <span className="text-gray-700">
                                      <strong>{match[1]}</strong>{match[2]}
                                    </span>
                                  </li>
                                )
                              }
                              return null
                            })}
                          </ul>
                        )
                      }
                      return <p key={i} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
                    })}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        )}

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

export default StrategicCaseStudy
