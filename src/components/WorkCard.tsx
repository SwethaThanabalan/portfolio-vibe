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
          alt={`${project.title}${project.descriptor ? ' — ' + project.descriptor : ''}`}
          className="w-full h-full object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="px-6 pb-6">
        {/* Machine-readable descriptor */}
        {project.descriptor && (
          <p 
            className="text-xs font-medium uppercase tracking-wide mb-2"
            style={{ color: 'var(--muted)' }}
          >
            {project.descriptor}
          </p>
        )}

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

        {/* Outcome line */}
        {project.result && (
          <p 
            className="text-sm font-medium mb-4"
            style={{ color: 'var(--accent)' }}
          >
            {project.result}
          </p>
        )}
        
        {/* Tags — show keywords if available, otherwise tools */}
        <div className="flex flex-wrap gap-2">
          {(project.keywords || project.tools).slice(0, 4).map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 text-sm rounded-full"
              style={{ 
                backgroundColor: 'var(--bg)',
                color: 'var(--muted)',
                border: '1px solid var(--border)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default WorkCard
