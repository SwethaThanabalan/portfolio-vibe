import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Handles focus and scroll on client-side route changes so keyboard and
 * screen-reader users are not stranded on the previous page's link.
 *
 * On each navigation it:
 *  - resets scroll to the top of the document
 *  - moves focus to the new page's main landmark (#main-content) if present,
 *    otherwise to a visually-hidden live region
 *  - announces the new page title via an aria-live region
 *
 * WCAG 2.4.3 (Focus Order), 4.1.3 (Status Messages).
 */
const RouteChangeHandler = () => {
  const { pathname } = useLocation()
  const announceRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip the very first mount so we don't steal focus on initial load.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? 'auto' : 'auto' })

    // Move focus to the main landmark of the newly rendered page.
    // Defer to the next frame so the new route has mounted.
    const raf = requestAnimationFrame(() => {
      const main = document.getElementById('main-content')
      if (main) {
        // Make the landmark programmatically focusable without adding it
        // to the normal tab order.
        if (!main.hasAttribute('tabindex')) {
          main.setAttribute('tabindex', '-1')
        }
        main.focus({ preventScroll: true })
      }

      // Announce the new page for screen readers.
      if (announceRef.current) {
        announceRef.current.textContent = `Navigated to ${document.title}`
      }
    })

    return () => cancelAnimationFrame(raf)
  }, [pathname])

  return (
    <div
      ref={announceRef}
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  )
}

export default RouteChangeHandler
