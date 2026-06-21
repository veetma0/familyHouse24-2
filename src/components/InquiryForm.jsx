import { useState } from 'react'
import { bnovoConfig } from '../config/bnovo'
import { contactInfo } from '../data/siteData'

const initialState = {
  name: '',
  phone: '',
  email: '',
  interest: 'Летняя рыбалка',
  message: '',
}

function InquiryForm({ onBookNow, compact = false }) {
  const [formData, setFormData] = useState(initialState)
  const [status, setStatus] = useState('idle')

  const endpoint = import.meta.env.VITE_INQUIRY_FORM_ENDPOINT || ''

  const onChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!response.ok) throw new Error('form submit failed')
      } else {
        const subject = encodeURIComponent('Запрос с сайта Family House')
        const body = encodeURIComponent(
          `Имя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\nИнтерес: ${formData.interest}\nКомментарий: ${formData.message}`,
        )
        window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`
      }

      setStatus('success')
      setFormData(initialState)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="inquiry-form" onSubmit={onSubmit}>
      <div className="form-field">
        <label htmlFor="if-name">Имя</label>
        <input id="if-name" name="name" value={formData.name} onChange={onChange} required />
      </div>
      <div className="form-field">
        <label htmlFor="if-phone">Телефон</label>
        <input id="if-phone" name="phone" value={formData.phone} onChange={onChange} required />
      </div>
      <div className="form-field">
        <label htmlFor="if-email">Email</label>
        <input id="if-email" type="email" name="email" value={formData.email} onChange={onChange} required />
      </div>
      <div className="form-field">
        <label htmlFor="if-interest">Что интересно</label>
        <select id="if-interest" name="interest" value={formData.interest} onChange={onChange}>
          <option>Летняя рыбалка</option>
          <option>Зимняя рыбалка</option>
          <option>Дом для семьи</option>
          <option>Выезд компанией</option>
        </select>
      </div>
      {!compact && (
        <div className="form-field">
          <label htmlFor="if-message">Комментарий</label>
          <textarea id="if-message" name="message" value={formData.message} onChange={onChange} rows={3} />
        </div>
      )}

      <button type="submit" className="button button-primary button-block" disabled={status === 'loading'}>
        {status === 'loading' ? 'Отправляем...' : compact ? 'Получить подбор' : 'Получить консультацию'}
      </button>

      {status === 'success' && (
        <div className="form-success">
          Спасибо! Мы свяжемся с вами в ближайшее время.
        </div>
      )}
      {status === 'error' && (
        <p className="form-note">
          Не удалось отправить заявку. Позвоните нам: {contactInfo.phone}.
        </p>
      )}

      {(status === 'success' || !endpoint) && bnovoConfig.uid && onBookNow && (
        <button type="button" className="button button-outline button-block" onClick={onBookNow}>
          Перейти к бронированию в Bnovo
        </button>
      )}
    </form>
  )
}

export default InquiryForm
