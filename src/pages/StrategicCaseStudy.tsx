import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import AnimatedSection from '../components/AnimatedSection'
import { projects } from '../data/projects'

const StrategicCaseStudy = () => {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
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
        <section className="max-w-4xl mx-auto px-6 mb-32">
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
          <section className="max-w-4xl mx-auto px-6 mb-32">
            <AnimatedSection animation="fade-up">
              <div className="prose prose-lg max-w-none">
                {project.problem.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**')) {
                    const title = paragraph.match(/\*\*(.*?)\*\*/)?.[1]
                    const content = paragraph.replace(/\*\*(.*?)\*\*/, '').trim()
                    return (
                      <div key={i} className="mb-8">
                        {title && <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>}
                        {content && <p className="text-lg text-gray-700 leading-relaxed">{content}</p>}
                      </div>
                    )
                  }
                  return <p key={i} className="text-lg text-gray-700 leading-relaxed mb-6">{paragraph}</p>
                })}
              </div>
            </AnimatedSection>
          </section>
        )}

        {/* 3. RESEARCH → INSIGHTS */}
        {project.researchInsights && (
          <section className="max-w-4xl mx-auto px-6 mb-32">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Research → Insights</h2>
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
        {project.strategicDecision && (
          <section className="max-w-4xl mx-auto px-6 mb-32">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{project.strategicDecision.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">{project.strategicDecision.context}</p>
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
        {project.additionalDecisions && project.additionalDecisions.map((decision, index) => (
          <section key={index} className="max-w-4xl mx-auto px-6 mb-32">
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
        {project.designExecution && (
          <section className="max-w-4xl mx-auto px-6 mb-32">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Design Execution</h2>
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
        {project.figmaPrototype && (
          <section className="max-w-6xl mx-auto px-6 mb-32">
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
          <section className="max-w-4xl mx-auto px-6 mb-32">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Outcome & Impact</h2>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <div className="mb-8">
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
              <div className="mb-8">
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
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 mb-8">
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
          <section className="max-w-4xl mx-auto px-6 mb-32">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
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
