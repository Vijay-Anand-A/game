// Shared UI initialisation. Called once the shared header (header.html)
// has been injected into the page, so mobile menu / nav links are available.
function initUI() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const activeNavSelector = currentPage === 'about.html'
        ? '.nav-about'
        : currentPage === 'gallery.html'
            ? '.nav-gallery'
            : '.nav-home';
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.toggle('active', link.matches(activeNavSelector));
    });

    if (mobileMenuBtn && !mobileMenuBtn.dataset.menuBound) {
        mobileMenuBtn.dataset.menuBound = '1';
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Smooth Scrolling for in-page anchors and index.html#section links
    document.querySelectorAll('a[href]').forEach(anchor => {
        if (anchor.dataset.scrollBound) return;
        anchor.dataset.scrollBound = '1';
        const href = anchor.getAttribute('href') || '';
        let hash = '';
        if (href.startsWith('#')) {
            hash = href;
        } else if (href.startsWith('index.html#')) {
            hash = href.slice('index.html'.length);
            // On the home page, scroll instead of reloading
            const isHome = !location.pathname.split('/').pop() || location.pathname.endsWith('index.html');
            if (!isHome) return; // let normal navigation happen on other pages
        } else {
            return;
        }

        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(hash);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                if (navLinks) navLinks.classList.remove('active');
                const icon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
                if (icon) icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    // Active link highlighting on scroll (home page only)
    if (currentPage === 'index.html' && !window.__scrollSpyBound) {
        window.__scrollSpyBound = true;
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            const navItems = document.querySelectorAll('.nav-links a');

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                const href = item.getAttribute('href') || '';
                const id = href.includes('#') ? href.split('#').pop() : '';
                if (id === current) item.classList.add('active');
            });
        });
    }

    // News Carousel
    const newsSlides = document.getElementById('newsSlides');
    const newsDots = document.querySelectorAll('.news-dot');
    if (newsSlides && newsDots.length && !newsSlides.dataset.carouselBound) {
        newsSlides.dataset.carouselBound = '1';
        let currentSlide = 0;
        const totalSlides = newsDots.length;

        function goToSlide(index) {
            currentSlide = (index + totalSlides) % totalSlides;
            newsSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
            newsDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        newsDots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.slide, 10));
            });
        });

        setInterval(() => goToSlide(currentSlide + 1), 5000);
    }
}

window.initUI = initUI;
document.addEventListener('DOMContentLoaded', initUI);
