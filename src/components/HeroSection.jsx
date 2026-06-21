import { useNavigate } from 'react-router-dom'
import BnovoInlineWidget from './BnovoInlineWidget'

function HeroSection({ onBook }) {
  const navigate = useNavigate()

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" />
      <div className="hero-content container">
        <p className="kicker">Family House · Рыбинское водохранилище</p>
        <h1 id="hero-title">Где вода встречает тишину</h1>
        <p>
          Дома у самой воды, своя техника и снасти, баня и егерь. Трофейная рыбалка и спокойный
          отдых на берегу Рыбинки — круглый год.
        </p>
        <div className="hero-actions">
          <button type="button" className="button button-primary button-lg" onClick={() => onBook?.()}>
            Забронировать дом
          </button>
          <button type="button" className="button button-ghost button-lg" onClick={() => navigate('/fishing')}>
            О рыбалке →
          </button>
        </div>
        <BnovoInlineWidget submitText="Показать свободные домики" />
      </div>
    </section>
  )
}

export default HeroSection
