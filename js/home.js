/*
 * home.js
 * Nội dung và hiệu ứng chỉ có ở trang chủ:
 * slider ảnh lớn, dải điểm đến, tour nổi bật, nhóm hoạt động, nhận xét mẫu và FAQ.
 */

// 3 cảnh của ảnh lớn đầu trang. Cảnh 1 giống hệt nội dung có sẵn trong index.html.
const heroSlides = [
  { kicker: 'VIETNAM, AT WATER LEVEL', title: 'A coastal day', location: 'in Vinh Hy Bay', description: 'Clear water, quiet coves, and small-group tours along Vietnam’s coast.', image: 'assets/470640795_1163051318518608_3597147537126791641_n_4-1-1440x750.webp', alt: 'Blue water and small boats along the coast of Vinh Hy Bay' },
  { kicker: 'SEA AND STONE', title: 'Between the cliffs', location: 'and open water', description: 'Follow the waterway into a landscape shaped by limestone and sea.', image: 'assets/home03-adventure-hero.webp', alt: 'A boat travelling between tall limestone cliffs' },
  { kicker: 'LIFE BY THE HARBOUR', title: 'A slower morning', location: 'in Ninh Thuan', description: 'Watch the boats return and leave room for another hour by the water.', image: 'assets/482008891_3883354471919153_4827135242781784257_n_2-1.webp', alt: 'Small boats resting along a quiet shoreline' }
];

