import { useState } from 'react'
import ImageCarousel from './ImageCarousel'

function CottageCard({ cottage: c, openBooking }) {
  const [resetSignal, setResetSignal] = useState(0)

  return (
    <div
      data-reveal
      className="fh-cardlift fh-house-card"
      style={{ background: '#faf6ee', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(43,38,32,0.09)', display: 'flex', flexDirection: 'column' }}
      onMouseLeave={() => setResetSignal((n) => n + 1)}
    >
      <div style={{ position: 'relative' }}>
        <ImageCarousel
          images={c.gallery || [c.image]}
          cover={c.image}
          alt={c.name}
          className="fh-image-carousel fh-image-carousel--house"
          showNav
          navOnHover
          resetSignal={resetSignal}
        />
        <span className="fh-oswald" style={{ position: 'absolute', top: 14, left: 14, zIndex: 2, background: 'rgba(20,18,14,0.82)', color: '#e7ddc8', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999, pointerEvents: 'none' }}>{c.tag}</span>
      </div>
      <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 className="fh-oswald" style={{ fontSize: 24, fontWeight: 600, textTransform: 'uppercase', color: '#2b2620', margin: 0 }}>{c.name}</h3>
        <p style={{ fontSize: 14, color: '#6b6157', margin: '8px 0 0', lineHeight: 1.5 }}>{c.cap} · {c.beds}</p>
        <p style={{ fontSize: 13.5, color: '#9a8c74', margin: '6px 0 0', lineHeight: 1.5 }}>{c.extra}</p>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '20px 0 14px' }}>
          <span style={{ fontSize: 13, color: '#9a8c74' }}>от</span>
          <span className="fh-oswald" style={{ fontSize: 30, fontWeight: 700, color: '#2b2620' }}>{c.price} ₽</span>
          <span style={{ fontSize: 13, color: '#9a8c74' }}>/ ночь</span>
        </div>
        <button type="button" onClick={openBooking} className="fh-oswald fh-btn-dark" style={{ width: '100%', background: '#2b2620', color: '#f6efe1', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: 13, borderRadius: 3 }}>
          Забронировать
        </button>
      </div>
    </div>
  )
}

export default CottageCard
