document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mouse Tracking Glow Effect
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    document.body.appendChild(glow);

    window.addEventListener('mousemove', (e) => {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // 2. Mobile Menu Toggle - Class-based for consistency
    const mobileBtn = document.getElementById('mobile-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            mobileBtn.classList.toggle('active');
            // Bloquear scroll del body cuando el menú está abierto
            document.body.classList.toggle('menu-open', isActive);
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // 3. Navbar Appearance & Progress Bar
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('progress-bar');

    const handleScroll = () => {
        const winScroll = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        
        navbar.classList.toggle('scrolled', winScroll > 50);
        
        if (progressBar && height > 0) {
            const scrolled = (winScroll / height) * 100;
            progressBar.style.display = winScroll > 10 ? 'block' : 'none';
            progressBar.style.width = `${scrolled}%`;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // 4. card Tilt Effect

    const cards = document.querySelectorAll('.bento-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // 5. Smooth Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 6. Projects Slider
    const projectsGrid = document.getElementById('projects-grid');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (projectsGrid && prevBtn && nextBtn) {
        const scrollAmount = () => {
            const card = projectsGrid.querySelector('.project-card');
            return card ? card.offsetWidth + 32 : 300; // 32px equals 2rem gap
        };

        prevBtn.addEventListener('click', () => {
            projectsGrid.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            projectsGrid.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });
    }
});


