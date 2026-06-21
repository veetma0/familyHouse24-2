import { contactInfo } from '../data/siteData'

const mapSrc =
  'https://yandex.ru/map-widget/v1/?text=FamilyHouse%2C%20%D0%AF%D1%80%D0%BE%D1%81%D0%BB%D0%B0%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB.%2C%20%D0%91%D1%80%D0%B5%D0%B9%D1%82%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%20%D1%80-%D0%BD%2C%20%D0%B4.%20%D0%9D%D0%B0%D0%B1%D0%B5%D1%80%D0%B5%D0%B6%D0%BD%D0%B0%D1%8F&z=11'

function DirectionsBlock() {
  return (
    <section className="section section-light">
      <div className="container">
        <div className="directions-block">
          <div className="directions-text">
            <p className="kicker">Как добраться</p>
            <h2>270 км от Москвы</h2>
            <ul className="directions-list">
              <li>
                <strong>Адрес</strong>
                <span>{contactInfo.address}</span>
              </li>
              <li>
                <strong>На авто</strong>
                <span>Около 4 часов от Москвы по Ярославскому направлению.</span>
              </li>
              <li>
                <strong>Часы</strong>
                <span>{contactInfo.hours}</span>
              </li>
              <li>
                <strong>Телефон</strong>
                <span>{contactInfo.phone}</span>
              </li>
            </ul>
          </div>
          <div className="directions-map">
            <iframe
              title="Карта проезда Family House"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DirectionsBlock
