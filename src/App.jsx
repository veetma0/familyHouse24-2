import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import CottagesPage from './pages/CottagesPage'
import FishingPage from './pages/FishingPage'
import BanyaPage from './pages/BanyaPage'
import DiningPage from './pages/DiningPage'
import EntertainmentPage from './pages/EntertainmentPage'
import ServicesPage from './pages/ServicesPage'
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
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
