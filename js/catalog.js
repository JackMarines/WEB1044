/*
 * catalog.js
 * Trang danh sách tour, trang tìm kiếm (tìm + lọc + sắp xếp) và trang yêu thích.
 */

// Lọc tour theo từ khóa và loại tour, rồi sắp xếp theo lựa chọn.
function filterAndSortTours(keyword, category, sortBy) {
  keyword = keyword.trim().toLowerCase();

  // filter: giữ lại các tour khớp từ khóa VÀ khớp loại tour.
  const results = COAST_TOURS.filter(tour => {
    const searchText = (tour.title + ' ' + tour.place + ' ' + tour.region + ' ' + tour.category + ' ' + tour.summary).toLowerCase();
    const matchesKeyword = keyword === '' || searchText.includes(keyword);
    const matchesCategory = category === '' || tour.category === category;
    return matchesKeyword && matchesCategory;
  });

  // sort: sắp xếp lại mảng kết quả. "featured" thì giữ nguyên thứ tự trong tour-data.js.
  if (sortBy === 'price-low') results.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') results.sort((a, b) => b.price - a.price);
  if (sortBy === 'name') results.sort((a, b) => a.title.localeCompare(b.title));

  return results;
}

// Trang "tours" và trang "search" giống nhau, chỉ khác id của các ô.
function setupFilterPage(resultsId, searchId, categoryId, sortId, countId) {
  const resultsBox = document.getElementById(resultsId);
  if (!resultsBox) return;
  const searchInput = document.getElementById(searchId);
  const categorySelect = document.getElementById(categoryId);
  const sortSelect = document.getElementById(sortId);
  const countText = document.getElementById(countId);

  // Điền sẵn giá trị từ thanh địa chỉ, ví dụ tours.html?category=On%20the%20water hoặc search.html?q=island
  searchInput.value = getUrlParam('q') || '';
  categorySelect.value = getUrlParam('category') || '';

  function showResults() {
    const keyword = searchInput.value;
    const results = filterAndSortTours(keyword, categorySelect.value, sortSelect.value);

    let text = plural(results.length, 'sample trip', 'sample trips');
    if (keyword) text += ' for “' + keyword + '”';
    countText.textContent = text;

    if (results.length === 0) {
      resultsBox.innerHTML = emptyStateHtml('Nothing along that stretch.', 'Try another place or clear a filter to see more sample trips.', 'tours.html', 'Browse all trips');
      return;
    }

    let html = '';
    for (const tour of results) {
      html += tourCardHtml(tour);
    }
    resultsBox.innerHTML = html;
  }

  // Gõ chữ hoặc đổi lựa chọn thì hiện lại kết quả ngay.
  searchInput.addEventListener('input', showResults);
  categorySelect.addEventListener('change', showResults);
  sortSelect.addEventListener('change', showResults);
  showResults();
}

// Trang danh sách tour.
function setupCatalog() {
  setupFilterPage('tour-results', 'tour-search', 'tour-category', 'tour-sort', 'tour-result-count');
}

// Trang tìm kiếm dùng cùng cách lọc như trang danh sách.
function setupSearch() {
  setupFilterPage('search-results', 'search-query', 'search-category', 'search-sort', 'search-result-count');
}

// Trang yêu thích: hiện các tour đã bấm trái tim.
function renderFavorites() {
  const resultsBox = document.getElementById('favorite-results');
  if (!resultsBox) return;

  let html = '';
  for (const id of getFavorites()) {
    const tour = tourById(id);
    if (tour) html += tourCardHtml(tour);
  }

  if (html === '') {
    resultsBox.innerHTML = emptyStateHtml('Nothing saved just yet.', 'Tap the heart on a trip that sounds good and it will wait for you here.', 'tours.html', 'Find a trip');
  } else {
    resultsBox.innerHTML = html;
  }
}
