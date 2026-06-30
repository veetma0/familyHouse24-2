import { useState } from 'react'
import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { summer, winter, catchSpecies, fishingServices, excursions, summerFleetCards, winterFleetCards } from '../data/siteData'
import { wrap, kicker, kickerGold, h2, photoPlh } from '../data/styles'

function FishingContent() {
  const { openBooking, onNav } = useShell()
  useScrollReveal()
  const [activeSeason, setActiveSeason] = useState('summer')
  const isSummer = activeSeason === 'summer'
  const seasonPoints = isSummer ? summer : winter
  const seasonFleet = isSummer ? summerFleetCards : winterFleetCards
  const seasonAccent = isSummer ? '#b8762e' : '#5b7d99'
  const seasonTag = isSummer ? 'Тёплый сезон' : 'Холодный сезон'
  const seasonTitle = isSummer ? 'Летняя рыбалка' : 'Зимняя рыбалка'
  const seasonLead = isSummer
    ? 'Катера для троллинга, прогулок и рыбалки по бровкам — все варианты идут друг за другом, с понятной ценой и условиями.'
    : 'Для зимних выездов выбирайте воздушные подушки и снегоходы: комфортная доставка к точкам, чёткие тарифы и правила безопасности.'
  const seasonBackground = isSummer ? photoPlh('#ddcfb4', '#d3c4a6') : photoPlh('#dfe3e6', '#d2d8dc')
  const fleetPhotoPlaceholder = isSummer ? photoPlh('#e0c9a7', '#d2b88f') : photoPlh('#cfdae2', '#c1cfd8')

  return (
    <>
      {/* HERO */}
      <section className="fh-section-pad" style={{ background: '#221d18', padding: '80px 32px 72px' }}>
        <div style={wrap}>
          <span style={kickerGold}>Рыбалка на Рыбинке</span>
          <h1 className="fh-h1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(40px, 5vw, 64px)', color: '#f6efe1', margin: '16px 0 0', letterSpacing: '-0.015em' }}>
            Рыбалка, ради которой стоит приехать
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(243,237,224,0.78)', margin: '18px 0 0', maxWidth: 640 }}>
            Река Сить и 540 км² Рыбинского водохранилища с более чем 35 видами рыбы. Своя техника, снасти и опытный егерь — мы привезём вас точно туда, где сегодня берёт.
          </p>
        </div>
      </section>

      {/* SUMMER / WINTER + FLEET */}
      <section className="fh-section-pad" style={{ padding: '100px 32px' }}>
        <div style={wrap}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 34 }}>
            <div className={`fh-season-switch ${isSummer ? 'is-summer' : 'is-winter'}`} aria-label="Выбор сезона рыбалки">
              <span className="fh-season-switch-thumb" />
              <button type="button" className={`fh-season-switch-btn ${isSummer ? 'is-active' : ''}`} onClick={() => setActiveSeason('summer')} aria-pressed={isSummer}>
                <span aria-hidden="true">☀</span>
                <span>Летняя рыбалка</span>
              </button>
              <button type="button" className={`fh-season-switch-btn ${!isSummer ? 'is-active' : ''}`} onClick={() => setActiveSeason('winter')} aria-pressed={!isSummer}>
                <span aria-hidden="true">❄</span>
                <span>Зимняя рыбалка</span>
              </button>
            </div>
          </div>
          <div data-reveal style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 8, overflow: 'hidden', marginBottom: 34 }}>
            <div
              style={{
                aspectRatio: '16 / 7',
                background: seasonBackground,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
              }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(43,38,32,0.58)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {isSummer ? 'фото летней рыбалки · заглушка' : 'фото зимней рыбалки · заглушка'}
              </span>
            </div>
            <div style={{ padding: 36 }}>
              <span style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: seasonAccent, fontWeight: 600 }}>{seasonTag}</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 30, color: '#2b2620', margin: '12px 0 18px' }}>{seasonTitle}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {seasonPoints.map((point) => (
                  <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ color: seasonAccent, fontWeight: 700, flex: 'none', marginTop: 1 }}>—</span>
                    <span style={{ fontSize: 15.5, color: '#3a352e', lineHeight: 1.5 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <span style={isSummer ? kicker : kickerGold}>{isSummer ? 'Катера и лодки' : 'Воздушные подушки и снегоходы'}</span>
          <h2 style={{ ...h2, fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#2b2620', margin: '16px 0 12px' }}>
            {isSummer ? 'Катера идут друг за другом — выбирайте свой формат' : 'Техника для зимней рыбалки и выездов по льду'}
          </h2>
          <p style={{ fontSize: 15.5, color: '#6b6157', margin: '0 0 34px', maxWidth: 860, lineHeight: 1.6 }}>{seasonLead}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {seasonFleet.map((item) => (
              <article key={item.id} data-reveal className="fh-fleet-card" style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.1)', borderRadius: 8, display: 'grid', gridTemplateColumns: '280px 1fr', overflow: 'hidden' }}>
                <div style={{ background: item.imageBg || fleetPhotoPlaceholder, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, minHeight: 220 }}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.t}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', minHeight: 220, objectFit: item.imageFit || 'cover', objectPosition: item.imagePosition || 'center' }}
                    />
                  ) : (
                    <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(43,38,32,0.62)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: 18 }}>
                      {item.plh}
                    </span>
                  )}
                </div>
                <div style={{ padding: '22px 24px' }}>
                  <div className="fh-price-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 10 }}>
                    <h3 style={{ fontSize: 21, color: '#2b2620', margin: 0, fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>{item.t}</h3>
                    <span style={{ fontSize: 16, fontWeight: 700, color: seasonAccent, whiteSpace: 'nowrap' }}>{item.price}</span>
                  </div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#5f564c', margin: '0 0 14px' }}>{item.d}</p>
                  <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8d806f', marginBottom: 10 }}>Условия</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {item.conditions.map((condition) => (
                      <div key={condition} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <span style={{ color: seasonAccent, fontWeight: 700, flex: 'none' }}>—</span>
                        <span style={{ fontSize: 14, color: '#3a352e', lineHeight: 1.5 }}>{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
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
          <div className="fh-water-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 20 }}>
            {excursions.map((e, idx) => (
              <div key={e.t} data-reveal className={`fh-water-card fh-water-card-${idx}`} style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 8, padding: '26px 26px' }}>
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
