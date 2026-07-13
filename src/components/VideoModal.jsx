import { useEffect, useRef } from 'react'

function isInstagramUrl(url) {
  return /instagram\.com\/(?:tv|reel|p)\//i.test(url)
}

function getInstagramEmbedUrl(url) {
  const base = url.split('?')[0].replace(/\/$/, '')
  return base.endsWith('/embed') ? base : `${base}/embed`
}

function VideoModal({ src, title, onClose }) {
  const videoRef = useRef(null)
  const instagram = isInstagramUrl(src)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleClose = () => {
    videoRef.current?.pause()
    onClose()
  }

  return (
    <div
      className="fh-video-modal"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={handleClose}
    >
      <div className="fh-video-modal__panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="fh-video-modal__close" onClick={handleClose} aria-label="Закрыть">
          ×
        </button>
        {instagram ? (
          <iframe
            className="fh-video-modal__embed"
            src={getInstagramEmbedUrl(src)}
            title={title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            scrolling="no"
          />
        ) : (
          <video
            ref={videoRef}
            className="fh-video-modal__player"
            src={src}
            controls
            autoPlay
            playsInline
          >
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
        )}
      </div>
    </div>
  )
}

export default VideoModal
