import { useState, useEffect } from 'react'

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [pipelineHover, setPipelineHover] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const footer = document.getElementById('footer-section')
      if (footer) {
        const rect = footer.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
        
        // Check if mouse is near the blob area (bottom right)
        const blobX = rect.width * 0.8
        const blobY = rect.height * 0.7
        const distance = Math.sqrt(Math.pow(x - blobX, 2) + Math.pow(y - blobY, 2))
        setIsHovering(distance < 250)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <footer 
      id="footer-section"
      className="relative border-t overflow-hidden"
      style={{ 
        backgroundColor: '#4338ca',
        borderColor: 'rgba(255, 255, 255, 0.15)'
      }}
    >
      {/* Interactive blob - creates ambient gradient shifts within the footer */}
      <div 
        className="absolute pointer-events-none transition-all duration-1000 ease-out"
        style={{
          right: '8%',
          bottom: '20%',
          width: isHovering ? '400px' : '320px',
          height: isHovering ? '400px' : '320px',
          background: `radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)`,
          opacity: isHovering ? 1 : 0.5,
          filter: `blur(${isHovering ? '60px' : '50px'})`,
          transform: isHovering 
            ? `translate(${(mousePosition.x - window.innerWidth * 0.8) * 0.08}px, ${(mousePosition.y - 300) * 0.08}px) scale(1.15)` 
            : 'translate(0, 0) scale(1)',
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          animation: 'blob-morph 10s ease-in-out infinite',
          zIndex: 0
        }}
      />
      
      {/* Centered container */}
      <div 
        className="relative px-4 sm:px-6 md:px-8"
        style={{ 
          maxWidth: '1000px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingTop: '3rem',
          paddingBottom: '3rem',
          zIndex: 1
        }}
      >
        {/* Main footer content - Single centered block */}
        <div 
          className="flex flex-col items-center justify-center mb-12 md:mb-16"
          onMouseEnter={() => setPipelineHover(true)}
          onMouseLeave={() => setPipelineHover(false)}
        >
          
          {/* Icons and Headline row */}
          <div 
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-32 mb-6 transition-all duration-500"
            style={{
              opacity: pipelineHover ? 0.85 : 1,
              transform: pipelineHover ? 'translateY(-2px)' : 'translateY(0)',
              maxWidth: '900px',
              margin: '0 auto'
            }}
          >
            {/* Icons on the left */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
              {/* LinkedIn icon */}
              <a 
                href="https://www.linkedin.com/in/swethathanabalan/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:opacity-70"
                style={{ color: '#ffffff', cursor: 'pointer' }}
                aria-label="LinkedIn"
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              {/* Email icon */}
              <a 
                href="mailto:tys.swetha@gmail.com"
                className="group transition-all duration-300 hover:opacity-70"
                style={{ color: '#ffffff', cursor: 'pointer' }}
                aria-label="Email"
              >
                <svg 
                  width="30" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          
            {/* Headline on the right */}
            <div>
            <h3 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold"
              style={{ 
                color: '#ffffff',
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
                marginBottom: '8px'
              }}
            >
              <span 
                className="handwritten-accent group"
                style={{ 
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                Built end-to-end by me.
                <svg
                  className="handwritten-underline"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '0',
                    width: '100%',
                    height: '12px',
                    overflow: 'visible',
                    pointerEvents: 'none'
                  }}
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,8 Q50,4 100,7 T200,6"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: '200',
                      strokeDashoffset: '200',
                      transition: 'stroke-dashoffset 600ms ease-out',
                      opacity: 0.9
                    }}
                  />
                </svg>
              </span>
            </h3>
            <div 
              className="text-sm sm:text-base"
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.6',
                marginTop: '8px',
                maxWidth: '500px'
              }}
            >
              <p>Designed in Figma • Built with Kiro • AI-assisted with Claude & GPT • Version controlled with GitHub</p>
            </div>
          </div>
        </div>
      </div>
        
        {/* Copyright - Centered below divider */}
        <div 
          className="flex justify-center border-t w-full"
          style={{ 
            borderColor: 'rgba(255, 255, 255, 0.15)',
            paddingTop: '12px',
            marginTop: '12px'
          }}
        >
          <p 
            className="text-xs sm:text-sm text-center"
            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            © 2026 Swetha Thanabalan
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blob-morph {
          0%, 100% {
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          }
          25% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          75% {
            border-radius: 70% 30% 50% 60% / 40% 70% 50% 30%;
          }
        }

        /* Handwritten accent hover effect */
        .handwritten-accent:hover .handwritten-underline path {
          stroke-dashoffset: 0;
        }

        .handwritten-accent:hover p {
          transform: translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .handwritten-underline path {
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
