import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import AnimatedSection from '../components/AnimatedSection'
import SEO from '../components/SEO'

const AdultYouCaseStudy = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showAudioPlayer, setShowAudioPlayer] = useState(false)
  const [showQuickSummary, setShowQuickSummary] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

  const handleSeekKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return
    const step = 5
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
        title="Adult You | Gamified Learning Product Design Case Study | Swetha Thanabalan"
        description="End-to-end product design for a 0-to-1 gamified life skills platform. Design systems, prototyping, usability testing, and cross-functional collaboration with Unity developers."
        path="/project/adult-you-platform"
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "Adult You: Gamified Life Skills Platform",
          "description": "0-to-1 product design for gamified life skills platform teaching adults essential real-world skills.",
          "author": { "@type": "Person", "name": "Swetha Thanabalan" },
          "keywords": "End-to-End Product Design, Design Systems, Prototyping, Usability Testing, Cross-Functional Collaboration, Gamification"
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
              Designing Adult You: a gamified life skills platform, from 0 to 1
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="type-lead text-flow mb-16">
              <p>Adult You is a gamified learning platform that helps adults build real-world life skills through interactive, game-like modules. I joined as the sole designer at its earliest stage. The brief was "just start wireframing," and the work grew into defining the product's foundation: its structure, design system, and how we tested it.</p>
            </div>
          </AnimatedSection>

          {/* Summary Block */}
          <AnimatedSection animation="fade-up" delay={150}>
            <div className="flex flex-wrap items-center gap-6 type-body-sm mb-6">
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
                6–8 min read
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
                <ul className="type-body list-flow">
                  <li>• Led 0→1 cross-platform product design as sole designer</li>
                  <li>• Built a scalable design system integrated with Unity</li>
                  <li>• Turned text-heavy modules into structured interactive flows</li>
                  <li>• Designed and ran testing with 20 participants (75% said they would use it)</li>
                  <li>• Established research-backed direction before beta</li>
                </ul>
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
                maxHeight: showAudioPlayer ? '300px' : '0',
                opacity: showAudioPlayer ? 1 : 0,
                visibility: showAudioPlayer ? 'visible' : 'hidden'
              }}
            >
              <div className="border border-gray-200 dark:border-[var(--border)] rounded-subtle p-6 mb-6">
                <audio
                  ref={audioRef}
                  src="/SeptaProjectAudioSummary.mp3"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  aria-label="Case study audio summary"
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
              </div>
            </div>
          </AnimatedSection>

          {/* Metadata */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-200 dark:border-[var(--border)]">
              <div>
                <div className="type-meta-label">Role</div>
                <div className="text-gray-900 dark:text-gray-100">Product Designer (End-to-End)</div>
              </div>
              <div>
                <div className="type-meta-label">Scope</div>
                <div className="text-gray-900 dark:text-gray-100">Research → system design → module design → testing → iteration</div>
              </div>
              <div>
                <div className="type-meta-label">Stakeholders</div>
                <div className="text-gray-900 dark:text-gray-100">CEO, Unity Developers, Internal Team, Student Test Users</div>
              </div>
              <div>
                <div className="type-meta-label">Focus Areas</div>
                <div className="text-gray-900 dark:text-gray-100">Gamification, Instructional UX, Design Systems, Testing Strategy</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-[var(--border)]">
              <div className="type-meta-label">Stage</div>
              <div className="text-gray-900 dark:text-gray-100">Alpha, preparing for beta</div>
            </div>
          </AnimatedSection>
        </section>

        {/* 2. BUSINESS CONTEXT */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Business context</h2>
            <div className="type-body-lg text-flow">
              <p>Adult You is a new gamified learning platform that teaches adults life skills such as filing taxes and understanding home ownership through interactive modules.</p>
              <p>When I joined there was no product, design system, documentation, or UX foundation. The CEO had deep experience in educational content but no designer.</p>
              <p>I was brought in to question the ideas on the table and turn them into a product direction that could grow.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 3. THE CORE PROBLEM */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Problem framing</h2>
            <div className="type-body-lg text-flow">
              <p>The biggest open questions were about structure rather than visuals. I was initially asked to "just start wireframing" without:</p>
              <ul className="list-flow ml-6">
                <li>• Finalized content</li>
                <li>• Defined modules</li>
                <li>• UX principles</li>
                <li>• Component structure</li>
                <li>• Testing plan</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-red-50 dark:bg-red-950/30 rounded-subtle p-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Risks if we had gone straight to wireframes</h3>
              <ul className="list-flow text-gray-700 dark:text-gray-200">
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">×</span>
                  <span>Shipped without system consistency</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">×</span>
                  <span>Remained text-heavy and overwhelming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">×</span>
                  <span>Lacked a structured validation framework</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">×</span>
                  <span>Scaled unpredictably</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-8 bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-600 rounded-r-xl p-6">
              <p className="type-body-lg font-semibold text-[var(--text)]">So the job went beyond screens: the product needed a foundation first.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 4. DESIGNING UNDER AMBIGUITY */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Product discovery</h2>
            <div className="type-body-lg text-flow">
              <p>With no documentation to work from, I started by:</p>
            </div>
          </AnimatedSection>

          <div className="mt-8 space-y-6">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="type-h3 mb-2">Writing sample module content</h3>
                <p className="text-gray-700 dark:text-gray-200">Created concrete examples to demonstrate how educational content could be structured and delivered.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="type-h3 mb-2">Creating card parsers to simulate real interactions</h3>
                <p className="text-gray-700 dark:text-gray-200">Built interactive prototypes to show how users would navigate through learning modules.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="type-h3 mb-2">Building example flows to demonstrate vision</h3>
                <p className="text-gray-700 dark:text-gray-200">Turned abstract ideas into user journeys the team could review and refine.</p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-8 type-body-lg">
              <p>This moved the team from abstract discussion to a concrete product direction.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 5. AI-ASSISTED EXPLORATION */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">AI-assisted design exploration</h2>
            <div className="type-body-lg text-flow">
              <p>Early on, when the team was unsure about interaction patterns and call-to-action structure in the modules, I used Figma Make to quickly explore:</p>
              <ul className="list-flow ml-6">
                <li>• Button hierarchy</li>
                <li>• Interactive module layouts</li>
                <li>• Gamified learning structures</li>
              </ul>
              <p>It sped up visual direction at a point when the team had no examples of gamified adult education to work from.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-gray-50 dark:bg-[var(--surface)] rounded-subtle p-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">It helped us</h3>
              <ul className="list-flow text-gray-700 dark:text-gray-200">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>See possibilities quickly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Align on direction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Iterate quickly before committing</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-8 bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-600 rounded-r-xl p-6">
              <p className="type-body-lg text-[var(--text)]">I reviewed and refined every AI output before we used it.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 6. BUILDING THE DESIGN SYSTEM */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Design system</h2>
            <div className="type-body-lg text-flow">
              <p>Given the interactive nature of the modules and Unity integration, I proposed building a custom design system instead of adopting a generic one.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-gray-50 dark:bg-[var(--surface)] rounded-subtle p-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">The system included:</h3>
              <ul className="list-flow text-gray-700 dark:text-gray-200">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Reusable components</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Interactive buttons</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Gamified image states</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Structural module patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>UX principles documentation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Branding direction within Figma</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-8 text-flow type-body-lg">
              <p className="font-semibold text-gray-900 dark:text-gray-100">This system is currently being used in the Unity alpha build.</p>
              <p>It let developers build in parallel with a clear reference.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 7. INSTRUCTIONAL MODULE DESIGN */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Instructional module design</h2>
            <div className="type-body-lg text-flow">
              <p>The modules teach real-world life skills such as:</p>
              <ul className="list-flow ml-6">
                <li>• Filing taxes</li>
                <li>• Renting an apartment</li>
                <li>• Understanding home ownership</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-yellow-50 dark:bg-yellow-950/30 rounded-subtle p-6 border-l-4 border-yellow-500 dark:border-yellow-600">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">The biggest UX challenge</h3>
              <p className="type-body-lg">The CEO's initial vision was text-heavy.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-8">
              <p className="type-body-lg mb-4">Through design exploration and testing, I pushed to:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-950/30 rounded-subtle p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Reduce cognitive load</h4>
                  <p className="text-gray-700 dark:text-gray-200">Break complex information into smaller pieces</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/30 rounded-subtle p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Break information into interactive segments</h4>
                  <p className="text-gray-700 dark:text-gray-200">Have users do something instead of only reading</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/30 rounded-subtle p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Introduce gamified progression</h4>
                  <p className="text-gray-700 dark:text-gray-200">Add motivation through achievement and progress tracking</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/30 rounded-subtle p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Structure modules like playable experiences</h4>
                  <p className="text-gray-700 dark:text-gray-200">Design each module as something to play through rather than read</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300}>
            <div className="mt-8 type-body-lg font-semibold text-[var(--text)]">
              <p>Getting there took a lot of pushback and iteration.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 8. INTERACTIVE PROTOTYPE */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Interactive Prototype</h2>
            <div className="type-body-lg text-flow">
              <p>I built a working prototype of the module interaction model that simulates the core flow.</p>
              <p>Try it below to see how users move through modules, interact with content, and get feedback.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="media-frame mt-8 w-full">
              <div className="relative aspect-video w-full rounded-subtle overflow-hidden shadow-lg border border-gray-200 dark:border-[var(--border)]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://embed.figma.com/proto/RyfAu7aSShQ8trzu60ALNq/Adult-you?node-id=1893-1491&page-id=1%3A3&starting-point-node-id=1893%3A1491&scaling=scale-down&content-scaling=fixed&embed-host=share"
                  allowFullScreen
                  title="Adult You Interactive Prototype"
                />
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 9. TESTING & CEO COLLABORATION */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Testing and working with the CEO</h2>
            <div className="type-body-lg text-flow">
              <p>We ran testing in two rounds:</p>
              <ul className="list-flow ml-6">
                <li>• Internal team testing</li>
                <li>• 20 college student participants</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-indigo-50 dark:bg-indigo-950/30 rounded-subtle p-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Key finding</h3>
              <p className="type-body-lg text-[var(--text)]">75% of participants said they would use an app like this.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-8">
              <p className="type-body-lg mb-4">The sessions also surfaced:</p>
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-600 pl-6">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Concerns around privacy and policy</h4>
                  <p className="text-gray-700 dark:text-gray-200">Users wanted clarity on data handling and security</p>
                </div>
                <div className="border-l-4 border-indigo-600 pl-6">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Feedback about text overload</h4>
                  <p className="text-gray-700 dark:text-gray-200">Confirmed the need to reduce text density and increase interactivity</p>
                </div>
                <div className="border-l-4 border-indigo-600 pl-6">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Questions about interaction clarity</h4>
                  <p className="text-gray-700 dark:text-gray-200">Highlighted areas where navigation and actions needed refinement</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300}>
            <div className="mt-8 bg-green-50 dark:bg-green-950/30 rounded-subtle p-6">
              <p className="type-body-lg font-semibold text-[var(--text)] mb-4">What changed after testing</p>
              <p className="text-gray-700 dark:text-gray-200">We reduced text and shifted toward interaction-first learning.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-8 type-body-lg">
              <p>The CEO was very hands-on, and I often challenged design and testing decisions. Those discussions made the product clearer.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 10. STRATEGIC IMPACT */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Impact</h2>
            <div className="type-body-lg text-flow">
              <p>What this work changed:</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-subtle p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Shifted modules from text-heavy to interaction-driven</h3>
                <p className="text-gray-700 dark:text-gray-200">Turned reading-based content into modules users play through</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-subtle p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Introduced a scalable system integrated with Unity</h3>
                <p className="text-gray-700 dark:text-gray-200">Gave developers a consistent system to build with as the product grows</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-subtle p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Established research-backed validation before beta</h3>
                <p className="text-gray-700 dark:text-gray-200">Grounded product direction in structured user testing</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-subtle p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Reduced ambiguity in early-stage product decisions</h3>
                <p className="text-gray-700 dark:text-gray-200">Gave structure to decisions that had no clear owner or process</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-subtle p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Made the CEO's pitch clearer with visual prototypes</h3>
                <p className="text-gray-700 dark:text-gray-200">Gave stakeholders something concrete to react to</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-subtle p-8">
              <p className="type-h3 text-[var(--text)]">This foundation work shaped the alpha build.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 11. HOW THIS PROJECT ELEVATED MY PRODUCT THINKING */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">What I learned</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-subtle p-8">
              <div className="text-flow type-body-lg">
                <p className="type-h3 text-[var(--text)]">On Adult You, I owned the whole product.</p>
                
                <p>At Talofa I joined an existing product. Here I had to build the structure from scratch.</p>
                
                <div className="space-y-4 mt-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">System building before screen design</h3>
                    <p>Defining components, patterns, and principles first mattered more than jumping into high-fidelity mockups.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Prioritizing clarity over speed</h3>
                    <p>Writing sample content and building example flows early kept the team aligned later.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Navigating ambiguity without a design mentor</h3>
                    <p>As the only designer, I had to trust my own judgment and argue for structural decisions without anyone to check them with.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Pushing back constructively</h3>
                    <p>Challenging the CEO's text-heavy vision took evidence and clear alternatives, not only critique.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Creating documentation before execution</h3>
                    <p>Building the design system and UX principles up front let development run in parallel with less confusion.</p>
                  </div>
                </div>
                
                <div className="mt-8 bg-yellow-50 dark:bg-yellow-950/30 rounded-subtle p-6 border-l-4 border-yellow-500 dark:border-yellow-600">
                  <p className="text-gray-900 dark:text-gray-100 font-semibold mb-2">If I started again</p>
                  <p className="text-gray-700 dark:text-gray-200">I would write a PRD earlier to agree on scope before design, which would have cleared up early questions and set clearer expectations.</p>
                </div>
                
                <p className="mt-8 type-h3 text-[var(--text)]">This project taught me to define a product's foundations, beyond refining features.</p>
              </div>
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
    </div>
  )
}

export default AdultYouCaseStudy
