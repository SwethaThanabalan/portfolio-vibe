import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale'
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0,
  animation = 'fade-up'
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation(0.1)

  const animations = {
    'fade-up': 'translate-y-12 opacity-0',
    'fade-in': 'opacity-0',
    'slide-left': 'translate-x-12 opacity-0',
    'slide-right': '-translate-x-12 opacity-0',
    'scale': 'scale-95 opacity-0'
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 translate-x-0 scale-100 opacity-100' : animations[animation]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default AnimatedSection
