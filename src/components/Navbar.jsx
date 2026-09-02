import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, Calendar, Layers, Shield, ChevronRight } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      const sections = ['about', 'events', 'gallery']
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
          <div className="nav-brand" onClick={() => scrollToSection('about')}>
            <div className="brand-hex-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="3.5" fill="currentColor" />
              </svg>
            </div>
            <div className="brand-text-wrap">
              <span className="brand-title">ZENOFEST<span className="brand-year">'26</span></span>
              <span className="brand-tag">NATIONAL EXPO</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            <button
              className={`nav-link-btn ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              <span className="nav-link-num">01</span>
              <span>About</span>
              {activeSection === 'about' && <motion.div layoutId="nav-pill" className="nav-active-pill" />}
            </button>

            <button
              className={`nav-link-btn ${activeSection === 'events' ? 'active' : ''}`}
              onClick={() => scrollToSection('events')}
            >
              <span className="nav-link-num">02</span>
              <span>Events</span>
              <span className="nav-event-count">6</span>
              {activeSection === 'events' && <motion.div layoutId="nav-pill" className="nav-active-pill" />}
            </button>

            <button
              className={`nav-link-btn ${activeSection === 'gallery' ? 'active' : ''}`}
              onClick={() => scrollToSection('gallery')}
            >
              <span className="nav-link-num">03</span>
              <span>Gallery</span>
              {activeSection === 'gallery' && <motion.div layoutId="nav-pill" className="nav-active-pill" />}
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
                className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => scrollToSection('about')}
              >
                <span className="m-num">01</span>
                <span>About the Fest</span>
                <ChevronRight size={16} />
              </button>

              <button
                className={`mobile-nav-link ${activeSection === 'events' ? 'active' : ''}`}
                onClick={() => scrollToSection('events')}
              >
                <span className="m-num">02</span>
                <span>Events (Technical & Non-Technical)</span>
                <ChevronRight size={16} />
              </button>

              <button
                className={`mobile-nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
                onClick={() => scrollToSection('gallery')}
              >
                <span className="m-num">03</span>
                <span>HUD Gallery Scanner</span>
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
