document.addEventListener('DOMContentLoaded', () => {
    const slideBar = document.getElementById('slideInBar');
    setTimeout(() => {
        slideBar.style.transform = 'translateX(0)';
        slideBar.style.visibility = 'visible';
        slideBar.style.opacity = '1';
    }, 100);

    const ideaLamp = document.getElementById('ideaLamp');
    ideaLamp.addEventListener('mouseenter', () => {
        ideaLamp.style.transform = 'scale(1.1) rotate(10deg)';
    });
    ideaLamp.addEventListener('mouseleave', () => {
        ideaLamp.style.transform = 'scale(1) rotate(0deg)';
    });

    document.getElementById('submitBtn').addEventListener('click', () => {
        let score = 0;
        let total = document.querySelectorAll('.question-block').length;

        document.querySelectorAll('.question-block').forEach(block => {
            const selected = block.querySelector('input[type="radio"]:checked');
            const labels = block.querySelectorAll('label');

            labels.forEach(label => {
                label.classList.remove('correct', 'incorrect', 'disabled');
            });

            if (selected) {
                const isCorrect = selected.dataset.correct === "true";
                const selectedLabel = selected.closest('label');

                if (isCorrect) {
                    selectedLabel.classList.add('correct');
                    score++;
                } else {
                    selectedLabel.classList.add('incorrect');
                    block.querySelector('input[data-correct="true"]').closest('label').classList.add('correct');
                }

                labels.forEach(label => label.classList.add('disabled'));
            }
        });

        const scoreDisplay = document.getElementById('scoreDisplay');
        scoreDisplay.textContent = `Your final score is: ${score} out of ${total}`;
        document.getElementById('comgratulations_sound').play();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
