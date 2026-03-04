import { useState, useEffect } from 'react'
import RotatingWord from './RotatingWord'
import InteractiveBlobField from './InteractiveBlobField'

const Hero = () => {
  const [strokeCount, setStrokeCount] = useState(0)
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
      className="relative overflow-hidden min-h-[86vh] md:min-h-[88vh] flex flex-col bg-transparent"
      style={{ width: '100%', maxWidth: '100vw' }}
    >
      {/* Painterly canvas background - z-0 */}
      <InteractiveBlobField 
        className="absolute inset-0 z-0"
        onStroke={handleStroke}
        penModeEnabled={penModeEnabled}
      />
      
      {/* Readability veil - reduced opacity for more visible blobs */}
      <div className="absolute inset-0 bg-white/20 z-[1] pointer-events-none" />
      
      {/* Hero content - z-10, centered, pointer-events-none on wrapper */}
      <div className="relative z-10 w-full flex-1 flex items-center pointer-events-none">
        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 w-full">
          <div className="text-center mx-auto" style={{ paddingTop: '80px' }}>
            {/* Main Headline */}
            <h1 
              className="font-bold text-neutral-900 mb-6 sm:mb-8 mx-auto"
              style={{
                fontSize: 'clamp(3.2rem, 6vw, 6.8rem)',
                lineHeight: '1.0',
                maxWidth: '16ch'
              }}
            >
              Good products aren't built on{' '}
              <RotatingWord />
            </h1>
            
            {/* Subline */}
            <p 
              className="text-neutral-700 leading-relaxed mb-10 sm:mb-12 mx-auto"
              style={{
                fontSize: 'clamp(1.05rem, 1.2vw, 1.25rem)',
                maxWidth: '600px'
              }}
            >
              Challenging ideas. Bringing structure to ambiguity. Designing with research and growth in mind.
            </p>
            
            {/* CTAs - restore pointer events */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 pointer-events-auto">
              <a
                href="#work"
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  color: 'white'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
              >
                View Selected Work
              </a>
              
              <a
                href="/about"
                className="text-base font-medium transition-colors hover:opacity-70 text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                About me →
              </a>
            </div>
            
            {/* Micro-proof with stroke count and pen mode controls */}
            <div className="mb-6 pointer-events-auto">
              <p className="text-xs sm:text-sm text-neutral-500 mb-3">
                Marketing background • Research-led • Systems mindset • Strokes: {strokeCount}
              </p>
              
              {/* Touch device helper text */}
              {isTouchDevice && !penModeEnabled && (
                <p className="text-xs text-neutral-400 mb-3">
                  Tip: Turn on Pen mode to interact with the background
                </p>
              )}
              
              {/* Pen mode controls for touch devices */}
              {isTouchDevice && (
                <div className="flex items-center justify-center gap-4 text-sm">
                  <button
                    onClick={() => setPenModeEnabled(!penModeEnabled)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-neutral-700 hover:text-neutral-900 transition-colors border-b border-transparent hover:border-neutral-300"
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
                        className="px-3 py-1.5 text-neutral-600 hover:text-neutral-900 transition-colors text-sm"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => setPenModeEnabled(false)}
                        className="px-3 py-1.5 text-neutral-600 hover:text-neutral-900 transition-colors text-sm"
                      >
                        Done
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Subtle premium reset button for desktop */}
            {!isTouchDevice && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm text-neutral-700 bg-white/40 backdrop-blur-sm border border-black/10 rounded-md transition-all duration-200 hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 pointer-events-auto"
              >
                Reset background
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
