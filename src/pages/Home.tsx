import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WorkGrid from '../components/WorkGrid'
import Capabilities from '../components/Capabilities'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO />
      <Navbar />
      <main id="main-content">
        <Hero />
        <WorkGrid />
        <Capabilities />
      </main>
      <Footer />
    </div>
  )
}

export default Home
