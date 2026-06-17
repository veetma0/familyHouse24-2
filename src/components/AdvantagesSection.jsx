import { advantageCards } from '../data/siteData'

function AdvantagesSection() {
  return (
    <section className="section section-soft">
      <div className="container">
        <p className="kicker">Преимущества локации</p>
        <h2>Почему гости выбирают Family House</h2>
        <p className="section-intro">
          Всё, что важно для поездки на рыбалку: вода рядом, рабочая акватория и удобная
          инфраструктура на территории.
        </p>
        <div className="services-grid">
          {advantageCards.map((item) => (
            <article className="service-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdvantagesSection
