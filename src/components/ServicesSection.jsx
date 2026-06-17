import { comfortItems, serviceExperienceItems } from '../data/siteData'

function ServicesSection() {
  return (
    <section id="services" className="section section-soft">
      <div className="container">
        <p className="kicker">Комфорт на базе</p>
        <h2>После рыбалки - сервис и отдых в одном месте</h2>
        <p className="section-intro">
          Сначала разберем базовый комфорт, затем дополнительные услуги и развлечения на территории.
        </p>
        <h3 className="services-subtitle">Базовый комфорт</h3>
        <div className="services-grid">
          {comfortItems.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>

        <h3 className="services-subtitle">Услуги и развлечения</h3>
        <div className="services-grid">
          {serviceExperienceItems.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
