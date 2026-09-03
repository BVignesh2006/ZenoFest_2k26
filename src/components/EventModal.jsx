import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  ShieldAlert,
  CheckCircle2,
  Phone,
  Mail,
  Sparkles,
  Layers,
  FileText,
  UserCheck
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EventModal({ event, onClose, onOpenRegister }) {
  const [activeTab, setActiveTab] = useState('rules')
  const backdropRef = useRef(null)
  const containerRef = useRef(null)
  const bodyScrollRef = useRef(null)

  useEffect(() => {
    setActiveTab('rules')
  }, [event?.id])

  useEffect(() => {
    if (backdropRef.current) backdropRef.current.scrollTop = 0
    if (containerRef.current) containerRef.current.scrollTop = 0
    if (bodyScrollRef.current) bodyScrollRef.current.scrollTop = 0
  }, [event?.id, activeTab])

  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [event])

  if (!event) return null

  const isTech = event.type === 'TECHNICAL'

  const modalContent = (
    <AnimatePresence key={event.id}>
      <div className="event-modal-backdrop" ref={backdropRef} onClick={onClose}>
        {/* Backdrop container */}
        <motion.div
          className="event-modal-container"
          ref={containerRef}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{ '--event-accent': event.accentColor || '#06b6d4' }}
        >
          {/* Cyber Corner Accents */}
          <div className="modal-corner modal-corner-tl" />
          <div className="modal-corner modal-corner-tr" />
          <div className="modal-corner modal-corner-bl" />
          <div className="modal-corner modal-corner-br" />

          {/* Modal Header */}
          <div className="modal-hero">
            <div className="modal-hero-bg">
              <img
                src={event.coverImage}
                alt={event.title}
                className="modal-hero-img"
                style={{
                  objectFit: event.objectFit || 'cover',
                  objectPosition: event.objectPosition || 'center'
                }}
              />
              <div className="modal-hero-gradient" />
            </div>

            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className="modal-hero-content">
              <div className="modal-badges">
                <span className={`modal-type-badge ${isTech ? 'badge-tech' : 'badge-non-tech'}`}>
                  {event.type}
                </span>
                {event.badge && <span className="modal-featured-badge">{event.badge}</span>}
              </div>

              <h2 className="modal-title">{event.title}</h2>
              <p className="modal-tagline">{event.tagline}</p>

              {/* Quick Info Grid */}
              <div className="modal-quick-info">
                <div className="quick-info-item highlight">
                  <Calendar size={15} className="info-icon cyan" />
                  <span>Date: {event.date}</span>
                </div>
                <div className="quick-info-item highlight">
                  <Clock size={15} className="info-icon cyan" />
                  <span>Timing: {event.time}</span>
                </div>
                <div className="quick-info-item highlight">
                  <Users size={15} className="info-icon purple" />
                  <span>Team: {event.teamSize}</span>
                </div>
                <div className="quick-info-item">
                  <MapPin size={15} className="info-icon purple" />
                  <span>Venue: {event.venue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs - High Contrast Icons & Labels */}
          <div className="modal-nav-tabs">
            <button
              className={`modal-tab-btn ${activeTab === 'rules' ? 'active' : ''}`}
              onClick={() => setActiveTab('rules')}
            >
              <FileText size={16} className="tab-btn-icon" />
              <span>Rules & Instructions</span>
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'rounds' ? 'active' : ''}`}
              onClick={() => setActiveTab('rounds')}
            >
              <Layers size={16} className="tab-btn-icon" />
              <span>Rounds & Timings</span>
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Sparkles size={16} className="tab-btn-icon" />
              <span>Overview & Prizes</span>
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'coordinators' ? 'active' : ''}`}
              onClick={() => setActiveTab('coordinators')}
            >
              <UserCheck size={16} className="tab-btn-icon" />
              <span>Coordinators</span>
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="modal-body-scroll" ref={bodyScrollRef}>
            {/* ── TAB 1: RULES & INSTRUCTIONS ── */}
            {activeTab === 'rules' && (
              <motion.div
                key="rules"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="modal-tab-pane"
              >
                <div className="tab-pane-header-box">
                  <h3 className="tab-pane-title">
                    <ShieldAlert size={20} className="title-icon cyan" />
                    <span>Official Rules & General Instructions</span>
                  </h3>
                  <p className="tab-pane-subtitle">
                    Please read and strictly adhere to the following rules and instructions throughout the event.
                  </p>
                </div>

                {/* Event Specs Summary Banner */}
                <div className="event-timings-summary-banner">
                  <div className="timing-summary-item">
                    <Clock size={18} className="t-icon" />
                    <div>
                      <span className="t-label">Event Timing</span>
                      <span className="t-val">{event.time}</span>
                    </div>
                  </div>
                  <div className="timing-summary-item">
                    <Calendar size={18} className="t-icon" />
                    <div>
                      <span className="t-label">Event Date</span>
                      <span className="t-val">{event.date}</span>
                    </div>
                  </div>
                  <div className="timing-summary-item">
                    <Users size={18} className="t-icon" />
                    <div>
                      <span className="t-label">Team Members</span>
                      <span className="t-val">{event.teamSize}</span>
                    </div>
                  </div>
                  <div className="timing-summary-item">
                    <MapPin size={18} className="t-icon" />
                    <div>
                      <span className="t-label">Reporting Venue</span>
                      <span className="t-val">{event.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Rules List with Section Divider Headers */}
                <div className="rules-list">
                  {event.rules.map((rule, idx) => {
                    const isSectionHeader = rule.trim().endsWith(':') || rule.startsWith('Round 1') || rule.startsWith('Round 2')
                    if (isSectionHeader) {
                      return (
                        <div key={idx} className="rule-section-divider">
                          <span className="rule-section-title">{rule}</span>
                        </div>
                      )
                    }
                    return (
                      <div key={idx} className="rule-item">
                        <div className="rule-number-box">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="rule-text">{rule}</div>
                      </div>
                    )
                  })}
                </div>

                <div className="requirements-section">
                  <h3 className="tab-pane-title">
                    <CheckCircle2 size={20} className="title-icon purple" />
                    <span>Mandatory Instructions & Checklist</span>
                  </h3>
                  <div className="requirements-grid">
                    {event.requirements.map((req, idx) => (
                      <div key={idx} className="requirement-card">
                        <span className="req-bullet" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── TAB 2: ROUNDS & TIMINGS ── */}
            {activeTab === 'rounds' && (
              <motion.div
                key="rounds"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="modal-tab-pane"
              >
                <div className="tab-pane-header-box">
                  <h3 className="tab-pane-title">
                    <Layers size={20} className="title-icon cyan" />
                    <span>Event Rounds & Schedule Timings</span>
                  </h3>
                  <p className="tab-pane-subtitle">
                    Round-by-round breakdown, timing durations, team format, and venue schedule.
                  </p>
                </div>

                {/* 4-Column Timings, Date & Team Members Summary Banner */}
                <div className="event-timings-summary-banner">
                  <div className="timing-summary-item">
                    <Clock size={18} className="t-icon" />
                    <div>
                      <span className="t-label">Event Timing</span>
                      <span className="t-val">{event.time}</span>
                    </div>
                  </div>
                  <div className="timing-summary-item">
                    <Calendar size={18} className="t-icon" />
                    <div>
                      <span className="t-label">Event Date</span>
                      <span className="t-val">{event.date}</span>
                    </div>
                  </div>
                  <div className="timing-summary-item">
                    <Users size={18} className="t-icon" />
                    <div>
                      <span className="t-label">Team Members</span>
                      <span className="t-val">{event.teamSize}</span>
                    </div>
                  </div>
                  <div className="timing-summary-item">
                    <MapPin size={18} className="t-icon" />
                    <div>
                      <span className="t-label">Reporting Venue</span>
                      <span className="t-val">{event.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Rounds Timeline */}
                <div className="rounds-timeline">
                  {event.rounds.map((round, idx) => (
                    <div key={idx} className="timeline-card">
                      <div className="timeline-indicator">
                        <div className="timeline-node">
                          <span>{round.roundNumber}</span>
                        </div>
                        {idx < event.rounds.length - 1 && <div className="timeline-line" />}
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-top">
                          <h4 className="round-title">Round {round.roundNumber}: {round.title}</h4>
                          <span className="round-time-badge">
                            <Clock size={13} />
                            <span>Duration: {round.time}</span>
                          </span>
                        </div>
                        <p className="round-desc">{round.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── TAB 3: OVERVIEW & PRIZES ── */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="modal-tab-pane"
              >
                <div className="overview-card">
                  <h3 className="tab-pane-title">
                    <Sparkles size={20} className="title-icon cyan" />
                    <span>Event Synopsis & Overview</span>
                  </h3>
                  <p className="overview-long-text">{event.overview}</p>
                </div>

                {/* Prize Breakdown */}
                <div className="prizes-wrapper">
                  <h3 className="tab-pane-title">
                    <Trophy size={20} className="title-icon gold" />
                    <span>{event.hasCashPrize ? 'Cash Prize & Awards Distribution' : 'Awards & Merit Recognition'}</span>
                  </h3>
                  <div className="prize-podium-grid">
                    <div className="prize-card podium-first">
                      <div className="prize-rank">1ST PLACE</div>
                      <div className="prize-amount">{event.firstPrize}</div>
                      <div className="prize-perk">
                        {event.hasCashPrize
                          ? 'Winner Trophy + Certificate of Merit + Cash Prize'
                          : 'Winner Trophy + Certificate of Merit'}
                      </div>
                    </div>
                    <div className="prize-card podium-second">
                      <div className="prize-rank">2ND PLACE</div>
                      <div className="prize-amount">{event.secondPrize}</div>
                      <div className="prize-perk">Runner Trophy + Certificate of Merit</div>
                    </div>
                    <div className="prize-card podium-third">
                      <div className="prize-rank">3RD PLACE</div>
                      <div className="prize-amount">{event.thirdPrize}</div>
                      <div className="prize-perk">Certificate of Appreciation</div>
                    </div>
                  </div>
                  <div className="prize-note">
                    * All verified participants will receive an official National-Level Certificate from ZenoFest 2K26, PSR Institutions.
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── TAB 4: COORDINATORS ── */}
            {activeTab === 'coordinators' && (
              <motion.div
                key="coordinators"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="modal-tab-pane"
              >
                <h3 className="tab-pane-title">
                  <UserCheck size={20} className="title-icon cyan" />
                  <span>Event Lead Coordinators</span>
                </h3>
                <p className="coordinators-intro">
                  Have questions regarding event guidelines, technical setup, or on-spot reporting? Reach out directly to the event leads below:
                </p>

                <div className="coordinators-grid">
                  {event.coordinators.map((coord, idx) => (
                    <div key={idx} className="coordinator-card">
                      <div className="coord-avatar">
                        {coord.name.charAt(0)}
                      </div>
                      <div className="coord-details">
                        <h4 className="coord-name">{coord.name}</h4>
                        <span className="coord-role">{coord.role}</span>
                        <div className="coord-links">
                          <a href={`tel:${coord.phone.replace(/\s+/g, '')}`} className="coord-link">
                            <Phone size={14} />
                            <span>{coord.phone}</span>
                          </a>
                          <a href={`mailto:${coord.email}`} className="coord-link">
                            <Mail size={14} />
                            <span>{coord.email}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="venue-detail-box">
                  <MapPin size={22} className="venue-box-icon" />
                  <div>
                    <h5>Venue Location & Schedule</h5>
                    <p>{event.venue} — ZenoFest Campus, PSR Engineering College, Sivakasi ({event.date} @ {event.time}).</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <div className="modal-footer-prize">
              <span className="footer-prize-label">Total Prize Pool</span>
              <span className="footer-prize-value">{event.prizePool}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}
