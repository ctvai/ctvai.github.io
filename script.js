document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.animated-username-item');
    const interval = 2;
    const totalDuration = items.length * interval;
    document.documentElement.style.setProperty('--animation-duration', `${totalDuration}s`);
    items.forEach((item, index) => {
        const delay = index * interval;
        item.style.animationDelay = `${delay}s`;
    });

    console.log("Animation delays are set automatically.");
    console.log(`Total duration: ${totalDuration}s, Interval per font: ${interval}s`);
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.hidden');

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
