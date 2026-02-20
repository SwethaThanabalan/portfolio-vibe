import { Link } from 'react-router-dom'
import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link 
      to={`/project/${project.id}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[16/11] bg-gray-100 mb-6 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-gray-900/10">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      
      <div className="space-y-3">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight transition-colors duration-300 group-hover:text-gray-600">
          {project.title}
        </h3>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          {project.description}
        </p>
      </div>
    </Link>
  )
}

export default ProjectCard
