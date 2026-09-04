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
    </div>
  )
}
