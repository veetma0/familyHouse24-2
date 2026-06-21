import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { navigationItems } from '../data/siteData'
import { getBnovoIframeUrl, hasBnovoUid } from '../utils/bnovo'
import { ShellContext } from './shellContext'

/* ---------------- Тосты ---------------- */
function Toasts({ toasts, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: 340,
        maxWidth: 'calc(100vw - 32px)',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            pointerEvents: 'auto',
            background: '#fff',
            borderRadius: 10,
            borderLeft: `4px solid ${t.accent}`,
            boxShadow: '0 12px 34px rgba(28,24,20,0.18)',
            padding: '16px 18px',
            display: 'flex',
            gap: 14,
            alignItems: 'flex-start',
            animation: 'fh-toast-in 0.35s cubic-bezier(.2,.8,.2,1) both',
          }}
        >
          <span
            style={{
              flex: 'none',
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: t.accent,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            {t.icon}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#2b2620' }}>{t.title}</div>
            <div style={{ fontSize: 13.5, color: '#6b6157', marginTop: 3, lineHeight: 1.5 }}>{t.msg}</div>
          </div>
          <button
            type="button"
            onClick={() => onClose(t.id)}
            className="fh-close"
            style={{
              flex: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
              color: '#b3a99a',
              padding: 2,
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  background: '#fff',
  border: '1px solid rgba(43,38,32,0.16)',
  borderRadius: 8,
  padding: '13px 16px',
  fontSize: 15,
  color: '#2b2620',
  outline: 'none',
}
const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#4a4339',
  marginBottom: 8,
}
const errStyle = { display: 'block', fontSize: 13, color: '#a14334', marginTop: 6 }

/* ---------------- Модалка брони ---------------- */
function BookingModal({ cottage, onClose, addToast }) {
  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const checkInRef = useRef(null)
  const checkOutRef = useRef(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const digits = (v) => (v || '').replace(/\D/g, '')

  const onSubmit = (e) => {
    e.preventDefault()
    const name = (nameRef.current?.value || '').trim()
    const phone = (phoneRef.current?.value || '').trim()
    const errs = {}
    if (!name) errs.name = true
    if (digits(phone).length < 10) errs.phone = true
    if (Object.keys(errs).length) {
      setErrors(errs)
      addToast('error', 'Проверьте форму', 'Укажите имя и корректный телефон.')
      return
    }
    setErrors({})
    onClose()
    addToast('success', 'Заявка принята', 'Открываем онлайн-бронирование для подтверждения дат.')

    // Дальше — реальная бронь через Bnovo
    const checkIn = checkInRef.current?.value || ''
    const checkOut = checkOutRef.current?.value || ''
    if (hasBnovoUid()) {
      const url = getBnovoIframeUrl({ checkIn, checkOut })
      window.setTimeout(() => {
        window.open(url, '_blank', 'noopener')
      }, 600)
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(28,24,20,0.6)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        animation: 'fh-overlay-in 0.25s ease both',
      }}
    >
      <div
        className="fh-modal-inner"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#f6efe1',
          borderRadius: 12,
          width: '100%',
          maxWidth: 540,
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
          animation: 'fh-modal-in 0.3s cubic-bezier(.2,.8,.2,1) both',
        }}
      >
        <div
          style={{
            padding: '32px 36px 0',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <span
              style={{
                fontSize: 12,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#b8762e',
                fontWeight: 600,
              }}
            >
              Заявка на бронирование
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 500,
                fontSize: 28,
                color: '#2b2620',
                margin: '10px 0 0',
              }}
            >
              Забронировать дом
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="fh-close"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 26,
              lineHeight: 1,
              color: '#9a8c74',
              padding: 4,
            }}
          >
            ×
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          style={{ padding: '24px 36px 36px', display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <div>
            <label style={labelStyle}>Имя</label>
            <input ref={nameRef} type="text" placeholder="Ваше имя" className="fh-input" style={inputStyle} />
            {errors.name && <span style={errStyle}>Укажите имя</span>}
          </div>
          <div>
            <label style={labelStyle}>Телефон</label>
            <input ref={phoneRef} type="tel" placeholder="+7 ___ ___ __ __" className="fh-input" style={inputStyle} />
            {errors.phone && <span style={errStyle}>Введите корректный телефон</span>}
          </div>
          <div className="fh-form-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={labelStyle}>Заезд</label>
              <input ref={checkInRef} type="date" className="fh-input" style={{ ...inputStyle, padding: '12px 14px' }} />
            </div>
            <div>
              <label style={labelStyle}>Выезд</label>
              <input ref={checkOutRef} type="date" className="fh-input" style={{ ...inputStyle, padding: '12px 14px' }} />
            </div>
          </div>
          <div className="fh-form-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={labelStyle}>Гостей</label>
              <select className="fh-input" style={{ ...inputStyle, padding: '13px 14px' }}>
                <option>1 гость</option>
                <option>2 гостя</option>
                <option>3 гостя</option>
                <option>4 гостя</option>
                <option>5 гостей</option>
                <option>6 гостей</option>
                <option>7 гостей</option>
                <option>8+ гостей</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Дом</label>
              <select defaultValue={cottage || ''} className="fh-input" style={{ ...inputStyle, padding: '13px 14px' }}>
                <option value="">Выбрать позже</option>
                <option value="Дом «Рыбацкий»">Дом «Рыбацкий»</option>
                <option value="Дом «Карелия»">Дом «Карелия»</option>
                <option value="Дом «Семейный»">Дом «Семейный»</option>
                <option value="Шале «Тихая бухта»">Шале «Тихая бухта»</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="fh-btn-primary"
            style={{
              background: '#b8762e',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 600,
              padding: 15,
              borderRadius: 999,
              marginTop: 6,
              boxShadow: '0 8px 22px rgba(184,118,46,0.3)',
            }}
          >
            Отправить заявку
          </button>
          <p style={{ fontSize: 12.5, color: '#9a8c74', textAlign: 'center', margin: '2px 0 0', lineHeight: 1.5 }}>
            Нажимая кнопку, вы соглашаетесь на обработку данных. Это заявка, а не оплата — менеджер свяжется для
            подтверждения.
          </p>
        </form>
      </div>
    </div>
  )
}

