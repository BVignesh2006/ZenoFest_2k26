import { motion } from 'framer-motion'
import CountdownClock from './CountdownClock'
import './About.css'

export default function About() {
  return (
    <section className="about-section" id="about">
      {/* Background geometric patterns */}
      <div className="about-bg-pattern">
        <div className="hex-line hex-line-1" />
        <div className="hex-line hex-line-2" />
        <div className="hex-line hex-line-3" />
        <div className="grid-dots" />
      </div>

      <div className="about-container">
        {/* Left Side */}
        <motion.div
          className="about-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="section-label">
            <span className="label-number">01</span>
            <span className="label-divider">/</span>
            <span className="label-text">ABOUT THE EVENT</span>
          </div>

          <h1 className="about-title">
            <span className="title-line-1">ZENOFEST'26</span>
            <span className="title-line-2">BUILD WHAT'S</span>
            <span className="title-line-3">NEXT.</span>
          </h1>

          <div className="about-tags">
            <span className="tag">NATIONAL LEVEL</span>
            <span className="tag">PROJECT EXPO</span>
            <span className="tag">PSR</span>
          </div>
        </motion.div>

        {/* Center Hexagon */}
        <motion.div
          className="hexagon-container"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="hexagon">
            <div className="hexagon-inner" />
            <div className="hexagon-glow" />
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="about-right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="overview-label">EVENT OVERVIEW</div>

          <p className="overview-description">
            <strong>ZenoFest'26</strong> is a national-level project expo where students
            come together to showcase innovative projects, experiment with new
            technologies, and solve real-world problems.
          </p>

          <p className="overview-subdescription">
            Organized by the Department of Information Technology, PSR,
            ZenoFest brings together developers, designers, and innovators to
            present their groundbreaking solutions.
          </p>

          <div className="event-date">
            <div className="date-hexagon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
              </svg>
            </div>
            <span className="date-text">25 SEP 2026 • SIVAKASI</span>
          </div>

          {/* HackITon Style Countdown Clock */}
          <CountdownClock showTelemetry={false} />
        </motion.div>
      </div>
    </section>
  )
}
