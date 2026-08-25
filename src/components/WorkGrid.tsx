import WorkCard from './WorkCard'
import { projects } from '../data/projects'

const WorkGrid = () => {
  return (
    <section 
      id="work"
      aria-labelledby="work-heading"
      className="py-20 md:py-32 px-6 md:px-8"
      style={{ maxWidth: 'var(--max-width)', margin: '0 auto', backgroundColor: 'var(--bg)' }}
    >
      {/* Section Heading */}
      <h2 
        id="work-heading"
        className="text-4xl md:text-5xl font-semibold mb-12 md:mb-16"
        style={{ color: 'var(--text)' }}
      >
        Selected Work
      </h2>
      
      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
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
