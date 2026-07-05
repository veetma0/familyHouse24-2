import { useRef, useState } from 'react'
import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { contact, contactCards, mapEmbedUrl, faq, legal } from '../data/siteData'
import { kicker, kickerGold, h2 } from '../data/styles'

const inputStyle = {
  width: '100%',
  background: '#fff',
  border: '1px solid rgba(43,38,32,0.16)',
  borderRadius: 8,
  padding: '13px 16px',
  fontSize: 15,
  color: '#2b2620',
  outline: 'none',
}
const labelStyle = { display: 'block', fontSize: 13, fontWeight: 700, color: '#4a4339', marginBottom: 8 }
const errStyle = { display: 'block', fontSize: 13, color: '#a14334', marginTop: 6 }

function ContactsContent() {
  const { addToast } = useShell()
  useScrollReveal()

  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const emailRef = useRef(null)
  const topicRef = useRef(null)
  const msgRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [openFaq, setOpenFaq] = useState(0)

  const digits = (v) => (v || '').replace(/\D/g, '')

  // Собрать заявку из полей и открыть мессенджер с предзаполненным текстом.
  const send = (channel) => {
    const name = (nameRef.current?.value || '').trim()
    const phone = (phoneRef.current?.value || '').trim()
    const email = (emailRef.current?.value || '').trim()
    const topic = (topicRef.current?.value || '').trim()
    const msg = (msgRef.current?.value || '').trim()
    const errs = {}
    if (!name) errs.name = true
    if (digits(phone).length < 10) errs.phone = true
    if (msg.length < 5) errs.msg = true
    if (Object.keys(errs).length) {
      setErrors(errs)
      addToast('error', 'Не отправлено', 'Заполните имя, телефон и сообщение.')
      return
    }

    const lines = [
      'Заявка с сайта «Семейный дом»',
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      email ? `Email: ${email}` : null,
      topic ? `Тема: ${topic}` : null,
      `Сообщение: ${msg}`,
    ].filter(Boolean)
    const text = encodeURIComponent(lines.join('\n'))

    const url =
      channel === 'telegram'
        ? `https://t.me/${contact.telegram}?text=${text}`
        : `https://wa.me/${contact.phoneDigits}?text=${text}`
    window.open(url, '_blank', 'noopener,noreferrer')

    if (nameRef.current) nameRef.current.value = ''
    if (phoneRef.current) phoneRef.current.value = ''
    if (emailRef.current) emailRef.current.value = ''
    if (msgRef.current) msgRef.current.value = ''
    setErrors({})
    addToast('success', 'Открываем мессенджер…', 'Заявка подставлена в чат — отправьте её, и мы ответим в течение часа.')
  }

  return (
    <>
      {/* HERO */}
      <section style={{ background: '#221d18', padding: '60px 32px 46px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <span style={kickerGold}>На связи каждый день</span>
          <h1 className="fh-oswald" style={{ fontSize: 'clamp(38px,5vw,72px)', fontWeight: 700, textTransform: 'uppercase', color: '#f6efe1', margin: '12px 0 0' }}>
            Контакты
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#b3a68e', margin: '16px 0 0', maxWidth: 620 }}>
            Позвоните, напишите или приезжайте. Администратор отвечает с 10:00 до 20:00, без выходных. Точную геолокацию пришлём после брони.
          </p>
        </div>
      </section>

      {/* КАРТОЧКИ КОНТАКТОВ */}
      <section style={{ padding: '56px 32px 20px' }} className="fh-section-pad">
        <div className="fh-grid-3" style={{ maxWidth: 1180, margin: '0 auto' }}>
          {contactCards.map((cc) => (
            <a
              key={cc.label}
              href={cc.href}
              target={cc.href.startsWith('http') ? '_blank' : undefined}
              rel={cc.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              data-reveal
              className="fh-cardlift"
              style={{ display: 'flex', flexDirection: 'column', gap: 6, textDecoration: 'none', background: '#faf6ee', border: '1px solid rgba(43,38,32,0.09)', borderRadius: 8, padding: '26px 28px' }}
            >
              <span className="fh-oswald" style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b8762e' }}>{cc.label}</span>
              <span className="fh-oswald" style={{ fontSize: 22, fontWeight: 600, color: '#2b2620', lineHeight: 1.2 }}>{cc.value}</span>
              <span style={{ fontSize: 14, color: '#8c8071' }}>{cc.note}</span>
            </a>
          ))}
        </div>
      </section>

      {/* КАРТА */}
      <section style={{ padding: '30px 32px 40px' }} className="fh-section-pad">
        <div style={{ maxWidth: 1180, margin: '0 auto', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(43,38,32,0.12)', minHeight: 440 }} data-reveal data-reveal-stagger="off">
          <iframe src={mapEmbedUrl} title="Карта проезда — база «Семейный дом»" loading="lazy" allowFullScreen style={{ width: '100%', height: '100%', minHeight: 440, border: 0, display: 'block' }} />
        </div>
      </section>

      {/* ФОРМА ЗАЯВКИ (WhatsApp / Telegram) */}
      <section style={{ padding: '20px 32px 40px' }} className="fh-section-pad">
        <div style={{ maxWidth: 720, margin: '0 auto', background: '#faf6ee', border: '1px solid rgba(43,38,32,0.1)', borderRadius: 10, padding: '40px' }} data-reveal data-reveal-stagger="off">
          <span style={kicker}>Оставьте заявку</span>
          <h2 style={{ ...h2, fontSize: 'clamp(24px,3vw,34px)', color: '#2b2620', margin: '12px 0 6px' }}>Напишите — и мы всё устроим</h2>
          <p style={{ fontSize: 14.5, color: '#6b6157', margin: '0 0 26px' }}>Подберём дом, подскажем про рыбалку и дорогу. Ответим в течение часа в рабочее время.</p>
          <form onSubmit={(e) => { e.preventDefault(); send('whatsapp') }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={labelStyle}>Имя</label>
              <input ref={nameRef} type="text" placeholder="Как к вам обращаться" className="fh-input" style={inputStyle} />
              {errors.name && <span style={errStyle}>Пожалуйста, укажите имя</span>}
            </div>
            <div className="fh-form-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>Телефон</label>
                <input ref={phoneRef} type="tel" placeholder="+7 ___ ___ __ __" className="fh-input" style={inputStyle} />
                {errors.phone && <span style={errStyle}>Введите телефон</span>}
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input ref={emailRef} type="email" placeholder="можно не указывать" className="fh-input" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Тема</label>
              <select ref={topicRef} className="fh-input" style={inputStyle}>
                <option>Бронирование дома</option>
                <option>Вопрос о рыбалке</option>
                <option>Как добраться</option>
                <option>Другое</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Сообщение</label>
              <textarea ref={msgRef} rows={4} placeholder="Когда планируете приехать, сколько гостей, что важно?" className="fh-input" style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
              {errors.msg && <span style={errStyle}>Напишите пару слов о поездке</span>}
            </div>
            <div className="fh-form-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 4 }}>
              <button type="button" onClick={() => send('whatsapp')} className="fh-oswald fh-btn-primary" style={{ background: '#25a35a', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', padding: 15, borderRadius: 3 }}>
                Написать в WhatsApp
              </button>
              <button type="button" onClick={() => send('telegram')} className="fh-oswald fh-btn-dark" style={{ background: '#2b2620', color: '#f6efe1', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', padding: 15, borderRadius: 3 }}>
                Написать в Telegram
              </button>
            </div>
            <p style={{ fontSize: 13, color: '#9a8c74', margin: '2px 0 0', textAlign: 'center' }}>
              Заявка откроется в мессенджере с заполненным текстом — останется нажать «Отправить».
            </p>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '40px 32px 90px' }} className="fh-section-pad">
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }} data-reveal data-reveal-stagger="off">
            <span style={kicker}>Вопросы и ответы</span>
            <h2 style={{ ...h2, fontSize: 'clamp(30px,4vw,50px)', color: '#2b2620', margin: '12px 0 34px' }}>Частые вопросы</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faq.map((item, i) => {
              const open = openFaq === i
              return (
                <div key={item.q} data-reveal style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.1)', borderRadius: 8, overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: 'none', border: 'none', cursor: 'pointer', padding: '22px 26px', textAlign: 'left' }}
                  >
                    <span className="fh-oswald" style={{ fontSize: 18, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.01em', color: '#2b2620' }}>{item.q}</span>
                    <span className="fh-oswald" style={{ flex: 'none', fontSize: 26, fontWeight: 400, color: '#b8762e', lineHeight: 1 }}>{open ? '–' : '+'}</span>
                  </button>
                  {open && (
                    <p style={{ fontSize: 16, lineHeight: 1.7, color: '#6b6157', margin: 0, padding: '0 26px 24px' }}>{item.a}</p>
                  )}
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(43,38,32,0.1)', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: '#8a7a5f', margin: 0, lineHeight: 1.7 }}>
              {legal.company} · ИНН {legal.inn} · ОГРН {legal.ogrn}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

function ContactsPage() {
  return (
    <SiteShell activeId="contacts">
      <ContactsContent />
    </SiteShell>
  )
}

export default ContactsPage
