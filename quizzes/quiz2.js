/*Slide in bar event at the top of the page*/
document.addEventListener('DOMContentLoaded', () => {
    const slideBar = document.getElementById('slideInBar');
    setTimeout(() => {
        slideBar.style.transform = 'translateX(0)';
        slideBar.style.visibility = 'visible';
        slideBar.style.opacity = '1';
    }, 100);
});


//Timer, load, startscreen and start quiz logic.
window.addEventListener("load", function () {
    document.getElementById("start-btn").addEventListener("click", function () {
        const startSound = document.getElementById("start-sound");
        startSound.play();
        document.getElementById("start-screen").style.display = "none";
        document.getElementById("quiz-content").style.display = "block";

        document.getElementById("timer-container").style.display = "flex";

        let timeLeft = 600;
        const timerEl = document.getElementById("timer");

        const updateTimer = () => {
            const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
            const secs = String(timeLeft % 60).padStart(2, '0');
            timerEl.textContent = `${mins}:${secs}`;

            if (timeLeft > 0) {
                timeLeft--;
            } else {
                clearInterval(countdown);
                timerEl.textContent = "00:00";
                alert("Time's up!");
                document.querySelectorAll("input, button").forEach(el => el.disabled = true);
            }
        };

        updateTimer();
        const countdown = setInterval(updateTimer, 1000);
    });

    //Question 1 Logic
    document.getElementById("Question1").addEventListener("submit", function (event) {
        event.preventDefault();
        const answer = document.getElementById("answer").value.trim().toLowerCase();
        const resultElement = document.getElementById("result");
        const correctSound = document.getElementById("Correct");
        const wrongSound = document.getElementById("Wrong");

        const answers = {
            "pallet town": "answer1",
            "lavender town": "answer2",
            "victory road": "answer3",
            "cerulean city": "answer4",
        };

        if (answers[answer]) {
            document.getElementById(answers[answer]).style.display = "block";
            resultElement.innerHTML = `Correct! ${answer.charAt(0).toUpperCase() + answer.slice(1)} is the right answer.`;
            resultElement.className = "correct";
            correctSound.play();
        } else {
            resultElement.innerHTML = `Incorrect, Try again!`;
            resultElement.className = "incorrect";
            wrongSound.play();
        }
    });

    let selectedImage = null;
    document.querySelectorAll(".pokemon-img").forEach((img) => {
        img.addEventListener("click", function () {
            if (selectedImage) selectedImage.style.border = "none";
            selectedImage = img;
            selectedImage.style.border = "5px solid var(--primary-blue)";
        });
    });

    // Question 2
    document.getElementById("Question2").addEventListener("submit", function (event) {
        event.preventDefault();
        const form = this;
        if (form.classList.contains("submitted")) return;

        const resultElement = document.getElementById("result2");
        const correctSound = document.getElementById("Correct");
        const wrongSound = document.getElementById("Wrong");

        if (!selectedImage) {
            resultElement.innerHTML = "Please select a Pokémon before submitting.";
            resultElement.className = "incorrect";
            return;
        }

        if (selectedImage.getAttribute("data-answer") === "correct") {
            resultElement.innerHTML = "Correct! Rhydon was the first Pokémon designed by Gamefreak.";
            resultElement.className = "correct";
            correctSound.play();
        } else {
            resultElement.innerHTML = "Incorrect! Try again.";
            resultElement.className = "incorrect";
            wrongSound.play();
        }

        form.classList.add("submitted");
        form.querySelector("input[type='submit']").disabled = true;
    });

    // Question 3
    document.getElementById("Question3").addEventListener("submit", function (event) {
        event.preventDefault();
        const form = this;
        if (form.classList.contains("submitted")) return;

        const resultElement = document.getElementById("result3");
        const correctSound = document.getElementById("Correct");
        const wrongSound = document.getElementById("Wrong");

        if (!selectedOption3) {
            resultElement.innerHTML = "Please select an answer first!";
            resultElement.className = "incorrect";
            return;
        }

        const isCorrect = selectedOption3.getAttribute("data-answer") === "correct";

        if (isCorrect) {
            resultElement.innerHTML = "Correct! Clefairy is the right answer.";
            resultElement.className = "correct";
            correctSound.play();
        } else {
            resultElement.innerHTML = "Incorrect! Try again.";
            resultElement.className = "incorrect";
            wrongSound.play();
        }

        form.classList.add("submitted");
        form.querySelector("input[type='submit']").disabled = true;
    });

    // Question 4
    const cryAudio = document.getElementById("poke-cry");
    const cryButton = document.getElementById("play-cry");

    cryButton.addEventListener("click", () => {
        cryAudio.currentTime = 0;
        cryAudio.play();
    });

    document.querySelectorAll("#question4-options .answer-option").forEach(option => {
        option.addEventListener("click", () => {
            document.querySelectorAll("#question4-options .answer-option").forEach(o => o.classList.remove("selected"));
            selectedOption4 = option;
            option.classList.add("selected");
        });
    });

    document.getElementById("Question4").addEventListener("submit", function (event) {
        event.preventDefault();
        const form = this;
        if (form.classList.contains("submitted")) return;

        const resultElement = document.getElementById("result4");
        const correctSound = document.getElementById("Correct");
        const wrongSound = document.getElementById("Wrong");

        if (!selectedOption4) {
            resultElement.innerHTML = "Please select an answer!";
            resultElement.className = "incorrect";
            return;
        }

        const isCorrect = selectedOption4.getAttribute("data-answer") === "correct";

        if (isCorrect) {
            resultElement.innerHTML = "Correct! That cry belongs to Kangaskhan.";
            resultElement.className = "correct";
            correctSound.play();
            document.getElementById("dex-reveal").src = "../images/kangaskhan.png";
        } else {
            resultElement.innerHTML = "Incorrect! Try again.";
            resultElement.className = "incorrect";
            wrongSound.play();
        }

        form.classList.add("submitted");
        form.querySelector("input[type='submit']").disabled = true;
    });

    // Question 5
    document.getElementById("Question5").addEventListener("submit", function (event) {
        event.preventDefault();
        const form = this;
        if (form.classList.contains("submitted")) return;

        const resultElement = document.getElementById("result5");
        const correctSound = document.getElementById("Correct");
        const wrongSound = document.getElementById("Wrong");
        const pikachuImg = document.getElementById("pikachu-img");

        if (!selectedType) {
            resultElement.innerHTML = "Please choose a type!";
            resultElement.className = "incorrect";
            return;
        }

        const isCorrect = selectedType.getAttribute("data-answer") === "correct";

        if (isCorrect) {
            pikachuImg.src = "../images/pikaScared.png";
            resultElement.innerHTML = "Correct! Ground types are strong against Electric!";
            resultElement.className = "correct";
            correctSound.play();
        } else {
            pikachuImg.src = "../images/pikaLaugh.png";
            resultElement.innerHTML = "Incorrect! Try again.";
            resultElement.className = "incorrect";
            wrongSound.play();
        }

        form.classList.add("submitted");
        form.querySelector("input[type='submit']").disabled = true;
    });

    // Final quiz score calculation
    document.getElementById("finishQuizBtn").addEventListener("click", () => {
        let score = 0;
        // Question 1 - 1 point for each correct answer revealed
        const answerIds = ["answer1", "answer2", "answer3", "answer4"];
        answerIds.forEach(id => {
            if (document.getElementById(id).style.display === "block") {
                score += 1;
            }
        });

        // Question 2
        if (
            document.getElementById("Question2").classList.contains("submitted") &&
            selectedImage?.getAttribute("data-answer") === "correct"
        ) {
            score += 1;
        }

        // Question 3
        if (
            document.getElementById("Question3").classList.contains("submitted") &&
            selectedOption3?.getAttribute("data-answer") === "correct"
        ) {
            score += 1;
        }

        // Question 4
        if (
            document.getElementById("Question4").classList.contains("submitted") &&
            selectedOption4?.getAttribute("data-answer") === "correct"
        ) {
            score += 1;
        }

        // Question 5
        if (
            document.getElementById("Question5").classList.contains("submitted") &&
            selectedType?.getAttribute("data-answer") === "correct"
        ) {
            score += 1;
        }

        // Display score
        const finalScore = document.getElementById("finalScore");
        finalScore.innerHTML = `You scored ${score} out of 8!`;
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const slideBar = document.getElementById("slideInBar");

    // Slide-in animation on load
    setTimeout(() => {
        slideBar.classList.add("show");
        slideBar.style.transform = "translateX(0)";
        slideBar.style.visibility = "visible";
        slideBar.style.opacity = "1";
    }, 100);

    // Hide on scroll down, show on scroll up
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            slideBar.style.opacity = "0";
            slideBar.style.pointerEvents = "none";
        } else {
            slideBar.style.opacity = "1";
            slideBar.style.pointerEvents = "auto";
        }
    });

    // Selection logic for Q3 options
    document.querySelectorAll("#question3-options .answer-option").forEach(option => {
        option.addEventListener("click", () => {
            document.querySelectorAll("#question3-options .answer-option").forEach(o => o.classList.remove("selected"));
            selectedOption3 = option;
            option.classList.add("selected");
        });
    });


    // Selection logic for Q4 options
    document.querySelectorAll(".options-grid:nth-of-type(3) .answer-option").forEach(option => {
        option.addEventListener("click", () => {
            document.querySelectorAll(".options-grid:nth-of-type(3) .answer-option").forEach(o => o.classList.remove("selected"));
            selectedOption4 = option;
            option.classList.add("selected");
        });
    });

    // Selection logic for Q5 type icons
    document.querySelectorAll(".type-icon").forEach(icon => {
        icon.addEventListener("click", () => {
            document.querySelectorAll(".type-icon").forEach(i => i.classList.remove("selected"));
            selectedType = icon;
            icon.classList.add("selected");
        });
    });
});

// These are my global selection variables to store which answers were selected for these questions.
let selectedOption3 = null;
let selectedOption4 = null;
let selectedType = null;

//on hover mouse move event learnt from : https://stackoverflow.com/questions/75404762/css-hover-effect-on-2-overlapping-images-simultaneously/75413373 and https://www.w3schools.com/howto/howto_css_image_overlay.asp
window.addEventListener("DOMContentLoaded", () => {
    const hoverImage = document.querySelector(".image-hover");
    const container = document.querySelector(".image-container");

    if (hoverImage && container) {
        container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            hoverImage.style.setProperty("--x", `${x}%`);
            hoverImage.style.setProperty("--y", `${y}%`);
        });
    }
});
