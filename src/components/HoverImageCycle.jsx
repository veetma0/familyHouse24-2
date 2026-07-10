import { useEffect, useRef, useState } from 'react'

function HoverImageCycle({ images, alt, className, style, imgStyle, intervalMs = 1100 }) {
  const list = (images || []).filter(Boolean)
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!hovered || list.length <= 1) return undefined

    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % list.length)
    }, intervalMs)

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [hovered, list.length, intervalMs])

  const handleEnter = () => {
    setHovered(true)
    setIndex(0)
  }

  const handleLeave = () => {
    setHovered(false)
    setIndex(0)
    if (timerRef.current) window.clearInterval(timerRef.current)
  }

  if (!list.length) return null

  return (
    <div
      className={className}
      style={style}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <img
        src={list[index]}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...imgStyle }}
      />
    </div>
  )
}

export default HoverImageCycle
