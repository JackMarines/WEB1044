/*
 * tour-detail.js
 * Trang chi tiết tour: ảnh lớn + ảnh nhỏ, điểm nổi bật, lịch trình, và form chọn ngày / số khách.
 */

// Các nút ảnh nhỏ bên dưới ảnh lớn. Ảnh đầu tiên được chọn sẵn.
function galleryThumbsHtml(photos) {
  let html = '';
  for (let i = 0; i < photos.length; i++) {
    const isFirst = i === 0;
    html += `
      <button type="button" class="gallery-thumb ${isFirst ? 'is-active' : ''}" data-index="${i}" aria-label="Show trip photo ${i + 1}" aria-pressed="${isFirst}">
        <img src="${photos[i]}" alt="" loading="lazy" width="91" height="68">
      </button>`;
  }
  return html;
}

// 3 điểm nổi bật đầu tiên, đánh số 01, 02, 03.
function highlightsHtml(highlights) {
  let html = '';
  for (let i = 0; i < highlights.length && i < 3; i++) {
    html += `<li><span class="detail-highlight-number">0${i + 1}</span><strong>${highlights[i]}</strong></li>`;
  }
  return html;
}

// Lịch trình: mỗi dòng có dạng "09:00 · Mô tả". Tách thành giờ và mô tả.
function itineraryHtml(itinerary) {
  let html = '';
  for (const line of itinerary) {
    const position = line.indexOf(' · ');
    const time = line.slice(0, position);
    const description = line.slice(position + 3);
    html += `<li><strong>${time}</strong><span>${description}</span></li>`;
  }
  return html;
}

// Danh sách những thứ đã bao gồm trong giá, mỗi dòng có dấu ✓.
function includesHtml(includes) {
  const tick = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  let html = '';
  for (const item of includes) {
    html += `<li>${tick}<span>${item}</span></li>`;
  }
  return html;
}

// Các lựa chọn số khách cho <select>, ví dụ từ 1 đến 8 người lớn.
function guestOptionsHtml(from, to, singular, pluralWord) {
  let html = '';
  for (let count = from; count <= to; count++) {
    html += `<option value="${count}">${plural(count, singular, pluralWord)}</option>`;
  }
  return html;
}

// Bảng giá: dòng người lớn, dòng trẻ em (nếu có) và tổng.
function priceRowsHtml(tour, adults, children) {
  const adultTotal = tour.price * adults;
  const childTotal = childPrice(tour) * children;
  let html = `<div><span>${plural(adults, 'adult', 'adults')}</span><strong>${formatMoney(adultTotal)}</strong></div>`;
  if (children > 0) {
    html += `<div><span>${plural(children, 'child', 'children')}</span><strong>${formatMoney(childTotal)}</strong></div>`;
  }
  html += `<div class="price-total"><span>Sample total</span><strong>${formatMoney(adultTotal + childTotal)}</strong></div>`;
  return html;
}

function tourDetailHtml(tour, photos) {
  return `
    <section class="detail-hero">
      <div class="detail-hero-image"><img id="detail-main-image" src="${photos[0]}" alt="${tour.imageAlt}"></div>
      <div class="detail-head">
        <p class="eyebrow">${tour.region} · SAMPLE TRIP</p>
        <h1>${tour.title}</h1>
        <p>${tour.summary}</p>
        <div class="detail-meta">
          <span>${tour.place}</span>
          <span>${tour.duration}</span>
          <span>${tour.group}</span>
          <span>Good for: ${tour.bestFor}</span>
        </div>
        <div class="detail-actions">
          <a class="button button--ink" href="#reserve-trip">Choose a date <span aria-hidden="true">↓</span></a>
          ${favoriteButtonHtml(tour, 'favorite-button--detail')}
        </div>
      </div>
    </section>
    <div class="detail-gallery" role="group" aria-label="Trip photographs">
      ${galleryThumbsHtml(photos)}
    </div>
    <section class="detail-highlights-section" aria-labelledby="trip-highlights-title">
      <div class="detail-highlights-heading">
        <p class="section-kicker">THE DAY IN A FEW MOMENTS</p>
        <h2 id="trip-highlights-title">Highlights of the day</h2>
      </div>
      <ul class="detail-highlights">${highlightsHtml(tour.highlights)}</ul>
    </section>
    <section class="detail-grid">
      <div class="detail-copy">
        <h2>A day with room to breathe.</h2>
        <p>${tour.summary} This is a sample itinerary for the coursework booking flow, so timing and details are illustrative.</p>
        <div class="detail-section">
          <div class="detail-section-heading"><h3>What the day looks like</h3></div>
          <ol class="itinerary-list">${itineraryHtml(tour.itinerary)}</ol>
        </div>
        <div class="detail-section">
          <h3>Good to know</h3>
          <p>${tour.bestFor}. Sample trips are for coursework demonstration and are not live departures.</p>
        </div>
        <div class="detail-section">
          <h3>Included in the sample price</h3>
          <ul class="detail-list">${includesHtml(tour.includes)}</ul>
        </div>
      </div>
      <aside id="reserve-trip" class="detail-booking">
        <p class="eyebrow">BUILD YOUR DAY</p>
        <div class="price-large">${formatMoney(tour.price)} <small>/ adult</small></div>
        <p class="field-hint">Example price · children are 55% of adult fare</p>
        <form id="detail-book-form" class="form-stack">
          <div class="field"><label for="trip-date">Choose a date</label><input id="trip-date" name="date" type="date" min="${todayValue()}" value="${defaultTripDate()}" required></div>
          <div class="field"><label for="trip-adults">Adults</label><select id="trip-adults" name="adults">${guestOptionsHtml(1, MAX_ADULTS, 'adult', 'adults')}</select></div>
          <div class="field"><label for="trip-children">Children</label><select id="trip-children" name="children">${guestOptionsHtml(0, MAX_CHILDREN, 'child', 'children')}</select></div>
          <div class="price-breakdown" id="detail-price-breakdown">${priceRowsHtml(tour, 1, 0)}</div>
          <button class="button button--coral" type="submit">Add to my booking <span aria-hidden="true">↗</span></button>
        </form>
        <p class="detail-note">No payment is collected on this coursework site.</p>
      </aside>
    </section>`;
}

