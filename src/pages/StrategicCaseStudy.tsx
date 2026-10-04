import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import AnimatedSection from '../components/AnimatedSection'
import FlipCard from '../components/FlipCard'
import SEO from '../components/SEO'
import { projects } from '../data/projects'

const StrategicCaseStudy = () => {
  const { id } = useParams()
  const project = projects.find((p: any) => p.id === id)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showAudioPlayer, setShowAudioPlayer] = useState(false)
  const [quickSummaryMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showQuickSummary, setShowQuickSummary] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  
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

  // Scroll to top when component mounts or project changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // Audio player handlers
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = x / rect.width
      audioRef.current.currentTime = percentage * duration
    }
  }

  // Keyboard seeking for the slider-role progress bar
  const handleSeekKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return
    const step = 5 // seconds
    let next = currentTime
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = Math.min(duration, currentTime + step); break
      case 'ArrowLeft':
      case 'ArrowDown':
        next = Math.max(0, currentTime - step); break
      case 'Home':
        next = 0; break
      case 'End':
        next = duration; break
      default:
        return
    }
    e.preventDefault()
    audioRef.current.currentTime = next
    setCurrentTime(next)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="type-h1">Project not found</h1>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700">Back to home</Link>
        </div>
      </div>
    )
  }

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
        title={`${project.title} | ${project.descriptor || project.category} Case Study | Swetha Thanabalan`}
        description={project.description}
        path={`/project/${project.id}`}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": project.title,
          "description": project.description,
          "author": { "@type": "Person", "name": "Swetha Thanabalan" },
          "keywords": (project.keywords || project.tools).join(', ')
        }}
      />

      <Navbar />
      
      <main id="main-content" className="pt-32 pb-32">
        {/* 1. OPENING HOOK */}
        <section className="layout-content mb-6">
          <AnimatedSection animation="fade-in">
            <Link to="/#work" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-12 transition-colors group">
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to projects
            </Link>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up">
            <h1 className="type-h1 mb-6 leading-tight">
              {project.title}
            </h1>
            {/* Context note for academic projects */}
            {project.id === 'septa-mobile-redesign' && (
              <p className="type-body-sm text-[var(--muted)] border-l-2 border-[var(--border)] pl-4 mb-8">
                Context: Academic project. No backend access. Research and design only.
              </p>
            )}
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="type-lead text-flow mb-16">
              {project.openingHook?.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </AnimatedSection>

          {/* Recruiter Utilities */}
          <AnimatedSection animation="fade-up" delay={150}>
            <div className="flex flex-wrap items-center gap-6  type-body-sm">
              {/* Audio Summary */}
              <button
                onClick={() => {
                  setShowAudioPlayer(!showAudioPlayer)
                  if (!showAudioPlayer) setShowQuickSummary(false)
                }}
                aria-expanded={showAudioPlayer}
                aria-controls="audio-player-panel"
                className="inline-flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                Audio summary
              </button>

              {/* Quick Summary */}
              <button
                onClick={() => {
                  setShowQuickSummary(!showQuickSummary)
                  if (!showQuickSummary) setShowAudioPlayer(false)
                }}
                aria-expanded={showQuickSummary}
                aria-controls="quick-summary-panel"
                className="inline-flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick summary
              </button>

              {/* Read Time */}
              <div className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                2 min read
              </div>
            </div>

            {/* Quick Summary (Collapsible) */}
            <div 
              id="quick-summary-panel"
              role="region"
              aria-label="Quick summary"
              aria-hidden={!showQuickSummary}
              className="overflow-hidden transition-all"
              style={{ 
                maxHeight: showQuickSummary ? '600px' : '0',
                opacity: showQuickSummary ? 1 : 0,
                visibility: showQuickSummary ? 'visible' : 'hidden',
                transitionDuration: prefersReducedMotion ? '0ms' : '260ms',
                transitionTimingFunction: prefersReducedMotion ? 'linear' : 'cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              <div style={{ paddingBottom: '32px' }}>
                <p className="type-body">
                  SEPTA's mobile app was widely used for ticketing and trip planning, yet purchasing a ticket required seven steps and reflected internal navigation categories rather than rider intent, creating confusion and reduced trust. Research showed that 68% of sessions involved ticketing, but usability testing revealed only a 45% task success rate. To fix this, I reduced primary navigation from five tabs to three, merged overlapping trip functions, elevated ticketing as a persistent primary action, introduced biometric login with persistent sessions, and integrated a map first interaction model. These prioritization decisions reduced ticket steps by 57%, improved task success from 45% to 92%, and resulted in all eight usability participants completing ticket purchase unassisted. Organizing the app around what riders were trying to do made it easier to use and more trustworthy for people who rely on it every day.
                </p>
              </div>
            </div>

            {/* Audio Player (Collapsible) */}
            <div 
              id="audio-player-panel"
              role="region"
              aria-label="Audio summary player"
              aria-hidden={!showAudioPlayer}
              className="overflow-hidden transition-all duration-260"
              style={{ 
                maxHeight: showAudioPlayer ? '400px' : '0',
                opacity: showAudioPlayer ? 1 : 0,
                visibility: showAudioPlayer ? 'visible' : 'hidden'
              }}
            >
              <div className="border border-gray-200 dark:border-[var(--border)] rounded-lg p-6 mb-6">
                {/* Native audio element with controls as an accessible fallback */}
                <audio
                  ref={audioRef}
                  src="/SeptaProjectAudioSummary.mp3"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  aria-label="SEPTA case study audio summary"
                />
                
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? 'Pause audio summary' : 'Play audio summary'}
                    className="btn-3d w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center hover:bg-indigo-800 transition-colors"
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div 
                      className="h-2 bg-gray-200 dark:bg-[var(--border)] rounded-full overflow-hidden cursor-pointer"
                      onClick={handleSeek}
                      onKeyDown={handleSeekKeyDown}
                      role="slider"
                      tabIndex={0}
                      aria-label="Audio progress. Use arrow keys to seek."
                      aria-valuemin={0}
                      aria-valuemax={Math.round(duration)}
                      aria-valuenow={Math.round(currentTime)}
                      aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                    >
                      <div 
                        className="h-full bg-indigo-700 transition-all"
                        style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>

                {/* Text transcript / alternative for the audio (WCAG 1.2.1) */}
                <details className="mt-2">
                  <summary className="text-sm text-indigo-700 cursor-pointer hover:underline">
                    Read transcript
                  </summary>
                  <p className="type-body-sm mt-3">
                    SEPTA's mobile app was widely used for ticketing and trip planning, yet
                    purchasing a ticket required seven steps and reflected internal navigation
                    categories rather than rider intent, creating confusion and reduced trust.
                    Research showed 68% of sessions involved ticketing, but usability testing
                    revealed only a 45% task success rate. I reduced primary navigation from five
                    tabs to three, merged overlapping trip functions, elevated ticketing as a
                    persistent primary action, introduced biometric login with persistent sessions,
                    and integrated a map-first interaction model. These decisions reduced ticket
                    steps by 57%, improved task success from 45% to 92%, and all eight usability
                    participants completed ticket purchase unassisted.
                  </p>
                </details>
              </div>
            </div>
          </AnimatedSection>

          {/* Metadata */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-200 dark:border-[var(--border)]">
              <div>
                <div className="type-meta-label">Role</div>
                <div className="text-gray-900 dark:text-gray-100">{project.role}</div>
              </div>
              <div>
                <div className="type-meta-label">Scope</div>
                <div className="text-gray-900 dark:text-gray-100">{project.scope}</div>
              </div>
              <div>
                <div className="type-meta-label">Methods</div>
                <div className="text-gray-900 dark:text-gray-100">{project.methods}</div>
              </div>
              <div>
                <div className="type-meta-label">Impact</div>
                <div className="text-gray-900 dark:text-gray-100">{project.impact}</div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 2. THE PROBLEM / TRUST GAP */}
        {project.problem && (
          <section className="layout-content mb-6">
            <AnimatedSection animation="fade-up">
              <div className="prose prose-lg max-w-none">
                {quickSummaryMode ? (
                  // SMART Quick Summary
                  <div className="space-y-8">
                    <div>
                      <div className="type-meta-label text-[var(--text)]">Situation</div>
                      <p className="type-body">
                        SEPTA's mobile app was widely used for ticketing and trip planning but required seven steps to complete a ticket purchase. Navigation reflected internal categories rather than rider intent, leading to confusion and reduced trust.
                      </p>
                    </div>

                    <div>
                      <div className="type-meta-label text-[var(--text)]">Measurable Problem</div>
                      <ul className="type-body list-flow">
                        <li>• 68% of sessions involved ticketing</li>
                        <li>• Ticket purchase required 7 screens</li>
                        <li>• Task success rate was 45% in usability testing</li>
                      </ul>
                    </div>

                    <div>
                      <div className="type-meta-label text-[var(--text)]">Action</div>
                      <ul className="type-body list-flow">
                        <li>• Reduced navigation from 5 tabs to 3</li>
                        <li>• Merged overlapping trip functions</li>
                        <li>• Elevated ticketing as a persistent primary action</li>
                        <li>• Introduced biometric login and persistent sessions</li>
                        <li>• Integrated a map-first interaction model</li>
                      </ul>
                    </div>

                    <div>
                      <div className="type-meta-label text-[var(--text)]">Results</div>
                      <ul className="type-body list-flow">
                        <li>• 57% reduction in ticket steps (7 → 3)</li>
                        <li>• Task success improved from 45% to 92%</li>
                        <li>• 8/8 participants completed ticket purchase unassisted</li>
                      </ul>
                    </div>

                    <div>
                      <div className="type-meta-label text-[var(--text)]">Takeaway</div>
                      <p className="type-body">
                        Organizing the app around what riders were trying to do made it easier to use and more trustworthy for people who rely on it every day.
                      </p>
                    </div>
                  </div>
                ) : (
                  // Full content with flip cards for SEPTA project
                  <div>
                    <h2 className="type-h2 mb-6">Problems</h2>
                    <p className="type-body-lg mb-8">
                      User interviews and testing showed that people found the app frustrating and, beyond that, didn't trust it.
                    </p>

                    {/* Flip Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <FlipCard
                        title="Login loops"
                        description="Users stuck in endless authentication cycles, getting logged out mid-trip."
                      />
                      <FlipCard
                        title="Broken real-time tracking"
                        description="Tracking information was out of date. Buses showed up late or not at all, with no explanation."
                      />
                      <FlipCard
                        title="Confusing navigation"
                        description="Finding a route required hunting through nested menus with unclear labels."
                      />
                      <FlipCard
                        title="Accessibility gaps"
                        description="No font controls, poor contrast, no consideration for users with disabilities."
                      />
                    </div>

                    <p className="type-body-lg mb-6">
                      <b>The most important finding: </b>every user we spoke to used Google Maps alongside SEPTA because the app had no integrated map, so planning a trip meant switching between two apps.
                        <i> It showed that the app wasn't designed around how people actually plan trips.</i>
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </section>
        )}

        {/* 3. RESEARCH → INSIGHTS */}
        {!quickSummaryMode && project.researchInsights && (
          <section className="layout-content mb-6">
            <AnimatedSection animation="fade-up">
              <h2 className="type-h2 mb-6">Research and insights</h2>
            </AnimatedSection>
            
            <div className="space-y-8">
              {project.researchInsights.map((insight, index) => (
                <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                  <div className="border-l-4 border-indigo-600 pl-6">
                    <div className="type-meta-label text-indigo-600">
                      {insight.activity}
                    </div>
                    <div className="type-h3 mb-2">
                      → {insight.insight}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">Why it matters</span> {insight.why}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>
        )}

        {/* 4. STRATEGIC DECISION 01 */}
        {!quickSummaryMode && project.strategicDecision && (
          <section className="layout-content mb-6">
            <AnimatedSection animation="fade-up">
              <h2 className="type-h2 mb-6">{project.strategicDecision.title}</h2>
              <p className="type-body-lg mb-6">{project.strategicDecision.context}</p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <div className="bg-gray-50 dark:bg-[var(--surface)] rounded-xl p-6 mb-6">
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Options considered:</div>
                <ul className="list-flow">
                  {project.strategicDecision.options.map((option, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-200">{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="mb-6">
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Tradeoffs:</div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{project.strategicDecision.tradeoffs}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-600 rounded-r-xl p-6 mb-6">
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Decision:</div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{project.strategicDecision.decision}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <div className="mb-6">
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Reasoning:</div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{project.strategicDecision.reasoning}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={500}>
              <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6">
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Impact:</div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{project.strategicDecision.impact}</p>
              </div>
            </AnimatedSection>
          </section>
        )}

        {/* 5. ADDITIONAL STRATEGIC DECISIONS */}
        {!quickSummaryMode && project.additionalDecisions && project.additionalDecisions.map((decision, index) => (
          <section key={index} className="layout-content mb-6">
            <AnimatedSection animation="fade-up">
              <h2 className="type-h2 mb-6">{decision.title}</h2>
              <p className="type-body-lg mb-6">{decision.context}</p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-600 rounded-r-xl p-6 mb-6">
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Decision:</div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{decision.decision}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6">
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Impact:</div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{decision.impact}</p>
              </div>
            </AnimatedSection>
          </section>
        ))}

        {/* 6. DESIGN EXECUTION */}
        {!quickSummaryMode && project.designExecution && (
          <section className="layout-content mb-6">
            <AnimatedSection animation="fade-up">
              <h2 className="type-h2 mb-6">Design execution</h2>
            </AnimatedSection>

            <div className="space-y-10">
              {project.designExecution.changes.map((change, index) => (
                <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                  <div>
                    <h3 className="type-h3 mb-4">{change.title}</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4">
                        <div className="type-meta-label text-red-700 dark:text-red-300">Before</div>
                        <div className="text-gray-700 dark:text-gray-200">{change.before}</div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4">
                        <div className="type-meta-label text-green-700 dark:text-green-300">After</div>
                        <div className="text-gray-700 dark:text-gray-200">{change.after}</div>
                      </div>
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">Rationale:</span> {change.rationale}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {project.designExecution.removed.length > 0 && (
              <AnimatedSection animation="fade-up" delay={400}>
                <div className="mt-10 bg-gray-50 dark:bg-[var(--surface)] rounded-xl p-6">
                  <div className="font-semibold text-gray-900 dark:text-gray-100 mb-3">What we removed</div>
                  <ul className="list-flow">
                    {project.designExecution.removed.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-400 dark:text-gray-500 mr-2">×</span>
                        <span className="text-gray-700 dark:text-gray-200">{item}</span>
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
          <section className="layout-content mb-6">
            <AnimatedSection animation="fade-up">
              <div className="media-frame rounded-xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-[var(--surface)]" style={{ height: '600px' }}>
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
          <section className="layout-content mb-6">
            <AnimatedSection animation="fade-up">
              <h2 className="type-h2 mb-6">Outcome and impact</h2>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <div className="mb-6">
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Key metrics:</div>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.outcome.metrics.map((metric, index) => (
                    <div key={index} className="bg-indigo-50 dark:bg-indigo-950/30 rounded-lg p-4">
                      <div className="text-gray-900 dark:text-gray-100 font-medium">{metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="mb-6">
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Validation:</div>
                <ul className="list-flow">
                  {project.outcome.validation.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 dark:text-green-400 mr-2 mt-1">✓</span>
                      <span className="text-gray-700 dark:text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {project.outcome.marketValidation && (
              <AnimatedSection animation="fade-up" delay={300}>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-xl p-8 mb-6">
                  <h3 className="type-h3 mb-4">Market validation</h3>
                  <p className="type-body-lg">{project.outcome.marketValidation}</p>
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection animation="fade-up" delay={400}>
              <div className="bg-gray-50 dark:bg-[var(--surface)] rounded-xl p-6">
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Limitations:</div>
                <p className="text-gray-700 dark:text-gray-200">{project.outcome.limitations}</p>
              </div>
            </AnimatedSection>
          </section>
        )}

        {/* 9. REFLECTION */}
        {project.reflection && (
          <section className="layout-content mb-6">
            <AnimatedSection animation="fade-up">
              <h2 className="type-h2 mb-6">
                {project.reflection.title}
              </h2>
            </AnimatedSection>

            <div className="space-y-6">
              <AnimatedSection animation="fade-up" delay={300}>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-xl p-8">
                  <div className="prose prose-lg max-w-none">
                    {project.reflection.learned.split('\n\n').map((paragraph, i) => {
                      if (paragraph.startsWith('- **')) {
                        return (
                          <ul key={i} className="list-flow mb-6">
                            {paragraph.split('\n').map((line, j) => {
                              const match = line.match(/- \*\*(.*?)\*\*(.*)/)
                              if (match) {
                                return (
                                  <li key={j} className="flex items-start">
                                    <span className="text-indigo-600 mr-2 mt-1">•</span>
                                    <span className="text-gray-700 dark:text-gray-200">
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
                      return <p key={i} className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">{paragraph}</p>
                    })}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        )}

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
    </div>
  )
}

export default StrategicCaseStudy
