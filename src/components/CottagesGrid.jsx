import { useState } from 'react'
import CottageCard from './CottageCard'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { cottages } from '../data/siteData'

function CottagesGrid({ openBooking, onNav, showFooterLink = false }) {
  const [filter, setFilter] = useState('all')
  useScrollReveal([filter])

  const tabs = [{ id: 'all', label: 'Все дома' }, ...cottages.map((c) => ({ id: c.id, label: c.name }))]
  const filtered = filter === 'all' ? cottages : cottages.filter((c) => c.id === filter)

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 34 }} data-reveal data-reveal-stagger="off">
        {tabs.map((t) => {
          const active = filter === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              className="fh-oswald"
              style={{
                background: active ? '#2b2620' : 'transparent',
                color: active ? '#f6efe1' : '#2b2620',
                border: `1px solid ${active ? '#2b2620' : 'rgba(43,38,32,0.25)'}`,
                cursor: 'pointer',
                fontSize: 13.5,
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '10px 20px',
                borderRadius: 999,
                transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
              }}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <div className={`fh-cottages-grid${filter !== 'all' ? ' fh-cottages-grid--single' : ''}`}>
        {filtered.map((c) => (
          <CottageCard key={c.id} cottage={c} openBooking={openBooking} />
        ))}
      </div>

      {showFooterLink && onNav && (
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <button type="button" onClick={() => onNav('/cottages')} className="fh-oswald fh-btn-outline" style={{ background: 'none', border: '1px solid rgba(43,38,32,0.28)', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2b2620', padding: '13px 30px' }}>
            Все дома и номера →
          </button>
        </div>
      )}
    </>
  )
}

export default CottagesGrid
