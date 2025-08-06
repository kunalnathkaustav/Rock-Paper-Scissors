let userChoice = '';

function pickComputerMove() {
  let computerChoice = '';
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerChoice = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerChoice = 'paper';
  } else {
    computerChoice = 'scissors';
  }
  return computerChoice;
} 

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-reset-button').addEventListener('click', () => {
  resetConfirmation();
});

document.querySelector('.js-auto-play').addEventListener('click', () => {
  autoplay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoplay();
  } else if (event.key === 'Backspace') {
    resetConfirmation();
  } else if (event.key === 'y') {
    resetScore();
    hideResetConfirmation();
  } else if (event.key === 'n') {
    hideResetConfirmation();
  }
});

function playGame(userChoice) {
  computerChoice = pickComputerMove();
  let result = '';
  if (computerChoice === userChoice) {
    result = 'Tie!!!';
    scoreCard.Ties += 1;
  } else if ((userChoice === 'rock' && computerChoice === 'scissors') ||
              (userChoice === 'paper' && computerChoice === 'rock') ||
              (userChoice === 'scissors' && computerChoice === 'paper')) {
    result = 'You Win!!!';
    scoreCard.Wins += 1;
  } else {
    result = 'You Lose!!!';
    scoreCard.Losses += 1;
  }

  localStorage.setItem('score',JSON.stringify(scoreCard));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `      You
<img src= "images/${userChoice}-emoji.png" class = 'move-icon'>
<img src= "images/${computerChoice}-emoji.png" class = 'move-icon'>
Computer`;
}

let isAutoPlaying = false;
let intervalId;

function autoplay() {
  const buttonElement = document.querySelector('.js-auto-play');
  if (!isAutoPlaying) {
    buttonElement.innerText = 'Stop Auto Play';
    isAutoPlaying = true;
    intervalId = setInterval(() =>  {
      const userChoice = pickComputerMove();
      playGame(userChoice);
    }, 1000);
  } else {
    buttonElement.innerText = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function resetConfirmation() {

  const resetElement = document.querySelector('.js-reset-confirm');

  resetHtml = `<p>Are you sure you want to reset the score?
              <button class = "confirmation js-yes-button">Yes</button>
              <button class = "confirmation js-no-button">No</button>
              </p>`;

  resetElement.innerHTML = resetHtml;

  document.querySelector('.js-yes-button').addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
  });

  document.querySelector('.js-no-button').addEventListener('click', () => {
    hideResetConfirmation();
  });
  
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirm').innerHTML = '';
}

function resetScore() {
  scoreCard.Wins = 0;
  scoreCard.Losses = 0;
  scoreCard.Ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${scoreCard.Wins}, Losses: ${scoreCard.Losses}, Ties: ${scoreCard.Ties}`;
}

let scoreCard = JSON.parse(localStorage.getItem('score')) || { Wins: 0, Losses: 0, Ties: 0};

updateScoreElement();



