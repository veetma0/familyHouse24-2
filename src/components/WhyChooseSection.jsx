import { whyReasons } from '../data/siteData'

function WhyChooseSection() {
  return (
    <section className="section section-light">
      <div className="container">
        <div className="section-head">
          <p className="kicker">Почему Family House</p>
          <h2>Отдых, ради которого возвращаются</h2>
          <p>
            Мы собрали всё, что нужно для настоящей рыбалки и спокойного отдыха у воды — от
            техники и снастей до бани и сопровождения егеря.
          </p>
        </div>

        <div className="why-grid">
          {whyReasons.map((reason) => (
            <article className="why-card" key={reason.n}>
              <div className="why-card-num">{reason.n}</div>
              <h3>{reason.t}</h3>
              <p>{reason.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseSection
