import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dateOffset, humanDate, nextDay, toInputDate } from '../utils/dates'

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
    setActiveCalendar(type)
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

  // Уходим на встроенную страницу /booking (модуль Bnovo внутри сайта),
  // даты передаём в URL в формате ГГГГ-ММ-ДД (его понимает getBnovoIframeUrl).
  const onSubmit = (e) => {
    e.preventDefault()
    const search = new URLSearchParams({ checkIn, checkOut, adults: String(adults) })
    navigate(`/booking?${search.toString()}`)
  }

  return (
    <section
      className="fh-section-pad fh-bookingbar-wrap"
      style={{
        position: 'relative',
        padding: '40px 32px',
        marginTop: -44,
        zIndex: 20,
        background: '#faf6ee',
      }}
    >
      <form
        ref={bookingBarRef}
        onSubmit={onSubmit}
        className="fh-bookingbar"
        style={{
          maxWidth: 1140,
          margin: '0 auto',
          background: '#faf6ee',
          border: '1px solid rgba(43,38,32,0.08)',
          borderRadius: 14,
          boxShadow: '0 24px 60px rgba(28,24,20,0.22)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr auto',
          alignItems: 'stretch',
          gap: 0,
          overflow: 'visible',
        }}
      >
        <div className="fh-bookingbar-cell" style={{ position: 'relative', padding: '20px 26px', borderRight: '1px solid rgba(43,38,32,0.1)' }}>
          <label style={fieldLabel} htmlFor="bb-checkin">Заезд</label>
          <button
            id="bb-checkin"
            type="button"
            className="fh-date-trigger"
            onClick={() => openCalendar('checkIn')}
            aria-expanded={activeCalendar === 'checkIn'}
          >
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

        <div className="fh-bookingbar-cell" style={{ position: 'relative', padding: '20px 26px', borderRight: '1px solid rgba(43,38,32,0.1)' }}>
          <label style={fieldLabel} htmlFor="bb-checkout">Выезд</label>
          <button
            id="bb-checkout"
            type="button"
            className="fh-date-trigger"
            onClick={() => openCalendar('checkOut')}
            aria-expanded={activeCalendar === 'checkOut'}
          >
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
