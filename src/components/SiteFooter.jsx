import { useState } from 'react'

function SiteFooter({ onLead }) {
  const [phone, setPhone] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (onLead) onLead()
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-cols">
          <div className="footer-col footer-col-brand">
            <span className="brand-mark" aria-hidden="true" />
            <strong className="footer-brand">FAMILY HOUSE</strong>
            <p className="footer-about">
              Рыболовная база отдыха на Рыбинском водохранилище и реке Сить.
              Летняя и зимняя рыбалка, техника, снасти и комфортные котеджи —
              круглый год.
            </p>
          </div>

          <div className="footer-col">
            <h4>Разделы</h4>
            <a href="#fishing">Рыбалка</a>
            <a href="#houses">Размещение</a>
            <a href="#services">Услуги</a>
            <a href="#pricing">Цены</a>
            <a href="#contacts">Контакты</a>
          </div>

          <div className="footer-col">
            <h4>Контакты</h4>
            <a href="tel:+74951510082" className="footer-phone">
              +7 (495) 151-00-82
            </a>
            <a href="mailto:Familyhouse.baza@gmail.com">Familyhouse.baza@gmail.com</a>
            <p className="footer-address">
              Ярославская область,
              <br />
              Рыбинское водохранилище, река Сить
            </p>
            <a
              href="https://www.instagram.com/familyhouse_baza?igshid=hbnt1uo470"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
            >
              Instagram
            </a>
          </div>

          <div className="footer-col footer-col-cta">
            <h4>Есть вопросы?</h4>
            <p>Оставьте телефон — перезвоним и подберём даты.</p>
            <form className="footer-form" onSubmit={handleSubmit}>
              <input
                type="tel"
                placeholder="Ваш телефон"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                aria-label="Ваш телефон"
              />
              <button type="submit" className="footer-form-button" aria-label="Отправить">
                →
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Family House · Рыболовная база</span>
          <span className="footer-legal">Все права защищены</span>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
