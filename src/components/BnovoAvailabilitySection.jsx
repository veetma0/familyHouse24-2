import BnovoBookingLauncher from './BnovoBookingLauncher'
import { bookingPolicies } from '../data/siteData'

function BnovoAvailabilitySection({ onBook }) {
  return (
    <section id="booking" className="section section-soft bnovo-availability-section">
      <div className="container">
        <p className="kicker">Бронирование</p>
        <h2>Просмотреть наличие</h2>
        <p className="section-lead">
          Выберите даты заезда и выезда — модуль покажет свободные номера и коттеджи с актуальными
          ценами.
        </p>
        <BnovoBookingLauncher onOpen={onBook} submitText="Просмотреть наличие" variant="light" />
        <ul className="booking-notes plain-list">
          {bookingPolicies.slice(0, 3).map((item) => (
            <li key={item.title}>{item.text}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default BnovoAvailabilitySection
