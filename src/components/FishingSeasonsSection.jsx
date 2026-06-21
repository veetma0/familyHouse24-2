import { fishingSeasons } from '../data/siteData'

function FishingSeasonsSection() {
  return (
    <section className="section section-dark">
      <div className="container">
        <div className="section-head">
          <p className="kicker">Рыбалка круглый год</p>
          <h2>Летний и зимний сезоны</h2>
          <p>
            Выходим на воду и на лёд — со своей техникой, снастями и сопровождением егеря. После
            выезда ждут баня и тёплый дом.
          </p>
        </div>

        <div className="seasons-grid">
          {fishingSeasons.map((season) => (
            <article
              className={`season-card season-card--${season.id === 'winter' ? 'winter' : 'summer'}`}
              key={season.id}
            >
              <h3>{season.title}</h3>
              <div className="season-tagline">
                {season.icon} {season.tabLabel}
              </div>
              <p>{season.description}</p>
              <ul className="season-list">
                {season.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FishingSeasonsSection
