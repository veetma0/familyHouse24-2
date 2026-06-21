import { useRef, useState } from 'react'
import SiteShell from '../components/SiteShell'
import { useShell } from '../components/shellContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { wrap, kickerGold, photoPlh } from '../data/styles'

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

  const digits = (v) => (v || '').replace(/\D/g, '')

  const onSubmit = (e) => {
    e.preventDefault()
    const name = (nameRef.current?.value || '').trim()
    const phone = (phoneRef.current?.value || '').trim()
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
    if (nameRef.current) nameRef.current.value = ''
    if (phoneRef.current) phoneRef.current.value = ''
    if (emailRef.current) emailRef.current.value = ''
    if (msgRef.current) msgRef.current.value = ''
    setErrors({})
    addToast('success', 'Сообщение отправлено', 'Спасибо! Мы ответим в течение часа в рабочее время.')
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
            Контакты и поддержка
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(243,237,224,0.78)', margin: '18px 0 0', maxWidth: 560 }}>
            Ответим на вопросы о бронировании, рыбалке и проезде. Напишите — поможем выбрать дом и спланировать поездку.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="fh-section-pad" style={{ padding: '72px 32px 100px' }}>
        <div className="fh-contacts" style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>

          <div data-reveal data-reveal-stagger="off" style={{ background: '#faf6ee', border: '1px solid rgba(43,38,32,0.08)', borderRadius: 8, padding: 40 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 28, color: '#2b2620', margin: '0 0 6px' }}>Написать нам</h2>
            <p style={{ fontSize: 14.5, color: '#6b6157', margin: '0 0 28px' }}>Ответим в течение часа в рабочее время.</p>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
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
              <button type="submit" className="fh-btn-primary" style={{ background: '#b8762e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 600, padding: 15, borderRadius: 999, marginTop: 4 }}>
                Отправить сообщение
              </button>
            </form>
          </div>

          <div data-reveal data-reveal-stagger="off" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: '#2b2620', borderRadius: 8, padding: 36 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 24, color: '#f6efe1', margin: '0 0 24px' }}>Прямой контакт</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {infoBlock('Телефон', (
                  <a href="tel:+74951510082" style={{ fontSize: 20, fontWeight: 600, color: '#f6efe1', textDecoration: 'none' }}>+7 (495) 151-00-82</a>
                ))}
                {infoBlock('Email', (
                  <a href="mailto:Familyhouse.baza@gmail.com" style={{ fontSize: 17, fontWeight: 500, color: '#f6efe1', textDecoration: 'none' }}>Familyhouse.baza@gmail.com</a>
                ))}
                {infoBlock('Адрес', (
                  <div style={{ fontSize: 16, color: '#e7ddc8', lineHeight: 1.5 }}>Ярославская область,<br />д. Набережная · Рыбинское вдхр.</div>
                ))}
                {infoBlock('Приём гостей', (
                  <div style={{ fontSize: 16, color: '#e7ddc8' }}>Ежедневно, 8:00 – 22:00</div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(43,38,32,0.1)', minHeight: 240, backgroundImage: photoPlh('#e4d8c2', '#d8cab0', 14), display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#8a7a5f' }}>карта проезда · 270 км от Москвы</span>
            </div>
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
