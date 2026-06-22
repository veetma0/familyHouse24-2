import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { dining, techFleet, entertainment, priceList, rules } from '../data/siteData'
import { wrap, kicker, kickerGold, h2, photoPlh } from '../data/styles'

function ServicesContent() {
  const { openBooking, onNav } = useShell()
  useScrollReveal()

  return (
    <>
      {/* HERO */}
      <section className="fh-section-pad" style={{ position: 'relative', background: '#221d18', padding: '80px 32px 72px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(125deg, #2a241d, #2a241d 22px, #25201a 22px, #25201a 44px)' }} />
        <div style={{ position: 'relative', ...wrap }}>
          <span style={kickerGold}>Услуги и цены</span>
          <h1 className="fh-h1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(40px, 5vw, 64px)', color: '#f6efe1', margin: '16px 0 0', letterSpacing: '-0.015em' }}>
            Всё для отдыха — мы уже позаботились
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(243,237,224,0.8)', margin: '18px 0 0', maxWidth: 620 }}>
            Домашняя кухня, прокат техники, баня и развлечения — а цены честные и понятные. Гарантируем лучшую стоимость без скрытых платежей и комиссий.
          </p>
        </div>
      </section>

      {/* ПИТАНИЕ */}
      <section className="fh-section-pad" style={{ padding: '100px 32px' }}>
        <div className="fh-about" style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div data-reveal data-reveal-stagger="off">
            <span style={kicker}>Питание</span>
            <h2 style={{ ...h2, fontSize: 'clamp(30px, 3.4vw, 46px)', color: '#2b2620', margin: '16px 0 0' }}>Вкусно, как у бабушки</h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.8, color: '#6b6157', margin: '20px 0 28px' }}>{dining.intro}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {dining.schedule.map((m) => (
                <div key={m.t} style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.1)', borderRadius: 8, padding: '18px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#2b2620' }}>{m.t}</div>
                  <div style={{ fontSize: 13, color: '#9a8c74', margin: '4px 0 8px' }}>{m.d}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#b8762e' }}>{m.price}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 14, color: '#9a8c74', margin: '20px 0 0', lineHeight: 1.6 }}>{dining.note}</p>
          </div>
          <div data-reveal data-reveal-stagger="off" style={{ aspectRatio: '4 / 5', borderRadius: 6, background: photoPlh('#e4d8c2', '#ddcfb4'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#8a7a5f' }}>{dining.plh}</span>
          </div>
        </div>
      </section>

      {/* ПРОКАТ ТЕХНИКИ */}
      <section className="fh-section-pad" style={{ background: '#2b2620', padding: '100px 32px' }}>
        <div style={wrap}>
          <span style={kickerGold}>Прокат</span>
          <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#f6efe1', margin: '16px 0 48px' }}>На чём отправитесь на воду</h2>
          <div className="fh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(231,221,200,0.14)', border: '1px solid rgba(231,221,200,0.14)', borderRadius: 4, overflow: 'hidden' }}>
            {techFleet.map((t) => (
              <div key={t.t} data-reveal style={{ background: '#2b2620', padding: '30px 26px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#f6efe1', margin: '0 0 10px' }}>{t.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#b3a68e', margin: '0 0 16px', flex: 1 }}>{t.d}</p>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#d8b483' }}>{t.price}</div>
                {t.note && <div style={{ fontSize: 12.5, color: '#8c8071', marginTop: 8, lineHeight: 1.5 }}>{t.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* РАЗВЛЕЧЕНИЯ */}
      <section className="fh-section-pad" style={{ padding: '100px 32px' }}>
        <div style={wrap}>
          <span style={kicker}>Когда не на рыбалке</span>
          <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#2b2620', margin: '16px 0 48px' }}>Скучать точно не придётся</h2>
          <div className="fh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {entertainment.map((e) => (
              <div key={e.t} data-reveal style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, padding: 30 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#2b2620', margin: '0 0 10px', lineHeight: 1.3 }}>{e.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#6b6157', margin: 0 }}>{e.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ДОП. УСЛУГИ И ПРАЙС */}
      <section className="fh-section-pad" style={{ padding: '0 32px 100px' }}>
        <div style={wrap}>
          <span style={kicker}>Всё прозрачно</span>
          <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#2b2620', margin: '16px 0 48px' }}>Цены на всё до копейки</h2>
          <div className="fh-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
            {priceList.map((g) => (
              <div key={g.group} data-reveal style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, padding: '30px 32px' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#b8762e', margin: '0 0 18px', letterSpacing: '0.01em' }}>{g.group}</h3>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {g.items.map((it, i) => (
                    <div key={it.t} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, padding: '11px 0', borderTop: i ? '1px solid rgba(43,38,32,0.08)' : 'none' }}>
                      <span style={{ fontSize: 15, color: '#3a352e' }}>{it.t}</span>
                      <span style={{ fontSize: 15, fontWeight: 600, color: '#2b2620', whiteSpace: 'nowrap' }}>{it.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРАВИЛА */}
      <section className="fh-section-pad" style={{ padding: '0 32px 100px' }}>
        <div style={{ ...wrap, background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 8, padding: '48px 48px' }} className="fh-block-pad">
          <span style={kicker}>Чтобы всё прошло гладко</span>
          <h2 style={{ ...h2, fontSize: 'clamp(28px, 3vw, 40px)', color: '#2b2620', margin: '16px 0 32px' }}>Несколько простых моментов</h2>
          <div className="fh-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px 48px' }}>
            {rules.map((r) => (
              <div key={r.t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ color: '#b8762e', fontWeight: 700, flex: 'none', marginTop: 1 }}>—</span>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: '#2b2620', margin: '0 0 4px' }}>{r.t}</h4>
                  <p style={{ fontSize: 14.5, color: '#6b6157', margin: 0, lineHeight: 1.6 }}>{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fh-section-pad" style={{ padding: '0 32px 110px' }}>
        <div className="fh-directions" style={{ ...wrap, background: '#2b2620', borderRadius: 8, padding: '56px 56px', textAlign: 'center' }}>
          <h2 style={{ ...h2, fontSize: 'clamp(28px, 3vw, 42px)', color: '#f6efe1', margin: 0 }}>Остались вопросы? Мы рядом</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#b3a68e', margin: '16px auto 32px', maxWidth: 520 }}>
            Расскажем про еду, технику и баню, поможем собрать программу под вашу компанию — от рыбалки до семейного праздника.
          </p>
          <div className="fh-stack-mobile" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <button type="button" onClick={() => openBooking('')} className="fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 600, padding: '15px 34px', borderRadius: 999 }}>
              Забронировать
            </button>
            <button type="button" onClick={() => onNav('/contacts')} style={{ background: 'rgba(246,239,225,0.08)', color: '#f6efe1', border: '1px solid rgba(246,239,225,0.3)', cursor: 'pointer', fontSize: 16, fontWeight: 600, padding: '15px 34px', borderRadius: 999 }}>
              Написать нам
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

function ServicesPage() {
  return (
    <SiteShell activeId="services">
      <ServicesContent />
    </SiteShell>
  )
}

export default ServicesPage
