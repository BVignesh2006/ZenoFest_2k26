import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    window.location.replace('https://zenofest.vercel.app')
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#09090b',
      color: '#f4f4f5',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700' }}>Redirecting...</h1>
      <p style={{ color: '#a1a1aa', marginBottom: '1.5rem' }}>
        This version of ZenoFest is deprecated. Moving you to the official site.
      </p>
      <a 
        href="https://zenofest.vercel.app" 
        style={{
          color: '#38bdf8',
          textDecoration: 'underline',
          fontSize: '1.1rem',
          fontWeight: '500'
        }}
      >
        Click here if you are not redirected automatically
      </a>
    </div>
  )
}

export default App