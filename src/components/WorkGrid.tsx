import WorkCard from './WorkCard'
import { projects } from '../data/projects'

const WorkGrid = () => {
  return (
    <section 
      id="work"
      className="py-20 md:py-32 px-6 md:px-8"
      style={{ maxWidth: 'var(--max-width)', margin: '0 auto', backgroundColor: 'var(--bg)' }}
    >
      {/* Section Heading */}
      <h2 
        className="text-4xl md:text-5xl font-semibold mb-12 md:mb-16"
        style={{ color: 'var(--text)' }}
      >
        Selected Work
      </h2>
      
      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
        {projects.slice(0, 4).map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

export default WorkGrid
