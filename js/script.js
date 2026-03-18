// Обновление года в футере
function updateCopyrightYear() {
    const copyrightElement = document.getElementById('copyright');
    if (!copyrightElement) return;

    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    
    let yearText;
    if (currentYear > startYear) {
        yearText = `${startYear}-${currentYear}`;
    } else {
        yearText = `${startYear}`;
    }
    
    copyrightElement.textContent = yearText;
}

// Подсветка активной страницы в меню
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Обработка формы (просто пример, без отправки)
function initFormHandler() {
    const form = document.getElementById('quick-contact');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо! Я свяжусь с вами в ближайшее время. (Демо-режим)');
            form.reset();
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCopyrightYear();
    setActiveNav();
    initFormHandler();
    
    // Анимация появления элементов
    const animatedElements = document.querySelectorAll('.advantage-item, .feature-block, .portfolio-item, .contact-method');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(el);
    });
});