import { useEffect, useState } from 'react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import HeroSection from '../components/HeroSection'
import StatsSection from '../components/StatsSection'
import AboutSection from '../components/AboutSection'
import WhyChooseSection from '../components/WhyChooseSection'
import HousesSection from '../components/HousesSection'
import FishingSeasonsSection from '../components/FishingSeasonsSection'
import ReviewsSection from '../components/ReviewsSection'
import DirectionsBlock from '../components/DirectionsBlock'
import BnovoOverlay from '../components/BnovoOverlay'
import { useScrollReveal } from '../hooks/useScrollReveal'

function HomePage() {
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
        <HeroSection onBook={openBooking} />
        <StatsSection />
        <AboutSection />
        <WhyChooseSection />
        <HousesSection variant="preview" onBook={openBooking} />
        <FishingSeasonsSection />
        <ReviewsSection limit={3} />
        <DirectionsBlock />
      </main>

      <SiteFooter />
      <BnovoOverlay isOpen={isBookingOpen} onClose={closeBooking} dates={bookingDates} />
    </div>
  )
}

export default HomePage
