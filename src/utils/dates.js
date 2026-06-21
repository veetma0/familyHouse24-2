// Утилиты дат для форм бронирования (плашка на главной + страница /booking).
// Формат ГГГГ-ММ-ДД — нативный для <input type="date"> и для getBnovoIframeUrl.

// Дата через N дней от сегодня в формате ГГГГ-ММ-ДД.
export function dateOffset(days) {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + days)
  return toInputDate(d)
}

// Объект Date -> строка ГГГГ-ММ-ДД.
export function toInputDate(d) {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Следующий день после переданной даты (ГГГГ-ММ-ДД -> ГГГГ-ММ-ДД).
export function nextDay(value) {
  const next = new Date(`${value}T00:00:00`)
  next.setDate(next.getDate() + 1)
  return toInputDate(next)
}

// Человекочитаемая дата для подписей: ГГГГ-ММ-ДД -> «23 июня 2026».
const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
]
export function humanDate(value) {
  if (!value) return ''
  const [year, month, day] = value.split('-')
  const m = Number(month)
  if (!year || !m || !day) return ''
  return `${Number(day)} ${MONTHS[m - 1]} ${year}`
}
