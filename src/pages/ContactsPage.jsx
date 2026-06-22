import { useRef, useState } from 'react'
import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { wrap, kicker, kickerGold, h2 } from '../data/styles'
import { contact, mapEmbedUrl, faq, legal } from '../data/siteData'

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
const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#4a4339', marginBottom: 8 }
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
  const [openFaq, setOpenFaq] = useState(null)

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
      'Заявка с сайта Family House',
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

  const infoBlock = (label, children) => (
    <div>
      <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9a8c74', marginBottom: 5 }}>{label}</div>
      {children}
    </div>
  )

  return (
    <>
      {/* HERO */}
      <section className="fh-section-pad" style={{ background: '#221d18', padding: '80px 32px 72px' }}>
        <div style={wrap}>
          <span style={kickerGold}>Связаться с нами</span>
          <h1 className="fh-h1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(40px, 5vw, 64px)', color: '#f6efe1', margin: '16px 0 0', letterSpacing: '-0.015em' }}>
            Напишите — и мы всё устроим
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(243,237,224,0.78)', margin: '18px 0 0', maxWidth: 560 }}>
            Подберём дом, подскажем про рыбалку и дорогу, забронируем удобные даты. Просто напишите нам — а дальше дело за нами.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="fh-section-pad" style={{ padding: '72px 32px 100px' }}>
        <div className="fh-contacts" style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>

          <div data-reveal data-reveal-stagger="off" style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 8, padding: 40 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 28, color: '#2b2620', margin: '0 0 6px' }}>Расскажите о поездке</h2>
            <p style={{ fontSize: 14.5, color: '#6b6157', margin: '0 0 28px' }}>Прочитаем и ответим в течение часа в рабочее время.</p>
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
                <button type="button" onClick={() => send('whatsapp')} className="fh-btn-primary" style={{ background: '#25a35a', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, padding: 15, borderRadius: 999 }}>
                  Написать в WhatsApp
                </button>
                <button type="button" onClick={() => send('telegram')} className="fh-btn-dark" style={{ background: '#2b2620', color: '#f6efe1', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, padding: 15, borderRadius: 999 }}>
                  Написать в Telegram
                </button>
              </div>
              <p style={{ fontSize: 13, color: '#9a8c74', margin: '2px 0 0', textAlign: 'center' }}>
                Заявка откроется в мессенджере с заполненным текстом — останется нажать «Отправить».
              </p>
            </form>
          </div>

          <div data-reveal data-reveal-stagger="off" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: '#2b2620', borderRadius: 8, padding: 36 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 24, color: '#f6efe1', margin: '0 0 24px' }}>Позвоните или напишите</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {infoBlock('Телефон', (
                  <a href="tel:+74951510082" style={{ fontSize: 20, fontWeight: 600, color: '#f6efe1', textDecoration: 'none' }}>+7 (495) 151-00-82</a>
                ))}
                {infoBlock('Email', (
                  <a href="mailto:Familyhouse.baza@gmail.com" style={{ fontSize: 17, fontWeight: 500, color: '#f6efe1', textDecoration: 'none' }}>Familyhouse.baza@gmail.com</a>
                ))}
                {infoBlock('Instagram', (
                  <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 17, fontWeight: 500, color: '#f6efe1', textDecoration: 'none' }}>@{contact.instagram}</a>
                ))}
                {infoBlock('Адрес', (
                  <div style={{ fontSize: 16, color: '#e7ddc8', lineHeight: 1.5 }}>Ярославская обл., Брейтовский р-н,<br />д. Набережная · р. Сить</div>
                ))}
                {infoBlock('Режим работы офиса', (
                  <div style={{ fontSize: 16, color: '#e7ddc8' }}>{contact.office}</div>
                ))}
                {infoBlock('Заезд и выезд', (
                  <div style={{ fontSize: 16, color: '#e7ddc8' }}>Заезд {contact.checkIn}, выезд {contact.checkOut}</div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(43,38,32,0.1)', minHeight: 240, flex: 1, display: 'flex' }}>
              <iframe
                src={mapEmbedUrl}
                title="Карта проезда — Family House"
                loading="lazy"
                allowFullScreen
                style={{ width: '100%', height: '100%', minHeight: 240, border: 0, display: 'block' }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="fh-section-pad" style={{ padding: '0 32px 90px' }}>
        <div style={{ ...wrap, maxWidth: 860 }}>
          <span style={kicker}>Частые вопросы</span>
          <h2 style={{ ...h2, fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#2b2620', margin: '16px 0 36px' }}>Отвечаем заранее</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faq.map((item, i) => {
              const open = openFaq === i
              return (
                <div key={item.q} data-reveal style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.1)', borderRadius: 8, overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '20px 24px' }}
                  >
                    <span style={{ fontSize: 16.5, fontWeight: 600, color: '#2b2620' }}>{item.q}</span>
                    <span style={{ flex: 'none', fontSize: 22, lineHeight: 1, color: '#b8762e', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease' }}>+</span>
                  </button>
                  {open && (
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: '#6b6157', margin: 0, padding: '0 24px 22px' }}>{item.a}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* РЕКВИЗИТЫ */}
      <section className="fh-section-pad" style={{ padding: '0 32px 80px' }}>
        <div style={{ ...wrap, paddingTop: 28, borderTop: '1px solid rgba(43,38,32,0.1)' }}>
          <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9a8c74', marginBottom: 8 }}>Реквизиты</div>
          <p style={{ fontSize: 13.5, color: '#8a7a5f', margin: 0, lineHeight: 1.7 }}>
            {legal.company} · ИНН {legal.inn} · ОГРН {legal.ogrn}
          </p>
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
