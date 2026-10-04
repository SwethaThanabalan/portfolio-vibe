import { useState, useEffect } from 'react'
import RotatingWord from './RotatingWord'
import InteractiveBlobField from './InteractiveBlobField'
import { RESUME_URL, LINKEDIN_URL, EMAIL } from '../data/links'

const Hero = () => {
  const [, setStrokeCount] = useState(0)
  const [penModeEnabled, setPenModeEnabled] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
      const hasNoHover = window.matchMedia('(hover: none)').matches
      setIsTouchDevice(hasCoarsePointer && hasNoHover)
    }
    checkTouchDevice()
  }, [])

  const handleStroke = () => {
    setStrokeCount(prev => prev + 1)
  }

  const handleReset = () => {
    window.dispatchEvent(new Event('resetBackground'))
    setStrokeCount(0)
  }

  return (
    <section 
      className="relative overflow-hidden min-h-svh flex flex-col bg-transparent"
      style={{ width: '100%', maxWidth: '100vw' }}
    >
      {/* Painterly canvas background - z-0 */}
      <InteractiveBlobField 
        className="absolute inset-0 z-0"
        onStroke={handleStroke}
        penModeEnabled={penModeEnabled}
      />
      
      {/* Readability veil - reduced opacity for more visible blobs */}
      <div className="absolute inset-0 bg-white/20 dark:bg-black/45 z-[1] pointer-events-none" />
      
      {/* Hero content - z-10, centered, pointer-events-none on wrapper */}
      <div className="relative z-10 w-full flex-1 flex items-center pointer-events-none">
        <div className="mx-auto px-[var(--gutter)] py-16 sm:py-20 w-full">
          <div className="text-center mx-auto" style={{ paddingTop: '80px' }}>
            {/* Crawlable identity — visually hidden but readable by search engines and screen readers */}
            <p className="sr-only">Swetha Thanabalan — Product Designer</p>

            {/* Main Headline */}
            <h1
              className="type-display mx-auto mb-6 sm:mb-8"
              style={{ maxWidth: '14ch' }}
            >
              Good products aren't built on{' '}
              <RotatingWord />
            </h1>
            
            {/* Subline — recruiter and crawler readable */}
            <p className="type-lead mb-10 sm:mb-12 mx-auto text-center">
              Product designer working across user research, interaction design, and rapid prototyping.
            </p>
            
            {/* CTAs - restore pointer events */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-4 mb-6 pointer-events-auto">
              <a
                href="#work"
                className="btn-3d inline-flex items-center px-6 py-3 text-base font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{ 
                  backgroundColor: '#4338ca',
                  color: 'white',
                  borderRadius: 'var(--radius-md)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3730a3'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
              >
                View selected work
              </a>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Resume (PDF, opens in a new tab)"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium border transition-colors duration-200 hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{
                  color: 'var(--text)',
                  borderColor: 'var(--text)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" />
                </svg>
                Resume
              </a>
            </div>

            {/* Contact row */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-8 pointer-events-auto">
              <a
                href={`mailto:${EMAIL}`}
                className="text-base font-medium transition-colors hover:opacity-70 text-neutral-900 dark:text-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {EMAIL}
              </a>
              <span className="text-neutral-400 dark:text-neutral-500" aria-hidden="true">·</span>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in a new tab)"
                className="inline-flex items-center gap-1.5 text-base font-medium transition-colors hover:opacity-70 text-neutral-900 dark:text-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
                LinkedIn
              </a>
            </div>
            
            {/* Micro-proof with stroke count and pen mode controls */}
            <div className="mb-6 pointer-events-auto">
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                MS in HCI, Drexel University. Also a professional photographer and former marketer, which helps me think about how a product gets noticed and adopted.
              </p>
              
              {/* Touch device helper text */}
              {isTouchDevice && !penModeEnabled && (
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-3">
                  Tip: Turn on Pen mode to interact with the background
                </p>
              )}
              
              {/* Pen mode controls for touch devices */}
              {isTouchDevice && (
                <div className="flex items-center justify-center gap-4 text-sm">
                  <button
                    onClick={() => setPenModeEnabled(!penModeEnabled)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors border-b border-transparent hover:border-neutral-300 dark:hover:border-neutral-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Pen mode {penModeEnabled ? 'ON' : 'OFF'}
                  </button>
                  
                  {penModeEnabled && (
                    <>
                      <button
                        onClick={handleReset}
                        className="px-3 py-1.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors text-sm"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => setPenModeEnabled(false)}
                        className="px-3 py-1.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors text-sm"
                      >
                        Done
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
