// Theme Toggle
function initTheme() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

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

// Projects View Toggle and Filter
function initProjects() {
    const projectsContainer = document.querySelector('.projects-container');
    const viewToggles = document.querySelectorAll('.view-toggle');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // View Toggle
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            viewToggles.forEach(t => t.classList.remove('active'));
            toggle.classList.add('active');
            
            const view = toggle.dataset.view;
            projectsContainer.className = `projects-container ${view}-view`;
        });
    });

    // Filter Toggle
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initTheme();
    typeWriter();
    initProjects();

    // Add theme toggle event listener
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
});