/*
 * state.js
 * Đọc / ghi dữ liệu demo: giỏ tour, lịch sử đặt tour, tài khoản lưu trong localStorage;
 * danh sách yêu thích lưu trong sessionStorage (mất khi đóng tab).
 * Storage chỉ lưu được chuỗi, nên mảng/object được đổi sang JSON trước khi lưu.
 */

// Tên các khóa (key) trong localStorage.
const CART_KEY = 'togo-booking';
const FAVORITES_KEY = 'togo-favorites';
const BOOKINGS_KEY = 'togo-bookings';
const USERS_KEY = 'togo-users';
const CURRENT_USER_KEY = 'togo-user';

// Mỗi tour tối đa 8 người lớn và 8 trẻ em.
const MAX_ADULTS = 8;
const MAX_CHILDREN = 8;

// Đọc dữ liệu từ storage (mặc định localStorage). Nếu chưa có hoặc dữ liệu bị hỏng thì trả về giá trị mặc định.
function readData(key, defaultValue, storage = localStorage) {
  const text = storage.getItem(key);
  if (!text) return defaultValue;
  try {
    return JSON.parse(text);
  } catch (error) {
    return defaultValue;
  }
}

// Lưu dữ liệu dưới dạng chuỗi JSON (mặc định vào localStorage).
function saveData(key, value, storage = localStorage) {
  storage.setItem(key, JSON.stringify(value));
}

// Giữ một số trong khoảng từ min đến max, ví dụ keepInRange(12, 1, 8) -> 8.
function keepInRange(value, min, max) {
  let number = parseInt(value);
  if (isNaN(number)) number = min;
  if (number < min) number = min;
  if (number > max) number = max;
  return number;
}

/* ---------- Giỏ tour ---------- */

function getCart() {
  return readData(CART_KEY, []);
}

// Thêm tour vào giỏ. Cùng tour + cùng ngày thì cộng dồn số khách vào dòng cũ.
// Trả về dòng đã được lưu.
function addToCart(entry) {
  const cart = getCart();

  const oldItem = cart.find(item => item.tourId === entry.tourId && item.date === entry.date);
  if (oldItem) {
    oldItem.adults = keepInRange(oldItem.adults + entry.adults, 1, MAX_ADULTS);
    oldItem.children = keepInRange(oldItem.children + entry.children, 0, MAX_CHILDREN);
    saveData(CART_KEY, cart);
    return oldItem;
  }

  const newItem = {
    lineId: entry.tourId + '-' + Date.now(), // mã riêng cho mỗi dòng trong giỏ
    tourId: entry.tourId,
    date: entry.date,
    adults: keepInRange(entry.adults, 1, MAX_ADULTS),
    children: keepInRange(entry.children, 0, MAX_CHILDREN)
  };
  cart.push(newItem);
  saveData(CART_KEY, cart);
  return newItem;
}

// Sửa một ô (date, adults hoặc children) của một dòng trong giỏ.
function updateCartItem(lineId, field, value) {
  const cart = getCart();
  const item = cart.find(item => item.lineId === lineId);
  if (!item) return;

  if (field === 'date') item.date = value;
  if (field === 'adults') item.adults = keepInRange(value, 1, MAX_ADULTS);
  if (field === 'children') item.children = keepInRange(value, 0, MAX_CHILDREN);
  saveData(CART_KEY, cart);
}

function removeFromCart(lineId) {
  const cart = getCart().filter(item => item.lineId !== lineId);
  saveData(CART_KEY, cart);
}

function clearCart() {
  saveData(CART_KEY, []);
}

/* ---------- Yêu thích (lưu mảng id tour trong sessionStorage) ---------- */

function getFavorites() {
  return readData(FAVORITES_KEY, [], sessionStorage);
}

function isFavorite(tourId) {
  return getFavorites().includes(tourId);
}

// Đã lưu thì bỏ lưu, chưa lưu thì thêm vào. Trả về true nếu tour đang được lưu.
function toggleFavorite(tourId) {
  let favorites = getFavorites();
  if (favorites.includes(tourId)) {
    favorites = favorites.filter(id => id !== tourId);
  } else {
    favorites.push(tourId);
  }
  saveData(FAVORITES_KEY, favorites, sessionStorage);
  return favorites.includes(tourId);
}

/* ---------- Lịch sử đặt tour ---------- */

function getBookings() {
  return readData(BOOKINGS_KEY, []);
}

// Booking mới được đặt lên đầu danh sách để thấy ngay trong trang lịch sử.
function addBooking(booking) {
  const bookings = getBookings();
  bookings.unshift(booking);
  saveData(BOOKINGS_KEY, bookings);
}

/* ---------- Tài khoản demo ---------- */

function getUsers() {
  return readData(USERS_KEY, []);
}

// Tìm tài khoản theo email (không phân biệt chữ hoa/thường). Không có thì trả về undefined.
function findUser(email) {
  return getUsers().find(user => user.email.toLowerCase() === email.toLowerCase());
}

function addUser(user) {
  const users = getUsers();
  users.push(user);
  saveData(USERS_KEY, users);
}

// Người đang đăng nhập, hoặc null nếu chưa đăng nhập.
function getCurrentUser() {
  return readData(CURRENT_USER_KEY, null);
}

function setCurrentUser(user) {
  saveData(CURRENT_USER_KEY, user);
}

function signOut() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
