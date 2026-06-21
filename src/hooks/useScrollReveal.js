import { useEffect } from 'react'

/**
 * Плавное появление при скролле. Тегирует элементы с [data-reveal]
 * (и их группы по родителю — лёгкий каскад) классом fh-reveal и
 * добавляет is-visible при попадании во вьюпорт. Уважает
 * prefers-reduced-motion.
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'))
    if (nodes.length === 0) return undefined

    nodes.forEach((el) => el.classList.add('fh-reveal'))

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
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

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    nodes.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
