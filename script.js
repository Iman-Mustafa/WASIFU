/* ============================================
   KHADIJA LULALULA MAGONO - Portfolio Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // Navigation functionality
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.dataset.section;

            // Update active nav button
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                    // Re-trigger animations
                    triggerAnimations(section);
                }
            });

            // Smooth scroll to content area on mobile
            if (window.innerWidth <= 768) {
                const contentArea = document.querySelector('.content-area');
                contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Re-trigger card animations when section becomes visible
    function triggerAnimations(section) {
        const animatedElements = section.querySelectorAll('.info-card, .timeline-item');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Force reflow
            el.style.animation = '';
        });
    }

    // Add subtle parallax effect to passport photo on mouse move
    const passportFrame = document.querySelector('.passport-frame');
    if (passportFrame && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;

            const rotateX = yPercent * -4;
            const rotateY = xPercent * 4;

            passportFrame.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        document.addEventListener('mouseleave', () => {
            passportFrame.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.info-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        const currentIndex = Array.from(navButtons).findIndex(btn => btn.classList.contains('active'));

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % navButtons.length;
            navButtons[nextIndex].click();
            navButtons[nextIndex].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + navButtons.length) % navButtons.length;
            navButtons[prevIndex].click();
            navButtons[prevIndex].focus();
        }
    });
});
