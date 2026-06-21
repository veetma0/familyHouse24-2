import { Link } from 'react-router-dom'
import { navigationItems, contactInfo } from '../data/siteData'

function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-cols">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-badge" aria-hidden="true">
                F
              </span>
              <span className="footer-logo-name">Family House</span>
            </Link>
            <p>
              Рыболовная база отдыха на Рыбинском водохранилище. Дома у воды, своя
              техника и снасти, баня и егерь — летняя и зимняя рыбалка круглый год.
            </p>
          </div>

          <div>
            <div className="footer-col-label">Навигация</div>
            <ul className="footer-links">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/booking">Бронирование</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-col-label">Контакты</div>
            <ul className="footer-links">
              <li>
                <a href={contactInfo.phoneHref}>{contactInfo.phone}</a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/familyhouse_baza?igshid=hbnt1uo470"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>{contactInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Family House · Рыболовная база</span>
          <span>Все права защищены</span>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
