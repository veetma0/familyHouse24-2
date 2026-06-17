import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'

const serviceItems = [
  {
    icon: 'services',
    title: 'Услуги',
    text: 'По желанию: завтрак, обед, ужин. Дома оборудованы Wi-Fi. Прокат: инвентарь, катеров, лодок, велосипедов, снегоходы, воздушные подушки, русский бильярд и покерный стол. Есть детская площадка. Возможно пребывание с животными.',
  },
  {
    icon: 'eco',
    title: 'Экологически-чистый район',
    text: 'Family House расположен в окружении леса на берегу реки Сить, в 50 метрах от воды. Пешие и вело-прогулки по территории помогают перезагрузиться и восстановить силы.',
  },
  {
    icon: 'fishing',
    title: 'Одна из лучших рыболовных зон России',
    text: 'Рыбинское водохранилище известно богатой рыбалкой. Более 35 видов рыб и сопровождение опытных гидов делают поездки по-настоящему результативными.',
  },
  {
    icon: 'places',
    title: 'Прогулки по историческим местам',
    text: 'Вблизи базы находятся памятные локации Ярославской области: древни, старинные храмы и живописные маршруты для неспешных семейных прогулок.',
  },
  {
    icon: 'sport',
    title: 'Спортивно-оздоровительные объекты',
    text: 'На территории базы расположены русская баня, площадки для волейбола и футбола, а также удобные маршруты для прогулок по лесным тропам.',
  },
  {
    icon: 'nature',
    title: 'Грибные и ягодные места',
    text: 'Окружающие леса богаты грибами и ягодами. В сезон гости возвращаются домой с полными корзинами после прогулок по природным маршрутам.',
  },
]

const houseItems = [
  {
    title: 'Дом «Сосновый»',
    details: 'До 4 гостей • 2 спальни • Терраса',
    description:
      'Уютный дом для спокойного семейного отдыха: каминная зона, панорамные окна и вид на сосновый бор.',
  },
  {
    title: 'Дом «Прибрежный»',
    details: 'До 6 гостей • 3 спальни • Вид на реку',
    description:
      'Просторный дом у воды с большой гостиной и обеденной зоной. Идеален для выходных с друзьями.',
  },
  {
    title: 'Дом «Охотничий»',
    details: 'До 8 гостей • 4 спальни • Баня рядом',
    description:
      'Формат для активного отдыха: удобная планировка, отдельная зона хранения снаряжения и приватный участок.',
  },
  {
    title: 'Дом «Семейный»',
    details: 'До 5 гостей • 2 спальни • Детская зона',
    description:
      'Светлый дом с мягкой атмосферой: комфортная кухня, зона для игр и удобный выход к прогулочным маршрутам.',
  },
]

function App() {
  useHashScroll()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
    </Routes>
  )
}

function useHashScroll() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const id = location.hash.slice(1)
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.pathname, location.hash])
}

function ServiceIcon({ type }) {
  return (
    <svg viewBox="0 0 48 48" className="service-icon-svg" aria-hidden="true">
      <circle cx="24" cy="24" r="20" className="icon-stroke" />
      {type === 'services' && (
        <>
          <path d="M16 21h16" className="icon-stroke" />
          <path d="M20 18v6" className="icon-stroke" />
          <path d="M28 18v6" className="icon-stroke" />
          <path d="M18 30h12" className="icon-stroke" />
        </>
      )}
      {type === 'eco' && (
        <>
          <path d="M18 31c7 0 12-5 12-12-7 0-12 5-12 12Z" className="icon-stroke" />
          <path d="M18 31c0-4 2-7 5-9" className="icon-stroke" />
        </>
      )}
      {type === 'fishing' && (
        <>
          <path d="M15 25c2-3 5-5 9-5 4 0 7 2 9 5-2 3-5 5-9 5-4 0-7-2-9-5Z" className="icon-stroke" />
          <circle cx="22" cy="25" r="1" className="icon-stroke" />
          <path d="M34 18v10c0 2-1.5 3-3 3" className="icon-stroke" />
          <path d="M31 31l2 2 2-2" className="icon-stroke" />
        </>
      )}
      {type === 'places' && (
        <>
          <path d="M16 31h16" className="icon-stroke" />
          <path d="M20 31V20h8v11" className="icon-stroke" />
          <path d="M18 20h12l-6-5-6 5Z" className="icon-stroke" />
        </>
      )}
      {type === 'sport' && (
        <>
          <path d="M24 18v7" className="icon-stroke" />
          <path d="M20 22l4 3 4-3" className="icon-stroke" />
          <path d="M18 31l3-5h6l3 5" className="icon-stroke" />
        </>
      )}
      {type === 'nature' && (
        <>
          <path d="M24 16v16" className="icon-stroke" />
          <path d="M24 19c-4 0-7 3-7 7 4 0 7-3 7-7Z" className="icon-stroke" />
          <path d="M24 23c4 0 7 3 7 7-4 0-7-3-7-7Z" className="icon-stroke" />
        </>
      )}
    </svg>
  )
}

