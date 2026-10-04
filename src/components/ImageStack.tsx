import { useCallback, useEffect, useRef, useState } from 'react'

type StackImage = { src: string; title: string }

const VISIBLE = 5 // cards drawn in the pile; the rest wait hidden underneath
const LEAVE_MS = 550
const AUTO_MS = 4000
// Fixed scatter per slot so the pile looks like prints tossed on a desk:
// [x offset px, y offset px, rotation deg]
const SCATTER: [number, number, number][] = [
  [0, 0, -1.5],
  [-34, -12, -7],
  [38, 10, 6],
  [-18, 22, -11],
  [26, -20, 10],
]

/**
 * A pile of images. The top card slides down and tucks to the back of the pile,
 * revealing the next one. Advances on click, arrow keys, swipe, or on a timer
 * (paused on hover/focus, off-screen, and for reduced-motion users).
 */
export default function ImageStack({ images, label }: { images: StackImage[]; label: string }) {
  const [order, setOrder] = useState(() => images.map((_, i) => i))
  const [leaving, setLeaving] = useState(false)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const touchY = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const next = useCallback(() => {
    if (leaving) return
    if (reducedMotion) {
      setOrder((o) => [...o.slice(1), o[0]])
      return
    }
    setLeaving(true)
    window.setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]])
      setLeaving(false)
    }, LEAVE_MS)
  }, [leaving, reducedMotion])

  const prev = useCallback(() => {
    if (leaving) return
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)])
  }, [leaving])

  useEffect(() => {
    if (paused || !inView || reducedMotion) return
    const t = window.setTimeout(next, AUTO_MS)
    return () => window.clearTimeout(t)
  }, [order, paused, inView, reducedMotion, next])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); next() }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev() }
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchY.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchY.current) return
    const dx = e.changedTouches[0].clientX - touchY.current.x
    const dy = e.changedTouches[0].clientY - touchY.current.y
    touchY.current = null
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 40) return
    if (dy > 0 || dx < 0) next()
    else prev()
  }

  const top = order[0]

  return (
    <div
      ref={rootRef}
      className="image-stack"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="image-stack__pile">
        {order.map((imgIndex, depth) => {
          const img = images[imgIndex]
          const isTop = depth === 0
          const hidden = depth >= VISIBLE
          // While the top card leaves, everything underneath steps up one slot
          const slot = leaving && !isTop ? depth - 1 : depth
          const style: React.CSSProperties = {
            zIndex: images.length - depth,
            transform: isTop && leaving
              ? 'translate(10%, 120%) rotate(18deg)'
              : (() => {
                  const [x, y, r] = SCATTER[Math.min(slot, SCATTER.length - 1)]
                  return `translate(${x}px, ${y}px) rotate(${r}deg)`
                })(),
            opacity: hidden ? 0 : isTop && leaving ? 0 : 1,
          }
          return (
            <figure
              key={img.src}
              className={`image-stack__card ${isTop ? 'is-top' : ''}`}
              style={style}
              aria-hidden={!isTop}
              onClick={isTop ? next : undefined}
            >
              <img src={img.src} alt={isTop ? img.title : ''} loading={depth < VISIBLE ? 'eager' : 'lazy'} decoding="async" draggable={false} />
            </figure>
          )
        })}
      </div>

      <div className="image-stack__controls">
        <button type="button" onClick={prev} aria-label="Previous image" className="image-stack__btn">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <p className="image-stack__caption" aria-live="polite">
          <span className="type-body font-medium block">{images[top].title}</span>
          <span className="type-caption">{top + 1} / {images.length}</span>
        </p>
        <button type="button" onClick={next} aria-label="Next image" className="image-stack__btn">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}
