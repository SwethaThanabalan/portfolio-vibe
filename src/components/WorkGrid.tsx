import WorkCard from './WorkCard'
import { projects } from '../data/projects'

const FEATURED = ['adult-you-platform', 'sahay-home-companion', 'talofa-games-retention', 'septa-mobile-redesign']
const MORE_WORK = ['wanderai', 'amazon-cancellation-teardown']

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
        className="type-h1 mb-14 md:mb-16"
      >
        Selected Work
      </h2>

      {/* Grid — 2 col with generous gap */}
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
        {FEATURED.map((id) => {
          const project = projects.find(p => p.id === id)
          if (!project) return null
          return <WorkCard key={project.id} project={project} />
        })}
      </div>

      {/* More Work */}
      <h3 className="type-h3 mt-24 mb-10 text-[var(--muted)]">More work</h3>
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
        {MORE_WORK.map((id) => {
          const project = projects.find(p => p.id === id)
          if (!project) return null
          return <WorkCard key={project.id} project={project} />
        })}
      </div>
    </section>
  )
}

export default WorkGrid
