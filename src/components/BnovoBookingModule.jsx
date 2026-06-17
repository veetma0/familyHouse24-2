import { bnovoConfig } from '../config/bnovo'
import { getBnovoIframeUrl } from '../utils/bnovo'

const defaultUrl = 'https://bnovo.ru/'

function BnovoBookingModule() {
  if (!bnovoConfig.uid && !bnovoConfig.iframeUrl) {
    return (
      <div className="booking-helper">
        <h2>Нужна настройка Bnovo</h2>
        <p>
          Укажите `VITE_BNOVO_UID` и, при необходимости, `VITE_BNOVO_IFRAME_URL` в `.env`, чтобы
          отобразить модуль онлайн-бронирования.
        </p>
      </div>
    )
  }

  const iframeUrl = getBnovoIframeUrl()

  return (
    <section className="booking-module-wrap" aria-label="Модуль онлайн-бронирования">
      <iframe
        title="Онлайн-бронирование Family House"
        src={iframeUrl || defaultUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  )
}

export default BnovoBookingModule
