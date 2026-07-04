import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dateOffset, humanDate, nextDay, toInputDate } from '../utils/dates'

/* ============================================================
   Форма быстрого поиска в hero главной страницы.

   «Заезд / Выезд / Гости / Найти» — прямо на баннере, как в дизайне.
   Дату выбираем в фирменном календаре-поповере. По кнопке — внутренний
   переход на /booking с датами в URL, где встроен модуль Bnovo.
   ============================================================ */

const labelStyle = {
  fontFamily: "'Oswald', sans-serif",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#a2917a',
}

const CalIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#b8762e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
    <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
    <path d="M3 9.5h18" />
    <path d="M8 2.5v4" />
    <path d="M16 2.5v4" />
  </svg>
)

const GuestsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#b8762e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
)

const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function startOfMonth(value) {
  const date = new Date(`${value}T00:00:00`)
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function monthKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}`
}

function CalendarPopover({ month, minDate, selectedValue, checkIn, checkOut, onMonthChange, onSelect }) {
  const todayMonth = startOfMonth(dateOffset(0))
  const canGoPrev = monthKey(month) !== monthKey(todayMonth)

  const days = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1)
    const firstWeekday = (first.getDay() + 6) % 7
    const monthLength = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    const items = []

    for (let i = 0; i < firstWeekday; i += 1) items.push(null)
    for (let day = 1; day <= monthLength; day += 1) {
      items.push(new Date(month.getFullYear(), month.getMonth(), day))
    }

    return items
  }, [month])

  const shiftMonth = (delta) => {
    const next = new Date(month.getFullYear(), month.getMonth() + delta, 1)
    if (delta < 0 && !canGoPrev) return
    onMonthChange(next)
  }

  return (
    <div className="fh-calendar-popover">
      <div className="fh-calendar-head">
        <button type="button" className="fh-calendar-nav" onClick={() => shiftMonth(-1)} disabled={!canGoPrev} aria-label="Предыдущий месяц">
          ‹
        </button>
        <div className="fh-calendar-title">
          {monthNames[month.getMonth()]} {month.getFullYear()}
        </div>
        <button type="button" className="fh-calendar-nav" onClick={() => shiftMonth(1)} aria-label="Следующий месяц">
          ›
        </button>
      </div>

      <div className="fh-calendar-weekdays">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="fh-calendar-grid">
        {days.map((day, index) => {
          if (!day) return <span key={`empty-${index}`} />

          const value = toInputDate(day)
          const disabled = value < minDate
          const isSelected = value === selectedValue
          const isCheckIn = value === checkIn
          const isCheckOut = value === checkOut
          const isInRange = value > checkIn && value < checkOut

          return (
            <button
              key={value}
              type="button"
              className={[
                'fh-calendar-day',
                isSelected || isCheckIn || isCheckOut ? 'is-selected' : '',
                isInRange ? 'is-in-range' : '',
              ].filter(Boolean).join(' ')}
              disabled={disabled}
              onClick={() => onSelect(value)}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function BookingBar() {
  const navigate = useNavigate()
  const minDate = dateOffset(0)
  const [checkIn, setCheckIn] = useState(dateOffset(2))
  const [checkOut, setCheckOut] = useState(dateOffset(3))
  const [adults, setAdults] = useState('2')
  const [activeCalendar, setActiveCalendar] = useState(null)
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(checkIn))
  const bookingBarRef = useRef(null)

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!bookingBarRef.current?.contains(event.target)) setActiveCalendar(null)
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  // Выезд всегда позже заезда: подтягиваем его при смене заезда.
  const onCheckInChange = (value) => {
    setCheckIn(value)
    if (checkOut <= value) setCheckOut(nextDay(value))
  }

  const openCalendar = (type) => {
    setVisibleMonth(startOfMonth(type === 'checkIn' ? checkIn : checkOut))
    setActiveCalendar((prev) => (prev === type ? null : type))
  }

  const onCalendarSelect = (value) => {
    if (activeCalendar === 'checkIn') {
      onCheckInChange(value)
      setVisibleMonth(startOfMonth(nextDay(value)))
      setActiveCalendar('checkOut')
      return
    }

    if (value > checkIn) {
      setCheckOut(value)
      setActiveCalendar(null)
    }
  }

  // Уходим на встроенную страницу /booking (модуль Bnovo внутри сайта).
  const onSubmit = (e) => {
    e.preventDefault()
    const search = new URLSearchParams({ checkIn, checkOut, adults: String(adults) })
    navigate(`/booking?${search.toString()}`)
  }

  const cellStyle = {
    position: 'relative',
    padding: '15px 22px',
    borderRight: '1px solid rgba(43,38,32,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  }

  return (
    <form
      ref={bookingBarRef}
      onSubmit={onSubmit}
      className="fh-book-panel"
      style={{
        maxWidth: 1120,
        position: 'relative',
        borderRadius: 12,
        overflow: 'visible',
        boxShadow: '0 26px 64px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.14)',
      }}
    >
      <div style={{ height: 3, background: 'linear-gradient(90deg, #a3661f, #e0b45f 50%, #a3661f)', borderRadius: '12px 12px 0 0' }} />
      <div className="fh-bookbar" style={{ borderRadius: '0 0 12px 12px', overflow: 'hidden' }}>
        {/* Заезд */}
        <div className="fh-bookbar-cell" style={cellStyle}>
          <span style={labelStyle}>Заезд</span>
          <button
            type="button"
            className="fh-date-trigger"
            onClick={() => openCalendar('checkIn')}
            aria-expanded={activeCalendar === 'checkIn'}
            style={{ display: 'flex', alignItems: 'center', gap: 9 }}
          >
            <CalIcon />
            {humanDate(checkIn)}
          </button>
          {activeCalendar === 'checkIn' && (
            <CalendarPopover
              month={visibleMonth}
              minDate={minDate}
              selectedValue={checkIn}
              checkIn={checkIn}
              checkOut={checkOut}
              onMonthChange={setVisibleMonth}
              onSelect={onCalendarSelect}
            />
          )}
        </div>

        {/* Выезд */}
        <div className="fh-bookbar-cell" style={cellStyle}>
          <span style={labelStyle}>Выезд</span>
          <button
            type="button"
            className="fh-date-trigger"
            onClick={() => openCalendar('checkOut')}
            aria-expanded={activeCalendar === 'checkOut'}
            style={{ display: 'flex', alignItems: 'center', gap: 9 }}
          >
            <CalIcon />
            {humanDate(checkOut)}
          </button>
          {activeCalendar === 'checkOut' && (
            <CalendarPopover
              month={visibleMonth}
              minDate={nextDay(checkIn)}
              selectedValue={checkOut}
              checkIn={checkIn}
              checkOut={checkOut}
              onMonthChange={setVisibleMonth}
              onSelect={onCalendarSelect}
            />
          )}
        </div>

        {/* Гости */}
        <div className="fh-bookbar-cell" style={{ ...cellStyle }}>
          <span style={labelStyle}>Гости</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <GuestsIcon />
            <select
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="fh-oswald"
              aria-label="Число гостей"
              style={{ appearance: 'none', WebkitAppearance: 'none', border: 'none', background: 'transparent', fontSize: 17, fontWeight: 600, color: '#2b2620', cursor: 'pointer', outline: 'none', padding: 0, width: '100%' }}
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
          </span>
        </div>

        {/* Кнопка */}
        <div className="fh-bookbar-cell" style={{ padding: 12, display: 'flex', alignItems: 'center' }}>
          <button
            type="submit"
            className="fh-oswald fh-btn-primary"
            style={{
              height: '100%',
              minHeight: 60,
              width: '100%',
              background: '#b8762e',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              padding: '0 32px',
              borderRadius: 8,
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 22px rgba(184,118,46,0.36)',
            }}
          >
            Найти свободный дом →
          </button>
        </div>
      </div>
    </form>
  )
}

export default BookingBar
