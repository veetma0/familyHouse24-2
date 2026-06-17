import { mealsInfo } from '../data/siteData'

function MealsSection() {
  return (
    <section className="section container">
      <p className="kicker">Питание</p>
      <h2>{mealsInfo.title} и кухня</h2>
      <p className="section-intro">{mealsInfo.subtitle}</p>

      <div className="meals-layout">
        <article className="meals-card meals-card-info">
          <h3>Как организовано</h3>
          <ul className="meals-points">
            {mealsInfo.points.map((point) => (
              <li key={point.text}>
                <span className="meals-point-icon" aria-hidden="true">
                  {point.icon}
                </span>
                <span>{point.text}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="meals-card meals-card-schedule">
          <h3>Расписание и стоимость</h3>
          <ul className="meals-schedule">
            {mealsInfo.meals.map((meal) => (
              <li key={meal.name} className="meals-row">
                <span className="meals-row-icon" aria-hidden="true">
                  {meal.icon}
                </span>
                <span className="meals-row-name">{meal.name}</span>
                <span className="meals-row-time">{meal.time}</span>
                <span className="meals-row-price">{meal.price}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

export default MealsSection
