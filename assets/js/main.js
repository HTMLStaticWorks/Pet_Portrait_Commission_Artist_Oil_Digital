/*
 * Pawtrait - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Toggle
    const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
    const body = document.body;

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateToggleIcons(isDark);
        });
    });

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateToggleIcons(true);
    }

    function updateToggleIcons(isDark) {
        const navIcons = document.querySelectorAll('#theme-toggle i');
        const mobileIcons = document.querySelectorAll('.theme-toggle-btn i');
        
        navIcons.forEach(icon => {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });
        
        mobileIcons.forEach(icon => {
            icon.className = isDark ? 'fas fa-sun me-2' : 'fas fa-moon me-2';
        });
    }

    // 2. RTL Toggle (For demo purposes)
    const rtlToggles = document.querySelectorAll('#rtl-toggle, .rtl-toggle-btn');
    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', newDir);
            if (newDir === 'rtl') {
                document.documentElement.setAttribute('lang', 'ar');
            } else {
                document.documentElement.setAttribute('lang', 'en');
            }
            localStorage.setItem('dir', newDir);
        });
    });

    // Check saved direction
    const savedDir = localStorage.getItem('dir');
    if (savedDir) {
        document.documentElement.setAttribute('dir', savedDir);
        if (savedDir === 'rtl') {
            document.documentElement.setAttribute('lang', 'ar');
        }
    }

    // 3. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
            document.body.classList.toggle('menu-open');
            document.documentElement.classList.toggle('menu-open');
        });
    }

    // 4. Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 5. Countdown Timer (Used in coming-soon.html)
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        const targetDate = new Date('2026-12-31T23:59:59').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                clearInterval(interval);
                countdownEl.innerHTML = "LAUNCHED!";
            }
        };

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // 6. AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            disableMutationObserver: false,
            debounceDelay: 50,
            throttleDelay: 99
        });
    }

    // 7. Scroll Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 8. Dropdown Click Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');

        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            menu.classList.toggle('show');
            
            // Close other dropdowns
            dropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.querySelector('.dropdown-menu').classList.remove('show');
                }
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        dropdowns.forEach(dropdown => {
            dropdown.querySelector('.dropdown-menu').classList.remove('show');
        });
    });

    // 9. Active State Menu Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksList = document.querySelectorAll('.nav-links a');
    
    navLinksList.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
            
            // Highlight parent if in dropdown
            const dropdownParent = link.closest('.dropdown');
            if (dropdownParent) {
                dropdownParent.querySelector('a').classList.add('active');
            }
        }
    });

    // 10. Fix side scroll on refresh (AOS conflict)
    window.addEventListener('load', () => {
        document.body.style.overflowX = 'hidden';
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });
});
