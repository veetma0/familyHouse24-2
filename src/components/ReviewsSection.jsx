import { reviews } from '../data/siteData'

function ReviewsSection({ limit }) {
  const items = typeof limit === 'number' ? reviews.slice(0, limit) : reviews

  return (
    <section className="section section-soft">
      <div className="container">
        <div className="section-head">
          <p className="kicker">Отзывы</p>
          <h2>Почему гости возвращаются</h2>
        </div>

        <div className="reviews-grid">
          {items.map((review) => (
            <article className="review-card" key={`${review.author}-${review.date}`}>
              <div className="review-stars" aria-label="5 из 5">
                {review.stars}
              </div>
              <p className="review-text">{review.text}</p>
              <div className="review-foot">
                <div className="review-name">{review.author}</div>
                <div className="review-meta">
                  {review.source} · {review.date}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