// Bấm ảnh nhỏ thì đổi ảnh lớn và đánh dấu ảnh đang chọn.
function setupGallery(tour, photos) {
  const mainImage = document.getElementById('detail-main-image');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  for (const thumb of thumbs) {
    thumb.addEventListener('click', () => {
      const index = Number(thumb.dataset.index);
      mainImage.src = photos[index];
      if (index === 0) mainImage.alt = tour.imageAlt;
      else mainImage.alt = tour.title + ', sample trip photograph ' + (index + 1);

      // Bỏ đánh dấu tất cả ảnh nhỏ, rồi đánh dấu ảnh vừa bấm.
      for (const item of thumbs) {
        item.classList.remove('is-active');
        item.setAttribute('aria-pressed', 'false');
      }
      thumb.classList.add('is-active');
      thumb.setAttribute('aria-pressed', 'true');
    });
  }
}

// Form đặt tour: đổi số khách thì tính lại giá, bấm nút thì thêm vào giỏ.
function setupDetailForm(tour) {
  const form = document.getElementById('detail-book-form');
  const dateInput = document.getElementById('trip-date');
  const adultsSelect = document.getElementById('trip-adults');
  const childrenSelect = document.getElementById('trip-children');
  const priceBox = document.getElementById('detail-price-breakdown');

  function updatePrice() {
    priceBox.innerHTML = priceRowsHtml(tour, Number(adultsSelect.value), Number(childrenSelect.value));
  }
  adultsSelect.addEventListener('change', updatePrice);
  childrenSelect.addEventListener('change', updatePrice);

  form.addEventListener('submit', event => {
    event.preventDefault();
    const date = dateInput.value;

    // Chuỗi "YYYY-MM-DD" so sánh được như so sánh chữ: ngày nhỏ hơn hôm nay là ngày đã qua.
    if (date === '' || date < todayValue()) {
      showToast('Choose a date that is today or later.');
      dateInput.focus();
      return;
    }

    addTripToCart(tour, date, Number(adultsSelect.value), Number(childrenSelect.value));
  });
}

function renderDetail() {
  const root = document.getElementById('tour-detail');
  if (!root) return;

  // Lấy id tour trên thanh địa chỉ, ví dụ tour.html?id=vinh-hy-reef
  const tour = tourById(getUrlParam('id'));

  if (!tour) {
    document.getElementById('detail-progress').hidden = true;
    root.innerHTML = emptyStateHtml('This trip is not on the map.', 'Choose one of the sample coastal trips to see its details.', 'tours.html', 'Browse trips');
    return;
  }

  document.title = tour.title + ' · Togo';
  setJourneyProgress('detail-progress', 1);

  // Danh sách ảnh của tour, bỏ các ảnh bị trùng.
  const photos = [];
  for (const photo of tour.gallery) {
    if (!photos.includes(photo)) photos.push(photo);
  }

  root.innerHTML = tourDetailHtml(tour, photos);
  setupGallery(tour, photos);
  setupDetailForm(tour);
}
