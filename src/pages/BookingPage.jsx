import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { getBnovoIframeUrl, hasBnovoUid } from '../utils/bnovo'
import { humanDate } from '../utils/dates'
import { kickerGold } from '../data/styles'

/* ============================================================
   Страница /booking — полный модуль бронирования Bnovo,
   встроенный в сайт (inline iframe). Клиент выбирает дом, даты
   и оплачивает, не покидая family-house24.

   Даты берём из URL (?checkIn=ГГГГ-ММ-ДД&checkOut=...), которые
   передаёт форма поиска в hero, и отдаём в getBnovoIframeUrl.
   ============================================================ */

const trustBadges = [
  { icon: '🔒', t: 'Оплата без рисков', d: 'Картой онлайн в защищённом модуле' },
  { icon: '✓', t: 'Бронь сразу за вами', d: 'Подтверждение приходит мгновенно' },
  { icon: '⌫', t: 'Передумали — не беда', d: 'Условия отмены видны при выборе тарифа' },
]

function BookingContent() {
  const { onNav } = useShell()
  const [params] = useSearchParams()
  const [loaded, setLoaded] = useState(false)

  const checkIn = params.get('checkIn') || ''
  const checkOut = params.get('checkOut') || ''

  const iframeUrl = useMemo(
    () => getBnovoIframeUrl({ checkIn, checkOut }),
    [checkIn, checkOut],
  )

  const datesLabel =
    humanDate(checkIn) && humanDate(checkOut)
      ? `${humanDate(checkIn)} — ${humanDate(checkOut)}`
      : ''

  return (
    <>
      {/* ===== ОБЛОЖКА ===== */}
      <section className="fh-section-pad" style={{ background: '#221d18', padding: '60px 32px 46px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', textAlign: 'center' }}>
          <span style={kickerGold}>Онлайн-бронирование</span>
          <h1 className="fh-oswald" style={{ fontSize: 'clamp(34px,4.4vw,58px)', fontWeight: 700, textTransform: 'uppercase', color: '#f6efe1', margin: '12px 0 0' }}>
            Забронировать дом
          </h1>
          <p style={{ fontSize: 16, color: '#b3a68e', margin: '16px auto 0', maxWidth: 600, lineHeight: 1.6 }}>
            {datesLabel
              ? <>Показываем свободные домики на даты <strong style={{ color: '#f6efe1' }}>{datesLabel}</strong>. Выбирайте дом, бронируйте и оплачивайте прямо здесь — никуда уходить не нужно.</>
              : <>Выберите даты и число гостей — система покажет свободные домики и актуальные цены. Оплата и подтверждение — онлайн.</>}
          </p>

          <div className="fh-trust" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 30 }}>
            {trustBadges.map((b) => (
              <div key={b.t} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(246,239,225,0.06)', border: '1px solid rgba(246,239,225,0.14)', borderRadius: 10, padding: '12px 18px' }}>
                <span style={{ fontSize: 18, lineHeight: 1 }}>{b.icon}</span>
                <span style={{ lineHeight: 1.3, textAlign: 'left' }}>
                  <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#f6efe1' }}>{b.t}</span>
                  <span style={{ display: 'block', fontSize: 12.5, color: '#b3a68e', marginTop: 2 }}>{b.d}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ВСТРОЕННЫЙ МОДУЛЬ BNOVO ===== */}
      <section className="fh-section-pad" style={{ padding: '40px 32px 90px', background: '#f3ede0' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          {hasBnovoUid() && iframeUrl ? (
            <div className="fh-booking-frame" style={{ position: 'relative', background: '#fff', border: '1px solid rgba(43,38,32,0.1)', borderRadius: 12, boxShadow: '0 30px 70px rgba(28,24,20,0.18)', overflow: 'hidden', marginTop: 8 }}>
              {!loaded && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, background: '#faf6ee', zIndex: 2 }}>
                  <span className="fh-spinner" aria-hidden="true" />
                  <span style={{ fontSize: 14.5, color: '#9a8c74', fontWeight: 500 }}>Подбираем свободные дома для вас…</span>
                </div>
              )}
              <iframe
                title="Бронирование — база «Семейный дом»"
                src={iframeUrl}
                onLoad={() => setLoaded(true)}
                className="fh-booking-iframe"
                style={{ display: 'block', width: '100%', height: 'clamp(720px, calc(100vh - 120px), 1100px)', border: 'none' }}
                allow="payment"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div style={{ marginTop: 8, background: '#faf6ee', border: '1px solid rgba(43,38,32,0.1)', borderRadius: 12, padding: '56px 40px', textAlign: 'center', boxShadow: '0 30px 70px rgba(28,24,20,0.12)' }}>
              <h2 className="fh-oswald" style={{ fontWeight: 700, fontSize: 26, textTransform: 'uppercase', color: '#2b2620', margin: 0 }}>
                Онлайн-бронь сейчас отдыхает
              </h2>
              <p style={{ fontSize: 16, color: '#6b6157', margin: '14px auto 28px', maxWidth: 440, lineHeight: 1.6 }}>
                Ничего страшного — позвоните нам, и мы подберём дом, подскажем свободные даты и забронируем всё за вас.
              </p>
              <a href="tel:+79159956687" className="fh-oswald fh-btn-primary" style={{ display: 'inline-block', background: '#b8762e', color: '#fff', textDecoration: 'none', fontSize: 16, fontWeight: 600, letterSpacing: '0.04em', padding: '14px 30px', borderRadius: 3 }}>
                +7 (915) 995-66-87
              </a>
            </div>
          )}

          {iframeUrl && (
            <p style={{ textAlign: 'center', fontSize: 13.5, color: '#9a8c74', margin: '22px 0 0', lineHeight: 1.6 }}>
              Не получается забронировать онлайн?{' '}
              <a href={iframeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#b8762e', fontWeight: 700 }}>
                Открыть модуль в новой вкладке
              </a>{' '}
              или{' '}
              <button type="button" onClick={() => onNav('/contacts')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#b8762e', fontWeight: 700, fontSize: 13.5, fontFamily: 'inherit' }}>
                напишите нам
              </button>.
            </p>
          )}
        </div>
      </section>
    </>
  )
}

function BookingPage() {
  return (
    <SiteShell activeId="booking">
      <BookingContent />
    </SiteShell>
  )
}

export default BookingPage
