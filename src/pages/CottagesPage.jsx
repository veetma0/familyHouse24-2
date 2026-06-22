import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { cottages, cottageAmenities, guestHouseRooms, banya, priceList } from '../data/siteData'
import { wrap, kicker, kickerGold, h2, photoPlh } from '../data/styles'

function CottagesContent() {
  const { openBooking } = useShell()
  const accommodationExtras = priceList.find((group) => group.group === 'Проживание — дополнительно')?.items ?? []
  useScrollReveal()

  return (
    <>
      {/* HERO */}
      <section className="fh-section-pad" style={{ background: '#221d18', padding: '80px 32px 72px' }}>
        <div style={wrap}>
          <span style={kickerGold}>Размещение</span>
          <h1 className="fh-h1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(40px, 5vw, 64px)', color: '#f6efe1', margin: '16px 0 0', letterSpacing: '-0.015em' }}>
            Ваш дом у самой воды
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(243,237,224,0.78)', margin: '18px 0 0', maxWidth: 620 }}>
            Уютный номер на двоих или просторный коттедж на дюжину гостей — на берегу реки Сить, среди сосен. В каждом тепло, чисто и пахнет деревом, а из окна — вода и рассвет.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <section className="fh-section-pad" style={{ padding: '64px 32px 40px' }}>
        <div className="fh-grid-2" style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
          {cottages.map((c) => (
            <div key={c.id} data-reveal className="fh-card-hover" style={{ background: '#faf6ee', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(43,38,32,0.08)', display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16 / 9',
                  background: c.image ? '#e4d8c2' : photoPlh('#e4d8c2', '#ddcfb4'),
                  backgroundImage: c.image ? `url(${c.image})` : undefined,
                  backgroundSize: c.image ? 'cover' : undefined,
                  backgroundPosition: c.image ? 'center' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {!c.image && <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#8a7a5f' }}>{c.plh}</span>}
                <span style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(34,29,24,0.85)', color: '#e7ddc8', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999 }}>{c.tag}</span>
              </div>
              <div style={{ padding: '28px 28px 30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 28, color: '#2b2620', margin: 0 }}>{c.name}</h3>
                <p style={{ fontSize: 14.5, color: '#6b6157', margin: '8px 0 18px' }}>{c.cap} · {c.beds} · {c.extra}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {c.features.map((f) => (
                    <span key={f} style={{ fontSize: 13, color: '#4a4339', background: '#efe6d4', border: '1px solid rgba(43,38,32,0.08)', padding: '6px 13px', borderRadius: 999 }}>{f}</span>
                  ))}
                </div>
                <div style={{ flex: 1, minHeight: 18 }} />
                <div className="fh-price-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, paddingTop: 22, borderTop: '1px solid rgba(43,38,32,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 13, color: '#9a8c74' }}>от</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: '#2b2620' }}>{c.price} ₽</span>
                    <span style={{ fontSize: 13, color: '#9a8c74' }}>/ ночь</span>
                  </div>
                  <button type="button" onClick={() => openBooking(c.name)} className="fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, padding: '13px 26px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                    Забронировать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {accommodationExtras.length > 0 && (
          <div style={{ ...wrap, marginTop: 24 }}>
            <div style={{ background: '#faf6ee', borderRadius: 6, border: '1px solid rgba(43,38,32,0.08)', padding: '20px 24px' }}>
              <div style={{ fontSize: 12, color: '#9a8c74', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
                Доп. услуги размещения
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 10 }}>
                {accommodationExtras.map((item) => (
                  <span key={item.t} style={{ fontSize: 14.5, color: '#4a4339' }}>
                    {item.t}: <strong>{item.price}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ГОСТЕВОЙ ДОМ — ВАРИАНТЫ РАЗМЕЩЕНИЯ */}
      <section className="fh-section-pad" style={{ padding: '40px 32px 24px' }}>
        <div style={wrap}>
          <span style={kicker}>Гостевой дом · 310 м²</span>
          <h2 style={{ ...h2, fontSize: 'clamp(28px, 3vw, 40px)', color: '#2b2620', margin: '14px 0 8px' }}>Выберите, как разместиться</h2>
          <p style={{ fontSize: 15.5, color: '#6b6157', margin: '0 0 36px', maxWidth: 620, lineHeight: 1.6 }}>
            Европейский уют, обеденная зона на 50 м², игровая на целых 100 м² и собственный винный погреб. Снимите комнату на двоих или займите весь дом большой компанией — места хватит всем.
          </p>
          <div className="fh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {guestHouseRooms.map((r) => (
              <div key={r.id} data-reveal className="fh-card-hover" style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    aspectRatio: '16 / 10',
                    background: r.image ? '#e4d8c2' : photoPlh('#e4d8c2', '#ddcfb4', 11),
                    backgroundImage: r.image ? `url(${r.image})` : undefined,
                    backgroundSize: r.image ? 'cover' : undefined,
                    backgroundPosition: r.image ? 'center' : undefined,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {!r.image && <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#8a7a5f' }}>{r.plh}</span>}
                </div>
                <div style={{ padding: '24px 26px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 24, color: '#2b2620', margin: 0 }}>{r.name}</h3>
                  <p style={{ fontSize: 14, color: '#6b6157', margin: '8px 0 4px' }}>{r.cap} · {r.beds}</p>
                  <p style={{ fontSize: 13.5, color: '#9a8c74', margin: 0, lineHeight: 1.5 }}>{r.bath}</p>
                  <div style={{ flex: 1, minHeight: 16 }} />
                  <div className="fh-price-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, paddingTop: 18, borderTop: '1px solid rgba(43,38,32,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      {r.price !== 'по запросу' && <span style={{ fontSize: 13, color: '#9a8c74' }}>от</span>}
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: r.price === 'по запросу' ? 22 : 28, color: '#2b2620' }}>{r.price === 'по запросу' ? 'по запросу' : `${r.price} ₽`}</span>
                      {r.price !== 'по запросу' && <span style={{ fontSize: 13, color: '#9a8c74' }}>/ ночь</span>}
                    </div>
                    <button type="button" onClick={() => openBooking(r.name)} className="fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, padding: '11px 20px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                      Выбрать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* РУССКАЯ БАНЯ */}
      <section className="fh-section-pad" style={{ padding: '56px 32px 40px' }}>
        <div className="fh-directions" style={{ ...wrap, background: '#221d18', borderRadius: 8, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1.05fr' }}>
          <div
            style={{
              minHeight: 360,
              background: banya.image ? '#3a342b' : photoPlh('#3a342b', '#332e26'),
              backgroundImage: banya.image ? `url(${banya.image})` : undefined,
              backgroundSize: banya.image ? 'cover' : undefined,
              backgroundPosition: banya.image ? 'center' : undefined,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!banya.image && <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(231,221,200,0.5)', textAlign: 'center', padding: '0 16px' }}>{banya.plh}</span>}
          </div>
          <div className="fh-directions-text" style={{ padding: '56px 56px' }}>
            <span style={kickerGold}>Баня</span>
            <h2 style={{ ...h2, fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#f6efe1', margin: '14px 0 0' }}>{banya.name}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#b3a68e', margin: '16px 0 24px' }}>
              {banya.area} · {banya.cap}. Жаркий пар, аромат кедра и потрескивание камина — лучший способ завершить день на воде.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
              {banya.features.map((f) => (
                <span key={f} style={{ fontSize: 13.5, color: '#e7ddc8', background: 'rgba(231,221,200,0.1)', border: '1px solid rgba(231,221,200,0.18)', padding: '7px 15px', borderRadius: 999 }}>{f}</span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: '#f6efe1' }}>{banya.price}</span>
              <span style={{ fontSize: 15, color: '#d8b483' }}>{banya.priceUnit}</span>
              <span style={{ fontSize: 14, color: '#8c8071' }}>· {banya.minNote}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, margin: '14px 0 28px' }}>
              {banya.extras.map((e) => (
                <span key={e.t} style={{ fontSize: 13.5, color: '#b3a68e' }}>{e.t} — <span style={{ color: '#e7ddc8', fontWeight: 600 }}>{e.d}</span></span>
              ))}
            </div>
            <button type="button" onClick={() => openBooking('Русская баня')} className="fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, padding: '14px 30px', borderRadius: 999 }}>
              Забронировать баню
            </button>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="fh-section-pad" style={{ padding: '32px 32px 100px' }}>
        <div style={{ ...wrap, background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 6, padding: '44px 48px' }} className="fh-block-pad">
          <span style={kicker}>Уже ждёт вас в каждом доме</span>
          <div className="fh-amenities fh-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginTop: 28 }}>
            {cottageAmenities.map((a) => (
              <div key={a.t}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: '#2b2620', margin: '0 0 6px' }}>{a.t}</h4>
                <p style={{ fontSize: 14, color: '#6b6157', margin: 0, lineHeight: 1.6 }}>{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function CottagesPage() {
  return (
    <SiteShell activeId="cottages">
      <CottagesContent />
    </SiteShell>
  )
}

export default CottagesPage
