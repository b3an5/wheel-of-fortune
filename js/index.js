let game = new Game();
let round;
let puzzle;
let wheel;

let playerArray = [];
let playerArrayIndex = 0;

$('.start-button').on('click', () => {
  game = new Game();
  let gamePlayers = game.init();
  const nameKeys = Object.keys(gamePlayers);
  nameKeys.forEach(key => {
    let newPlayer = new Player(key);
    playerArray.push(newPlayer);
  });
  solvePuzzleHandler();
});

function solvePuzzleHandler() {
  domUpdates.displayNames();
  round = game.startRound();
  puzzle = round.generatePuzzle();
  domUpdates.resetPuzzleSquares();
  puzzle.populateBoard();
  wheel = round.generateWheelValue();
  domUpdates.updateCategory();
  domUpdates.displayWheelValues();
  domUpdates.newRoundKeyboard();
}

$('.quit').on('click', () => {
  $('.vowel-error').css('display', 'none');
  game.quitGame();
  playerArrayIndex = 0;
  playerArray = [];
});

$('.spin-button').on('click', game.setUpWheel);

$('.solve-button').on('click', () => {
  domUpdates.displaySolvePopup();
});

$('.solve-input-button').on('click', (event) => {
  event.preventDefault();
  let currentTurn = playerArray[playerArrayIndex];
  let guess = $('.solve-input').val().toLowerCase();
  $('.solve-input').val('');
  let result = puzzle.solvePuzzle(guess);
  if (result) {
    playerArray = game.endRound(currentTurn, playerArray);
    setTimeout(solvePuzzleHandler, 2500);
  } else {
    playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
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
      playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
    } else if (spinResult === 'BANKRUPT') {
      currentTurn.wallet = 0;
      playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
    }
  }, 2000);
});

$('.keyboard-section').on('click', (event) => {
  $('.vowel-error').css('display', 'none');
  let currentTurn = playerArray[playerArrayIndex];
  let currentGuess = $(event.target).text();
  let isGuessCorrect = puzzle.checkGuess(currentGuess);
  if (['A', 'E', 'I', 'O', 'U'].includes($(event.target).text())) {
    if (isGuessCorrect) {
      puzzle.checkIfVowelCorrect(currentGuess, currentTurn, event);
      checkIfPuzzleSolved(currentTurn, playerArray);
      return;
    } else {
      puzzle.checkIfVowelCorrect(currentGuess, currentTurn, event);
      playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
      domUpdates.disableKeyboard();
    }
  } else {
    let isEnabled = puzzle.checkIfConsonantEnabled(event);
    if (isEnabled && isGuessCorrect) {
      puzzle.countCorrectLetters(currentGuess);
      currentTurn.guessCorrectLetter(puzzle.numberCorrect, wheel.currentValue);
      checkIfPuzzleSolved(currentTurn, playerArray);
    } else if (isEnabled && !isGuessCorrect) {
      playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
    }
  }
});

function checkIfPuzzleSolved(currentTurn, playerArray) {
  if (puzzle.completed) {
    playerArray = game.endRound(currentTurn, playerArray);
    wheel.currentValue = 'CORRECT';
    domUpdates.yellCurrentSpin();
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



