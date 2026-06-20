import { getBnovoIframeUrl, hasBnovoUid } from '../utils/bnovo'

function BnovoOverlay({ isOpen, onClose, dates }) {
  if (!isOpen) return null

  const iframeUrl = getBnovoIframeUrl(dates)

  return (
    <div className="booking-overlay" role="presentation" onClick={onClose}>
      <section
        className="booking-overlay-card"
        role="dialog"
        aria-modal="true"
        aria-label="Бронирование в Bnovo"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" aria-label="Закрыть окно" onClick={onClose}>
          ×
        </button>
        {hasBnovoUid() ? (
          <iframe
            key={iframeUrl}
            title="Онлайн-бронирование Family House"
            src={iframeUrl}
            loading="lazy"
          />
        ) : (
          <div className="booking-helper">
            <h2>Нужна настройка Bnovo</h2>
            <p>Добавьте VITE_BNOVO_UID, чтобы запускать бронирование в модальном окне.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default BnovoOverlay
