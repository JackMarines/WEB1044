/*
 * app.js
 * File khởi động, được nạp cuối cùng trên mọi trang.
 * Vẽ đầu trang / chân trang chung, rồi chạy đúng chức năng của trang dựa vào <body data-page="...">.
 */

function startPage() {
  // Phần dùng chung trên mọi trang (site.js).
  renderSiteChrome();
  setupNavigation();
  setupGlobalActions();
  updateHeaderCounts();

  // Phần riêng của từng trang. Hàm của trang nào nằm trong file JS của trang đó.
  switch (currentPage) {
    case 'home':
      renderHome(); // home.js
      break;
    case 'tours':
      setupCatalog(); // catalog.js
      break;
    case 'search':
      setupSearch(); // catalog.js
      break;
    case 'favorites':
      renderFavorites(); // catalog.js
      break;
    case 'tour':
      renderDetail(); // tour-detail.js
      break;
    case 'booking':
      setupBooking(); // booking.js
      break;
    case 'checkout':
      setupCheckout(); // checkout.js
      break;
    case 'history':
      renderHistory(); // history.js
      break;
    case 'success':
      renderSuccess(); // history.js
      break;
    case 'register':
      setupRegister(); // account.js
      break;
    case 'login':
      setupLogin(); // account.js
      break;
    case 'contact':
      setupContact(); // contact-about.js
      break;
    case 'about':
      setupAboutTabs(); // contact-about.js
      break;
  }

  setupScrollReveal();
}

// Đã đăng nhập rồi thì không cần vào trang đăng nhập / đăng ký nữa: chuyển về trang chủ.
if ((currentPage === 'login' || currentPage === 'register') && getCurrentUser()) {
  location.replace('index.html');
} else {
  startPage();
}
