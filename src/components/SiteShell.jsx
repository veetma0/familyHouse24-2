import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { navigationItems, contact, legal, siteLogos } from '../data/siteData'
import { dateOffset } from '../utils/dates'
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

const brandTitleStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 22,
  letterSpacing: '0.03em',
  lineHeight: 1.05,
}

function BrandMark({ color = '#2b2620', fishHeight = 42 }) {
  return (
    <>
      <img
        src={siteLogos.icon}
        alt=""
        aria-hidden="true"
        style={{ height: fishHeight, width: 'auto', display: 'block', flex: 'none' }}
      />
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color }}>
        <span style={brandTitleStyle}>Семейный</span>
        <span style={brandTitleStyle}>дом</span>
      </span>
    </>
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
        className="fh-section-pad fh-header-bar"
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '16px 32px 16px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <button
          type="button"
          onClick={() => onNav('/')}
          aria-label="Семейный дом — на главную"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            margin: 0,
            textAlign: 'left',
            flex: 'none',
          }}
        >
          <BrandMark />
        </button>

        <nav className="fh-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 40 }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <BrandMark color="#f6efe1" />
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: '#8c8071', margin: '18px 0 0', maxWidth: 320 }}>
              Эко-отель на реке Сить, в 10 км от Рыбинского водохранилища. Дома и баня, домашняя кухня и настоящая рыбалка — круглый год.
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
              <a
                href={`https://instagram.com/${contact.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fh-link-underline"
                style={{ fontSize: 14, color: '#cabfae', textDecoration: 'none' }}
              >
                Instagram · @{contact.instagram}
              </a>
              <span style={{ fontSize: 14, color: '#8c8071' }}>{contact.address}</span>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 28, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#6f655a' }}>© 2026 Family House. Все права защищены.</span>
          <span style={{ fontSize: 13, color: '#6f655a' }}>
            {legal.company} · ИНН {legal.inn} · ОГРН {legal.ogrn}
          </span>
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

  // Все кнопки «Забронировать» ведут на встроенную страницу /booking
  // (модуль Bnovo внутри сайта) с дефолтными датами — без модалки-заявки
  // и без ухода на внешнюю вкладку. Дом гость выбирает в самом модуле.
  const openBooking = useCallback(() => {
    setMobileOpen(false)
    const search = new URLSearchParams({
      checkIn: dateOffset(2),
      checkOut: dateOffset(3),
      adults: '2',
    })
    navigate(`/booking?${search.toString()}`)
  }, [navigate])

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

      <Toasts toasts={toasts} onClose={dismissToast} />
    </ShellContext.Provider>
  )
}

export default SiteShell
