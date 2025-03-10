document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    let lastScrollY = window.scrollY;
    
    // 检查当前滚动位置是否在深色背景区域
    function isInDarkSection(scrollY) {
        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollY;
            const sectionBottom = sectionTop + rect.height;
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                return section.classList.contains('dark-bg');
            }
        }
        return false;
    }
    
    // 更新顶部栏样式
    function updateHeaderStyle() {
        const scrollY = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        // 检测滚动方向
        const scrollingDown = scrollY > lastScrollY;
        
        // 如果超过首页图片底部
        if (scrollY > heroBottom) {
            if (scrollingDown) {
                // 向下滚动时隐藏
                header.style.transform = 'translateY(-100%)';
            } else {
                // 向上滚动时显示
                header.style.transform = 'translateY(0)';
            }
        } else {
            // 在首页图片区域内始终显示
            header.style.transform = 'translateY(0)';
        }
        
        // 更新背景样式
        const inDarkSection = isInDarkSection(scrollY);
        if (inDarkSection) {
            header.classList.remove('solid');
            header.classList.add('transparent');
        } else {
            header.classList.remove('transparent');
            header.classList.add('solid');
        }
        
        // 保存当前滚动位置
        lastScrollY = scrollY;
    }
    
    // 监听滚动事件（使用节流函数优化性能）
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeaderStyle();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // 初始化顶部栏样式
    updateHeaderStyle();
}); 