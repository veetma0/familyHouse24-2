import { bnovoConfig } from '../config/bnovo'

const scriptId = 'bnovo-widget-script'

export function hasBnovoUid() {
  return Boolean(bnovoConfig.uid)
}

export function getBnovoIframeUrl() {
  if (bnovoConfig.iframeUrl) return bnovoConfig.iframeUrl
  if (!bnovoConfig.uid) return ''
  return `https://widget.bnovo.ru/?lcode=${encodeURIComponent(bnovoConfig.uid)}&lang=ru`
}

export function loadBnovoScript(onReady) {
  if (!hasBnovoUid()) return undefined

  const init = () => {
    if (!window.Bnovo_Widget) return
    window.Bnovo_Widget.init(onReady)
  }

  const existingScript = document.getElementById(scriptId)
  if (existingScript) {
    init()
    return undefined
  }

  const script = document.createElement('script')
  script.id = scriptId
  script.src = 'https://widget.bnovo.ru/v2/js/bnovo.js'
  script.async = true
  script.onload = init
  document.body.append(script)

  return () => {
    script.onload = null
  }
}
