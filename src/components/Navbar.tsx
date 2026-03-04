import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-6 md:px-8 py-5 flex justify-center" style={{ maxWidth: 'var(--max-width)' }}>
        {/* Desktop Navigation */}
        <div 
          className="hidden md:flex items-center justify-center backdrop-blur-sm transition-all duration-300"
          style={{ 
            backgroundColor: isScrolled ? 'var(--bg)' : 'transparent',
            boxShadow: isScrolled ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' : 'none',
            borderRadius: isScrolled ? '9999px' : '0',
            padding: isScrolled ? '0.75rem 2rem' : '0'
          }}
        >
          <Link 
            to="/" 
            className="transition-colors hover:opacity-70"
            style={{ 
              color: 'var(--accent)',
              fontFamily: "'Cedarville Cursive', cursive",
              fontSize: '1.5rem',
              fontWeight: 700
            }}
          >
            Swetha Thanabalan
          </Link>
          
          <span className="mx-4 text-base" style={{ color: 'var(--muted)' }}>|</span>
          
          <Link 
            to="/#work" 
            className="text-base transition-colors hover:opacity-100"
            style={{ color: 'var(--muted)' }}
          >
            Projects
          </Link>
          
          <span className="mx-4 text-base" style={{ color: 'var(--muted)' }}>|</span>
          
          <Link 
            to="/about" 
            className="text-base transition-colors hover:opacity-100"
            style={{ color: 'var(--muted)' }}
          >
            About Me
          </Link>
          
          <span className="mx-4 text-base" style={{ color: 'var(--muted)' }}>|</span>
          
          <a 
            href="mailto:hello@example.com" 
            className="text-base transition-colors hover:opacity-100"
            style={{ color: 'var(--muted)' }}
          >
            Contact
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden w-full flex items-center justify-between">
          <div 
            className="backdrop-blur-sm transition-all duration-300"
            style={{ 
              backgroundColor: isScrolled ? 'var(--bg)' : 'transparent',
              boxShadow: isScrolled ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' : 'none',
              borderRadius: isScrolled ? '9999px' : '0',
              padding: isScrolled ? '0.5rem 1rem' : '0'
            }}
          >
            <Link 
              to="/" 
              className="transition-colors hover:opacity-70"
              style={{ 
                color: 'var(--accent)',
                fontFamily: "'Cedarville Cursive', cursive",
                fontSize: '1.25rem',
                fontWeight: 700
              }}
            >
              Swetha Thanabalan
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 transition-colors hover:opacity-70"
            style={{ color: 'var(--text)' }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden backdrop-blur-sm border-t transition-all duration-300"
          style={{ 
            backgroundColor: 'var(--bg)',
            borderColor: 'var(--border)'
          }}
        >
          <div className="px-6 py-4 space-y-4">
            <Link 
              to="/#work" 
              className="block text-base transition-colors hover:opacity-70"
              style={{ color: 'var(--text)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </Link>
            
            <Link 
              to="/about" 
              className="block text-base transition-colors hover:opacity-70"
              style={{ color: 'var(--text)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Me
            </Link>
            
            <a 
              href="mailto:hello@example.com" 
              className="block text-base transition-colors hover:opacity-70"
              style={{ color: 'var(--text)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
