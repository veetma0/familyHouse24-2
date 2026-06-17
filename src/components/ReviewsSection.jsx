import { reviews } from '../data/siteData'

function ReviewsSection() {
  return (
    <section id="reviews" className="section section-soft">
      <div className="container">
        <p className="kicker">Отзывы</p>
        <h2>Почему гости возвращаются</h2>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <blockquote key={`${review.author}-${review.date}`} className="review-card">
              <p>{review.text}</p>
              <footer>
                <strong>{review.author}</strong>
                <span>
                  {review.source} · {review.date}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
        <a
          className="button button-link"
          href="https://yandex.ru/maps/?text=Family%20House%20Брейтово"
          target="_blank"
          rel="noopener noreferrer"
        >
          Смотреть больше отзывов на Яндексе
        </a>
      </div>
    </section>
  )
}

export default ReviewsSection
