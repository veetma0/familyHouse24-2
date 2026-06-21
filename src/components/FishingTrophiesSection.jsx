import { fishSpecies } from '../data/siteData'

function FishingTrophiesSection({ onBook }) {
  return (
    <section className="section section-light">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="kicker">Трофеи Рыбинки</p>
          <h2>Что ловят наши гости</h2>
          <p>
            Рыбинское водохранилище известно разнообразием улова — от хищного судака до зимнего
            налима. Берите трофей в любой сезон.
          </p>
        </div>

        <div className="fish-pills">
          {fishSpecies.map((fish) => (
            <span className="fish-pill" key={fish}>
              {fish}
            </span>
          ))}
        </div>

        <div className="trophies-cta">
          <button type="button" className="button button-primary button-lg" onClick={onBook}>
            Забронировать рыбалку
          </button>
        </div>
      </div>
    </section>
  )
}

export default FishingTrophiesSection
