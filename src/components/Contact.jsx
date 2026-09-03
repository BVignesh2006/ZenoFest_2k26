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
            {/* Email Row */}
            <div className="contact-email-row">
              <Mail className="contact-email-icon" size={20} />
              <a href="mailto:itassociation@psr.edu.in" className="contact-email-link">
                itassociation@psr.edu.in
              </a>
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
              </div>
            </div>

            {/* Faculty Coordinators */}
            <div className="contact-group">
              <h4 className="contact-group-heading">Faculty Coordinators :</h4>
              <div className="contact-info-list">
                <div className="contact-person-row">
                  <span className="contact-person-name">
                    <User className="contact-person-icon" size={16} />
                    <span>Mr.S.Shunmuga Sundaram, AP/IT</span>
                  </span>
                </div>

                <div className="contact-person-row">
                  <span className="contact-person-name">
                    <User className="contact-person-icon" size={16} />
                    <span>Ms.M.Anitha, AP/IT</span>
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
              <span>Manisha P, III/IT</span>
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
