import { motion } from 'framer-motion'
import { Mail, User, Phone, MapPin } from 'lucide-react'
import './Contact.css'

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      {/* Ambient background glows */}
      <div className="contact-bg-overlay" />
      <div className="contact-matrix-grid" />

      <div className="contact-container">
        {/* Main Section Header */}
        <motion.div
          className="contact-title-wrap"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="contact-title">Contact the Organizing Team</h2>
        </motion.div>

        {/* 2-Column Main Contact & Map Section */}
        <div className="contact-grid">
          {/* Left Column: Contact Card */}
          <motion.div
            className="contact-card-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Email & Instagram Row Header */}
            <div className="contact-social-links" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="contact-email-row">
                <Mail className="contact-email-icon" size={20} />
                <a href="mailto:itassociation@psr.edu.in" className="contact-email-link">
                  itassociation@psr.edu.in
                </a>
              </div>

              <div className="contact-email-row">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-email-icon" style={{ color: '#e1306c' }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <a
                  href="https://www.instagram.com/zenofest_2k26?igsi=MW5rdDdmd3FpNTZicw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-email-link"
                  style={{ color: '#f472b6' }}
                >
                  @zenofest_2k26
                </a>
              </div>
            </div>

            {/* Faculty Coordinators */}
            <div className="contact-group">
              <h4 className="contact-group-heading">Faculty Coordinators :</h4>
              <div className="contact-info-list">
                <div className="contact-person-row">
                  <span className="contact-person-name">
                    <User className="contact-person-icon" size={16} />
                    <span>Mr. S. Shunmuga Sundaram, AP/IT</span>
                  </span>
                </div>

                <div className="contact-person-row">
                  <span className="contact-person-name">
                    <User className="contact-person-icon" size={16} />
                    <span>Ms. M. Anitha, AP/IT</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Student Coordinators */}
            <div className="contact-group">
              <h4 className="contact-group-heading">Student Coordinators :</h4>
              <div className="contact-info-list">
                <div className="contact-person-row">
                  <span className="contact-person-name">
                    <User className="contact-person-icon" size={16} />
                    <span>Thayanithi M, III/IT</span>
                  </span>
                  <span className="contact-sep">|</span>
                  <a href="tel:+916380877556" className="contact-phone-link">
                    <Phone className="contact-phone-icon" size={16} />
                    <span>+91 6380877556</span>
                  </a>
                </div>

                <div className="contact-person-row">
                  <span className="contact-person-name">
                    <User className="contact-person-icon" size={16} />
                    <span>Ashwin Kumar, III/IT</span>
                  </span>
                  <span className="contact-sep">|</span>
                  <a href="tel:+918940678167" className="contact-phone-link">
                    <Phone className="contact-phone-icon" size={16} />
                    <span>+91 8940678167</span>
                  </a>
                </div>

                <div className="contact-person-row">
                  <span className="contact-person-name">
                    <User className="contact-person-icon" size={16} />
                    <span>Dharshini V, III/IT</span>
                  </span>
                </div>

                <div className="contact-person-row">
                  <span className="contact-person-name">
                    <User className="contact-person-icon" size={16} />
                    <span>Divya Dharshini E, III/IT</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Google Maps Location */}
          <motion.div
            className="contact-map-wrap"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <iframe
              title="PSR Engineering College Map"
              src="https://maps.google.com/maps?q=PSR%20Engineering%20College,%20Sivakasi&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="contact-map-iframe"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        {/* Bottom Horizontal Divider */}
        <div className="contact-divider" />

        {/* Footer Credits */}
        <motion.div
          className="contact-footer-content"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="footer-designed-by-title">Design and Developed by</h3>

          <div className="footer-developers-grid">
            <div className="dev-column">
              <span>Bhuvaneshwari A, III/IT</span>
              <span>Veni Vaishnavi M, III/IT</span>
              <span>Logeshwari P, III/IT</span>
              <span>Saranya S, III/IT</span>
            </div>

            <div className="dev-center-divider" />

            <div className="dev-column">
              <span>Vignesh B, III/IT</span>
              <span>Yukanthan P G, III/IT</span>
              <span>Ramakrishnan M, III/IT</span>
              <span>Ram Kumar J, III/IT</span>

            </div>
          </div>

          <p className="footer-college-sub">
            Zenofest 2K26 | PSR Engineering College
          </p>
        </motion.div>
      </div>
    </section>
  )
}
