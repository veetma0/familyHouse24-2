import { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import AboutSection from '../components/AboutSection'
import FishingSeasonsSection from '../components/FishingSeasonsSection'
import GearAndTransportSection from '../components/GearAndTransportSection'
import HousesSection from '../components/HousesSection'
import ServicesSection from '../components/ServicesSection'
import GallerySection from '../components/GallerySection'
import ReviewsSection from '../components/ReviewsSection'
import ContactsSection from '../components/ContactsSection'
import FaqSection from '../components/FaqSection'
import AdvantagesSection from '../components/AdvantagesSection'
import MealsSection from '../components/MealsSection'
import PricingSection from '../components/PricingSection'
import BookingPoliciesSection from '../components/BookingPoliciesSection'
import BnovoAvailabilitySection from '../components/BnovoAvailabilitySection'
import BnovoOverlay from '../components/BnovoOverlay'
import LeadCaptureModal from '../components/LeadCaptureModal'
import InquiryForm from '../components/InquiryForm'
import FloatingHelpButton from '../components/FloatingHelpButton'
import { useLeadCapture } from '../hooks/useLeadCapture'
import { useScrollReveal } from '../hooks/useScrollReveal'

function HomePage() {
  const [isBookingOpen, setBookingOpen] = useState(false)
  const { isLeadOpen, source, openLead, closeLead, snoozePopup } = useLeadCapture()

  useScrollReveal()

  const openBooking = () => setBookingOpen(true)
  const closeBooking = () => setBookingOpen(false)

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const section = document.querySelector(window.location.hash)
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <main>
      <div className="hero-shell">
        <SiteHeader onBook={openBooking} />
        <HeroSection onBook={openBooking} />
      </div>
      <AboutSection />
      <AdvantagesSection />
      <FishingSeasonsSection onBook={openBooking} />
      <GearAndTransportSection onBook={openBooking} />
      <BnovoAvailabilitySection />
      <HousesSection onBook={openBooking} />
      <MealsSection />
      <ServicesSection />
      <PricingSection />
      <GallerySection />
      <ReviewsSection />
      <BookingPoliciesSection />
      <FaqSection />
      <ContactsSection onAskQuestion={() => openLead('contacts')} onBook={openBooking} />
      <SiteFooter onLead={() => openLead('footer')} />
      <button type="button" className="sticky-booking-link" onClick={openBooking}>
        Забронировать
      </button>
      <FloatingHelpButton onClick={() => openLead('floating-button')} />

      <LeadCaptureModal
        isOpen={isLeadOpen}
        title="Получите подбор рыбалки и лучшие даты"
        text={
          source === 'scroll-depth'
            ? 'Понравилось? Оставьте телефон — подберём свободные даты, технику и котедж под вашу компанию. Перезвоним в течение 15 минут.'
            : source === 'exit-intent'
              ? 'Не уезжайте без улова! Оставьте контакты — забронируем лучшие даты сезона и ответим на все вопросы.'
              : 'Оставьте телефон — подберём формат рыбалки, технику и размещение под ваши даты. Перезвоним в течение 15 минут.'
        }
        onClose={closeLead}
        onSnooze={snoozePopup}
      >
        <InquiryForm onBookNow={openBooking} compact />
      </LeadCaptureModal>

      <BnovoOverlay isOpen={isBookingOpen} onClose={closeBooking} />
    </main>
  )
}

export default HomePage
