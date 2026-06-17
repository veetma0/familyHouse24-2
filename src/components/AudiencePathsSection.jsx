import { Link } from 'react-router-dom'
import { audiencePaths } from '../data/siteData'

function AudiencePathsSection() {
  return (
    <section id="paths" className="section section-soft">
      <div className="container">
        <p className="kicker">Сценарии отдыха</p>
        <h2>Выберите формат поездки</h2>
        <div className="paths-grid">
          {audiencePaths.map((path) => (
            <article className="path-card" key={path.title}>
              <h3>{path.title}</h3>
              <ul>
                {path.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link to="/booking" className="button button-link">
                {path.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AudiencePathsSection
