import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="mx-auto px-6 md:px-8 py-5" style={{ maxWidth: 'var(--max-width)' }}>
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-base font-medium transition-colors hover:opacity-70"
            style={{ color: 'var(--text)' }}
          >
            Your Name
          </Link>
          
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="text-base transition-colors hover:opacity-100"
              style={{ color: 'var(--muted)' }}
            >
              Work
            </Link>
            <Link 
              to="/about" 
              className="text-base transition-colors hover:opacity-100"
              style={{ color: 'var(--muted)' }}
            >
              About
            </Link>
            <a 
              href="mailto:hello@example.com" 
              className="text-base transition-colors hover:opacity-100"
              style={{ color: 'var(--muted)' }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
