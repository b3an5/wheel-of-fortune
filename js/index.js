import data from './data.js';
import Game from './Game.js';
import domUpdates from './DOM.js';
import Player from './Player.js';
import Puzzle from './Puzzle.js';
import Round from './Round.js';
import BonusRound from './BonusRound.js';
import Wheel from './Wheel.js';

// let buzzer = new Audio('./audio/Buzzer.mp3');
// let chooseSound = new Audio('./audio/choose.mp3');
// let ding = new Audio('./audio/Ding.mp3');
// let theme = new Audio('./audio/theme.mp3');
// let solveSound = new Audio('./audio/solve.mp3');
// let spinSound = new Audio('./audio/spin.mp3');
// let bankrupt = new Audio('./audio/bankr.mp3');

let game = new Game();
let round;
let puzzle;
let wheel;

$('.start-button').on('click', init);
$('.quit').on('click', quitHandler);
$('.spin-button').on('click', game.setUpWheel);
$('.solve-button').on('click', domUpdates.displaySolvePopup);
$('.solve-input-button').on('click', solveHandler);
$('.spin-text').on('click', spinHandler);
$('.vowel-button').on('click', vowelHandler);
$('.start-bonus-round').on('click', startBonusHandler);
$('.bonus-round-intro').on('click', newGameHandler);
$('.keyboard-section').on('click', keyboardHandler);
$('header').on('click', () => {
  // theme.volume = 0.4;
});

function init() {
  game.getPlayers();
  newRoundHandler();
  setTimeout(() => {
    // theme.play()
  }, 1000);
}

function newRoundHandler() {
  round = game.startRound();
  domUpdates.displayNames(game.players, game.playerIndex);
  if (game.bonusRound) {
    round.bonusPlayer = game.endGame();
    puzzle = round.generateBonusPuzzle();
    wheel = round.generateBonusWheel();
    domUpdates.highlightVowels();
  } else {
    puzzle = round.generatePuzzle();
    console.log(puzzle.currentPuzzle.correct_answer);
    wheel = round.generateWheelValue();
  }
  setUpRound();
}

function setUpRound() {
  domUpdates.resetPuzzleSquares();
  game.bonusRound ? puzzle.populateBonus(puzzle.puzzleLength) : 
    puzzle.populateBoard();
  domUpdates.updateCategory(puzzle);
  domUpdates.displayWheelValues(wheel);
  domUpdates.newRoundKeyboard();
}

function quitHandler() {
  domUpdates.resetOnQuit();
  game.quitGame();
}

function checkIfPuzzleSolved() {
  if (puzzle.completed) {
    game.endRound();
    domUpdates.yellCurrentSpin('CORRECT');
    // chooseSound.pause();
    // theme.play();
    // solveSound.play();
    setTimeout(domUpdates.yellCurrentSpin, 2000);
    setTimeout(newRoundHandler, 2500);
  }
}

function vowelHandler() {
  if (game.players[game.playerIndex].wallet < 100) {
    return $('.vowel-error').css('display', 'unset');
  }
  domUpdates.highlightVowels();
}

function startBonusHandler() {
  domUpdates.startBonusRound();
  domUpdates.displayWheel();
  domUpdates.highlightVowels();
}

function newGameHandler(event) {
  if ($(event.target).hasClass('new-game')) {
    domUpdates.resetGameDisplay();
    game.quitGame();
  }
}

function solveHandler() {
  let guess = $('.solve-input').val().toLowerCase();
  $('.solve-input').val('');
  let result = puzzle.solvePuzzle(guess);
  if (result) {
    // chooseSound.pause();
    // theme.play();
    // solveSound.play();
    game.endRound();
    solveBonusHandler(result);
  } else {
    // buzzer.play();
    game.endTurn();
    solveBonusHandler(result);
  }
};

function solveBonusHandler(result) {
  if (game.round === 5 && result) {
    round.didWinBonus = true;
    round.postBonusResult();
  } else if (game.round === 5 && !result) {
    round.didWinBonus = false;
    round.postBonusResult();
  } else {
    setTimeout(newRoundHandler, 2500);
  }
}

function spinHandler() {
  // spinSound.play();
  domUpdates.spinWheel();
  setTimeout(() => {
    game.tearDownWheel(wheel, round);
    domUpdates.yellCurrentSpin(wheel.currentValue);
    setTimeout(domUpdates.yellCurrentSpin, 2000);
    badSpinHandler();
  }, 2000);
}

function badSpinHandler() {
  if (wheel.currentValue === 'LOSE A TURN') {
    // buzz.play();
    game.endTurn();
  } else if (wheel.currentValue === 'BANKRUPT') {
    // bankrupt.play();
    game.players[game.playerIndex].wallet = 0;
    game.endTurn();
  } else {
    // theme.pause()
    // chooseSound.play();
    // chooseSound.volume = 0.8;
  }
}





function keyboardHandler(event) {
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
      game.endTurn();
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
      game.endTurn();
      // buzzer.play();
    }
  }
}

