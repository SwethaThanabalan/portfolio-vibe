import Hero from '../components/Hero'
import WorkGrid from '../components/WorkGrid'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <WorkGrid />
      </main>
      <Footer />

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600">© 2024 Your Name. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="mailto:hello@example.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                Email
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                LinkedIn
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                Dribbble
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
