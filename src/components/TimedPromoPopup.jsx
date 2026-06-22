import { useState, useEffect } from 'react'
import './TimedPromoPopup.css'

function TimedPromoPopup({ onClose }) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenClosed, setHasBeenClosed] = useState(false)

  useEffect(() => {
    // Проверяем, закрывал ли пользователь этот попап в текущей сессии
    if (hasBeenClosed) return

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 30000)

    return () => clearTimeout(timer)
  }, [hasBeenClosed])

  const handleClose = () => {
    setIsVisible(false)
    setHasBeenClosed(true)
  }

  const handleBooking = () => {
    setIsVisible(false)
    setHasBeenClosed(true)
    if (onClose) onClose()
  }

  if (!isVisible) return null

  return (
    <>
      {/* Overlay */}
      <div className="fh-popup-overlay" onClick={handleClose} />

      {/* Popup */}
      <div className="fh-popup-container">
        <button type="button" className="fh-popup-close" onClick={handleClose} aria-label="Закрыть">
          ✕
        </button>

        <div className="fh-popup-content">
          {/* Left side - Image */}
          <div className="fh-popup-visual">
            <div className="fh-popup-image">
              <span style={{ color: 'rgba(231,221,200,0.6)' }}>фото · закат на воде</span>
            </div>
            {/* Badge */}
            <div className="fh-popup-badge">
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }}>✓ Забронировано</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>3 из 5 домов</span>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="fh-popup-text">
            <div>
              {/* Kicker */}
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#b8762e',
                textTransform: 'uppercase',
              }}>
                Специальное предложение
              </span>

              {/* Heading */}
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 32,
                fontWeight: 400,
                color: '#2b2620',
                margin: '12px 0 0',
                lineHeight: 1.15,
              }}>
                Гарантия<br />лучшей цены
              </h2>

              {/* Subheading */}
              <p style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: '#6b6157',
                margin: '14px 0 0',
              }}>
                Закажите прямо сейчас — рассчитаем финальную стоимость без переплат и промежуточных комиссий.
              </p>

              {/* Features */}
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#b8762e', fontWeight: 700, fontSize: 18, lineHeight: 1, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#3a352e' }}>Без скрытых комиссий</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#b8762e', fontWeight: 700, fontSize: 18, lineHeight: 1, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#3a352e' }}>Подтвердим за 15 минут</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#b8762e', fontWeight: 700, fontSize: 18, lineHeight: 1, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#3a352e' }}>Отмена бесплатно за 7 дней</span>
                </div>
              </div>
            </div>

            {/* Scarcity indicator */}
            <div style={{
              background: 'rgba(184,118,46,0.08)',
              border: '1px solid rgba(184,118,46,0.25)',
              borderRadius: 6,
              padding: '12px 14px',
              margin: '18px 0 0',
              fontSize: 13,
              color: '#6b6157',
              lineHeight: 1.5,
            }}>
              <span style={{ fontWeight: 700, color: '#b8762e' }}>Свободных дат всё меньше:</span> популярные выходные бронируют заранее
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button
                type="button"
                onClick={handleBooking}
                style={{
                  flex: 1,
                  background: '#b8762e',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 15,
                  fontWeight: 700,
                  padding: '14px 20px',
                  borderRadius: 999,
                  boxShadow: '0 8px 20px rgba(184,118,46,0.32)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 12px 28px rgba(184,118,46,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 8px 20px rgba(184,118,46,0.32)'
                }}
              >
                Забронировать сейчас
              </button>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  background: 'rgba(43,38,32,0.08)',
                  color: '#2b2620',
                  border: '1px solid rgba(43,38,32,0.15)',
                  cursor: 'pointer',
                  fontSize: 15,
                  fontWeight: 600,
                  padding: '14px 20px',
                  borderRadius: 999,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(43,38,32,0.12)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(43,38,32,0.08)'
                }}
              >
                Позже
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TimedPromoPopup
