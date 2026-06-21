import { useEffect } from 'react'

/**
 * Lightweight scroll-reveal. Targets sections (and explicitly tagged
 * `[data-reveal]` elements) and fades/slides them into view once as they
 * enter the viewport. Adds the `reveal` + `is-visible` classes, then stops
 * observing each element so the animation plays only once.
 *
 * Respects `prefers-reduced-motion`: if the user opts out of motion we
 * reveal everything immediately with no transition.
 *
 * No per-component changes needed — it auto-tags the page's main sections.
 */
const AUTO_SELECTORS = [
  'main > section',
  'main > .section',
  '.about-grid',
  '.stat-item',
  '.why-card',
  '.house-card',
  '.season-card',
  '.tech-card',
  '.amenity-card',
  '.fish-pill',
  '.review-card',
]

const STAGGER_SELECTOR =
  '.stat-item, .why-card, .house-card, .season-card, .tech-card, .amenity-card, .fish-pill, .review-card'

export function useScrollReveal() {
  useEffect(() => {
    const seen = new Set()
    const elements = []

    document.querySelectorAll(AUTO_SELECTORS.join(',')).forEach((el) => {
      if (seen.has(el)) return
      seen.add(el)
      el.classList.add('reveal')
      elements.push(el)
    })

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (seen.has(el)) return
      seen.add(el)
      el.classList.add('reveal')
      elements.push(el)
    })

    if (elements.length === 0) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    // Stagger children within the same parent for a gentle cascade.
    const indexByParent = new Map()
    elements.forEach((el) => {
      const parent = el.parentElement
      const i = indexByParent.get(parent) ?? 0
      if (el.matches(STAGGER_SELECTOR)) {
        el.style.setProperty('--reveal-delay', `${Math.min(i, 5) * 70}ms`)
        indexByParent.set(parent, i + 1)
      }
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
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
