import { useEffect, useMemo, useRef, useState } from 'react'

const Chevron = ({ direction }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {direction === 'prev' ? (
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
)

function ImageCarousel({
  images,
  cover,
  alt,
  className = '',
  style,
  intervalMs = 1100,
  autoPlay = false,
  showNav = false,
  navOnHover = false,
  fit = 'cover',
  resetSignal = 0,
}) {
  const list = useMemo(() => {
    const raw = (images || []).filter(Boolean)
    if (!cover || !raw.includes(cover)) return raw
    return [cover, ...raw.filter((src) => src !== cover)]
  }, [images, cover])

  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const timerRef = useRef(null)

  const shouldRun = !showNav && (autoPlay || hovered) && list.length > 1

  useEffect(() => {
    setIndex(0)
  }, [list.join('|')])

  useEffect(() => {
    if (resetSignal) setIndex(0)
  }, [resetSignal])

  useEffect(() => {
    if (!shouldRun) return undefined

    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % list.length)
    }, intervalMs)

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [shouldRun, list.length, intervalMs])

  const goPrev = (e) => {
    e?.stopPropagation()
    e?.preventDefault()
    setIndex((i) => (i - 1 + list.length) % list.length)
  }

  const goNext = (e) => {
    e?.stopPropagation()
    e?.preventDefault()
    setIndex((i) => (i + 1) % list.length)
  }

  const handleEnter = () => {
    if (showNav) return
    setHovered(true)
    setIndex(0)
  }

  const handleLeave = () => {
    if (showNav) return
    setHovered(false)
    if (!autoPlay) setIndex(0)
  }

  if (!list.length) return null

  const fitClass = fit === 'contain' ? ' fh-image-carousel--fit-contain' : ''
  const hoverNavClass = navOnHover ? ' fh-image-carousel--nav-hover' : ''

  return (
    <div
      className={`fh-image-carousel${showNav ? ' fh-image-carousel--nav' : ''}${fitClass}${hoverNavClass} ${className}`.trim()}
      style={style}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={showNav ? undefined : handleEnter}
      onBlur={showNav ? undefined : handleLeave}
      onKeyDown={(e) => {
        if (!showNav || list.length <= 1) return
        if (e.key === 'ArrowLeft') goPrev(e)
        if (e.key === 'ArrowRight') goNext(e)
      }}
    >
      <img src={list[index]} alt={alt} className="fh-image-carousel__img" />
      {showNav && list.length > 1 && (
        <>
          <button type="button" className="fh-carousel-nav fh-carousel-nav--prev" onClick={goPrev} aria-label="Предыдущее фото">
            <Chevron direction="prev" />
          </button>
          <button type="button" className="fh-carousel-nav fh-carousel-nav--next" onClick={goNext} aria-label="Следующее фото">
            <Chevron direction="next" />
          </button>
        </>
      )}
    </div>
  )
}

export default ImageCarousel
