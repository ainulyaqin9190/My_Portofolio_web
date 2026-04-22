// scripts.js
const themeToggleBtn = document.getElementById("themeToggle");
const menuToggleBtn = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const sections = document.querySelectorAll("section");
const navAnchors = document.querySelectorAll('.nav-links a');

// 1. Logika Theme Toggle
if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        const icon = themeToggleBtn.querySelector("i");
        icon.classList.toggle("fa-sun");
        icon.classList.toggle("fa-moon");
    });
}

// 2. Logika Menu Toggle (Hamburger)
menuToggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const menuIcon = menuToggleBtn.querySelector("i");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");
});


// 3. Block scroll manual (wheel, touch, keyboard) — navigasi hanya lewat klik
let isScrolling = false;

function allowScrollTemporarily() {
    isScrolling = true;
    clearTimeout(window._scrollTimeout);
    window._scrollTimeout = setTimeout(() => { isScrolling = false; }, 1000);
}

window.addEventListener("wheel", (e) => { if (!isScrolling) e.preventDefault(); }, { passive: false });
window.addEventListener("touchmove", (e) => { if (!isScrolling) e.preventDefault(); }, { passive: false });
window.addEventListener("keydown", (e) => {
    const blocked = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
    if (!isScrolling && blocked.includes(e.key)) e.preventDefault();
});

// 4. Fungsi Scroll To Section (Perpindahan Halaman Penuh)
function scrollToSection(id) {
    allowScrollTemporarily();
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });

    // Tutup menu mobile setelah mengklik link
    if (window.innerWidth <= 768 && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        const menuIcon = menuToggleBtn.querySelector("i");
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
    }
    updateActiveLink(id);
}

// 5. Update active link
function updateActiveLink(currentId) {
    navAnchors.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute('href') === '#' + currentId) {
            a.classList.add("active");
        }
    });
}

// Navigasi lewat klik nav link (href="#section")
navAnchors.forEach(a => {
    a.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = a.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});