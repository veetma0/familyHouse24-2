import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { pages } from '../data/siteData'
import { kicker, kickerGold } from '../data/styles'

/* ============================================================
   Универсальный шаблон «простой» страницы из дизайна:
   размещение / рыбалка / баня / питание / развлечения.
   Данные — из siteData.pages[pageKey].
   ============================================================ */

function SimpleContent({ pageKey }) {
  const { openBooking, onNav } = useShell()
  const pg = pages[pageKey] || pages.cottages
  useScrollReveal([pageKey])

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '52vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#1a1712' }}>
        <img src={pg.img} alt={pg.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,18,14,0.4), rgba(20,18,14,0.88))' }} />
        <div className="fh-section-pad" style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', width: '100%', padding: '0 32px 48px' }}>
          <span style={kickerGold}>{pg.kicker}</span>
          <h1 className="fh-oswald" style={{ fontSize: 'clamp(38px,5.4vw,78px)', fontWeight: 700, textTransform: 'uppercase', color: '#f6efe1', margin: '12px 0 0', lineHeight: 0.98 }}>
            {pg.title}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(243,237,224,0.88)', margin: '18px 0 0', maxWidth: 620 }}>{pg.intro}</p>
        </div>
      </section>

      {/* ПОДРОБНЕЕ + ЧТО ВКЛЮЧЕНО */}
      <section style={{ padding: '76px 32px 20px' }} className="fh-section-pad">
        <div
          className={`fh-about${pg.itemsGrid === '3-2' || pg.amenitiesStack ? ' fh-about--stack' : ''}`}
          style={{ maxWidth: 1180, margin: '0 auto' }}
        >
          <div data-reveal data-reveal-stagger="off">
            <span style={{ ...kicker, letterSpacing: '0.28em' }}>Подробнее</span>
            {(pg.longText || []).map((para, i) => (
              <p key={i} style={{ fontSize: 17, lineHeight: 1.8, color: '#4a4339', margin: '16px 0 0' }}>{para}</p>
            ))}
          </div>
          <div data-reveal data-reveal-stagger="off" style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.1)', borderRadius: 10, padding: '30px 30px 32px' }}>
            <span className="fh-oswald" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#2b2620' }}>Что включено</span>
            <div
              className={
                pg.amenitiesGrid === '3'
                  ? `fh-grid-3 fh-amenities-grid${pg.amenitiesStack ? '' : ' fh-amenities-grid--inline'}`
                  : pg.itemsGrid === '3-2'
                    ? 'fh-grid-3 fh-grid-3-2 fh-amenities-grid'
                    : 'fh-amenities-flex'
              }
            >
              {(pg.amenities || []).map((am) => (
                <span key={am} className="fh-oswald fh-amenity-tag">{am}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* КАРТОЧКИ */}
      <section style={{ padding: '44px 32px 80px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className={pg.itemsGrid === '3-2' ? 'fh-grid-3 fh-grid-3-2' : 'fh-grid-3'}>
            {pg.items.map((it) => (
              <div key={it.t} data-reveal className="fh-cardlift" style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.09)', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {it.img && (
                  <img src={it.img} alt={it.t} style={{ width: '100%', aspectRatio: '3 / 2', objectFit: 'cover', display: 'block' }} />
                )}
                <div style={{ padding: '26px 26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 className="fh-oswald" style={{ fontSize: 22, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em', color: '#2b2620', margin: 0 }}>{it.t}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: '#6b6157', margin: '12px 0 0' }}>{it.d}</p>
                  <div style={{ flex: 1 }} />
                  {it.price && (
                    <div className="fh-oswald" style={{ marginTop: 18, fontSize: 22, fontWeight: 700, color: '#b8762e' }}>{it.price}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {pg.note && (
            <div data-reveal style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginTop: 36, background: '#2b2620', borderRadius: 10, padding: '26px 30px' }}>
              <span className="fh-oswald" style={{ flex: 'none', fontSize: 24, color: '#e0b45f', lineHeight: 1 }}>✦</span>
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: '#cabfae', margin: 0 }}>{pg.note}</p>
            </div>
          )}

          <div className="fh-cta-actions" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 52 }}>
            <button type="button" onClick={openBooking} className="fh-oswald fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '16px 40px', borderRadius: 3, boxShadow: '0 10px 28px rgba(184,118,46,0.36)' }}>
              Забронировать домик →
            </button>
            <button type="button" onClick={() => onNav('/prices')} className="fh-oswald fh-btn-outline" style={{ background: 'none', border: '1px solid rgba(43,38,32,0.28)', borderRadius: 3, cursor: 'pointer', fontSize: 15, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#2b2620', padding: '16px 34px' }}>
              Все цены →
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

function SimplePage({ pageKey, activeId }) {
  return (
    <SiteShell activeId={activeId}>
      <SimpleContent pageKey={pageKey} />
    </SiteShell>
  )
}

export default SimplePage
