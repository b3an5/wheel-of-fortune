let game = new Game();
let round;
let puzzle;
let wheel;

const playerArray = [];
let playerArrayIndex = 0;

$('.start-button').on('click', () => {
  game = new Game();
  let gamePlayers = game.init();
  const nameKeys = Object.keys(gamePlayers);
  nameKeys.forEach(key => {
    let newPlayer = new Player(key);
    playerArray.push(newPlayer);
  });
  domUpdates.displayNames();
  round = game.startRound();
  puzzle = round.generatePuzzle();
  puzzle.populateBoard();
  wheel = round.generateWheelValue();
  domUpdates.updateCategory();
  domUpdates.displayWheelValues();
});



$('.quit').on('click', () => {
  $('.vowel-error').css('display', 'none');
  game.quitGame();
  playerArrayIndex = 0;
});

$('.spin-button').on('click', game.setUpWheel);

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
})


$('.keyboard-section').on('click', (event) => {
  $('.vowel-error').css('display', 'none');
  let currentTurn = playerArray[playerArrayIndex];
  let currentGuess = $(event.target).text();
  let isGuessCorrect = puzzle.checkGuess(currentGuess);
  if (['A', 'E', 'I', 'O', 'U'].includes($(event.target).text())) {
    if (isGuessCorrect) {
      puzzle.checkIfVowelCorrect(currentGuess, currentTurn, event);
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
    } else if (isEnabled && !isGuessCorrect) {
      playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
    }
  }
});


$('.vowel-button').on('click', () => {
  let currentTurn = playerArray[playerArrayIndex];
  if (currentTurn.wallet < 100) {
    $('.vowel-error').css('display', 'unset');
    return;
  } else {
    domUpdates.highlightVowels();
  }
});



