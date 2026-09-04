import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Terminal, ChevronDown, ArrowRight } from 'lucide-react'
import './Home.css'

const ZENO_LETTERS = ['Z', 'E', 'N', 'O', 'F', 'E', 'S', 'T']

export default function Home() {
  const canvasRef = useRef(null)
  const letterRefs = useRef([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Lightning arcs generator with recursive midpoint displacement
    let lightningArcs = []

    const createLightning = (startX, startY, endX, endY, displacement) => {
      const points = [{ x: startX, y: startY }]

      const subDivide = (p1, p2, disp) => {
        if (disp < 4) {
          points.push(p2)
          return
        }
        const mid = {
          x: (p1.x + p2.x) / 2 + (Math.random() - 0.5) * disp,
          y: (p1.y + p2.y) / 2 + (Math.random() - 0.5) * disp
        }
        subDivide(p1, mid, disp / 2)
        subDivide(mid, p2, disp / 2)
      }

      subDivide({ x: startX, y: startY }, { x: endX, y: endY }, displacement)
      return points
    }

    // Node matrix grid
    const nodeCount = 70
    const nodes = []
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2
      })
    }

    let frameCount = 0

    const render = () => {
      frameCount++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const canvasRect = canvas.getBoundingClientRect()

      // Draw Grid Matrix Background
      const gridSize = 50
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.035)'
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw Nodes & Connecting Lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        node.x += node.vx
        node.y += node.vy
        node.pulse += 0.03

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        const glow = Math.sin(node.pulse) * 0.4 + 0.6

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size * glow, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 240, 255, ${0.45 * glow})`
        ctx.shadowBlur = 8
        ctx.shadowColor = '#00f0ff'
        ctx.fill()
        ctx.shadowBlur = 0

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j]
          const dx = other.x - node.x
          const dy = other.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 135) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            const opacity = (1 - dist / 135) * 0.25
            ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // =========================================================
      // LIGHTNING STARTS FROM LETTER 'O' AND SPREADS TO ALL LETTERS
      // =========================================================
      const oElem = letterRefs.current[3] // Letter 'O' is index 3 in Z-E-N-O-F-E-S-T

      if (oElem) {
        const oRect = oElem.getBoundingClientRect()
        const oX = oRect.left + oRect.width / 2 - canvasRect.left
        const oY = oRect.top + oRect.height / 2 - canvasRect.top

        // Find positions of all other letters
        const targetLetters = letterRefs.current
          .map((el, idx) => {
            if (!el || idx === 3) return null
            const r = el.getBoundingClientRect()
            return {
              idx,
              x: r.left + r.width / 2 - canvasRect.left,
              y: r.top + r.height / 2 - canvasRect.top
            }
          })
          .filter(Boolean)

        // Spawn Lightning Bolts from 'O' to other letters
        if (targetLetters.length > 0 && (frameCount % 4 === 0 || Math.random() < 0.4)) {
          const target = targetLetters[Math.floor(Math.random() * targetLetters.length)]
          lightningArcs.push({
            points: createLightning(oX, oY, target.x, target.y, 22),
            life: 1,
            maxLife: 8 + Math.floor(Math.random() * 8),
            isWhite: Math.random() < 0.35
          })
        }



        // Draw Energy Core Glow around 'O'
        ctx.beginPath()
        ctx.arc(oX, oY, 35 + Math.sin(frameCount * 0.1) * 8, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 240, 255, 0.12)'
        ctx.shadowBlur = 30
        ctx.shadowColor = '#00f0ff'
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Render Active Lightning Arcs
      for (let l = lightningArcs.length - 1; l >= 0; l--) {
        const arc = lightningArcs[l]
        const alpha = 1 - arc.life / arc.maxLife

        if (arc.points.length > 1) {
          // Cyan Outer Glow Layer
          ctx.beginPath()
          ctx.moveTo(arc.points[0].x, arc.points[0].y)
          for (let p = 1; p < arc.points.length; p++) {
            ctx.lineTo(arc.points[p].x, arc.points[p].y)
          }
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.9})`
          ctx.lineWidth = 3.5
          ctx.shadowBlur = 18
          ctx.shadowColor = '#00f0ff'
          ctx.stroke()

          // Pure White Core Line
          ctx.beginPath()
          ctx.moveTo(arc.points[0].x, arc.points[0].y)
          for (let p = 1; p < arc.points.length; p++) {
            ctx.lineTo(arc.points[p].x, arc.points[p].y)
          }
          ctx.strokeStyle = arc.isWhite ? `rgba(255, 255, 255, ${alpha})` : `rgba(200, 245, 255, ${alpha})`
          ctx.lineWidth = 1.5
          ctx.shadowBlur = 0
          ctx.stroke()
        }

        arc.life++
        if (arc.life >= arc.maxLife) {
          lightningArcs.splice(l, 1)
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const moveX = (clientX - window.innerWidth / 2) / 30
    const moveY = (clientY - window.innerHeight / 2) / 30
    setMousePos({ x: moveX, y: moveY })
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="home-hero-section" id="home" onMouseMove={handleMouseMove}>
      {/* Background Lightning Canvas */}
      <canvas ref={canvasRef} className="home-canvas" />

      {/* Anamorphic Horizontal Lens Flare Beams */}
      <div className="home-lens-flare horizontal-flare-left" />
      <div className="home-lens-flare horizontal-flare-right" />
      <div className="home-ambient-glow" />

      {/* Laser Scanning Grid Line */}
      <div className="home-scanner-line" />

      {/* Sci-Fi Circuit Tree Overlay (Matching Picture1.png) */}
      <svg className="home-circuit-svg" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cyanLinear" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#0088ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.2" />
          </linearGradient>
          <filter id="circuitGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Top Left Circuit Tree */}
        <path d="M 180 130 L 380 130 L 460 210 L 560 210" stroke="url(#cyanLinear)" strokeWidth="1.8" fill="none" className="circuit-path-pulse" filter="url(#circuitGlow)" />
        <path d="M 380 130 L 380 80 L 480 80" stroke="url(#cyanLinear)" strokeWidth="1.2" fill="none" className="circuit-path-pulse alt" />
        <circle cx="180" cy="130" r="5" fill="#00f0ff" filter="url(#circuitGlow)" />
        <circle cx="480" cy="80" r="3" fill="#00f0ff" />
        <circle cx="560" cy="210" r="4" fill="#00f0ff" />

        {/* Top Right Circuit Tree */}
        <path d="M 1420 130 L 1220 130 L 1140 210 L 1040 210" stroke="url(#cyanLinear)" strokeWidth="1.8" fill="none" className="circuit-path-pulse alt" filter="url(#circuitGlow)" />
        <path d="M 1220 130 L 1220 80 L 1120 80" stroke="url(#cyanLinear)" strokeWidth="1.2" fill="none" className="circuit-path-pulse" />
        <circle cx="1420" cy="130" r="5" fill="#00f0ff" filter="url(#circuitGlow)" />
        <circle cx="1120" cy="80" r="3" fill="#00f0ff" />
        <circle cx="1040" cy="210" r="4" fill="#00f0ff" />

        {/* Center Vertical Core Lines (Top & Bottom energy feeds) */}
        <path d="M 800 50 L 800 230" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="6 6" className="circuit-path-pulse" opacity="0.6" />
        <circle cx="800" cy="50" r="6" fill="#00f0ff" filter="url(#circuitGlow)" />

        <path d="M 800 650 L 800 830" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="6 6" className="circuit-path-pulse alt" opacity="0.6" />
        <circle cx="800" cy="830" r="6" fill="#00f0ff" filter="url(#circuitGlow)" />

        {/* Bottom Left Circuit Tree */}
        <path d="M 150 740 L 360 740 L 460 640 L 580 640" stroke="url(#cyanLinear)" strokeWidth="1.8" fill="none" className="circuit-path-pulse" filter="url(#circuitGlow)" />
        <circle cx="150" cy="740" r="5" fill="#00f0ff" filter="url(#circuitGlow)" />

        {/* Bottom Right Circuit Tree */}
        <path d="M 1450 740 L 1240 740 L 1140 640 L 1020 640" stroke="url(#cyanLinear)" strokeWidth="1.8" fill="none" className="circuit-path-pulse alt" filter="url(#circuitGlow)" />
        <circle cx="1450" cy="740" r="5" fill="#00f0ff" filter="url(#circuitGlow)" />
      </svg>

      {/* Main Grid Layout */}
      <div className="home-container" style={{ transform: `perspective(1000px) rotateX(${mousePos.y * 0.12}deg) rotateY(${mousePos.x * 0.12}deg) translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}>
        


        {/* CENTER STAGE: ZENOFEST GIANT TITLE WITH 'O' ENERGY CORE */}
        <motion.div 
          className="home-title-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35 }}
        >
          {/* Central Backplate Aura & Cyber Rings */}
          <div className="title-backplate">
            <div className="cyber-ring ring-outer" />
            <div className="cyber-ring ring-middle" />
            <div className="cyber-ring ring-inner" />
            <div className="backplate-glow" />
          </div>

          <div className="title-main-block">
            {/* Tech Header Tag */}
            <div className="title-tech-tag">
              <Terminal size={14} className="tag-icon" />
              <span>NATIONAL LEVEL PROJECT EXPO</span>
            </div>

            {/* GIANT ZENOFEST TITLE WITH 'O' AS LIGHTNING EPICENTER */}
            <div className="zeno-title-container">
              <h1 className="zeno-cyber-title">
                {ZENO_LETTERS.map((char, index) => (
                  <span
                    key={index}
                    ref={(el) => (letterRefs.current[index] = el)}
                    className={`cyber-letter ${char === 'O' ? 'letter-o-epicenter' : ''}`}
                    data-text={char}
                  >
                    {char}
                    {char === 'O' && (
                      <span className="o-energy-ring-container">
                        <span className="o-ring-pulse" />
                        <span className="o-core-dot" />
                      </span>
                    )}
                  </span>
                ))}
              </h1>

              {/* 2K26 Badge below ZENOFEST */}
              <div className="year-2k26-badge">
                <span className="badge-line left" />
                <span className="badge-year-text">2K26</span>
                <span className="badge-line right" />
              </div>
            </div>

            {/* Subtitle Tagline Matching Picture1.png */}
            <div className="title-tagline-container">
              <span className="bracket">&lt;</span>
              <span className="tagline-text">CODE THE NEXT ERA</span>
              <span className="bracket">/&gt;</span>
            </div>
          </div>
        </motion.div>



        {/* CTA Actions */}
        <motion.div 
          className="home-actions-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          <button 
            className="btn-cyber-primary"
            onClick={() => scrollToSection('events')}
          >
            <Sparkles size={16} />
            <span>EXPLORE FEST</span>
            <ArrowRight size={16} className="btn-arrow" />
          </button>

          <button 
            className="btn-cyber-secondary"
            onClick={() => scrollToSection('about')}
          >
            <span>ABOUT EVENT</span>
          </button>
        </motion.div>

        {/* Scroll Prompt Leading to About Section */}
        <div className="home-scroll-prompt" onClick={() => scrollToSection('about')}>
          <span className="scroll-text">SCROLL TO DISCOVER ABOUT</span>
          <div className="scroll-arrow-box">
            <ChevronDown size={18} className="scroll-arrow" />
          </div>
        </div>

      </div>
    </section>
  )
}
