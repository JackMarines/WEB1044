/*
 * shared.js
 * Các biến và hàm nhỏ được nhiều trang dùng lại.
 *
 * Các file <script> trong trang dùng chung một phạm vi toàn cục (global scope),
 * nên hàm khai báo ở file này có thể gọi được ở các file nạp sau nó (site.js, home.js, ...).
 * Vì vậy mỗi tên hàm / tên biến chỉ được khai báo một lần trong toàn bộ dự án.
 */

// Tên trang hiện tại, lấy từ <body data-page="...">, ví dụ "home", "tours", "booking".
const currentPage = document.body.dataset.page;

// Trẻ em trả 55% giá người lớn.
const CHILD_PRICE_RATE = 0.55;

// Thông báo khi số khách bị giới hạn ở mức tối đa.
const GUEST_LIMIT_MESSAGE = 'Each trip date allows up to 8 adults and 8 children, so your booking was set to the maximum.';

/* ---------- Định dạng ---------- */

// 1850000 -> "1.850.000 ₫"
function formatMoney(value) {
  return Number(value).toLocaleString('vi-VN') + ' ₫';
}

// plural(1, 'guest', 'guests') -> "1 guest", plural(3, 'guest', 'guests') -> "3 guests"
function plural(count, singular, pluralWord) {
  if (Number(count) === 1) return count + ' ' + singular;
  return count + ' ' + pluralWord;
}

// Đổi các ký tự đặc biệt của chữ người dùng gõ vào, để chúng không bị hiểu thành thẻ HTML.
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ---------- Ngày tháng ---------- */

// Đổi một Date thành "YYYY-MM-DD", đúng định dạng của <input type="date">.
function dateToInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

// Hôm nay, dạng "YYYY-MM-DD".
function todayValue() {
  return dateToInputValue(new Date());
}

// Ngày mặc định khi thêm tour: 14 ngày sau hôm nay.
function defaultTripDate() {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return dateToInputValue(date);
}

