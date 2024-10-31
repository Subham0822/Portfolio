// Mobile Menu Toggle
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    const menuIcon = document.querySelector('.mobile-menu-btn i');
    menuIcon.dataset.lucide = mobileMenu.classList.contains('active') ? 'x' : 'menu';
    lucide.createIcons();
}

// Typewriter Effect
const texts = ['DEVELOPER', 'DESIGNER', 'CODER'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterElement = document.getElementById('typewriter-text');

function typeWriter() {
    const currentText = texts[textIndex];
    const speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    typewriterElement.textContent = currentText.substring(0, charIndex);

    charIndex += isDeleting ? -1 : 1;
    setTimeout(typeWriter, speed);
}

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    typeWriter();
});