import { useEffect, useState } from 'react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import FishingSeasonsSection from '../components/FishingSeasonsSection'
import FishingTrophiesSection from '../components/FishingTrophiesSection'
import BnovoOverlay from '../components/BnovoOverlay'
import { fishingTech } from '../data/siteData'
import { useScrollReveal } from '../hooks/useScrollReveal'

function FishingPage() {
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
        <header className="page-hero page-hero--fishing">
          <div className="container page-hero-content">
            <p className="kicker">Рыбалка на Рыбинке</p>
            <h1>Настоящая мужская рыбалка</h1>
            <p>
              Трофейный судак, щука и лещ летом, налим и берш зимой. Своя техника, снасти и егерь —
              выходим на воду и на лёд круглый год.
            </p>
          </div>
        </header>

        <FishingSeasonsSection />

        <section className="section section-dark-2">
          <div className="container">
            <div className="section-head">
              <p className="kicker">Техника базы</p>
              <h2>На чём выходим на воду и лёд</h2>
            </div>
            <div className="tech-grid">
              {fishingTech.map((tech) => (
                <article className="tech-card" key={tech.t}>
                  <h3>{tech.t}</h3>
                  <p>{tech.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FishingTrophiesSection onBook={openBooking} />
      </main>

      <SiteFooter />
      <BnovoOverlay isOpen={isBookingOpen} onClose={closeBooking} dates={bookingDates} />
    </div>
  )
}

export default FishingPage
