import { mealsInfo } from '../data/siteData'

function MealsSection() {
  return (
    <section className="section container">
      <p className="kicker">Питание</p>
      <h2>{mealsInfo.title} и кухня</h2>
      <p className="section-intro">{mealsInfo.subtitle}</p>

      <div className="gear-groups-grid">
        <article className="gear-group">
          <h3>Как организовано</h3>
          <ul className="plain-list">
            {mealsInfo.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>

        <article className="gear-group">
          <h3>Расписание и стоимость</h3>
          <ul className="plain-list">
            {mealsInfo.schedule.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ul className="plain-list plain-list-prices">
            {mealsInfo.prices.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

export default MealsSection
