import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import BnovoBookingModule from '../components/BnovoBookingModule'

function BookingPage() {
  return (
    <main>
      <section className="booking-page">
        <SiteHeader compact />
        <div className="container booking-intro">
          <p className="kicker">Онлайн-бронирование</p>
          <h1>Выберите даты рыбалки и котедж в модуле Bnovo</h1>
          <p>
            Прямое бронирование без посредников для летнего и зимнего сезона. Если нужна помощь,
            свяжитесь с нами по телефону +7 (495) 151-00-82.
          </p>
          <Link to="/" className="button button-soft">
            Вернуться на главную
          </Link>
        </div>
        <div className="container">
          <BnovoBookingModule />
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}

export default BookingPage
