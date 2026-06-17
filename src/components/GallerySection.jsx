import { galleryItems } from '../data/siteData'

function GallerySection() {
  return (
    <section id="gallery" className="section container">
      <p className="kicker">Галерея</p>
      <h2>Лето, зима, улов и жизнь на базе</h2>
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <figure className="gallery-item" key={item.label}>
            <img src={item.image} alt={item.label} loading="lazy" />
            <figcaption>
              <span>{item.category}</span>
              <strong>{item.label}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default GallerySection
