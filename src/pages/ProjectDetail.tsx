import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import AnimatedSection from '../components/AnimatedSection'
import ParallaxImage from '../components/ParallaxImage'
import { projects } from '../data/projects'

const ProjectDetail = () => {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.pageYOffset / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <AnimatedSection animation="fade-in">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors group">
              <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to projects
            </Link>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <AnimatedSection animation="fade-up">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">{project.title}</h1>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={100}>
                <p className="text-xl text-gray-600 leading-relaxed">{project.description}</p>
              </AnimatedSection>
            </div>
            
            <AnimatedSection animation="slide-left" delay={200}>
              <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Role</h3>
                  <p className="text-gray-600">{project.role}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Duration</h3>
                  <p className="text-gray-600">{project.duration}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm shadow-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Hero Image with Parallax */}
          <AnimatedSection animation="scale" delay={300}>
            <ParallaxImage 
              src={project.images[0]} 
              alt={project.title}
              speed={0.2}
              className="rounded-2xl overflow-hidden mb-20 shadow-2xl"
            />
          </AnimatedSection>
        </section>

        {/* Overview */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-16">
              {project.overview}
            </p>
          </AnimatedSection>

          {/* Challenge */}
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-16">
              {project.challenge}
            </p>
          </AnimatedSection>

          {/* Solution */}
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Solution</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-16">
              {project.solution}
            </p>
          </AnimatedSection>
        </section>

        {/* Additional Images */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {project.images.slice(1).map((image, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 group">
                  <img 
                    src={image} 
                    alt={`${project.title} - Image ${index + 2}`}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Next Project */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="border-t border-gray-200 pt-12">
            <Link 
              to="/"
              className="inline-flex items-center text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              View all projects
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProjectDetail
