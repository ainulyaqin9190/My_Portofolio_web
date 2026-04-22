// scripts.js
const menuToggleBtn = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navOverlay = document.getElementById("navOverlay");
const navOverlayMenu = document.getElementById("navOverlayMenu");
const sections = document.querySelectorAll("section");
const navAnchors = document.querySelectorAll('.nav-links a');
const overlayAnchors = document.querySelectorAll('.nav-overlay-menu a');

// 1. Menu Toggle (Hamburger) — buka/tutup overlay
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

// Klik area kosong overlay untuk menutup
navOverlay.addEventListener("touchstart", function(e) {
    if (e.target === navOverlay) { e.preventDefault(); closeMenu(); }
}, { passive: false });
navOverlay.addEventListener("click", function(e) {
    if (e.target === navOverlay) closeMenu();
});

// 2. Block scroll — hanya di desktop
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
