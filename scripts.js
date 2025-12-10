// scripts.js
const themeToggleBtn = document.getElementById("themeToggle");
const menuToggleBtn = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const sections = document.querySelectorAll("section");
const navAnchors = document.querySelectorAll('.nav-links a');

// 1. Logika Theme Toggle
themeToggleBtn.addEventListener("click", () => {
    const icon = themeToggleBtn.querySelector("i");
    icon.classList.toggle("fa-sun");
    icon.classList.toggle("fa-moon"); 
});

// 2. Logika Menu Toggle (Hamburger)
menuToggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const menuIcon = menuToggleBtn.querySelector("i");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times"); 
});

// 3. Fungsi Scroll To Section (Perpindahan Halaman Penuh)
function scrollToSection(id) {
    // Scroll mulus ke elemen dengan ID yang sesuai, memberikan efek perpindahan halaman
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    
    // Tutup menu mobile setelah mengklik link
    if (window.innerWidth <= 768 && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        const menuIcon = menuToggleBtn.querySelector("i");
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
    }
}

// 4. Logika Active Link Saat Scroll
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const viewportMid = window.innerHeight / 2;
        
        // Cek apakah bagian sedang berada di tengah-tengah layar
        if (pageYOffset >= sectionTop - viewportMid) { 
            current = section.getAttribute("id");
        }
    });

    navAnchors.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute('href') && a.getAttribute('href').includes(current)) {
            a.classList.add("active");
        }
    });
});