import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { dining, fishingServices, priceList } from '../data/siteData'
import { wrap, kicker, kickerGold, h2, photoPlh } from '../data/styles'

function DiningContent() {
  const { openBooking, onNav } = useShell()
  const cookingServices = fishingServices.filter((item) => ['Чистка рыбы', 'Копчение рыбы'].includes(item.t))
  const bbqServices = priceList.find((group) => group.group === 'Приготовление и барбекю')?.items ?? []
  useScrollReveal()

  return (
    <>
      <section className="fh-section-pad" style={{ position: 'relative', background: '#221d18', padding: '80px 32px 72px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${dining.image})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.34 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(34,29,24,0.92), rgba(34,29,24,0.58))' }} />
        <div style={{ position: 'relative', ...wrap }}>
          <span style={kickerGold}>Питание</span>
          <h1 className="fh-h1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(40px, 5vw, 64px)', color: '#f6efe1', margin: '16px 0 0', letterSpacing: '-0.015em' }}>
            Домашняя кухня и ваш улов
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(243,237,224,0.8)', margin: '18px 0 0', maxWidth: 650 }}>
            Готовим по-домашнему, заранее согласуем завтрак, обед и ужин, а свежую рыбу можем почистить, закоптить или подать к столу.
          </p>
        </div>
      </section>

      <section className="fh-section-pad" style={{ padding: '100px 32px' }}>
        <div className="fh-about" style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div data-reveal data-reveal-stagger="off">
            <span style={kicker}>Кухня базы</span>
            <h2 style={{ ...h2, fontSize: 'clamp(30px, 3.4vw, 46px)', color: '#2b2620', margin: '16px 0 0' }}>Вкусно, спокойно и без суеты</h2>
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
          <div
            data-reveal
            data-reveal-stagger="off"
            style={{
              aspectRatio: '4 / 5',
              borderRadius: 6,
              background: dining.image ? '#e4d8c2' : photoPlh('#e4d8c2', '#ddcfb4'),
              backgroundImage: dining.image ? `url(${dining.image})` : undefined,
              backgroundSize: dining.image ? 'cover' : undefined,
              backgroundPosition: dining.image ? 'center' : undefined,
            }}
          />
        </div>
      </section>

      <section className="fh-section-pad" style={{ background: '#2b2620', padding: '100px 32px' }}>
        <div style={wrap}>
          <span style={kickerGold}>Ваш улов</span>
          <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#f6efe1', margin: '16px 0 42px' }}>Поймали — приготовим</h2>
          <div className="fh-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
            {cookingServices.map((item) => (
              <div key={item.t} data-reveal style={{ background: 'rgba(246,239,225,0.06)', border: '1px solid rgba(231,221,200,0.14)', borderRadius: 8, padding: '30px 32px' }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f6efe1', margin: 0 }}>{item.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#b3a68e', margin: '12px 0 18px' }}>{item.d}</p>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#d8b483' }}>{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fh-section-pad" style={{ padding: '100px 32px' }}>
        <div style={wrap}>
          <span style={kicker}>Барбекю и готовка</span>
          <h2 style={{ ...h2, fontSize: 'clamp(30px, 3.4vw, 42px)', color: '#2b2620', margin: '14px 0 36px' }}>Что можно взять дополнительно</h2>
          <div className="fh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {bbqServices.map((item) => (
              <div key={item.t} data-reveal className="fh-card-hover" style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, padding: '26px 28px' }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#2b2620', margin: 0 }}>{item.t}</h3>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: '#b8762e', marginTop: 12 }}>{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fh-section-pad" style={{ padding: '0 32px 110px' }}>
        <div className="fh-directions" style={{ ...wrap, background: '#2b2620', borderRadius: 8, padding: '56px 56px', textAlign: 'center' }}>
          <h2 style={{ ...h2, fontSize: 'clamp(28px, 3vw, 42px)', color: '#f6efe1', margin: 0 }}>Хотите заказать питание?</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#b3a68e', margin: '16px auto 32px', maxWidth: 540 }}>
            Лучше предупредить заранее — так всё будет свежим, горячим и готовым к вашему времени.
          </p>
          <div className="fh-stack-mobile" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <button type="button" onClick={() => openBooking('')} className="fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 600, padding: '15px 34px', borderRadius: 999 }}>
              Забронировать дом
            </button>
            <button type="button" onClick={() => onNav('/contacts')} style={{ background: 'rgba(246,239,225,0.08)', color: '#f6efe1', border: '1px solid rgba(246,239,225,0.3)', cursor: 'pointer', fontSize: 16, fontWeight: 600, padding: '15px 34px', borderRadius: 999 }}>
              Связаться с нами
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

function DiningPage() {
  return (
    <SiteShell activeId="dining">
      <DiningContent />
    </SiteShell>
  )
}

export default DiningPage
