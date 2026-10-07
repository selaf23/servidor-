/* ============================================================
   UpSkill — Pricing Page interactions
   Pure vanilla JS
   ============================================================ */

(function () {
    'use strict';

    /* ----- Sticky header shadow on scroll ----- */
    const header = document.getElementById('header');
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

    if (header) {
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateHeaderShadow);
                ticking = true;
            }
        }, { passive: true });
    }

    /* ----- Card click feedback ----- */
    const cards = document.querySelectorAll('.plan-card');

    cards.forEach(function (card) {
        card.addEventListener('click', function (e) {
            if (e.target.closest('.plan-card__btn')) return;
            const plan = card.dataset.plan || 'plan';
            console.log('[UpSkill Pricing] Selected plan:', plan);

            card.animate(
                [
                    { transform: card.classList.contains('plan-card--featured') ? 'scale(1.02) translateY(0)' : 'translateY(0)' },
                    { transform: card.classList.contains('plan-card--featured') ? 'scale(1.04) translateY(-4px)' : 'translateY(-4px) scale(1.02)' },
                    { transform: card.classList.contains('plan-card--featured') ? 'scale(1.02) translateY(0)' : 'translateY(0)' }
                ],
                { duration: 260, easing: 'ease-out' }
            );
        });
    });

    /* ----- Button click feedback ----- */
    const buttons = document.querySelectorAll('.plan-card__btn');

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const card = btn.closest('.plan-card');
            const plan = card?.dataset.plan || 'plan';
            const price = card?.querySelector('.plan-card__amount')?.textContent || '';
            console.log(`[UpSkill Pricing] Continue with plan: ${plan} ($${price}/mo)`);

            btn.animate(
                [
                    { transform: 'translateY(0) scale(1)' },
                    { transform: 'translateY(1px) scale(0.97)' },
                    { transform: 'translateY(0) scale(1)' }
                ],
                { duration: 200, easing: 'ease-out' }
            );
        });
    });
})();
