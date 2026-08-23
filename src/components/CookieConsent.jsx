import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { COOKIE_SETTINGS_EVENT } from './cookieEvents'

/* ============================================================
   Баннер согласия на использование файлов cookie.

   Согласие — отдельное явное действие пользователя (ст. 9 ФЗ-152
   в редакции с 01.09.2025), поэтому у баннера две равнозначные
   кнопки: принять все / только необходимые. Пассивной формулировки
   «продолжая пользоваться сайтом, вы соглашаетесь» недостаточно.

   Выбор и его дата сохраняются локально — это доказательство
   полученного (или неполученного) согласия.
   ============================================================ */

const STORAGE_KEY = 'fh-cookie-consent'

function getCookieConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    // Поддерживаем старый формат ('1'), сохранённый прежней версией баннера.
    if (raw === '1') return { value: 'all', date: null }
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function CookieConsent() {
  // Читаем сохранённый выбор один раз при инициализации — баннер не мигает
  // при первой отрисовке у пользователей, уже сделавших выбор.
  const [visible, setVisible] = useState(() => !getCookieConsent())

  useEffect(() => {
    const reopen = () => setVisible(true)
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('has-cookie-banner', visible)
    return () => document.body.classList.remove('has-cookie-banner')
  }, [visible])

  const decide = (value) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, date: new Date().toISOString() }),
      )
    } catch {
      /* приватный режим браузера — просто закрываем баннер */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fh-cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании файлов cookie"
    >
      <div className="fh-cookie-banner__inner">
        <p className="fh-cookie-banner__text">
          Мы используем файлы cookie: строго необходимые — для работы сайта и формы
          бронирования, аналитические и функциональные — только с вашего согласия.
          Подробнее — в{' '}
          <Link to="/cookies" className="fh-cookie-banner__link">
            Политике в отношении файлов cookie
          </Link>{' '}
          и{' '}
          <Link to="/privacy" className="fh-cookie-banner__link">
            Политике обработки персональных данных
          </Link>
          .
        </p>
        <div className="fh-cookie-banner__actions">
          <button
            type="button"
            className="fh-cookie-banner__btn fh-cookie-banner__btn--ghost fh-oswald"
            onClick={() => decide('necessary')}
          >
            Только необходимые
          </button>
          <button
            type="button"
            className="fh-cookie-banner__btn fh-oswald"
            onClick={() => decide('all')}
          >
            Принять все
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
