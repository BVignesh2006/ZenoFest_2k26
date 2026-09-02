import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Trophy, Users, Send } from 'lucide-react'

export default function RegisterModal({ event, onClose }) {
  const [formData, setFormData] = useState({
    leaderName: '',
    email: '',
    phone: '',
    college: '',
    teamName: '',
    membersCount: '1',
    yearOfStudy: '3rd Year',
    department: 'Information Technology'
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!event) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <AnimatePresence>
      <div className="event-modal-backdrop" onClick={onClose}>
        <motion.div
          className="event-modal-container register-modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Cyber Corner Accents */}
          <div className="modal-corner modal-corner-tl" />
          <div className="modal-corner modal-corner-tr" />
          <div className="modal-corner modal-corner-bl" />
          <div className="modal-corner modal-corner-br" />

          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>

          {!submitted ? (
            <div className="register-form-wrapper">
              <div className="register-header">
                <div className="register-badge-row">
                  <span className={`modal-type-badge ${event.type === 'TECHNICAL' ? 'badge-tech' : 'badge-non-tech'}`}>
                    {event.type}
                  </span>
                  <span className="register-limit-badge">
                    <Users size={13} /> {event.teamSize}
                  </span>
                </div>
                <h2 className="register-title">Register for {event.title}</h2>
                <p className="register-subtitle">
                  Fill in your team details below to reserve your slot for ZenoFest'26.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Team Leader / Participant Name *</label>
                    <input
                      type="text"
                      name="leaderName"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={formData.leaderName}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Team Name (Optional for Solo)</label>
                    <input
                      type="text"
                      name="teamName"
                      placeholder="e.g. CyberKnights"
                      value={formData.teamName}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Official Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="alex@college.edu"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">WhatsApp Contact Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group form-col-span-2">
                    <label className="form-label">College / Institute Name *</label>
                    <input
                      type="text"
                      name="college"
                      required
                      placeholder="e.g. PSR Engineering College, Sivakasi"
                      value={formData.college}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      name="department"
                      placeholder="e.g. Information Technology / CSE"
                      value={formData.department}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Year of Study</label>
                    <select
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year / Final">4th Year / Final</option>
                    </select>
                  </div>
                </div>

                <div className="form-footer-action">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary-glow btn-submit-reg"
                  >
                    {isSubmitting ? (
                      <span>Verifying slot...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Confirm Registration</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="register-success-view">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="success-icon-wrap"
              >
                <CheckCircle size={64} className="success-icon" />
              </motion.div>

              <h3 className="success-title">Registration Confirmed!</h3>
              <p className="success-message">
                You have successfully registered for <strong>{event.title}</strong> at ZenoFest'26.
              </p>

              <div className="success-details-card">
                <div className="success-detail-row">
                  <span className="s-label">Event:</span>
                  <span className="s-val">{event.title} ({event.type})</span>
                </div>
                <div className="success-detail-row">
                  <span className="s-label">Lead Name:</span>
                  <span className="s-val">{formData.leaderName || 'Participant'}</span>
                </div>
                <div className="success-detail-row">
                  <span className="s-label">Date & Time:</span>
                  <span className="s-val">{event.date} • {event.time}</span>
                </div>
                <div className="success-detail-row">
                  <span className="s-label">Venue:</span>
                  <span className="s-val">{event.venue}</span>
                </div>
              </div>

              <div className="success-tip">
                <Trophy size={16} />
                <span>A confirmation slip with reporting guidelines will be shared to {formData.email || 'your email'}.</span>
              </div>

              <button className="btn-primary-glow" onClick={onClose} style={{ marginTop: '20px' }}>
                Done & Return to Events
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
