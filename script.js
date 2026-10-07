/* ============================================================
   UpSkill — Interactive behaviors
   Pure vanilla JS (no dependencies)
   ============================================================ */

(function () {
    'use strict';

    /* ----- Sticky header shadow on scroll ----- */
    const header = document.getElementById('header');
    let lastScrollY = 0;
    let ticking = false;

    function updateHeaderShadow() {
        const scrollY = window.scrollY || window.pageYOffset;
        if (scrollY > 8) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(updateHeaderShadow);
            ticking = true;
        }
    }, { passive: true });

    /* ----- Hero avatar parallax (subtle mouse-follow) ----- */
    const hero = document.querySelector('.hero');
    const blobs = document.querySelectorAll('.avatar-blob');

    if (hero && blobs.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let rafId = null;

        hero.addEventListener('mousemove', function (e) {
            if (rafId) return;
            rafId = window.requestAnimationFrame(function () {
                const rect = hero.getBoundingClientRect();
                const cx = (e.clientX - rect.left) / rect.width - 0.5;
                const cy = (e.clientY - rect.top) / rect.height - 0.5;

                blobs.forEach(function (blob, i) {
                    // Different "depth" per blob for parallax variety
                    const depth = (i % 3 + 1) * 8;
                    const x = -cx * depth;
                    const y = -cy * depth;
                    blob.style.setProperty('--px-x', x + 'px');
                    blob.style.setProperty('--px-y', y + 'px');
                });

                rafId = null;
            });
        });

        hero.addEventListener('mouseleave', function () {
            blobs.forEach(function (blob) {
                blob.style.setProperty('--px-x', '0px');
                blob.style.setProperty('--px-y', '0px');
            });
        });
    }

    /* ----- Search bar: focus highlight + submit demo ----- */
    const searchForm = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar__input');

    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                // Subtle pulse animation on the search button to confirm
                const btn = searchForm.querySelector('.search-bar__btn');
                btn.animate(
                    [
                        { transform: 'scale(1)' },
                        { transform: 'scale(0.92)' },
                        { transform: 'scale(1.06)' },
                        { transform: 'scale(1)' }
                    ],
                    { duration: 280, easing: 'ease-out' }
                );

                // Demo only: log to console
                console.log('[UpSkill] Searching for:', query);
            } else {
                searchInput.focus();
            }
        });
    }

    /* ----- Mobile menu toggle (demo behavior) ----- */
    const mobileToggle = document.getElementById('mobileMenuToggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            // For demo: scroll to categories section
            const categories = document.querySelector('.categories');
            if (categories) {
                categories.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    /* ----- Nav links active state on click ----- */
    const navLinks = document.querySelectorAll('.nav--left .nav__link');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.forEach(function (l) {
                l.classList.remove('nav__link--active');
            });
            link.classList.add('nav__link--active');
        });
    });

    /* ----- Category cards: ripple-like click feedback ----- */
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(function (card) {
        card.addEventListener('click', function () {
            const title = card.querySelector('.category-card__title')?.textContent || 'category';
            console.log('[UpSkill] Selected category:', title);

            card.animate(
                [
                    { transform: 'translateY(-4px) scale(1)' },
                    { transform: 'translateY(-2px) scale(0.98)' },
                    { transform: 'translateY(-4px) scale(1)' }
                ],
                { duration: 220, easing: 'ease-out' }
            );
        });
    });
})();