function SiteHeader() {
  return (
    <header className="header">
      <Link to="/" className="brand" aria-label="Перейти на главную страницу">
        <div className="brand-mark" aria-hidden="true">
          <span className="pine"></span>
          <span className="river"></span>
        </div>
        <div>
          <p className="brand-title">FAMILY HOUSE</p>
          <p className="brand-subtitle">Ваш идеальный уикенд на природе</p>
        </div>
      </Link>

      <nav className="nav" aria-label="Главная навигация">
        <Link to="/#about">О нас</Link>
        <Link to="/#houses">Дома</Link>
        <Link to="/#services">Услуги</Link>
        <Link to="/#gallery">Галерея</Link>
        <Link to="/#contacts">Контакты</Link>
        <Link to="/booking" className="button button-book">
          Забронировать
        </Link>
      </nav>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} FAMILY HOUSE. Загородная база отдыха в Ярославской области.</p>
      <div className="footer-links">
        <Link to="/#contacts">Контакты</Link>
        <Link to="/#services">Услуги</Link>
        <Link to="/booking">Бронирование</Link>
      </div>
    </footer>
  )
}

function HomePage() {
  return (
    <main className="page">
      <section className="screen">
        <SiteHeader />

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-placeholder" role="img" aria-label="Место для панорамного фото базы">
            <span>[ЗДЕСЬ БУДЕТ ФОТО: ПАНОРАМА БАЗЫ НА ЗАКАТЕ С РЕКОЙ]</span>
          </div>

          <div className="hero-content">
            <p className="hero-kicker">Ярославская область, река Сить</p>
            <h1 id="hero-title">ОТДЫХ НА ПРИРОДЕ В ЯРОСЛАВСКОЙ ОБЛАСТИ</h1>
            <p className="hero-description">
              Рыбалка, охота и уютные дома на берегу реки Сить. Идеальное место для
              семейного отдыха и встреч с друзьями.
            </p>
            <div className="hero-actions">
              <a href="#houses" className="button button-primary" aria-label="Перейти к выбору дома">
                Выбрать дом
              </a>
              <a href="#gallery" className="button button-ghost" aria-label="Смотреть видео обзор">
                Смотреть видео-обзор
              </a>
            </div>
          </div>

          <div className="hero-info" aria-label="Преимущества базы">
            <article className="info-card">
              <span className="icon" aria-hidden="true">🐟</span>
              <p>Более 35 видов рыб</p>
            </article>
            <article className="info-card">
              <span className="icon" aria-hidden="true">🏡</span>
              <p>Комфортные дома</p>
            </article>
            <article className="info-card">
              <span className="icon" aria-hidden="true">🌿</span>
              <p>Грибы и ягоды</p>
            </article>
          </div>
        </section>
      </section>

      <section className="about section-anchor" id="about">
        <div className="about-content">
          <p className="hero-kicker">О базе Family House</p>
          <h2>ОТДОХНИТЕ ОТ СУЕТЫ.</h2>
          <p>
            Family House — это современный эко-отель в сосновом бору, в 10 км от Рыбинского
            водохранилища. Мы создали все условия для комфортной рыбалки, охоты и семейного
            отдыха.
          </p>
          <a href="#services" className="about-link">
            Подробнее о нас
          </a>
        </div>
        <div
          className="about-placeholder"
          role="img"
          aria-label="Место для фото интерьера гостиной или вида из окна дома"
        >
          <span>[ЗДЕСЬ БУДЕТ ФОТО: ИНТЕРЬЕР ГОСТИНОЙ ИЛИ ВИД ИЗ ОКНА ДОМА]</span>
        </div>
      </section>

      <section className="content-section section-anchor" id="houses">
        <p className="hero-kicker">Размещение</p>
        <h2>ДОМА ДЛЯ КОМФОРТНОГО ОТДЫХА</h2>
        <p>
          Выберите дом для семьи или компании друзей: просторные гостиные, оборудованные кухни
          и уютные террасы с видом на природу.
        </p>
        <div className="houses-scroller" aria-label="Список домов для отдыха">
          {houseItems.map((house) => (
            <article className="house-card" key={house.title}>
              <div
                className="house-photo-placeholder"
                role="img"
                aria-label={`Место для фото дома ${house.title}`}
              >
                [ЗДЕСЬ БУДЕТ ФОТО ДОМА]
              </div>
              <div className="house-content">
                <h3>{house.title}</h3>
                <p className="house-meta">{house.details}</p>
                <p>{house.description}</p>
                <Link to="/booking" className="button button-primary house-book-btn">
                  Забронировать
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section section-anchor" id="services">
        <p className="hero-kicker">Сервис и впечатления</p>
        <h2>УСЛУГИ ДЛЯ ИДЕАЛЬНОГО УИКЕНДА</h2>
        <p className="services-intro">
          Мы собрали всё, чтобы отдых на базе был насыщенным, комфортным и запоминающимся в
          любое время года.
        </p>
        <div className="services-grid">
          {serviceItems.map((item) => (
            <article className="service-card" key={item.title}>
              <div className="service-icon" aria-hidden="true">
                <ServiceIcon type={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section section-anchor" id="gallery">
        <p className="hero-kicker">Атмосфера</p>
        <h2>ГАЛЕРЕЯ FAMILY HOUSE</h2>
        <p>
          Здесь будут лучшие кадры территории, домов и отдыха у реки. Для демонстрации экрана
          используется дизайнерская заглушка.
        </p>
        <div className="gallery-placeholder" role="img" aria-label="Заглушка для галереи фотографий">
          [ЗДЕСЬ БУДЕТ ФОТОГАЛЕРЕЯ БАЗЫ]
        </div>
      </section>

      <section className="content-section section-anchor" id="contacts">
        <p className="hero-kicker">Связь</p>
        <h2>КОНТАКТЫ</h2>

        <div className="contacts-grid">
          <div className="contacts-card">
            <p><strong>Офис работает:</strong> с 10:00 до 20:00</p>
            <p><strong>Режим:</strong> без выходных</p>
            <p><strong>Адрес:</strong> Ярославская обл., Брейтовский р-н, д. Набережная</p>
            <p>
              <strong>Телефон:</strong>{' '}
              <a href="tel:+74951510082" className="contact-link">
                +7 (495) 151-00-82
              </a>
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:Familyhouse.baza@gmail.com" className="contact-link">
                Familyhouse.baza@gmail.com
              </a>
            </p>
          </div>

          <div className="contacts-card">
            <p><strong>Услугу предоставляет:</strong></p>
            <p>ООО «НОВЫЕ ТЕХНОЛОГИИ»</p>
            <p><strong>ИНН:</strong> 9724129100</p>
            <p><strong>ОГРН:</strong> 1237700267221</p>
          </div>
        </div>

        <div className="map-wrap">
          <iframe
            title="Карта Family House"
            src="https://yandex.ru/map-widget/v1/?text=FamilyHouse%2C%20%D0%AF%D1%80%D0%BE%D1%81%D0%BB%D0%B0%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB.%2C%20%D0%91%D1%80%D0%B5%D0%B9%D1%82%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%20%D1%80-%D0%BD%2C%20%D0%B4.%20%D0%9D%D0%B0%D0%B1%D0%B5%D1%80%D0%B5%D0%B6%D0%BD%D0%B0%D1%8F&z=12"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

function BookingPage() {
  return (
    <main className="page booking-page">
      <section className="screen booking-screen">
        <SiteHeader />
        <section className="booking-form-wrap" aria-labelledby="booking-title">
          <p className="hero-kicker">Бронирование</p>
          <h1 id="booking-title">ЗАБРОНИРОВАТЬ ОТДЫХ В FAMILY HOUSE</h1>
          <p className="hero-description">
            Оставьте заявку, и мы подберем дом и программу отдыха под ваш формат поездки.
          </p>
          <form className="booking-form">
            <label>
              Имя
              <input type="text" name="name" placeholder="Введите имя" required />
            </label>
            <label>
              Телефон
              <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required />
            </label>
            <label>
              Даты отдыха
              <input type="text" name="dates" placeholder="Например, 15.07 - 20.07" required />
            </label>
            <label>
              Количество гостей
              <input type="number" name="guests" min="1" max="20" placeholder="4" required />
            </label>
            <label className="full-width">
              Комментарий
              <textarea name="comment" rows="4" placeholder="Пожелания по дому, рыбалке, охоте..." />
            </label>
            <button type="submit" className="button button-primary full-width">
              Отправить заявку
            </button>
          </form>
          <Link to="/" className="about-link">
            Вернуться на главную
          </Link>
        </section>
      </section>
      <SiteFooter />
    </main>
  )
}

export default App
