import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import CottagesPage from './pages/CottagesPage'
import FishingPage from './pages/FishingPage'
import ContactsPage from './pages/ContactsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cottages" element={<CottagesPage />} />
      <Route path="/fishing" element={<FishingPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
