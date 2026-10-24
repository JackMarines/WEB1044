/*
 * account.js
 * Đăng ký và đăng nhập tài khoản demo, lưu trong localStorage của trình duyệt.
 *
 * Lưu ý: đây là bài tập chạy hoàn toàn trên trình duyệt, nên mật khẩu được lưu và so sánh trực tiếp.
 * Website thật phải gửi mật khẩu lên server để kiểm tra, không bao giờ lưu mật khẩu trong trình duyệt.
 */

// Sau 0,9 giây thì về trang chủ (để người dùng kịp đọc thông báo).
function goHomeSoon() {
  setTimeout(() => {
    location.href = 'index.html';
  }, 900);
}

// Đăng nhập: lưu người dùng hiện tại và cập nhật đầu trang ngay.
function signIn(user) {
  setCurrentUser({ name: user.name, email: user.email });
  refreshAccountControl();
}

function setupRegister() {
  const form = document.getElementById('register-form');
  if (!form) return;
  const message = document.getElementById('register-message');

  form.addEventListener('submit', event => {
    event.preventDefault();

    // 1. Lấy giá trị các ô.
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim().toLowerCase();
    const phone = document.getElementById('register-phone').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;

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
    } else if (findUser(email)) {
      showFieldError(form, 'email', 'An account with this email already exists.');
      valid = false;
    }
    if (!isValidPhone(phone)) {
      showFieldError(form, 'phone', 'Enter a valid phone number.');
      valid = false;
    }
    if (password.length < 8) {
      showFieldError(form, 'password', 'Use at least 8 characters.');
      valid = false;
    }
    if (confirm === '' || confirm !== password) {
      showFieldError(form, 'confirm', 'Enter the same password again.');
      valid = false;
    }

    if (!valid) {
      showFormMessage(message, 'error', 'Check the highlighted fields and try again.');
      focusFirstError(form);
      return;
    }

    // 3. Lưu tài khoản mới rồi đăng nhập luôn.
    const user = { name: name, email: email, phone: phone, password: password };
    addUser(user);
    signIn(user);
    form.reset();
    showFormMessage(message, 'success', 'Your demo account is ready. Signing you in…');
    goHomeSoon();
  });

  // Gõ lại vào một ô thì xóa lỗi của ô đó.
  form.addEventListener('input', event => {
    if (event.target.name) showFieldError(form, event.target.name, '');
  });
}

function setupLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;
  const message = document.getElementById('login-message');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    // 1. Kiểm tra không để trống và email đúng dạng.
    clearFormErrors(form);
    let valid = true;
    if (email === '') {
      showFieldError(form, 'email', 'Enter your email address.');
      valid = false;
    } else if (!isValidEmail(email)) {
      showFieldError(form, 'email', 'Enter a valid email address.');
      valid = false;
    }
    if (password === '') {
      showFieldError(form, 'password', 'Enter your password.');
      valid = false;
    }
    if (!valid) {
      showFormMessage(message, 'error', 'Enter a valid email and password to continue.');
      focusFirstError(form);
      return;
    }

    // 2. Kiểm tra tài khoản có tồn tại và mật khẩu có đúng không.
    const user = findUser(email);
    if (!user || user.password !== password) {
      showFormMessage(message, 'error', 'Those details did not match a demo account. Check them or create an account first.');
      return;
    }

    // 3. Đăng nhập thành công.
    signIn(user);
    const firstName = user.name.split(' ')[0];
    showFormMessage(message, 'success', 'Welcome back, ' + firstName + '. Your demo sign-in is saved in this browser.');
    goHomeSoon();
  });

  // Gõ lại vào một ô thì xóa lỗi của ô đó.
  form.addEventListener('input', event => {
    if (event.target.name) showFieldError(form, event.target.name, '');
  });
}
