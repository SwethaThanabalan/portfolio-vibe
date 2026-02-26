import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import AnimatedSection from '../components/AnimatedSection'

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
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
        {/* 1. HERO SECTION */}
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
              Designing Adult You: Building a Gamified Life Skills Platform from 0 → 1
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-xl text-gray-700 leading-relaxed space-y-6 mb-16">
              <p>Adult You is a gamified learning platform that helps adults build real-world life skills through interactive, game-like modules. I joined as the sole designer during its earliest stage to bring structure, validation, and system thinking to an ambitious 0→1 product. What began as "just start wireframing" evolved into defining the product foundation itself.</p>
            </div>
          </AnimatedSection>

          {/* Summary Block */}
          <AnimatedSection animation="fade-up" delay={150}>
            <div className="flex flex-wrap items-center gap-6  text-sm text-gray-600" style={{ marginBottom: '50px' }}>
              {/* Audio Summary */}
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
                Audio summary
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
                6–8 min read
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
                <ul className="text-base text-gray-700 leading-relaxed space-y-2" style={{ maxWidth: '65ch' }}>
                  <li>• Led 0→1 cross-platform product design as sole designer</li>
                  <li>• Built a scalable design system integrated with Unity</li>
                  <li>• Reduced text-heavy modules into structured interactive flows</li>
                  <li>• Designed and ran testing with 20 participants (75% validation signal)</li>
                  <li>• Established research-backed direction before beta</li>
                </ul>
              </div>
            </div>

            {/* Audio Player (Collapsible) */}
            <div 
              className="overflow-hidden transition-all duration-260"
              style={{ 
                maxHeight: showAudioPlayer ? '300px' : '0',
                opacity: showAudioPlayer ? 1 : 0
              }}
            >
              <div className="border border-gray-200 rounded-lg p-6 " style={{ marginBottom: '50px' }}>
                <audio
                  ref={audioRef}
                  src="/SeptaProjectAudioSummary.mp3"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                />
                
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={togglePlayPause}
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
                    <div 
                      className="h-1 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
                      onClick={handleSeek}
                    >
                      <div 
                        className="h-full bg-indigo-700 transition-all"
                        style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-200">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Role</div>
                <div className="text-gray-900">Product Designer (End-to-End)</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Scope</div>
                <div className="text-gray-900">Research → System Design → Module Design → Testing → Iteration</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Stakeholders</div>
                <div className="text-gray-900">CEO, Unity Developers, Internal Team, Student Test Users</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Focus Areas</div>
                <div className="text-gray-900">Gamification, Instructional UX, Design Systems, Testing Strategy</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Stage</div>
              <div className="text-gray-900">Alpha → Preparing for Beta</div>
            </div>
          </AnimatedSection>
        </section>

        {/* 2. BUSINESS CONTEXT */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Business Context</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>Adult You is a 0→1 gamified learning platform designed to teach adults essential life skills — from filing taxes to understanding home ownership — through interactive modules.</p>
              <p>There was no existing product. No design system. No documentation. No structured UX foundation.</p>
              <p>The CEO had deep experience in educational content but no designer.</p>
              <p>I was brought in to provide a critical lens and transform ideas into a scalable product direction.</p>
              <p className="font-semibold text-gray-900">This wasn't iteration. This was defining the fundamentals.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 3. THE CORE PROBLEM */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Core Problem</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>The biggest ambiguity wasn't visual.</p>
              <p className="font-semibold text-gray-900">It was structural.</p>
              <p>I was initially asked to "just start wireframing" without:</p>
              <ul className="space-y-2 ml-6">
                <li>• Finalized content</li>
                <li>• Defined modules</li>
                <li>• UX principles</li>
                <li>• Component structure</li>
                <li>• Testing plan</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-red-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Without intervention, the product would have:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">×</span>
                  <span>Shipped without system consistency</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">×</span>
                  <span>Remained text-heavy and overwhelming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">×</span>
                  <span>Lacked a structured validation framework</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">×</span>
                  <span>Scaled unpredictably</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6">
              <p className="text-lg text-gray-900">This required ownership beyond screens.</p>
              <p className="text-lg text-gray-900 font-semibold mt-2">It required building the foundation.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 4. DESIGNING UNDER AMBIGUITY */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Designing Under Ambiguity</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>With no documentation to reference, I began by:</p>
            </div>
          </AnimatedSection>

          <div className="mt-8 space-y-6">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Writing sample module content</h3>
                <p className="text-gray-700">Created concrete examples to demonstrate how educational content could be structured and delivered.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Creating card parsers to simulate real interactions</h3>
                <p className="text-gray-700">Built interactive prototypes to show how users would navigate through learning modules.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Building example flows to demonstrate vision</h3>
                <p className="text-gray-700">Translated abstract concepts into tangible user journeys the team could evaluate and iterate on.</p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-8 text-lg text-gray-700 leading-relaxed">
              <p>This helped the team move from abstract discussion to tangible product direction.</p>
              <p className="mt-4 font-semibold text-gray-900">Ambiguity became structured exploration.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 5. AI-ASSISTED EXPLORATION */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Assisted Exploration (Figma Make)</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>During early module confusion — particularly around interaction patterns and call-to-action structure — I used Figma Make to rapidly explore:</p>
              <ul className="space-y-2 ml-6">
                <li>• Button hierarchy</li>
                <li>• Interactive module layouts</li>
                <li>• Gamified learning structures</li>
              </ul>
              <p>AI accelerated visual direction when the team lacked precedent for gamified adult education.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">It helped us:</h3>
              <ul className="space-y-2 text-gray-700">
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
                  <span>Iterate rapidly before committing</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6">
              <p className="text-lg text-gray-900">However, I maintained design judgment. AI outputs were refined, prompted, and evaluated critically before adoption.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 6. BUILDING THE DESIGN SYSTEM */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Building the Design System</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>Given the interactive nature of the modules and Unity integration, I proposed building a custom design system instead of adopting a generic one.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">The system included:</h3>
              <ul className="space-y-2 text-gray-700">
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
            <div className="mt-8 space-y-4 text-lg text-gray-700">
              <p className="font-semibold text-gray-900">This system is currently being used in the Unity alpha build.</p>
              <p>It allowed developers to build in parallel with clarity.</p>
              <p className="font-semibold text-gray-900">This was not aesthetic polish. It was infrastructure.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 7. INSTRUCTIONAL MODULE DESIGN */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Instructional Module Design</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>The modules teach real-world life skills such as:</p>
              <ul className="space-y-2 ml-6">
                <li>• Filing taxes</li>
                <li>• Renting an apartment</li>
                <li>• Understanding home ownership</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
              <h3 className="font-semibold text-gray-900 mb-4">The biggest UX challenge:</h3>
              <p className="text-lg text-gray-700">The CEO's initial vision was text-heavy.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-8">
              <p className="text-lg text-gray-700 mb-4">Through design exploration and testing, I pushed to:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Reduce cognitive load</h4>
                  <p className="text-gray-700">Break down complex information into digestible chunks</p>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Break information into interactive segments</h4>
                  <p className="text-gray-700">Transform passive reading into active engagement</p>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Introduce gamified progression</h4>
                  <p className="text-gray-700">Add motivation through achievement and progress tracking</p>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Structure modules like playable experiences</h4>
                  <p className="text-gray-700">Design learning as an interactive journey, not a document</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300}>
            <div className="mt-8 text-lg text-gray-900 font-semibold">
              <p>This required active pushback and iteration.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 8. TESTING & CEO COLLABORATION */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Testing & CEO Collaboration</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>We ran two testing rounds:</p>
              <ul className="space-y-2 ml-6">
                <li>• Internal team testing</li>
                <li>• 20 college student participants</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 bg-indigo-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Key finding:</h3>
              <p className="text-lg text-gray-900">75% of participants said they would use an app like this.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-8">
              <p className="text-lg text-gray-700 mb-4">More importantly, the sessions surfaced:</p>
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-600 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Concerns around privacy and policy</h4>
                  <p className="text-gray-700">Users wanted clarity on data handling and security</p>
                </div>
                <div className="border-l-4 border-indigo-600 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Feedback about text overload</h4>
                  <p className="text-gray-700">Confirmed the need to reduce text density and increase interactivity</p>
                </div>
                <div className="border-l-4 border-indigo-600 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Questions about interaction clarity</h4>
                  <p className="text-gray-700">Highlighted areas where navigation and actions needed refinement</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300}>
            <div className="mt-8 bg-green-50 rounded-xl p-6">
              <p className="text-lg text-gray-900 font-semibold mb-4">Testing directly influenced direction:</p>
              <p className="text-gray-700">We reduced text and shifted toward interaction-first learning.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-8 text-lg text-gray-700">
              <p>The CEO was highly hands-on, and I frequently challenged design and testing decisions. These discussions strengthened product clarity.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 9. STRATEGIC IMPACT */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Strategic Impact</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>This project:</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Shifted modules from text-heavy to interaction-driven</h3>
                <p className="text-gray-700">Transformed passive content into engaging, playable learning experiences</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Introduced a scalable system integrated with Unity</h3>
                <p className="text-gray-700">Created infrastructure that supports consistent development and future growth</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Established research-backed validation before beta</h3>
                <p className="text-gray-700">Provided evidence-based direction through structured user testing</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Reduced ambiguity in early-stage product decisions</h3>
                <p className="text-gray-700">Brought clarity and structure to undefined product territory</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Strengthened CEO pitch clarity through visual prototypes</h3>
                <p className="text-gray-700">Enabled stakeholder communication with tangible product demonstrations</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
              <p className="text-xl text-gray-900 font-semibold">This was foundation work that shaped the alpha build.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 10. HOW THIS PROJECT ELEVATED MY PRODUCT THINKING */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How This Project Elevated My Product Thinking</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
              <div className="space-y-6 text-lg text-gray-700">
                <p className="text-xl text-gray-900 font-semibold">Adult You forced me into full ownership.</p>
                
                <p>Unlike Talofa, where I joined an existing ecosystem, here I built structure where none existed.</p>
                
                <div className="space-y-4 mt-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">System building before screen design</h3>
                    <p>I learned that defining the foundation—components, patterns, principles—matters more than jumping into high-fidelity mockups.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Prioritizing clarity over speed</h3>
                    <p>Taking time to write sample content and build example flows prevented costly misalignment later.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Navigating ambiguity without a design mentor</h3>
                    <p>As the sole designer, I had to trust my judgment and advocate for structural decisions without external validation.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Pushing back constructively</h3>
                    <p>Challenging the CEO's text-heavy vision required evidence, empathy, and clear alternatives—not just critique.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Creating documentation before execution</h3>
                    <p>Building the design system and UX principles upfront enabled parallel development and reduced confusion.</p>
                  </div>
                </div>
                
                <div className="mt-8 bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                  <p className="text-gray-900 font-semibold mb-2">If I were to start again:</p>
                  <p className="text-gray-700">I would formalize a PRD earlier to align scope before design. This would have reduced early-stage ambiguity and set clearer expectations.</p>
                </div>
                
                <p className="mt-8 text-xl text-gray-900 font-semibold">This project strengthened my ability to define foundations, not just refine features.</p>
              </div>
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

export default AdultYouCaseStudy
