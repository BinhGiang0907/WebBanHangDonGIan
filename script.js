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

    // Login and Register modal handling
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const showRegisterLinks = document.querySelectorAll('.show-register-link');
    const showLoginLinks = document.querySelectorAll('.show-login-link');
    const loginModalClose = loginModal.querySelector('.modal-close');
    const registerModalClose = registerModal.querySelector('.modal-close');

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

    showLoginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(registerModal);
            showModal(loginModal);
        });
    });

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
