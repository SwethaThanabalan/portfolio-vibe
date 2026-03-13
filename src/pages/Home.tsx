import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WorkGrid from '../components/WorkGrid'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <WorkGrid />
      </main>
      <Footer />
    </div>
  )
}

export default Home
