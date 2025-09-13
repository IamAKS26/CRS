// public/about.js

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('stats-section');

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const duration = 2000; // Animation duration in milliseconds
        const increment = target / (duration / 10);

        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.innerText = Math.ceil(count).toLocaleString();
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };

        updateCount();
    };

    // Use Intersection Observer to trigger animation only when the section is visible
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    // Check if counter has already been animated
                    if (!counter.classList.contains('animated')) {
                        startCounter(counter);
                        counter.classList.add('animated');
                    }
                });
                // Optional: unobserve after animating
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    if (statsSection) {
        observer.observe(statsSection);
    }
});