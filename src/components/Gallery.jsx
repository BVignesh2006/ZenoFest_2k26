import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Gallery.css'

const galleryItems = [
  {
    id: 1,
    systemId: 'TARGET-001',
    title: 'LIGHTING THE LAMP',
    category: 'Commencement',
    time: 'Day 1 — 09:00 AM',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
    description: 'Sacred Kuthuvilakku',
    label: 'Inauguration'
  },
  {
    id: 2,
    systemId: 'TARGET-002',
    title: 'PROJECT DEMONSTRATIONS',
    category: 'Innovations',
    time: 'Day 1 — 11:30 AM',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop',
    description: 'Students showcasing projects',
    label: 'Demo'
  },
  {
    id: 3,
    systemId: 'TARGET-003',
    title: 'TECH KEYNOTE SESSION',
    category: 'Expert Talks',
    time: 'Day 1 — 02:00 PM',
    img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=800&fit=crop',
    description: 'Industry insights',
    label: 'Keynote'
  },
  {
    id: 4,
    systemId: 'TARGET-004',
    title: 'AUDIENCE ENGAGEMENT',
    category: 'Participation',
    time: 'Day 1 — 03:30 PM',
    img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1200&h=800&fit=crop',
    description: 'Energetic crowds',
    label: 'Audience'
  },
  {
    id: 5,
    systemId: 'TARGET-005',
    title: 'WORKSHOP SESSION',
    category: 'Hands-on Learning',
    time: 'Day 2 — 10:00 AM',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop',
    description: 'Framework tutorials',
    label: 'Workshop'
  },
  {
    id: 6,
    systemId: 'TARGET-006',
    title: 'AWARD CEREMONY',
    category: 'Recognition',
    time: 'Day 2 — 04:00 PM',
    img: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=1200&h=800&fit=crop',
    description: 'Prize distribution',
    label: 'Ceremony'
  },
  {
    id: 7,
    systemId: 'TARGET-007',
    title: 'TEAM COLLABORATIONS',
    category: 'Teamwork',
    time: 'Day 1 — 04:30 PM',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop',
    description: 'Brainstorming ideas',
    label: 'Team'
  },
  {
    id: 8,
    systemId: 'TARGET-008',
    title: 'NETWORKING BREAK',
    category: 'Connections',
    time: 'Day 2 — 12:00 PM',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop',
    description: 'Sharing ideas',
    label: 'Networking'
  },
]

const categories = ['ALL', ...new Set(galleryItems.map(item => item.label))]

