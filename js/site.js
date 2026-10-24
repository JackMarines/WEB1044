/*
 * site.js
 * Phần dùng chung trên mọi trang: đầu trang, chân trang, menu, số lượng trên thanh đầu,
 * nút trái tim / nút "Add" / nút đăng xuất, và hiệu ứng hiện dần khi cuộn.
 */

// Liên kết tới 4 tour đầu tiên, dùng trong menu "Destinations".
function destinationLinksHtml() {
  let html = '';
  for (const tour of COAST_TOURS.slice(0, 4)) {
    html += `<a href="${tourHref(tour.id)}">${tour.place} <span aria-hidden="true">↗</span></a>`;
  }
  return html;
}

// Chưa đăng nhập: icon "Login". Đã đăng nhập: nút "Hi, tên · Sign out".
function accountControlHtml() {
  const user = getCurrentUser();
  if (user) {
    // Tên do người dùng gõ khi đăng ký, nên phải escapeHtml trước khi đưa vào innerHTML.
    const firstName = escapeHtml(user.name.split(' ')[0]);
    return `<button class="account-chip" type="button" data-account data-action="sign-out" aria-label="Hi, ${firstName} · Sign out">Hi, ${firstName}<span class="account-chip-out">· Sign out</span></button>`;
  }
  return `<a class="header-icon" href="login.html" data-account aria-label="Login"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.4"/><path d="M5.5 20c.7-3.1 3.1-4.7 6.5-4.7s5.8 1.6 6.5 4.7"/></svg></a>`;
}

function headerHtml() {
  return `
    <div class="togo-topbar">
      <div class="topbar-inner">
        <span class="topbar-note">Vietnam coastal tours, planned at your pace</span>
        <div class="topbar-contact"><span>Questions?</span><a href="contact.html">Contact us <span aria-hidden="true">↗</span></a></div>
      </div>
    </div>
    <div class="header-inner">
      <a class="brand" href="index.html" aria-label="Togo home"><img src="assets/color.svg" alt="Togo"></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
        <span class="menu-lines" aria-hidden="true"></span><span class="sr-only">Open navigation</span>
      </button>
      <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
        <a href="index.html" data-nav="home">Home</a>
        <div class="nav-menu">
          <button class="nav-menu-trigger" type="button" aria-expanded="false" aria-controls="destinations-menu">Destinations <span class="nav-caret" aria-hidden="true"></span></button>
          <div class="mega-menu" id="destinations-menu">
            <section>
              <p class="menu-eyebrow">GO SOMEWHERE NEW</p><h2>Top destinations</h2>
              <div class="mega-menu-links">${destinationLinksHtml()}</div>
              <a class="mega-all-link" href="tours.html">View all destinations</a>
            </section>
            <section>
              <p class="menu-eyebrow">TRIP IDEAS</p><h2>Find your kind of day</h2>
              <div class="mega-menu-links">
                <a href="tours.html?category=On%20the%20water">On the water <span aria-hidden="true">→</span></a>
                <a href="tours.html?category=Coast%20%26%20culture">Coast &amp; culture <span aria-hidden="true">→</span></a>
                <a href="search.html?q=island">Island escapes <span aria-hidden="true">→</span></a>
                <a href="search.html?q=coast">Coastal favourites <span aria-hidden="true">→</span></a>
              </div>
            </section>
            <aside class="mega-promo"><strong>Vinh Hy Bay</strong><a href="tour.html?id=vinh-hy-reef">Explore the coast ↗</a></aside>
          </div>
        </div>
        <a href="tours.html" data-nav="tours">Tour listing</a>
        <div class="nav-menu">
          <button class="nav-menu-trigger" type="button" aria-expanded="false" aria-controls="pages-menu">Pages <span class="nav-caret" aria-hidden="true"></span></button>
          <div class="mega-menu mega-menu--pages" id="pages-menu">
            <section>
              <p class="menu-eyebrow">YOUR TRIP</p><h2>Booking</h2>
              <div class="mega-menu-links">
                <a href="search.html">Search tours <span aria-hidden="true">→</span></a>
                <a href="favorites.html">My wishlist <span class="menu-count" data-favorite-count>0</span></a>
                <a href="booking.html">My booking <span class="menu-count" data-cart-count>0</span></a>
                <a href="history.html">Booking history <span aria-hidden="true">→</span></a>
                <a href="success.html">Booking confirmation <span aria-hidden="true">→</span></a>
              </div>
            </section>
            <section>
              <p class="menu-eyebrow">ABOUT TOGO</p><h2>More to explore</h2>
              <div class="mega-menu-links">
                <a href="about.html">About us <span aria-hidden="true">→</span></a>
                <a href="contact.html">Contact <span aria-hidden="true">→</span></a>
                <a href="register.html">Register <span aria-hidden="true">→</span></a>
                <a href="login.html">Login <span aria-hidden="true">→</span></a>
              </div>
            </section>
            <aside class="mega-promo"><strong>Plan your next trip</strong><a href="tours.html">Browse all tours ↗</a></aside>
          </div>
        </div>
      </nav>
      <div class="header-actions">
        <a class="header-icon" href="booking.html" aria-label="My booking">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
          <span class="header-count" data-cart-count>0</span>
        </a>
        ${accountControlHtml()}
        <a class="header-book-button" href="tours.html">Book tour</a>
      </div>
    </div>`;
}

