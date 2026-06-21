import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dateOffset, nextDay } from '../utils/dates'

/* ============================================================
   Плашка бронирования на главной (под hero).

   Короткая форма «Заезд / Выезд / Гости / Найти» прямо на странице.
   По кнопке — внутренний переход на /booking с датами в URL, где
   встроен модуль Bnovo. Клиент сразу видит свободные дома и не
   покидает сайт (минимум переходов).
   ============================================================ */

const fieldLabel = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#9a8c74',
  marginBottom: 7,
}

const fieldInput = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderRadius: 0,
  padding: 0,
  fontSize: 16,
  fontWeight: 600,
  color: '#2b2620',
  outline: 'none',
  fontFamily: 'inherit',
  cursor: 'pointer',
}

function BookingBar() {
  const navigate = useNavigate()
  const minDate = dateOffset(0)
  const [checkIn, setCheckIn] = useState(dateOffset(2))
  const [checkOut, setCheckOut] = useState(dateOffset(3))
  const [adults, setAdults] = useState('2')

  // Выезд всегда позже заезда: подтягиваем его при смене заезда.
  const onCheckInChange = (value) => {
    setCheckIn(value)
    if (checkOut <= value) setCheckOut(nextDay(value))
  }

  // Уходим на встроенную страницу /booking (модуль Bnovo внутри сайта),
  // даты передаём в URL в формате ГГГГ-ММ-ДД (его понимает getBnovoIframeUrl).
  const onSubmit = (e) => {
    e.preventDefault()
    const search = new URLSearchParams({ checkIn, checkOut, adults: String(adults) })
    navigate(`/booking?${search.toString()}`)
  }

  return (
    <section className="fh-section-pad fh-bookingbar-wrap" style={{ position: 'relative', padding: '0 32px', marginTop: -44, zIndex: 20 }}>
      <form
        onSubmit={onSubmit}
        className="fh-bookingbar"
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          background: '#faf6ee',
          border: '1px solid rgba(43,38,32,0.08)',
          borderRadius: 14,
          boxShadow: '0 24px 60px rgba(28,24,20,0.22)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr auto',
          alignItems: 'stretch',
          gap: 0,
          overflow: 'hidden',
        }}
      >
        <div className="fh-bookingbar-cell" style={{ padding: '20px 26px', borderRight: '1px solid rgba(43,38,32,0.1)' }}>
          <label style={fieldLabel} htmlFor="bb-checkin">Заезд</label>
          <input
            id="bb-checkin"
            type="date"
            value={checkIn}
            min={minDate}
            onChange={(e) => onCheckInChange(e.target.value)}
            style={fieldInput}
          />
        </div>

        <div className="fh-bookingbar-cell" style={{ padding: '20px 26px', borderRight: '1px solid rgba(43,38,32,0.1)' }}>
          <label style={fieldLabel} htmlFor="bb-checkout">Выезд</label>
          <input
            id="bb-checkout"
            type="date"
            value={checkOut}
            min={nextDay(checkIn)}
            onChange={(e) => setCheckOut(e.target.value)}
            style={fieldInput}
          />
        </div>

        <div className="fh-bookingbar-cell" style={{ padding: '20px 26px', borderRight: '1px solid rgba(43,38,32,0.1)' }}>
          <label style={fieldLabel} htmlFor="bb-guests">Гости</label>
          <select
            id="bb-guests"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            style={{ ...fieldInput, appearance: 'none', WebkitAppearance: 'none' }}
          >
            <option value="1">1 гость</option>
            <option value="2">2 гостя</option>
            <option value="3">3 гостя</option>
            <option value="4">4 гостя</option>
            <option value="5">5 гостей</option>
            <option value="6">6 гостей</option>
            <option value="7">7 гостей</option>
            <option value="8">8+ гостей</option>
          </select>
        </div>

        <div className="fh-bookingbar-cell fh-bookingbar-submit" style={{ padding: 14, display: 'flex', alignItems: 'center' }}>
          <button
            type="submit"
            className="fh-btn-primary"
            style={{
              height: '100%',
              minHeight: 56,
              width: '100%',
              whiteSpace: 'nowrap',
              background: '#b8762e',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 15.5,
              fontWeight: 600,
              padding: '0 30px',
              borderRadius: 10,
              boxShadow: '0 8px 22px rgba(184,118,46,0.3)',
            }}
          >
            Найти свободный дом →
          </button>
        </div>
      </form>
    </section>
  )
}

export default BookingBar
