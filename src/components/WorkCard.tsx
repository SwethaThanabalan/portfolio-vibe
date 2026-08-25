import { Link } from 'react-router-dom'
import type { Project } from '../types'

interface WorkCardProps {
  project: Project
}

const WorkCard = ({ project }: WorkCardProps) => {
  return (
    <Link
      to={`/project/${project.id}`}
      className="group block"
    >
      {/* Image — editorial framing, no rounded corners */}
      <div className="w-full aspect-[4/3] overflow-hidden mb-5 border border-[var(--border)]">
        <img
          src={project.thumbnail}
          alt={`${project.title}${project.descriptor ? ' — ' + project.descriptor : ''}`}
          className="w-full h-full object-cover object-bottom transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div>
        {/* Descriptor */}
        {project.descriptor && (
          <p className="section-label mb-2">
            {project.descriptor}
          </p>
        )}

        {/* Title — editorial serif */}
        <h3
          className="font-editorial text-2xl md:text-[1.75rem] font-normal mb-3 transition-colors duration-200 group-hover:text-[var(--accent)]"
          style={{ letterSpacing: '-0.02em', lineHeight: '1.2' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-[15px] leading-relaxed mb-3"
          style={{ color: 'var(--text-secondary)', maxWidth: '48ch' }}
        >
          {project.description}
        </p>

        {/* Outcome — quiet accent */}
        {project.result && (
          <p
            className="text-sm font-medium"
            style={{ color: 'var(--accent)' }}
          >
            {project.result}
          </p>
        )}

        {/* Tags — subtle underlined text, not pills */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
          {(project.keywords || project.tools).slice(0, 4).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default WorkCard
