/*
 * checkout.js
 * Trang thanh toán: tóm tắt đơn, kiểm tra form, rồi lưu booking demo vào localStorage.
 */

// Các dòng trong giỏ có tour còn tồn tại.
function checkoutItems() {
  return getCart().filter(entry => tourById(entry.tourId));
}

// Một tour trong phần tóm tắt đơn hàng.
function checkoutItemHtml(entry) {
  const tour = tourById(entry.tourId);
  const guests = plural(guestsOf(entry), 'guest', 'guests');
  return `
    <div class="summary-item">
      <img src="${tour.image}" alt="" loading="lazy">
      <div>
        <strong>${tour.title}</strong>
        <span>${prettyDate(entry.date)} · ${guests}</span>
        <span>${formatMoney(lineTotal(entry))}</span>
      </div>
    </div>`;
}

// Giỏ trống: ẩn form và thanh tiến trình, chỉ hiện lời nhắc chọn tour.
function showEmptyCheckout(summaryBox, form) {
  summaryBox.innerHTML = `
    <div class="checkout-empty-mark" aria-hidden="true">↗</div>
    <p class="section-kicker">NO TRIPS TO CONFIRM</p>
    <h2>Start with a coastal trip.</h2>
    <p>Add a sample tour and its date and guest count will appear here before you enter checkout details.</p>
    <a class="button button--coral" href="tours.html">Browse coastal trips <span aria-hidden="true">↗</span></a>`;
  form.hidden = true;
  document.querySelector('.checkout-layout').classList.add('checkout-layout--empty');
  document.getElementById('checkout-progress').hidden = true;
}

// Phần tóm tắt đơn hàng bên phải.
function showCheckoutSummary(summaryBox, items) {
  let html = '';
  for (const entry of items) {
    html += checkoutItemHtml(entry);
  }
  summaryBox.innerHTML = `
    <h2>Order summary</h2>
    <div class="checkout-summary-items">${html}</div>
    <div class="summary-total"><span>Example trip total</span><span>${formatMoney(cartTotal(items))}</span></div>
    <a class="text-link checkout-edit-link" href="booking.html">← Edit trip dates and guests</a>
    <p>Sample flow only. No card details are collected, no payment is processed, and no tour is reserved.</p>`;
}

function setupCheckout() {
  const form = document.getElementById('checkout-form');
  const summaryBox = document.getElementById('checkout-summary');
  const message = document.getElementById('checkout-message');
  if (!form) return;

  const items = checkoutItems();
  if (items.length === 0) {
    showEmptyCheckout(summaryBox, form);
    return;
  }
  setJourneyProgress('checkout-progress', 3);
  showCheckoutSummary(summaryBox, items);

  form.addEventListener('submit', event => {
    event.preventDefault();

    // 1. Lấy giá trị các ô.
    const name = document.getElementById('checkout-name').value.trim();
    const email = document.getElementById('checkout-email').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const city = document.getElementById('checkout-city').value.trim();
    const note = document.getElementById('checkout-note').value.trim();
    const payment = form.querySelector('input[name="payment"]:checked'); // nút radio đang được chọn (hoặc null)

    // 2. Kiểm tra từng ô.
    clearFormErrors(form);
    let valid = true;
    if (name.length < 2) {
      showFieldError(form, 'name', 'Enter your name.');
      valid = false;
    }
    if (!isValidEmail(email)) {
      showFieldError(form, 'email', 'Enter a valid email address.');
      valid = false;
    }
    if (!isValidPhone(phone)) {
      showFieldError(form, 'phone', 'Enter a valid phone number.');
      valid = false;
    }
    if (city === '') {
      showFieldError(form, 'city', 'Enter your city or address.');
      valid = false;
    }

    // 3. Có lỗi thì báo và dừng lại, không cho thanh toán.
    if (!payment) {
      showFormMessage(message, 'error', 'Choose one of the sample payment methods to continue.');
    } else if (!valid) {
      showFormMessage(message, 'error', 'Check the highlighted fields and try again.');
    }
    if (!valid) {
      focusFirstError(form);
      return;
    }
    if (!payment) {
      form.querySelector('input[name="payment"]').focus();
      return;
    }

    // 4. Giỏ có thể đã bị xóa ở tab khác.
    const cartNow = checkoutItems();
    if (cartNow.length === 0) {
      location.href = 'booking.html';
      return;
    }

    // 5. Lưu booking, xóa giỏ và chuyển sang trang thành công.
    const booking = {
      id: 'CC-' + Date.now(), // mã booking, ví dụ CC-1771234567890
      createdAt: new Date().toISOString(),
      items: cartNow,
      total: cartTotal(cartNow),
      status: 'Confirmed · demo',
      payment: payment.value,
      customer: { name: name, email: email, phone: phone, city: city, note: note }
    };
    addBooking(booking);
    clearCart();
    location.href = 'success.html?id=' + booking.id;
  });

  // Gõ lại vào một ô thì xóa lỗi của ô đó.
  form.addEventListener('input', event => {
    if (event.target.name) showFieldError(form, event.target.name, '');
  });
}
