import { quizQuestions } from "./questions.js";

// element selectors
var startQuizBtnEl = document.getElementById('startBtn');
var quizIntroEl = document.querySelector('.quiz-intro');
var timerEl = document.getElementById('timer');

// global variables
var questionIndex = 0;
var timeLeft = 60;


function showQuestion(questionIndex) {
}


function hideElement(element, state) {
    element.classList.add(state);
}

function showElement(element, state) {
  element.classList.remove(state);
}


function startTimer() {
  var intervalID = setInterval(function() {
    timerEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft === 0) {
      clearInterval(intervalID)
      timeLeft = 60;
    }
  }, 1000)
}

function startQuiz() {
  startTimer();
  hideElement(quizIntroEl, 'hidden')
  showQuestion(questionIndex);
}

// event listeners
startQuizBtnEl.addEventListener('click', startQuiz);