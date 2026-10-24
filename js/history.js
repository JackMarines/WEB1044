/*
 * history.js
 * Đọc các booking đã lưu để hiện trang lịch sử và trang đặt tour thành công.
 */

// Thời điểm đặt (dạng ISO, ví dụ "2026-10-21T08:30:00.000Z") -> "21 Oct 2026".
function bookedOnText(booking) {
  const date = new Date(booking.createdAt);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Tên tour của một dòng trong booking.
function bookedTourTitle(item) {
  const tour = tourById(item.tourId);
  if (tour) return tour.title;
  return 'Coastal trip'; // tour đã bị xóa khỏi dữ liệu
}

// Một thẻ trong trang lịch sử.
function historyEntryHtml(booking) {
  const titles = booking.items.map(item => bookedTourTitle(item)); // mảng tên tour
  const guests = plural(totalGuests(booking.items), 'guest', 'guests');
  return `
    <article class="history-entry">
      <div>
        <p class="eyebrow">BOOKED ${bookedOnText(booking)}</p>
        <h2>${titles.join(', ')}</h2>
        <p>Booking ${booking.id}</p>
        <div class="history-entry-meta"><span>${guests}</span><strong>${formatMoney(booking.total)}</strong></div>
      </div>
      <span class="status-tag">${booking.status}</span>
      <a class="text-link" href="success.html?id=${booking.id}">View confirmation <span aria-hidden="true">→</span></a>
    </article>`;
}

function renderHistory() {
  const root = document.getElementById('booking-history');
  if (!root) return;
  const bookings = getBookings();

  if (bookings.length === 0) {
    root.innerHTML = emptyStateHtml('No sample bookings yet.', 'When you complete the demo checkout, your trip details will be kept here.', 'tours.html', 'Explore trips');
    return;
  }

  let html = '';
  for (const booking of bookings) {
    html += historyEntryHtml(booking);
  }
  root.innerHTML = html;
}

function renderSuccess() {
  const root = document.getElementById('success-content');
  if (!root) return;

  // Tìm booking theo id trên thanh địa chỉ, ví dụ success.html?id=CC-1771234567890
  const id = getUrlParam('id');
  const booking = getBookings().find(item => item.id === id);

  if (!booking) {
    root.innerHTML = `
      <div class="success-mark" aria-hidden="true">?</div>
      <p class="eyebrow">NO MATCHING SAMPLE BOOKING</p>
      <h1>Nothing to confirm.</h1>
      <p>Choose a trip and finish the demo checkout to see a confirmation here.</p>
      <div class="success-actions">
        <a class="button button--ink" href="tours.html">Browse trips <span aria-hidden="true">↗</span></a>
        <a class="button button--outline" href="history.html">Booking history</a>
      </div>`;
    return;
  }

  let trips = '';
  for (const item of booking.items) {
    const guests = plural(guestsOf(item), 'guest', 'guests');
    trips += `<div class="success-trip"><strong>${bookedTourTitle(item)}</strong><span>${prettyDate(item.date)} · ${guests}</span></div>`;
  }

  root.innerHTML = `
    <div class="success-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="m5 12 4.5 4.5L19 7" pathLength="1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <p class="eyebrow">YOUR SAMPLE BOOKING IS SAVED</p>
    <h1>That's a good plan.</h1>
    <p>This confirmation belongs to the coursework demo. No payment was collected and no tour was reserved.</p>
    <div class="success-booking-details">
      <div><span>Booking reference</span><strong>${booking.id}</strong></div>
      <div><span>Booked on</span><strong>${bookedOnText(booking)}</strong></div>
      <div><span>Example total</span><strong>${formatMoney(booking.total)}</strong></div>
    </div>
    <div class="success-trip-list">${trips}</div>
    <div class="success-actions">
      <a class="button button--coral" href="history.html">View booking history <span aria-hidden="true">↗</span></a>
      <a class="button button--outline" href="tours.html">Find another trip</a>
    </div>`;
}
