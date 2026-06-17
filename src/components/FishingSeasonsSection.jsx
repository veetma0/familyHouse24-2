import { useState } from 'react'
import { fishingSeasons, tripFormats } from '../data/siteData'

function FishingSeasonsSection({ onBook }) {
  const [activeSeason, setActiveSeason] = useState(fishingSeasons[0].id)
  const season = fishingSeasons.find((item) => item.id === activeSeason) || fishingSeasons[0]

  return (
    <section id="fishing" className="section section-soft">
      <div className="container">
        <p className="kicker">Рыбалка круглый год</p>
        <h2>Летний и зимний сценарии в одном месте</h2>
        <p className="section-intro">
          Выбирайте сезон и формат поездки: от спокойного семейного выезда до активной рыбалки
          компанией.
        </p>

        <div className="season-tabs" role="tablist" aria-label="Сезон рыбалки">
          {fishingSeasons.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`season-tab${activeSeason === item.id ? ' active' : ''}`}
              aria-selected={activeSeason === item.id}
              onClick={() => setActiveSeason(item.id)}
            >
              {item.tabLabel}
            </button>
          ))}
        </div>

        <article className="season-card" role="tabpanel" aria-label={season.tabLabel}>
          <h3>{season.title}</h3>
          <p>{season.description}</p>
          <ul>
            {season.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <button type="button" className="button button-primary" onClick={onBook}>
            {season.cta}
          </button>
        </article>

        <h3 className="services-subtitle">Форматы поездки</h3>
        <div className="formats-grid">
          {tripFormats.map((format) => (
            <article className="format-card" key={format.title}>
              <h3>{format.title}</h3>
              <ul>
                {format.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <button type="button" className="button button-link" onClick={onBook}>
                {format.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FishingSeasonsSection