/* ---------------- Header ---------------- */
function Header({ activeId, onNav, onBook, onBurger, mobileOpen }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(243,237,224,0.86)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(43,38,32,0.1)',
      }}
    >
      <div
        className="fh-section-pad"
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <button
          type="button"
          onClick={() => onNav('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            textAlign: 'left',
          }}
        >
          <span
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#2b2620',
              color: '#e7ddc8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Playfair Display', serif",
              fontSize: 18,
              flex: 'none',
            }}
          >
            F
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#2b2620', letterSpacing: '0.01em' }}>
              Family House
            </span>
            <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9a8c74' }}>
              рыболовная база · рыбинка
            </span>
          </span>
        </button>

        <nav className="fh-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNav(item.path)}
              className="fh-nav-link"
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 500,
                color: activeId === item.id ? '#2b2620' : '#4a4339',
                padding: '8px 14px',
              }}
            >
              {item.label}
              {activeId === item.id && (
                <span
                  style={{
                    position: 'absolute',
                    left: 14,
                    right: 14,
                    bottom: 2,
                    height: 2,
                    background: '#b8762e',
                    borderRadius: 2,
                  }}
                />
              )}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <a
            href="tel:+74951510082"
            className="fh-header-phone"
            style={{ fontSize: 15, fontWeight: 600, color: '#2b2620', textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            +7 (495) 151-00-82
          </a>
          <button
            type="button"
            onClick={() => onBook('')}
            className="fh-btn-primary fh-header-book"
            style={{
              background: '#b8762e',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              padding: '11px 22px',
              borderRadius: 999,
              boxShadow: '0 6px 18px rgba(184,118,46,0.28)',
            }}
          >
            Забронировать
          </button>
          <button
            type="button"
            onClick={onBurger}
            className={`fh-burger${mobileOpen ? ' is-open' : ''}`}
            aria-label="Меню"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

/* ---------------- Footer ---------------- */
function Footer({ onNav }) {
  const colLabel = {
    fontSize: 12,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#6f655a',
    marginBottom: 16,
  }
  const linkBtn = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    fontSize: 15,
    color: '#cabfae',
    textAlign: 'left',
  }
  return (
    <footer style={{ background: '#1c1814', padding: '64px 32px 40px' }} className="fh-section-pad">
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div
          className="fh-grid-3"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr',
            gap: 40,
            paddingBottom: 40,
            borderBottom: '1px solid rgba(231,221,200,0.12)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: '#b8762e',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18,
                }}
              >
                F
              </span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#f6efe1' }}>Family House</span>
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: '#8c8071', margin: '18px 0 0', maxWidth: 320 }}>
              Премиальная рыболовная база на Рыбинском водохранилище. Тишина, вода и настоящая рыбалка — круглый год.
            </p>
          </div>
          <div>
            <div style={colLabel}>Навигация</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              {navigationItems.map((item) => (
                <button key={item.id} type="button" onClick={() => onNav(item.path)} className="fh-link-underline" style={linkBtn}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={colLabel}>Контакты</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="tel:+74951510082" style={{ fontSize: 15, color: '#f6efe1', textDecoration: 'none', fontWeight: 600 }}>
                +7 (495) 151-00-82
              </a>
              <a href="mailto:Familyhouse.baza@gmail.com" style={{ fontSize: 14, color: '#cabfae', textDecoration: 'none' }}>
                Familyhouse.baza@gmail.com
              </a>
              <span style={{ fontSize: 14, color: '#8c8071' }}>Ярославская обл., д. Набережная</span>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 28, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#6f655a' }}>© 2026 Family House. Все права защищены.</span>
          <span style={{ fontSize: 13, color: '#6f655a' }}>Family House · рыболовная база на Рыбинке</span>
        </div>
      </div>
    </footer>
  )
}

/* ---------------- Shell ---------------- */
function SiteShell({ activeId, children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [booking, setBooking] = useState({ open: false, cottage: '' })
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  const onNav = useCallback(
    (path) => {
      setMobileOpen(false)
      navigate(path)
    },
    [navigate],
  )

  const dismissToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (type, title, msg) => {
      counter.current += 1
      const id = counter.current
      const accent = type === 'success' ? '#4e7c59' : type === 'error' ? '#a14334' : '#b8762e'
      const icon = type === 'success' ? '✓' : type === 'error' ? '!' : 'i'
      setToasts((list) => [...list, { id, accent, icon, title, msg }])
      window.setTimeout(() => dismissToast(id), 5000)
    },
    [dismissToast],
  )

  const openBooking = useCallback((cottage) => {
    setMobileOpen(false)
    setBooking({ open: true, cottage: cottage || '' })
  }, [])

  const closeBooking = useCallback(() => setBooking((b) => ({ ...b, open: false })), [])

  return (
    <ShellContext.Provider value={{ openBooking, addToast, onNav: navigate }}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f3ede0', overflowX: 'hidden' }}>
        <Header
          activeId={activeId}
          onNav={onNav}
          onBook={openBooking}
          mobileOpen={mobileOpen}
          onBurger={() => setMobileOpen((v) => !v)}
        />

        <main style={{ flex: 1 }}>{children}</main>

        <Footer onNav={onNav} />
      </div>

      {/* Мобильное меню */}
      <div className={`fh-mobile-nav${mobileOpen ? ' is-open' : ''}`}>
        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNav(item.path)}
            className={`fh-mobile-link${activeId === item.id ? ' is-active' : ''}`}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => openBooking('')}
          className="fh-btn-primary"
          style={{
            marginTop: 28,
            background: '#b8762e',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 600,
            padding: '15px 24px',
            borderRadius: 999,
          }}
        >
          Забронировать
        </button>
        <a
          href="tel:+74951510082"
          onClick={() => setMobileOpen(false)}
          style={{ marginTop: 18, fontSize: 19, fontWeight: 600, color: '#d8b483', textDecoration: 'none', textAlign: 'center' }}
        >
          +7 (495) 151-00-82
        </a>
      </div>

      {booking.open && (
        <BookingModal cottage={booking.cottage} onClose={closeBooking} addToast={addToast} />
      )}
      <Toasts toasts={toasts} onClose={dismissToast} />
    </ShellContext.Provider>
  )
}

export default SiteShell
