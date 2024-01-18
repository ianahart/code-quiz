var highscoresListEl = document.querySelector('.highscores');
var clearBtn = document.getElementById('clear');
var backBtn = document.getElementById('back');

function goBack() {
  window.location.href = './';
}

// remove the highscores from the dom and clear the highscores from local storage
function clearHighScores() {
  highscoresListEl.innerHTML = '';
  localStorage.setItem('scores', null);
}

// get the high scores from local storage then sort them in descending order
function getHighScores() {
  var scores = JSON.parse(localStorage.getItem('scores'));
  if (scores === null) {
    return [];
  }
  scores.sort(function (a, b) {
    return b.finalScore - a.finalScore;
  });
  return scores;
}

// create a paragraph element and assign the parameters to the text content
function createText(text, data) {
  var paraEl = document.createElement('p');
  paraEl.textContent = text + data;
  return paraEl;
}

// create a high score element that includes a list item -> div -> p
// go up the tree and append the childs eventually reaching the highscore list element
function createHighScore(highScore) {
  var initialsContainerEl = document.createElement('div');
  var finalScoreContainerEl = document.createElement('div');
  var timeLeftContainerEl = document.createElement('div');

  var listItemEl = document.createElement('li');
  initialsContainerEl.appendChild(
    createText('Initials: ', highScore.initials.toUpperCase())
  );
  finalScoreContainerEl.appendChild(
    createText('Score: ', highScore.finalScore + '%')
  );
  timeLeftContainerEl.appendChild(
    createText('Time Left: ', highScore.timeLeft + 's')
  );

  var containers = [
    initialsContainerEl,
    finalScoreContainerEl,
    timeLeftContainerEl,
  ];

  for (var i = 0; i < containers.length; i++) {
    listItemEl.classList.add('highscore-row');
    listItemEl.appendChild(containers[i]);
    highscoresListEl.appendChild(listItemEl);
  }
}

// render the highscores to the page
function renderHighScores() {
  var scores = getHighScores();
  for (var i = 0; i < scores.length; i++) {
    createHighScore(scores[i]);
  }
}

renderHighScores();

backBtn.addEventListener('click', goBack);
clearBtn.addEventListener('click', clearHighScores);