// "2026-12-12" -> "12 Dec 2026"
function prettyDate(dateText) {
  if (!dateText) return 'Date not selected';
  const date = new Date(dateText + 'T12:00:00');
  if (isNaN(date.getTime())) return 'Date not selected';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Lấy một tham số trên thanh địa chỉ, ví dụ tour.html?id=vinh-hy-reef -> getUrlParam('id') = "vinh-hy-reef"
function getUrlParam(name) {
  const params = new URLSearchParams(location.search);
  return params.get(name);
}

/* ---------- Tour và giá tiền ---------- */

// Tìm một tour theo id trong mảng COAST_TOURS (tour-data.js).
function tourById(id) {
  return COAST_TOURS.find(tour => tour.id === id);
}

// Đường dẫn tới trang chi tiết của một tour.
function tourHref(id) {
  return 'tour.html?id=' + id;
}

// Giá vé trẻ em của một tour (làm tròn).
function childPrice(tour) {
  return Math.round(tour.price * CHILD_PRICE_RATE);
}

// Số khách (người lớn + trẻ em) của một dòng trong giỏ.
function guestsOf(entry) {
  return Number(entry.adults) + Number(entry.children);
}

// Tổng số khách của nhiều dòng.
function totalGuests(entries) {
  let sum = 0;
  for (const entry of entries) {
    sum += guestsOf(entry);
  }
  return sum;
}

// Thành tiền của một dòng = giá người lớn x số người lớn + giá trẻ em x số trẻ em.
function lineTotal(entry) {
  const tour = tourById(entry.tourId);
  if (!tour) return 0;
  return tour.price * entry.adults + childPrice(tour) * entry.children;
}

// Tổng tiền của nhiều dòng.
function cartTotal(entries) {
  let sum = 0;
  for (const entry of entries) {
    sum += lineTotal(entry);
  }
  return sum;
}

// Thêm tour vào giỏ và báo cho người dùng.
function addTripToCart(tour, date, adults, children) {
  // Xem trong giỏ đã có tour này cùng ngày chưa, để biết số khách sau khi cộng dồn.
  const oldItem = getCart().find(item => item.tourId === tour.id && item.date === date);
  let wantedAdults = adults;
  let wantedChildren = children;
  if (oldItem) {
    wantedAdults += oldItem.adults;
    wantedChildren += oldItem.children;
  }

  const saved = addToCart({ tourId: tour.id, date: date, adults: adults, children: children });
  updateHeaderCounts();

  // Nếu số khách đã lưu nhỏ hơn số muốn đặt, nghĩa là đã bị giới hạn ở mức tối đa.
  if (saved.adults < wantedAdults || saved.children < wantedChildren) {
    showToast(GUEST_LIMIT_MESSAGE);
  } else {
    showToast(tour.title + ' added for ' + prettyDate(date) + '.');
  }
}

/* ---------- Giao diện dùng chung ---------- */

// Hiện thông báo nhỏ ở góc màn hình, tự biến mất sau 3,2 giây.
function showToast(message) {
  const region = document.querySelector('.toast-region');
  if (!region) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  region.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// Thanh tiến trình 4 bước (Chọn tour → Giỏ → Thông tin → Hoàn tất).
// Bước nhỏ hơn activeStep là "Complete", bằng activeStep là "Current", còn lại là "Next".
function setJourneyProgress(progressId, activeStep) {
  const progress = document.getElementById(progressId);
  if (!progress) return;

  const steps = progress.querySelectorAll('[data-step]');
  for (const item of steps) {
    const step = Number(item.dataset.step);
    const status = item.querySelector('[data-step-status]');
    item.classList.remove('is-complete', 'is-current', 'is-upcoming');
    item.removeAttribute('aria-current');

    if (step < activeStep) {
      item.classList.add('is-complete');
      if (status) status.textContent = 'Complete';
    } else if (step === activeStep) {
      item.classList.add('is-current');
      item.setAttribute('aria-current', 'step');
      if (status) status.textContent = 'Current';
    } else {
      item.classList.add('is-upcoming');
      if (status) status.textContent = 'Next';
    }
  }
}

// Khung thông báo khi danh sách chưa có dữ liệu.
function emptyStateHtml(title, message, link, label) {
  return `
    <div class="empty-state">
      <h2>${title}</h2>
      <p>${message}</p>
      <a class="button button--ink" href="${link}">${label} <span aria-hidden="true">↗</span></a>
    </div>`;
}

// Icon trái tim: tô đầy khi tour đã được lưu.
function heartIconHtml(active) {
  const fill = active ? 'currentColor' : 'none';
  return `<svg class="favorite-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 1 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" fill="${fill}" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`;
}

// Chữ đọc cho trình đọc màn hình của nút trái tim.
function favoriteLabel(tour, active) {
  if (active) return 'Remove ' + tour.title + ' from saved trips';
  return 'Save ' + tour.title + ' to saved trips';
}

// Nút trái tim (lưu / bỏ lưu tour). Việc bấm nút được xử lý trong site.js.
function favoriteButtonHtml(tour, extraClass) {
  const active = isFavorite(tour.id);
  return `<button class="favorite-button ${extraClass || ''}" type="button" data-action="favorite" data-tour-id="${tour.id}" aria-pressed="${active}" aria-label="${favoriteLabel(tour, active)}">${heartIconHtml(active)}</button>`;
}

// Thẻ tour dùng ở trang chủ, danh sách, tìm kiếm, yêu thích và giỏ trống.
function tourCardHtml(tour) {
  const href = tourHref(tour.id);
  return `
    <article class="tour-card">
      <a class="tour-card-image" href="${href}">
        <img src="${tour.image}" alt="${tour.imageAlt}" loading="lazy">
        <span class="tour-card-label">${tour.region} · ${tour.duration}</span>
      </a>
      <div class="tour-card-body">
        <div class="tour-card-top"><span>${tour.category}</span><span>${tour.group}</span></div>
        <h2><a href="${href}">${tour.title}</a></h2>
        <p class="tour-card-place">${tour.place}</p>
        <div class="tour-card-bottom">
          <span class="tour-card-price">${formatMoney(tour.price)}<small>Example price · per adult</small></span>
          <div class="tour-card-actions">
            <a class="text-link" href="${href}">Details <span aria-hidden="true">→</span></a>
            <button class="card-add-button" type="button" data-action="add" data-tour-id="${tour.id}">Add</button>
            ${favoriteButtonHtml(tour)}
          </div>
        </div>
      </div>
    </article>`;
}

/* ---------- Kiểm tra form ---------- */

// Ghi lỗi dưới một ô nhập (message rỗng = xóa lỗi).
// Dòng lỗi là phần tử có data-error-for="tên ô", ví dụ <p data-error-for="email">.
function showFieldError(form, fieldName, message) {
  const errorSlot = form.querySelector('[data-error-for="' + fieldName + '"]');
  if (errorSlot) errorSlot.textContent = message;

  const field = form.elements[fieldName];
  if (field && field.setAttribute) {
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  }
}

// Xóa lỗi của tất cả các ô trong form.
function clearFormErrors(form) {
  for (const slot of form.querySelectorAll('[data-error-for]')) {
    slot.textContent = '';
  }
  for (const field of form.querySelectorAll('[aria-invalid="true"]')) {
    field.removeAttribute('aria-invalid');
  }
}

// Đưa con trỏ tới ô lỗi đầu tiên.
function focusFirstError(form) {
  const firstInvalid = form.querySelector('[aria-invalid="true"]');
  if (firstInvalid) firstInvalid.focus();
}

// Hiện thông báo chung dưới form. type là 'error' hoặc 'success'.
function showFormMessage(element, type, text) {
  element.className = 'form-message form-message--' + type;
  element.textContent = text;
}

// Email phải có dạng ten@mien.com
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// Số điện thoại: bỏ dấu cách, dấu chấm, gạch ngang, ngoặc; còn lại 8–15 chữ số (có thể có + ở đầu).
function isValidPhone(phone) {
  const cleaned = phone.replace(/[\s.()-]/g, '');
  return /^\+?[0-9]{8,15}$/.test(cleaned);
}
