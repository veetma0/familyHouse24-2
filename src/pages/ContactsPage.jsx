import { useEffect, useState } from 'react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import InquiryForm from '../components/InquiryForm'
import BnovoOverlay from '../components/BnovoOverlay'
import { contactInfo } from '../data/siteData'
import { useScrollReveal } from '../hooks/useScrollReveal'

const mapSrc =
  'https://yandex.ru/map-widget/v1/?text=FamilyHouse%2C%20%D0%AF%D1%80%D0%BE%D1%81%D0%BB%D0%B0%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB.%2C%20%D0%91%D1%80%D0%B5%D0%B9%D1%82%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%20%D1%80-%D0%BD%2C%20%D0%B4.%20%D0%9D%D0%B0%D0%B1%D0%B5%D1%80%D0%B5%D0%B6%D0%BD%D0%B0%D1%8F&z=12'

function ContactsPage() {
  const [isBookingOpen, setBookingOpen] = useState(false)

  useScrollReveal()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const openBooking = () => setBookingOpen(true)
  const closeBooking = () => setBookingOpen(false)

  return (
    <div className="page">
      <SiteHeader onBook={openBooking} />

      <main className="page-main">
        <header className="page-hero">
          <div className="container page-hero-content">
            <p className="kicker">Связаться с нами</p>
            <h1>Контакты и поддержка</h1>
            <p>
              Оставьте заявку или позвоните — подберём даты, технику и дом под вашу компанию.
              Перезвоним в течение 15 минут.
            </p>
          </div>
        </header>

        <section className="section section-light">
          <div className="container">
            <div className="contacts-layout">
              <div className="contact-form-wrap">
                <h3>Оставить заявку</h3>
                <p>Заполните форму — и мы свяжемся с вами по удобному каналу.</p>
                <InquiryForm onBookNow={openBooking} />
              </div>

              <div>
                <div className="contact-info-box">
                  <h3>Прямые контакты</h3>
                  <ul className="contact-info-list">
                    <li>
                      <span className="contact-info-label">Телефон</span>
                      <a className="contact-info-value" href={contactInfo.phoneHref}>
                        {contactInfo.phone}
                      </a>
                    </li>
                    <li>
                      <span className="contact-info-label">Email</span>
                      <a className="contact-info-value" href={`mailto:${contactInfo.email}`}>
                        {contactInfo.email}
                      </a>
                    </li>
                    <li>
                      <span className="contact-info-label">Адрес</span>
                      <span className="contact-info-value">{contactInfo.address}</span>
                    </li>
                    <li>
                      <span className="contact-info-label">Часы работы</span>
                      <span className="contact-info-value">{contactInfo.hours}</span>
                    </li>
                  </ul>
                  <div className="contact-map">
                    <iframe
                      title="Карта Family House"
                      src={mapSrc}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BnovoOverlay isOpen={isBookingOpen} onClose={closeBooking} dates={{}} />
    </div>
  )
}

export default ContactsPage
