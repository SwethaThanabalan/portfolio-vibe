import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
