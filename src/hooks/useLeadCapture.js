import { useEffect, useMemo, useState } from 'react'

const storageKey = 'family-house-lead-popup-until'
const hideForDays = 7

function getStoredUntil() {
  const value = window.localStorage.getItem(storageKey)
  if (!value) return 0
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function shouldSuppressPopup() {
  const hiddenUntil = getStoredUntil()
  return Date.now() < hiddenUntil
}

export function useLeadCapture() {
  const [isLeadOpen, setLeadOpen] = useState(false)
  const [source, setSource] = useState('manual')

  const openLead = (nextSource = 'manual') => {
    if (shouldSuppressPopup()) return
    setSource(nextSource)
    setLeadOpen(true)
  }

  const closeLead = () => setLeadOpen(false)

  const snoozePopup = () => {
    const hiddenUntil = Date.now() + hideForDays * 24 * 60 * 60 * 1000
    window.localStorage.setItem(storageKey, String(hiddenUntil))
    setLeadOpen(false)
  }

  useEffect(() => {
    if (shouldSuppressPopup()) return undefined

    const timerId = window.setTimeout(() => openLead('time-delay'), 15000)
    let hasTriggeredScroll = false
    let hasTriggeredExit = false

    const onScroll = () => {
      if (hasTriggeredScroll || shouldSuppressPopup()) return
      const scrollTop = window.scrollY
      const fullHeight = document.documentElement.scrollHeight - window.innerHeight
      if (fullHeight <= 0) return
      if (scrollTop / fullHeight >= 0.65) {
        hasTriggeredScroll = true
        openLead('scroll-depth')
      }
    }

    const onMouseLeave = (event) => {
      if (hasTriggeredExit || shouldSuppressPopup()) return
      if (event.clientY > 14) return
      hasTriggeredExit = true
      openLead('exit-intent')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.clearTimeout(timerId)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return useMemo(
    () => ({
      isLeadOpen,
      source,
      openLead,
      closeLead,
      snoozePopup,
    }),
    [isLeadOpen, source],
  )
}
