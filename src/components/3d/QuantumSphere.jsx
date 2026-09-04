import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Model 1: Quantum Sphere (Procedural Dynamic Particle Sphere & Wireframe Mesh)
 * With 2-Second Persistent Fluid Trail & Ripple System (Desktop & Mobile Touch)
 * 
 * Trail Queue Architecture:
 * 1. Tracks recent pointer/touch positions as fluid trail nodes:
 *    node = { x, y, age: 0, maxAge: 2.0, intensity }
 * 2. Nodes fade out over exactly 2.0 seconds.
 * 3. Sphere vertices sample all active trail nodes in range to produce a mild liquid trail ripple.
 */

export default function QuantumSphere({ radius = 2.4, detail = 4 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    // 1. Scene & Camera Setup - Pitch Black Theme
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#000000')

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.set(0, 0, 7.5)

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 2. Base Geometry Setup
    const baseGeo = new THREE.IcosahedronGeometry(radius, detail)
    const basePositions = baseGeo.attributes.position.clone()
    const vertexCount = basePositions.count

    const pointPositions = new Float32Array(vertexCount * 3)
    const pointColors = new Float32Array(vertexCount * 3)

    const colorCyan = new THREE.Color('#06b6d4')
    const colorViolet = new THREE.Color('#8b5cf6')
    const colorPink = new THREE.Color('#ec4899')

    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3))
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(pointColors, 3))

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    })

    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial)
    scene.add(pointsMesh)

    // Wireframe Lattice
    const wireframeGeo = new THREE.WireframeGeometry(baseGeo)
    const wireframePositions = wireframeGeo.attributes.position.array
    const wireCount = wireframePositions.length / 3

    const dynamicWirePositions = new Float32Array(wireframePositions.length)
    const dynamicWireColors = new Float32Array(wireframePositions.length)

    const wireGeometry = new THREE.BufferGeometry()
    wireGeometry.setAttribute('position', new THREE.BufferAttribute(dynamicWirePositions, 3))
    wireGeometry.setAttribute('color', new THREE.BufferAttribute(dynamicWireColors, 3))

    const wireMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5
    })

    const wireframeMesh = new THREE.LineSegments(wireGeometry, wireMaterial)
    scene.add(wireframeMesh)

    // Inner Core
    const coreGeo = new THREE.IcosahedronGeometry(radius * 0.55, 2)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    scene.add(coreMesh)

    // 3. 2-Second Persistent Fluid Trail System (Mouse & Mobile Touch)
    const MAX_TRAIL_NODES = 35
    const TRAIL_MAX_AGE = 2.0 // Exactly 2.0 seconds decay duration
    let trailNodes = []
    let lastAddX = -9999
    let lastAddY = -9999

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2

    const addTrailNode = (clientX, clientY) => {
      pointerX = clientX
      pointerY = clientY

      const worldX = (clientX / window.innerWidth - 0.5) * 6.0
      const worldY = -(clientY / window.innerHeight - 0.5) * 4.0

      const distFromLast = Math.sqrt((worldX - lastAddX) ** 2 + (worldY - lastAddY) ** 2)

      if (distFromLast > 0.15) {
        const now = clock.getElapsedTime()
        trailNodes.push({
          x: worldX,
          y: worldY,
          birthTime: now
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

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchMove, { passive: true })

    // 4. Ultra-Smooth Wave + Trail Animation Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()
      const amplitude = 0.18

      // Prune trail nodes older than 2.0 seconds
      trailNodes = trailNodes.filter((node) => time - node.birthTime <= TRAIL_MAX_AGE)

      // Slow smooth rotation
      pointsMesh.rotation.y = time * 0.04
      pointsMesh.rotation.x = time * 0.02
      wireframeMesh.rotation.y = time * 0.04
      wireframeMesh.rotation.x = time * 0.02
      coreMesh.rotation.y = -time * 0.06

      // Fixed background scene rotation (no cursor parallax shaking)
      scene.rotation.y = 0
      scene.rotation.x = 0

      // Mutate points using Sinusoidal Wave + 2-Second Trail Ripples
      const baseArr = basePositions.array
      const pointPosArr = pointsGeometry.attributes.position.array
      const pointColArr = pointsGeometry.attributes.color.array

      const activeRadius = 3.0

      for (let i = 0; i < vertexCount; i++) {
        const x = baseArr[i * 3]
        const y = baseArr[i * 3 + 1]
        const z = baseArr[i * 3 + 2]

        const len = Math.sqrt(x * x + y * y + z * z) || 1
        const nx = x / len
        const ny = y / len
        const nz = z / len

        // Base Wave Displacement
        const baseDisplacement = Math.sin(x * 1.8 + time * 0.7) * Math.cos(y * 1.8 + time * 0.7) * amplitude

        // Accumulate liquid bulge from active 2-second trail nodes
        let totalTrailBulge = 0

        for (let j = 0; j < trailNodes.length; j++) {
          const node = trailNodes[j]
          const age = time - node.birthTime // 0.0 to 2.0s
          const fade = 1.0 - (age / TRAIL_MAX_AGE) // 1.0 down to 0.0

          const dist = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)

          if (dist < activeRadius) {
            const force = Math.exp(-(dist * dist) / 1.8) * fade * 0.35
            totalTrailBulge += Math.sin(dist * 3.5 - age * 4.0) * force
          }
        }

        const rNew = len + baseDisplacement + totalTrailBulge

        pointPosArr[i * 3] = nx * rNew
        pointPosArr[i * 3 + 1] = ny * rNew
        pointPosArr[i * 3 + 2] = nz * rNew

        const normDist = (rNew - (radius - amplitude)) / (2 * amplitude)
        const lerpColor = new THREE.Color()

        if (normDist < 0.5) {
          lerpColor.copy(colorCyan).lerp(colorViolet, normDist * 2)
        } else {
          lerpColor.copy(colorViolet).lerp(colorPink, (normDist - 0.5) * 2)
        }

        pointColArr[i * 3] = lerpColor.r
        pointColArr[i * 3 + 1] = lerpColor.g
        pointColArr[i * 3 + 2] = lerpColor.b
      }

      pointsGeometry.attributes.position.needsUpdate = true
      pointsGeometry.attributes.color.needsUpdate = true

      // Update wireframe
      const wirePosArr = wireGeometry.attributes.position.array
      const wireColArr = wireGeometry.attributes.color.array

      for (let i = 0; i < wireCount; i++) {
        const origX = wireframePositions[i * 3]
        const origY = wireframePositions[i * 3 + 1]
        const origZ = wireframePositions[i * 3 + 2]

        const len = Math.sqrt(origX * origX + origY * origY + origZ * origZ) || 1
        const nx = origX / len
        const ny = origY / len
        const nz = origZ / len

        const baseDisplacement = Math.sin(origX * 1.8 + time * 0.7) * Math.cos(origY * 1.8 + time * 0.7) * amplitude

        let totalTrailBulge = 0
        for (let j = 0; j < trailNodes.length; j++) {
          const node = trailNodes[j]
          const age = time - node.birthTime
          const fade = 1.0 - (age / TRAIL_MAX_AGE)

          const dist = Math.sqrt((origX - node.x) ** 2 + (origY - node.y) ** 2)

          if (dist < activeRadius) {
            const force = Math.exp(-(dist * dist) / 1.8) * fade * 0.35
            totalTrailBulge += Math.sin(dist * 3.5 - age * 4.0) * force
          }
        }

        const rNew = len + baseDisplacement + totalTrailBulge

        wirePosArr[i * 3] = nx * rNew
        wirePosArr[i * 3 + 1] = ny * rNew
        wirePosArr[i * 3 + 2] = nz * rNew

        wireColArr[i * 3] = colorCyan.r * 0.8
        wireColArr[i * 3 + 1] = colorCyan.g * 0.8
        wireColArr[i * 3 + 2] = colorCyan.b * 0.8
      }

      wireGeometry.attributes.position.needsUpdate = true
      wireGeometry.attributes.color.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // Window Resize
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
      window.removeEventListener('resize', handleResize)

      baseGeo.dispose()
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      wireframeGeo.dispose()
      wireGeometry.dispose()
      wireMaterial.dispose()
      coreGeo.dispose()
      coreMat.dispose()

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [radius, detail])

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
