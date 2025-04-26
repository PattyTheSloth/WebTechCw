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
    document.getElementById("start-btn").addEventListener("click", function () { //when the page finishes loading, set up a click event for the start button
        const startSound = document.getElementById("start-sound"); //play when the quiz begins
        startSound.play();
        document.getElementById("start-screen").style.display = "none"; //hide start screen and displays my quiz contents
        document.getElementById("quiz-content").style.display = "block";

        document.getElementById("timer-container").style.display = "flex"; //shows the timer when the quiz starts

        let timeLeft = 600; // 10 minute timer
        const timerEl = document.getElementById("timer");

        const updateTimer = () => { //function to update timer every second
            const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0'); //calculates minutes and seconds remaining
            const secs = String(timeLeft % 60).padStart(2, '0');
            timerEl.textContent = `${mins}:${secs}`; //displays the formatted timer

            if (timeLeft > 0) {
                timeLeft--; //decrease time by 1 second
            } else {
                clearInterval(countdown);
                timerEl.textContent = "00:00"; //alerts user time is up and all buttons are disabled
                alert("Time's up!");
                document.querySelectorAll("input, button").forEach(el => el.disabled = true);
            }
        };

        updateTimer(); //update timer to avoid delays
        const countdown = setInterval(updateTimer, 1000); //updates timer after every 1000 milliseconds
    });

    //Question 1 Logic
    document.getElementById("Question1").addEventListener("submit", function (event) {
        event.preventDefault(); //prevents form from submitting and refreshing the quiz page
        const answer = document.getElementById("answer").value.trim().toLowerCase(); //takes users inputs answer
        const resultElement = document.getElementById("result");
        const correctSound = document.getElementById("Correct");
        const wrongSound = document.getElementById("Wrong");

        const answers = { //list of answers by their id
            "pallet town": "answer1",
            "lavender town": "answer2",
            "victory road": "answer3",
            "cerulean city": "answer4",
        };

        if (answers[answer]) { //checks if answer is correct 
            document.getElementById(answers[answer]).style.display = "block"; //if correct, reveals the result text and block
            resultElement.innerHTML = `Correct! ${answer.charAt(0).toUpperCase() + answer.slice(1)} is the right answer.`;
            resultElement.className = "correct";
            correctSound.play(); //plays correct sound effect
        } else {
            resultElement.innerHTML = `Incorrect, Try again!`; //if wrong, displays wrong and plays wrong sound effect
            resultElement.className = "incorrect";
            wrongSound.play();
        }
    });

    // Question 2
    let selectedImage = null; //stores selected image 
    document.querySelectorAll(".pokemon-img").forEach((img) => { //add click event listeners to all images
        img.addEventListener("click", function () {
            if (selectedImage) selectedImage.style.border = "none"; //if a new image is clicked, remove the borders
            selectedImage = img; //sets new selected image 
            selectedImage.style.border = "5px solid var(--primary-blue)"; //highlights the image with the border
        });
    });

    document.getElementById("Question2").addEventListener("submit", function (event) { //submission of question 2
        event.preventDefault();//prevents form from refreshing the page
        const form = this;
        if (form.classList.contains("submitted")) return; //if the form is submitted, itll do nothing

        const resultElement = document.getElementById("result2");
        const correctSound = document.getElementById("Correct");
        const wrongSound = document.getElementById("Wrong");

        if (!selectedImage) { //checks if image is selected
            resultElement.innerHTML = "Please select a Pokémon before submitting.";
            resultElement.className = "incorrect";
            return;
        }

        if (selectedImage.getAttribute("data-answer") === "correct") { //checks if the image is the correct image
            resultElement.innerHTML = "Correct! Rhydon was the first Pokémon designed by Gamefreak.";
            resultElement.className = "correct";
            correctSound.play(); //plays correct sound effect
        } else {
            resultElement.innerHTML = "Incorrect! Try again.";
            resultElement.className = "incorrect";
            wrongSound.play(); //plays wrong sound effect
        }

        form.classList.add("submitted");  //marks the class as submitted and no longer able to submit a new answer
        form.querySelector("input[type='submit']").disabled = true;
    });

    // Question 3
    document.getElementById("Question3").addEventListener("submit", function (event) { //attack a submit event listener
        event.preventDefault();
        const form = this;
        if (form.classList.contains("submitted")) return;

        const resultElement = document.getElementById("result3");
        const correctSound = document.getElementById("Correct");
        const wrongSound = document.getElementById("Wrong");

        if (!selectedOption3) { //checks if a selection was made
            resultElement.innerHTML = "Please select an answer first!";
            resultElement.className = "incorrect";
            return;
        }

        const isCorrect = selectedOption3.getAttribute("data-answer") === "correct";

        if (isCorrect) { //Checks if correct - plays correct sounds and effect and prints youre correct
            resultElement.innerHTML = "Correct! Clefairy is the right answer.";
            resultElement.className = "correct";
            correctSound.play();
        } else {
            resultElement.innerHTML = "Incorrect! Try again.";
            resultElement.className = "incorrect";
            wrongSound.play(); //plays wrong sound effect
        }

        form.classList.add("submitted"); //submitted and no longer able to change answers
        form.querySelector("input[type='submit']").disabled = true;
    });

    // Question 4
    const cryAudio = document.getElementById("poke-cry"); //references for the pokedex cries and button  
    const cryButton = document.getElementById("play-cry");

    cryButton.addEventListener("click", () => { //plays cry when pokedex image button is clicked
        cryAudio.currentTime = 0; //resets audio
        cryAudio.play();
    });

    document.querySelectorAll("#question4-options .answer-option").forEach(option => { //set up click listeners for each answer on q4
        option.addEventListener("click", () => {
            document.querySelectorAll("#question4-options .answer-option").forEach(o => o.classList.remove("selected")); //remove selected class from all options
            selectedOption4 = option; //set selected click as option
            option.classList.add("selected");
        });
    });

    document.getElementById("Question4").addEventListener("submit", function (event) { //handles the submission of q4
        event.preventDefault();//prevents page refresh
        const form = this;
        if (form.classList.contains("submitted")) return;//prevents multiple submissions

        const resultElement = document.getElementById("result4");
        const correctSound = document.getElementById("Correct");
        const wrongSound = document.getElementById("Wrong");

        if (!selectedOption4) { //checks if option is selected
            resultElement.innerHTML = "Please select an answer!";
            resultElement.className = "incorrect";
            return;
        }

        const isCorrect = selectedOption4.getAttribute("data-answer") === "correct"; //checks if answer is correct

        if (isCorrect) {
            resultElement.innerHTML = "Correct! That cry belongs to Kangaskhan.";
            resultElement.className = "correct";
            correctSound.play();
            document.getElementById("dex-reveal").src = "../images/kangaskhan.png"; //switches to an image if correct
        } else {
            resultElement.innerHTML = "Incorrect! Try again."; //if wrong, plays wrong sound effect if wrong and shows message
            resultElement.className = "incorrect";
            wrongSound.play();
        }

        form.classList.add("submitted"); //form is now submitted and answers cannot be changed
        form.querySelector("input[type='submit']").disabled = true;
    });

    // Question 5
    document.getElementById("Question5").addEventListener("submit", function (event) {
        event.preventDefault(); //prevents form from refreshing on submit
        const form = this;
        if (form.classList.contains("submitted")) return; //prevents resubmutting from the first attempt

        const resultElement = document.getElementById("result5");
        const correctSound = document.getElementById("Correct");
        const wrongSound = document.getElementById("Wrong");
        const pikachuImg = document.getElementById("pikachu-img");

        if (!selectedType) { //checks if user has selected a type
            resultElement.innerHTML = "Please choose a type!";
            resultElement.className = "incorrect";
            return;
        }

        const isCorrect = selectedType.getAttribute("data-answer") === "correct";

        if (isCorrect) { //if the answer is correct, shows a scared pikachu image with correct sound effect
            pikachuImg.src = "../images/pikaScared.png";
            resultElement.innerHTML = "Correct! Ground types are strong against Electric!";
            resultElement.className = "correct";
            correctSound.play();
        } else { //if wrong - shows a picture of pikachu laughing with a wrong sound effect.
            pikachuImg.src = "../images/pikaLaugh.png";
            resultElement.innerHTML = "Incorrect! Try again.";
            resultElement.className = "incorrect";
            wrongSound.play();
        }

        form.classList.add("submitted"); //mark as submitted and no longer able to submit
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
            slideBar.style.opacity = "0"; //hides bar by setting opacity to 0
            slideBar.style.pointerEvents = "none"; //disables interactions when hidden
        } else {
            slideBar.style.opacity = "1"; //shows the navbar
            slideBar.style.pointerEvents = "auto"; //enables interaction when shown
        }
    });

    // Selection logic for Q3 options
    document.querySelectorAll("#question3-options .answer-option").forEach(option => { //highlights selected answer when clicked
        option.addEventListener("click", () => {
            document.querySelectorAll("#question3-options .answer-option").forEach(o => o.classList.remove("selected")); //removes selected class from all options
            selectedOption3 = option;//mark the clicked as selected
            option.classList.add("selected");
        });
    });


    // Selection logic for Q4 options
    document.querySelectorAll(".options-grid:nth-of-type(3) .answer-option").forEach(option => {//highlights selected answer when clicked
        option.addEventListener("click", () => {
            document.querySelectorAll(".options-grid:nth-of-type(3) .answer-option").forEach(o => o.classList.remove("selected"));//removes selected class from all options
            selectedOption4 = option; //mark the clicked as selected
            option.classList.add("selected");
        });
    });

    // Selection logic for Q5 type icons
    document.querySelectorAll(".type-icon").forEach(icon => {//highlights selected answer when clicked
        icon.addEventListener("click", () => {
            document.querySelectorAll(".type-icon").forEach(i => i.classList.remove("selected"));//removes selected class from all options
            selectedType = icon;//mark the clicked as selected
            icon.classList.add("selected");
        });
    });
});

// These are my global selection variables to store which answers were selected for these questions.
let selectedOption3 = null;
let selectedOption4 = null;
let selectedType = null;

//on hover mouse move event learnt from : https://stackoverflow.com/questions/75404762/css-hover-effect-on-2-overlapping-images-simultaneously/75413373 and https://www.w3schools.com/howto/howto_css_image_overlay.asp
window.addEventListener("DOMContentLoaded", () => { //get references hover image and its container
    const hoverImage = document.querySelector(".image-hover");
    const container = document.querySelector(".image-container");

    if (hoverImage && container) { //makes sure both elements exist
        container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect(); //gets the position of the container relative to the viewport
            const x = ((e.clientX - rect.left) / rect.width) * 100; //calculates mouse position as a percentage of the containers width and height
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            hoverImage.style.setProperty("--x", `${x}%`); //updates css customer properties of x and y for dynamic position
            hoverImage.style.setProperty("--y", `${y}%`);
        });
    }
});
