import { useRef, useState, useEffect } from 'react'

/* ═══════════════════════════════════════════════════════════════
   REUSABLE CASE STUDY COMPONENTS
   Editorial design system for research-led product design stories
═══════════════════════════════════════════════════════════════ */

/* ─── Scroll reveal hook (shared) ─── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─── Reveal wrapper ─── */
export function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}
      style={{ transitionDuration: 'var(--duration-reveal)', transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── Section label (uppercase small caps) ─── */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <p className="section-label mb-6">{children}</p>
    </Reveal>
  )
}

/* ─── Research finding ─── */
export function FindingBlock({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="finding-block my-8">
        {children}
      </div>
    </Reveal>
  )
}

/* ─── Design decision ─── */
export function DecisionBlock({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="decision-block my-8">
        {children}
      </div>
    </Reveal>
  )
}

/* ─── Outcome block ─── */
export function OutcomeBlock({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="outcome-block my-8">
        {children}
      </div>
    </Reveal>
  )
}

/* ─── Annotated image ─── */
export function AnnotatedImage({ src, alt, caption, annotation }: {
  src: string; alt: string; caption?: string; annotation?: string
}) {
  return (
    <Reveal>
      <figure className="my-10">
        <div className="img-editorial">
          <img src={src} alt={alt} className="w-full" loading="lazy" />
        </div>
        {(caption || annotation) && (
          <figcaption className="flex justify-between items-start mt-3 gap-8">
            {caption && <span className="caption flex-1">{caption}</span>}
            {annotation && <span className="annotation text-right">{annotation}</span>}
          </figcaption>
        )}
      </figure>
    </Reveal>
  )
}

/* ─── Image pair (editorial side-by-side) ─── */
export function ImagePair({ images, caption }: {
  images: [{ src: string; alt: string }, { src: string; alt: string }]; caption?: string
}) {
  return (
    <Reveal>
      <figure className="my-10">
        <div className="grid grid-cols-2 gap-3">
          {images.map((img, i) => (
            <div key={i} className="img-editorial">
              <img src={img.src} alt={img.alt} className="w-full" loading="lazy" />
            </div>
          ))}
        </div>
        {caption && <figcaption className="caption">{caption}</figcaption>}
      </figure>
    </Reveal>
  )
}

/* ─── Before / After comparison ─── */
export function BeforeAfter({ before, after, label }: {
  before: string; after: string; label?: string
}) {
  return (
    <Reveal>
      <div className="my-10">
        {label && <p className="section-label mb-4">{label}</p>}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2">Before</p>
            <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">{before}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-[var(--accent)] uppercase tracking-wide mb-2">After</p>
            <p className="text-[15px] leading-relaxed text-[var(--text)]">{after}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

/* ─── Metric ─── */
export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="metric-value">{value}</p>
      <p className="metric-label">{label}</p>
    </div>
  )
}

/* ─── Pull quote ─── */
export function PullQuote({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useReveal(0.2)
  return (
    <div ref={ref} className={`py-8 transition-all ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDuration: 'var(--duration-reveal)' }}>
      <blockquote
        className="font-editorial font-normal text-[var(--text)]"
        style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: '1.35', maxWidth: '28ch', letterSpacing: '-0.015em' }}
      >
        {children}
      </blockquote>
    </div>
  )
}

/* ─── Metadata grid (case study top) ─── */
export function MetadataGrid({ items }: {
  items: Array<{ label: string; value: string }>
}) {
  return (
    <Reveal delay={100}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-8 border-t" style={{ borderColor: 'var(--border)' }}>
        {items.map((item) => (
          <div key={item.label}>
            <p className="metadata-label">{item.label}</p>
            <p className="metadata-value">{item.value}</p>
          </div>
        ))}
      </div>
    </Reveal>
  )
}

/* ─── Context note (e.g. "Academic project") ─── */
export function ContextNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm text-[var(--muted)] border-l-2 border-[var(--border)] pl-4 my-6">
      {children}
    </div>
  )
}
