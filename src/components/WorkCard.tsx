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
          <p className="type-eyebrow mb-2">{project.descriptor}</p>
        )}

        {/* Title */}
        <h3 className="type-h2 mb-3 transition-colors duration-200 group-hover:text-[var(--accent)]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="type-body mb-3">
          {project.description}
        </p>

        {/* Outcome */}
        {project.result && (
          <p className="type-body-sm font-medium" style={{ color: 'var(--accent)' }}>
            {project.result}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
          {(project.keywords || project.tools).slice(0, 4).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default WorkCard