// 3 nhóm hoạt động (thẻ ảnh "On the water", ...).
const activityCategories = [
  { title: 'On the water', detail: 'Boat rides, reef swims, and a slower way around the bay.', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=82', alt: 'Sunlight moving across open water', href: 'tours.html?category=On%20the%20water' },
  { title: 'Coast & culture', detail: 'Coastal walks, village stops, and local flavours.', image: 'assets/home03-adventure-hero.webp', alt: 'A boat travelling between tall coastal cliffs', href: 'tours.html?category=Coast%20%26%20culture' },
  { title: 'Island time', detail: 'Easy afternoons with room for one more swim.', image: 'assets/home06-island-category.webp', alt: 'A quiet island-side place to relax', href: 'search.html?q=island' }
];

// Các câu mẫu được ghi rõ là minh họa, không phải đánh giá thật.
const sampleReviews = [
  '“Sample note: a day on the water, with time to swim, explore, and enjoy lunch by the bay.”',
  '“Illustrative review: clear trip details made it easy to choose a coastal day that suited us.”',
  '“Example traveller note: the shoreline, boat ride, and quiet beach made a lovely day.”'
];

// Giữ vị trí trong danh sách: qua cuối thì quay về đầu, lùi quá đầu thì về cuối.
function wrapIndex(index, length) {
  if (index >= length) return 0;
  if (index < 0) return length - 1;
  return index;
}

// Thẻ điểm đến: tour thứ 4, 5, 6 trong dữ liệu.
function renderDestinations() {
  const root = document.getElementById('home-destinations');
  if (!root) return;
  let html = '';
  for (const tour of COAST_TOURS.slice(3, 6)) {
    const placeName = tour.place.split(',')[0]; // "An Thoi, Phu Quoc" -> "An Thoi"
    html += `
      <article class="destination-card">
        <img src="${tour.image}" alt="${tour.imageAlt}" loading="lazy">
        <div class="destination-card-copy"><h3>${placeName}</h3><p>${tour.duration} · ${tour.category}</p></div>
        <a class="destination-card-link" href="${tourHref(tour.id)}" aria-label="Explore ${tour.place}">↗</a>
      </article>`;
  }
  root.innerHTML = html;
}

// 3 tour nổi bật đầu tiên.
function renderFeaturedTours() {
  const root = document.getElementById('home-tours');
  if (!root) return;
  let html = '';
  for (const tour of COAST_TOURS.slice(0, 3)) {
    html += tourCardHtml(tour);
  }
  root.innerHTML = html;
}

function renderActivities() {
  const root = document.getElementById('home-activities');
  if (!root) return;
  let html = '';
  for (let i = 0; i < activityCategories.length; i++) {
    const category = activityCategories[i];
    html += `
      <a class="activity-card activity-card--${i + 1}" href="${category.href}">
        <img src="${category.image}" alt="${category.alt}" loading="lazy" width="350" height="300">
        <span class="activity-card-shade"></span>
        <span class="activity-card-content"><span class="activity-card-count">0${i + 1}</span><strong>${category.title}</strong><span>${category.detail}</span></span>
        <span class="activity-card-arrow" aria-hidden="true">↗</span>
      </a>`;
  }
  root.innerHTML = html;
}

// Slider ảnh lớn đầu trang: nút ← → đổi cảnh.
function setupHero() {
  const heroImage = document.querySelector('[data-hero-image]');
  if (!heroImage) return;
  const kicker = document.querySelector('[data-hero-kicker]');
  const title = document.querySelector('[data-hero-title]');
  const place = document.querySelector('[data-hero-location]');
  const description = document.querySelector('[data-hero-description]');
  const counter = document.querySelector('[data-hero-index]');
  let current = 0;

  function showSlide(index) {
    current = wrapIndex(index, heroSlides.length);
    const slide = heroSlides[current];

    // Thêm class để ảnh mờ đi (CSS), đổi nội dung sau 150ms rồi bỏ class để ảnh hiện lại.
    heroImage.classList.add('is-changing');
    setTimeout(() => {
      heroImage.src = slide.image;
      heroImage.alt = slide.alt;
      kicker.textContent = slide.kicker;
      title.textContent = slide.title;
      place.textContent = slide.location;
      description.textContent = slide.description;
      counter.innerHTML = '0' + (current + 1) + ' <i>/</i> 0' + heroSlides.length;
      heroImage.classList.remove('is-changing');
    }, 150);
  }

  document.querySelector('[data-hero-prev]').addEventListener('click', () => showSlide(current - 1));
  document.querySelector('[data-hero-next]').addEventListener('click', () => showSlide(current + 1));
}

// Nút ← → cuộn dải điểm đến sang trái / phải 250px (CSS làm cho việc cuộn mượt).
function setupDestinationCarousel() {
  const carousel = document.querySelector('.destination-carousel');
  if (!carousel) return;
  document.querySelector('[data-destination-prev]').addEventListener('click', () => {
    carousel.scrollLeft -= 250;
  });
  document.querySelector('[data-destination-next]').addEventListener('click', () => {
    carousel.scrollLeft += 250;
  });
}

// Nút ← → đổi câu nhận xét mẫu.
function setupReviews() {
  const quote = document.querySelector('[data-testimonial-quote]');
  if (!quote) return;
  let current = 0;

  function showReview(index) {
    current = wrapIndex(index, sampleReviews.length);
    quote.textContent = sampleReviews[current];
  }

  document.querySelector('[data-testimonial-prev]').addEventListener('click', () => showReview(current - 1));
  document.querySelector('[data-testimonial-next]').addEventListener('click', () => showReview(current + 1));
}

// Câu hỏi thường gặp: bấm câu hỏi để mở / đóng câu trả lời.
function setupFaq() {
  for (const button of document.querySelectorAll('.faq-item button')) {
    button.addEventListener('click', () => {
      const answer = button.closest('.faq-item').querySelector('.faq-answer');
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        button.setAttribute('aria-expanded', 'false');
        button.querySelector('span').textContent = '+';
        answer.hidden = true;
      } else {
        button.setAttribute('aria-expanded', 'true');
        button.querySelector('span').textContent = '−';
        answer.hidden = false;
      }
    });
  }
}

function renderHome() {
  renderDestinations();
  renderFeaturedTours();
  renderActivities();
  setupHero();
  setupDestinationCarousel();
  setupReviews();
  setupFaq();
}
