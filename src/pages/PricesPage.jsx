import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { priceGroups, discount } from '../data/siteData'
import { kickerGold, h2 } from '../data/styles'

function PricesContent() {
  const { openBooking } = useShell()
  useScrollReveal()

  return (
    <>
      {/* HERO */}
      <section style={{ background: '#221d18', padding: '60px 32px 46px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <span style={kickerGold}>Прозрачно и без скрытых платежей</span>
          <h1 className="fh-oswald" style={{ fontSize: 'clamp(38px,5vw,72px)', fontWeight: 700, textTransform: 'uppercase', color: '#f6efe1', margin: '12px 0 0' }}>
            Цены и услуги
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#b3a68e', margin: '16px 0 0', maxWidth: 640 }}>
            Полный прайс базы: проживание, рыбалка, баня, питание и прокат. Актуальные цены на дома всегда — в онлайн-бронировании.
          </p>
        </div>
      </section>

      {/* СКИДКИ */}
      <section style={{ padding: '40px 32px 0' }} className="fh-section-pad">
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', gap: 18, alignItems: 'flex-start', background: '#faf6ee', border: '1px solid rgba(184,118,46,0.35)', borderLeft: '4px solid #b8762e', borderRadius: 8, padding: '24px 28px' }} data-reveal>
          <span className="fh-oswald" style={{ flex: 'none', fontSize: 26, color: '#b8762e', lineHeight: 1 }}>%</span>
          <div>
            <div className="fh-oswald" style={{ fontSize: 16, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2b2620' }}>Накопительные скидки</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: '#6b6157', margin: '6px 0 0' }}>{discount}</p>
          </div>
        </div>
      </section>

      {/* ГРУППЫ ЦЕН */}
      <section style={{ padding: '40px 32px 90px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 34 }}>
          {priceGroups.map((grp) => (
            <div key={grp.title} data-reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 6 }}>
                <h2 style={{ ...h2, fontSize: 'clamp(22px,2.6vw,30px)', color: '#2b2620' }}>{grp.title}</h2>
                <span style={{ height: 2, flex: 1, background: 'rgba(43,38,32,0.12)' }} />
              </div>
              {grp.note && (
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#9a8c74', margin: '6px 0 14px', maxWidth: 720 }}>{grp.note}</p>
              )}
              <div style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.1)', borderRadius: 8, overflow: 'hidden' }}>
                {grp.rows.map((row) => (
                  <div key={row.t} className="fh-price-row">
                    <span style={{ fontSize: 15.5, lineHeight: 1.5, color: '#3a352e' }}>{row.t}</span>
                    <span className="fh-oswald" style={{ flex: 'none', fontSize: 17, fontWeight: 600, color: '#b8762e', whiteSpace: 'nowrap' }}>{row.p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button type="button" onClick={openBooking} className="fh-oswald fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '16px 40px', borderRadius: 3, boxShadow: '0 10px 28px rgba(184,118,46,0.36)' }}>
              Забронировать домик →
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: 14, color: '#9a8c74', margin: 0 }}>
            Цены носят справочный характер. Актуальную стоимость и наличие уточняйте у администратора:{' '}
            <a href="tel:+79159956687" style={{ color: '#b8762e', fontWeight: 700, textDecoration: 'none' }}>+7 (915) 995-66-87</a>
          </p>
        </div>
      </section>
    </>
  )
}

function PricesPage() {
  return (
    <SiteShell activeId="prices">
      <PricesContent />
    </SiteShell>
  )
}

export default PricesPage
