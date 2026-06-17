import { gearGroups } from '../data/siteData'

function GearAndTransportSection({ onBook }) {
  return (
    <section id="gear" className="section container">
      <p className="kicker">Техника и снасти</p>
      <h2>Всё нужное уже на базе</h2>
      <p className="section-intro">
        Не нужно везти с собой лодку, снегоход или полный комплект снастей. Мы подготовили технику
        и снаряжение для летней и зимней рыбалки.
      </p>

      <div className="gear-groups-grid">
        {gearGroups.map((group) => (
          <article className="gear-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="gear-items">
              {group.items.map((item) => (
                <div className="gear-item" key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <button type="button" className="button button-primary button-lg" onClick={onBook}>
        Проверить даты и технику
      </button>
    </section>
  )
}

export default GearAndTransportSection
