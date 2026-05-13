document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. Dynamic Navbar on Scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 2rem';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.padding = '2rem';
            nav.style.boxShadow = 'none';
        }
        nav.style.transition = 'all 0.3s ease';
    });

    // 3. Prepare Progress Bars for Animation
    // Stores the inline width, sets it to 0%, so it can animate later
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        bar.setAttribute('data-width', bar.style.width);
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
    });

    // 4. Staggered Delays for Grid Items
    // Adds a slight delay to each card so they pop in sequentially
    const grids = document.querySelectorAll('.project-grid, .skills-grid, .services-grid');
    grids.forEach(grid => {
        const cards = Array.from(grid.children);
        cards.forEach((card, index) => {
            if(card.classList.contains('fade-in')) {
                card.style.transitionDelay = `${index * 0.15}s`;
            }
        });
    });

    // 5. Intersection Observer for Fade-ins and Triggering Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade in the element
                entry.target.classList.add('visible');
                
                // If the intersecting element contains progress bars, animate them
                const pBars = entry.target.querySelectorAll('.progress');
                pBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 300); // slight delay after fade-in starts
                });

                // Stop observing once animated to improve performance
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe all elements with the fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 6. Subtle Parallax Effect for the Hero Section
    const heroContent = document.querySelector('#hero .container');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        // Only run the calculation if we are near the top of the page
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.35}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.2;
        }
    });

});