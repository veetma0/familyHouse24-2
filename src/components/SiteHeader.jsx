import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { navigationItems, contactInfo } from '../data/siteData'
import { useStickyHeader } from '../hooks/useStickyHeader'

function SiteHeader({ onBook }) {
  const [isOpen, setIsOpen] = useState(false)
  const { hidden, pinned } = useStickyHeader()

  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  const handleBook = () => {
    closeMenu()
    if (onBook) onBook()
  }

  // Прячем шапку только при закрытом меню.
  const isHidden = hidden && !isOpen

  const barClass = [
    'site-header-bar',
    isHidden ? 'is-hidden' : '',
    pinned ? 'is-pinned' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const navLinkClass = ({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`

  const bookButton = onBook ? (
    <button type="button" className="header-book-btn" onClick={handleBook}>
      Забронировать
    </button>
  ) : (
    <Link to="/booking" className="header-book-btn" onClick={closeMenu}>
      Забронировать
    </Link>
  )

  return (
    <>
      <div className={barClass}>
        <div className="container header-inner">
          <Link to="/" className="brand" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">
              F
            </span>
            <span className="brand-text">
              <span className="brand-name">Family House</span>
              <span className="brand-sub">Рыбинское вдхр.</span>
            </span>
          </Link>

          <nav className="top-nav" aria-label="Главная навигация">
            {navigationItems.map((item) => (
              <NavLink key={item.id} to={item.path} end={item.path === '/'} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <a href={contactInfo.phoneHref} className="header-phone">
              {contactInfo.phone}
            </a>
            {bookButton}
            <button
              type="button"
              className={`burger${isOpen ? ' is-open' : ''}`}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-nav${isOpen ? ' is-open' : ''}`}>
        {navigationItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === '/'}
            className={navLinkClass}
            onClick={closeMenu}
          >
            {item.label}
          </NavLink>
        ))}
        {onBook ? (
          <button type="button" className="button button-primary" onClick={handleBook}>
            Забронировать
          </button>
        ) : (
          <Link to="/booking" className="button button-primary" onClick={closeMenu}>
            Забронировать
          </Link>
        )}
        <a href={contactInfo.phoneHref} className="mobile-nav-phone" onClick={closeMenu}>
          {contactInfo.phone}
        </a>
      </div>
    </>
  )
}

export default SiteHeader
