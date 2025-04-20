// banner 
document.addEventListener('DOMContentLoaded', () => {
    console.log("script.js loaded");
    const banners = document.querySelectorAll('.banner-image');
    const prevBtn = document.querySelector('.banner-control.prev');
    const nextBtn = document.querySelector('.banner-control.next');
    let currentIndex = 0;
    let intervalId;

    function showBanner(index) {
        banners.forEach((banner, i) => {
            banner.classList.toggle('active', i === index);
        });
    }

    function nextBanner() {
        currentIndex = (currentIndex + 1) % banners.length;
        showBanner(currentIndex);
    }

    function prevBanner() {
        currentIndex = (currentIndex - 1 + banners.length) % banners.length;
        showBanner(currentIndex);
    }

    function startAutoSlide() {
        intervalId = setInterval(nextBanner, 3000);
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextBanner();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevBanner();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (banners.length > 0) {
        banners.forEach(banner => {
            banner.addEventListener('mouseenter', stopAutoSlide);
            banner.addEventListener('mouseleave', startAutoSlide);
        });
    }

    // Initial display and start auto slide
    showBanner(currentIndex);
    startAutoSlide();

    // Form validation for subscribe form
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');

        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailValue = emailInput.value.trim();
            if (!validateEmail(emailValue)) {
                emailError.textContent = 'Vui lòng nhập email hợp lệ.';
                emailInput.setAttribute('aria-invalid', 'true');
                emailInput.focus();
            } else {
                emailError.textContent = '';
                emailInput.removeAttribute('aria-invalid');
                alert('Cảm ơn bạn đã đăng ký nhận tin!');
                subscribeForm.reset();
            }
        });

        function validateEmail(email) {
            // Simple email regex validation
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }

    // Register form validation
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value.trim();
            const passwordConfirm = document.getElementById('register-password-confirm').value.trim();
            const address = document.getElementById('register-address').value.trim();
            const phone = document.getElementById('register-phone').value.trim();

            if (!validateEmail(email)) {
                alert('Vui lòng nhập email hợp lệ.');
                return;
            }

            if (password.length < 6) {
                alert('Mật khẩu phải có ít nhất 6 ký tự.');
                return;
            }

            if (password !== passwordConfirm) {
                alert('Mật khẩu xác nhận không khớp.');
                return;
            }

            if (address === '') {
                alert('Vui lòng nhập địa chỉ.');
                return;
            }

            const phonePattern = /^(\+84|0)\d{9,10}$/;
            if (!phonePattern.test(phone)) {
                alert('Số điện thoại không hợp lệ.');
                return;
            }

            alert('Đăng ký thành công!');
            registerForm.reset();
        });

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }

    // Login and Register modal handling
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const showRegisterLinks = document.querySelectorAll('.show-register-link');
    const showLoginLinks = document.querySelectorAll('.show-login-link');
    const loginModalClose = loginModal.querySelector('.modal-close');
    const registerModalClose = registerModal.querySelector('.modal-close');
    const showLoginLinkInRegister = document.getElementById('show-login-link');

    function showModal(modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    function hideModal(modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // restore scroll
    }

    loginBtn.addEventListener('click', () => {
        showModal(loginModal);
        hideModal(registerModal);
    });

    registerBtn.addEventListener('click', () => {
        showModal(registerModal);
        hideModal(loginModal);
    });

    showRegisterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(loginModal);
            showModal(registerModal);
        });
    });

    // Add event listener for "Bạn chưa có tài khoản? Đăng ký" link in login modal
    const showRegisterLinkInLogin = document.getElementById('show-register-link');
    if (showRegisterLinkInLogin) {
        showRegisterLinkInLogin.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(loginModal);
            showModal(registerModal);
        });
    }

    showLoginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(registerModal);
            showModal(loginModal);
        });
    });

    if (showLoginLinkInRegister) {
        showLoginLinkInRegister.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(registerModal);
            showModal(loginModal);
        });
    }

    loginModalClose.addEventListener('click', () => {
        hideModal(loginModal);
    });

    registerModalClose.addEventListener('click', () => {
        hideModal(registerModal);
    });

    // Optional: close modal when clicking outside modal content
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            hideModal(loginModal);
        }
    });

    registerModal.addEventListener('click', (e) => {
        if (e.target === registerModal) {
            hideModal(registerModal);
        }
    });
});
