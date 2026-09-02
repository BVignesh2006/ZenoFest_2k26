import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Model 2: Starfield Tunnel (Warp Speed Particle Accelerator)
 * With 2-Second Persistent Fluid Trail & Ripple System (Desktop & Mobile Touch)
 * 
 * Trail Queue Architecture:
 * 1. Tracks recent pointer/touch positions as fluid trail nodes:
 *    node = { x, y, age: 0, maxAge: 2.0, intensity }
 * 2. Nodes fade out over exactly 2.0 seconds.
 * 3. 3D particles sample all active trail nodes in range to produce a mild liquid trail ripple.
 */

export default function StarfieldTunnel({ active = true, speedMultiplier = 0.4 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    // 1. Scene & Camera Setup - Pitch Black Theme
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#000000')
    scene.fog = new THREE.FogExp2('#000000', 0.018)

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000)
    camera.position.set(0, 0, 5)

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 2. Particle Geometry
    const PARTICLE_COUNT = 2400
    const R_INNER = 2.5
    const R_OUTER = 25.0
    const Z_DEPTH = 75.0
    const Z_NEAR = 6.0

    const positions = new Float32Array(PARTICLE_COUNT * 6)
    const colors = new Float32Array(PARTICLE_COUNT * 6)
    const particleData = []

    const colorCyan = new THREE.Color('#06b6d4')
    const colorViolet = new THREE.Color('#8b5cf6')
    const colorWhite = new THREE.Color('#ffffff')

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const radius = R_INNER + Math.random() * (R_OUTER - R_INNER)
      const x = radius * Math.cos(theta)
      const y = radius * Math.sin(theta)
      const z = -Math.random() * Z_DEPTH

      const speed = 2.5 + Math.random() * 2.0

      particleData.push({
        radius,
        theta,
        baseX: x,
        baseY: y,
        x,
        y,
        z,
        baseSpeed: speed,
        streakLength: 0.6 + Math.random() * 1.3
      })

      const mixRatio = Math.random()
      const pColor = new THREE.Color()

      if (mixRatio < 0.45) {
        pColor.copy(colorCyan).lerp(colorViolet, Math.random())
      } else if (mixRatio < 0.8) {
        pColor.copy(colorViolet).lerp(colorWhite, Math.random() * 0.4)
      } else {
        pColor.copy(colorWhite)
      }

      // Head vertex
      colors[i * 6] = pColor.r * 1.3
      colors[i * 6 + 1] = pColor.g * 1.3
      colors[i * 6 + 2] = pColor.b * 1.3

      // Tail vertex
      colors[i * 6 + 3] = pColor.r * 0.2
      colors[i * 6 + 4] = pColor.g * 0.2
      colors[i * 6 + 5] = pColor.b * 0.2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5
    })

    const tunnelLines = new THREE.LineSegments(geometry, material)
    scene.add(tunnelLines)

    // Ambient floating dust particles
    const DUST_COUNT = 900
    const dustGeometry = new THREE.BufferGeometry()
    const dustPositions = new Float32Array(DUST_COUNT * 3)

    for (let i = 0; i < DUST_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const radius = Math.random() * R_OUTER
      dustPositions[i * 3] = radius * Math.cos(theta)
      dustPositions[i * 3 + 1] = radius * Math.sin(theta)
      dustPositions[i * 3 + 2] = -Math.random() * Z_DEPTH
    }

    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.18,
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    })

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial)
    scene.add(dustPoints)

    // 3. 2-Second Persistent Fluid Trail System (Mouse & Mobile Touch)
    const MAX_TRAIL_NODES = 35
    const TRAIL_MAX_AGE = 2.0 // Exactly 2.0 seconds decay duration
    let trailNodes = []
    let lastAddX = -9999
    let lastAddY = -9999

    let targetSpeedBoost = 0
    let currentSpeedBoost = 0
    let lastScrollY = window.scrollY
    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2

    const addTrailNode = (clientX, clientY) => {
      pointerX = clientX
      pointerY = clientY

      // Map client screen coordinates to world space units
      const worldX = (clientX / window.innerWidth - 0.5) * 14.0
      const worldY = -(clientY / window.innerHeight - 0.5) * 9.0

      const distFromLast = Math.sqrt((worldX - lastAddX) ** 2 + (worldY - lastAddY) ** 2)

      // Add new trail node if moved at least 0.2 units
      if (distFromLast > 0.2) {
        const now = clock.getElapsedTime()
        trailNodes.push({
          x: worldX,
          y: worldY,
          birthTime: now,
          vx: (worldX - lastAddX) * 0.3,
          vy: (worldY - lastAddY) * 0.3
        })

        if (trailNodes.length > MAX_TRAIL_NODES) {
          trailNodes.shift()
        }

        lastAddX = worldX
        lastAddY = worldY
      }
    }

    const handlePointerMove = (e) => {
      addTrailNode(e.clientX, e.clientY)
    }

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        addTrailNode(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleScroll = () => {
      const deltaY = Math.abs(window.scrollY - lastScrollY)
      targetSpeedBoost = Math.min(deltaY * 0.15, 12.0)
      lastScrollY = window.scrollY
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    // 4. Ultra-Smooth Fluid Trail Animation Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const delta = Math.min(clock.getDelta(), 0.05)
      const currentTime = clock.getElapsedTime()

      // Prune trail nodes older than 2.0 seconds
      trailNodes = trailNodes.filter((node) => currentTime - node.birthTime <= TRAIL_MAX_AGE)

      // Decay scroll speed boost
      currentSpeedBoost += (targetSpeedBoost - currentSpeedBoost) * 0.05
      targetSpeedBoost *= 0.95

      const totalSpeedMult = speedMultiplier * (1 + currentSpeedBoost * 0.05)

      // Camera parallax
      const camTargetX = (pointerX / window.innerWidth - 0.5) * 0.5
      const camTargetY = -(pointerY / window.innerHeight - 0.5) * 0.5
      camera.position.x += (camTargetX - camera.position.x) * 0.03
      camera.position.y += (camTargetY - camera.position.y) * 0.03
      camera.rotation.z += 0.0003 * totalSpeedMult

      // Update 3D particle positions with 2-Second Fluid Trail Ripples
      const posAttr = geometry.attributes.position
      const posArray = posAttr.array
      const activeRadius = 3.5

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particleData[i]

        // Advance Z forward
        const moveStep = (p.baseSpeed * totalSpeedMult) * delta * 2.0
        p.z += moveStep

        if (p.z > Z_NEAR) {
          p.z = -Z_DEPTH
          p.theta = Math.random() * Math.PI * 2
          p.radius = R_INNER + Math.random() * (R_OUTER - R_INNER)
          p.baseX = p.radius * Math.cos(p.theta)
          p.baseY = p.radius * Math.sin(p.theta)
        }

        // Accumulate liquid forces from all active trail nodes within 2 seconds
        let totalDx = 0
        let totalDy = 0

        for (let j = 0; j < trailNodes.length; j++) {
          const node = trailNodes[j]
          const age = currentTime - node.birthTime // 0.0 to 2.0s
          const fade = 1.0 - (age / TRAIL_MAX_AGE)  // 1.0 down to 0.0

          const dx = p.baseX - node.x
          const dy = p.baseY - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < activeRadius) {
            // Mild fluid wave force
            const force = Math.exp(-(dist * dist) / (2 * 1.8 * 1.8)) * fade * 0.45
            const wave = Math.sin(dist * 3.0 - age * 4.5)

            totalDx += (dx / (dist || 1)) * force * wave + node.vx * force * 0.3
            totalDy += (dy / (dist || 1)) * force * wave + node.vy * force * 0.3
          }
        }

        p.x = p.baseX + totalDx
        p.y = p.baseY + totalDy

        const warpStreak = p.streakLength * (1 + currentSpeedBoost * 0.08)

        // Head
        posArray[i * 6] = p.x
        posArray[i * 6 + 1] = p.y
        posArray[i * 6 + 2] = p.z

        // Tail
        posArray[i * 6 + 3] = p.x - totalDx * 0.35
        posArray[i * 6 + 4] = p.y - totalDy * 0.35
        posArray[i * 6 + 5] = p.z - warpStreak
      }

      posAttr.needsUpdate = true

      // Update dust particles
      const dustPos = dustGeometry.attributes.position.array
      for (let i = 0; i < DUST_COUNT; i++) {
        dustPos[i * 3 + 2] += (1.8 * totalSpeedMult) * delta
        if (dustPos[i * 3 + 2] > Z_NEAR) {
          dustPos[i * 3 + 2] = -Z_DEPTH
        }
      }
      dustGeometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // Window Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return
      const newW = containerRef.current.clientWidth || window.innerWidth
      const newH = containerRef.current.clientHeight || window.innerHeight

      camera.aspect = newW / newH
      camera.updateProjectionMatrix()
      renderer.setSize(newW, newH)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)

      geometry.dispose()
      material.dispose()
      dustGeometry.dispose()
      dustMaterial.dispose()

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [speedMultiplier])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    />
  )
}
