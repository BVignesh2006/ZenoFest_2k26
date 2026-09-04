import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import './Timeline.css'

const stationsData = [
  {
    id: 1,
    platform: 'PLATFORM 01',
    day: '25',
    month: 'SEP',
    year: '2026',
    dateLabel: '25.09.26',
    title: 'Attendance Verification',
    subtitle: '09:00 AM – 09:45 AM',
    description: 'Verification of participant registrations and college ID cards.',
    color: '#ff6b4a' // Coral Orange
  },
  {
    id: 2,
    platform: 'PLATFORM 02',
    day: '25',
    month: 'SEP',
    year: '2026',
    dateLabel: '25.09.26',
    title: 'Inauguration Starts',
    subtitle: '10:00 AM – 10:30 AM',
    description: 'Grand opening ceremony and welcome address by dignitaries.',
    color: '#ff65a3' // Pink
  },
  {
    id: 3,
    platform: 'PLATFORM 03',
    day: '25',
    month: 'SEP',
    year: '2026',
    dateLabel: '25.09.26',
    title: 'Refreshments',
    subtitle: '10:30 AM – 10:45 AM',
    description: 'Tea and snack break for all participants and guests.',
    color: '#ffc72c' // Gold Yellow
  },
  {
    id: 4,
    platform: 'PLATFORM 04',
    day: '25',
    month: 'SEP',
    year: '2026',
    dateLabel: '25.09.26',
    title: 'Technical Events Starts',
    subtitle: '10:45 AM – 12:30 PM',
    description: 'Project Expo, UI/UX Designathon, and Logic Hunt across designated labs.',
    color: '#06b6d4' // Cyan
  },
  {
    id: 5,
    platform: 'PLATFORM 05',
    day: '25',
    month: 'SEP',
    year: '2026',
    dateLabel: '25.09.26',
    title: 'Lunch Break',
    subtitle: '12:30 PM – 01:30 PM',
    description: 'Lunch served for all registered participants and guests.',
    color: '#10b981' // Mint Green
  },
  {
    id: 6,
    platform: 'PLATFORM 06',
    day: '25',
    month: 'SEP',
    year: '2026',
    dateLabel: '25.09.26',
    title: 'Non-Technical Events Starts',
    subtitle: '02:00 PM – 03:00 PM',
    description: 'Who Am I?, Rapid Fire, and Free Fire esports showdown.',
    color: '#3b82f6' // Electric Blue
  },
  {
    id: 7,
    platform: 'PLATFORM 07',
    day: '25',
    month: 'SEP',
    year: '2026',
    dateLabel: '25.09.26',
    title: 'Prize Distribution',
    subtitle: '03:15 PM – 04:00 PM',
    description: 'Valedictory ceremony, trophy distribution, cash prizes & closing notes.',
    color: '#b388ff' // Purple
  }
]

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(1200)
  const scrollWrapperRef = useRef(null)
  const viewportRef = useRef(null)

  const COLUMN_WIDTH = 320 // 280px card + 40px gap
  const NODE_OFFSET = 140   // Center of 280px card column
  const TOTAL_STAGE_WIDTH = stationsData.length * COLUMN_WIDTH - 40 // 8 * 320 - 40 = 2520px

  useEffect(() => {
    const updateWidth = () => {
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.clientWidth)
      } else {
        setViewportWidth(window.innerWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Track page scroll through the timeline section
  const { scrollYProgress } = useScroll({
    target: scrollWrapperRef,
    offset: ['start start', 'end end']
  })

  // Update station index dynamically as user scrolls down
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const calculatedIndex = Math.min(
      stationsData.length - 1,
      Math.max(0, Math.floor(latest * stationsData.length))
    )
    if (calculatedIndex !== activeIndex) {
      setActiveIndex(calculatedIndex)
    }
  })

  // Function to programmatically scroll to a specific station index
  const scrollToStation = (index) => {
    setActiveIndex(index)
    if (scrollWrapperRef.current) {
      const wrapper = scrollWrapperRef.current
      const rect = wrapper.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const targetTop = scrollTop + rect.top + (index / (stationsData.length - 1)) * (rect.height - window.innerHeight)
      window.scrollTo({ top: targetTop, behavior: 'smooth' })
    }
  }

  const currentStation = stationsData[activeIndex]
  
  // Exact pixel center for current active station node
  const stationCenterPx = NODE_OFFSET + activeIndex * COLUMN_WIDTH

  // Calculate clamped translateX to remove blank right space after Platform 08
  const maxTranslateX = Math.max(0, TOTAL_STAGE_WIDTH - viewportWidth + 40)
  const targetTranslateX = activeIndex * COLUMN_WIDTH
  const stageTranslateX = -Math.min(maxTranslateX, targetTranslateX)

  return (
    <div className="timeline-scroll-wrapper" ref={scrollWrapperRef} id="timeline">
      <div className="timeline-sticky-viewport">
        <section className="timeline-section">
          {/* Background patterns */}
          <div className="timeline-bg-elements">
            <div className="grid-overlay" />
            <div className="distant-mountains" />
          </div>

          <div className="timeline-container">
            {/* Header */}
            <div className="timeline-header">
              <div className="timeline-title-group">
                <h2 className="timeline-main-title">TIMELINE</h2>
              </div>
            </div>

            {/* Carousel Viewport Window */}
            <div className="timeline-carousel-viewport" ref={viewportRef}>
              <motion.div
                className="timeline-track-stage"
                animate={{ x: stageTranslateX }}
                transition={{ type: 'spring', stiffness: 70, damping: 22, mass: 1 }}
              >
                {/* Top Row Platform Cards */}
                <div className="cards-row top-row">
                  {stationsData.map((station, idx) => {
                    const isTop = idx % 2 === 0
                    const isReached = idx <= activeIndex
                    const isActive = idx === activeIndex

                    if (!isTop) {
                      return <div key={`top-empty-${station.id}`} className="card-column-space" />
                    }

                    return (
                      <div
                        key={`card-${station.id}`}
                        className={`platform-card-column top-column ${isReached ? 'reached-column' : 'unreached-column'} ${isActive ? 'active-column' : ''}`}
                        onClick={() => scrollToStation(idx)}
                      >
                        <motion.div
                          className={`platform-window-card ${isActive ? 'active-arrival-glow' : ''}`}
                          initial={{ opacity: 0, scale: 0.8, y: -30 }}
                          animate={{
                            opacity: isReached ? 1 : 0.15,
                            scale: isActive ? 1.04 : (isReached ? 1 : 0.85),
                            y: isReached ? 0 : -15,
                            filter: isReached ? 'blur(0px)' : 'blur(4px)'
                          }}
                          transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                          style={{ '--card-accent': station.color }}
                        >
                          <div className="card-window-header" style={{ backgroundColor: station.color }}>
                            <span className="platform-tag">{station.platform}</span>
                            <div className="window-dots">
                              <span className="dot dot-close" />
                              <span className="dot dot-min" />
                              <span className="dot dot-expand" />
                            </div>
                          </div>

                          <div className="card-body">
                            <div className="date-badge-box">
                              <span className="date-day">{station.day}</span>
                              <div className="date-meta">
                                <span className="date-month">{station.month}</span>
                                <span className="date-year">{station.year}</span>
                              </div>
                            </div>

                            <h3 className="card-title-text">{station.title}</h3>
                            <p className="card-subtitle-text">{station.subtitle}</p>

                            <div className="card-footer-controls">
                              <div className="mini-progress-bar">
                                <div className="mini-progress-fill" style={{ width: '55%', backgroundColor: station.color }} />
                              </div>
                              <div className="calendar-icon">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                  <line x1="16" y1="2" x2="16" y2="6" />
                                  <line x1="8" y1="2" x2="8" y2="6" />
                                  <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Vertical Connector Line from Card to Track Node */}
                        <div className="card-connector-stem top-stem">
                          <motion.div
                            className="stem-line"
                            animate={{
                              height: isReached ? 24 : 8,
                              opacity: isReached ? 1 : 0.2
                            }}
                            transition={{ duration: 0.3 }}
                            style={{ backgroundColor: station.color }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Central Train Track & Train Engine */}
                <div className="track-container">
                  {/* Main Track Line */}
                  <div className="track-base-line" />

                  {/* Active Filled Progress Line extending to current station */}
                  <motion.div
                    className="track-progress-fill"
                    animate={{ width: `${stationCenterPx}px` }}
                    transition={{ type: 'spring', stiffness: 70, damping: 22, mass: 1 }}
                    style={{ backgroundColor: currentStation.color }}
                  />

                  {/* Moving Train Car Engine placed EXACTLY over current station node */}
                  <motion.div
                    className="train-car-wrapper"
                    animate={{ left: `${stationCenterPx}px` }}
                    transition={{ type: 'spring', stiffness: 70, damping: 22, mass: 1 }}
                  >
                    <div className="train-smoke-particle" />
                    <div className="train-icon-box">
                      <svg viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="train-svg">
                        <rect x="8" y="14" width="44" height="18" rx="3" fill="#181c2b" stroke="#ffffff" strokeWidth="2" />
                        <rect x="36" y="8" width="16" height="24" rx="2" fill="#252b3d" stroke="#ffffff" strokeWidth="2" />
                        <rect x="40" y="12" width="8" height="8" rx="1" fill="#4decea" />
                        <rect x="14" y="6" width="6" height="8" rx="1" fill={currentStation.color} stroke="#ffffff" strokeWidth="1.5" />
                        <polygon points="12,6 22,6 20,2 14,2" fill={currentStation.color} />
                        <polygon points="4,32 10,24 10,32" fill="#ffc72c" stroke="#ffffff" strokeWidth="1.5" />
                        <circle cx="16" cy="32" r="5" fill={currentStation.color} stroke="#ffffff" strokeWidth="2" />
                        <circle cx="16" cy="32" r="2" fill="#ffffff" />
                        <circle cx="30" cy="32" r="5" fill="#ff65a3" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="30" cy="32" r="2" fill="#ffffff" />
                        <circle cx="44" cy="32" r="5" fill="#4decea" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="44" cy="32" r="2" fill="#ffffff" />
                      </svg>
                    </div>

                    {/* Date Tag Badge Below Train */}
                    <div className="train-date-tag" style={{ backgroundColor: currentStation.color }}>
                      {currentStation.dateLabel}
                    </div>
                  </motion.div>

                  {/* Station Track Nodes */}
                  <div className="stations-node-list">
                    {stationsData.map((st, idx) => {
                      const isReached = idx <= activeIndex
                      const isCurrent = idx === activeIndex
                      const nodeLeftPx = NODE_OFFSET + idx * COLUMN_WIDTH

                      return (
                        <div
                          key={`node-${st.id}`}
                          className={`station-node ${isReached ? 'reached' : ''} ${isCurrent ? 'current' : ''}`}
                          style={{ left: `${nodeLeftPx}px` }}
                          onClick={() => scrollToStation(idx)}
                          title={`${st.platform}: ${st.title}`}
                        >
                          {isCurrent && <div className="sonar-pulse-ring" style={{ borderColor: st.color }} />}
                          <div className="node-outer-ring">
                            <div className="node-inner-dot" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom Row Platform Cards */}
                <div className="cards-row bottom-row">
                  {stationsData.map((station, idx) => {
                    const isBottom = idx % 2 !== 0
                    const isReached = idx <= activeIndex
                    const isActive = idx === activeIndex

                    if (!isBottom) {
                      return <div key={`bottom-empty-${station.id}`} className="card-column-space" />
                    }

                    return (
                      <div
                        key={`card-${station.id}`}
                        className={`platform-card-column bottom-column ${isReached ? 'reached-column' : 'unreached-column'} ${isActive ? 'active-column' : ''}`}
                        onClick={() => scrollToStation(idx)}
                      >
                        {/* Vertical Connector Line from Track Node to Card */}
                        <div className="card-connector-stem bottom-stem">
                          <motion.div
                            className="stem-line"
                            animate={{
                              height: isReached ? 24 : 8,
                              opacity: isReached ? 1 : 0.2
                            }}
                            transition={{ duration: 0.3 }}
                            style={{ backgroundColor: station.color }}
                          />
                        </div>

                        <motion.div
                          className={`platform-window-card ${isActive ? 'active-arrival-glow' : ''}`}
                          initial={{ opacity: 0, scale: 0.8, y: 30 }}
                          animate={{
                            opacity: isReached ? 1 : 0.15,
                            scale: isActive ? 1.04 : (isReached ? 1 : 0.85),
                            y: isReached ? 0 : 15,
                            filter: isReached ? 'blur(0px)' : 'blur(4px)'
                          }}
                          transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                          style={{ '--card-accent': station.color }}
                        >
                          <div className="card-window-header" style={{ backgroundColor: station.color }}>
                            <span className="platform-tag">{station.platform}</span>
                            <div className="window-dots">
                              <span className="dot dot-close" />
                              <span className="dot dot-min" />
                              <span className="dot dot-expand" />
                            </div>
                          </div>

                          <div className="card-body">
                            <div className="date-badge-box">
                              <span className="date-day">{station.day}</span>
                              <div className="date-meta">
                                <span className="date-month">{station.month}</span>
                                <span className="date-year">{station.year}</span>
                              </div>
                            </div>

                            <h3 className="card-title-text">{station.title}</h3>
                            <p className="card-subtitle-text">{station.subtitle}</p>

                            <div className="card-footer-controls">
                              <div className="mini-progress-bar">
                                <div className="mini-progress-fill" style={{ width: '65%', backgroundColor: station.color }} />
                              </div>
                              <div className="calendar-icon">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                  <line x1="16" y1="2" x2="16" y2="6" />
                                  <line x1="8" y1="2" x2="8" y2="6" />
                                  <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Bottom Progress Indicator Bar */}
            <div className="timeline-nav-bar">
              <div className="nav-dots-indicator">
                {stationsData.map((_, i) => (
                  <button
                    key={`dot-nav-${i}`}
                    className={`indicator-dot ${i === activeIndex ? 'active-pill' : ''}`}
                    onClick={() => scrollToStation(i)}
                    style={i === activeIndex ? { backgroundColor: currentStation.color } : {}}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
