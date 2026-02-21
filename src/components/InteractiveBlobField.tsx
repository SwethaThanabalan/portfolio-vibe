import { useEffect, useRef, useState } from 'react'

interface InteractiveBlobFieldProps {
  className?: string
  onStroke?: () => void
}

// Coral palette - soft and warm (increased opacity for better visibility)
const colors = [
  'rgba(255, 146, 112, 0.35)',  // Soft coral
  'rgba(255, 186, 150, 0.30)',  // Light peach
  'rgba(255, 210, 170, 0.25)',  // Warm sand
  'rgba(148, 163, 184, 0.20)'   // Neutral slate
]

interface Blob {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  createdAt: number
}

const InteractiveBlobField = ({ className = '', onStroke }: InteractiveBlobFieldProps) => {
  const [blobs, setBlobs] = useState<Blob[]>([])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastSpawnRef = useRef(0)
  const blobIdRef = useRef(0)
  const cursorRef = useRef({ x: 0, y: 0, active: false })
  const lastPosRef = useRef({ x: 0, y: 0 })

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Static blobs for reduced motion
  useEffect(() => {
    if (prefersReducedMotion && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const staticBlobs: Blob[] = [
        {
          id: 0,
          x: rect.width * 0.3,
          y: rect.height * 0.4,
          size: 480,
          color: colors[0],
          opacity: 1,
          createdAt: Date.now()
        },
        {
          id: 1,
          x: rect.width * 0.7,
          y: rect.height * 0.5,
          size: 520,
          color: colors[1],
          opacity: 1,
          createdAt: Date.now()
        }
      ]
      setBlobs(staticBlobs)
    }
  }, [prefersReducedMotion])

  // Spawn blobs on cursor movement
  const spawnBlob = (x: number, y: number) => {
    const now = Date.now()
    const timeSinceLastSpawn = now - lastSpawnRef.current
    
    // Throttle spawn rate (80-120ms)
    if (timeSinceLastSpawn < 100) return
    
    lastSpawnRef.current = now
    
    // Random size between 380-560px
    const size = 380 + Math.random() * 180
    
    // Create new blob centered on cursor
    const newBlob: Blob = {
      id: blobIdRef.current++,
      x: x - size / 2,
      y: y - size / 2,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0,
      createdAt: now
    }
    
    setBlobs(prev => {
      const updated = [...prev, newBlob]
      // Cap at 26 blobs, remove oldest
      if (updated.length > 26) {
        return updated.slice(-26)
      }
      return updated
    })
  }

  // Handle pointer move
  useEffect(() => {
    if (prefersReducedMotion) return

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      cursorRef.current = { x, y, active: true }
      
      // Spawn blob at cursor position
      spawnBlob(x, y)
      
      // Track movement distance for stroke count
      const dx = x - lastPosRef.current.x
      const dy = y - lastPosRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance > 30) {
        if (onStroke) onStroke()
        lastPosRef.current = { x, y }
      }
    }

    const handlePointerLeave = () => {
      cursorRef.current.active = false
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [prefersReducedMotion, onStroke])

  // Animate blob opacity and remove old blobs
  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      const now = Date.now()
      
      setBlobs(prev => {
        return prev
          .map(blob => {
            const age = now - blob.createdAt
            
            // Fade in over 200ms
            if (age < 200) {
              return { ...blob, opacity: age / 200 }
            }
            
            // Hold at full opacity until 2800ms
            if (age < 2800) {
              return { ...blob, opacity: 1 }
            }
            
            // Fade out over 800ms (2800-3600ms)
            const fadeOutDuration = 800
            const fadeOutProgress = (age - 2800) / fadeOutDuration
            
            if (fadeOutProgress < 1) {
              return { ...blob, opacity: 1 - fadeOutProgress }
            }
            
            // Mark for removal
            return null
          })
          .filter((blob): blob is Blob => blob !== null)
      })
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  // Handle reset
  useEffect(() => {
    const handleReset = () => {
      setBlobs([])
      lastSpawnRef.current = 0
      lastPosRef.current = { x: 0, y: 0 }
    }

    window.addEventListener('resetBackground', handleReset)
    return () => window.removeEventListener('resetBackground', handleReset)
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {blobs.map(blob => (
        <div
          key={blob.id}
          className="absolute rounded-full blur-[120px] will-change-transform"
          style={{
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            left: `${blob.x}px`,
            top: `${blob.y}px`,
            background: `radial-gradient(circle at 30% 30%, ${blob.color} 0%, transparent 70%)`,
            opacity: blob.opacity,
            transition: 'opacity 200ms ease-out',
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  )
}

export default InteractiveBlobField
