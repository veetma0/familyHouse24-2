import { useEffect, useRef, useState } from 'react'

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseDateKey(key) {
  if (!key) return null
  return new Date(`${key}T00:00:00`)
}

function addDays(key, days) {
  const date = parseDateKey(key)
  if (!date) return ''
  date.setDate(date.getDate() + days)
  return toDateKey(date)
}

function formatDate(key) {
  const date = parseDateKey(key)
  if (!date) return ''
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  })
}

function buildMonthDays(viewDate) {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = []

  for (let index = 0; index < startOffset; index += 1) days.push(null)
  for (let day = 1; day <= daysInMonth; day += 1) days.push(new Date(year, month, day))

  return days
}

function DateField({ label, value, minDate, onSelect }) {
  const fieldRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => parseDateKey(value) || parseDateKey(minDate) || new Date())

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!fieldRef.current?.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const days = buildMonthDays(viewDate)
  const todayKey = toDateKey(new Date())
  const minKey = minDate || todayKey

  const selectDate = (date) => {
    onSelect(toDateKey(date))
    setIsOpen(false)
  }

  const toggleCalendar = () => {
    setViewDate(parseDateKey(value) || parseDateKey(minDate) || new Date())
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="bnovo-launcher-date" ref={fieldRef}>
      <button
        type="button"
        className={`bnovo-launcher-field${isOpen ? ' is-open' : ''}${value ? '' : ' is-empty'}`}
        onClick={toggleCalendar}
      >
        <span>{value ? formatDate(value) : label}</span>
        <span className="bnovo-launcher-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M7 3v3M17 3v3M4.5 9.5h15M6.5 5h11A2.5 2.5 0 0 1 20 7.5v10A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-10A2.5 2.5 0 0 1 6.5 5Z" />
            <path d="M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="bnovo-launcher-calendar" role="dialog" aria-label={`Выбор даты: ${label}`}>
          <div className="bnovo-launcher-calendar-head">
            <button
              type="button"
              className="bnovo-launcher-calendar-nav"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              aria-label="Предыдущий месяц"
            >
              ‹
            </button>
            <strong>
              {monthNames[month]} {year}
            </strong>
            <button
              type="button"
              className="bnovo-launcher-calendar-nav"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              aria-label="Следующий месяц"
            >
              ›
            </button>
          </div>

          <div className="bnovo-launcher-weekdays">
            {weekdays.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>

          <div className="bnovo-launcher-days">
            {days.map((date, index) => {
              if (!date) {
                return <span key={`empty-${index}`} className="bnovo-launcher-day is-empty" />
              }

              const key = toDateKey(date)
              const isDisabled = key < minKey
              const isSelected = key === value
              const isToday = key === todayKey

              return (
                <button
                  key={key}
                  type="button"
                  className={`bnovo-launcher-day${isSelected ? ' is-selected' : ''}${isToday ? ' is-today' : ''}`}
                  disabled={isDisabled}
                  onClick={() => selectDate(date)}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function BnovoBookingLauncher({
  onOpen,
  submitText = 'Показать наличие',
  variant = 'hero',
}) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const launcherClass = [
    'bnovo-launcher',
    variant === 'light' ? 'bnovo-launcher--light' : 'bnovo-launcher--hero',
  ]
    .filter(Boolean)
    .join(' ')

  const openBooking = () => {
    onOpen?.({ checkIn, checkOut })
  }

  const onCheckInSelect = (date) => {
    setCheckIn(date)
    if (checkOut && checkOut <= date) setCheckOut('')
  }

  const minCheckIn = toDateKey(new Date())
  const minCheckOut = checkIn ? addDays(checkIn, 1) : minCheckIn

  return (
    <form
      className={launcherClass}
      onSubmit={(event) => {
        event.preventDefault()
        openBooking()
      }}
    >
      <DateField label="Заезд" value={checkIn} minDate={minCheckIn} onSelect={onCheckInSelect} />
      <DateField label="Выезд" value={checkOut} minDate={minCheckOut} onSelect={setCheckOut} />
      <button type="submit" className="bnovo-launcher-submit">
        {submitText}
      </button>
    </form>
  )
}

export default BnovoBookingLauncher
