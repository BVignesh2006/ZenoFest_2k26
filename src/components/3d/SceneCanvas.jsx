import React, { useState } from 'react'
import StarfieldTunnel from './StarfieldTunnel'
import QuantumSphere from './QuantumSphere'
import './SceneCanvas.css'

/**
 * Universal WebGL Viewport Wrapper
 * Rendered continuously in the background layer of ZenoFest 2K26.
 * Supports switching between Starfield Tunnel (Model 2) and Quantum Sphere (Model 1).
 */

export default function SceneCanvas() {
  const [modelMode, setModelMode] = useState('tunnel') // 'tunnel' | 'sphere'

  return (
    <div className="scene-canvas-wrapper">
      {/* 3D WebGL Scene Background Layer */}
      {modelMode === 'tunnel' && <StarfieldTunnel speedMultiplier={1.2} />}
      {modelMode === 'sphere' && <QuantumSphere radius={2.5} detail={4} />}

      {/* Floating 3D Background Controller Badge */}
      <div className="scene-mode-toggle">
        <span className="toggle-label">FX ENGINE</span>
        <button
          className={`toggle-btn ${modelMode === 'tunnel' ? 'active' : ''}`}
          onClick={() => setModelMode('tunnel')}
          title="Warp Speed Starfield Tunnel (Model 2)"
        >
          TUNNEL
        </button>
        <button
          className={`toggle-btn ${modelMode === 'sphere' ? 'active' : ''}`}
          onClick={() => setModelMode('sphere')}
          title="Procedural Quantum Sphere (Model 1)"
        >
          SPHERE
        </button>
      </div>
    </div>
  )
}
