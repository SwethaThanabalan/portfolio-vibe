import WorkCard from './WorkCard'
import { projects } from '../data/projects'

const WorkGrid = () => {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-20 md:py-28 layout-wide"
    >
      {/* Section Heading — editorial serif */}
      <h2
        id="work-heading"
        className="font-editorial text-3xl md:text-4xl font-normal mb-14 md:mb-16"
        style={{ color: 'var(--text)' }}
      >
        Selected Work
      </h2>

      {/* Grid — 2 col with generous gap */}
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
        {['sahay-home-companion', 'talofa-games-retention', 'septa-mobile-redesign', 'adult-you-platform'].map((id) => {
          const project = projects.find(p => p.id === id)
          if (!project) return null
          return <WorkCard key={project.id} project={project} />
        })}
      </div>
    </section>
  )
}

export default WorkGrid
