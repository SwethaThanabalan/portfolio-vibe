import Navbar from '../components/Navbar'

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-12">About Me</h1>
          
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                I'm a product designer with 5+ years of experience creating digital experiences 
                that users love. I believe great design is invisible—it just works.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                My approach combines user research, strategic thinking, and visual design to 
                solve complex problems. I've worked with startups and Fortune 500 companies, 
                designing products used by millions of people.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                When I'm not designing, you'll find me exploring new coffee shops, reading 
                design books, or experimenting with new prototyping tools.
              </p>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Skills</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Product Design</li>
                  <li>UX Research</li>
                  <li>Prototyping</li>
                  <li>Design Systems</li>
                  <li>User Testing</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Tools</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Figma</li>
                  <li>Sketch</li>
                  <li>Protopie</li>
                  <li>Principle</li>
                  <li>Adobe Creative Suite</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Let's work together</h2>
            <p className="text-lg text-gray-600 mb-6">
              I'm always interested in hearing about new projects and opportunities.
            </p>
            <a 
              href="mailto:hello@example.com"
              className="inline-block px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get in touch
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default About