function HudScanner({ items, onItemSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoLoop, setIsAutoLoop] = useState(true)

  const currentItem = items[currentIndex]

  useEffect(() => {
    if (!isAutoLoop) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [items.length, isAutoLoop])

  return (
    <div className="hud-scanner-container">
      {/* Blurry Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentItem.id}`}
          className="hud-bg-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ backgroundImage: `url(${currentItem.img})` }}
        />
      </AnimatePresence>

      <div className="hud-scanner-overlay" />

      <div className="hud-scanner-content-wrapper">
        <div className="hud-scanner-top-bar">
          <div className="hud-node-info">NODE {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</div>
          <button 
            className={`hud-auto-loop ${isAutoLoop ? 'active' : ''}`}
            onClick={() => setIsAutoLoop(!isAutoLoop)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
            AUTO-LOOP
          </button>
        </div>

        <div className="hud-scanner-main">
          <div className="hud-scanner-text">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentItem.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-block"
              >
                <div className="text-icon-group">
                  <div className="database-icon">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="text-content">
                    <h3 className="hud-text-title">{currentItem.title}</h3>
                    <div className="hud-subtitle-group">
                      <p className="hud-text-subtitle">{currentItem.description}</p>
                      <p className="hud-text-category">{currentItem.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hud-scanner-image-wrapper">
            <AnimatePresence mode="wait">
              <motion.div 
                className="hud-frame"
                key={`frame-${currentItem.id}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                {/* Target Locked Header Pill */}
                <div className="hud-target-pill">
                  <span className="pulse-dot"></span>
                  ((•)) TARGET LOCKED // {currentItem.systemId}
                </div>

                <div className="hud-image-box" onClick={() => onItemSelect(currentItem)}>
                  <img src={currentItem.img} alt={currentItem.title} />
                  
                  {/* Scanner Overlay UI */}
                  <div className="hud-crosshair-overlay">
                    <div className="scanner-circle">
                      <div className="scanner-crosshair-v"></div>
                      <div className="scanner-crosshair-h"></div>
                    </div>
                    <div className="scanner-grid"></div>
                  </div>
                </div>

                {/* Footer labels */}
                <div className="hud-frame-footer">
                  <div className="hud-intel-pill">● INTEL DOSSIER</div>
                  <div className="hud-label-text">{currentItem.label}</div>
                </div>

                {/* Corner Accents */}
                <div className="corner corner-tl"></div>
                <div className="corner corner-tr"></div>
                <div className="corner corner-bl"></div>
                <div className="corner corner-br"></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [view, setView] = useState('scanner')
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [selectedImage, setSelectedImage] = useState(null)

  const filteredItems = activeFilter === 'ALL'
    ? galleryItems
    : galleryItems.filter(item => item.label === activeFilter)

  const getCategoryCount = (cat) => {
    if (cat === 'ALL') return galleryItems.length
    return galleryItems.filter(item => item.label === cat).length
  }

  return (
    <section className="gallery-section" id="gallery">
      {/* Background stars / constellation effect */}
      <div className="constellation-bg"></div>
      
      <div className="gallery-container">
        <div className="gallery-header-wrapper">
          <motion.div
            className="gallery-header-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="section-label" style={{ marginBottom: '14px' }}>
              <span className="label-number">03</span>
              <span className="label-divider">/</span>
              <span className="label-text">FESTIVAL GALLERY</span>
            </div>
            <div className="gallery-title-wrapper">
              <span className="gallery-pill">TELEPORT</span>
              <h2 className="gallery-title">SCANNER</h2>
            </div>
            <p className="gallery-subtitle">
              Experience our interactive HUD Target Scanner. Swipe or cycle target nodes across the 24-hour hackathon floor or switch to the visual grid archive.
            </p>
          </motion.div>

          <motion.div
            className="gallery-header-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="nodes-info">
              <span className="nodes-label">NODES:</span>
              <span className="locked-text">{String(galleryItems.length).padStart(2, '0')} LOCKED</span>
            </div>
            <div className="view-toggle">
              <button
                className={`toggle-btn ${view === 'scanner' ? 'active' : ''}`}
                onClick={() => setView('scanner')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="toggle-icon">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                HUD SCANNER
              </button>
              <button
                className={`toggle-btn ${view === 'grid' ? 'active' : ''}`}
                onClick={() => setView('grid')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="toggle-icon">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                GRID ARCHIVE
              </button>
            </div>
          </motion.div>
        </div>

        {view === 'scanner' && (
          <HudScanner items={galleryItems} onItemSelect={setSelectedImage} />
        )}

        {view === 'grid' && (
          <div className="grid-view">
            <div className="filter-bar">
              <span className="filter-label">FILTER:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat} <span className="filter-count">{getCategoryCount(cat)}</span>
                </button>
              ))}
            </div>

            <div className="gallery-grid">
              <AnimatePresence>
                {filteredItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    className="gallery-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="card-header">
                      <span className="card-dot" />
                      <span className="card-cam">CAM_0{item.id}</span>
                      <span className="card-id">[{item.systemId}]</span>
                    </div>
                    <div className="card-image-wrapper">
                      <img src={item.img} alt={item.title} className="card-image" />
                      <div className="card-image-overlay" />
                      <span className="card-category">{item.label}</span>
                    </div>
                    <div className="card-content">
                      <div className="card-time">{item.time}</div>
                      <h3 className="card-title">{item.title}</h3>
                      <p className="card-description">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                ✕
              </button>
              <img src={selectedImage.img} alt={selectedImage.title} className="lightbox-image" />
              <div className="lightbox-info">
                <span className="lightbox-category">{selectedImage.label}</span>
                <h3 className="lightbox-title">{selectedImage.title}</h3>
                <p className="lightbox-description">{selectedImage.description}</p>
                <div className="lightbox-meta">
                  <span>{selectedImage.time}</span>
                  <span>ID: {selectedImage.systemId}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
