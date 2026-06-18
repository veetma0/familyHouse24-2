import { useEffect, useId, useRef } from 'react'
import { bnovoConfig } from '../config/bnovo'
import { mountBnovoWidget } from '../utils/bnovo'

function BnovoWidget({
  submitText = 'Показать варианты',
  widgetId,
  variant = 'hero',
  type = 'horizontal',
}) {
  const generatedId = useId().replace(/:/g, '')
  const containerId = widgetId || `_bn_widget_${generatedId}`
  const shellRef = useRef(null)
  const hasUid = Boolean(bnovoConfig.uid)
  const shellClass = [
    'bnovo-widget-shell',
    variant === 'light' ? 'bnovo-widget-shell--light' : 'bnovo-widget-shell--hero',
  ]
    .filter(Boolean)
    .join(' ')

  useEffect(() => {
    if (!hasUid) return undefined

    const frameId = window.requestAnimationFrame(() => {
      mountBnovoWidget(containerId, { type, text_submit: submitText, variant })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [containerId, hasUid, submitText, type, variant])

  useEffect(() => {
    const shell = shellRef.current
    if (!hasUid || !shell) return undefined

    const target = document.getElementById(containerId)
    if (!target) return undefined

    let collapsedHeight = null
    let resizeObserver = null
    const calendarGap = 20

    const expand = () => {
      shell.classList.add('is-expanded')
      shell.closest('.bnovo-availability-section')?.classList.add('is-widget-expanded')
      shell.closest('.hero-shell')?.classList.add('is-widget-expanded')
    }

    const collapse = () => {
      shell.classList.remove('is-expanded')
      shell.closest('.bnovo-availability-section')?.classList.remove('is-widget-expanded')
      shell.closest('.hero-shell')?.classList.remove('is-widget-expanded')
    }

    const applyCollapsedHeight = (height) => {
      collapsedHeight = height
      shell.style.setProperty('--bnovo-widget-height', `${height}px`)
      shell.classList.add('is-ready')
    }

    const syncIframe = (iframe) => {
      const height = Math.ceil(iframe.getBoundingClientRect().height)
      if (!height) return

      if (!collapsedHeight) {
        if (height >= 48 && height <= 200) {
          applyCollapsedHeight(height)
        }
        return
      }

      if (height > collapsedHeight + calendarGap) {
        expand()
        return
      }

      if (!shell.classList.contains('is-expanded') && height >= 48 && Math.abs(height - collapsedHeight) <= 10) {
        if (height !== collapsedHeight) {
          applyCollapsedHeight(height)
        }
      }
    }

    const onWindowBlur = () => {
      window.setTimeout(() => {
        const iframe = target.querySelector('iframe')
        if (iframe && document.activeElement === iframe) {
          expand()
        }
      }, 0)
    }

    const onDocumentPointerDown = (event) => {
      if (!shell.contains(event.target)) {
        collapse()
      }
    }

    const bindIframe = (iframe) => {
      if (!resizeObserver) {
        resizeObserver = new ResizeObserver(() => syncIframe(iframe))
        resizeObserver.observe(iframe)
      }

      syncIframe(iframe)
    }

    const bindTarget = () => {
      const iframe = target.querySelector('iframe')
      if (!iframe) return

      bindIframe(iframe)
    }

    const onShellPointerDown = (event) => {
      if (event.target instanceof HTMLIFrameElement) {
        expand()
      }
    }

    const mutationObserver = new MutationObserver(bindTarget)
    mutationObserver.observe(target, { childList: true, subtree: true })

    shell.addEventListener('mousedown', onShellPointerDown)
    window.addEventListener('blur', onWindowBlur)
    document.addEventListener('mousedown', onDocumentPointerDown)
    bindTarget()

    return () => {
      mutationObserver.disconnect()
      resizeObserver?.disconnect()
      shell.removeEventListener('mousedown', onShellPointerDown)
      window.removeEventListener('blur', onWindowBlur)
      document.removeEventListener('mousedown', onDocumentPointerDown)
      shell.classList.remove('is-expanded', 'is-ready')
      shell.style.removeProperty('--bnovo-widget-height')
    }
  }, [containerId, hasUid])

  if (!hasUid) {
    return (
      <p className={variant === 'light' ? 'bnovo-placeholder bnovo-placeholder--light' : 'bnovo-placeholder'}>
        Добавьте `VITE_BNOVO_UID`, чтобы включить онлайн-бронирование Bnovo.
      </p>
    )
  }

  return (
    <div className={shellClass} ref={shellRef}>
      <div className="bnovo-widget-slot" aria-hidden="true" />
      <div className="bnovo-widget-target" id={containerId}>
        <a href="https://bnovo.ru/" target="_blank" rel="noreferrer">
          Bnovo
        </a>
      </div>
    </div>
  )
}

export default BnovoWidget
