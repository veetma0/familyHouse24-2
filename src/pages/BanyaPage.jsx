import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { banya, rules } from '../data/siteData'
import { wrap, kicker, kickerGold, h2 } from '../data/styles'

function BanyaContent() {
  const { onNav } = useShell()
  const banyaImage = '/images/custom/banya-steam-room.png'
  useScrollReveal()

  return (
    <>
      <section className="fh-section-pad" style={{ background: '#221d18', padding: '80px 32px 72px' }}>
        <div style={wrap}>
          <span style={kickerGold}>Баня</span>
          <h1 className="fh-h1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(40px, 5vw, 64px)', color: '#f6efe1', margin: '16px 0 0', letterSpacing: '-0.015em' }}>
            {banya.name}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(243,237,224,0.78)', margin: '18px 0 0', maxWidth: 640 }}>
            Кедровый сруб, жаркая парилка, каминный зал и спокойный вечер после рыбалки или прогулки у воды.
          </p>
        </div>
      </section>

      <section className="fh-section-pad" style={{ padding: '100px 32px' }}>
        <div className="fh-directions" style={{ ...wrap, background: '#2b2620', borderRadius: 8, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1.05fr' }}>
          <div
            style={{
              minHeight: 420,
              background: '#3a342b',
              backgroundImage: `url(${banyaImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="fh-directions-text" style={{ padding: '58px 56px' }}>
            <span style={kickerGold}>Русская баня</span>
            <h2 style={{ ...h2, fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#f6efe1', margin: '14px 0 0' }}>{banya.area} · {banya.cap}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#b3a68e', margin: '16px 0 24px' }}>
              Жаркий пар, аромат кедра и потрескивание камина. Подходит для отдыха после воды, зимней рыбалки и вечера с компанией.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
              {banya.features.map((f) => (
                <span key={f} style={{ fontSize: 13.5, color: '#e7ddc8', background: 'rgba(231,221,200,0.1)', border: '1px solid rgba(231,221,200,0.18)', padding: '7px 15px', borderRadius: 999 }}>{f}</span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, color: '#f6efe1' }}>{banya.price}</span>
              <span style={{ fontSize: 15, color: '#d8b483' }}>{banya.priceUnit}</span>
              <span style={{ fontSize: 14, color: '#8c8071' }}>· {banya.minNote}</span>
            </div>
            <div style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', background: 'rgba(216,180,131,0.12)', border: '1px solid rgba(216,180,131,0.28)', color: '#d8b483', fontSize: 15, fontWeight: 700, padding: '13px 22px', borderRadius: 999 }}>
              Уточняйте у администрации
            </div>
          </div>
        </div>
      </section>

      <section className="fh-section-pad" style={{ padding: '0 32px 100px' }}>
        <div style={wrap}>
          <span style={kicker}>Дополнительно</span>
          <h2 style={{ ...h2, fontSize: 'clamp(30px, 3.4vw, 42px)', color: '#2b2620', margin: '14px 0 36px' }}>Всё для банного вечера</h2>
          <div className="fh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {banya.extras.map((item) => (
              <div key={item.t} data-reveal className="fh-card-hover" style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, padding: '28px 30px' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2b2620', margin: 0 }}>{item.t}</h3>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#b8762e', marginTop: 12 }}>{item.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fh-section-pad" style={{ padding: '0 32px 110px' }}>
        <div style={{ ...wrap, background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 8, padding: '44px 48px' }} className="fh-block-pad">
          <span style={kicker}>Как забронировать</span>
          <h2 style={{ ...h2, fontSize: 'clamp(28px, 3vw, 40px)', color: '#2b2620', margin: '16px 0 28px' }}>Скажите администратору удобное время</h2>
          <div className="fh-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '22px 44px' }}>
            {rules.slice(0, 4).map((r) => (
              <div key={r.t}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#2b2620', margin: '0 0 6px' }}>{r.t}</h3>
                <p style={{ fontSize: 14.5, color: '#6b6157', margin: 0, lineHeight: 1.6 }}>{r.d}</p>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => onNav('/contacts')} className="fh-btn-outline" style={{ marginTop: 32, background: 'none', border: '1px solid rgba(43,38,32,0.25)', borderRadius: 999, cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#2b2620', padding: '13px 26px' }}>
            Связаться с нами
          </button>
        </div>
      </section>
    </>
  )
}

function BanyaPage() {
  return (
    <SiteShell activeId="banya">
      <BanyaContent />
    </SiteShell>
  )
}

export default BanyaPage
