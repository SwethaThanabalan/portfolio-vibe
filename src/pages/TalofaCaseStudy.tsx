import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import AnimatedSection from '../components/AnimatedSection'

const TalofaCaseStudy = () => {
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
            <Link to="/#work" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-12 transition-colors group">
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to projects
            </Link>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-12 leading-tight">
              Monster Walk: Redesigning the emotional re-entry experience
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-xl text-gray-700 leading-relaxed space-y-6 mb-16">
              <p>Monster Walk was losing users after 7 days of inactivity, and the return experience wasn't built for the emotional state of someone who'd lapsed. I joined during beta to fix it. What started as a screen redesign became a full behavioral re-entry strategy. Four of my recommendations shipped in the live product.</p>
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
                  <li>• Identified retention breakdown in lapsed users</li>
                  <li>• Diagnosed emotional hesitation as primary barrier</li>
                  <li>• Explored three motivational re-entry concepts</li>
                  <li>• Pivoted from A/B testing to concept testing</li>
                  <li>• Influenced features in the launched product</li>
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
                <div className="text-gray-900">Product Designer (Research → Strategy → Testing)</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Timeline</div>
                <div className="text-gray-900">3 Months</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Stakeholders</div>
                <div className="text-gray-900">Founder, Coaches, Power Users, Gaming Advisor</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Focus Areas</div>
                <div className="text-gray-900">Retention, Behavioral Motivation, Testing Strategy</div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 2. BUSINESS CONTEXT */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Business Context</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>Talofa Games built Monster Walk to gamify walking. Real steps power character growth, quests, and progression. Early engagement was strong. But when users lapsed for 7+ days, they weren't coming back.</p>
              <p>The Welcome Back screen was the only re-entry point. It wasn't designed for someone who felt guilty, uncertain, or afraid their progress was gone. That's where I started.</p>
              <p>During this time, the official Monster Walk trailer was released publicly while we were actively working on the beta product.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 rounded-xl overflow-hidden shadow-2xl bg-gray-100" style={{ height: '400px' }}>
              <iframe
                src="https://www.youtube.com/embed/pJc8rHhbcgk"
                allowFullScreen
                className="w-full h-full"
                title="Monster Walk Trailer"
              />
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">This work occurred during the beta phase prior to launch.</p>
          </AnimatedSection>
        </section>

        {/* 3. THE CORE PROBLEM */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Core Problem</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Retention Gap</h3>
                <p className="text-gray-700">Users who lapsed 7+ days had a fundamentally different emotional state. Pushing them into challenges the moment they returned made it worse, not better.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Clarity Gap</h3>
                <p className="text-gray-700">Users couldn't remember where they left off or why it mattered to pick up again. The product offered no answer.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Motivation Gap</h3>
                <p className="text-gray-700">No concept addressed guilt or hesitation, the two emotions every lapsed user described in research. The experience assumed motivation existed. It didn't.</p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6">
              <p className="text-lg text-gray-900 font-semibold">Insight: Lapsed users weren't disengaged. They were hesitant. The barrier wasn't the product. It was the emotion of returning.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 4. RESEARCH & DISCOVERY */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Research & Discovery</h2>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stakeholder Interviews</h3>
                <p className="text-gray-700">I ran stakeholder interviews with the founder, coaches, and gaming advisors to align on business goals and technical constraints before touching any design work.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Power User Conversations</h3>
                <p className="text-gray-700">I interviewed users who had lapsed and returned, specifically asking about the moment they decided to come back. Every single one mentioned fearing their progress was gone. None of them had checked. The fear was irrational, but it was real and it was the barrier.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gaming Psychology Input</h3>
                <p className="text-gray-700">I consulted gaming psychology experts on re-engagement patterns. Key finding: returning users need to feel welcomed, not evaluated. The first moment back should reduce cognitive load, not increase it.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitive Analysis</h3>
                <p className="text-gray-700">I audited how Duolingo, Pokémon GO, and Habitica handle lapsed user return flows. All three prioritize progress preservation messaging over feature highlights, a pattern that directly informed our direction.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={500}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Emotional Barrier Analysis</h3>
                <p className="text-gray-700">Across all research sessions, two emotions surfaced consistently: hesitation (am I behind?) and uncertainty (does my progress still matter?). These became the design brief.</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 5. CONCEPTS WE TESTED */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Three re-entry concepts I designed and tested</h2>
          </AnimatedSection>

          <div className="space-y-12">
            <AnimatedSection animation="fade-up" delay={100}>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Daily Streak</h3>
                <p className="text-lg text-gray-700 mb-6">Hypothesis: Reminding users of their streak history would reactivate the habit loop and lower the barrier to return. Designed around milestone celebration rather than gap punishment.</p>
                <div className="bg-gray-100 rounded-xl p-8 text-center">
                  <p className="text-gray-500 italic">[Concept visualization would appear here]</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Squad Leader Greeting</h3>
                <p className="text-lg text-gray-700 mb-6">Hypothesis: A personal message from a Squad Leader (social accountability partner) would trigger belonging and reduce isolation. Designed to make returning feel like rejoining a team, not restarting alone.</p>
                <div className="bg-gray-100 rounded-xl p-8 text-center">
                  <p className="text-gray-500 italic">[Concept visualization would appear here]</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mystery Monster</h3>
                <p className="text-lg text-gray-700 mb-6">Hypothesis: Curiosity is a stronger motivator than guilt. Teasing a new monster encounter waiting for the user would pull them forward rather than push them back. This concept performed strongest in testing.</p>
                <div className="bg-gray-100 rounded-xl p-8 text-center">
                  <p className="text-gray-500 italic">[Concept visualization would appear here]</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 6. THE PIVOT */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 border-l-4 border-yellow-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Pivot: Choosing Signal Over Comfort</h2>
              
              <div className="space-y-6 text-lg text-gray-700">
                <p>My first instinct was to A/B test all three concepts. But I caught myself. With limited beta traffic and a 3-month window, A/B testing would only measure which concept users clicked. It wouldn't tell us why they felt ready to return. We'd optimize for the wrong signal.</p>
                
                <p>I told the founder A/B testing was the wrong call for this problem. Here's how I made the case:</p>
                
                <p>I advocated for concept testing instead—moderated sessions where we could observe emotional reactions, ask follow-up questions, and understand the reasoning behind user choices.</p>
                
                <p>I presented the trade-off to the founder:</p>
                
                <ul className="space-y-2 ml-6">
                  <li>• A/B testing → measures clicks, not emotional readiness. Comfortable data. Wrong question.</li>
                  <li>• Concept testing → moderated sessions where we observe emotional reactions in real time. Slower. Far more useful.</li>
                </ul>
                
                <p className="font-semibold text-gray-900 mt-6">He agreed. We ran concept testing.</p>
                
                <p className="italic">This decision shaped everything that followed, and it was the moment I stopped being an executor and started being a product thinker.</p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 7. TESTING & LEARNING */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Testing & Learning</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="space-y-6 text-lg text-gray-700">
              <p>I ran moderated concept testing sessions with lapsed users, observing their emotional responses, listening for hesitation, and asking follow-up questions about the reasoning behind their reactions. Here's what the research showed:</p>
              
              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h3 className="font-semibold text-gray-900 mb-4">What we learned:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Concepts that acknowledged the absence without judgment landed every time. Concepts that ignored it felt hollow.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Emotional reassurance outperformed feature highlights in every session. Users didn't want to know what was new. They wanted to know their progress was safe.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Progress preservation was the single most important message. Every participant mentioned it unprompted.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>The Mystery Monster concept, curiosity over guilt, consistently reduced hesitation the fastest. It became the direction.</span>
                  </li>
                </ul>
              </div>
              
              <p>No fabricated scoring. This was qualitative research. The patterns were clear enough to make a confident recommendation without pretending the data was quantitative.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 8. ITERATION */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Iteration</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="space-y-6 text-lg text-gray-700">
              <p>Based on what I heard in testing, I evolved the Mystery Monster concept away from functional clarity toward emotional reassurance. The copy shift was small. The strategic shift was significant.</p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-red-50 rounded-lg p-6">
                  <div className="text-sm font-semibold text-red-700 mb-3">Before</div>
                  <p className="text-gray-700">"You haven't logged in for 7 days. Start a new challenge."</p>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="text-sm font-semibold text-green-700 mb-3">After</div>
                  <p className="text-gray-700">"Welcome back. Your progress is still here. Ready to meet your next monster?"</p>
                </div>
              </div>
              
              <p>The shift was subtle but critical: from pushing action to offering reassurance.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 9. INTERACTIVE PROTOTYPE */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Interactive Prototype</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>To demonstrate the redesigned Monster Walk gameplay and retention mechanics, I built an interactive prototype that simulates the core player flow and progression loop.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mt-8 w-full">
              <div className="relative w-full rounded-lg overflow-hidden shadow-lg border border-gray-200" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F8tgWUX07X8n5GsiZauji9b%2FMonster-Walk-Hand-off---Swetha%3Fnode-id%3D7-6266%26t%3DOMRrHCZ6XR6pLSbr-0%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1%26starting-point-node-id%3D7%253A6266%26show-proto-sidebar%3D1"
                  allowFullScreen
                  title="Monster Walk Interactive Prototype"
                />
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://www.figma.com/proto/8tgWUX07X8n5GsiZauji9b/Monster-Walk-Hand-off---Swetha?node-id=7-6266&t=OMRrHCZ6XR6pLSbr-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=7%3A6266&show-proto-sidebar=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Open in Figma
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 10. LAUNCH & REAL-WORLD IMPACT */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Launch & Real-World Impact</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="space-y-6 text-lg text-gray-700">
              <p>Two months after my internship ended, Monster Walk officially launched. I wasn't in the room, but four of my design recommendations were:</p>
              
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Monster interaction moments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Encouraging return messaging</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Daily quests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Daily rewards</span>
                </li>
              </ul>
              
              <div className="bg-indigo-50 rounded-xl p-6 mt-8">
                <p className="font-semibold text-gray-900">In a 3-month beta internship with no post-launch access and no live metrics, I built the behavioral framework that shaped how Monster Walk welcomes users back. The research, the pivot, and the concepts, all of it fed directly into what shipped.</p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 11. STRATEGIC IMPACT */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Strategic Impact</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="space-y-6 text-lg text-gray-700">
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Validated motivational hierarchy</h3>
                  <p className="text-gray-700">Research across multiple sessions confirmed the same hierarchy every time: reassurance first, then progress, then new features. This ordered the entire design direction.</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Reduced decision risk</h3>
                  <p className="text-gray-700">Concept testing gave the founder confidence to ship the Mystery Monster direction without second-guessing. Diagnostic clarity beats numerical comfort when the sample size is small.</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Increased stakeholder confidence</h3>
                  <p className="text-gray-700">I presented a clear trade-off framework to the founder and got buy-in in a single meeting. Helping stakeholders make informed decisions is part of the design craft.</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Delivered defensible retention strategy</h3>
                  <p className="text-gray-700">Every recommendation I made was traceable back to something a user said or felt. No assumptions dressed up as insights.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 12. HOW THIS PROJECT ELEVATED MY PRODUCT THINKING */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How This Project Elevated My Product Thinking</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
              <div className="space-y-6 text-lg text-gray-700">
                <p>Working in beta without clean data forced me to make confident recommendations from patterns, not proof. That's harder than it sounds, and more valuable than most portfolio projects show. The moment I told the founder that A/B testing was the wrong method for this problem, I stopped being a designer who executes and became one who thinks. That shift is what I'm bringing to every project from here.</p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Back to projects */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="border-t border-gray-200 pt-12">
            <Link 
              to="/#work"
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

export default TalofaCaseStudy
