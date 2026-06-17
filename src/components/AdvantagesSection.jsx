import { advantageCards } from '../data/siteData'

function AdvantagesSection() {
  return (
    <section className="section section-soft">
      <div className="container">
        <p className="kicker">Преимущества локации</p>
        <h2>Почему гости выбирают Family House</h2>
        <p className="section-intro">
          Всё, что важно для рыбалки: вода рядом, рабочая акватория и удобная инфраструктура
          на территории.
        </p>
        <div className="advantages-grid">
          {advantageCards.map((item) => (
            <article className="advantage-card" key={item.title}>
              <span className="advantage-icon" aria-hidden="true">
                {item.icon}
              </span>
              <div className="advantage-body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              {item.stat && (
                <div className="advantage-stat">
                  <span className="advantage-stat-value">{item.stat}</span>
                  <span className="advantage-stat-label">{item.statLabel}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdvantagesSection
