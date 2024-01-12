import { quizQuestions } from "./questions.js";

// element selectors
var startQuizBtnEl = document.getElementById('startBtn');
var quizContentEl = document.querySelector('.quiz-content');
var quizIntroEl = document.querySelector('.quiz-intro');
var timerEl = document.getElementById('timer');
var feedbackEl = document.querySelector('.feedback');
var feedbackParaEl = document.querySelector('.feedback p');

// global variables
var questionIndex = 0;
var timeLeft = 60;
var score = 0;
var intervalID;

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
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    updateTimer(timeLeft);
    feedbackParaEl.textContent = "Wrong!";
  }

  if (questionIndex < quizQuestions.length - 1) {
    questionIndex++;
    clearPreviousQuestion();
    showQuestion(questionIndex);
  } else {
    console.log('reached the end');
    clearInterval(intervalID);
  }
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
    timerEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft === 0) {
      clearInterval(intervalID)
      timeLeft = 60;
    }
  }, 1000)
}
// start the quiz
function startQuiz() {
  startTimer();
  hideElement(quizIntroEl, 'hidden')
  showQuestion(questionIndex);
}

// event listeners
startQuizBtnEl.addEventListener('click', startQuiz);
quizContentEl.addEventListener('click', processQuizAnswer);