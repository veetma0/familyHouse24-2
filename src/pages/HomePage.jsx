import { useState } from 'react'
import SiteShell from '../components/SiteShell'
import BookingBar from '../components/BookingBar'
import TimedPromoPopup from '../components/TimedPromoPopup'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { reasons, statsItems, reviews, cottages, mapEmbedUrl, experience, contact, dining, fishingImages } from '../data/siteData'
import { wrap, kicker, kickerGold, h2, photoPlh } from '../data/styles'

function HomeContent() {
  const { openBooking, onNav } = useShell()
  const [hoveredCottageId, setHoveredCottageId] = useState('')
  const homeCottages = cottages.slice(0, 3)
  const heroImage = '/images/old-site/activities/extra-19019454.jpg'
  const aboutImage = '/images/custom/home-return-place.png'
  useScrollReveal()

  return (
    <>
      <TimedPromoPopup onClose={openBooking} />
      {/* ===== HERO ===== */}
      <section
        className="fh-hero"
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          background: '#221d18',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center 38%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(34,29,24,0.45) 0%, rgba(34,29,24,0.2) 40%, rgba(34,29,24,0.86) 100%)' }} />
        <div className="fh-section-pad" style={{ position: 'relative', ...wrap, width: '100%', padding: '0 32px 80px' }}>
          <div style={{ maxWidth: 720, animation: 'fh-fade-up 0.8s ease both' }}>
            <span style={{ ...kickerGold, fontSize: 13, letterSpacing: '0.24em' }}>Family House · Рыбинское водохранилище</span>
            <h1 className="fh-h1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(44px, 6vw, 82px)', lineHeight: 1.02, color: '#f6efe1', margin: '22px 0 0', letterSpacing: '-0.015em' }}>
              Где вода<br />встречает тишину
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.7, color: 'rgba(243,237,224,0.82)', margin: '26px 0 0', maxWidth: 580 }}>
              Эко-отель на берегу реки Сить, в сосновом бору, в 10 км от Рыбинского водохранилища. Дома и номера у воды, русская баня на кедре, катера с егерем и домашняя кухня — для рыбаков, семей и хорошей компании.
            </p>
            <div className="fh-hero-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 38 }}>
              <button type="button" onClick={() => openBooking('')} className="fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 600, padding: '16px 32px', borderRadius: 999, boxShadow: '0 10px 28px rgba(184,118,46,0.36)' }}>
                Забронировать дом
              </button>
              <button type="button" onClick={() => onNav('/fishing')} className="fh-btn-ghost" style={{ background: 'rgba(246,239,225,0.08)', color: '#f6efe1', border: '1px solid rgba(246,239,225,0.4)', cursor: 'pointer', fontSize: 16, fontWeight: 600, padding: '16px 32px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>
                О рыбалке →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ПЛАШКА БРОНИРОВАНИЯ (под hero) ===== */}
      <BookingBar />

      {/* ===== STATS ===== */}
      <section style={{ background: '#2b2620' }}>
        <div className="fh-grid-stats fh-section-pad" style={{ ...wrap, padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {statsItems.map((s, i) => (
            <div key={s.value} style={{ padding: '36px 24px', borderRight: i < 3 ? '1px solid rgba(231,221,200,0.12)' : 'none' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, color: '#f6efe1' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#b3a68e', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="fh-section fh-section-pad" style={{ padding: '120px 32px' }}>
        <div style={wrap}>
          <div className="fh-about" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div data-reveal data-reveal-stagger="off">
              <span style={kicker}>О базе</span>
              <h2 style={{ ...h2, fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: 1.08, color: '#2b2620', margin: '18px 0 0' }}>Место, куда хочется возвращаться</h2>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: '#6b6157', margin: '24px 0 0' }}>
                Family House — эко-отель в Ярославской области, в деревне Набережная Брейтовского района. Он стоит на берегу реки Сить, в окружении соснового бора, в 10 км от Рыбинского водохранилища. Утро здесь начинается с тумана над водой, а вечер — с русской бани на кедре и ухи из свежего улова.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: '#6b6157', margin: '18px 0 0' }}>
                Мы принимаем рыбаков, охотников, яхтсменов и семьи с детьми. Везти с собой ничего не нужно — катера, лодки, снасти и опытный егерь уже ждут вас на берегу, а на кухне готовят домашние блюда трижды в день.
              </p>
              <button type="button" onClick={() => onNav('/contacts')} style={{ marginTop: 30, background: 'none', border: 'none', borderBottom: '2px solid #b8762e', cursor: 'pointer', fontSize: 16, fontWeight: 600, color: '#2b2620', padding: '0 0 6px' }}>
                Как добраться →
              </button>
            </div>
            <div
              data-reveal
              data-reveal-stagger="off"
              style={{
                aspectRatio: '4 / 5',
                borderRadius: 4,
                background: '#e4d8c2',
                backgroundImage: `url(${aboutImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== REASONS ===== */}
      <section className="fh-section-pad" style={{ padding: '0 32px 120px' }}>
        <div style={wrap}>
          <span style={kicker}>Почему гости влюбляются в это место</span>
          <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#2b2620', margin: '16px 0 48px' }}>Четыре причины собрать чемодан</h2>
          <div className="fh-grid-4 fh-reasons-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid rgba(43,38,32,0.1)', borderRadius: 4, overflow: 'hidden' }}>
            {reasons.map((r) => (
              <div key={r.n} data-reveal className="fh-reasons-item" style={{ background: '#faf6ee', padding: '36px 28px', minHeight: 240, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#cdb88f' }}>{r.n}</span>
                <h3 style={{ fontSize: 19, fontWeight: 600, color: '#2b2620', margin: '20px 0 12px', lineHeight: 1.25, minHeight: 48 }}>{r.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#6b6157', margin: 0 }}>{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COTTAGES PREVIEW ===== */}
      <section className="fh-section-pad" style={{ padding: '0 32px 120px' }}>
        <div style={wrap}>
          <div className="fh-stack-mobile" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 48 }}>
            <div>
              <span style={kicker}>Размещение</span>
              <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#2b2620', margin: '16px 0 0' }}>Дома у воды</h2>
            </div>
            <button type="button" onClick={() => onNav('/cottages')} className="fh-btn-outline" style={{ background: 'none', border: '1px solid rgba(43,38,32,0.25)', borderRadius: 999, cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#2b2620', padding: '12px 24px', whiteSpace: 'nowrap' }}>
              Все дома →
            </button>
          </div>
          <div className="fh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {homeCottages.map((c) => (
              <div key={c.id} data-reveal className="fh-card-hover" style={{ background: '#faf6ee', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(43,38,32,0.08)', display: 'flex', flexDirection: 'column' }}>
                <div
                  onMouseEnter={() => setHoveredCottageId(c.id)}
                  onMouseLeave={() => setHoveredCottageId('')}
                  onFocus={() => setHoveredCottageId(c.id)}
                  onBlur={() => setHoveredCottageId('')}
                  style={{
                    position: 'relative',
                    aspectRatio: '3 / 2',
                    background: '#e4d8c2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: c.image ? '#e4d8c2' : photoPlh('#e4d8c2', '#ddcfb4', 11),
                      backgroundImage: c.image ? `url(${c.image})` : undefined,
                      backgroundSize: c.image ? 'cover' : undefined,
                      backgroundPosition: c.image ? 'center' : undefined,
                      transition: 'opacity 260ms ease',
                      opacity: c.interiorImage ? (hoveredCottageId === c.id ? 0 : 1) : 1,
                    }}
                  />
                  {c.interiorImage && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${c.interiorImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'opacity 260ms ease',
                        opacity: hoveredCottageId === c.id ? 1 : 0,
                      }}
                    />
                  )}
                  {!c.image && <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#8a7a5f' }}>{c.plh}</span>}
                  <span style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(34,29,24,0.85)', color: '#e7ddc8', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999 }}>{c.tag}</span>
                </div>
                <div style={{ padding: '24px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 24, color: '#2b2620', margin: 0 }}>{c.name}</h3>
                  <p style={{ fontSize: 14, color: '#6b6157', margin: '8px 0 0' }}>{c.cap} · {c.beds} · {c.extra}</p>
                  <div style={{ flex: 1 }} />
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '22px 0 16px' }}>
                    <span style={{ fontSize: 13, color: '#9a8c74' }}>от</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#2b2620' }}>{c.price} ₽</span>
                    <span style={{ fontSize: 13, color: '#9a8c74' }}>/ ночь</span>
                  </div>
                  <button type="button" onClick={() => openBooking(c.name)} className="fh-btn-dark" style={{ width: '100%', background: '#2b2620', color: '#f6efe1', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, padding: 13, borderRadius: 999 }}>
                    Забронировать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ЧЕМ ЗАНЯТЬСЯ / НА ТЕРРИТОРИИ ===== */}
      <section className="fh-section-pad" style={{ padding: '0 32px 120px' }}>
        <div style={wrap}>
          <div className="fh-stack-mobile" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 40 }}>
            <div>
              <span style={kicker}>Не только рыбалка</span>
              <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#2b2620', margin: '16px 0 0' }}>Чем заняться на базе</h2>
            </div>
            <button type="button" onClick={() => onNav('/entertainment')} className="fh-btn-outline" style={{ background: 'none', border: '1px solid rgba(43,38,32,0.25)', borderRadius: 999, cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#2b2620', padding: '12px 24px', whiteSpace: 'nowrap' }}>
              Все развлечения →
            </button>
          </div>
          <div className="fh-water-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 20 }}>
            {experience.map((e, idx) => (
              <button
                key={e.t}
                type="button"
                data-reveal
                onClick={() => onNav(e.path)}
                className={`fh-water-card fh-water-card-${idx} fh-card-hover`}
                style={{ textAlign: 'left', cursor: 'pointer', background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 8, padding: '26px 26px', width: '100%' }}
              >
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 21, color: '#2b2620', margin: '0 0 8px' }}>{e.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#6b6157', margin: 0 }}>{e.d}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ПИТАНИЕ (тизер) ===== */}
      <section className="fh-section-pad" style={{ padding: '0 32px 120px' }}>
        <div className="fh-directions" style={{ ...wrap, background: '#2b2620', borderRadius: 8, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1.1fr' }}>
          <div
            style={{
              minHeight: 280,
              background: dining.image ? '#3a342b' : photoPlh('#3a342b', '#332e26'),
              backgroundImage: dining.image ? `url(${dining.image})` : undefined,
              backgroundSize: dining.image ? 'cover' : undefined,
              backgroundPosition: dining.image ? 'center' : undefined,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <div className="fh-directions-text" style={{ padding: '56px 56px' }}>
            <span style={kickerGold}>Питание</span>
            <h2 style={{ ...h2, fontSize: 'clamp(28px, 3.2vw, 42px)', color: '#f6efe1', margin: '16px 0 0' }}>Домашняя кухня и ваш улов</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: '#b3a68e', margin: '18px 0 0' }}>
              Трёхразовое питание на основе традиционной домашней кухни: свежие продукты из подсобного хозяйства, рыба из Рыбинского водохранилища. Приготовим даже пойманный вами трофей.
            </p>
            <button type="button" onClick={() => onNav('/dining')} className="fh-btn-primary" style={{ marginTop: 28, background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, padding: '14px 28px', borderRadius: 999 }}>
              Подробнее о питании →
            </button>
          </div>
        </div>
      </section>

      {/* ===== SEASONS ===== */}
      <section style={{ background: '#221d18', padding: '120px 32px' }} className="fh-section-pad">
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
            <span style={kickerGold}>Круглый год</span>
            <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.8vw, 50px)', color: '#f6efe1', margin: '16px 0 0' }}>Клюёт и летом, и в мороз</h2>
          </div>
          <div className="fh-seasons" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <div data-reveal style={{ border: '1px solid rgba(231,221,200,0.16)', borderRadius: 6, overflow: 'hidden' }}>
              <div
                style={{
                  aspectRatio: '16 / 8',
                  background: fishingImages.summer ? '#3a4a3f' : photoPlh('#3a4a3f', '#34433a'),
                  backgroundImage: fishingImages.summer ? `url(${fishingImages.summer})` : undefined,
                  backgroundSize: fishingImages.summer ? 'cover' : undefined,
                  backgroundPosition: fishingImages.summer ? 'center' : undefined,
                }}
              />
              <div style={{ padding: 32 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 28, color: '#f6efe1', margin: 0 }}>Лето на воде</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#b3a68e', margin: '12px 0 0' }}>Утренняя зорька в тихой заводи, троллинг и спиннинг с катера, азартная ночная ловля налима. Судак и щука сами просятся в садок.</p>
              </div>
            </div>
            <div data-reveal style={{ border: '1px solid rgba(231,221,200,0.16)', borderRadius: 6, overflow: 'hidden' }}>
              <div
                style={{
                  aspectRatio: '16 / 8',
                  background: fishingImages.winter ? '#44505a' : photoPlh('#44505a', '#3d4951'),
                  backgroundImage: fishingImages.winter ? `url(${fishingImages.winter})` : undefined,
                  backgroundSize: fishingImages.winter ? 'cover' : undefined,
                  backgroundPosition: fishingImages.winter ? 'center' : undefined,
                }}
              />
              <div style={{ padding: 32 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 28, color: '#f6efe1', margin: 0 }}>Зима подо льдом</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#b3a68e', margin: '12px 0 0' }}>Снегоход домчит к дальним лункам, егерь покажет уловистые точки. Подлёдный судак, жерлицы на щуку — а вечером тёплый дом и жаркая баня.</p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button type="button" onClick={() => onNav('/fishing')} className="fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 600, padding: '15px 34px', borderRadius: 999 }}>
              Всё о рыбалке и технике →
            </button>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="fh-section fh-section-pad" style={{ padding: '120px 32px' }}>
        <div style={wrap}>
          <span style={kicker}>Отзывы гостей</span>
          <h2 style={{ ...h2, fontSize: 'clamp(32px, 3.6vw, 46px)', color: '#2b2620', margin: '16px 0 48px' }}>За что нас любят и возвращаются</h2>
          <div className="fh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {reviews.map((rv) => (
              <div key={rv.name} data-reveal style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, padding: 32 }}>
                <div style={{ color: '#b8762e', fontSize: 16, letterSpacing: '0.1em' }}>{rv.stars}</div>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: '#3a352e', margin: '18px 0 24px' }}>«{rv.text}»</p>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#2b2620' }}>{rv.name}</div>
                <div style={{ fontSize: 13, color: '#9a8c74', marginTop: 4 }}>{rv.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIRECTIONS ===== */}
      <section className="fh-section-pad" style={{ padding: '0 32px 120px' }}>
        <div className="fh-directions" style={{ ...wrap, background: '#2b2620', borderRadius: 8, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.1fr 1fr' }}>
          <div className="fh-directions-text" style={{ padding: '64px 56px' }}>
            <span style={kickerGold}>Как добраться</span>
            <h2 style={{ ...h2, fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#f6efe1', margin: '16px 0 0' }}>270 км от Москвы — и город позади</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#b3a68e', margin: '20px 0 0' }}>{contact.address}. Удобный заезд на любом авто, парковка у каждого дома. Пришлём точную геолокацию после брони.</p>
            <div className="fh-stack-mobile" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 32 }}>
              <button type="button" onClick={() => openBooking('')} className="fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, padding: '14px 28px', borderRadius: 999 }}>Забронировать</button>
              <button type="button" onClick={() => onNav('/contacts')} style={{ background: 'rgba(246,239,225,0.08)', color: '#f6efe1', border: '1px solid rgba(246,239,225,0.3)', cursor: 'pointer', fontSize: 15, fontWeight: 600, padding: '14px 28px', borderRadius: 999 }}>Контакты</button>
            </div>
          </div>
          <div style={{ minHeight: 320, display: 'flex' }}>
            <iframe
              src={mapEmbedUrl}
              title="Карта проезда — Family House"
              loading="lazy"
              allowFullScreen
              style={{ width: '100%', height: '100%', minHeight: 320, border: 0, display: 'block' }}
            />
          </div>
        </div>
      </section>
    </>
  )
}

function HomePage() {
  return (
    <SiteShell activeId="home">
      <HomeContent />
    </SiteShell>
  )
}

export default HomePage
