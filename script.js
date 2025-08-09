// When the document is fully loaded, run the code inside.
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the class 'animated-username-item'.
    const items = document.querySelectorAll('.animated-username-item');

    // Set the interval in seconds for each font to be displayed.
    const interval = 2;

    // Calculate the total duration of the animation based on the number of items and the interval.
    const totalDuration = items.length * interval;

    // Set the total duration as a CSS variable on the root element.
    // This allows the CSS animation-duration to be dynamically set.
    document.documentElement.style.setProperty('--animation-duration', `${totalDuration}s`);

    // Loop through each item and set its animation-delay property.
    items.forEach((item, index) => {
        // The delay for each item is its index multiplied by the interval.
        const delay = index * interval;
        item.style.animationDelay = `${delay}s`;
    });

    console.log("Animation delays are set automatically.");
    console.log(`Total duration: ${totalDuration}s, Interval per font: ${interval}s`);
});

// 스크롤 감지 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    // ... (기존 애니메이션 코드) ...

    // 새 스크롤 감지 애니메이션 코드
    const sections = document.querySelectorAll('.hidden');

    const observerOptions = {
        root: null, // 뷰포트를 기준으로 감지
        threshold: 0.1, // 요소의 10%가 보일 때 감지
        rootMargin: "0px 0px -100px 0px" // 뷰포트 하단에서 100px 여유를 두고 감지
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 요소가 뷰포트 안에 들어왔을 때
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 한 번 애니메이션이 실행되면 더 이상 감지하지 않도록
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});