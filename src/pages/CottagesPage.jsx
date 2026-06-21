import { useEffect, useState } from 'react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import HousesSection from '../components/HousesSection'
import BnovoOverlay from '../components/BnovoOverlay'
import { cottageAmenities } from '../data/siteData'
import { useScrollReveal } from '../hooks/useScrollReveal'

function CottagesPage() {
  const [isBookingOpen, setBookingOpen] = useState(false)
  const [bookingDates, setBookingDates] = useState({})

  useScrollReveal()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const openBooking = (dates) => {
    if (dates && ('checkIn' in dates || 'checkOut' in dates)) setBookingDates(dates)
    setBookingOpen(true)
  }
  const closeBooking = () => setBookingOpen(false)

  return (
    <div className="page">
      <SiteHeader onBook={openBooking} />

      <main className="page-main">
        <header className="page-hero">
          <div className="container page-hero-content">
            <p className="kicker">Размещение</p>
            <h1>Дома у воды</h1>
            <p>
              Четыре формата размещения — от уютного домика для пары до премиум-шале на восемь
              гостей. Каждый дом с кухней, мангалом и выходом к воде.
            </p>
          </div>
        </header>

        <section className="section section-light">
          <HousesSection variant="full" showHead={false} onBook={openBooking} />
        </section>

        <section className="section section-soft">
          <div className="container">
            <div className="section-head">
              <p className="kicker">Комфорт</p>
              <h2>Включено в каждый дом</h2>
            </div>
            <div className="amenities-grid">
              {cottageAmenities.map((amenity) => (
                <article className="amenity-card" key={amenity.t}>
                  <h3>{amenity.t}</h3>
                  <p>{amenity.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BnovoOverlay isOpen={isBookingOpen} onClose={closeBooking} dates={bookingDates} />
    </div>
  )
}

export default CottagesPage
