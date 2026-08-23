import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { navItems, footerExtraItems, contact, siteLogos } from '../data/siteData'
import { legal } from '../data/legal'
import CookieConsent from './CookieConsent'
import { COOKIE_SETTINGS_EVENT } from './cookieEvents'
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

/* ---------------- Логотип ---------------- */
function BrandMark({ light = false }) {
  return (
    <>
      <img
        src={siteLogos.icon}
        alt="Семейный дом"
        style={{ height: 44, width: 'auto', display: 'block', flex: 'none' }}
        className="fh-brand-logo"
      />
      <span className="fh-oswald" style={{ display: 'flex', flexDirection: 'column', gap: 4, lineHeight: 1.05, textAlign: 'left' }}>
        <span className="fh-brand-name" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '0.06em', color: light ? '#f6efe1' : '#2b2620' }}>
          СЕМЕЙНЫЙ ДОМ
        </span>
        <span className="fh-brand-sub" style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: '0.28em', color: '#b8762e' }}>
          FAMILY HOUSE
        </span>
      </span>
    </>
  )
}

/* ---------------- Header ---------------- */
function Header({ activeId, onNav, onBook, onBurger, mobileOpen, hidden, scrolled }) {
  return (
    <>
      <header
        className={`fh-header${hidden ? ' is-hidden' : ''}${scrolled ? ' is-scrolled' : ''}`}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(243,237,224,0.92)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(43,38,32,0.1)',
        }}
      >
        <div
          className="fh-section-pad"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '12px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <button
            type="button"
            onClick={() => onNav('/')}
            aria-label="Семейный дом — на главную"
            style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', padding: 0, flex: 'none' }}
          >
            <BrandMark />
          </button>

          <nav className="fh-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNav(item.path)}
                className={`fh-oswald fh-navlink${activeId === item.id ? ' is-active' : ''}`}
                style={{
                  position: 'relative',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: activeId === item.id ? '#2b2620' : '#4a4339',
                  padding: '9px 13px',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              type="button"
              onClick={onBook}
              className="fh-oswald fh-btn-primary fh-header-book"
              style={{
                background: '#b8762e',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                padding: '12px 22px',
                borderRadius: 2,
                boxShadow: '0 6px 18px rgba(184,118,46,0.32)',
                whiteSpace: 'nowrap',
              }}
            >
              Забронировать
            </button>
            <button
              type="button"
              onClick={onBurger}
              className={`fh-burger${mobileOpen ? ' is-open' : ''}`}
              aria-label="Меню"
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

/* ---------------- Footer ---------------- */
function Footer({ onNav }) {
  const colLabel = {
    fontFamily: "'Oswald', sans-serif",
    fontSize: 12,
    letterSpacing: '0.2em',
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
  const allNav = [...navItems, ...footerExtraItems]
  return (
    <footer className="fh-footer fh-section-pad">
      <div className="fh-footer__inner">
        <div className="fh-footer-grid">
          <div>
            <div className="fh-footer-brand">
              <img src={siteLogos.icon} alt="" className="fh-footer-brand__logo" />
              <span className="fh-oswald fh-footer-brand__name">
                СЕМЕЙНЫЙ ДОМ
              </span>
            </div>
            <p className="fh-footer-about">
              Эко-отель на реке Сить, в 10 км от Рыбинского водохранилища. Дома и баня, домашняя кухня и настоящая рыбалка — круглый год.
            </p>
          </div>
          <div className="fh-footer-col">
            <div style={colLabel}>Навигация</div>
            <div className="fh-footer-links">
              {allNav.map((item) => (
                <button key={item.id} type="button" onClick={() => onNav(item.path)} className="fh-link-underline" style={linkBtn}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="fh-footer-col">
            <div style={colLabel}>Контакты</div>
            <div className="fh-footer-contacts">
              <a href="tel:+79159956687" style={{ fontSize: 16, color: '#f6efe1', textDecoration: 'none', fontWeight: 700 }}>
                +7 (915) 995-66-87
              </a>
              <a href="mailto:familyhouse.baza@gmail.com" style={{ fontSize: 14, color: '#cabfae', textDecoration: 'none' }}>
                familyhouse.baza@gmail.com
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
              <span style={{ fontSize: 14, color: '#8c8071', lineHeight: 1.5 }}>{contact.addressShort}</span>
            </div>
          </div>
        </div>
        <div className="fh-footer-bottom">
          {/* Документы (ФЗ-152, ПП РФ № 1912) */}
          <nav className="fh-footer-docs" aria-label="Юридические документы">
            {[
              { path: '/privacy', label: 'Политика обработки данных' },
              { path: '/cookies', label: 'Файлы cookie' },
              { path: '/consent', label: 'Согласие на обработку ПД' },
              { path: '/offer', label: 'Публичная оферта' },
              { path: '/terms', label: 'Пользовательское соглашение' },
            ].map((doc) => (
              <button
                key={doc.path}
                type="button"
                onClick={() => onNav(doc.path)}
                className="fh-footer-policy-link fh-oswald"
              >
                {doc.label}
              </button>
            ))}
            {/* Позволяет изменить или отозвать согласие на cookie в любой момент */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
              className="fh-footer-policy-link fh-oswald"
            >
              Настройки cookie
            </button>
          </nav>

          {/* Сведения об исполнителе — требование ПП РФ № 1912 от 27.11.2025 */}
          <div className="fh-footer-legal">
            <span>{legal.companyFull}</span>
            <span>
              ОГРН {legal.ogrn} · ИНН {legal.inn} · КПП {legal.kpp}
            </span>
            <span>{legal.addressLegal}</span>
          </div>

          <span className="fh-footer-copy">
            © 2026 База отдыха «Семейный дом». Все права защищены.
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
  const [headerHidden, setHeaderHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)
  const lastScrollY = useRef(0)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
    lastScrollY.current = 0
    // headerHidden не сбрасываем здесь: у каждой страницы свой SiteShell
    // (свежий стейт при монтировании), а обработчик скролла держит шапку
    // видимой у самого верха страницы.
  }, [location.pathname])

  // Шапка прячется при прокрутке вниз и появляется при прокрутке вверх.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      // У самого верха — всегда показываем шапку.
      if (y < 90) {
        setHeaderHidden(false)
        lastScrollY.current = y
        return
      }
      const delta = y - lastScrollY.current
      // Небольшой порог, чтобы не «дёргалась» на микродвижениях.
      if (Math.abs(delta) < 8) return
      setHeaderHidden(delta > 0)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
  // (модуль Bnovo внутри сайта) с дефолтными датами.
  const openBooking = useCallback(() => {
    setMobileOpen(false)
    const search = new URLSearchParams({
      checkIn: dateOffset(2),
      checkOut: dateOffset(3),
      adults: '2',
    })
    navigate(`/booking?${search.toString()}`)
  }, [navigate])

  const allNav = [...navItems, ...footerExtraItems]

  return (
    <ShellContext.Provider value={{ openBooking, addToast, onNav: navigate }}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f3ede0', overflowX: 'clip' }}>
        <Header
          activeId={activeId}
          onNav={onNav}
          onBook={openBooking}
          mobileOpen={mobileOpen}
          hidden={headerHidden && !mobileOpen}
          scrolled={scrolled}
          onBurger={() => setMobileOpen((v) => !v)}
        />

        <main style={{ flex: 1 }}>{children}</main>

        <Footer onNav={onNav} />
        <CookieConsent />
      </div>

      {/* Мобильное меню */}
      <div className={`fh-mobile-nav${mobileOpen ? ' is-open' : ''}`}>
        {allNav.map((item) => (
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
          onClick={openBooking}
          className="fh-oswald fh-btn-primary"
          style={{
            marginTop: 26,
            background: '#b8762e',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            padding: '15px 24px',
            borderRadius: 3,
          }}
        >
          Забронировать
        </button>
        <a
          href="tel:+79159956687"
          onClick={() => setMobileOpen(false)}
          className="fh-oswald"
          style={{ marginTop: 18, fontSize: 20, fontWeight: 600, color: '#e0b45f', textDecoration: 'none', textAlign: 'center' }}
        >
          +7 (915) 995-66-87
        </a>
      </div>

      <Toasts toasts={toasts} onClose={dismissToast} />
    </ShellContext.Provider>
  )
}

export default SiteShell
