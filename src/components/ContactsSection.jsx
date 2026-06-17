function ContactsSection({ onAskQuestion, onBook }) {
  return (
    <section id="contacts" className="section container">
      <p className="kicker">Контакты</p>
      <h2>Как добраться и быстро связаться</h2>
      <div className="contacts-grid">
        <article className="contact-card">
          <h3>Отдел бронирования</h3>
          <p>Ежедневно: 10:00 - 20:00</p>
          <p>Ярославская обл., Брейтовский р-н, д. Набережная</p>
          <p>
            Телефон: <a href="tel:+74951510082">+7 (495) 151-00-82</a>
          </p>
          <p>
            Email: <a href="mailto:Familyhouse.baza@gmail.com">Familyhouse.baza@gmail.com</a>
          </p>
          <div className="contact-actions">
            <button type="button" className="button button-primary" onClick={onBook}>
              Перейти к бронированию
            </button>
            <button type="button" className="button button-soft" onClick={onAskQuestion}>
              Задать вопрос
            </button>
          </div>
        </article>
        <article className="contact-card">
          <h3>Юридическая информация</h3>
          <p>ООО «НОВЫЕ ТЕХНОЛОГИИ»</p>
          <p>ИНН: 9724129100</p>
          <p>ОГРН: 1237700267221</p>
        </article>
      </div>
      <div className="map-wrap">
        <iframe
          title="Карта Family House"
          src="https://yandex.ru/map-widget/v1/?text=FamilyHouse%2C%20%D0%AF%D1%80%D0%BE%D1%81%D0%BB%D0%B0%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB.%2C%20%D0%91%D1%80%D0%B5%D0%B9%D1%82%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%20%D1%80-%D0%BD%2C%20%D0%B4.%20%D0%9D%D0%B0%D0%B1%D0%B5%D1%80%D0%B5%D0%B6%D0%BD%D0%B0%D1%8F&z=12"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}

export default ContactsSection
