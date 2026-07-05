import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { yandex } from '../data/siteData'
import { kickerGold } from '../data/styles'

function ReviewsContent() {
  const { openBooking } = useShell()
  useScrollReveal()

  return (
    <>
      {/* HERO */}
      <section style={{ background: '#221d18', padding: '60px 32px 46px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <span style={kickerGold}>Гости возвращаются снова · Яндекс.Карты</span>
            <h1 className="fh-oswald" style={{ fontSize: 'clamp(38px,5vw,72px)', fontWeight: 700, textTransform: 'uppercase', color: '#f6efe1', margin: '12px 0 0' }}>
              Отзывы гостей
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="fh-oswald" style={{ fontSize: 56, fontWeight: 700, color: '#f6efe1', lineHeight: 1 }}>{yandex.rating}</span>
            <span style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#e0b45f', fontSize: 18, letterSpacing: '0.14em' }}>★★★★★</span>
              <span style={{ color: '#cabfae', fontSize: 13 }}>{yandex.ratingsCount} оценок · {yandex.reviewsCount} отзыва</span>
            </span>
          </div>
        </div>
      </section>

      {/* КАТЕГОРИИ + ВИДЖЕТ */}
      <section style={{ padding: '56px 32px 90px' }} className="fh-section-pad">
        <div className="fh-directions fh-directions--reviews-page" style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div data-reveal data-reveal-stagger="off" style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.1)', borderRadius: 12, padding: '32px 30px' }}>
            <div className="fh-oswald" style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2b2620', marginBottom: 22 }}>Что отмечают гости</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {yandex.categories.map((cat) => (
                <div key={cat.t}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
                    <span style={{ fontSize: 14.5, color: '#3a352e' }}>{cat.t}</span>
                    <span className="fh-oswald" style={{ fontSize: 14, fontWeight: 600, color: '#b8762e' }}>{cat.v}%</span>
                  </div>
                  <div style={{ height: 7, background: '#e7dcc6', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${cat.v}%`, background: 'linear-gradient(90deg,#b8762e,#e0b45f)', borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </div>
            <a href={yandex.url} target="_blank" rel="noopener noreferrer" className="fh-oswald" style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 10, background: '#b8762e', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '14px 26px', borderRadius: 4 }}>
              Оставить отзыв →
            </a>
          </div>

          <div data-reveal data-reveal-stagger="off" style={{ background: '#fff', border: '1px solid rgba(43,38,32,0.12)', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 680 }}>
            <iframe src={yandex.widget} title="Отзывы о базе «Семейный дом» на Яндекс.Картах" loading="lazy" style={{ width: '100%', height: '100%', minHeight: 680, border: 0, display: 'block' }} />
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#9a8c74', margin: '28px auto 0', maxWidth: 560 }}>
          Все отзывы обновляются автоматически из карточки базы на Яндекс.Картах.
        </p>

        <div style={{ textAlign: 'center', marginTop: 26 }}>
          <button type="button" onClick={openBooking} className="fh-oswald fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '16px 40px', borderRadius: 3, boxShadow: '0 10px 28px rgba(184,118,46,0.36)' }}>
            Забронировать домик →
          </button>
        </div>
      </section>
    </>
  )
}

function ReviewsPage() {
  return (
    <SiteShell activeId="reviews">
      <ReviewsContent />
    </SiteShell>
  )
}

export default ReviewsPage
