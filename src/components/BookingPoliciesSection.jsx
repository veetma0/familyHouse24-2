import { bookingPolicies } from '../data/siteData'

function BookingPoliciesSection() {
  return (
    <section className="section section-soft">
      <div className="container">
        <p className="kicker">Правила бронирования</p>
        <h2>Коротко о важных условиях</h2>
        <div className="policies-grid">
          {bookingPolicies.map((item) => (
            <article className="policy-card" key={item.title}>
              <span className="policy-icon" aria-hidden="true">
                {item.icon}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BookingPoliciesSection
