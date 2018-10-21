import data from './data.js';
import Game from './Game.js';
import domUpdates from './DOM.js';
import Player from './Player.js';
import Puzzle from './Puzzle.js';
import Round from './Round.js';
import BonusRound from './BonusRound.js';
import Wheel from './Wheel.js';


let game = new Game();
let round;
let puzzle;
let wheel;

// let buzzer = new Audio('./audio/Buzzer.mp3');
// let chooseSound = new Audio('./audio/choose.mp3');
// let ding = new Audio('./audio/Ding.mp3');
// let theme = new Audio('./audio/theme.mp3');
// let solveSound = new Audio('./audio/solve.mp3');

$('header').on('click', () => {
  // theme.volume = 0.4;
})
$('.start-button').on('click', init);
$('.quit').on('click', quitHandler);
$('.spin-button').on('click', game.setUpWheel);
$('.solve-button').on('click', domUpdates.displaySolvePopup);
$('.vowel-button').on('click', vowelHandler);

$('.start-bonus-round').on('click', () => {
  domUpdates.startBonusRound();
  domUpdates.displayWheel();
  domUpdates.highlightVowels();
});

$('.bonus-round-intro').on('click', (event) => {
  if ($(event.target).hasClass('new-game')) {
    domUpdates.resetGameDisplay();
    game.quitGame();
  }
});



function init() {
  game.getPlayers();
  console.log(game.players);
  solvePuzzleHandler();
  setTimeout(() => {
    // theme.play()
  }, 1000);
}

function solvePuzzleHandler() {
  round = game.startRound();
  domUpdates.displayNames(game.players, game.playerIndex);
  if (game.bonusRound === true) {
    game.endGame(round);
    domUpdates.highlightVowels();
    puzzle = round.generateBonusPuzzle();
    wheel = round.generateBonusWheel();
  } else {
    puzzle = round.generatePuzzle();
    console.log(puzzle.currentPuzzle.correct_answer);
    wheel = round.generateWheelValue();
  }
  domUpdates.resetPuzzleSquares();
  game.bonusRound ? puzzle.populateBonus(puzzle.puzzleLength) : 
    puzzle.populateBoard();
  domUpdates.updateCategory(puzzle);
  domUpdates.displayWheelValues(wheel);
  domUpdates.newRoundKeyboard();
}

function quitHandler() {
  $('.vowel-error').css('display', 'none');
  $('.solve-popup').css('display', 'none');
  $('.solve-input').val('');
  $('.spin-number').text('--');
  game.quitGame();
  game.playerIndex = 0;
  game.players = [];
};

function checkIfPuzzleSolved() {
  if (puzzle.completed) {
    game.endRound();
    domUpdates.yellCurrentSpin('CORRECT');
    // chooseSound.pause();
    // theme.play();
    // solveSound.play();
    setTimeout(domUpdates.yellCurrentSpin, 2000);
    setTimeout(solvePuzzleHandler, 2500);
  }
}

function vowelHandler() {
  let currentTurn = game.players[game.playerIndex];
  if (currentTurn.wallet < 100) {
    $('.vowel-error').css('display', 'unset');
    return;
  } else {
    domUpdates.highlightVowels();
  }
};





$('.solve-input-button').on('click', () => {
  let currentTurn = game.players[game.playerIndex];
  let guess = $('.solve-input').val().toLowerCase();
  $('.solve-input').val('');
  let result = puzzle.solvePuzzle(guess, wheel);
  if (result) {
    // chooseSound.pause();
    // theme.play();
    // solveSound.play();
    game.endRound();
    if (game.round === 5) {
      round.didWinBonus = true;
      round.postBonusResult(game.winner);
    } else {
      setTimeout(solvePuzzleHandler, 2500);
    }
  } else {
    game.playerIndex = game.endTurn();
    // buzzer.play();
    if (game.round === 5) {
      round.didWinBonus = false;
      round.postBonusResult(game.winner);
    }
  }
});

$('.spin-text').on('click', () => {
  $('.vowel-error').css('display', 'none');
  $('.wheel-circle').toggleClass('wheel-spin');
  setTimeout(() => {
    let currentTurn = game.players[game.playerIndex];
    let spinResult = game.tearDownWheel(wheel, round);
    domUpdates.yellCurrentSpin(wheel.currentValue);
    setTimeout(domUpdates.yellCurrentSpin, 2000);
    if (spinResult === 'LOSE A TURN') {
      // buzz.play();
      game.playerIndex = game.endTurn();
    } else if (spinResult === 'BANKRUPT') {
      let bankrupt = new Audio('./audio/bankr.mp3');
      // bankrupt.play();
      currentTurn.wallet = 0;
      game.playerIndex = game.endTurn();
    } else {
      // theme.pause()
      // chooseSound.play();
      // chooseSound.volume = 0.8;
    }
  }, 2000);
  let spinSound = new Audio('./audio/spin.mp3');
  // spinSound.play();
});

$('.keyboard-section').on('click', (event) => {
  // chooseSound.volume = 0.4;
  $('.vowel-error').css('display', 'none');
  let currentTurn = game.players[game.playerIndex];
  let currentGuess = $(event.target).text();
  let isGuessCorrect = puzzle.checkGuess(currentGuess);
  let isEnabled = puzzle.checkIfConsonantEnabled(event);
  if (game.bonusRound === true) {
    if (round.keyBoardClickCount === 0) {
      domUpdates.disableKeyboard();
      round.keyBoardClickCount++;
    } else if (round.keyBoardClickCount < 3) {
      domUpdates.disableKeyboard();
      round.keyBoardClickCount++;
    } else {
      domUpdates.displaySolvePopup();
    }
  }
  if (['A', 'E', 'I', 'O', 'U'].includes($(event.target).text())) {
    if (!$(event.target).hasClass('active-vowel')) {
      return;
    } else if (isGuessCorrect) {
      puzzle.checkIfVowelCorrect(currentGuess, currentTurn, event);
      checkIfPuzzleSolved();
      // ding.play();
      if (game.bonusRound === true) {
        domUpdates.enableLetters();
      }
      return;
    } else {
      puzzle.checkIfVowelCorrect(currentGuess, currentTurn, event);
      game.playerIndex = game.endTurn();
      domUpdates.disableKeyboard();
      // buzzer.play();
      if (game.bonusRound === true) {
        domUpdates.enableLetters();
      }
    }
  } else {
    if (isEnabled && isGuessCorrect) {
      puzzle.countCorrectLetters(currentGuess);
      currentTurn.guessCorrectLetter(puzzle.numberCorrect, wheel.currentValue);
      checkIfPuzzleSolved();
      // ding.play();
    } else if (isEnabled && !isGuessCorrect) {
      game.playerIndex = game.endTurn();
      // buzzer.play();
    }
  }
});

