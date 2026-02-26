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
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-12 transition-colors group">
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to projects
            </Link>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-12 leading-tight">
              Monster Walk Reengagement Strategy
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-xl text-gray-700 leading-relaxed space-y-6 mb-16">
              <p>Talofa Games builds a fitness-driven gaming ecosystem where real-world movement powers immersive progression. Monster Walk turns daily steps into character growth, while Running Legend expands the experience through distance-based challenges. I joined during beta to address a retention drop among lapsed users. What began as a Welcome Back redesign evolved into a behavioral re-entry strategy grounded in motivation psychology and product judgment.</p>
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
              <p>Talofa Games built Monster Walk to gamify walking through character progression and challenges.</p>
              <p>Initial engagement was strong. Retention dropped sharply after a lapse of 7+ days.</p>
              <p>The Welcome Back experience became a strategic retention lever.</p>
              <p>This was not a UI refresh. It was a behavioral re-entry problem.</p>
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
                <p className="text-gray-700">Returning users are in a different emotional state than active users. They need reassurance, not challenge.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Clarity Gap</h3>
                <p className="text-gray-700">Users didn't understand what they were returning to or why it mattered.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Motivation Gap</h3>
                <p className="text-gray-700">The experience didn't address the emotional hesitation that comes with returning after a break.</p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6">
              <p className="text-lg text-gray-900 font-semibold">Insight: This was a behavioral problem disguised as a screen redesign.</p>
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
                <p className="text-gray-700">Spoke with the founder, coaches, and gaming advisors to understand business goals and technical constraints.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Power User Conversations</h3>
                <p className="text-gray-700">Interviewed active users who had lapsed and returned to understand their emotional journey and what brought them back.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gaming Psychology Input</h3>
                <p className="text-gray-700">Consulted with gaming psychology experts to understand motivation mechanics and re-engagement patterns.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitive Analysis</h3>
                <p className="text-gray-700">Analyzed how other fitness and gaming apps handle lapsed user re-engagement.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={500}>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Emotional Barrier Analysis</h3>
                <p className="text-gray-700">Identified hesitation and uncertainty as the primary friction points preventing users from re-engaging.</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 5. CONCEPTS WE TESTED */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Concepts We Tested</h2>
          </AnimatedSection>

          <div className="space-y-12">
            <AnimatedSection animation="fade-up" delay={100}>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Daily Streak</h3>
                <p className="text-lg text-gray-700 mb-6">Focus: Habit continuity and milestone reinforcement</p>
                <div className="bg-gray-100 rounded-xl p-8 text-center">
                  <p className="text-gray-500 italic">[Concept visualization would appear here]</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Squad Leader Greeting</h3>
                <p className="text-lg text-gray-700 mb-6">Focus: Social reinforcement and belonging</p>
                <div className="bg-gray-100 rounded-xl p-8 text-center">
                  <p className="text-gray-500 italic">[Concept visualization would appear here]</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mystery Monster</h3>
                <p className="text-lg text-gray-700 mb-6">Focus: Curiosity and progression</p>
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
                <p>Initially, I proposed A/B testing the three concepts to let the data decide.</p>
                
                <p>But I recognized the risk: with limited traffic and a 3-month window, A/B testing would measure preference, not motivation. We'd get numbers, but we wouldn't understand why users chose what they chose.</p>
                
                <p>I advocated for concept testing instead—moderated sessions where we could observe emotional reactions, ask follow-up questions, and understand the reasoning behind user choices.</p>
                
                <p>I presented the trade-off to the founder:</p>
                
                <ul className="space-y-2 ml-6">
                  <li>• A/B testing = numerical comfort, shallow insights</li>
                  <li>• Concept testing = diagnostic depth, strategic clarity</li>
                </ul>
                
                <p className="font-semibold text-gray-900 mt-6">We chose diagnostic depth over numerical comfort.</p>
                
                <p className="italic">This was the defining strategic moment of the project.</p>
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
              <p>We conducted moderated concept testing with lapsed users, observing their emotional responses and asking them to think aloud as they interacted with each concept.</p>
              
              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h3 className="font-semibold text-gray-900 mb-4">What we learned:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Users responded most positively to concepts that acknowledged their absence without judgment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Emotional reassurance mattered more than feature highlights</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Users wanted to know their progress was preserved and meaningful</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>The Mystery Monster concept generated the most curiosity and reduced hesitation</span>
                  </li>
                </ul>
              </div>
              
              <p>No fabricated scoring. Just patterns, observations, and strategic reasoning.</p>
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
              <p>Based on testing insights, we evolved the selected concept from functional clarity to emotional reassurance.</p>
              
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

        {/* 9. LAUNCH & REAL-WORLD IMPACT */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Launch & Real-World Impact</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="space-y-6 text-lg text-gray-700">
              <p>Two months after the internship concluded, Monster Walk officially launched.</p>
              
              <p>Several of our strategic recommendations were reflected in the live product, including:</p>
              
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
                <p className="font-semibold text-gray-900">This work contributed to:</p>
                <ul className="mt-4 space-y-2">
                  <li>• Influence on shipped product features</li>
                  <li>• Contribution to beta insights shaping launch strategy</li>
                  <li>• Validation of behavioral design direction</li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 10. STRATEGIC IMPACT */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Strategic Impact</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="space-y-6 text-lg text-gray-700">
              <p>This was a pre-launch project. Impact is framed as strategic contribution, not post-launch metrics.</p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Validated motivational hierarchy</h3>
                  <p className="text-gray-700">Confirmed that emotional reassurance matters more than feature highlights for lapsed users.</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Reduced decision risk</h3>
                  <p className="text-gray-700">Provided diagnostic insights that informed launch strategy with confidence.</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Increased stakeholder confidence</h3>
                  <p className="text-gray-700">Demonstrated strategic thinking and methodology judgment that influenced product direction.</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Delivered defensible retention strategy</h3>
                  <p className="text-gray-700">Created a behavioral framework grounded in research, not assumptions.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 11. HOW THIS PROJECT ELEVATED MY PRODUCT THINKING */}
        <section className="max-w-4xl mx-auto px-6 " style={{ marginBottom: '50px' }}>
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How This Project Elevated My Product Thinking</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
              <div className="space-y-6 text-lg text-gray-700">
                <p>This project taught me that strategic design isn't about following a rigid process—it's about making defensible bets under uncertainty.</p>
                
                <div className="space-y-4 mt-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Methodology judgment over rigid process</h3>
                    <p>Recognizing when to pivot from A/B testing to concept testing showed me that choosing the right method matters more than following a playbook.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Stakeholder framing as design work</h3>
                    <p>Presenting trade-offs clearly to the founder wasn't just communication—it was strategic design. Helping stakeholders make informed decisions is part of the craft.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Comfort with ambiguity</h3>
                    <p>Working in beta meant accepting that we wouldn't have perfect data. I learned to make confident recommendations based on patterns, not just numbers.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Defending strategic pivots</h3>
                    <p>Advocating for concept testing over A/B testing required conviction. I learned to articulate why diagnostic depth matters more than numerical comfort.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Transition from executor to product thinker</h3>
                    <p>This project shifted my mindset from "what should this screen look like?" to "what problem are we really solving, and how do we validate our approach?"</p>
                  </div>
                </div>
                
                <p className="mt-8 font-semibold text-gray-900 text-xl">Strategic design is about asking the right questions, making defensible bets, and adapting quickly.</p>
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

export default TalofaCaseStudy
