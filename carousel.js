document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.project-slides');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.project-card').length;

    function updateSlidePosition() {
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePosition();
    });
}); 