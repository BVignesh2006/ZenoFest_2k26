import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Timeline from './components/Timeline'
import Events from './components/Events'
import SceneCanvas from './components/3d/SceneCanvas'
import CrackEffectOverlay from './components/fx/CrackEffectOverlay'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)

  const handleLoadingComplete = () => {
    setLoading(false)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  useEffect(() => {
    const handleSpace = (e) => {
      if (e.code === 'Space' && loading) {
        handleLoadingComplete()
      }
    }
    window.addEventListener('keydown', handleSpace)
    return () => window.removeEventListener('keydown', handleSpace)
  }, [loading])

  return (
    <>
      <SceneCanvas />
      <CrackEffectOverlay />
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className="app">
        <Navbar />
        <Home />
        <About />
        <Events />
        <Timeline />
      </div>
    </>
  )
}

export default App