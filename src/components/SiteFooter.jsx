function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Family House, Ярославская область</p>
      <div className="footer-links">
        <a href="#about">О базе</a>
        <a href="#fishing">Рыбалка</a>
        <a href="#gear">Техника</a>
        <a href="#houses">Котеджи</a>
        <a href="#services">Услуги</a>
        <a href="#pricing">Цены</a>
        <a href="#reviews">Отзывы</a>
        <a href="#contacts">Контакты</a>
        <a
          href="https://www.instagram.com/familyhouse_baza?igshid=hbnt1uo470"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </footer>
  )
}

export default SiteFooter
