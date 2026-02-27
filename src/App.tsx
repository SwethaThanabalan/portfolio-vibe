import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import StrategicCaseStudy from './pages/StrategicCaseStudy'
import TalofaCaseStudy from './pages/TalofaCaseStudy'
import AdultYouCaseStudy from './pages/AdultYouCaseStudy'
import AmazonTeardownCaseStudy from './pages/AmazonTeardownCaseStudy'
import About from './pages/About'
import { projects } from './data/projects'

// Wrapper to determine which template to use
function ProjectRouter() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
  
  if (!project) {
    return <Navigate to="/" replace />
  }
  
  // Check if it's the Talofa case study
  if (id === 'talofa-games-retention') {
    return <TalofaCaseStudy />
  }
  
  // Check if it's the Adult You case study
  if (id === 'adult-you-platform') {
    return <AdultYouCaseStudy />
  }
  
  // Check if it's the Amazon teardown
  if (id === 'amazon-cancellation-teardown') {
    return <AmazonTeardownCaseStudy />
  }
  
  // Check if it's a strategic case study
  const isStrategic = project.scope && project.strategicDecision
  
  return isStrategic ? <StrategicCaseStudy /> : <ProjectDetail />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectRouter />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
