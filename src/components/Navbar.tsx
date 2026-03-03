import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

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
        <div 
          className="flex items-center justify-center backdrop-blur-sm transition-all duration-300"
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
      </div>
    </nav>
  )
}

export default Navbar
