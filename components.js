(function () {

  // ── CONFIG ────────────────────────────────────────────────────────────────
  const LOGO          = 'BELLA CLINIC';
  const PHONE_DISPLAY = '+7 707 659 90 92';
  const PHONE_HREF    = '+77076599092';
  const WA_NUMBER     = '77076599092';

  // Detect home page (works for file:// and http://)
  const path   = location.pathname;
  const isHome = path === '/' || path.endsWith('/index.html') || path === '/index.html';

  // Prefix nav links so they work from any inner page
  const h = anchor => isHome ? anchor : 'index.html' + anchor;

  // ── INJECT OVERRIDE CSS ───────────────────────────────────────────────────
  // Normalises the index.html grid-based footer to a simple flex layout
  const style = document.createElement('style');
  style.textContent = `
    footer#site-footer .footer-inner {
      display: flex !important;
      grid-template-columns: none !important;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      margin-bottom: 24px;
    }
    footer#site-footer .footer-bottom {
      display: block !important;
      text-align: center;
      padding-top: 0;
      border-top: none;
    }
    footer#site-footer .footer-links { display: flex; gap: 24px; flex-wrap: wrap; }
    footer#site-footer .footer-links a { font-size: 13px; color: rgba(255,255,255,0.5); transition: color 0.4s ease; }
    footer#site-footer .footer-links a:hover { color: #fff; }

    /* Mobile menu safety overrides */
    #mobileMenu.mobile-menu {
      z-index: 1200;
      padding: 96px 24px 40px;
      justify-content: flex-start;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    #mobileMenu.mobile-menu .close-menu {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 1;
    }
  `;
  document.head.appendChild(style);

  // ── HEADER ────────────────────────────────────────────────────────────────
  const headerPlaceholder = document.getElementById('site-header');
  if (headerPlaceholder) {
    headerPlaceholder.outerHTML = `
<header class="header${isHome ? '' : ' scrolled'}" id="header">
  <div class="header-inner">
    <a href="${isHome ? '#' : 'index.html'}" class="logo">${LOGO}</a>
    <nav class="nav">
      <a href="${h('#services')}">Услуги</a>
      <a href="${h('#doctors')}">Врачи</a>
      <a href="${h('#advantages')}">О клинике</a>
      <a href="${h('#results')}">Результаты</a>
      <a href="${h('#reviews')}">Отзывы</a>
      <a href="${h('#booking')}">Запись</a>
      <a href="${h('#contacts')}">Контакты</a>
    </nav>
    <a href="tel:${PHONE_HREF}" class="header-phone">${PHONE_DISPLAY}</a>
    <button class="burger" id="burgerBtn" aria-label="Меню">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;
  }

  // ── MOBILE MENU ───────────────────────────────────────────────────────────
  const menuPlaceholder = document.getElementById('site-mobile-menu');
  if (menuPlaceholder) {
    menuPlaceholder.outerHTML = `
<div class="mobile-menu" id="mobileMenu">
  <button class="close-menu" id="closeMenu">✕</button>
  <a href="${h('#services')}" onclick="closeMobileMenu()">Услуги</a>
  <a href="${h('#doctors')}" onclick="closeMobileMenu()">Врачи</a>
  <a href="${h('#advantages')}" onclick="closeMobileMenu()">О клинике</a>
  <a href="${h('#results')}" onclick="closeMobileMenu()">Результаты</a>
  <a href="${h('#reviews')}" onclick="closeMobileMenu()">Отзывы</a>
  <a href="${h('#booking')}" onclick="closeMobileMenu()">Запись</a>
  <a href="${h('#contacts')}" onclick="closeMobileMenu()">Контакты</a>
</div>`;
  }

  // ── FOOTER ────────────────────────────────────────────────────────────────
  const footerPlaceholder = document.getElementById('site-footer');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = `
<footer class="footer" id="site-footer">
  <div class="container">
    <div class="footer-inner">
      <a href="${isHome ? '#' : 'index.html'}" class="logo">${LOGO}</a>
      <div class="footer-links">
        <a href="${h('#services')}">Услуги</a>
        <a href="${h('#doctors')}">Врачи</a>
        <a href="${h('#booking')}">Запись</a>
        <a href="${h('#contacts')}">Контакты</a>
        <a href="#">Политика конфиденциальности</a>
      </div>
    </div>
    <div class="footer-bottom">© 2026 Bella Clinic. Все права защищены.</div>
  </div>
</footer>`;
  }

  // ── WHATSAPP BUTTON ───────────────────────────────────────────────────────
  const waPlaceholder = document.getElementById('site-whatsapp');
  if (waPlaceholder) {
    waPlaceholder.outerHTML = `<a href="https://wa.me/${WA_NUMBER}?text=Здравствуйте!%20Хочу%20записаться%20на%20приём." class="whatsapp-btn" target="_blank" title="Написать в WhatsApp">💬</a>`;
  }

  // ── MOBILE MENU LOGIC ─────────────────────────────────────────────────────
  function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) { menu.classList.remove('active'); document.body.style.overflow = ''; }
  }
  // Expose globally so onclick="closeMobileMenu()" in the injected HTML works
  window.closeMobileMenu = closeMobileMenu;

  const burger   = document.getElementById('burgerBtn');
  const closeBtn = document.getElementById('closeMenu');
  if (burger) {
    burger.addEventListener('click', function () {
      const menu = document.getElementById('mobileMenu');
      if (menu) { menu.classList.add('active'); document.body.style.overflow = 'hidden'; }
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);

  // ── HEADER SCROLL TRANSPARENCY (home page only) ───────────────────────────
  if (isHome) {
    const header = document.getElementById('header');
    if (header) {
      window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 60);
      });
    }
  }

})();
