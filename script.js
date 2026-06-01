document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 0. Centralized Icon Infrastructure
    // =========================================
    try {
        let favicon = document.querySelector("link[rel~='icon']");
        if (!favicon) {
            favicon = document.createElement('link');
            favicon.rel = 'icon';
            document.head.appendChild(favicon);
        }
        favicon.type = 'image/png';
        favicon.href = './images/favicon.png'; 
    } catch (e) {
        console.error("System icon loading bypassed:", e);
    }

    // =========================================
    // 1. Dynamic Navigation HTML Injection
    // =========================================
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath.startsWith('index.html')) currentPath = 'index.html';

    let pageHeadingText = "Home"; 
    if (currentPath === 'page1.html') pageHeadingText = "Reflection";
    else if (currentPath === 'page2.html') pageHeadingText = "Regulation";
    else if (currentPath === 'page3.html') pageHeadingText = "Evaluation";
    else if (currentPath === 'page4.html') pageHeadingText = "Mindset";

    let navElement = document.querySelector('.floating-pill-nav');
    if (!navElement) {
        navElement = document.createElement('nav');
        navElement.className = 'floating-pill-nav';
        document.body.insertAdjacentElement('afterbegin', navElement);
    }

    navElement.innerHTML = `
        <div class="nav-title">E-Portfolio</div>
        <div class="nav-center-heading">${pageHeadingText}</div>
        <div class="nav-actions-cluster">
            <button class="theme-toggle-button" id="themeToggle" aria-label="Toggle Theme">🌓</button>
            <button class="menu-trigger-btn" onclick="toggleMenu(true)" aria-label="Open Menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
        </div>
    `;

    let menuOverlay = document.getElementById('menuOverlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.id = 'menuOverlay';
        menuOverlay.className = 'fullscreen-menu-overlay';
        document.body.insertAdjacentElement('beforeend', menuOverlay);
    }

    menuOverlay.innerHTML = `
        <button class="menu-close-btn" onclick="toggleMenu(false)" aria-label="Close Menu">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
        <nav class="fullscreen-nav-links">
            <a href="index.html?entered=true" class="rolling-link"><span class="link-text" data-text="Home">Home</span></a>
            <a href="page1.html" class="rolling-link"><span class="link-text" data-text="Reflection">Reflection</span></a>
            <a href="page2.html" class="rolling-link"><span class="link-text" data-text="Regulation">Regulation</span></a>
            <a href="page3.html" class="rolling-link"><span class="link-text" data-text="Evaluation">Evaluation</span></a>
            <a href="page4.html" class="rolling-link"><span class="link-text" data-text="Mindset">Mindset</span></a>
        </nav>
        <footer class="menu-footer-container">
            <div class="menu-footer-line">Contact Me</div>
            <div class="menu-footer-line">Phone: 1111</div>
            <div class="menu-footer-line">Email: email</div>
        </footer>
    `;

    // =========================================
    // 2. Automated Path Detection & Active Highlighting
    // =========================================
    document.querySelectorAll('.rolling-link').forEach(link => {
        const hrefTarget = link.getAttribute('href').split('?')[0];
        if (currentPath === hrefTarget) {
            link.classList.add('active-page-indicator');
            link.setAttribute('aria-current', 'page');
        }
    });

    // =========================================
    // 3. Centralized Palette Toggle Manager
    // =========================================
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-theme');
            themeToggle.textContent = '🌙';
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
    }

    // =========================================
    // 4. Dynamic Micro-Interaction Physics (Ripples)
    // =========================================
    const interactiveElements = document.querySelectorAll('.rolling-link, .theme-toggle-button, .menu-trigger-btn, .menu-close-btn');
    interactiveElements.forEach(element => {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';

        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('tap-ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            const oldRipple = this.querySelector('.tap-ripple');
            if (oldRipple) oldRipple.remove();
            this.appendChild(ripple);

            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    // =========================================
    // 5. Outside Canvas Click Dismissal Handler
    // =========================================
    menuOverlay.addEventListener('click', function(event) {
        // Safe context checking: ensures overlay structure exists before targeting classes
        if (event.target === menuOverlay || event.target.classList.contains('fullscreen-nav-links')) {
            toggleMenu(false);
        }
    });

    // =========================================
    // 6. Sequential Staggered Entrance Pipeline
    // =========================================
    const animatedElements = document.querySelectorAll('.animated-element');
    const delayIncrement = 120; 
    const startDelay = 150;      

    animatedElements.forEach((element, index) => {
        const animationDelay = startDelay + (index * delayIncrement);
        setTimeout(() => {
            element.classList.add('entry-bounce');
            element.addEventListener('animationend', () => {
                element.classList.remove('animate-ready', 'entry-bounce');
            }, { once: true });
        }, animationDelay);
    });
});

// =========================================
// 7. Global Menu Toggle Controllers
// =========================================
function toggleMenu(open) {
    const menuOverlay = document.getElementById('menuOverlay');
    if (!menuOverlay) return;
    
    if (open) {
        menuOverlay.classList.add('menu-active');
        const links = menuOverlay.querySelectorAll('.rolling-link');
        const footer = menuOverlay.querySelector('.menu-footer-container');
        
        links.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(50px) scale(0.9) skewY(4deg)';
            link.style.transition = 'none';
            
            setTimeout(() => {
                link.style.transition = 'opacity 0.65s cubic-bezier(0.5, -0.6, 0.1, 1.65), transform 0.65s cubic-bezier(0.5, -0.6, 0.1, 1.65)';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0) scale(1) skewY(0deg)';
            }, 80 + (index * 75)); 
        });

        if (footer) {
            footer.style.opacity = '0';
            footer.style.transform = 'translateY(20px)';
            footer.style.transition = 'none';
            setTimeout(() => {
                footer.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                footer.style.opacity = '0.6';
                footer.style.transform = 'translateY(0)';
            }, 450);
        }
    } else {
        menuOverlay.classList.remove('menu-active');
    }
}