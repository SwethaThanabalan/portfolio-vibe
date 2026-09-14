import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Light/dark theme toggle. Persists the choice to localStorage and toggles
 * the `dark` class on <html> (Tailwind darkMode: 'class'). The initial theme
 * is applied pre-paint by the inline script in index.html to avoid a flash.
 */
const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Keep <html> class and storage in sync with state.
  useEffect(() => {
    const root = document.documentElement
    // Enable a brief transition only while switching, then remove it so the
    // transition doesn't fire on unrelated renders.
    root.classList.add('theme-transition')
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
    const timer = window.setTimeout(() => root.classList.remove('theme-transition'), 320)
    return () => window.clearTimeout(timer)
  }, [theme])

  // Follow the system preference if the user hasn't explicitly chosen.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      // Only auto-follow when there is no explicit stored choice.
      const stored = localStorage.getItem('theme')
      if (stored !== 'dark' && stored !== 'light') {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-flex items-center justify-center p-2 rounded-full transition-colors hover:opacity-70"
      style={{ color: 'var(--muted)' }}
    >
      {isDark ? (
        // Sun icon (currently dark, action switches to light)
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="4" strokeWidth={2} />
          <path
            strokeLinecap="round"
            strokeWidth={2}
            d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
          />
        </svg>
      ) : (
        // Moon icon (currently light, action switches to dark)
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
