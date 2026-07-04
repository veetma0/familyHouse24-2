import { useState } from 'react'
import SiteShell from '../components/SiteShell'
import BookingBar from '../components/BookingBar'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  cottages,
  homeBands,
  fishStats,
  homeGallery,
  yandex,
  mapEmbedUrl,
  contact,
} from '../data/siteData'
import { wrap, kicker, kickerGold, h2, oswald } from '../data/styles'

const HERO_IMG = '/images/old-site/activities/g-25756808.jpg'

function HomeContent() {
  const { openBooking, onNav } = useShell()
  const [filter, setFilter] = useState('all')
  const [galleryIdx, setGalleryIdx] = useState(0)
  useScrollReveal([filter])

  const tabs = [{ id: 'all', label: 'Все дома' }, ...cottages.map((c) => ({ id: c.id, label: c.name }))]
  const filtered = filter === 'all' ? cottages : cottages.filter((c) => c.id === filter)
  const gActive = homeGallery[galleryIdx] || homeGallery[0]
  const topCats = yandex.categories.slice(0, 5)

  return (
    <>
      {/* ============ HERO ============ */}
      <section
        style={{
          position: 'relative',
          minHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
          background: '#1a1712',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img
            src={HERO_IMG}
            alt="Аэропанорама базы Family House на реке Сить"
            className="fh-kenburns"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 55%' }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,18,14,0.55) 0%, rgba(20,18,14,0.15) 32%, rgba(20,18,14,0.35) 62%, rgba(20,18,14,0.9) 100%)' }} />

        {/* Рейтинг */}
        <div
          className="fh-hero-badge"
          style={{ position: 'absolute', top: 34, right: 32, display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(20,18,14,0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(246,239,225,0.2)', borderRadius: 4, padding: '12px 18px' }}
        >
          <span className="fh-oswald" style={{ fontSize: 34, fontWeight: 700, color: '#f6efe1', lineHeight: 1 }}>4.9</span>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#e0b45f', fontSize: 14, letterSpacing: '0.14em' }}>★★★★★</span>
            <span style={{ color: '#cabfae', fontSize: 12 }}>оценка гостей</span>
          </span>
        </div>

        <div className="fh-section-pad" style={{ position: 'relative', ...wrap, width: '100%', padding: '0 32px 54px' }}>
          <div className="fh-hero-reveal" style={{ maxWidth: 860 }}>
            <span className="fh-oswald" style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#e0b45f', paddingBottom: 14 }}>
              Эко-отель · Рыбинское водохранилище
            </span>
            <h1 className="fh-oswald" style={{ fontSize: 'clamp(40px,7vw,104px)', fontWeight: 700, lineHeight: 0.94, letterSpacing: '0.01em', textTransform: 'uppercase', color: '#f6efe1', margin: 0, textShadow: '0 4px 30px rgba(0,0,0,0.4)' }}>
              Рыболовная база<br />отдыха<br />«Семейный дом»
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.65, color: 'rgba(243,237,224,0.9)', margin: '22px 0 0', maxWidth: 620 }}>
              Дома и номера у самой воды, русская баня на кедре, катера с егерем и домашняя кухня — для рыбаков, семей и хорошей компании. Круглый год.
            </p>
          </div>
          <div style={{ marginTop: 34 }}>
            <BookingBar />
          </div>
        </div>
      </section>

      {/* ============ ИНТРО ============ */}
      <section style={{ padding: '96px 32px 40px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }} data-reveal>
          <span style={kicker}>О базе отдыха</span>
          <h2 style={{ ...h2, fontSize: 'clamp(34px,4.6vw,60px)', color: '#2b2620', margin: '16px 0 0' }}>
            Прекрасное решение для комфортного отдыха
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: '#6b6157', margin: '22px auto 0', maxWidth: 760 }}>
            Family House стоит на берегу реки Сить, в сосновом бору, в 10 км от Рыбинского водохранилища. Мы принимаем рыбаков, охотников, яхтсменов и семьи с детьми — и всё для отдыха уже ждёт вас на берегу.
          </p>
        </div>
      </section>

      {/* ============ НУМЕРОВАННЫЕ ПОЛОСЫ 01–05 ============ */}
      <section style={{ padding: '24px 32px 40px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 22 }}>
          {homeBands.map((b) => (
            <div
              key={b.n}
              data-reveal
              className={`fh-band${b.imageLeft ? ' fh-band--rev' : ''}`}
              style={{ background: b.bg, border: b.border ? '1px solid rgba(43,38,32,0.1)' : 'none' }}
            >
              <div className="fh-band-pad" style={{ padding: '52px 54px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="fh-oswald fh-band-num" style={{ fontSize: 60, fontWeight: 700, color: b.numColor, lineHeight: 0.9 }}>{b.n}</span>
                <h3 className="fh-oswald" style={{ fontSize: 30, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em', color: b.titleColor, margin: '14px 0 0' }}>{b.t}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: b.textColor, margin: '14px 0 0', maxWidth: 420 }}>{b.d}</p>
              </div>
              <img src={b.img} alt={b.t} className="fh-band-img" />
            </div>
          ))}
        </div>
      </section>

      {/* ============ РАЗМЕЩЕНИЕ (фильтр + галерея с флипом) ============ */}
      <section style={{ padding: '80px 32px 40px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }} data-reveal data-reveal-stagger="off">
            <span style={kicker}>Дома у воды</span>
            <h2 style={{ ...h2, fontSize: 'clamp(32px,4.4vw,56px)', color: '#2b2620', margin: '14px 0 6px' }}>Размещение в домах</h2>
            <p style={{ fontSize: 16, color: '#6b6157', margin: '0 auto 26px', maxWidth: 640 }}>
              Наведите на дом — покажем интерьер. Цены обновляются онлайн в системе бронирования.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 34 }} data-reveal data-reveal-stagger="off">
            {tabs.map((t) => {
              const active = filter === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFilter(t.id)}
                  className="fh-oswald"
                  style={{
                    background: active ? '#2b2620' : 'transparent',
                    color: active ? '#f6efe1' : '#2b2620',
                    border: `1px solid ${active ? '#2b2620' : 'rgba(43,38,32,0.25)'}`,
                    cursor: 'pointer',
                    fontSize: 13.5,
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '10px 20px',
                    borderRadius: 999,
                    transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  {t.label}
                </button>
              )
            })}
          </div>

          <div className="fh-cottages-grid">
            {filtered.map((c) => (
              <div
                key={c.id}
                data-reveal
                className="fh-cardlift"
                style={{ background: '#faf6ee', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(43,38,32,0.09)', display: 'flex', flexDirection: 'column' }}
              >
                <div className="fh-flip" style={{ position: 'relative', aspectRatio: '3 / 2', overflow: 'hidden', background: '#e4d8c2' }}>
                  <img src={c.interior} alt={`${c.name} — интерьер`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <img src={c.image} alt={c.name} data-flip-top style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }} />
                  <span className="fh-oswald" style={{ position: 'absolute', top: 14, left: 14, zIndex: 2, background: 'rgba(20,18,14,0.82)', color: '#e7ddc8', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999 }}>{c.tag}</span>
                </div>
                <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 className="fh-oswald" style={{ fontSize: 24, fontWeight: 600, textTransform: 'uppercase', color: '#2b2620', margin: 0 }}>{c.name}</h3>
                  <p style={{ fontSize: 14, color: '#6b6157', margin: '8px 0 0', lineHeight: 1.5 }}>{c.cap} · {c.beds}</p>
                  <p style={{ fontSize: 13.5, color: '#9a8c74', margin: '6px 0 0', lineHeight: 1.5 }}>{c.extra}</p>
                  <div style={{ flex: 1 }} />
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '20px 0 14px' }}>
                    <span style={{ fontSize: 13, color: '#9a8c74' }}>от</span>
                    <span className="fh-oswald" style={{ fontSize: 30, fontWeight: 700, color: '#2b2620' }}>{c.price} ₽</span>
                    <span style={{ fontSize: 13, color: '#9a8c74' }}>/ ночь</span>
                  </div>
                  <button type="button" onClick={openBooking} className="fh-oswald fh-btn-dark" style={{ width: '100%', background: '#2b2620', color: '#f6efe1', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: 13, borderRadius: 3 }}>
                    Забронировать
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button type="button" onClick={() => onNav('/cottages')} className="fh-oswald fh-btn-outline" style={{ background: 'none', border: '1px solid rgba(43,38,32,0.28)', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2b2620', padding: '13px 30px' }}>
              Все дома и номера →
            </button>
          </div>
        </div>
      </section>

      {/* ============ РЫБАЛКА (закат + статы) ============ */}
      <section style={{ position: 'relative', marginTop: 60, overflow: 'hidden' }}>
        <img src="/images/old-site/activities/extra-19019454.jpg" alt="Рыбалка на закате" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(28,20,12,0.82), rgba(28,20,12,0.68))' }} />
        <div className="fh-section-pad" style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '96px 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }} data-reveal data-reveal-stagger="off">
            <span style={kickerGold}>Если рыбалка — то в Family House</span>
            <h2 style={{ ...h2, fontSize: 'clamp(32px,4.4vw,58px)', color: '#f6efe1', margin: '14px 0 0' }}>
              Рыбалка на Рыбинском водохранилище
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(243,237,224,0.85)', margin: '20px 0 0' }}>
              Больше 35 видов рыбы, а егерь знает рельеф дна и сегодняшние точки клёва. Судак, щука, лещ, окунь, налим и берш — и летом, и в мороз.
            </p>
          </div>
          <div className="fh-grid-stats" style={{ marginTop: 52, borderTop: '1px solid rgba(246,239,225,0.18)', borderBottom: '1px solid rgba(246,239,225,0.18)' }} data-reveal data-reveal-stagger="off">
            {fishStats.map((s, i) => (
              <div key={s.label} style={{ padding: '30px 20px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(246,239,225,0.14)' : 'none' }}>
                <div className="fh-oswald" style={{ fontSize: 40, fontWeight: 700, color: '#f6efe1', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: '#cabfae', marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <button type="button" onClick={() => onNav('/fishing')} className="fh-oswald fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '16px 36px', borderRadius: 3, boxShadow: '0 10px 30px rgba(184,118,46,0.4)' }}>
              Всё о рыбалке и технике →
            </button>
          </div>
        </div>
      </section>

      {/* ============ ИНФРАСТРУКТУРА (интерактивная галерея) ============ */}
      <section style={{ padding: '96px 32px 40px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }} data-reveal data-reveal-stagger="off">
            <span style={kicker}>Всё в одном месте</span>
            <h2 style={{ ...h2, fontSize: 'clamp(32px,4.4vw,56px)', color: '#2b2620', margin: '14px 0 18px' }}>Продуманная инфраструктура</h2>
            <button type="button" onClick={() => onNav('/photos')} className="fh-oswald fh-btn-outline" style={{ background: 'none', border: '1px solid rgba(43,38,32,0.25)', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#2b2620', padding: '11px 26px', marginBottom: 30 }}>
              Смотреть все фото →
            </button>
          </div>

          <div className="fh-gallery" data-reveal data-reveal-stagger="off">
            <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', minHeight: 440 }}>
              <img src={gActive.src} alt={gActive.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 440 }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '26px 28px', background: 'linear-gradient(0deg, rgba(20,18,14,0.85), transparent)' }}>
                <span className="fh-oswald" style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e0b45f' }}>{gActive.kicker}</span>
                <div className="fh-oswald" style={{ fontSize: 26, fontWeight: 600, textTransform: 'uppercase', color: '#f6efe1', marginTop: 4 }}>{gActive.caption}</div>
              </div>
            </div>
            <div className="fh-gallery-thumbs">
              {homeGallery.map((g, i) => (
                <button
                  key={g.src}
                  type="button"
                  onMouseEnter={() => setGalleryIdx(i)}
                  onClick={() => setGalleryIdx(i)}
                  className="fh-thumb"
                  style={{ position: 'relative', border: 'none', padding: 0, cursor: 'pointer', borderRadius: 8, overflow: 'hidden', minHeight: 130, outline: i === galleryIdx ? '3px solid #b8762e' : '3px solid transparent' }}
                >
                  <img src={g.src} alt={g.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 130, display: 'block' }} />
                  <span className="fh-oswald" style={{ position: 'absolute', left: 12, bottom: 10, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>{g.caption}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ ОТЗЫВЫ · ЯНДЕКС.КАРТЫ ============ */}
      <section style={{ padding: '80px 32px 40px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }} data-reveal data-reveal-stagger="off">
            <span style={kicker}>Отзывы гостей · Яндекс.Карты</span>
            <h2 style={{ ...h2, fontSize: 'clamp(32px,4.4vw,56px)', color: '#2b2620', margin: '14px 0 0' }}>Нас любят и рекомендуют</h2>
          </div>

          <div className="fh-directions fh-directions--reviews" data-reveal data-reveal-stagger="off">
            <div style={{ background: '#2b2620', borderRadius: 12, padding: '44px 42px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <span className="fh-oswald" style={{ fontSize: 78, fontWeight: 700, color: '#f6efe1', lineHeight: 0.9 }}>{yandex.rating}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ color: '#e0b45f', fontSize: 20, letterSpacing: '0.14em' }}>★★★★★</span>
                  <span style={{ fontSize: 13.5, color: '#b3a68e' }}>{yandex.ratingsCount} оценок · {yandex.reviewsCount} отзыва</span>
                </div>
              </div>
              <div style={{ height: 1, background: 'rgba(231,221,200,0.14)', margin: '28px 0' }} />
              <div className="fh-oswald" style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8c8071', marginBottom: 14 }}>Гостям особенно нравится</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {topCats.map((cat) => (
                  <span key={cat.t} className="fh-oswald" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, letterSpacing: '0.02em', textTransform: 'uppercase', color: '#e7ddc8', background: 'rgba(184,118,46,0.16)', border: '1px solid rgba(224,180,95,0.28)', padding: '8px 14px', borderRadius: 999 }}>
                    {cat.t} <b style={{ color: '#e0b45f', fontWeight: 700 }}>{cat.v}%</b>
                  </span>
                ))}
              </div>
              <div style={{ flex: 1, minHeight: 24 }} />
              <a href={yandex.url} target="_blank" rel="noopener noreferrer" className="fh-oswald" style={{ marginTop: 28, alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 10, background: '#b8762e', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '15px 28px', borderRadius: 4 }}>
                Оставить отзыв на Яндексе →
              </a>
            </div>

            <div style={{ background: '#fff', border: '1px solid rgba(43,38,32,0.12)', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 520 }}>
              <iframe src={yandex.widget} title="Отзывы о Family House на Яндекс.Картах" loading="lazy" style={{ width: '100%', height: '100%', minHeight: 520, border: 0, display: 'block' }} />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 34 }}>
            <button type="button" onClick={() => onNav('/reviews')} className="fh-oswald fh-btn-outline" style={{ background: 'none', border: '1px solid rgba(43,38,32,0.25)', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#2b2620', padding: '12px 28px' }}>
              Все отзывы и оценки →
            </button>
          </div>
        </div>
      </section>

      {/* ============ КАРТА + КОНТАКТЫ ============ */}
      <section style={{ padding: '80px 32px 40px' }} className="fh-section-pad">
        <div className="fh-directions" style={{ maxWidth: 1280, margin: '0 auto', borderRadius: 10, overflow: 'hidden', background: '#2b2620' }} data-reveal data-reveal-stagger="off">
          <div style={{ minHeight: 420 }}>
            <iframe src={mapEmbedUrl} title="Карта проезда — Family House" loading="lazy" allowFullScreen style={{ width: '100%', height: '100%', minHeight: 420, border: 0, display: 'block' }} />
          </div>
          <div className="fh-directions-pad" style={{ padding: '56px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={kickerGold}>Как добраться</span>
            <h2 style={{ ...h2, fontSize: 'clamp(28px,3.4vw,44px)', color: '#f6efe1', margin: '14px 0 0', lineHeight: 1.05 }}>270 км от Москвы — и город позади</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: '#b3a68e', margin: '18px 0 26px' }}>
              {contact.address}. Удобный заезд на любом авто, парковка у каждого дома. Точную геолокацию пришлём после брони.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href="tel:+74951510082" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: '#f6efe1' }}>
                <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(184,118,46,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flex: 'none' }}>☎</span>
                <span>
                  <span style={{ display: 'block', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8c8071' }}>Телефон</span>
                  <span className="fh-oswald" style={{ fontSize: 20, fontWeight: 600 }}>+7 (495) 151-00-82</span>
                </span>
              </a>
              <a href="mailto:Familyhouse.baza@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: '#f6efe1' }}>
                <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(184,118,46,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flex: 'none' }}>✉</span>
                <span>
                  <span style={{ display: 'block', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8c8071' }}>Почта</span>
                  <span style={{ fontSize: 16 }}>Familyhouse.baza@gmail.com</span>
                </span>
              </a>
            </div>
            <button type="button" onClick={openBooking} className="fh-oswald fh-btn-primary" style={{ marginTop: 30, alignSelf: 'flex-start', background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '15px 30px', borderRadius: 3 }}>
              Забронировать домик
            </button>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section style={{ padding: '40px 32px 96px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', borderRadius: 12, overflow: 'hidden' }} data-reveal data-reveal-stagger="off">
          <img src={HERO_IMG} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(20,18,14,0.9), rgba(20,18,14,0.6))' }} />
          <div style={{ position: 'relative', padding: '72px 40px', textAlign: 'center' }}>
            <h2 style={{ ...h2, ...oswald, fontSize: 'clamp(30px,4.2vw,56px)', color: '#f6efe1', margin: 0, lineHeight: 1.03 }}>
              Готовы к незабываемому<br />отдыху в «Family House»?
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(243,237,224,0.85)', margin: '18px auto 30px', maxWidth: 560 }}>
              Выберите даты — и мы покажем свободные дома прямо сейчас. Гарантируем лучшую цену без скрытых комиссий.
            </p>
            <button type="button" onClick={openBooking} className="fh-oswald fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '17px 44px', borderRadius: 3, boxShadow: '0 12px 34px rgba(184,118,46,0.45)' }}>
              Забронировать сейчас
            </button>
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
