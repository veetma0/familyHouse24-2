import { bookingPolicies } from '../data/siteData'

function BookingPoliciesSection() {
  return (
    <section className="section section-soft">
      <div className="container">
        <p className="kicker">Правила бронирования</p>
        <h2>Коротко о важных условиях</h2>
        <div className="faq-grid">
          {bookingPolicies.map((item) => (
            <article className="faq-item" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BookingPoliciesSection
