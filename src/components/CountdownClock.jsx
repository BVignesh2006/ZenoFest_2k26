import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CountdownClock.css'

// Target date: 25 SEP 2026 at 09:00:00 IST (UTC+05:30)
const DEFAULT_TARGET = new Date('2026-09-25T09:00:00+05:30').getTime()

function calculateTimeLeft(target) {
  const now = Date.now()
  const difference = target - now

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((difference / (1000 * 60)) % 60)
  const seconds = Math.floor((difference / 1000) % 60)

  return { days, hours, minutes, seconds, isExpired: false }
}

function padZero(num) {
  return String(num).padStart(2, '0')
}

function FlipUnit({ value, label, variant = 'indigo' }) {
  const formatted = padZero(value)

  return (
    <div className={`countdown-unit unit-${variant}`}>
      <div className="flip-card-wrapper">
        {/* Top corner cyber rivets */}
        <div className="corner-rivet top-left" />
        <div className="corner-rivet top-right" />
        
        {/* Center horizontal slice divider */}
        <div className="card-divider" />

        {/* Ambient Glow Background */}
        <div className="card-glow" />

        {/* Top half */}
        <div className="card-half top-half">
          <div className="half-inner">
            <AnimatePresence initial={false}>
              <motion.span
                key={formatted}
                initial={{ y: '-25%', opacity: 0.2 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '25%', opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="digit-text"
              >
                {formatted}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom half */}
        <div className="card-half bottom-half">
          <div className="half-inner">
            <AnimatePresence initial={false}>
              <motion.span
                key={formatted}
                initial={{ y: '-25%', opacity: 0.2 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '25%', opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="digit-text"
              >
                {formatted}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="unit-label-container">
        <span className="unit-label">{label}</span>
      </div>
    </div>
  )
}

export default function CountdownClock({ targetDate = DEFAULT_TARGET, showTelemetry = false }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate))

  useEffect(() => {
    // Immediate initial sync
    setTimeLeft(calculateTimeLeft(targetDate))

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="cyber-clock-container">
      {/* Clock Header */}
      <div className="clock-header">
        <div className="clock-status-tag">
          <span className="beacon-pulse" />
          <span className="status-label">T−MINUS // SYSTEM CLOCK</span>
        </div>
        <div className="clock-target-badge">
          25 SEP 2026 · 09:00 IST
        </div>
      </div>

      {/* 4 Flip Units */}
      <div className="clock-grid">
        <FlipUnit value={timeLeft.days} label="DAYS" variant="indigo" />
        <FlipUnit value={timeLeft.hours} label="HOURS" variant="purple" />
        <FlipUnit value={timeLeft.minutes} label="MINUTES" variant="cyan" />
        <FlipUnit value={timeLeft.seconds} label="SECONDS" variant="rose" />
      </div>

      {/* Cyber Telemetry Bar */}
      {showTelemetry && (
        <div className="clock-telemetry">
          <div className="telemetry-item">
            <div className="telemetry-prefix">
              <span className="telemetry-num num-cyan">01</span>
              <span className="telemetry-slash">//</span>
            </div>
            <div className="telemetry-content">
              <span className="telemetry-val">24H</span>
              <span className="telemetry-desc">NON-STOP</span>
            </div>
          </div>

          <div className="telemetry-item">
            <div className="telemetry-prefix">
              <span className="telemetry-num num-indigo">02</span>
              <span className="telemetry-slash">//</span>
            </div>
            <div className="telemetry-content">
              <span className="telemetry-val">EXPO</span>
              <span className="telemetry-desc">PROJECT TRACKS</span>
            </div>
          </div>

          <div className="telemetry-item telemetry-highlight">
            <div className="telemetry-prefix">
              <span className="telemetry-num num-rose">03</span>
              <span className="telemetry-slash">//</span>
            </div>
            <div className="telemetry-content">
              <span className="telemetry-val val-rose">NATIONAL</span>
              <span className="telemetry-desc desc-rose">LEVEL EXPO</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
