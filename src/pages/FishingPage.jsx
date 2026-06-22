import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { summer, winter, techFleet, catchSpecies, fishingServices, excursions, fishingImages } from '../data/siteData'
import { wrap, kicker, kickerGold, h2, photoPlh } from '../data/styles'

function FishingContent() {
  const { openBooking, onNav } = useShell()
  useScrollReveal()

  return (
    <>
      {/* HERO */}
      <section className="fh-section-pad" style={{ position: 'relative', padding: '90px 32px 84px', background: '#2a3a32', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(125deg, #2e4036, #2e4036 20px, #293a31 20px, #293a31 40px)' }} />
        <div style={{ position: 'relative', ...wrap }}>
          <span style={{ ...kicker, color: '#cdd9b8' }}>Рыбалка на Рыбинке</span>
          <h1 className="fh-h1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(40px, 5vw, 64px)', color: '#f6efe1', margin: '16px 0 0', letterSpacing: '-0.015em' }}>
            Рыбалка, ради которой стоит приехать
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(243,237,224,0.82)', margin: '18px 0 0', maxWidth: 640 }}>
            Река Сить и 540 км² Рыбинского водохранилища с более чем 35 видами рыбы. Своя техника, снасти и опытный егерь — мы привезём вас точно туда, где сегодня берёт.
          </p>
        </div>
      </section>

      {/* SUMMER / WINTER */}
      <section className="fh-section-pad" style={{ padding: '100px 32px' }}>
        <div className="fh-fishing-cols" style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          <div data-reveal style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, overflow: 'hidden' }}>
            <div
              style={{
                aspectRatio: '16 / 8',
                background: fishingImages.summer ? '#ddcfb4' : photoPlh('#ddcfb4', '#d3c4a6'),
                backgroundImage: fishingImages.summer ? `url(${fishingImages.summer})` : undefined,
                backgroundSize: fishingImages.summer ? 'cover' : undefined,
                backgroundPosition: fishingImages.summer ? 'center' : undefined,
              }}
            />
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
            <div
              style={{
                aspectRatio: '16 / 8',
                background: fishingImages.winter ? '#dfe3e6' : photoPlh('#dfe3e6', '#d2d8dc'),
                backgroundImage: fishingImages.winter ? `url(${fishingImages.winter})` : undefined,
                backgroundSize: fishingImages.winter ? 'cover' : undefined,
                backgroundPosition: fishingImages.winter ? 'center' : undefined,
              }}
            />
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

      {/* СНАСТИ И УСЛУГИ */}
      <section className="fh-section-pad" style={{ padding: '0 32px 100px' }}>
        <div style={wrap}>
          <span style={kicker}>Снасти и услуги</span>
          <h2 style={{ ...h2, fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#2b2620', margin: '16px 0 40px' }}>Приезжайте налегке</h2>
          <div className="fh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {fishingServices.map((s) => (
              <div key={s.t} data-reveal style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, padding: '26px 26px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#2b2620', margin: '0 0 8px', lineHeight: 1.3 }}>{s.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#6b6157', margin: '0 0 16px', flex: 1 }}>{s.d}</p>
                <span style={{ fontSize: 14.5, fontWeight: 600, color: '#b8762e' }}>{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH */}
      <section className="fh-section-pad" style={{ background: '#2b2620', padding: '100px 32px' }}>
        <div style={wrap}>
          <span style={kickerGold}>Всё уже на базе</span>
          <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#f6efe1', margin: '16px 0 12px' }}>Вся техника уже на берегу</h2>
          <p style={{ fontSize: 15.5, color: '#b3a68e', margin: '0 0 44px', maxWidth: 620, lineHeight: 1.6 }}>
            Быстрый катер с егерем, лодки, снегоходы и даже воздушные подушки — выберите, на чём отправитесь за уловом в этот раз.
          </p>
          <div className="fh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(231,221,200,0.14)', border: '1px solid rgba(231,221,200,0.14)', borderRadius: 4, overflow: 'hidden' }}>
            {techFleet.map((t) => (
              <div key={t.t} data-reveal style={{ background: '#2b2620', padding: '30px 26px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#f6efe1', margin: '0 0 10px' }}>{t.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#b3a68e', margin: '0 0 16px', flex: 1 }}>{t.d}</p>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, color: '#d8b483' }}>{t.price}</div>
                {t.note && <div style={{ fontSize: 12.5, color: '#8c8071', marginTop: 8, lineHeight: 1.5 }}>{t.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TROPHIES */}
      <section className="fh-section-pad" style={{ padding: '100px 32px 80px' }}>
        <div style={{ ...wrap, textAlign: 'center' }}>
          <span style={kicker}>За чем приезжают</span>
          <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#2b2620', margin: '16px 0 12px' }}>Больше 35 видов рыбы</h2>
          <p style={{ fontSize: 15.5, color: '#6b6157', margin: '0 auto 40px', maxWidth: 480, lineHeight: 1.6 }}>Вот за кем сюда едут чаще всего — и это только начало списка:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            {catchSpecies.map((fish) => (
              <span key={fish} data-reveal style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#2b2620', background: '#faf6ee', border: '1px solid rgba(43,38,32,0.12)', padding: '14px 30px', borderRadius: 999 }}>{fish}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ЭКСКУРСИИ */}
      <section className="fh-section-pad" style={{ padding: '0 32px 100px' }}>
        <div style={wrap}>
          <div className="fh-stack-mobile" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 40 }}>
            <div>
              <span style={kicker}>Не только клёв</span>
              <h2 style={{ ...h2, fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#2b2620', margin: '16px 0 0' }}>Прогулки на катере по Рыбинке</h2>
            </div>
            <button type="button" onClick={() => onNav('/contacts')} className="fh-btn-outline" style={{ background: 'none', border: '1px solid rgba(43,38,32,0.25)', borderRadius: 999, cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#2b2620', padding: '12px 24px', whiteSpace: 'nowrap' }}>
              Заказать прогулку →
            </button>
          </div>
          <div className="fh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {excursions.map((e) => (
              <div key={e.t} data-reveal style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, padding: '26px 26px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 21, color: '#2b2620', margin: '0 0 8px' }}>{e.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#6b6157', margin: 0 }}>{e.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fh-section-pad" style={{ padding: '0 32px 110px' }}>
        <div style={{ ...wrap, textAlign: 'center' }}>
          <button type="button" onClick={() => openBooking('')} className="fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 600, padding: '16px 36px', borderRadius: 999, boxShadow: '0 10px 26px rgba(184,118,46,0.3)' }}>
            Забронировать рыбалку
          </button>
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
