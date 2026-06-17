import { comfortItems, serviceExperienceItems } from '../data/siteData'

function ServicesSection() {
  return (
    <section id="services" className="section section-soft">
      <div className="container">
        <p className="kicker">Комфорт на базе</p>
        <h2>После рыбалки — сервис и отдых в одном месте</h2>
        <p className="section-intro">
          Сначала базовый комфорт, затем дополнительные услуги и развлечения на территории.
        </p>

        <h3 className="services-subtitle">Базовый комфорт</h3>
        <div className="comfort-grid">
          {comfortItems.map((service) => (
            <article className="comfort-card" key={service.title}>
              <span className="comfort-icon" aria-hidden="true">
                {service.icon}
              </span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>

        <h3 className="services-subtitle">Услуги и развлечения</h3>
        <div className="amenities-grid">
          {serviceExperienceItems.map((service) => (
            <article className="amenity-card" key={service.title}>
              <span className="amenity-icon" aria-hidden="true">
                {service.icon}
              </span>
              <h4>{service.title}</h4>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
