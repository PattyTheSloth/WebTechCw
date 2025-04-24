document.addEventListener('DOMContentLoaded', () => {
    const slideBar = document.getElementById('slideInBar');
    setTimeout(() => {
        slideBar.style.transform = 'translateX(0)';
        slideBar.style.visibility = 'visible';
        slideBar.style.opacity = '1';
    }, 100);  // Added slight delay for smooth loading
});

const ideaLamp = document.getElementById('ideaLamp');

ideaLamp.addEventListener('mouseenter', () => {
    ideaLamp.style.transform = 'scale(1.1) rotate(10deg)';
});

ideaLamp.addEventListener('mouseleave', () => {
    ideaLamp.style.transform = 'scale(1) rotate(0deg)';
});
