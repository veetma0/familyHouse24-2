function LeadCaptureModal({ isOpen, title, text, onClose, onSnooze, children }) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" aria-label="Закрыть окно" onClick={onClose}>
          ×
        </button>
        <p className="kicker">Быстрый подбор</p>
        <h3>{title}</h3>
        <p>{text}</p>
        {children}
        <button type="button" className="button button-link" onClick={onSnooze}>
          Не показывать 7 дней
        </button>
      </section>
    </div>
  )
}

export default LeadCaptureModal
