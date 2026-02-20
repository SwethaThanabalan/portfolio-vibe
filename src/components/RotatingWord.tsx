import { useState, useEffect } from 'react'

const words = ['assumptions', 'noise', 'guesswork', 'opinions', 'hype', 'ego']

const RotatingWord = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      return // Don't animate if user prefers reduced motion
    }

    const interval = setInterval(() => {
      setIsAnimating(true)
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-block relative" style={{ fontSize: '1.08em' }}>
      <span 
        className={`inline-block font-handwritten text-indigo-600 transition-all duration-300 ${
          isAnimating 
            ? 'opacity-0 translate-y-3' 
            : 'opacity-100 translate-y-0'
        }`}
        style={{ 
          lineHeight: '0.92'
        }}
      >
        {words[currentIndex]}
      </span>
      
      {/* Indigo stroke underline - animates on word change */}
      <span
        className="absolute left-0 right-0 bg-indigo-600 pointer-events-none"
        style={{
          height: '2.5px',
          bottom: '-0.15em',
          transformOrigin: 'left center',
          transform: isAnimating ? 'scaleX(0)' : 'scaleX(1)',
          opacity: isAnimating ? 0 : 1,
          transition: 'transform 400ms ease-out, opacity 300ms ease-out'
        }}
      />
    </span>
  )
}

export default RotatingWord
