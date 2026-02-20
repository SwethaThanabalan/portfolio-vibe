import { Link } from 'react-router-dom'
import type { Project } from '../types'

interface WorkCardProps {
  project: Project
}

const WorkCard = ({ project }: WorkCardProps) => {
  return (
    <Link 
      to={`/project/${project.id}`}
      className="group block rounded-lg transition-all duration-300 hover:scale-[1.01]"
      style={{ backgroundColor: 'var(--card)' }}
    >
      {/* Image Container */}
      <div 
        className="w-full aspect-[4/3] rounded-t-lg mb-6 overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="px-6 pb-6">
        <h3 
          className="text-2xl md:text-3xl font-semibold mb-3 transition-colors"
          style={{ color: 'var(--text)' }}
        >
          {project.title}
        </h3>
        
        <p 
          className="text-base md:text-lg mb-4 leading-relaxed"
          style={{ color: 'var(--muted)' }}
        >
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tools.slice(0, 3).map((tool) => (
            <span 
              key={tool}
              className="px-3 py-1 text-sm rounded-full"
              style={{ 
                backgroundColor: 'var(--bg)',
                color: 'var(--muted)',
                border: '1px solid var(--border)'
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default WorkCard
