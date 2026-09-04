import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, Sparkles, Search } from 'lucide-react'
import './Faq.css'

const faqData = [
  {
    id: 1,
    numLabel: '01',
    question: 'How do I register for Zenofest, and is on-spot registration available?',
    answer: 'You can register online through the registration portal on our official website. On-spot registration will also be available at the campus registration counter on the day of the event, subject to seat availability.'
  },
  {
    id: 2,
    numLabel: '02',
    question: 'Can students from any department or college register?',
    answer: 'Absolutely! Zenofest is an inter-college symposium open to all undergraduate (UG) and postgraduate (PG) students from engineering, arts, science, and management colleges.'
  },
  {
    id: 3,
    numLabel: '03',
    question: 'Can I participate in multiple events at Zenofest?',
    answer: 'Yes, you can register for multiple technical and non-technical events as long as their scheduled timings do not overlap. Please review the Event Schedule timeline before finalizing your choices.'
  },
  {
    id: 4,
    numLabel: '04',
    question: 'What are the team size requirements for team-based events like Project Expo?',
    answer: 'For Project Expo, a team must have exactly 3 members. Individual participation is allowed for solo events. Specific limits for all other events are detailed under each event card.'
  },
  {
    id: 5,
    numLabel: '05',
    question: 'What documents or items do I need to bring on the event day for Project Expo?',
    answer: 'You must bring your valid College ID Card (mandatory for entry) along with a digital or physical copy of your Zenofest Registration Pass. For Project Expo, teams must bring their working project hardware/software prototype, laptop, power extension cords, and presentation banners/posters if required.'
  },
  {
    id: 6,
    numLabel: '06',
    question: 'Will participation certificates and cash prizes be provided for Project Expo?',
    answer: 'Yes! Certificates of Merit, Trophies, and Cash Prizes will be awarded to the top best project models/prototypes in Project Expo and overall winners of each event. All registered participants will receive a digital/physical Certificate of Participation.'
  }
]

export default function Faq() {
  const [openId, setOpenId] = useState(1) // First item open by default
  const [searchQuery, setSearchQuery] = useState('')

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id)
  }

  const filteredFaqs = faqData.filter(item => {
    return item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        {/* Section Header */}
        <motion.div
          className="faq-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="section-badge">
            <Sparkles size={14} />
            <span>GOT QUESTIONS?</span>
          </div>
          <h2 className="faq-main-title">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="faq-sub-text">
            Everything you need to know about Zenofest 2K26 registration, event guidelines, logistics, and awards.
          </p>
        </motion.div>

        {/* Search Input */}
        <div className="faq-controls">
          <div className="faq-search-box">
            <Search size={18} className="faq-search-icon" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
            />
            {searchQuery && (
              <button className="faq-clear-btn" onClick={() => setSearchQuery('')}>
                Clear
              </button>
            )}
          </div>
        </div>

        {/* FAQ Accordion List (Listed one by one) */}
        <div className="faq-accordion-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id
              return (
                <motion.div
                  key={faq.id}
                  className={`faq-accordion-card ${isOpen ? 'open' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <button
                    className="faq-question-btn"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-q-left">
                      <h3 className="faq-question-text">{faq.question}</h3>
                    </div>
                    <div className={`faq-chevron-box ${isOpen ? 'rotated' : ''}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="faq-answer-wrap"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="faq-answer-inner">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })
          ) : (
            <div className="faq-empty-state">
              <HelpCircle size={40} className="empty-icon" />
              <h3>No matching questions found</h3>
              <p>Try clearing your search query to see all questions.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
