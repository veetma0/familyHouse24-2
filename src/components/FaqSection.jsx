import { faqItems } from '../data/siteData'

function FaqSection() {
  return (
    <section id="faq" className="section section-soft">
      <div className="container">
        <p className="kicker">Частые вопросы</p>
        <h2>Перед бронированием</h2>
        <div className="faq-grid">
          {faqItems.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
