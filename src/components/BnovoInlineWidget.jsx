import { useEffect } from 'react'
import { mountBnovoWidget, hasBnovoUid } from '../utils/bnovo'
import { bnovoConfig } from '../config/bnovo'

const containerId = 'bnovo-hero-widget'

/**
 * Монтирует реальный Bnovo JS-виджет прямо на странице (в hero).
 * Гость выбирает даты и сразу попадает в оплату — минимум шагов.
 * Если UID не задан, ничего не рендерим (overlay остаётся резервом).
 */
function BnovoInlineWidget({ submitText = 'Показать свободные домики' }) {
  useEffect(() => {
    if (!hasBnovoUid()) return
    mountBnovoWidget(containerId, {
      variant: 'hero',
      text_submit: submitText,
    })
  }, [submitText])

  if (!hasBnovoUid()) return null

  return (
    <div className="bnovo-inline-wrap">
      <span className="bnovo-inline-label">Подберите даты и забронируйте онлайн</span>
      <div id={containerId}>
        <a href={bnovoConfig.bookingPageUrl} id="_bnovo_link_" target="_blank" rel="noreferrer">
          Биново
        </a>
      </div>
    </div>
  )
}

export default BnovoInlineWidget
