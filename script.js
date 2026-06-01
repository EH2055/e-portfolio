document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. Navigation Auto-Highlighting
    // =========================================
    document.querySelectorAll('nav a').forEach(link => {
        if (window.location.href.endsWith(link.getAttribute('href')) || 
           (link.getAttribute('href') === 'index.html' && (window.location.pathname === '/' || window.location.href.endsWith('/')))) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // =========================================
    // 2. M3 Dark Mode Toggle
    // =========================================
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check local storage memory for theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });

    // =========================================
    // 3. M3 Scroll-Driven Top App Bar Elevation
    // =========================================
    const navBar = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
    });

    // =========================================
    // 4. M3 Interactive Ink Ripple Effect
    // =========================================
    const rippleElements = document.querySelectorAll('nav a, .m3-icon-button');

    rippleElements.forEach(element => {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';

        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('m3-ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            const oldRipple = this.querySelector('.m3-ripple');
            if (oldRipple) oldRipple.remove();
            
            this.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
});