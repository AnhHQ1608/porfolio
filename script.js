/**
 * PORTFOLIO JAVASCRIPT - NGUYEN QUOC ANH
 * Interactions, Typing Animation, Scroll Effects, Filter & Toast
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Header Scrolled State ---
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('backToTop');

    const handleScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 450) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- 2. Mobile Navigation Toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('open');
            mobileToggle.classList.toggle('active', isOpen);
            mobileToggle.setAttribute('aria-expanded', isOpen);
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                mobileToggle.classList.remove('active');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && mobileNav.classList.contains('open')) {
                mobileNav.classList.remove('open');
                mobileToggle.classList.remove('active');
            }
        });
    }

    // --- 3. Typing Animation in Hero ---
    const typedTextElement = document.getElementById('typedText');
    const words = [
        'Frontend Developer',
        'UI/UX Designer',
        'Fullstack Web Developer',
        'FPT University Student'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Finished typing word, wait before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    };

    if (typedTextElement) {
        typeEffect();
    }

    // --- 4. ScrollSpy: Highlight Active Navigation Link ---
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

    const updateActiveNav = () => {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // --- 5. Project Category Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add keyframe animation dynamically for project fade-in
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(styleSheet);

    // --- 6. Toast Notification Helper ---
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    let toastTimeout = null;

    const showToast = (message, isError = false) => {
        if (!toast) return;

        if (toastTimeout) clearTimeout(toastTimeout);

        toastMessage.textContent = message;
        const icon = toast.querySelector('.toast-icon i');

        if (isError) {
            toast.style.borderColor = '#ef4444';
            if (icon) icon.className = 'fa-solid fa-circle-exclamation';
            if (icon) icon.style.color = '#ef4444';
        } else {
            toast.style.borderColor = '#10b981';
            if (icon) icon.className = 'fa-solid fa-circle-check';
            if (icon) icon.style.color = '#10b981';
        }

        toast.classList.add('show');

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };

    // --- 7. Copy Email to Clipboard ---
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'quocanh.dev@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast('Đã sao chép email vào bộ nhớ tạm: ' + email);
            }).catch(() => {
                showToast('Sao chép thất bại, hãy copy thủ công!', true);
            });
        });
    }

    // --- 8. Contact Form Submission Handler ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showToast('Vui lòng điền đầy đủ các thông tin có dấu *', true);
                return;
            }

            // Simulate form submission
            if (submitBtn) {
                const originalHtml = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span>Đang gửi...</span>
                    <i class="fa-solid fa-spinner fa-spin"></i>
                `;

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalHtml;
                    contactForm.reset();
                    showToast(`Cảm ơn ${name}! Tin nhắn của bạn đã được gửi. Tôi sẽ phản hồi sớm.`);
                }, 1200);
            }
        });
    }
});
