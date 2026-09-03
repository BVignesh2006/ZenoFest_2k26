import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Terminal, Activity, Zap, Cpu, Lock, ChevronDown, ArrowRight } from 'lucide-react'
import './Home.css'

export default function Home() {
  const canvasRef = useRef(null)
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

    // Lightning arcs generator
    let lightningArcs = []

    const createLightning = (startX, startY, endX, endY, displacement) => {
      const points = [{ x: startX, y: startY }]
      const midX = (startX + endX) / 2
      const midY = (startY + endY) / 2

      // Recursive midpoint displacement
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
    const nodeCount = 65
    const nodes = []
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2
      })
    }

    let frameCount = 0

    const render = () => {
      frameCount++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

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

      // Draw Nodes and Connecting Circuit Lines
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
        ctx.fillStyle = `rgba(0, 240, 255, ${0.5 * glow})`
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00f0ff'
        ctx.fill()
        ctx.shadowBlur = 0

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j]
          const dx = other.x - node.x
          const dy = other.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 140) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            const opacity = (1 - dist / 140) * 0.3
            ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Spawn periodic electrical lightning bolts near central title
      if (frameCount % 45 === 0 || Math.random() < 0.08) {
        const angle = Math.random() * Math.PI * 2
        const r1 = 120 + Math.random() * 100
        const r2 = 260 + Math.random() * 150
        const startX = centerX + Math.cos(angle) * r1
        const startY = centerY + Math.sin(angle) * r1 * 0.5
        const endX = centerX + Math.cos(angle + (Math.random() - 0.5)) * r2
        const endY = centerY + Math.sin(angle + (Math.random() - 0.5)) * r2 * 0.5

        lightningArcs.push({
          points: createLightning(startX, startY, endX, endY, 35),
          life: 1,
          maxLife: 12 + Math.floor(Math.random() * 8)
        })
      }

      // Render lightning bolts
      for (let l = lightningArcs.length - 1; l >= 0; l--) {
        const arc = lightningArcs[l]
        const alpha = 1 - arc.life / arc.maxLife

        if (arc.points.length > 1) {
          // Glow layer
          ctx.beginPath()
          ctx.moveTo(arc.points[0].x, arc.points[0].y)
          for (let p = 1; p < arc.points.length; p++) {
            ctx.lineTo(arc.points[p].x, arc.points[p].y)
          }
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.8})`
          ctx.lineWidth = 3
          ctx.shadowBlur = 15
          ctx.shadowColor = '#00f0ff'
          ctx.stroke()

          // Core bright white layer
          ctx.beginPath()
          ctx.moveTo(arc.points[0].x, arc.points[0].y)
          for (let p = 1; p < arc.points.length; p++) {
            ctx.lineTo(arc.points[p].x, arc.points[p].y)
          }
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.lineWidth = 1.2
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
      {/* Background Interactive Lightning & Circuit Canvas */}
      <canvas ref={canvasRef} className="home-canvas" />

      {/* Horizontal Lens Flare Beam Behind Logo (matching Picture1.png) */}
      <div className="home-lens-flare horizontal-flare-left" />
      <div className="home-lens-flare horizontal-flare-right" />
      <div className="home-ambient-glow" />

      {/* Laser Scanning Grid Line */}
      <div className="home-scanner-line" />

      {/* Full Sci-Fi Circuit Tree Overlay (matching Picture1.png diagram) */}
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
        <path d="M 180 140 L 380 140 L 460 220 L 560 220" stroke="url(#cyanLinear)" strokeWidth="1.8" fill="none" className="circuit-path-pulse" filter="url(#circuitGlow)" />
        <path d="M 380 140 L 380 90 L 480 90" stroke="url(#cyanLinear)" strokeWidth="1.2" fill="none" className="circuit-path-pulse alt" />
        <circle cx="180" cy="140" r="5" fill="#00f0ff" filter="url(#circuitGlow)" />
        <circle cx="480" cy="90" r="3" fill="#00f0ff" />
        <circle cx="560" cy="220" r="4" fill="#00f0ff" />

        {/* Top Right Circuit Tree */}
        <path d="M 1420 140 L 1220 140 L 1140 220 L 1040 220" stroke="url(#cyanLinear)" strokeWidth="1.8" fill="none" className="circuit-path-pulse alt" filter="url(#circuitGlow)" />
        <path d="M 1220 140 L 1220 90 L 1120 90" stroke="url(#cyanLinear)" strokeWidth="1.2" fill="none" className="circuit-path-pulse" />
        <circle cx="1420" cy="140" r="5" fill="#00f0ff" filter="url(#circuitGlow)" />
        <circle cx="1120" cy="90" r="3" fill="#00f0ff" />
        <circle cx="1040" cy="220" r="4" fill="#00f0ff" />

        {/* Center Vertical Core Lines (Top & Bottom energy feeds) */}
        <path d="M 800 60 L 800 240" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="6 6" className="circuit-path-pulse" opacity="0.6" />
        <circle cx="800" cy="60" r="6" fill="#00f0ff" filter="url(#circuitGlow)" />

        <path d="M 800 640 L 800 820" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="6 6" className="circuit-path-pulse alt" opacity="0.6" />
        <circle cx="800" cy="820" r="6" fill="#00f0ff" filter="url(#circuitGlow)" />

        {/* Bottom Left Circuit Tree */}
        <path d="M 150 720 L 360 720 L 460 620 L 580 620" stroke="url(#cyanLinear)" strokeWidth="1.8" fill="none" className="circuit-path-pulse" filter="url(#circuitGlow)" />
        <circle cx="150" cy="720" r="5" fill="#00f0ff" filter="url(#circuitGlow)" />

        {/* Bottom Right Circuit Tree */}
        <path d="M 1450 720 L 1240 720 L 1140 620 L 1020 620" stroke="url(#cyanLinear)" strokeWidth="1.8" fill="none" className="circuit-path-pulse alt" filter="url(#circuitGlow)" />
        <circle cx="1450" cy="720" r="5" fill="#00f0ff" filter="url(#circuitGlow)" />
      </svg>

      {/* Main Responsive Grid Layout */}
      <div className="home-container" style={{ transform: `perspective(1000px) rotateX(${mousePos.y * 0.15}deg) rotateY(${mousePos.x * 0.15}deg) translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}>
        
        {/* HUD Widgets Top Row */}
        <div className="home-hud-row top-hud">
          {/* Top Left HUD - Matching Picture1.png */}
          <motion.div 
            className="hud-card hud-top-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hud-corner tl" />
            <div className="hud-corner tr" />
            <div className="hud-corner bl" />
            <div className="hud-corner br" />
            
            <div className="hud-header">
              <Activity size={13} className="hud-icon glow-cyan" />
              <span className="hud-label">CORE STABILITY</span>
            </div>
            <div className="hud-value-group">
              <span className="hud-value">100%</span>
              <span className="hud-badge">OPTIMAL</span>
            </div>
            <div className="hud-bar-bg">
              <div className="hud-bar-fill fill-100" />
            </div>
            <div className="hud-footer-text">DEPT OF IT • PSR</div>
          </motion.div>

          {/* Top Right HUD - Matching Picture1.png */}
          <motion.div 
            className="hud-card hud-top-right"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="hud-corner tl" />
            <div className="hud-corner tr" />
            <div className="hud-corner bl" />
            <div className="hud-corner br" />

            <div className="hud-header">
              <Cpu size={13} className="hud-icon glow-blue" />
              <span className="hud-label">SYSTEM PROCESS</span>
            </div>
            <div className="hud-value-group">
              <span className="hud-value">LOAD: 100%</span>
              <span className="hud-badge ready">SYSTEM READY</span>
            </div>
            <div className="hud-indicator-grid">
              <span className="dot active" />
              <span className="dot active" />
              <span className="dot active" />
              <span className="dot active" />
              <span className="dot active" />
            </div>
          </motion.div>
        </div>

        {/* CENTER STAGE: ZENOFEST 2K26 TITLE MODEL & LIGHTNING */}
        <motion.div 
          className="home-title-wrapper"
          initial={{ opacity: 0, scale: 0.88 }}
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

            {/* ZENOFEST 2K26 Title Model with Wireframe Grid & Cyan Lightning Outline */}
            <div className="zeno-title-container">
              <h1 className="zeno-cyber-title">
                <span className="wireframe-word zeno-main" data-text="ZENOFEST">
                  ZENOFEST
                </span>
                <span className="wireframe-word year-main" data-text="2K26">
                  2K26
                </span>
              </h1>
              <div className="wireframe-grid-overlay" />
            </div>

            {/* Subtitle Tagline Matching Picture1.png ("CODE THE NEXT ERA") */}
            <div className="title-tagline-container">
              <span className="bracket">&lt;</span>
              <span className="tagline-text">CODE THE NEXT ERA</span>
              <span className="bracket">/&gt;</span>
            </div>
          </div>
        </motion.div>

        {/* HUD Widgets Middle & Bottom Row (Matching Picture1.png) */}
        <div className="home-hud-row bottom-hud">
          {/* Bottom Left HUD: INNOVATION FLOW ACTIVE */}
          <motion.div 
            className="hud-card hud-bottom-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="hud-corner tl" />
            <div className="hud-corner tr" />
            <div className="hud-corner bl" />
            <div className="hud-corner br" />

            <div className="hud-header">
              <Zap size={13} className="hud-icon glow-cyan" />
              <span className="hud-label">INNOVATION FLOW</span>
            </div>
            <div className="hud-status-live">
              <span className="live-pulse" />
              <span className="hud-status-text">ACTIVE</span>
            </div>
            <p className="hud-sub-desc">IDEAS . BUILD . IMPACT.</p>
          </motion.div>

          {/* Middle Right HUD: POWER LEVEL 100% OPTIMAL */}
          <motion.div 
            className="hud-card hud-mid-right"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <div className="hud-corner tl" />
            <div className="hud-corner tr" />
            <div className="hud-corner bl" />
            <div className="hud-corner br" />

            <div className="hud-header">
              <Sparkles size={13} className="hud-icon glow-cyan" />
              <span className="hud-label">POWER LEVEL</span>
            </div>
            <div className="hud-value-group">
              <span className="hud-value">100%</span>
              <span className="hud-badge">OPTIMAL</span>
            </div>
            <div className="hud-footer-text">HIGH VOLTAGE READY</div>
          </motion.div>

          {/* Bottom Right HUD: FUTURE STATUS UNLOCKED */}
          <motion.div 
            className="hud-card hud-bottom-right"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="hud-corner tl" />
            <div className="hud-corner tr" />
            <div className="hud-corner bl" />
            <div className="hud-corner br" />

            <div className="hud-header">
              <Lock size={13} className="hud-icon glow-blue" />
              <span className="hud-label">FUTURE STATUS</span>
            </div>
            <div className="hud-status-live unlocked">
              <span className="hud-status-text">UNLOCKED</span>
            </div>
            <p className="hud-sub-desc">LIMITS . BROKEN.</p>
          </motion.div>
        </div>

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
