import { useState } from 'react'
import { bnovoConfig } from '../config/bnovo'

const initialState = {
  name: '',
  phone: '',
  email: '',
  interest: 'Летняя рыбалка',
  message: '',
}

function InquiryForm({ onBookNow }) {
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
        window.location.href = `mailto:Familyhouse.baza@gmail.com?subject=${subject}&body=${body}`
      }

      setStatus('success')
      setFormData(initialState)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="inquiry-form" onSubmit={onSubmit}>
      <label>
        Имя
        <input name="name" value={formData.name} onChange={onChange} required />
      </label>
      <label>
        Телефон
        <input name="phone" value={formData.phone} onChange={onChange} required />
      </label>
      <label>
        Email
        <input type="email" name="email" value={formData.email} onChange={onChange} required />
      </label>
      <label>
        Что интересно
        <select name="interest" value={formData.interest} onChange={onChange}>
          <option>Летняя рыбалка</option>
          <option>Зимняя рыбалка</option>
          <option>Котедж для семьи</option>
          <option>Выезд компанией</option>
        </select>
      </label>
      <label>
        Комментарий
        <textarea name="message" value={formData.message} onChange={onChange} rows={3} />
      </label>

      <button type="submit" className="button button-primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Отправляем...' : 'Получить консультацию'}
      </button>

      {status === 'success' && (
        <p className="form-status success">
          Спасибо, мы свяжемся с вами в ближайшее время. Если хотите оформить бронь сразу, нажмите
          кнопку ниже.
        </p>
      )}
      {status === 'error' && (
        <p className="form-status error">
          Не удалось отправить заявку. Позвоните нам по номеру +7 (495) 151-00-82.
        </p>
      )}

      {(status === 'success' || !endpoint) && bnovoConfig.uid && (
        <button type="button" className="button button-soft" onClick={onBookNow}>
          Перейти к бронированию в Bnovo
        </button>
      )}
    </form>
  )
}

export default InquiryForm
