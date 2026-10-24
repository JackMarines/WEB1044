/*
 * contact-about.js
 * Form liên hệ (kiểm tra dữ liệu, đếm ký tự, xóa form) và các tab trên trang giới thiệu.
 */

const MAX_MESSAGE_LENGTH = 500;

function setupContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const messageInput = document.getElementById('contact-message');
  const counter = document.getElementById('message-count');
  const status = document.getElementById('contact-status');

  // Đếm số ký tự đã gõ, ví dụ "42 / 500". (maxlength="500" trong HTML chặn gõ quá giới hạn.)
  function updateCounter() {
    counter.textContent = messageInput.value.length + ' / ' + MAX_MESSAGE_LENGTH;
  }
  messageInput.addEventListener('input', updateCounter);

  // Nút "Clear form" (type="reset"): trình duyệt tự xóa các ô, mình chỉ xóa thông báo và đặt lại bộ đếm.
  form.addEventListener('reset', () => {
    clearFormErrors(form);
    status.textContent = '';
    status.className = 'form-message';
    counter.textContent = '0 / ' + MAX_MESSAGE_LENGTH;
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    // 1. Lấy giá trị các ô.
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const text = messageInput.value;

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
    if (text.trim().length < 10) {
      showFieldError(form, 'message', 'Write at least 10 characters so we know what you need.');
      valid = false;
    } else if (text.length > MAX_MESSAGE_LENGTH) {
      showFieldError(form, 'message', 'Keep your message within ' + MAX_MESSAGE_LENGTH + ' characters.');
      valid = false;
    }

    if (!valid) {
      showFormMessage(status, 'error', 'Check the highlighted fields and try again.');
      focusFirstError(form);
      return;
    }

    // 3. Hợp lệ: xóa nội dung form, rồi hiện thông báo thành công và popup nhỏ.
    form.reset();
    showFormMessage(status, 'success', 'Your sample message is ready. No email was sent by this coursework site.');
    showToast('Message checked successfully.');
  });
}

// Các tab trên trang giới thiệu: bấm tab nào thì hiện nội dung của tab đó, ẩn các tab còn lại.
function setupAboutTabs() {
  const tabs = document.querySelectorAll('.about-tabs [role="tab"]');

  for (const tab of tabs) {
    tab.addEventListener('click', () => {
      for (const otherTab of tabs) {
        const panel = document.getElementById(otherTab.getAttribute('aria-controls'));
        otherTab.setAttribute('aria-selected', 'false');
        panel.hidden = true;
      }
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
    });
  }
}
