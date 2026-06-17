import { Link } from 'react-router-dom'
import { useState } from 'react'
import { navigationItems } from '../data/siteData'

function SiteHeader({ compact = false, onBook }) {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)
  const handleBook = () => {
    closeMenu()
    if (onBook) onBook()
  }

  return (
    <header className={`site-header${compact ? ' site-header-compact' : ''}`}>
      <Link to="/" className="brand" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true" />
        <span>
          <strong>FAMILY HOUSE</strong>
          <small>Рыболовная база · Ярославская область</small>
        </span>
      </Link>

      <button
        type="button"
        className="burger"
        aria-expanded={isOpen}
        aria-label="Открыть меню"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`top-nav${isOpen ? ' open' : ''}`} aria-label="Главная навигация">
        {!compact &&
          navigationItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        <a href="tel:+74951510082" className="header-phone" onClick={closeMenu}>
          +7 (495) 151-00-82
        </a>
        {onBook ? (
          <button type="button" className="button button-primary" onClick={handleBook}>
            Забронировать
          </button>
        ) : (
          <Link to="/booking" className="button button-primary" onClick={closeMenu}>
            Забронировать
          </Link>
        )}
      </nav>
    </header>
  )
}

export default SiteHeader
