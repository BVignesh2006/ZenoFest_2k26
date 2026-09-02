import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

export default function EventModal({ event, onClose, onOpenRegister }) {
  const [activeTab, setActiveTab] = useState('rules')

  if (!event) return null

  const isTech = event.type === 'TECHNICAL'

  return (
    <AnimatePresence>
      <div className="event-modal-backdrop" onClick={onClose}>
        {/* Backdrop blur overlay */}
        <motion.div
          className="event-modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Cyber Corner Accents */}
          <div className="modal-corner modal-corner-tl" />
          <div className="modal-corner modal-corner-tr" />
          <div className="modal-corner modal-corner-bl" />
          <div className="modal-corner modal-corner-br" />

          {/* Modal Header */}
          <div className="modal-hero" style={{ '--accent-color': event.accentColor }}>
            <div className="modal-hero-bg">
              <img src={event.coverImage} alt={event.title} className="modal-hero-img" />
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
                <div className="quick-info-item">
                  <Calendar size={16} className="info-icon" />
                  <span>{event.date}</span>
                </div>
                <div className="quick-info-item">
                  <Clock size={16} className="info-icon" />
                  <span>{event.time}</span>
                </div>
                <div className="quick-info-item">
                  <Users size={16} className="info-icon" />
                  <span>{event.teamSize}</span>
                </div>
                <div className="quick-info-item">
                  <MapPin size={16} className="info-icon" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="modal-nav-tabs">
            <button
              className={`modal-tab-btn ${activeTab === 'rules' ? 'active' : ''}`}
              onClick={() => setActiveTab('rules')}
            >
              <FileText size={16} />
              <span>Rules & Guidelines</span>
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'rounds' ? 'active' : ''}`}
              onClick={() => setActiveTab('rounds')}
            >
              <Layers size={16} />
              <span>Rounds & Format</span>
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Sparkles size={16} />
              <span>Overview & Prizes</span>
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'coordinators' ? 'active' : ''}`}
              onClick={() => setActiveTab('coordinators')}
            >
              <UserCheck size={16} />
              <span>Coordinators</span>
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="modal-body-scroll">
            {/* ── TAB 1: RULES ── */}
            {activeTab === 'rules' && (
              <motion.div
                key="rules"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="modal-tab-pane"
              >
                <div className="rules-header-callout">
                  <ShieldAlert size={20} className="callout-icon" />
                  <div>
                    <h4>Official Rules & Conduct</h4>
                    <p>Please adhere strictly to the following regulations throughout the event.</p>
                  </div>
                </div>

                <div className="rules-list">
                  {event.rules.map((rule, idx) => (
                    <div key={idx} className="rule-item">
                      <div className="rule-number-box">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="rule-text">{rule}</div>
                    </div>
                  ))}
                </div>

                <div className="requirements-section">
                  <h4 className="sub-heading">
                    <CheckCircle2 size={18} className="sub-icon" />
                    Mandatory Requirements & Checklist
                  </h4>
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

            {/* ── TAB 2: ROUNDS ── */}
            {activeTab === 'rounds' && (
              <motion.div
                key="rounds"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="modal-tab-pane"
              >
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
                          <h4 className="round-title">{round.title}</h4>
                          <span className="round-time-badge">
                            <Clock size={13} />
                            {round.time}
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
                  <h4 className="sub-heading">
                    <Sparkles size={18} className="sub-icon" />
                    Event Synopsis
                  </h4>
                  <p className="overview-long-text">{event.overview}</p>
                </div>

                {/* Prize Breakdown */}
                <div className="prizes-wrapper">
                  <h4 className="sub-heading">
                    <Trophy size={18} className="sub-icon" />
                    {event.hasCashPrize ? 'Cash Prize & Awards Distribution' : 'Awards & Recognition'}
                  </h4>
                  <div className="prize-podium-grid">
                    <div className="prize-card podium-first">
                      <div className="prize-rank">1ST PLACE</div>
                      <div className="prize-amount">{event.firstPrize}</div>
                      <div className="prize-perk">
                        {event.hasCashPrize
                          ? 'Winner Trophy + Certificate of Merit + Fest Swag'
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
                    <h5>Venue Location</h5>
                    <p>{event.venue} — ZenoFest Campus, PSR Engineering College, Sivakasi.</p>
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

            <div className="modal-footer-actions">
              <button className="btn-secondary" onClick={onClose}>
                Close
              </button>
              <button
                className="btn-primary-glow"
                onClick={() => {
                  onClose()
                  onOpenRegister(event)
                }}
              >
                Register For Event
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
