import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'fh-cookie-consent'

function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      setVisible(!localStorage.getItem(STORAGE_KEY))
    } catch {
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('has-cookie-banner', visible)
    return () => document.body.classList.remove('has-cookie-banner')
  }, [visible])

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fh-cookie-banner" role="dialog" aria-live="polite" aria-label="Уведомление об использовании cookie">
      <div className="fh-cookie-banner__inner">
        <p className="fh-cookie-banner__text">
          Мы используем cookie-файлы, чтобы сайт работал корректно, а также для сбора статистики и улучшения работы сервиса. Продолжая пользоваться сайтом, вы соглашаетесь с их использованием. Подробнее — в{' '}
          <Link to="/privacy" className="fh-cookie-banner__link">
            Политике конфиденциальности
          </Link>
          .
        </p>
        <button type="button" className="fh-cookie-banner__btn fh-oswald" onClick={accept}>
          OK
        </button>
      </div>
    </div>
  )
}

export default CookieConsent
