// 애니메이션 설정
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.animated-username-item');
    
    if (items.length === 0) {
        console.warn('애니메이션 아이템을 찾을 수 없습니다.');
        return;
    }
    
    // 사용자가 모션을 선호하지 않는 경우 애니메이션 건너뛰기
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        console.log('사용자가 애니메이션 줄이기를 선호하여 애니메이션을 비활성화합니다.');
        return;
    }
    
    const interval = 2; // 초
    const totalDuration = items.length * interval;
    
    // CSS 커스텀 프로퍼티 설정
    document.documentElement.style.setProperty('--animation-duration', `${totalDuration}s`);
    
    // 각 아이템에 딜레이 설정
    items.forEach((item, index) => {
        const delay = index * interval;
        item.style.animationDelay = `${delay}s`;
    });
    
    console.log(`애니메이션 딜레이가 자동으로 설정되었습니다.`);
    console.log(`총 지속 시간: ${totalDuration}초, 폰트별 간격: ${interval}초`);
});

// 스크롤 애니메이션 (Intersection Observer)
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.hidden');
    
    if (sections.length === 0) {
        console.warn('숨겨진 섹션을 찾을 수 없습니다.');
        return;
    }
    
    // 사용자가 모션을 선호하지 않는 경우에는 즉시 표시
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        sections.forEach(section => {
            section.classList.add('visible');
            section.classList.remove('hidden');
        });
        console.log('사용자가 애니메이션 줄이기를 선호하여 모든 섹션을 즉시 표시합니다.');
        return;
    }
    
    // Intersection Observer 설정
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 성능 최적화: 한 번 관찰된 요소는 관찰 중단
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 모든 숨겨진 섹션 관찰 시작
    sections.forEach(section => {
        observer.observe(section);
    });
    
    console.log(`${sections.length}개의 섹션에 스크롤 애니메이션이 설정되었습니다.`);
});

// 브라우저 지원성 체크 (선택사항)
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer 지원 확인
    if (!('IntersectionObserver' in window)) {
        console.warn('이 브라우저는 Intersection Observer를 지원하지 않습니다. 모든 섹션을 즉시 표시합니다.');
        const sections = document.querySelectorAll('.hidden');
        sections.forEach(section => {
            section.classList.add('visible');
            section.classList.remove('hidden');
        });
    }
    
    // CSS 커스텀 프로퍼티 지원 확인
    if (!CSS.supports('--custom-property', 'value')) {
        console.warn('이 브라우저는 CSS 커스텀 프로퍼티를 완전히 지원하지 않습니다.');
    }
});

// 성능 모니터링 (개발용 - 프로덕션에서는 제거 권장)
if (typeof performance !== 'undefined' && performance.mark) {
    document.addEventListener('DOMContentLoaded', () => {
        performance.mark('script-start');
        
        // 모든 초기화가 완료된 후
        requestAnimationFrame(() => {
            performance.mark('script-end');
            performance.measure('script-execution', 'script-start', 'script-end');
            
            const measure = performance.getEntriesByName('script-execution')[0];
            console.log(`스크립트 실행 시간: ${measure.duration.toFixed(2)}ms`);
        });
    });
}
