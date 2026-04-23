// scripts.js
const menuToggleBtn = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navOverlay = document.getElementById("navOverlay");
const navOverlayMenu = document.getElementById("navOverlayMenu");
const sections = document.querySelectorAll("section");
const navAnchors = document.querySelectorAll('.nav-links a');
const overlayAnchors = document.querySelectorAll('.nav-overlay-menu a');

// 1. Menu Toggle (Hamburger)
function openMenu() {
    navOverlay.classList.add("active");
    const menuIcon = menuToggleBtn.querySelector("i");
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
}

function closeMenu() {
    navOverlay.classList.remove("active");
    const menuIcon = menuToggleBtn.querySelector("i");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
}

function toggleMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    if (navOverlay.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
}

menuToggleBtn.addEventListener("touchstart", toggleMenu, { passive: false });
menuToggleBtn.addEventListener("click", toggleMenu);

navOverlay.addEventListener("touchstart", function(e) {
    if (e.target === navOverlay) { e.preventDefault(); closeMenu(); }
}, { passive: false });
navOverlay.addEventListener("click", function(e) {
    if (e.target === navOverlay) closeMenu();
});

// 2. Block scroll — desktop only
let isScrolling = false;

function allowScrollTemporarily() {
    isScrolling = true;
    clearTimeout(window._scrollTimeout);
    window._scrollTimeout = setTimeout(() => { isScrolling = false; }, 1200);
}

window.addEventListener("wheel", (e) => {
    if (!isScrolling) e.preventDefault();
}, { passive: false });

window.addEventListener("touchmove", (e) => {
    if (window.innerWidth <= 768) return;
    if (!isScrolling) e.preventDefault();
}, { passive: false });

window.addEventListener("keydown", (e) => {
    const blocked = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
    if (!isScrolling && blocked.includes(e.key)) e.preventDefault();
});

// 3. Scroll To Section
function scrollToSection(id) {
    allowScrollTemporarily();
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    closeMenu();
    updateActiveLink(id);
}

// 4. Update active link (desktop nav + overlay)
function updateActiveLink(currentId) {
    navAnchors.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute('href') === '#' + currentId) a.classList.add("active");
    });
    overlayAnchors.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute('href') === '#' + currentId) a.classList.add("active");
    });
}

// 5. Desktop nav link clicks
navAnchors.forEach(a => {
    a.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToSection(a.getAttribute('href').substring(1));
    });
});

// 6. Overlay nav link clicks (mobile)
overlayAnchors.forEach(a => {
    function handleTap(e) {
        e.preventDefault();
        e.stopPropagation();
        scrollToSection(a.getAttribute('href').substring(1));
    }
    a.addEventListener("touchstart", handleTap, { passive: false });
    a.addEventListener("click", handleTap);
});

// 7. SVG Progress Ring Animation
function animateProgressRings() {
    const circles = document.querySelectorAll('.progress-ring__circle');
    circles.forEach(circle => {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const percent = parseInt(circle.getAttribute('data-percent')) || 0;
        const offset = circumference - (percent / 100) * circumference;

        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;

        // Trigger animation after a short delay
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 300);
    });
}

// 8. Fade-in Animation with IntersectionObserver
function initFadeInObserver() {
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => observer.observe(section));
}

// 9. Back to Top Button
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click', () => {
        allowScrollTemporarily();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 10. Dynamic Footer Year
function updateFooterYear() {
    const yearEl = document.getElementById('footerYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    animateProgressRings();
    initFadeInObserver();
    initBackToTop();
    updateFooterYear();
});
