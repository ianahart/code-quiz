import { quizQuestions } from "./questions.js";

// element selectors
var startQuizBtnEl = document.getElementById('startBtn');
var quizContentEl = document.querySelector('.quiz-content');
var quizIntroEl = document.querySelector('.quiz-intro');
var timerEl = document.getElementById('timer');
var feedbackEl = document.querySelector('.feedback');
var feedbackParaEl = document.querySelector('.feedback p');
var quizResultsEl = document.querySelector('.quiz-results');
var formEl = document.querySelector('form');
var scoreEl = document.getElementById('score');

// global variables
var questionIndex = 0;
var timeLeft = 60;
var score = 0;
var intervalID;
var finalScore = 0;

// update the timer when passed a new time
function updateTimer(newTime) {
  timerEl.textContent = newTime;
}

// show a different question each time the questionIndex changes
// create, set textcontent and append child elements from the parent element
function showQuestion(questionIndex) {
  var currentQuestion = quizQuestions[questionIndex];
  var questionEl = document.createElement('h2');
  var answersEl = document.createElement('ul');
  showElement(quizContentEl, "hidden");

  for (var i = 0; i < currentQuestion.answers.length; i++) {
      var listItemEl = document.createElement('li');
      var answerEl = document.createElement("button");

      answerEl.textContent = currentQuestion.answers[i];

      listItemEl.appendChild(answerEl);
      answersEl.appendChild(listItemEl);
  }

  questionEl.textContent = currentQuestion.question;

  quizContentEl.appendChild(questionEl);
  quizContentEl.appendChild(answersEl);
}


// clear the previous question's content
function clearPreviousQuestion() {
  quizContentEl.innerHTML = "";
}



// get the percentage of correct answers
function calculateScore() {
  return (100 / quizQuestions.length) * score;
}



// save the users new score then navigate to the high scores page
function saveUserScore(e) {
  e.preventDefault();
  var initials = e.target.initials.value;

  if (initials.trim().length === 0) return;

  var newScore = {initials, finalScore, timeLeft};
  var existingScores = JSON.parse(localStorage.getItem('scores')) ?? [];

  existingScores.push(newScore);
  localStorage.setItem('scores', JSON.stringify(existingScores));

  window.location.href = './highscores.html';
}

// calculate user score and render the score
function showQuizResults() {
  showElement(quizResultsEl, "hidden");
  finalScore = calculateScore();
  scoreEl.textContent = finalScore + '%';
}


// if not reached the last question clear previous question and show next question
// else clear the timer and show the add initials component with user's score
function determineToShowNextQuestion() {
    if (questionIndex < quizQuestions.length - 1) {
    questionIndex++;

    clearPreviousQuestion();
    showQuestion(questionIndex);
  } else {
    hideElement(quizContentEl, "hidden");
    hideElement(feedbackEl, "hidden");

    showQuizResults();
    clearInterval(intervalID);
  }
}



// handle the logic to determine if the answer is correct or incorrect
function processQuizAnswer(e) {
  var element = e.target;

  if (!element.matches("button")) {
    return;
  }

  var userAnswer = element.textContent;
  showElement(feedbackEl, "hidden");

  if (quizQuestions[questionIndex].correctAnswer === userAnswer) {
    score++;
    feedbackParaEl.textContent = "Correct!";
  } else {
    timeLeft -= 10;
    if (timeLeft <= 0) {
      timeLeft = 0;
      clearInterval(intervalID);
    }
    updateTimer(timeLeft);
    feedbackParaEl.textContent = "Wrong!";
  }


  determineToShowNextQuestion();
}



// hide element by adding class
function hideElement(element, state) {
    element.classList.add(state);
}
// show element by removing class
function showElement(element, state) {
  element.classList.remove(state);
}

// start the timer to tick every second and start it at 60 seconds
function startTimer() {
  intervalID = setInterval(function() {
    updateTimer(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(intervalID)
      hideElement(quizContentEl, "hidden")
      showQuizResults();
      return;
    }
    timeLeft--;
  }, 1000)
}
// start the quiz, hide the quiz intro and show the first question
function startQuiz() {
  startTimer();
  hideElement(quizIntroEl, 'hidden')
  showQuestion(questionIndex);
}

// event listeners
startQuizBtnEl.addEventListener('click', startQuiz);
quizContentEl.addEventListener('click', processQuizAnswer);
formEl.addEventListener('submit', saveUserScore);