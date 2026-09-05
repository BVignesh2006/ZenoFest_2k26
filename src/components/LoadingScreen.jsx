import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

const TOTAL_BARS = 15
const PHASE_TIMING = {
  impact: 1000,
  zoom: 3000,
  exit: 4200,
  done: 4800,
}

function getBarColor(index) {
  if (index % 3 === 0) return 'bar-red-cyan'
  if (index % 3 === 1) return 'bar-cyan-purple'
  return 'bar-amber-rose'
}

const BOTTOM_BAR_HEIGHTS = [40, 70, 30, 90, 60, 100, 50, 80, 30, 65]

export default function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState('initial')
  const [isMobile, setIsMobile] = useState(false)

  const stableOnComplete = useCallback(() => {
    onComplete?.()
  }, [onComplete])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('impact'), PHASE_TIMING.impact)
    const t2 = setTimeout(() => setPhase('zoom'), PHASE_TIMING.zoom)
    const t3 = setTimeout(() => {
      setPhase('done')
      setVisible(false)
    }, PHASE_TIMING.exit)
    const t4 = setTimeout(() => {
      stableOnComplete()
    }, PHASE_TIMING.done)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [stableOnComplete])

  const isImpact = phase === 'impact' || phase === 'zoom'
  const isZoom = phase === 'zoom'

  // Tap/click to skip intro
  const handleSkip = () => {
    setVisible(false)
    stableOnComplete()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="loading-screen-wrapper"
          onClick={handleSkip}
        >
          {/* Background gradient orb */}
          <div className="orb-container">
            <motion.div
              initial={{ scale: 0.5, opacity: 0.3 }}
              animate={
                isImpact
                  ? { scale: isMobile ? [1, 1.8, 2.5] : [1, 2.5, 4], opacity: [0.3, 0.9, 0] }
                  : { scale: 1, opacity: 0.4 }
              }
              transition={{ duration: 2.0, ease: 'easeInOut' }}
              className="gradient-orb"
            />
          </div>

          {/* 15 animated equalizer bars */}
          <div className="equalizer-container">
            {Array.from({ length: TOTAL_BARS }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: '0%', opacity: 0 }}
                animate={
                  isImpact
                    ? { height: ['0%', '100%', '0%'], opacity: [0, 0.8, 0], scaleX: [1, 1.5, 0.5] }
                    : {}
                }
                transition={{
                  duration: 1.6,
                  delay: 0.4 + Math.abs(i - 7) * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`equalizer-bar ${getBarColor(i)}`}
              />
            ))}
          </div>

          {/* Horizontal sweep line */}
          {isImpact && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1.5, 3], opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="sweep-line"
            />
          )}

          {/* Title area */}
          <div className="title-area">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={
                isZoom
                  ? { scale: isMobile ? [1, 1.1, 3.5] : [1, 1.2, 6], opacity: [1, 1, 0], y: 0 }
                  : isImpact
                    ? { scale: [0.95, 1.05, 1], opacity: 1, y: 0 }
                    : { scale: 0.9, opacity: 0.8, y: 0 }
              }
              transition={
                isZoom
                  ? { duration: 1.2, ease: [0.65, 0, 0.35, 1] }
                  : { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
              }
              className="title-wrapper"
            >
              {/* Main title with gradient */}
              <div className="title-block">
                <motion.span
                  animate={
                    isImpact
                      ? { filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'] }
                      : {}
                  }
                  transition={{ duration: 0.8 }}
                  className="main-title"
                >
                  ZENOFEST
                </motion.span>
                <div className="title-glow-line" />
              </div>

              {/* Subtitle */}
              <motion.h1
                animate={
                  isImpact
                    ? { letterSpacing: isMobile ? ['0.05em', '0.12em', '0.1em'] : ['0.1em', '0.25em', '0.2em'], opacity: 1 }
                    : { opacity: 0.9 }
                }
                transition={{ duration: 1.0 }}
                className="subtitle-text"
              >
                NATIONAL LEVEL PROJECT EXPO{' '}
                <span className="year-accent">2026</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="tagline-text"
              >
                INNOVATE · INSPIRE · ELEVATE
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom Netflix-style audio bars */}
          <div className="bottom-bars">
            <span className="bottom-bars-label">ZENOFEST TECH INTRO</span>
            <div className="bottom-bars-row">
              {BOTTOM_BAR_HEIGHTS.map((h, i) => (
                <motion.div
                  key={i}
                  animate={
                    isImpact
                      ? { height: [`${h}%`, '10%', `${h}%`] }
                      : { height: '20%' }
                  }
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: i * 0.05,
                  }}
                  className="bottom-bar"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

