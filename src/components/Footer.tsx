const Footer = () => {
  return (
    <footer 
      className="py-12 px-6 md:px-8 border-t"
      style={{ 
        borderColor: 'var(--border)',
        maxWidth: 'var(--max-width)',
        margin: '0 auto'
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Social Links */}
        <div className="flex gap-6">
          <a 
            href="https://www.linkedin.com/in/swethathanabalan/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:opacity-100"
            style={{ color: 'var(--muted)' }}
          >
            LinkedIn
          </a>
          <a 
            href="tys.swetha@gmail.com"
            className="text-sm transition-colors hover:opacity-100"
            style={{ color: 'var(--muted)' }}
          >
            Email
          </a>
        </div>
        
        {/* Copyright */}
        <p 
          className="text-sm"
          style={{ color: 'var(--muted)' }}
        >
          © 2024 Swetha Thanabalan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
