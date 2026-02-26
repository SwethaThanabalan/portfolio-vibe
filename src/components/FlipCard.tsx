import { useState } from 'react'

interface FlipCardProps {
  title: string
  description: string
}

const FlipCard = ({ title, description}: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="flip-card-container"
      style={{
        perspective: '1000px',
        height: '120px',
        cursor: 'pointer'
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="flip-card-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.7s cubic-bezier(0.4, 0.0, 0.2, 1)',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front of card */}
        <div
          className="flip-card-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            border: '2px solid #fca5a5',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(239, 68, 68, 0.25)'
            e.currentTarget.style.borderColor = '#f87171'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
            e.currentTarget.style.borderColor = '#fca5a5'
          }}
        >
          {/* Animated background pattern */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
              animation: 'pulse 3s ease-in-out infinite'
            }}
          />
          
          
          <h3 
            className="text-xl font-bold text-red-900 text-center"
            style={{ zIndex: 1 }}
          >
            {title}
          </h3>
          
          {/* Click hint */}
          <div 
            style={{
              fontSize: '12px',
              color: '#991b1b',
              opacity: 0.6,
              zIndex: 1,
              animation: 'fadeInOut 2s ease-in-out infinite'
            }}
          >
            Click to learn more
          </div>
        </div>

        {/* Back of card */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)',
            border: '2px solid #b91c1c',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotateY(180deg)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}
        >
          {/* Animated background pattern */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              animation: 'pulse 3s ease-in-out infinite reverse'
            }}
          />
          
          <p 
            className="text-base leading-relaxed text-center"
            style={{ 
              color: '#fef2f2',
              zIndex: 1
            }}
          >
            {description}
          </p>
          
          {/* Click hint */}
          <div 
            style={{
              fontSize: '12px',
              color: '#fecaca',
              opacity: 0.8,
              marginTop: '16px',
              zIndex: 1
            }}
          >
            Click to flip back
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1) rotate(180deg);
            opacity: 0.8;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}

export default FlipCard
