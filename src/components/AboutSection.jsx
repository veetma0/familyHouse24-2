function AboutSection() {
  return (
    <section className="section section-soft">
      <div className="container">
        <div className="about-grid">
          <div className="about-media">
            <img src="/images/gallery/base-panorama.svg" alt="Вид на реку и сосновый берег базы Family House" />
          </div>
          <div className="about-body">
            <p className="kicker">О базе Family House</p>
            <h2>Рыбинка, природа и понятный сервис</h2>
            <p className="lead">
              Локация для тех, кто хочет совместить сильную рыбалку, тишину природы и комфортное
              размещение у самой воды.
            </p>
            <p>
              База расположена в деревне Набережная на берегу у Рыбинского водохранилища. Утром
              можно выйти на воду, а вечером спокойно восстановиться в доме и бане.
            </p>
            <ul className="about-points">
              <li>Дома у воды с кухней, мангалом и причалом в шаге от порога.</li>
              <li>Своя техника: катера с эхолотами, снегоходы и воздушная подушка.</li>
              <li>Баня на дровах, сопровождение егеря, чистка и копчение улова.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
