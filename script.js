document.addEventListener("DOMContentLoaded", () => {
    const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
    const revealItems = document.querySelectorAll(".fade-in");
    const galleries = document.querySelectorAll("[data-gallery]");
    const sectionTargets = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (!motionReduced && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.15
            }
        );

        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("visible"));
    }

    const setActiveLink = () => {
        const marker = window.scrollY + window.innerHeight * 0.28;

        let activeId = "";

        sectionTargets.forEach((section) => {
            if (marker >= section.offsetTop) {
                activeId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const targetId = link.getAttribute("href").slice(1);
            link.classList.toggle("active", targetId === activeId);
        });
    };

    setActiveLink();
    window.addEventListener("scroll", setActiveLink, { passive: true });

    galleries.forEach((gallery) => {
        const slides = Array.from(gallery.querySelectorAll(".gallery-slide"));
        const dots = Array.from(gallery.querySelectorAll("[data-gallery-dot]"));
        const prevButton = gallery.querySelector("[data-gallery-prev]");
        const nextButton = gallery.querySelector("[data-gallery-next]");

        if (slides.length <= 1) {
            if (prevButton) {
                prevButton.hidden = true;
            }

            if (nextButton) {
                nextButton.hidden = true;
            }

            return;
        }

        let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
        if (activeIndex < 0) {
            activeIndex = 0;
        }

        const renderGallery = (index) => {
            activeIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle("is-active", slideIndex === activeIndex);
            });

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle("is-active", dotIndex === activeIndex);
            });
        };

        prevButton?.addEventListener("click", () => {
            renderGallery(activeIndex - 1);
        });

        nextButton?.addEventListener("click", () => {
            renderGallery(activeIndex + 1);
        });

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const targetIndex = Number(dot.getAttribute("data-gallery-dot"));
                renderGallery(targetIndex);
            });
        });

        renderGallery(activeIndex);
    });
});
