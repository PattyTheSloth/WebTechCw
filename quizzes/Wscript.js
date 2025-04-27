document.addEventListener('DOMContentLoaded', function() {
  const slideBar = document.getElementById('slideInBar');
  
  slideBar.style.transform = 'translateX(-100%)';
  slideBar.style.visibility = 'hidden';
  slideBar.style.opacity = '0';
  
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

// Quiz questions
const questions = [
  {
    image: "../images/Obama.jpg",
    question: "Can you guess who this really is?",
    hint: "This person was the 44th President of the USA",
    answers: [
      { text: "Barak Obama", correct: true },
      { text: "Jordan Peele", correct: false },
      { text: "Reggie Brown", correct: false },
      { text: "Michael Bryant", correct: false }
    ]
  },
  {
    image: "../images/LeoDiCap.jpg",
    question: "Who is this famous actor?",
    hint: "He won an Oscar for The Revenant",
    answers: [
      { text: "Brad Pitt", correct: false },
      { text: "Leonardo DiCaprio", correct: true },
      { text: "Tom Cruise", correct: false },
      { text: "Johnny Depp", correct: false }
    ]
  },
  {
    image: "../images/MarkZuk.jfif",
    question: "Identify this tech entrepreneur",
    hint: "He founded Facebook",
    answers: [
      { text: "Elon Musk", correct: false },
      { text: "Bill Gates", correct: false },
      { text: "Mark Zuckerberg", correct: true },
      { text: "Jeff Bezos", correct: false }
    ]
  },
  {
    image: "../images/ForrestWhittaker.jpg",
    question: "Who could this be?",
    hint: "He starred in star wars",
    answers: [
      {text: "Kenn Whittaker", correct: false},
      {text: "Denzel Washington", correct: false},
      {text: "John Boyega", correct: false},
      {text: "Forrest Whittaker", correct: true},
    ]
  },
  {
    image: "../images/WillSmith.jpg",
    question: "Can you guess who this is?",
    hint: "His son played the karate kid",
    answers: [
      {text: "Alfonso Riberio", correct: false},
      {text: "Will Smith", correct: true},
      {text: "Morgan Freeman", correct: false},
      {text: "Jamie Foxx", correct: false},
    ]
  },
  {
    image: "../images/MrBean.jpg",
    question: "Who is this children's tv character?",
    hint: "He has his own tv show and movie",
    answers: [
      {text: "Mr Tumble", correct: false},
      {text: "Pee-wee Herman", correct: false},
      {text: "Johnny English", correct: false},
      {text: "Mr Bean", correct: true},
    ]
  },
  {
    image: "../images/JimC.jpg",
    question: "Guess this famous comedian?",
    hint: "He played the famous character the mask",
    answers: [
      {text: "Jim Carey", correct: true},
      {text: "Robin Williams", correct: false},
      {text: "Jack Black", correct: false},
      {text: "Chris Farley", correct: false},
    ]
  },
  {
    image: "../images/RDJ.jpg",
    question: "Who is this action star?",
    hint: "He is now Doctor Doom",
    answers: [
      {text: "Ryan Reynolds", correct: false},
      {text: "Paul Rudd", correct: false},
      {text: "Robert Downey Jr", correct: true},
      {text: "Chris Pratt", correct: false},
    ]
  },
];

// Quiz state variables
let currentIndex = 0;      
let score = 0;            
let hintUsed = false;      

// DOM element references
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const question = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const image = document.getElementById("celebrity-image");
const finalScore = document.getElementById("final-score");
const scoreDisplay = document.getElementById("score-display");
const hintButton = document.getElementById("hint-button");
const hintText = document.getElementById("hint-text");

// Initialize the quiz when page loads
startQuiz();

// Function to start or restart the quiz
function startQuiz() {
  currentIndex = 0;
  score = 0;
  hintUsed = false;
  updateScore();
  resultContainer.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
}

// Display the current question and answers
function showQuestion() {
  resetButtons();
  hintUsed = false;  // Reset hint flag for new question
  hintText.style.display = "none"; // Hide any previous hint
 
  const currentQuestion = questions[currentIndex];
  question.textContent = currentQuestion.question;
  image.src = currentQuestion.image;
  image.alt = "Celebrity image for question " + (currentIndex + 1);

  // Set up hint button for current question
  hintButton.onclick = function() {
    if (!hintUsed) {
      hintText.textContent = currentQuestion.hint;
      hintText.style.display = "block";
      hintUsed = true;
      // Disable hint button after use
      hintButton.disabled = true;
    }
  };

  // Re-enable hint button for new question
  hintButton.disabled = false; // Re-enable hint button for new question

  // Create answer buttons for each answer
  currentQuestion.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.classList.add("quiz-button");
    if (answer.correct) btn.dataset.correct = true;
    btn.addEventListener("click", selectAnswer);
    answerButtons.appendChild(btn);
  });
}

// Clear all answer buttons
function resetButtons() {
  answerButtons.innerHTML = "";
}

// Handle when user selects an answer
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  // Apply visual feedback based on answer
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    updateScore();
  } else {
    selectedBtn.classList.add("wrong");
  }

  // Disable all buttons and highlight correct answer
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
  });

  // Disable hint button after answering
  hintButton.disabled = true;

  // Move to next question or show results after delay
  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

// Update score
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}/${questions.length}`;
}

// Result Screen
function showResult() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  finalScore.textContent = `Your final score: ${score} out of ${questions.length}`;
}})