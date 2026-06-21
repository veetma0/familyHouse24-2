import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { summer, winter, tech, catchSpecies } from '../data/siteData'
import { wrap, kicker, kickerGold, h2, photoPlh } from '../data/styles'

function FishingContent() {
  const { openBooking } = useShell()
  useScrollReveal()

  return (
    <>
      {/* HERO */}
      <section className="fh-section-pad" style={{ position: 'relative', padding: '90px 32px 84px', background: '#2a3a32', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(125deg, #2e4036, #2e4036 20px, #293a31 20px, #293a31 40px)' }} />
        <div style={{ position: 'relative', ...wrap }}>
          <span style={{ ...kicker, color: '#cdd9b8' }}>Рыбалка на Рыбинке</span>
          <h1 className="fh-h1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(40px, 5vw, 64px)', color: '#f6efe1', margin: '16px 0 0', letterSpacing: '-0.015em' }}>
            Настоящая мужская рыбалка
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(243,237,224,0.82)', margin: '18px 0 0', maxWidth: 620 }}>
            540 км² воды, богатой судаком, щукой и лещом. Своя техника, снасти и егерь — мы привезём вас точно туда, где сегодня берёт.
          </p>
        </div>
      </section>

      {/* SUMMER / WINTER */}
      <section className="fh-section-pad" style={{ padding: '100px 32px' }}>
        <div className="fh-fishing-cols" style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          <div data-reveal style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ aspectRatio: '16 / 8', backgroundImage: photoPlh('#ddcfb4', '#d3c4a6'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#8a7a5f' }}>фото · лето, катер, трофей</span>
            </div>
            <div style={{ padding: 36 }}>
              <span style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8762e', fontWeight: 600 }}>Тёплый сезон</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 30, color: '#2b2620', margin: '12px 0 18px' }}>Летняя рыбалка</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {summer.map((s) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ color: '#b8762e', fontWeight: 700, flex: 'none', marginTop: 1 }}>—</span>
                    <span style={{ fontSize: 15.5, color: '#3a352e', lineHeight: 1.5 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div data-reveal style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ aspectRatio: '16 / 8', backgroundImage: photoPlh('#dfe3e6', '#d2d8dc'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#7e8890' }}>фото · зима, лунки, снегоход</span>
            </div>
            <div style={{ padding: 36 }}>
              <span style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5b7d99', fontWeight: 600 }}>Холодный сезон</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 30, color: '#2b2620', margin: '12px 0 18px' }}>Зимняя рыбалка</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {winter.map((w) => (
                  <div key={w} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ color: '#5b7d99', fontWeight: 700, flex: 'none', marginTop: 1 }}>—</span>
                    <span style={{ fontSize: 15.5, color: '#3a352e', lineHeight: 1.5 }}>{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH */}
      <section className="fh-section-pad" style={{ background: '#2b2620', padding: '100px 32px' }}>
        <div style={wrap}>
          <span style={kickerGold}>Всё уже на базе</span>
          <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#f6efe1', margin: '16px 0 48px' }}>Техника и снаряжение</h2>
          <div className="fh-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(231,221,200,0.14)', border: '1px solid rgba(231,221,200,0.14)', borderRadius: 4, overflow: 'hidden' }}>
            {tech.map((t) => (
              <div key={t.t} data-reveal style={{ background: '#2b2620', padding: '34px 26px', minHeight: 200 }}>
                <h3 style={{ fontSize: 19, fontWeight: 600, color: '#f6efe1', margin: '0 0 12px' }}>{t.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#b3a68e', margin: 0 }}>{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TROPHIES */}
      <section className="fh-section-pad" style={{ padding: '100px 32px' }}>
        <div style={{ ...wrap, textAlign: 'center' }}>
          <span style={kicker}>Что вы поймаете</span>
          <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#2b2620', margin: '16px 0 40px' }}>Трофеи Рыбинки</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            {catchSpecies.map((fish) => (
              <span key={fish} data-reveal style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#2b2620', background: '#faf6ee', border: '1px solid rgba(43,38,32,0.12)', padding: '14px 30px', borderRadius: 999 }}>{fish}</span>
            ))}
          </div>
          <div style={{ marginTop: 48 }}>
            <button type="button" onClick={() => openBooking('')} className="fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 600, padding: '16px 36px', borderRadius: 999, boxShadow: '0 10px 26px rgba(184,118,46,0.3)' }}>
              Забронировать рыбалку
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

function FishingPage() {
  return (
    <SiteShell activeId="fishing">
      <FishingContent />
    </SiteShell>
  )
}

export default FishingPage
