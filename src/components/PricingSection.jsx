import { extraServicesPricing } from '../data/siteData'

function PricingSection() {
  return (
    <section id="pricing" className="section container">
      <p className="kicker">Цены на дополнительные услуги</p>
      <h2>Прозрачный прайс на сервис и аренду</h2>
      <p className="section-intro">
        Стоимость популярных услуг собрана в одном месте, чтобы проще планировать бюджет поездки.
      </p>
      <div className="pricing-table-wrap">
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Услуга</th>
              <th>Стоимость</th>
            </tr>
          </thead>
          <tbody>
            {extraServicesPricing.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default PricingSection
