import { useState } from 'react'

interface FlipCardProps {
  title: string
  description: string
}

const FlipCard = ({ title, description }: FlipCardProps) => {
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
          transition: 'transform 0.6s',
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
            backgroundColor: '#fbeeeeff',
            border: '1px solid #ffe6e6ff',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)'
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h3 className="text-xl font-bold text-stone-900 text-center">
            {title}
          </h3>
        </div>

        {/* Back of card */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotateY(180deg)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <p className="text-base text-stone-900 leading-relaxed text-center">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FlipCard
