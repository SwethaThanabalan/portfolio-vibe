import { useEffect, useRef } from 'react'

interface InteractiveBlobFieldProps {
  className?: string
  onStroke?: () => void
}

// Vibrant palette for brush strokes - warm editorial colors
const PAINT_COLORS = [
  'rgba(255,186,73,0.9)',    // bright amber
  'rgba(255,145,77,0.85)',   // bright coral
  'rgba(244,208,160,0.8)',   // warm sand
  'rgba(148,163,184,0.75)'   // cool neutral
]

const InteractiveBlobField = ({ className = '', onStroke }: InteractiveBlobFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const lastPaintPosRef = useRef({ x: -100, y: -100 })
  const canvasSizeRef = useRef({ width: 0, height: 0 })
  const isInitializedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.error('Canvas ref is null')
      return
    }

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) {
      console.error('Could not get canvas context')
      return
    }

    ctxRef.current = ctx

    // Setup canvas with device pixel ratio
    const setupCanvas = () => {
      try {
        const rect = canvas.getBoundingClientRect()
        const dpr = window.devicePixelRatio || 1
        
        // Save current canvas content before resizing
        const imageData = isInitializedRef.current ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null
        
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        
        canvasSizeRef.current = { width: rect.width, height: rect.height }
        
        ctx.scale(dpr, dpr)
        
        // Apply base wash ONLY on initial setup, not on resize
        if (!isInitializedRef.current) {
          ctx.fillStyle = 'rgba(255,255,255,1)'
          ctx.fillRect(0, 0, rect.width, rect.height)
          isInitializedRef.current = true
          console.log('Canvas initialized with white background')
        } else if (imageData) {
          // Restore previous canvas content after resize
          ctx.putImageData(imageData, 0, 0)
          console.log('Canvas content restored after resize')
        }
      } catch (error) {
        console.error('Error in setupCanvas:', error)
      }
    }

    // Paint LOCALIZED brush stroke at cursor position
    const paintBrush = (x: number, y: number) => {
      if (!ctx) return

      try {
        console.log('Painting at:', x, y)
        
        // Save context state
        ctx.save()

        // No jitter - paint exactly at cursor position for smooth flow
        const jitterX = x
        const jitterY = y

        // Use source-over (normal) blend mode for vibrant colors
        ctx.globalCompositeOperation = 'source-over'

        // Random color from palette
        const color = PAINT_COLORS[Math.floor(Math.random() * PAINT_COLORS.length)]
        
        // Brush size: 50-80px for smooth continuous strokes
        const radius = 50 + Math.random() * 30

        // Create radial gradient centered at cursor - SMOOTH falloff
        const gradient = ctx.createRadialGradient(jitterX, jitterY, 0, jitterX, jitterY, radius)
        
        // Parse color to adjust alpha for gradient stops
        const colorMatch = color.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/)
        if (colorMatch) {
          const [, r, g, b, a] = colorMatch
          const alpha = parseFloat(a)
          
          // Smoother gradient with more stops for better blending
          gradient.addColorStop(0, `rgba(${r},${g},${b},${alpha})`)
          gradient.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.7})`)
          gradient.addColorStop(0.7, `rgba(${r},${g},${b},${alpha * 0.3})`)
          gradient.addColorStop(1, `rgba(${r},${g},${b},0)`)
        }

        // Brush opacity: 0.15-0.3 for smooth layered blending
        ctx.globalAlpha = 0.15 + Math.random() * 0.15

        // Draw LOCALIZED brush stroke (only at cursor position)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(jitterX, jitterY, radius, 0, Math.PI * 2)
        ctx.fill()

        // Restore context state
        ctx.restore()
      } catch (error) {
        console.error('Error in paintBrush:', error)
      }
    }

    // Handle pointer move - LOCALIZED stamping + stroke counting
    const handlePointerMove = (e: PointerEvent) => {
      try {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Calculate distance from last paint position
        const distance = Math.sqrt(
          Math.pow(x - lastPaintPosRef.current.x, 2) +
          Math.pow(y - lastPaintPosRef.current.y, 2)
        )

        // Smoother stroke: paint every 1px for continuous flow
        const paintThreshold = 1
        
        if (distance > paintThreshold) {
          // Interpolate between last position and current position for smooth stroke
          const steps = Math.ceil(distance / paintThreshold)
          
          for (let i = 0; i <= steps; i++) {
            const t = i / steps
            const interpX = lastPaintPosRef.current.x + (x - lastPaintPosRef.current.x) * t
            const interpY = lastPaintPosRef.current.y + (y - lastPaintPosRef.current.y) * t
            
            // Paint single brush stroke per position for smooth flow
            paintBrush(interpX, interpY)
          }
          
          lastPaintPosRef.current = { x, y }
          
          // Increment stroke count less frequently (every 12px of actual movement)
          if (distance > 12 && onStroke) {
            onStroke()
          }
        }
      } catch (error) {
        console.error('Error in handlePointerMove:', error)
      }
    }

    setupCanvas()

    window.addEventListener('resize', setupCanvas)
    canvas.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('resize', setupCanvas)
      canvas.removeEventListener('pointermove', handlePointerMove)
    }
  }, [onStroke])

  // Handle reset - reapply base wash ONLY
  useEffect(() => {
    const handleReset = () => {
      const canvas = canvasRef.current
      const ctx = ctxRef.current
      if (!canvas || !ctx) return

      const { width, height } = canvasSizeRef.current
      
      // Clear canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Reapply base wash ONCE - start with WHITE canvas
      ctx.fillStyle = 'rgba(255,255,255,1)'
      ctx.fillRect(0, 0, width, height)
      
      // Reset initialization flag
      isInitializedRef.current = true
      
      // Reset last paint position
      lastPaintPosRef.current = { x: -100, y: -100 }
      
      console.log('Canvas reset')
    }

    window.addEventListener('resetBackground', handleReset)
    return () => window.removeEventListener('resetBackground', handleReset)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}

export default InteractiveBlobField