function footerHtml() {
  return `
    <section class="footer-cta">
      <div class="footer-cta-content">
        <p class="section-kicker section-kicker--light">YOUR NEXT JOURNEY STARTS HERE</p>
        <h2>Ready to explore? Find a day by the water</h2>
        <p>Browse coastal destinations, compare sample tours, and choose an experience that suits your pace.</p>
        <a class="togo-pill togo-pill--orange" href="tours.html">Browse coastal tours <span aria-hidden="true">↗</span></a>
      </div>
    </section>
    <div class="footer-main">
      <div class="footer-main-inner">
        <div class="footer-brand">
          <a href="index.html" aria-label="Togo home"><img src="assets/white.svg" alt="Togo"></a>
          <p>Discover a new destination and make every journey count.</p>
        </div>
        <section class="footer-column">
          <h2>Company</h2>
          <nav aria-label="Company"><a href="about.html">About us</a><a href="tours.html">Tour listing</a><a href="favorites.html">My wishlist</a><a href="history.html">Booking history</a></nav>
        </section>
        <section class="footer-column">
          <h2>Services</h2>
          <nav aria-label="Services"><a href="search.html">Search tours</a><a href="booking.html">My booking</a><a href="checkout.html">Checkout</a><a href="success.html">Booking success</a></nav>
        </section>
        <section class="footer-column">
          <h2>Need help?</h2>
          <nav aria-label="Help"><a href="contact.html">Contact</a><a href="register.html">Register</a><a href="login.html">Login</a></nav>
        </section>
      </div>
      <div class="footer-bottom"><span>Coursework demonstration. Example tours and prices.</span><a href="#main">Back to top ↑</a></div>
    </div>`;
}

// Đưa đầu trang và chân trang vào <header class="site-header"> và <footer class="site-footer">.
function renderSiteChrome() {
  const header = document.querySelector('.site-header');
  const footer = document.querySelector('.site-footer');

  if (header) {
    if (currentPage !== 'home') header.classList.add('site-header--inner');
    header.innerHTML = headerHtml();
  }
  if (footer) {
    footer.innerHTML = footerHtml();
  }

  // Đánh dấu link của trang đang xem. Trang tìm kiếm và chi tiết tour thuộc mục "Tour listing".
  for (const link of document.querySelectorAll('[data-nav]')) {
    const page = link.dataset.nav;
    if (page === currentPage || (page === 'tours' && (currentPage === 'search' || currentPage === 'tour'))) {
      link.setAttribute('aria-current', 'page');
    }
  }
}

// Lần đầu tải trang thì không cho số đếm nảy, chỉ nảy khi người dùng làm thay đổi số.
let headerCountsReady = false;

// Đổi số trong một ô đếm; nếu số khác trước thì cho ô đó nảy lên (xem .is-bumping trong style.css).
function setCount(element, count) {
  if (headerCountsReady && element.textContent !== String(count)) {
    element.classList.add('is-bumping');
    setTimeout(() => element.classList.remove('is-bumping'), 400);
  }
  element.textContent = count;
}

// Cập nhật số khách trong giỏ và số tour yêu thích trên đầu trang.
function updateHeaderCounts() {
  const guestCount = totalGuests(getCart());
  for (const element of document.querySelectorAll('[data-cart-count]')) {
    setCount(element, guestCount);
  }

  const favoriteCount = getFavorites().length;
  for (const element of document.querySelectorAll('[data-favorite-count]')) {
    setCount(element, favoriteCount);
  }
  headerCountsReady = true;
}

// Vẽ lại phần tài khoản trên đầu trang (sau khi đăng nhập hoặc đăng xuất).
function refreshAccountControl() {
  const oldControl = document.querySelector('[data-account]');
  if (oldControl) oldControl.outerHTML = accountControlHtml();
}

/* ---------- Menu ---------- */

function setupNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;
  const menus = nav.querySelectorAll('.nav-menu');

  // Nút ☰ chỉ hiện trên màn hình nhỏ. Nút đang hiện = đang ở giao diện điện thoại.
  function isMobileLayout() {
    return getComputedStyle(toggle).display !== 'none';
  }

  // Mở / đóng menu điện thoại.
  function setMobileMenu(open) {
    toggle.setAttribute('aria-expanded', open);
    toggle.querySelector('.sr-only').textContent = open ? 'Close navigation' : 'Open navigation';
    if (open) document.body.classList.add('nav-open');
    else document.body.classList.remove('nav-open');
  }

  // Mở / đóng một menu thả xuống.
  function setDropdown(menu, open) {
    if (open) menu.classList.add('is-open');
    else menu.classList.remove('is-open');
    menu.querySelector('.nav-menu-trigger').setAttribute('aria-expanded', open);
  }

  function closeAllDropdowns() {
    for (const menu of menus) setDropdown(menu, false);
  }

  toggle.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('nav-open');
    setMobileMenu(!isOpen);
  });

  for (const menu of menus) {
    const trigger = menu.querySelector('.nav-menu-trigger');

    // Bấm nút: đang đóng thì mở (và đóng menu kia), đang mở thì đóng.
    // Trên máy tính, rê chuột đã mở menu rồi, nên bấm chuột lúc đó thì giữ menu mở.
    trigger.addEventListener('click', () => {
      const isOpen = menu.classList.contains('is-open');
      const hovering = !isMobileLayout() && menu.matches(':hover');
      closeAllDropdowns();
      if (!isOpen || hovering) setDropdown(menu, true);
    });

    // Máy tính: rê chuột vào thì mở, rê ra thì đóng.
    menu.addEventListener('mouseenter', () => {
      if (isMobileLayout()) return;
      closeAllDropdowns();
      setDropdown(menu, true);
    });
    menu.addEventListener('mouseleave', () => {
      if (!isMobileLayout()) setDropdown(menu, false);
    });
  }

  // Bấm một link trong menu thì đóng menu.
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) {
      setMobileMenu(false);
      closeAllDropdowns();
    }
  });

  // Bấm ra ngoài đầu trang thì đóng menu thả xuống.
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeAllDropdowns();
  });

  // Phím Escape: đóng menu và đưa con trỏ về nút đã mở menu.
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const openMenu = nav.querySelector('.nav-menu.is-open');
    const mobileWasOpen = document.body.classList.contains('nav-open');

    setMobileMenu(false);
    closeAllDropdowns();

    if (mobileWasOpen) toggle.focus();
    else if (openMenu) openMenu.querySelector('.nav-menu-trigger').focus();
  });
}

/* ---------- Các nút dùng chung: trái tim, Add, Sign out ---------- */

// Cập nhật mọi nút trái tim của một tour đang có trên trang.
function refreshFavoriteButtons(tour, saved) {
  for (const button of document.querySelectorAll('[data-action="favorite"]')) {
    if (button.dataset.tourId !== tour.id) continue;
    button.setAttribute('aria-pressed', saved);
    button.setAttribute('aria-label', favoriteLabel(tour, saved));
    button.innerHTML = heartIconHtml(saved);
    // Vừa lưu thì cho trái tim "nảy" một lần (xem .is-popping trong style.css).
    if (saved) {
      button.classList.add('is-popping');
      setTimeout(() => button.classList.remove('is-popping'), 450);
    }
  }
}

function handleFavoriteClick(button) {
  const tour = tourById(button.dataset.tourId);
  if (!tour) return;

  const saved = toggleFavorite(tour.id);
  updateHeaderCounts();
  // Trang yêu thích thì vẽ lại cả danh sách; trang khác chỉ cần đổi icon trái tim.
  if (currentPage === 'favorites') renderFavorites();
  else refreshFavoriteButtons(tour, saved);

  if (saved) showToast(tour.title + ' saved for later.');
  else showToast(tour.title + ' removed from saved trips.');
}

// Nút "Add" trên thẻ tour: thêm 1 người lớn, ngày mặc định là 14 ngày sau.
function handleAddClick(button) {
  const tour = tourById(button.dataset.tourId);
  if (!tour) return;
  addTripToCart(tour, defaultTripDate(), 1, 0);
  if (currentPage === 'booking') renderBooking();
}

function handleSignOutClick() {
  signOut();
  refreshAccountControl();
  // Nút cũ đã bị thay bằng link "Login", nên đưa con trỏ sang link mới.
  document.querySelector('[data-account]').focus();
  showToast('You have signed out of the demo account.');
}

// Event delegation: một trình nghe click cho cả trang, xem nút được bấm có data-action gì.
// Cách này vẫn chạy với các nút được tạo sau bằng innerHTML.
function setupGlobalActions() {
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    switch (button.dataset.action) {
      case 'favorite':
        event.preventDefault();
        handleFavoriteClick(button);
        break;
      case 'add':
        handleAddClick(button);
        break;
      case 'sign-out':
        handleSignOutClick();
        break;
    }
  });
}

/* ---------- Hiệu ứng hiện dần khi cuộn tới ---------- */

function setupScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (elements.length === 0) return;
  // Class này bật CSS làm mờ các phần tử; chỉ bật khi JS chạy, để trang không bị trống nếu JS lỗi.
  document.documentElement.classList.add('js-enabled');

  function revealVisibleElements() {
    for (const element of elements) {
      const top = element.getBoundingClientRect().top;
      if (top < window.innerHeight - 60) element.classList.add('is-visible');
    }
  }

  // Kiểm tra lúc tải trang, mỗi lần cuộn, và khi đổi kích thước cửa sổ (bố cục thay đổi có thể đưa phần tử vào màn hình).
  revealVisibleElements();
  window.addEventListener('scroll', revealVisibleElements);
  window.addEventListener('resize', revealVisibleElements);
}
