import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import CottagesPage from './pages/CottagesPage'
import FishingPage from './pages/FishingPage'
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
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
