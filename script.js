document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. Existing Navigation Auto-Highlighting
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
    
    // Check if user previously preferred dark mode
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️'; // Switch icon to sun
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙'; // Switch icon to moon
        }
    });

    // =========================================
    // 3. M3 Scroll-Driven Top App Bar
    // =========================================
    const navBar = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        // If scrolled down more than 10 pixels, elevate the navbar
        if (window.scrollY > 10) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
    });

    // =========================================
    // 4. M3 Interactive Ink Ripple Effect
    // =========================================
    // Targets navigation links and our custom theme button
    const rippleElements = document.querySelectorAll('nav a, .m3-icon-button, .article-card');

    rippleElements.forEach(element => {
        // Ensure element can cleanly container absolute positioned ripples
        element.style.position = 'relative';
        element.style.overflow = 'hidden';

        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('m3-ripple');
            
            // Calculate exact click coordinates relative to the button boundaries
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            // Remove old ripples if they exist, then append new one
            const oldRipple = this.querySelector('.m3-ripple');
            if (oldRipple) oldRipple.remove();
            
            this.appendChild(ripple);

            // Clean up DOM after animation ends
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
});