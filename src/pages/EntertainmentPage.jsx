import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { entertainment, excursions } from '../data/siteData'
import { wrap, kicker, kickerGold, h2 } from '../data/styles'

const entertainmentCards = [
  {
    title: 'Детская площадка с батутами',
    text: 'Детям есть где выплеснуть энергию, пока взрослые отдыхают у дома, готовят ужин или собираются на воду.',
    image: '/images/custom/entertainment-playground.png',
    label: 'Для детей',
  },
  {
    title: 'Волейбол и футбол',
    text: 'Соберите команду, сыграйте до заката и возвращайтесь к дому на ужин или баню.',
    image: '/images/old-site/activities/extra-25758076.jpg',
    label: 'Спорт',
  },
  {
    title: 'Грибы и ягоды',
    text: 'Окрестные леса подходят для спокойных прогулок с корзинкой: воздух, тишина и настоящая загородная пауза.',
    image: '/images/custom/entertainment-mushrooms.png',
    label: 'Лес рядом',
  },
  {
    title: 'Русский бильярд',
    text: 'Партия-другая под вечер, когда рыбалка закончилась, баня уже натоплена, а компания не хочет расходиться.',
    image: '/images/custom/entertainment-billiards.png',
    label: 'Вечер',
  },
  {
    title: 'Игры для компании',
    text: 'Покер, настольные игры, нарды и спокойный вечер внутри дома, если хочется остаться в тепле.',
    image: '/images/old-site/activities/extra-25757996.jpg',
    label: 'Компания',
  },
  {
    title: 'Прогулки по бору',
    text: 'Маршруты вдоль воды и леса: выйти без спешки, подышать соснами и вернуться к камину.',
    image: '/images/custom/entertainment-forest-walk.png',
    label: 'Прогулки',
  },
]

function EntertainmentContent() {
  const { openBooking, onNav } = useShell()
  useScrollReveal()

  return (
    <>
      <section className="fh-section-pad" style={{ position: 'relative', background: '#221d18', padding: '80px 32px 72px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/images/old-site/activities/g-25758067.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.34 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(34,29,24,0.94), rgba(34,29,24,0.58))' }} />
        <div style={{ position: 'relative', ...wrap }}>
          <span style={kickerGold}>Развлечения</span>
          <h1 className="fh-h1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(40px, 5vw, 64px)', color: '#f6efe1', margin: '16px 0 0', letterSpacing: '-0.015em' }}>
            Чем заняться на базе
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(243,237,224,0.8)', margin: '18px 0 0', maxWidth: 650 }}>
            Family House — это не только рыбалка. Здесь есть отдых для детей, игры для компании, прогулки по лесу, спорт и тихие вечера у воды.
          </p>
        </div>
      </section>

      <section className="fh-section-pad" style={{ padding: '100px 32px' }}>
        <div style={wrap}>
          <span style={kicker}>На территории</span>
          <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#2b2620', margin: '16px 0 48px' }}>Отдых для семьи и компании</h2>
          <div className="fh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {entertainmentCards.map((card) => (
              <div key={card.title} data-reveal className="fh-card-hover" style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', aspectRatio: '16 / 10', backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <span style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(34,29,24,0.82)', color: '#e7ddc8', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999 }}>
                    {card.label}
                  </span>
                </div>
                <div style={{ padding: '26px 28px 30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 26, color: '#2b2620', margin: 0 }}>{card.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#6b6157', margin: '12px 0 0', flex: 1 }}>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fh-section-pad" style={{ padding: '0 32px 100px' }}>
        <div style={{ ...wrap, background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 8, padding: '44px 48px' }} className="fh-block-pad">
          <span style={kicker}>Список активностей</span>
          <h2 style={{ ...h2, fontSize: 'clamp(28px, 3vw, 40px)', color: '#2b2620', margin: '16px 0 32px' }}>Что есть на базе</h2>
          <div className="fh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {entertainment.map((item) => (
              <div key={item.t} data-reveal>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#2b2620', margin: '0 0 8px' }}>{item.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#6b6157', margin: 0 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fh-section-pad" style={{ background: '#2b2620', padding: '100px 32px' }}>
        <div style={wrap}>
          <span style={kickerGold}>Прогулки с воды</span>
          <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#f6efe1', margin: '16px 0 42px' }}>Можно съездить к местам рядом</h2>
          <div className="fh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(231,221,200,0.14)', border: '1px solid rgba(231,221,200,0.14)', borderRadius: 4, overflow: 'hidden' }}>
            {excursions.map((item) => (
              <div key={item.t} data-reveal style={{ background: '#2b2620', padding: '30px 26px' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f6efe1', margin: '0 0 10px' }}>{item.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#b3a68e', margin: 0 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fh-section-pad" style={{ padding: '100px 32px 110px' }}>
        <div className="fh-directions" style={{ ...wrap, background: '#2b2620', borderRadius: 8, padding: '56px 56px', textAlign: 'center' }}>
          <h2 style={{ ...h2, fontSize: 'clamp(28px, 3vw, 42px)', color: '#f6efe1', margin: 0 }}>Соберём программу под вашу компанию</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#b3a68e', margin: '16px auto 32px', maxWidth: 560 }}>
            Рыбалка, баня, прогулки, бильярд и спокойный семейный отдых — подскажем, как лучше распределить день.
          </p>
          <div className="fh-stack-mobile" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <button type="button" onClick={() => openBooking('')} className="fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 600, padding: '15px 34px', borderRadius: 999 }}>
              Забронировать
            </button>
            <button type="button" onClick={() => onNav('/contacts')} style={{ background: 'rgba(246,239,225,0.08)', color: '#f6efe1', border: '1px solid rgba(246,239,225,0.3)', cursor: 'pointer', fontSize: 16, fontWeight: 600, padding: '15px 34px', borderRadius: 999 }}>
              Связаться
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

function EntertainmentPage() {
  return (
    <SiteShell activeId="entertainment">
      <EntertainmentContent />
    </SiteShell>
  )
}

export default EntertainmentPage
