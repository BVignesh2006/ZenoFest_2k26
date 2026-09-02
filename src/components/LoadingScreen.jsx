import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

const TOTAL_BARS = 15
const PHASE_TIMING = {
  impact: 800,
  zoom: 2200,
  done: 3000,
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

  const stableOnComplete = useCallback(() => {
    onComplete?.()
  }, [onComplete])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('impact'), PHASE_TIMING.impact)
    const t2 = setTimeout(() => setPhase('zoom'), PHASE_TIMING.zoom)
    const t3 = setTimeout(() => {
      setPhase('done')
      setVisible(false)
      stableOnComplete()
    }, PHASE_TIMING.done)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [stableOnComplete])

  const isImpact = phase === 'impact' || phase === 'zoom'
  const isZoom = phase === 'zoom'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
          className="loading-screen-wrapper"
        >
          {/* Background gradient orb */}
          <div className="orb-container">
            <motion.div
              initial={{ scale: 0.5, opacity: 0.3 }}
              animate={
                isImpact
                  ? { scale: [1, 2.5, 4], opacity: [0.3, 0.9, 0] }
                  : { scale: 1, opacity: 0.4 }
              }
              transition={{ duration: 1.5, ease: 'easeInOut' }}
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
                  duration: 1.2,
                  delay: 0.8 + Math.abs(i - 7) * 0.04,
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
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="sweep-line"
            />
          )}

          {/* Title area */}
          <div className="title-area">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={
                isZoom
                  ? { scale: [1, 1.2, 8], opacity: [1, 1, 0], y: 0 }
                  : isImpact
                    ? { scale: [0.9, 1.1, 1], opacity: 1, y: 0 }
                    : { scale: 0.9, opacity: 0.8, y: 0 }
              }
              transition={
                isZoom
                  ? { duration: 0.8, ease: [0.7, 0, 0.84, 0] }
                  : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              }
              className="title-wrapper"
            >
              {/* Main title with gradient */}
              <div className="title-block">
                <motion.span
                  animate={
                    isImpact
                      ? { filter: ['blur(0px)', 'blur(8px)', 'blur(0px)'] }
                      : {}
                  }
                  transition={{ duration: 0.6 }}
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
                    ? { letterSpacing: ['0.1em', '0.25em', '0.2em'], opacity: 1 }
                    : { opacity: 0.9 }
                }
                transition={{ duration: 0.8 }}
                className="subtitle-text"
              >
                NATIONAL LEVEL PROJECT EXPO{' '}
                <span className="year-accent">2026</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
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
                    duration: 0.4,
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
