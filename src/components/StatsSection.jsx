import { statsItems } from '../data/siteData'

function StatsSection() {
  return (
    <section className="stats-bar" aria-label="Цифры о базе">
      {statsItems.map((item) => (
        <div className="stat-item" key={item.value}>
          <div className="stat-value">{item.value}</div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </section>
  )
}

export default StatsSection
