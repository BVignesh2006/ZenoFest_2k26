import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, Calendar, Layers, Shield, ChevronRight } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      const sections = ['home', 'about', 'events', 'timeline', 'faq', 'contact']
      const scrollPosition = window.scrollY + 250

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Brand Logo */}
          <div className="nav-brand" onClick={() => scrollToSection('home')}>
            <div className="brand-hex-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-title">ZenoFest</span>
              <span className="brand-year">2K26</span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="nav-desktop-links">
            <button
              className={`nav-link-btn ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home')}
            >
              <span>Home</span>
              {activeSection === 'home' && <motion.div layoutId="nav-pill" className="nav-active-pill" />}
            </button>

            <button
              className={`nav-link-btn ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              <span>About</span>
              {activeSection === 'about' && <motion.div layoutId="nav-pill" className="nav-active-pill" />}
            </button>

            <button
              className={`nav-link-btn ${activeSection === 'events' ? 'active' : ''}`}
              onClick={() => scrollToSection('events')}
            >
              <span>Events</span>
              {activeSection === 'events' && <motion.div layoutId="nav-pill" className="nav-active-pill" />}
            </button>

            <button
              className={`nav-link-btn ${activeSection === 'timeline' ? 'active' : ''}`}
              onClick={() => scrollToSection('timeline')}
            >
              <span>Timeline</span>
              {activeSection === 'timeline' && <motion.div layoutId="nav-pill" className="nav-active-pill" />}
            </button>

            <button
              className={`nav-link-btn ${activeSection === 'faq' ? 'active' : ''}`}
              onClick={() => scrollToSection('faq')}
            >
              <span>FAQ</span>
              {activeSection === 'faq' && <motion.div layoutId="nav-pill" className="nav-active-pill" />}
            </button>

            <button
              className={`nav-link-btn ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              <span>Contact</span>
              {activeSection === 'contact' && <motion.div layoutId="nav-pill" className="nav-active-pill" />}
            </button>
          </nav>

          {/* Right Action */}
          <div className="nav-right-actions">
            <button
              className="nav-cta-btn"
              onClick={() => scrollToSection('events')}
            >
              <Sparkles size={14} />
              <span>Explore Events</span>
            </button>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-nav-content">
              <button
                className={`mobile-nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => scrollToSection('home')}
              >
                <span>Home Page</span>
                <ChevronRight size={16} />
              </button>

              <button
                className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => scrollToSection('about')}
              >
                <span>About the Fest</span>
                <ChevronRight size={16} />
              </button>

              <button
                className={`mobile-nav-link ${activeSection === 'events' ? 'active' : ''}`}
                onClick={() => scrollToSection('events')}
              >
                <span>Events (Technical & Non-Technical)</span>
                <ChevronRight size={16} />
              </button>

              <button
                className={`mobile-nav-link ${activeSection === 'timeline' ? 'active' : ''}`}
                onClick={() => scrollToSection('timeline')}
              >
                <span>Fest Timeline & Schedule</span>
                <ChevronRight size={16} />
              </button>

              <button
                className={`mobile-nav-link ${activeSection === 'faq' ? 'active' : ''}`}
                onClick={() => scrollToSection('faq')}
              >
                <span>Frequently Asked Questions (FAQ)</span>
                <ChevronRight size={16} />
              </button>

              <button
                className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => scrollToSection('contact')}
              >
                <span>Contact Organizing Team</span>
                <ChevronRight size={16} />
              </button>

              <div className="mobile-nav-footer">
                <button
                  className="btn-primary-glow mobile-cta"
                  onClick={() => scrollToSection('events')}
                >
                  Register for Events
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
