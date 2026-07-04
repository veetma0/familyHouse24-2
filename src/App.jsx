import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import CottagesPage from './pages/CottagesPage'
import FishingPage from './pages/FishingPage'
import BanyaPage from './pages/BanyaPage'
import DiningPage from './pages/DiningPage'
import EntertainmentPage from './pages/EntertainmentPage'
import PricesPage from './pages/PricesPage'
import PhotosPage from './pages/PhotosPage'
import ReviewsPage from './pages/ReviewsPage'
import ContactsPage from './pages/ContactsPage'
import BookingPage from './pages/BookingPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/cottages" element={<CottagesPage />} />
      <Route path="/fishing" element={<FishingPage />} />
      <Route path="/banya" element={<BanyaPage />} />
      <Route path="/dining" element={<DiningPage />} />
      <Route path="/entertainment" element={<EntertainmentPage />} />
      <Route path="/prices" element={<PricesPage />} />
      <Route path="/photos" element={<PhotosPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      {/* Старый раздел «Услуги» теперь объединён со страницей цен */}
      <Route path="/services" element={<Navigate to="/prices" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
