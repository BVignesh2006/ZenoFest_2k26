import React, { useState, useEffect, useCallback } from 'react'
import './CrackEffectOverlay.css'

/**
 * Compact Animated Cyber/Glass Cracking Overlay Effect
 * Reduced radius area of effect for sharp, localized crack impacts on click/touch.
 */

function generateCrackCluster(cx, cy) {
  const branchCount = 5 + Math.floor(Math.random() * 3) // 5 to 7 sharp branches
  const branches = []
  const sparks = []

  const colors = ['#06b6d4', '#8b5cf6', '#3b82f6', '#ec4899', '#ffffff']

  for (let i = 0; i < branchCount; i++) {
    const baseAngle = (i * (360 / branchCount) + (Math.random() * 20 - 10)) * (Math.PI / 180)
    let currX = cx
    let currY = cy

    const segmentCount = 2 + Math.floor(Math.random() * 2) // 2 to 3 compact segments
    let pathD = `M ${cx} ${cy}`

    let currentAngle = baseAngle

    for (let j = 0; j < segmentCount; j++) {
      const stepLength = 8 + Math.random() * 14 // Compact segment step
      currentAngle += (Math.random() * 0.5 - 0.25)

      currX += Math.cos(currentAngle) * stepLength
      currY += Math.sin(currentAngle) * stepLength

      pathD += ` L ${currX.toFixed(1)} ${currY.toFixed(1)}`

      // Compact side micro-crack branch
      if (Math.random() < 0.35 && j > 0) {
        const sideAngle = currentAngle + (Math.random() < 0.5 ? 1 : -1) * (0.6 + Math.random() * 0.4)
        const sideLen = 6 + Math.random() * 10
        const sideX = currX + Math.cos(sideAngle) * sideLen
        const sideY = currY + Math.sin(sideAngle) * sideLen
        pathD += ` M ${currX.toFixed(1)} ${currY.toFixed(1)} L ${sideX.toFixed(1)} ${sideY.toFixed(1)} M ${currX.toFixed(1)} ${currY.toFixed(1)}`
      }
    }

    branches.push({
      id: `${cx}-${cy}-${i}`,
      pathD,
      color: colors[i % colors.length]
    })
  }

  // Generate 10 compact flying spark particles
  for (let k = 0; k < 10; k++) {
    const angle = Math.random() * Math.PI * 2
    const distance = 12 + Math.random() * 25
    const tx = Math.cos(angle) * distance
    const ty = Math.sin(angle) * distance
    const color = colors[Math.floor(Math.random() * colors.length)]
    const size = 1.5 + Math.random() * 2.5

    sparks.push({
      id: `spark-${k}`,
      tx,
      ty,
      color,
      size
    })
  }

  return { branches, sparks }
}

export default function CrackEffectOverlay() {
  const [cracks, setCracks] = useState([])

  const handleClick = useCallback((e) => {
    const cx = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2)
    const cy = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2)

    const id = Date.now() + Math.random()
    const crackData = generateCrackCluster(cx, cy)

    setCracks((prev) => [
      ...prev,
      {
        id,
        cx,
        cy,
        branches: crackData.branches,
        sparks: crackData.sparks
      }
    ])

    setTimeout(() => {
      setCracks((prev) => prev.filter((c) => c.id !== id))
    }, 1100)
  }, [])

  useEffect(() => {
    window.addEventListener('pointerdown', handleClick, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', handleClick)
    }
  }, [handleClick])

  return (
    <div className="crack-overlay-container">
      {cracks.map((crack) => (
        <div key={crack.id} className="crack-instance" style={{ left: crack.cx, top: crack.cy }}>
          {/* Shockwave expanding ring */}
          <div className="crack-shockwave" />
          <div className="crack-shockwave-inner" />

          {/* SVG Fractal Crack Lines - Compact Viewbox */}
          <svg className="crack-svg-canvas" viewBox="-60 -60 120 120">
            {crack.branches.map((b) => (
              <path
                key={b.id}
                d={b.pathD.replace(new RegExp(`${crack.cx.toFixed(1)} ${crack.cy.toFixed(1)}`, 'g'), '0 0')}
                className="crack-path-line"
                style={{ '--stroke-color': b.color }}
              />
            ))}
          </svg>

          {/* Flying Neon Spark Particles */}
          {crack.sparks.map((spark) => (
            <div
              key={spark.id}
              className="crack-spark-particle"
              style={{
                '--tx': `${spark.tx}px`,
                '--ty': `${spark.ty}px`,
                '--spark-color': spark.color,
                width: `${spark.size}px`,
                height: `${spark.size}px`
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
