import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { cottages, cottageAmenities } from '../data/siteData'
import { wrap, kicker, kickerGold, photoPlh } from '../data/styles'

function CottagesContent() {
  const { openBooking } = useShell()
  useScrollReveal()

  return (
    <>
      {/* HERO */}
      <section className="fh-section-pad" style={{ background: '#221d18', padding: '80px 32px 72px' }}>
        <div style={wrap}>
          <span style={kickerGold}>Размещение</span>
          <h1 className="fh-h1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(40px, 5vw, 64px)', color: '#f6efe1', margin: '16px 0 0', letterSpacing: '-0.015em' }}>
            Дома у воды
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(243,237,224,0.78)', margin: '18px 0 0', maxWidth: 600 }}>
            От уютного номера на двоих до премиум-коттеджа на 12 гостей. В каждом — тепло, чистота и вид на воду.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <section className="fh-section-pad" style={{ padding: '64px 32px 40px' }}>
        <div className="fh-grid-2" style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
          {cottages.map((c) => (
            <div key={c.id} data-reveal className="fh-card-hover" style={{ background: '#faf6ee', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(43,38,32,0.08)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', aspectRatio: '16 / 9', background: photoPlh('#e4d8c2', '#ddcfb4'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#8a7a5f' }}>{c.plh}</span>
                <span style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(34,29,24,0.85)', color: '#e7ddc8', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999 }}>{c.tag}</span>
              </div>
              <div style={{ padding: '28px 28px 30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 28, color: '#2b2620', margin: 0 }}>{c.name}</h3>
                <p style={{ fontSize: 14.5, color: '#6b6157', margin: '8px 0 18px' }}>{c.cap} · {c.beds} · {c.extra}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {c.features.map((f) => (
                    <span key={f} style={{ fontSize: 13, color: '#4a4339', background: '#efe6d4', border: '1px solid rgba(43,38,32,0.08)', padding: '6px 13px', borderRadius: 999 }}>{f}</span>
                  ))}
                </div>
                <div style={{ flex: 1, minHeight: 18 }} />
                <div className="fh-price-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, paddingTop: 22, borderTop: '1px solid rgba(43,38,32,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 13, color: '#9a8c74' }}>от</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: '#2b2620' }}>{c.price} ₽</span>
                    <span style={{ fontSize: 13, color: '#9a8c74' }}>/ ночь</span>
                  </div>
                  <button type="button" onClick={() => openBooking(c.name)} className="fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, padding: '13px 26px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                    Забронировать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AMENITIES */}
      <section className="fh-section-pad" style={{ padding: '32px 32px 100px' }}>
        <div style={{ ...wrap, background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, padding: '44px 48px' }} className="fh-block-pad">
          <span style={kicker}>Включено в каждый дом</span>
          <div className="fh-amenities fh-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginTop: 28 }}>
            {cottageAmenities.map((a) => (
              <div key={a.t}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: '#2b2620', margin: '0 0 6px' }}>{a.t}</h4>
                <p style={{ fontSize: 14, color: '#6b6157', margin: 0, lineHeight: 1.6 }}>{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function CottagesPage() {
  return (
    <SiteShell activeId="cottages">
      <CottagesContent />
    </SiteShell>
  )
}

export default CottagesPage
