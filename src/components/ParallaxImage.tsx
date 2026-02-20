import { useParallax } from '../hooks/useParallax'

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
}

const ParallaxImage = ({ src, alt, speed = 0.3, className = '' }: ParallaxImageProps) => {
  const offset = useParallax(speed)

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ transform: `translateY(${offset}px)` }}
      />
    </div>
  )
}

export default ParallaxImage
