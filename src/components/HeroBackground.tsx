import { useEffect, useRef, useState } from 'react'

// Premium indigo + cool palette blob configurations tied to rotating words
// Adjust opacity values here to control intensity (current: 0.38-0.48 for noticeable effect)
const blobStates = {
  assumptions: {
    blobs: [
      { x: 20, y: 25, size: 680, color: 'rgba(79, 70, 229, 0.45)', scale: 1 },      // Deep indigo
      { x: 75, y: 20, size: 640, color: 'rgba(165, 180, 252, 0.42)', scale: 1 },    // Light indigo
      { x: 30, y: 70, size: 660, color: 'rgba(94, 234, 212, 0.38)', scale: 1 },     // Teal
      { x: 80, y: 75, size: 620, color: 'rgba(148, 163, 184, 0.35)', scale: 1 }     // Slate
    ]
  },
  noise: {
    blobs: [
      { x: 25, y: 30, size: 700, color: 'rgba(79, 70, 229, 0.48)', scale: 1.03 },   // Deep indigo (boosted)
      { x: 70, y: 25, size: 650, color: 'rgba(165, 180, 252, 0.40)', scale: 1.03 }, // Light indigo
      { x: 35, y: 65, size: 670, color: 'rgba(94, 234, 212, 0.35)', scale: 1.03 },  // Teal
      { x: 75, y: 70, size: 630, color: 'rgba(148, 163, 184, 0.32)', scale: 1.03 }  // Slate
    ]
  },
  guesswork: {
    blobs: [
      { x: 18, y: 22, size: 690, color: 'rgba(79, 70, 229, 0.42)', scale: 1 },      // Deep indigo
      { x: 72, y: 28, size: 660, color: 'rgba(165, 180, 252, 0.45)', scale: 1 },    // Light indigo (boosted)
      { x: 28, y: 68, size: 680, color: 'rgba(94, 234, 212, 0.40)', scale: 1 },     // Teal
      { x: 78, y: 72, size: 640, color: 'rgba(148, 163, 184, 0.38)', scale: 1 }     // Slate
    ]
  },
  opinions: {
    blobs: [
      { x: 22, y: 28, size: 670, color: 'rgba(79, 70, 229, 0.40)', scale: 1.03 },   // Deep indigo
      { x: 68, y: 22, size: 640, color: 'rgba(165, 180, 252, 0.38)', scale: 1.03 }, // Light indigo
      { x: 32, y: 72, size: 690, color: 'rgba(94, 234, 212, 0.45)', scale: 1.03 },  // Teal (boosted)
      { x: 73, y: 68, size: 620, color: 'rgba(148, 163, 184, 0.35)', scale: 1.03 }  // Slate
    ]
  },
  hype: {
    blobs: [
      { x: 25, y: 32, size: 710, color: 'rgba(79, 70, 229, 0.46)', scale: 1.03 },   // Deep indigo
      { x: 65, y: 26, size: 670, color: 'rgba(165, 180, 252, 0.43)', scale: 1.03 }, // Light indigo
      { x: 35, y: 60, size: 680, color: 'rgba(94, 234, 212, 0.42)', scale: 1.03 },  // Teal
      { x: 70, y: 65, size: 650, color: 'rgba(148, 163, 184, 0.40)', scale: 1.03 }  // Slate (boosted)
    ]
  },
  ego: {
    blobs: [
      { x: 20, y: 35, size: 680, color: 'rgba(79, 70, 229, 0.44)', scale: 1 },      // Deep indigo
      { x: 70, y: 30, size: 660, color: 'rgba(165, 180, 252, 0.40)', scale: 1 },    // Light indigo
      { x: 30, y: 65, size: 670, color: 'rgba(94, 234, 212, 0.38)', scale: 1 },     // Teal
      { x: 75, y: 70, size: 640, color: 'rgba(148, 163, 184, 0.48)', scale: 1 }     // Slate (boosted)
    ]
  }
}

interface HeroBackgroundProps {
  currentWord: string
}

const HeroBackground = ({ currentWord }: HeroBackgroundProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number>()
  const containerRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Mouse tracking with smoothing (lerp)
  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2 // -1 to 1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2 // -1 to 1
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  // Smooth animation loop with lerp
  useEffect(() => {
    if (prefersReducedMotion) return

    const animate = () => {
      setSmoothPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.06, // Smoothing factor (adjust for responsiveness)
        y: prev.y + (mousePos.y - prev.y) * 0.06
      }))
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [mousePos, prefersReducedMotion])

  // Get current blob state
  const currentState = blobStates[currentWord as keyof typeof blobStates] || blobStates.assumptions

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0"
      style={{ zIndex: 0 }}
    >
      {/* Animated gradient blobs */}
      {currentState.blobs.map((blob, index) => {
        // Calculate parallax offset based on mouse position (max 48px movement)
        const parallaxX = prefersReducedMotion ? 0 : smoothPos.x * (24 + index * 8)
        const parallaxY = prefersReducedMotion ? 0 : smoothPos.y * (24 + index * 8)

        return (
          <div
            key={index}
            className={`absolute rounded-full transition-all ease-out ${
              prefersReducedMotion ? '' : 'animate-float-blob'
            }`}
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: `${blob.size}px`,
              height: `${blob.size}px`,
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
              filter: 'blur(140px)',
              transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0) translate(-50%, -50%) scale(${blob.scale})`,
              willChange: 'transform',
              animationDelay: `${index * 0.7}s`,
              transitionDuration: '700ms',
              transitionProperty: 'transform, opacity'
            }}
          />
        )
      })}

      {/* Readability veil overlay - DO NOT exceed bg-white/45 */}
      <div 
        className="absolute inset-0 bg-white/35 z-[1]"
      />
    </div>
  )
}

export default HeroBackground
