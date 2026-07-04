import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { photos } from '../data/siteData'
import { kickerGold } from '../data/styles'

function PhotosContent() {
  const { openBooking } = useShell()
  useScrollReveal()

  return (
    <>
      {/* HERO */}
      <section style={{ background: '#221d18', padding: '60px 32px 46px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <span style={kickerGold}>Как у нас на самом деле</span>
          <h1 className="fh-oswald" style={{ fontSize: 'clamp(38px,5vw,72px)', fontWeight: 700, textTransform: 'uppercase', color: '#f6efe1', margin: '12px 0 0' }}>
            Фото и видео
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#b3a68e', margin: '16px 0 0', maxWidth: 640 }}>
            Дома и интерьеры, баня, катера и, конечно, рассветы над рекой Сить. Всё — с нашей базы, без стоков.
          </p>
        </div>
      </section>

      {/* МАСОНРИ */}
      <section style={{ padding: '44px 32px 90px' }} className="fh-section-pad">
        <div className="fh-masonry" style={{ maxWidth: 1280, margin: '0 auto' }}>
          {photos.map((ph) => (
            <figure key={ph.src} data-reveal data-reveal-stagger="off" className="fh-cardlift" style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
              <img src={ph.src} alt={ph.c} style={{ width: '100%', display: 'block' }} />
              <figcaption className="fh-oswald" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '22px 16px 12px', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff', background: 'linear-gradient(0deg, rgba(20,18,14,0.82), transparent)' }}>
                {ph.c}
              </figcaption>
            </figure>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button type="button" onClick={openBooking} className="fh-oswald fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '16px 40px', borderRadius: 3, boxShadow: '0 10px 28px rgba(184,118,46,0.36)' }}>
            Забронировать домик →
          </button>
        </div>
      </section>
    </>
  )
}

function PhotosPage() {
  return (
    <SiteShell activeId="photos">
      <PhotosContent />
    </SiteShell>
  )
}

export default PhotosPage
