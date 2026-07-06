function renderHeader(activePage) {
  const el = document.getElementById('site-header');
  if (!el) return;
  el.innerHTML = `
    <div class="header-inner">
      <a href="/index.html" class="brand">
        <img src="/images/logo.png" alt="Premier Cinema">
      </a>
      <nav class="main-nav">
        <a href="/index.html" data-i18n="nav_home" class="${activePage==='home'?'active':''}"></a>
        <a href="/index.html#afisha" data-i18n="nav_movies" class="${activePage==='movies'?'active':''}"></a>
        <a href="/index.html#zallar" data-i18n="nav_halls" class="${activePage==='halls'?'active':''}"></a>
        <a href="/index.html#manzil" data-i18n="nav_location"></a>
      </nav>
      <div class="header-actions">
        <div class="lang-switch">
          <button data-lang="uz">UZ</button>
          <button data-lang="ru">RU</button>
        </div>
        <a href="/index.html#afisha" class="btn btn-primary" data-i18n="nav_book" style="display:none" id="header-book-btn"></a>
      </div>
    </div>
  `;
  el.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  applyTranslations(el);
}

function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <h4 data-i18n="footer_about_title"></h4>
          <p data-i18n="footer_about_body" style="max-width:340px;"></p>
        </div>
        <div>
          <h4 data-i18n="footer_nav_title"></h4>
          <ul>
            <li><a href="/index.html" data-i18n="nav_home"></a></li>
            <li><a href="/index.html#afisha" data-i18n="nav_movies"></a></li>
            <li><a href="/index.html#zallar" data-i18n="nav_halls"></a></li>
            <li><a href="/index.html#manzil" data-i18n="nav_location"></a></li>
          </ul>
        </div>
        <div>
          <h4 data-i18n="footer_contact_title"></h4>
          <ul>
            <li><a href="tel:+998951467777">+998 95 146 77 77</a></li>
            <li><a href="https://t.me/premiercinemauz" target="_blank" rel="noopener">Telegram: @premiercinemauz</a></li>
            <li><a href="https://www.instagram.com/premiercinema.uz/" target="_blank" rel="noopener">Instagram: premiercinema.uz</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span id="footer-year"></span> Premier Cinema. <span data-i18n="footer_rights"></span></span>
        <span data-i18n="footer_demo_note"></span>
      </div>
    </div>
  `;
  document.getElementById('footer-year').textContent = new Date().getFullYear();
  applyTranslations(el);
}

document.addEventListener('langchange', () => {
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === getLang());
  });
});
