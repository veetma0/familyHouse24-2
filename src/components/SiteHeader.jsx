import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { navigationItems } from '../data/siteData'
import { useStickyHeader } from '../hooks/useStickyHeader'

function SiteHeader({ compact = false, onBook }) {
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
    compact ? 'site-header-bar-compact' : '',
    isHidden ? 'is-hidden' : '',
    pinned || compact ? 'is-pinned' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={barClass}>
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
          className={`burger${isOpen ? ' is-open' : ''}`}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <button
          type="button"
          className={`nav-backdrop${isOpen ? ' open' : ''}`}
          aria-hidden="true"
          tabIndex={-1}
          onClick={closeMenu}
        />

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
    </div>
  )
}

export default SiteHeader
