import { bnovoConfig } from '../config/bnovo'

const scriptId = 'bnovo-widget-script'

let scriptLoading = null
let widgetInitialized = false
let initRequested = false
const widgetOpenQueue = []

export function hasBnovoUid() {
  return Boolean(bnovoConfig.uid)
}

const uuidUidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function getDaysBetween(startKey, endKey) {
  const start = new Date(`${startKey}T00:00:00`)
  const end = new Date(`${endKey}T00:00:00`)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null

  const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())
  const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())
  return Math.max(0, Math.round((endUtc - startUtc) / 86400000))
}

function appendBookingDates(url, dates = {}) {
  const { checkIn, checkOut } = dates
  if (!checkIn && !checkOut) return url

  const nextUrl = new URL(url)
  if (checkIn) {
    nextUrl.searchParams.set('date_from', checkIn)
    nextUrl.searchParams.set('dfrom', checkIn)
    nextUrl.searchParams.set('checkin', checkIn)
    nextUrl.searchParams.set('dates_preset', 'on')

    const daysFromToday = getDaysBetween(new Date().toISOString().slice(0, 10), checkIn)
    if (daysFromToday === 0) {
      nextUrl.searchParams.set('dfrom_today', 'on')
    } else if (daysFromToday !== null) {
      nextUrl.searchParams.set('dfrom_value', String(daysFromToday))
    }
  }
  if (checkOut) {
    nextUrl.searchParams.set('date_to', checkOut)
    nextUrl.searchParams.set('dto', checkOut)
    nextUrl.searchParams.set('checkout', checkOut)

    if (checkIn) {
      const nights = getDaysBetween(checkIn, checkOut)
      if (nights === 1) {
        nextUrl.searchParams.set('dto_nextday', 'on')
      } else if (nights !== null) {
        nextUrl.searchParams.set('dto_value', String(nights))
      }
    }
  }

  return nextUrl.toString()
}

export function getBnovoIframeUrl(dates) {
  if (bnovoConfig.iframeUrl) return appendBookingDates(bnovoConfig.iframeUrl, dates)
  if (!bnovoConfig.uid) return ''

  if (uuidUidPattern.test(bnovoConfig.uid)) {
    return appendBookingDates(
      `https://reservationsteps.ru/rooms/index/${encodeURIComponent(bnovoConfig.uid)}?lang=ru`,
      dates,
    )
  }

  return appendBookingDates(
    `https://widget.bnovo.ru/?lcode=${encodeURIComponent(bnovoConfig.uid)}&lang=ru`,
    dates,
  )
}

const widgetThemes = {
  hero: {
    background: '#f4f9f7',
    bg_alpha: '100',
    title_color: '#14241d',
    inp_color: '#14241d',
    inp_bordcolor: '#b8d4c8',
    inp_bordhover: '#1f7a5a',
    btn_background: '#1f7a5a',
    btn_background_over: '#163a2e',
    btn_textcolor: '#ffffff',
    btn_textover: '#ffffff',
    btn_bordcolor: '#1f7a5a',
    btn_bordhover: '#163a2e',
  },
  light: {
    background: '#ffffff',
    bg_alpha: '100',
    title_color: '#14241d',
    inp_color: '#14241d',
    inp_bordcolor: '#c5ddd3',
    inp_bordhover: '#1f7a5a',
    btn_background: '#1f7a5a',
    btn_background_over: '#163a2e',
    btn_textcolor: '#ffffff',
    btn_textover: '#ffffff',
    btn_bordcolor: '#1f7a5a',
    btn_bordhover: '#163a2e',
  },
}

export function getBnovoWidgetOptions(overrides = {}) {
  const { variant = 'hero', ...rest } = overrides
  const theme = widgetThemes[variant] || widgetThemes.hero

  return {
    type: 'horizontal',
    lcode: bnovoConfig.uid,
    lang: 'ru',
    width: '100%',
    border_radius: '10',
    font_type: 'arial',
    font_size: '14',
    text_submit: 'Показать варианты',
    text_concierge: bnovoConfig.conciergeText,
    url: bnovoConfig.bookingPageUrl,
    ...theme,
    ...rest,
  }
}

function flushWidgetQueue() {
  if (!window.Bnovo_Widget) return

  while (widgetOpenQueue.length) {
    const { containerId, options } = widgetOpenQueue.shift()
    window.Bnovo_Widget.open(containerId, getBnovoWidgetOptions(options))
  }
}

function ensureWidgetInitialized() {
  if (widgetInitialized) {
    flushWidgetQueue()
    return
  }

  if (!window.Bnovo_Widget || initRequested) return

  initRequested = true
  window.Bnovo_Widget.init(() => {
    widgetInitialized = true
    flushWidgetQueue()
  })
}

function loadBnovoScriptAsset() {
  if (window.Bnovo_Widget) {
    return Promise.resolve()
  }

  if (scriptLoading) {
    return scriptLoading
  }

  const existingScript = document.getElementById(scriptId)
  if (existingScript) {
    scriptLoading = new Promise((resolve) => {
      const check = () => {
        if (window.Bnovo_Widget) {
          resolve()
          return
        }
        window.setTimeout(check, 50)
      }
      check()
    })
    return scriptLoading
  }

  scriptLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://widget.bnovo.ru/v2/js/bnovo.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Bnovo widget script failed to load'))
    document.body.append(script)
  })

  return scriptLoading
}

export function mountBnovoWidget(containerId, options) {
  if (!hasBnovoUid()) return undefined

  if (widgetInitialized && window.Bnovo_Widget) {
    window.Bnovo_Widget.open(containerId, getBnovoWidgetOptions(options))
    return undefined
  }

  const existingIndex = widgetOpenQueue.findIndex((item) => item.containerId === containerId)
  if (existingIndex >= 0) {
    widgetOpenQueue[existingIndex] = { containerId, options }
  } else {
    widgetOpenQueue.push({ containerId, options })
  }

  loadBnovoScriptAsset()
    .then(() => {
      ensureWidgetInitialized()
    })
    .catch(() => {
      const index = widgetOpenQueue.findIndex((item) => item.containerId === containerId)
      if (index >= 0) widgetOpenQueue.splice(index, 1)
    })

  return undefined
}

/** @deprecated Use mountBnovoWidget */
export function loadBnovoScript(onReady) {
  if (!hasBnovoUid()) return undefined

  loadBnovoScriptAsset().then(() => {
    if (!window.Bnovo_Widget) return

    window.Bnovo_Widget.init(() => {
      onReady?.()
    })
  })

  return undefined
}
