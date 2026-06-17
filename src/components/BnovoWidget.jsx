import { useEffect, useMemo } from 'react'
import { bnovoConfig } from '../config/bnovo'
import { loadBnovoScript } from '../utils/bnovo'

function BnovoWidget() {
  const widgetId = useMemo(() => '_bn_widget_family_house', [])
  const hasUid = Boolean(bnovoConfig.uid)

  useEffect(() => {
    if (!hasUid) return undefined

    return loadBnovoScript(() => {
      window.Bnovo_Widget.open(widgetId, {
        type: 'horizontal',
        lcode: bnovoConfig.uid,
        lang: 'ru',
        width: '100%',
        background: '#eaf6fb',
        bg_alpha: '100',
        border_radius: '14',
        font_type: 'arial',
        font_size: '14',
        title_color: '#0f3a4c',
        inp_color: '#0f3a4c',
        inp_bordcolor: '#89bfd7',
        inp_bordhover: '#3e96be',
        btn_background: '#0f5d7a',
        btn_background_over: '#0a4a62',
        btn_textcolor: '#ffffff',
        btn_textover: '#ffffff',
        btn_bordcolor: '#0f5d7a',
        btn_bordhover: '#0a4a62',
        text_submit: 'Показать варианты',
        text_concierge: bnovoConfig.conciergeText,
        url: bnovoConfig.bookingPageUrl,
      })
    })
  }, [hasUid, widgetId])

  if (!hasUid) {
    return (
      <p className="bnovo-placeholder">
        Добавьте `VITE_BNOVO_UID`, чтобы включить онлайн-бронирование Bnovo.
      </p>
    )
  }

  return (
    <div className="bnovo-widget-shell">
      <div id={widgetId}>
        <a href="https://bnovo.ru/" target="_blank" rel="noreferrer">
          Bnovo
        </a>
      </div>
    </div>
  )
}

export default BnovoWidget
