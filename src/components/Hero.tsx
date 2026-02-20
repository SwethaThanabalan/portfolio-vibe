import { useState } from 'react'
import RotatingWord from './RotatingWord'
import InteractiveBlobField from './InteractiveBlobField'

const Hero = () => {
  const [strokeCount, setStrokeCount] = useState(0)

  const handleStroke = () => {
    setStrokeCount(prev => prev + 1)
  }

  const handleReset = () => {
    window.dispatchEvent(new Event('resetBackground'))
    setStrokeCount(0)
  }

  return (
    <section 
      className="relative overflow-hidden min-h-[86vh] md:min-h-[88vh] flex items-center bg-transparent"
      style={{ width: '100%', maxWidth: '100vw' }}
    >
      {/* Painterly canvas background - z-0 */}
      <InteractiveBlobField 
        className="absolute inset-0 z-0"
        onStroke={handleStroke}
      />
      
      {/* Subtle grain overlay - z-1, pointer-events-none */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.06,
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Hero content - z-10, pointer-events-none on wrapper */}
      <div className="relative z-10 w-full pointer-events-none">
        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
          {/* Main Headline */}
          <h1 
            className="font-bold text-neutral-900 mb-6 sm:mb-8"
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
            className="text-neutral-700 leading-relaxed mb-10 sm:mb-12 max-w-[600px]"
            style={{
              fontSize: 'clamp(1.05rem, 1.2vw, 1.25rem)'
            }}
          >
            Challenging ideas. Bringing structure to ambiguity. Designing with research and growth in mind.
          </p>
          
          {/* CTAs - restore pointer events */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 pointer-events-auto">
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
          
          {/* Micro-proof with subtle stroke count */}
          <p 
            className="text-xs sm:text-sm mb-6 text-neutral-500"
          >
            Marketing background • Research-led • Systems mindset • Strokes: {strokeCount}
          </p>

          {/* Subtle premium reset button - restore pointer events */}
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-neutral-700 bg-white/40 backdrop-blur-sm border border-black/10 rounded-md transition-all duration-200 hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 pointer-events-auto"
          >
            Reset background
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
