import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Trophy,
  Search,
  Sparkles,
  Code2,
  Gamepad2,
  HelpCircle,
  Zap,
  Layers
} from 'lucide-react'
import { eventsData } from '../data/eventsData'
import EventModal from './EventModal'
import RegisterModal from './RegisterModal'
import './Events.css'

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [registeringEvent, setRegisteringEvent] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [imgFails, setImgFails] = useState({})

  const eventsTouchStartRef = useMemo(() => ({ current: { x: 0, y: 0 } }), [])
  const eventsTouchCurrentRef = useMemo(() => ({ current: { x: 0, y: 0 } }), [])

  const handleEventsTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      eventsTouchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      eventsTouchCurrentRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }

  const handleEventsTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      eventsTouchCurrentRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }

  const handleEventsTouchEnd = () => {
    const deltaX = eventsTouchCurrentRef.current.x - eventsTouchStartRef.current.x
    const deltaY = eventsTouchCurrentRef.current.y - eventsTouchStartRef.current.y

    const minSwipe = 35

    if (Math.abs(deltaX) >= minSwipe && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
      const CATEGORIES = ['ALL', 'TECHNICAL', 'NON-TECHNICAL']
      const currentIndex = CATEGORIES.indexOf(activeCategory)

      if (deltaX < 0) {
        // Swiped Left -> Move to Next Category Header
        if (currentIndex < CATEGORIES.length - 1) {
          setActiveCategory(CATEGORIES[currentIndex + 1])
        }
      } else {
        // Swiped Right -> Move to Previous Category Header
        if (currentIndex > 0) {
          setActiveCategory(CATEGORIES[currentIndex - 1])
        }
      }
    }

    eventsTouchStartRef.current = { x: 0, y: 0 }
    eventsTouchCurrentRef.current = { x: 0, y: 0 }
  }

  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesCategory =
        activeCategory === 'ALL' || event.type === activeCategory

      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        event.title.toLowerCase().includes(q) ||
        event.tagline.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q) ||
        event.type.toLowerCase().includes(q)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const techEvents = useMemo(() => {
    return filteredEvents.filter((e) => e.type === 'TECHNICAL')
  }, [filteredEvents])

  const nonTechEvents = useMemo(() => {
    return filteredEvents.filter((e) => e.type === 'NON-TECHNICAL')
  }, [filteredEvents])

  const counts = {
    all: eventsData.length,
    technical: eventsData.filter((e) => e.type === 'TECHNICAL').length,
    nonTechnical: eventsData.filter((e) => e.type === 'NON-TECHNICAL').length
  }

  const renderEventCard = (event, idx) => {
    const isHovered = hoveredId === event.id
    const imgFailed = !!imgFails[event.id]
    const openRules = () => setSelectedEvent(event)

    return (
      <motion.div
        key={event.id}
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.45, delay: idx * 0.07 }}
        className="ab-tile-wrap"
        style={{ perspective: 1200 }}
        onMouseEnter={() => setHoveredId(event.id)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => {
          if (window.innerWidth < 768) {
            isHovered ? openRules() : setHoveredId(event.id)
          } else {
            openRules()
          }
        }}
      >
        <div className={`ab-bloom ${isHovered ? 'on' : ''}`} />

        <motion.div
          className="ab-stack"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateX: 75 * !!isHovered }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          {/* Card Frame */}
          <div className={`ab-frame ${isHovered ? 'hovered' : ''}`}>
            {!imgFailed ? (
              <img
                src={event.coverImage}
                alt={event.title}
                loading="lazy"
                className={`ab-img ${isHovered ? 'hovered' : ''}`}
                style={{
                  objectFit: event.objectFit || 'cover',
                  objectPosition: event.objectPosition || 'center'
                }}
                onError={() => setImgFails((p) => (p[event.id] ? p : { ...p, [event.id]: true }))}
              />
            ) : (
              <div className="ab-img-fallback shown">
                <span>{event.title}</span>
              </div>
            )}
            <div className="ab-overlay" />
            {event.hasCashPrize && (
              <span className="ab-cash-chip">{event.cashPrizeBadge || '₹10,000 Cash Prize'}</span>
            )}
          </div>

          {/* Reveal Layer */}
          <motion.div
            className="ab-reveal"
            initial={{ opacity: 0, z: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              z: isHovered ? 120 : 0,
              y: 0,
              rotateX: isHovered ? -75 : 0
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{ transformStyle: 'preserve-3d', pointerEvents: isHovered ? 'auto' : 'none' }}
          >
            <div className="ab-title-box">
              <h4 className="ab-tile-title">{event.title}</h4>
            </div>

            <div className="ab-divider" />

            <div className="ab-info">
              <p className="ab-info-row">
                <span className="ab-info-label">Time : </span>
                <span className="ab-info-val">{event.time}</span>
              </p>
              <p className="ab-info-row ab-info-clamp">
                <span className="ab-info-label">Date : </span>
                <span className="ab-info-val">{event.date}</span>
              </p>
              <p className="ab-info-row ab-info-clamp">
                <span className="ab-info-label">Venue : </span>
                <span className="ab-info-val">{event.venue}</span>
              </p>
            </div>

            <motion.button
              className="ab-know-more"
              onClick={(e) => { e.stopPropagation(); openRules() }}
              whileHover={{ scale: 1.1, boxShadow: '0px 0px 20px rgb(220, 38, 38)', backgroundColor: '#ffffff', color: '#000000' }}
              whileTap={{ scale: 0.9 }}
            >
              Know More
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <section className="events-section" id="events">
      {/* Background Effects */}
      <div className="events-bg-effects">
        <div className="cyber-glow-orb orb-1" />
        <div className="cyber-glow-orb orb-2" />
        <div className="events-dot-grid" />
      </div>

      <div
        className="events-container"
        onTouchStart={handleEventsTouchStart}
        onTouchMove={handleEventsTouchMove}
        onTouchEnd={handleEventsTouchEnd}
      >
        {/* Section Header */}
        <motion.div
          className="events-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="section-label">
            <span className="label-text">CHALLENGE ARENAS</span>
          </div>

          <h2 className="events-title">
            <span>OUR </span>
            <span className="gradient-text">EVENTS</span>
          </h2>

          <p className="events-subtitle">
            Explore 6 electrifying competitions across Technical and Non-Technical domains. Hover over any event to discover more.
          </p>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          className="stats-strip"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <div className="strip-item">
            <Layers size={16} />
            <span className="strip-val">06</span>
            <span className="strip-lbl">Events</span>
          </div>
          <div className="strip-sep" />
          <div className="strip-item">
            <Trophy size={16} />
            <span className="strip-val">₹10,000</span>
            <span className="strip-lbl">Cash Prize</span>
          </div>
          <div className="strip-sep" />
          <div className="strip-item">
            <Calendar size={16} />
            <span className="strip-val">25.09.2026</span>
            <span className="strip-lbl">Event Date</span>
          </div>
          <div className="strip-sep" />
          <div className="strip-item">
            <Zap size={16} />
            <span className="strip-val">National</span>
            <span className="strip-lbl">Certification</span>
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          className="filter-pills-bar"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
        >
          <div className="pills-group">
            {[
              { key: 'ALL', label: 'All Events', count: counts.all, icon: <Sparkles size={15} /> },
              { key: 'TECHNICAL', label: 'Technical', count: counts.technical, icon: <Code2 size={15} /> },
              { key: 'NON-TECHNICAL', label: 'Non-Technical', count: counts.nonTechnical, icon: <Gamepad2 size={15} /> }
            ].map((cat) => (
              <button
                key={cat.key}
                className={`filter-pill ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.icon}
                <span>{cat.label}</span>
                <span className="pill-count">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="events-search-wrap">
            <Search size={15} className="search-ico" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="events-search"
            />
          </div>
        </motion.div>

        {/* ════════ TECHNICAL EVENTS SECTION ════════ */}
        {techEvents.length > 0 && (
          <div className="events-category-block">
            <div className="category-header-banner cyan-banner">
              <div className="cat-header-left">
                <Code2 size={22} className="cat-icon cyan-icon" />
                <h3 className="category-title">TECHNICAL EVENTS</h3>
              </div>
              <span className="cat-count-badge cyan-badge">{techEvents.length} Competitions</span>
            </div>

            <motion.div layout className="flip-grid">
              <AnimatePresence mode="popLayout">
                {techEvents.map((event, idx) => renderEventCard(event, idx))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* ════════ NON-TECHNICAL EVENTS SECTION ════════ */}
        {nonTechEvents.length > 0 && (
          <div className="events-category-block">
            <div className="category-header-banner pink-banner">
              <div className="cat-header-left">
                <Gamepad2 size={22} className="cat-icon pink-icon" />
                <h3 className="category-title">NON-TECHNICAL EVENTS</h3>
              </div>
              <span className="cat-count-badge pink-badge">{nonTechEvents.length} Competitions</span>
            </div>

            <motion.div layout className="flip-grid">
              <AnimatePresence mode="popLayout">
                {nonTechEvents.map((event, idx) => renderEventCard(event, idx))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="events-empty">
            <HelpCircle size={44} />
            <h3>No events match your search</h3>
            <p>Try a different keyword or reset filters.</p>
            <button className="btn-reset" onClick={() => { setActiveCategory('ALL'); setSearchQuery('') }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onOpenRegister={(evt) => setRegisteringEvent(evt)}
        />
      )}

      {registeringEvent && (
        <RegisterModal
          event={registeringEvent}
          onClose={() => setRegisteringEvent(null)}
        />
      )}
    </section>
  )
}
