let game = new Game();
let round;
let puzzle;
let wheel;

let playerArray = [];
let playerArrayIndex = 0;

let buzzer = new Audio('./audio/Buzzer.mp3');
let chooseSound = new Audio('./audio/choose.mp3');
let ding = new Audio('./audio/Ding.mp3');
let theme = new Audio('./audio/theme.mp3');
let solveSound = new Audio('./audio/solve.mp3');


$('header').on('click', () => {
  theme.volume = 0.4;
})

$('.start-button').on('click', () => {
  game = new Game();
  playerArrayIndex = 0;
  playerArray = [];
  let gamePlayers = game.init();
  const nameKeys = Object.keys(gamePlayers);
  nameKeys.forEach(key => {
    let newPlayer = new Player(key);
    playerArray.push(newPlayer);
  });
  solvePuzzleHandler();
  setTimeout(() => {
    theme.play()
  }, 1000);
});

function solvePuzzleHandler() {
  round = game.startRound();
  domUpdates.displayNames(playerArray, playerArrayIndex);
  if (game.bonusRound === true) {
    game.endGame();
    domUpdates.highlightVowels();
    puzzle = round.generateBonusPuzzle();
    wheel = round.generateBonusWheel();
  } else {
    puzzle = round.generatePuzzle();
    wheel = round.generateWheelValue();
  }
  domUpdates.resetPuzzleSquares();
  game.bonusRound ? puzzle.populateBonus(puzzle.puzzleLength) : 
    puzzle.populateBoard();
  domUpdates.updateCategory();
  domUpdates.displayWheelValues();
  domUpdates.newRoundKeyboard();
}

$('.quit').on('click', () => {
  $('.vowel-error').css('display', 'none');
  $('.solve-popup').css('display', 'none');
  $('.solve-input').val('');
  $('.spin-number').text('--');
  game.quitGame();
  playerArrayIndex = 0;
  playerArray = [];
});

$('.spin-button').on('click', game.setUpWheel);

$('.solve-button').on('click', domUpdates.displaySolvePopup);

$('.solve-input-button').on('click', () => {
  let currentTurn = playerArray[playerArrayIndex];
  let guess = $('.solve-input').val().toLowerCase();
  $('.solve-input').val('');
  let result = puzzle.solvePuzzle(guess);
  if (result) {
    chooseSound.pause();
    theme.play();
    solveSound.play();
    playerArray = game.endRound(currentTurn, playerArray, playerArrayIndex);
    if (game.round === 5) {
      round.didWinBonus = true;
      round.postBonusResult(game.winner);
    } else {
      setTimeout(solvePuzzleHandler, 2500);
    }
  } else {
    playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
    buzzer.play();
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
    let currentTurn = playerArray[playerArrayIndex];
    let spinResult = game.tearDownWheel();
    domUpdates.yellCurrentSpin();
    setTimeout(domUpdates.yellCurrentSpin, 2000);
    if (spinResult === 'LOSE A TURN') {
      buzz.play();
      playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
    } else if (spinResult === 'BANKRUPT') {
      let bankrupt = new Audio('./audio/bankr.mp3');
      bankrupt.play();
      currentTurn.wallet = 0;
      playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
    } else {
      theme.pause()
      chooseSound.play();
      chooseSound.volume = 0.8;
    }
  }, 2000);
  let spinSound = new Audio('./audio/spin.mp3');
  spinSound.play();
});

$('.keyboard-section').on('click', (event) => {
  chooseSound.volume = 0.4;
  $('.vowel-error').css('display', 'none');
  let currentTurn = playerArray[playerArrayIndex];
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
      checkIfPuzzleSolved(currentTurn, playerArray);
      ding.play();
      if (game.bonusRound === true) {
        domUpdates.enableLetters();
      }
      return;
    } else {
      puzzle.checkIfVowelCorrect(currentGuess, currentTurn, event);
      playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
      domUpdates.disableKeyboard();
      buzzer.play();
      if (game.bonusRound === true) {
        domUpdates.enableLetters();
      }
    }
  } else {
    if (isEnabled && isGuessCorrect) {
      puzzle.countCorrectLetters(currentGuess);
      currentTurn.guessCorrectLetter(puzzle.numberCorrect, wheel.currentValue);
      checkIfPuzzleSolved(currentTurn, playerArray);
      ding.play();
    } else if (isEnabled && !isGuessCorrect) {
      playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
      buzzer.play();
    }
  }
});

function checkIfPuzzleSolved(currentTurn, players) {
  if (puzzle.completed) {
    playerArray = game.endRound(currentTurn, players, playerArrayIndex);
    wheel.currentValue = 'CORRECT';
    domUpdates.yellCurrentSpin();
    chooseSound.pause();
    theme.play();
    solveSound.play();
    setTimeout(domUpdates.yellCurrentSpin, 2000);
    setTimeout(solvePuzzleHandler, 2500);
  }
}

$('.vowel-button').on('click', () => {
  let currentTurn = playerArray[playerArrayIndex];
  if (currentTurn.wallet < 100) {
    $('.vowel-error').css('display', 'unset');
    return;
  } else {
    domUpdates.highlightVowels();
  }
});

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