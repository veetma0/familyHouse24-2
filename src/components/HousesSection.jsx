import { Link } from 'react-router-dom'
import { houseItems } from '../data/siteData'

function HouseCard({ house, onBook }) {
  return (
    <article className="house-card">
      <div className="house-media">
        <img src={house.image} alt={house.title} loading="lazy" />
        {house.tag ? <span className="house-tag">{house.tag}</span> : null}
      </div>
      <div className="house-body">
        <h3 className="house-name">{house.title}</h3>
        <div className="house-meta">
          <span>{house.cap}</span>
          <span>{house.beds}</span>
          {house.extra ? <span>{house.extra}</span> : null}
        </div>
        <p className="house-desc">{house.description}</p>
        <div className="house-features">
          {house.features.map((feature) => (
            <span className="house-feature" key={feature}>
              {feature}
            </span>
          ))}
        </div>
        <div className="house-price-row">
          <div className="house-price">
            <span className="house-price-val">{house.price} ₽</span>
            <span className="house-price-unit">за сутки</span>
          </div>
          <button type="button" className="button button-primary" onClick={() => onBook?.()}>
            Забронировать
          </button>
        </div>
      </div>
    </article>
  )
}

function HousesSection({ onBook, variant = 'preview', showHead = true }) {
  const isPreview = variant === 'preview'
  const items = isPreview ? houseItems.slice(0, 3) : houseItems

  const content = (
    <>
      {showHead ? (
        <div className="section-head">
          <p className="kicker">Размещение</p>
          <h2>Дома у воды на любой формат</h2>
          <p>
            От уютного домика для пары до премиум-шале на восемь гостей — каждый дом с кухней,
            мангалом и выходом к воде.
          </p>
        </div>
      ) : null}

      <div className={`houses-grid houses-grid--${isPreview ? 'preview' : 'full'}`}>
        {items.map((house) => (
          <HouseCard key={house.id} house={house} onBook={onBook} />
        ))}
      </div>

      {isPreview ? (
        <div className="houses-footer">
          <Link to="/cottages" className="button button-outline button-lg">
            Все дома →
          </Link>
        </div>
      ) : null}
    </>
  )

  if (!showHead && !isPreview) {
    return <div className="container">{content}</div>
  }

  return (
    <section className="section section-light">
      <div className="container">{content}</div>
    </section>
  )
}

export default HousesSection
