import BnovoWidget from './BnovoWidget'
import { trustFacts } from '../data/siteData'

function HeroSection({ onBook }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" />
      <div className="hero-content container">
        <p className="kicker">Рыбинское водохранилище · река Сить</p>
        <h1 id="hero-title">Рыболовная база отдыха Family House на Рыбинке</h1>
        <p className="hero-lead">Трофейная рыбалка с комфортным размещением круглый год</p>
        <p className="hero-description">
          Ваш идеальный уикенд на природе: трофейная рыбалка, техника и снасти на базе, а после
          выезда - тёплый коттедж, баня и ужин из вашего улова.
        </p>
        <div className="hero-actions">
          <button type="button" className="button button-primary" onClick={onBook}>
            Забронировать
          </button>
          <a href="#fishing" className="button button-soft">
            Смотреть форматы рыбалки
          </a>
        </div>
        <BnovoWidget widgetId="_bn_widget_hero" submitText="Показать варианты" variant="hero" />
      </div>

      <div className="trust-bar container" role="list" aria-label="Преимущества базы">
        {trustFacts.map((fact) => (
          <article key={fact.title} role="listitem" className="trust-card">
            <strong>{fact.title}</strong>
            <p>{fact.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HeroSection
