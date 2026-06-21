import { useEffect } from 'react'
import { getBnovoIframeUrl, hasBnovoUid } from '../utils/bnovo'

function BnovoOverlay({ isOpen, onClose, dates }) {
  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const iframeUrl = getBnovoIframeUrl(dates)

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label="Бронирование в Bnovo"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <span className="modal-title">Онлайн-бронирование</span>
          <button type="button" className="modal-close" aria-label="Закрыть окно" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {hasBnovoUid() ? (
            <iframe
              key={iframeUrl}
              title="Онлайн-бронирование Family House"
              src={iframeUrl}
              loading="lazy"
            />
          ) : (
            <div style={{ padding: '40px' }}>
              <h2>Нужна настройка Bnovo</h2>
              <p>Добавьте VITE_BNOVO_UID, чтобы запускать бронирование в модальном окне.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default BnovoOverlay
