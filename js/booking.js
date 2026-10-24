/*
 * booking.js
 * Trang giỏ tour: hiện các tour đã chọn, cho sửa ngày / số khách, xóa từng tour hoặc xóa hết,
 * và tính lại tổng tiền mẫu.
 */

// Một hàng tour trong giỏ: ảnh, tên, ô sửa ngày / số khách và nút xóa.
function cartLineHtml(entry, tour) {
  const id = entry.lineId;
  return `
    <article class="booking-line" data-line-id="${id}">
      <img src="${tour.image}" alt="${tour.imageAlt}" loading="lazy" width="500" height="340">
      <div class="booking-line-content">
        <div class="booking-line-details">
          <p class="eyebrow">${tour.region} · ${tour.category}</p>
          <h2><a href="${tourHref(tour.id)}">${tour.title}</a></h2>
          <p class="booking-line-meta">${tour.duration} · ${tour.place}</p>
          <div class="booking-controls">
            <div class="field"><label for="date-${id}">Trip date</label><input id="date-${id}" type="date" min="${todayValue()}" value="${entry.date}" data-field="date" required></div>
            <div class="field"><label for="adults-${id}">Adults</label><input id="adults-${id}" type="number" min="1" max="${MAX_ADULTS}" value="${entry.adults}" data-field="adults"></div>
            <div class="field"><label for="children-${id}">Children</label><input id="children-${id}" type="number" min="0" max="${MAX_CHILDREN}" value="${entry.children}" data-field="children"></div>
          </div>
        </div>
        <div class="booking-line-end">
          <div class="booking-line-price"><span>Trip subtotal · sample</span><strong class="booking-line-total">${formatMoney(lineTotal(entry))}</strong></div>
          <button class="text-button" type="button" data-remove-line="${id}">Remove trip</button>
        </div>
      </div>
    </article>`;
}

// Một dòng trong bảng tổng tiền bên phải.
function summaryRowHtml(entry, tour) {
  const guests = plural(guestsOf(entry), 'guest', 'guests');
  return `<div class="summary-row"><span>${tour.title} · ${guests}</span><strong>${formatMoney(lineTotal(entry))}</strong></div>`;
}

// Giỏ trống: thông báo + gợi ý 2 tour đầu tiên.
function renderEmptyBooking(listBox, summaryBox) {
  let suggestions = '';
  for (const tour of COAST_TOURS.slice(0, 2)) {
    suggestions += tourCardHtml(tour);
  }

  listBox.innerHTML = `
    ${emptyStateHtml('No trips in your booking yet.', 'Choose a sample coastal trip below, then set its date and guest count before checkout.', 'tours.html', 'Browse all trips')}
    <section class="booking-recommendations" aria-labelledby="booking-recommendations-title">
      <div class="booking-recommendations-heading">
        <h2 id="booking-recommendations-title">Coastal favourites</h2>
        <a class="text-link" href="tours.html">See all trips <span aria-hidden="true">→</span></a>
      </div>
      <div class="booking-recommendations-grid">${suggestions}</div>
    </section>`;
  summaryBox.innerHTML = '<h2>Booking total</h2><p>Add a sample trip to see its example price here. No payment is collected.</p>';
}

// Vẽ lại toàn bộ giỏ và bảng tổng tiền.
function renderBooking() {
  const listBox = document.getElementById('booking-items');
  const summaryBox = document.getElementById('booking-summary');

  // Chỉ giữ các dòng có tour còn tồn tại trong dữ liệu.
  const cart = getCart().filter(entry => tourById(entry.tourId));

  if (cart.length === 0) {
    setJourneyProgress('booking-progress', 1);
    renderEmptyBooking(listBox, summaryBox);
    return;
  }
  setJourneyProgress('booking-progress', 2);

  let lines = '';
  let summaryRows = '';
  for (const entry of cart) {
    const tour = tourById(entry.tourId);
    lines += cartLineHtml(entry, tour);
    summaryRows += summaryRowHtml(entry, tour);
  }

  listBox.innerHTML = `
    <div class="booking-list-heading">
      <div><h2>${plural(cart.length, 'trip', 'trips')} selected</h2></div>
      <span>${plural(totalGuests(cart), 'guest', 'guests')} total</span>
    </div>
    ${lines}
    <button class="text-button booking-clear" type="button" data-clear-cart>Clear all selected trips</button>`;

  summaryBox.innerHTML = `
    <h2>Booking total</h2>
    ${summaryRows}
    <div class="summary-total"><span>Example trip total</span><span>${formatMoney(cartTotal(cart))}</span></div>
    <p class="summary-note">Dates and guest counts can be edited in each trip row. Checkout is a demo; nothing is charged or reserved.</p>
    <a class="button button--coral" href="checkout.html">Continue to details <span aria-hidden="true">↗</span></a>`;
}

// Sau khi xóa, đưa con trỏ về tiêu đề danh sách để người dùng bàn phím không bị lạc.
function focusBookingHeading() {
  const heading = document.querySelector('#booking-items h2');
  if (!heading) return;
  heading.tabIndex = -1;
  heading.focus();
}

function setupBooking() {
  const listBox = document.getElementById('booking-items');
  if (!listBox) return;
  renderBooking();

  // Các nút trong giỏ được tạo lại mỗi lần renderBooking(), nên gắn sự kiện vào khung bên ngoài
  // (event delegation) thay vì gắn vào từng nút.
  listBox.addEventListener('click', event => {
    const removeButton = event.target.closest('[data-remove-line]');
    if (removeButton) {
      removeFromCart(removeButton.dataset.removeLine);
      renderBooking();
      updateHeaderCounts();
      focusBookingHeading();
      showToast('Trip removed from your booking.');
      return;
    }

    if (event.target.closest('[data-clear-cart]')) {
      clearCart();
      renderBooking();
      updateHeaderCounts();
      focusBookingHeading();
      showToast('Your selected trips have been cleared.');
    }
  });

  // Đổi ngày hoặc số khách: lưu lại, tính lại tiền, rồi đặt con trỏ lại vào ô vừa sửa.
  listBox.addEventListener('change', event => {
    const input = event.target;
    if (!input.dataset.field) return;
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }

    const lineId = input.closest('[data-line-id]').dataset.lineId;
    updateCartItem(lineId, input.dataset.field, input.value);
    renderBooking();
    updateHeaderCounts();
    document.getElementById(input.id).focus();
  });
}
