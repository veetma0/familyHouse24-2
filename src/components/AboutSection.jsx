function AboutSection() {
  return (
    <section id="about" className="section container about-grid">
      <article>
        <p className="kicker">О базе Family House</p>
        <h2>Рыбинка, Сить и комфортный формат для рыбалки</h2>
        <p className="section-intro">
          Локация для тех, кто хочет совместить сильную рыбалку, природу и понятный сервис.
        </p>
        <p>
          FAMILY HOUSE расположен в деревне Набережная, на берегу реки Сить в 10 км от Рыбинского
          водохранилища. С утра можно выйти на воду, а вечером спокойно восстановиться в доме и бане.
        </p>
        <p>
          Основной акцент - рыбалка круглый год: техника, снасти, сопровождение и организация
          выездов под семью или компанию. Дополнительно доступны прогулки, баня и другие форматы
          отдыха на природе.
        </p>
      </article>
      <div className="about-media" role="img" aria-label="Вид на реку Сить и сосновый берег" />
    </section>
  )
}

export default AboutSection
