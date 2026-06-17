import { banyaItem, houseItems } from '../data/siteData'

function HousesSection({ onBook }) {
  const items = [...houseItems, banyaItem]

  return (
    <section id="houses" className="section container">
      <p className="kicker">Котеджи</p>
      <h2>Полноценное размещение после выезда</h2>
      <div className="houses-grid">
        {items.map((house) => (
          <article className="house-card" key={house.title}>
            <div className="house-image" style={{ backgroundImage: `url(${house.image})` }} />
            <div className="house-body">
              <h3>{house.title}</h3>
              <p className="house-meta">
                {house.meta} · {house.size}
              </p>
              <p>{house.description}</p>
              {house.details?.length ? (
                <ul className="plain-list plain-list-compact">
                  {house.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ) : null}
              <p className="house-price">{house.priceFrom}</p>
              {house.footnote ? <p>{house.footnote}</p> : null}
              <button type="button" className="button button-primary" onClick={onBook}>
                Забронировать
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HousesSection
