import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import AnimatedSection from '../components/AnimatedSection'
import SEO from '../components/SEO'

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
        title="Monster Walk | Mobile Game Product Design Case Study | Swetha Thanabalan"
        description="Product design case study: behavioral re-entry strategy for a fitness gaming app. User research, concept testing, interaction design, and retention strategy."
        path="/project/talofa-games-retention"
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "Monster Walk Reengagement Strategy",
          "description": "Behavioral re-entry strategy for fitness gaming app to address retention drop among lapsed users.",
          "author": { "@type": "Person", "name": "Swetha Thanabalan" },
          "keywords": "Product Design, User Research, A/B Testing, Interaction Design, Prototyping, Mobile UX, Concept Testing"
        }}
      />

      <Navbar />
      <main id="main-content" className="pt-32 pb-32">
        {/* 1. HERO SECTION */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-in">
            <Link to="/#work" className="inline-flex items-center text-[var(--muted)] hover:text-gray-900 dark:hover:text-gray-100 mb-12 transition-colors group">
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to projects
            </Link>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up">
            <h1 className="type-h1 mb-8 leading-tight">
              Monster Walk: Redesigning the emotional re-entry experience
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="type-lead text-flow mb-16">
              <p>Monster Walk was losing users after 7 days of inactivity, and the return experience wasn't built for the emotional state of someone who'd lapsed. I joined during beta to fix it. The work grew from a screen redesign into a strategy for how lapsed players return. Four of my recommendations shipped in the live product.</p>
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
              <div className="border border-[var(--border)] p-6 mb-6">
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
                    <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-8 border-t border-[var(--border)]">
              <div>
                <p className="type-meta-label">Role</p>
                <p className="type-meta">Product Designer (Research → Strategy → Testing)</p>
              </div>
              <div>
                <p className="type-meta-label">Timeline</p>
                <p className="type-meta">3 Months</p>
              </div>
              <div>
                <p className="type-meta-label">Stakeholders</p>
                <p className="type-meta">Founder, Coaches, Power Users, Gaming Advisor</p>
              </div>
              <div>
                <p className="type-meta-label">Outcome</p>
                <p className="type-meta">4 recommendations shipped in live product. Advocated for concept testing over A/B testing.</p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 2. BUSINESS CONTEXT */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Business Context</h2>
            <div className="type-body-lg text-flow">
              <p>Talofa Games built Monster Walk to gamify walking. Real steps power character growth, quests, and progression. Early engagement was strong, but users who lapsed for 7+ days weren't coming back.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={50}>
            <div className="mt-8 border-l-4 pl-5 py-4" style={{ borderLeftColor: 'var(--accent)', backgroundColor: 'var(--surface)' }}>
              <p className="type-meta-label mb-2">The Welcome Back screen</p>
              <p className="type-body">The Welcome Back screen was the only re-entry point. It wasn't designed for someone who felt guilty or worried their progress was gone, so I started there.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <p className="type-body-lg mt-8">During this time, the official Monster Walk trailer was released publicly while we were actively working on the beta product.</p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="media-frame relative aspect-video w-full mt-8 rounded-subtle overflow-hidden border border-gray-200 dark:border-[var(--border)] shadow-sm">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/pJc8rHhbcgk"
                title="Monster Walk Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="type-body-sm mt-4 italic">This work happened during the beta, before launch.</p>
          </AnimatedSection>
        </section>

        {/* 3. THE CORE PROBLEM */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-8">Problem framing</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="border-l-4 pl-5 py-3 h-full" style={{ borderLeftColor: '#c9a96e' }}>
                <h3 className="type-h3 mb-3">Retention gap</h3>
                <p className="text-[var(--text-secondary)]">Users who lapsed for 7+ days came back in a different emotional state, and pushing them into challenges the moment they returned made that worse.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="border-l-4 pl-5 py-3 h-full" style={{ borderLeftColor: '#6b8cc9' }}>
                <h3 className="type-h3 mb-3">Clarity gap</h3>
                <p className="text-[var(--text-secondary)]">Users couldn't remember where they left off or why it mattered to pick up again, and the product didn't tell them.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="border-l-4 pl-5 py-3 h-full" style={{ borderLeftColor: 'var(--accent)' }}>
                <h3 className="type-h3 mb-3">Motivation gap</h3>
                <p className="text-[var(--text-secondary)]">Nothing in the experience addressed guilt or hesitation, the two emotions every lapsed user described in research. It assumed users were already motivated.</p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-8 border-l-4 border-indigo-600 pl-5 py-4">
              <p className="type-body-lg font-semibold text-[var(--text)]">Insight: lapsed users were hesitant to come back, and the hesitation was about how returning felt rather than about the product.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* CURRENT APP AUDIT */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-4">Current app audit</h2>
            <p className="type-body-lg mb-6">Before redesigning the re-engagement flow, I audited how the existing app handled lapsed users.</p>
            <div className="media-frame">
              <img
                src="/Monsterwalk Audit.png"
                alt="MonsterWalk app audit - existing app state"
                className="w-full"
              />
            </div>
          </AnimatedSection>
        </section>

        {/* CURRENT USER FLOW BREAKDOWN */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-4">Problems in the existing return flow</h2>
            <p className="type-body-lg mb-8">Mapping the existing return flow showed where clarity, motivation, and reward feedback broke down.</p>
            <figure className="media-frame">
              <img
                src="/Design Process(2).jpg"
                alt="Current user flow diagram showing the return journey stages and friction points in clarity, motivation, and reward feedback"
                className="w-full border border-[var(--border)]"
                loading="lazy"
              />
              <figcaption className="type-caption mt-3">Mapping the existing return flow connected specific friction points to each stage of the return journey.</figcaption>
            </figure>
          </AnimatedSection>
        </section>

        {/* BEFORE: EXISTING WELCOME BACK EXPERIENCE */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-4">Before: the return moment felt fragmented</h2>
            <p className="type-body-lg mb-10">The existing return experience moved players through several separate states before bringing them back into gameplay.</p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <figure>
                <img
                  src="/Design Process(4).jpg"
                  alt="Monster Walk old experience: Daily Tasks panel appears first on return"
                  className="w-full border border-[var(--border)]"
                  loading="lazy"
                />
                <div className="mt-3">
                  <p className="type-body-sm font-medium mb-1">01 Daily Tasks</p>
                  <p className="type-caption">Task panel before progress state.</p>
                </div>
              </figure>
              <figure>
                <img
                  src="/Design Process(5).jpg"
                  alt="Monster Walk old experience: Welcome Back screen with steps and stamina"
                  className="w-full border border-[var(--border)]"
                  loading="lazy"
                />
                <div className="mt-3">
                  <p className="type-body-sm font-medium mb-1">02 Welcome Back</p>
                  <p className="type-caption">Steps and stamina without clear conversion.</p>
                </div>
              </figure>
              <figure>
                <img
                  src="/Design Process(6).jpg"
                  alt="Monster Walk old experience: Item Received reward modal"
                  className="w-full border border-[var(--border)]"
                  loading="lazy"
                />
                <div className="mt-3">
                  <p className="type-body-sm font-medium mb-1">03 Item Received</p>
                  <p className="type-caption">Reward in a separate overlay.</p>
                </div>
              </figure>
              <figure>
                <img
                  src="/Design Process(7).jpg"
                  alt="Monster Walk old experience: player finally returns to game world"
                  className="w-full border border-[var(--border)]"
                  loading="lazy"
                />
                <div className="mt-3">
                  <p className="type-body-sm font-medium mb-1">04 Gameplay Return</p>
                  <p className="type-caption">Weak connection to next action.</p>
                </div>
              </figure>
            </div>
          </AnimatedSection>
        </section>

        {/* 4. RESEARCH & DISCOVERY — compact */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">User research & discovery</h2>
            <p className="type-body-lg mb-6">I ran stakeholder interviews (founder, coaches, gaming advisor), conversations with lapsed power users, competitive analysis (Duolingo, Pokémon GO, Habitica), and consulted gaming psychology experts on re-engagement patterns.</p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#c9a96e' }}>
                <p className="type-body font-medium mb-1">Every lapsed user worried their progress was gone</p>
                <p className="type-body-sm">None of them had checked. The worry was unfounded, but it was the main thing stopping them from returning.</p>
              </div>
              <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#c9a96e' }}>
                <p className="type-body font-medium mb-1">Returning users need to feel welcomed</p>
                <p className="type-body-sm">The first moment back should ask as little of the user as possible. The competing apps I looked at all put progress preservation ahead of feature highlights.</p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 5. CONCEPTS WE TESTED */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-8">Prototyping: three re-entry concepts</h2>
          </AnimatedSection>

          <div className="space-y-12">
            <AnimatedSection animation="fade-up" delay={100}>
              <div>
                <h3 className="type-h3 mb-4">Daily Streak</h3>
                <p className="type-body-lg mb-6">Hypothesis: Reminding users of their streak history would reactivate the habit loop and lower the barrier to return. Designed to celebrate milestones rather than call out the gap.</p>
                <div className="flex justify-center">
                  <video
                    className="max-w-full"
                    controls
                    autoPlay={!prefersReducedMotion}
                    loop={!prefersReducedMotion}
                    playsInline
                    muted
                    aria-label="Silent demo: Streak History concept, celebrating a returning player's milestone streak"
                    style={{ maxHeight: '400px' }}
                  >
                    <source src="/Streak.mov" type="video/quicktime" />
                    This browser cannot play the video. It is a silent demo of the Streak History
                    concept, which celebrates a returning player's milestone streak.
                  </video>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div>
                <h3 className="type-h3 mb-4">Squad Leader Greeting</h3>
                <p className="type-body-lg mb-6">Hypothesis: A personal message from a Squad Leader (social accountability partner) would trigger belonging and reduce isolation. Designed to make returning feel like rejoining a team instead of restarting alone.</p>
                <div className="flex justify-center">
                  <video
                    className="max-w-full"
                    controls
                    autoPlay={!prefersReducedMotion}
                    loop={!prefersReducedMotion}
                    playsInline
                    muted
                    aria-label="Silent demo: Squad Leader Greeting concept, a personal welcome-back message from a social accountability partner"
                    style={{ maxHeight: '400px' }}
                  >
                    <source src="/Monster Interaction.mov" type="video/quicktime" />
                    This browser cannot play the video. It is a silent demo of the Squad Leader
                    Greeting concept, a personal welcome-back message from a social accountability
                    partner.
                  </video>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div>
                <h3 className="type-h3 mb-4">Mystery Monster</h3>
                <p className="type-body-lg mb-6">Hypothesis: Curiosity is a stronger motivator than guilt. Teasing a new monster encounter would draw users back in without making them feel guilty. This concept performed strongest in testing.</p>
                <div className="flex justify-center">
                  <video
                    className="max-w-full"
                    controls
                    autoPlay={!prefersReducedMotion}
                    loop={!prefersReducedMotion}
                    playsInline
                    muted
                    aria-label="Silent demo: Mystery Monster concept, teasing a new monster encounter to pull lapsed players back"
                    style={{ maxHeight: '400px' }}
                  >
                    <source src="/Hidden Monster.mov" type="video/quicktime" />
                    This browser cannot play the video. It is a silent demo of the Mystery Monster
                    concept, which teases a new monster encounter to pull lapsed players back.
                  </video>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 6. THE PIVOT */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <div className="border-l-4 border-yellow-500 dark:border-yellow-600 pl-6 py-5">
              <h2 className="type-h2 mb-6">Product decision: concept testing instead of A/B testing</h2>
              
              <div className="text-flow type-body-lg">
                <p>My first instinct was to A/B test all three concepts. With limited beta traffic and a 3-month window, though, A/B testing would only measure which concept users clicked, not why they felt ready to return.</p>
                
                <p>I recommended concept testing instead: moderated sessions where we could watch emotional reactions, ask follow-up questions, and understand why users chose what they did. This is the trade-off I presented to the founder:</p>
                
                <ul className="list-flow ml-6">
                  <li>• A/B testing: measures clicks but can't show whether users feel ready to return.</li>
                  <li>• Concept testing: moderated sessions where we see emotional reactions as they happen. Slower, but it answers the question we had.</li>
                </ul>
                
                <p className="font-semibold text-[var(--text)] mt-6">The founder agreed, and we ran concept testing.</p>
                
                <p className="italic">That decision shaped the rest of the project, and it changed how I saw my role: from carrying out tasks to shaping product decisions.</p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 7. TESTING & LEARNING */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Usability testing and findings</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-flow type-body-lg">
              <p>I ran moderated concept testing sessions with lapsed users, watching how they reacted, listening for hesitation, and asking follow-up questions about why they reacted that way.</p>
              
              <div className="bg-[var(--surface)] pl-6 py-5 my-8 border-l-4">
                <h3 className="font-semibold text-[var(--text)] mb-4">What we learned</h3>
                <ul className="list-flow">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Concepts that acknowledged the absence without judgment worked every time. Concepts that ignored it felt empty.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Reassurance beat feature highlights in every session. Users cared more about knowing their progress was safe than about what was new.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Knowing their progress was saved mattered most. Every participant brought it up without being asked.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>The Mystery Monster concept, which used curiosity instead of guilt, reduced hesitation fastest in every session, so it became the direction.</span>
                  </li>
                </ul>
              </div>
              
              <p>This was qualitative research, so I didn't score the concepts. The patterns were clear enough to make a confident recommendation without presenting the results as numbers.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 8. ITERATION */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Iteration</h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-flow type-body-lg">
              <p>Based on what I heard in testing, I shifted the Mystery Monster concept from explaining features toward reassuring the player.</p>
              
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#c9a96e' }}>
                  <p className="type-meta-label mb-2">Testing finding</p>
                  <p className="type-body">Users responded to reassurance more than to feature highlights. They needed to know their progress was safe.</p>
                </div>
                <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: 'var(--accent)' }}>
                  <p className="type-meta-label mb-2">Before</p>
                  <p className="type-body">"You haven't logged in for 7 days. Start a new challenge."</p>
                </div>
                <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#4a8c5c' }}>
                  <p className="type-meta-label mb-2">After</p>
                  <p className="type-body">"Welcome back. Your progress is still here. Ready to meet your next monster?"</p>
                </div>
              </div>
              
              <p>The new message reassures the player instead of pushing them to act.</p>
            </div>
          </AnimatedSection>
        </section>

        {/* 9. INTERACTIVE PROTOTYPE */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Interactive Prototype</h2>
            <div className="type-body-lg text-flow">
              <p>I built an interactive prototype of the redesigned gameplay and retention mechanics. It simulates the core player flow and progression loop.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="media-frame mt-8 w-full">
              <div className="relative aspect-video w-full overflow-hidden border border-[var(--border)]">
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
                  className="inline-flex items-center gap-1 type-body-sm hover:text-indigo-600 transition-colors"
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

        {/* FROM CONCEPT TO LIVE GAME */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-2">From concept to live game</h2>
            <p className="type-meta-label mb-6">Shipped in live product</p>
            <p className="type-body-lg mb-10">Several recommendations made it from the prototype into the live game, including expanded quest guidance and more contextual monster interactions.</p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <figure>
                <img
                  src="/IMG_9275.PNG"
                  alt="Live Monster Walk Daily Quests implementation"
                  className="w-full border border-[var(--border)]"
                  loading="lazy"
                />
                <div className="mt-3">
                  <p className="type-body-sm font-medium mb-1">Quest guidance in context</p>
                  <p className="type-caption">Daily quests surfaced directly in gameplay.</p>
                </div>
              </figure>
              <figure>
                <img
                  src="/IMG_9276.PNG"
                  alt="Live Monster Walk map with contextual monster interaction"
                  className="w-full border border-[var(--border)]"
                  loading="lazy"
                />
                <div className="mt-3">
                  <p className="type-body-sm font-medium mb-1">Contextual monster interaction</p>
                  <p className="type-caption">In-world dialogue added personality to the experience.</p>
                </div>
              </figure>
              <figure>
                <img
                  src="/IMG_8534.PNG"
                  alt="Live Monster Walk Kyros character dialogue implementation"
                  className="w-full border border-[var(--border)]"
                  loading="lazy"
                />
                <div className="mt-3">
                  <p className="type-body-sm font-medium mb-1">Character-led guidance</p>
                  <p className="type-caption">Kyros guides the player within the game world.</p>
                </div>
              </figure>
            </div>
          </AnimatedSection>
        </section>

        {/* 10. LAUNCH & REAL-WORLD IMPACT */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Launch and impact</h2>
            <p className="type-metric mb-2">4 shipped</p>
            <p className="type-caption mb-8">Recommendations implemented in the live product</p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-flow type-body-lg">
              <p>Two months after my internship ended, Monster Walk officially launched. Four of my design recommendations were in the product:</p>
              
              <div className="grid sm:grid-cols-2 gap-4 my-8">
                <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#4a8c5c' }}>
                  <p className="type-body font-medium">Monster interaction moments</p>
                </div>
                <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#4a8c5c' }}>
                  <p className="type-body font-medium">Encouraging return messaging</p>
                </div>
                <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#4a8c5c' }}>
                  <p className="type-body font-medium">Daily quests</p>
                </div>
                <div className="border-l-4 pl-5 py-2" style={{ borderLeftColor: '#4a8c5c' }}>
                  <p className="type-body font-medium">Daily rewards</p>
                </div>
              </div>
              
              <div className="border-l-4 pl-5 py-3" style={{ borderLeftColor: 'var(--accent)', backgroundColor: 'var(--decision)' }}>
                <p className="type-body font-medium">During a 3-month beta internship, with no post-launch access or live metrics, I designed the approach that shaped how Monster Walk welcomes users back.</p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* 11. STRATEGIC IMPACT — compact */}
        <section className="layout-content mb-16">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">Outcomes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-indigo-300 dark:border-indigo-700 pl-5 py-3">
                <p className="type-body font-medium">Choosing concept testing over A/B testing gave the founder enough confidence to ship.</p>
              </div>
              <div className="border-l-4 border-indigo-300 dark:border-indigo-700 pl-5 py-3">
                <p className="type-body font-medium">Every recommendation traced back to something a user said or felt.</p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Back to projects */}
        <section className="layout-content">
          <div className="border-t border-[var(--border)] pt-12">
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

export default TalofaCaseStudy
