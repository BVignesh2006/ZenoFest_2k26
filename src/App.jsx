import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import About from './components/About'
import Timeline from './components/Timeline'
import Events from './components/Events'
import SceneCanvas from './components/3d/SceneCanvas'
import CrackEffectOverlay from './components/fx/CrackEffectOverlay'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleSpace = (e) => {
      if (e.code === 'Space' && loading) {
        setLoading(false)
      }
    }
    window.addEventListener('keydown', handleSpace)
    return () => window.removeEventListener('keydown', handleSpace)
  }, [loading])

  return (
    <>
      <SceneCanvas />
      <CrackEffectOverlay />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div className="app">
        <Navbar />
        <About />
        <Events />
        <Timeline />
      </div>
    </>
  )
}

export default App