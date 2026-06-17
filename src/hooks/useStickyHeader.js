import { useEffect, useState } from 'react'

/**
 * Управляет поведением «плавающей» шапки:
 * - прячется при прокрутке вниз;
 * - появляется при прокрутке вверх;
 * - всегда видна у самого верха страницы.
 *
 * Возвращает { hidden, pinned }:
 * - hidden  — шапку нужно увести за верхний край;
 * - pinned  — страница прокручена (нужен фон/тень для закреплённой шапки).
 */
export function useStickyHeader({ threshold = 8, offset = 80 } = {}) {
  const [hidden, setHidden] = useState(false)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const update = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY

      setPinned(currentY > offset)

      // У самого верха страницы шапка всегда видна.
      if (currentY <= offset) {
        setHidden(false)
      } else if (Math.abs(delta) > threshold) {
        // Прокрутка вниз — прячем, вверх — показываем.
        setHidden(delta > 0)
      }

      lastScrollY = currentY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold, offset])

  return { hidden, pinned }
}
