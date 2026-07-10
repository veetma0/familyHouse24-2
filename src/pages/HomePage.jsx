import { useState } from 'react'
import SiteShell from '../components/SiteShell'
import BookingBar from '../components/BookingBar'
import CottagesGrid from '../components/CottagesGrid'
import ImageCarousel from '../components/ImageCarousel'
import VideoModal from '../components/VideoModal'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  homeHero,
  homeAbout,
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
  const [galleryIdx, setGalleryIdx] = useState(0)
  const [videoOpen, setVideoOpen] = useState(false)
  useScrollReveal()
  const gActive = homeGallery[galleryIdx] || homeGallery[0]
  const gActiveImages = gActive.gallery?.length
    ? [gActive.src, ...gActive.gallery.filter((s) => s !== gActive.src)]
    : [gActive.src]
  // Показываем топ-оценки гостей, кроме оценки персонала.
  const topCats = yandex.categories.filter((c) => c.t !== 'Персонал').slice(0, 5)

  return (
    <>
      {/* ============ HERO ============ */}
      <section
        className="fh-hero"
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
            alt="Аэропанорама базы «Семейный дом» на реке Сить"
            className="fh-kenburns"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 55%' }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,18,14,0.55) 0%, rgba(20,18,14,0.15) 32%, rgba(20,18,14,0.35) 62%, rgba(20,18,14,0.9) 100%)' }} />

        {/* Рейтинг (десктоп — плашка в углу) */}
        <a
          href={yandex.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Оценка ${yandex.rating} на Яндекс.Картах — открыть отзывы`}
          className="fh-hero-badge"
          style={{ position: 'absolute', top: 34, right: 32, display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(20,18,14,0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(246,239,225,0.2)', borderRadius: 4, padding: '12px 18px' }}
        >
          <span className="fh-oswald" style={{ fontSize: 34, fontWeight: 700, color: '#f6efe1', lineHeight: 1 }}>{yandex.rating}</span>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#e0b45f', fontSize: 14, letterSpacing: '0.14em' }}>★★★★★</span>
            <span style={{ color: '#cabfae', fontSize: 12 }}>{yandex.ratingsCount} оценок на Яндекс.Картах</span>
          </span>
        </a>

        <div className="fh-section-pad fh-hero-pad" style={{ position: 'relative', ...wrap, width: '100%', padding: '0 36px 54px' }}>
          <div className="fh-hero-reveal fh-hero-reveal--wide">
            <div className="fh-hero-top-gap" aria-hidden="true" />
            {/* Рейтинг (мобильная версия — в потоке, не перекрывает заголовок) */}
            <a
              href={yandex.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Оценка ${yandex.rating} на Яндекс.Картах — открыть отзывы`}
              className="fh-hero-rating fh-oswald"
            >
              <span className="fh-hero-rating-stars">★★★★★</span>
              <b>{yandex.rating}</b>
              <span className="fh-hero-rating-label">{yandex.ratingsCount} оценок на Яндекс.Картах</span>
            </a>
            <span className="fh-oswald fh-hero-kicker" style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#e0b45f', paddingBottom: 18 }}>
              {homeHero.kicker}
            </span>
            <h1 className="fh-oswald fh-hero-h1">
              <span className="fh-hero-h1-line">Рыболовная база отдыха</span>
              <span className="fh-hero-h1-line">«Семейный дом»</span>
            </h1>
            {homeHero.videoUrl && (
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="fh-oswald fh-hero-video-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 20,
                  background: 'rgba(20,18,14,0.55)',
                  border: '1px solid rgba(246,239,225,0.32)',
                  borderRadius: 4,
                  color: '#f6efe1',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '12px 20px',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <span aria-hidden style={{ fontSize: 16, lineHeight: 1 }}>▶</span>
                {homeHero.videoLabel}
              </button>
            )}
            <p className="fh-oswald" style={{ fontSize: 'clamp(14px,3.2vw,18px)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e0b45f', margin: '18px 0 0' }}>
              {homeHero.subtitle}
            </p>
            <p className="fh-hero-lead" style={{ fontSize: 'clamp(16px,4.4vw,19px)', lineHeight: 1.6, color: 'rgba(243,237,224,0.95)', margin: '16px 0 0', maxWidth: 680, fontWeight: 500 }}>
              {homeHero.welcome}
            </p>
            <p className="fh-hero-lead" style={{ fontSize: 'clamp(15px,3.8vw,17px)', lineHeight: 1.65, color: 'rgba(243,237,224,0.88)', margin: '14px 0 0', maxWidth: 680 }}>
              {homeHero.lead}
            </p>
          </div>
          <div style={{ marginTop: 34 }}>
            <BookingBar />
          </div>
        </div>
      </section>

      {/* ============ ИНТРО ============ */}
      <section style={{ padding: 'clamp(54px, 10vw, 96px) 32px 40px' }} className="fh-section-pad">
        <div style={{ maxWidth: 680, margin: '0 auto' }} data-reveal>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span style={kicker}>{homeAbout.kicker}</span>
            <h2 style={{ ...h2, fontSize: 'clamp(30px,4.2vw,52px)', color: '#2b2620', margin: '16px 0 0', lineHeight: 1.15 }}>
              {homeAbout.title}
            </h2>
          </div>
          <div className="fh-about-text">
            <p className="fh-about-text-lead">{homeAbout.lead}</p>
            {homeAbout.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ============ НУМЕРОВАННЫЕ ПОЛОСЫ 01–06 ============ */}
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
              <div className="fh-band-media">
                <img src={b.img} alt={b.t} className="fh-band-img" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ РАЗМЕЩЕНИЕ (фильтр + галерея с флипом) ============ */}
      <section style={{ padding: 'clamp(48px, 9vw, 80px) 32px 40px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }} data-reveal data-reveal-stagger="off">
            <span style={kicker}>Дома у воды</span>
            <h2 style={{ ...h2, fontSize: 'clamp(32px,4.4vw,56px)', color: '#2b2620', margin: '14px 0 6px' }}>Размещение в домах</h2>
            <p style={{ fontSize: 16, color: '#6b6157', margin: '0 auto 26px', maxWidth: 640 }}>
              Три комфортабельных коттеджа и гостевой дом с номерами.
            </p>
          </div>

          <CottagesGrid openBooking={openBooking} onNav={onNav} showFooterLink />
        </div>
      </section>

      {/* ============ РЫБАЛКА (закат + статы) ============ */}
      <section style={{ position: 'relative', marginTop: 60, overflow: 'hidden' }}>
        <img src="/images/old-site/activities/extra-19019454.jpg" alt="Рыбалка на закате" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(28,20,12,0.82), rgba(28,20,12,0.68))' }} />
        <div className="fh-section-pad" style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '96px 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }} data-reveal data-reveal-stagger="off">
            <span style={kickerGold}>Если рыбалка — то в «Семейный дом»</span>
            <h2 style={{ ...h2, fontSize: 'clamp(32px,4.4vw,58px)', color: '#f6efe1', margin: '14px 0 0' }}>
              Рыбалка на Рыбинском водохранилище
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(243,237,224,0.85)', margin: '20px 0 0' }}>
              Рыбинское водохранилище за многие столетия зарекомендовало себя как жемчужина рыбацкой жизни. Более 35 видов рыбы. Наши егеря сделают всё возможное, чтобы вы побили все предыдущие рекорды своего улова!
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
      <section style={{ padding: 'clamp(54px, 10vw, 96px) 32px 40px' }} className="fh-section-pad">
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
              <ImageCarousel
                key={galleryIdx}
                images={gActiveImages}
                cover={gActive.src}
                alt={gActive.caption}
                className="fh-image-carousel fh-image-carousel--infra"
                showNav
              />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '26px 28px', background: 'linear-gradient(0deg, rgba(20,18,14,0.85), transparent)', pointerEvents: 'none' }}>
                <span className="fh-oswald" style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e0b45f' }}>{gActive.kicker}</span>
                <div className="fh-oswald" style={{ fontSize: 26, fontWeight: 600, textTransform: 'uppercase', color: '#f6efe1', marginTop: 4 }}>{gActive.caption}</div>
              </div>
            </div>
            <div className="fh-gallery-thumbs">
              {homeGallery.map((g, i) => (
                <button
                  key={g.caption}
                  type="button"
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
      <section style={{ padding: 'clamp(48px, 9vw, 80px) 32px 40px' }} className="fh-section-pad">
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
              <iframe src={yandex.widget} title="Отзывы о базе «Семейный дом» на Яндекс.Картах" loading="lazy" style={{ width: '100%', height: '100%', minHeight: 520, border: 0, display: 'block' }} />
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
      <section style={{ padding: 'clamp(48px, 9vw, 80px) 32px 40px' }} className="fh-section-pad">
        <div className="fh-directions" style={{ maxWidth: 1280, margin: '0 auto', borderRadius: 10, overflow: 'hidden', background: '#2b2620' }} data-reveal data-reveal-stagger="off">
          <div style={{ minHeight: 420 }}>
            <iframe src={mapEmbedUrl} title="Карта проезда — база «Семейный дом»" loading="lazy" allowFullScreen style={{ width: '100%', height: '100%', minHeight: 420, border: 0, display: 'block' }} />
          </div>
          <div className="fh-directions-pad" style={{ padding: '56px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={kickerGold}>Как добраться</span>
            <h2 style={{ ...h2, fontSize: 'clamp(28px,3.4vw,44px)', color: '#f6efe1', margin: '14px 0 0', lineHeight: 1.05 }}>360 км от Москвы — и вы на базе отдыха</h2>
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
      <section style={{ padding: '40px 32px clamp(60px, 11vw, 96px)' }} className="fh-section-pad">
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', borderRadius: 12, overflow: 'hidden' }} data-reveal data-reveal-stagger="off">
          <img src={HERO_IMG} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(20,18,14,0.9), rgba(20,18,14,0.6))' }} />
          <div style={{ position: 'relative', padding: '72px 40px', textAlign: 'center' }}>
            <h2 style={{ ...h2, ...oswald, fontSize: 'clamp(30px,4.2vw,56px)', color: '#f6efe1', margin: 0, lineHeight: 1.03 }}>
              Готовы к незабываемому<br />отдыху в «Семейный дом»?
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

      {videoOpen && homeHero.videoUrl && (
        <VideoModal
          src={homeHero.videoUrl}
          title={homeHero.videoLabel}
          onClose={() => setVideoOpen(false)}
        />
      )}
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
