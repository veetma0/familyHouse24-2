import { useEffect } from 'react'

function revealInViewport(el) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  return rect.bottom > 0 && rect.top < vh
}

/**
 * Плавное появление при скролле. Элементы с [data-reveal] получают
 * класс is-visible при попадании во вьюпорт (стили — в App.css).
 * Внутри одного родителя добавляем лёгкий каскад. Уважает
 * prefers-reduced-motion.
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'))
    if (nodes.length === 0) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 720px)').matches

    if (reduce || mobile || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((el) => el.classList.add('is-visible'))
      return undefined
    }

    // Лёгкий каскад внутри одного родителя
    const idxByParent = new Map()
    nodes.forEach((el) => {
      if (el.dataset.revealStagger === 'off') return
      const parent = el.parentElement
      const i = idxByParent.get(parent) ?? 0
      el.style.setProperty('--fh-delay', `${Math.min(i, 6) * 70}ms`)
      idxByParent.set(parent, i + 1)
    })

    const reveal = (el, obs) => {
      el.classList.add('is-visible')
      obs?.unobserve(el)
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target, obs)
        })
      },
      { threshold: [0, 0.08, 0.15], rootMargin: '0px 0px 8% 0px' },
    )

    nodes.forEach((el) => {
      if (revealInViewport(el)) reveal(el)
      else observer.observe(el)
    })

    let scrollTimer
    const onScroll = () => {
      clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => {
        nodes.forEach((el) => {
          if (!el.classList.contains('is-visible') && revealInViewport(el)) reveal(el, observer)
        })
      }, 100)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      clearTimeout(scrollTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
