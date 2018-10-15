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

$('.spin-text').on('click', spinWheel);

// $('.solve-button').on('click', game.endGame);


// Make this a method of wheel
function spinWheel() {
  $('.vowel-error').css('display', 'none');
  $('.wheel-circle').toggleClass('wheel-spin');
  setTimeout(game.tearDownWheel, 3500);
}


$('.keyboard-section').on('click', (event) => {
  $('.vowel-error').css('display', 'none');
  let currentTurn = playerArray[playerArrayIndex];
  let currentGuess = $(event.target).text();
  let isGuessCorrect = puzzle.checkGuess(currentGuess);
  if (['A', 'E', 'I', 'O', 'U'].includes($(event.target).text())) {
    puzzle.checkIfVowelCorrect(currentGuess, currentTurn, event);
    return;
  } else {
    let isEnabled = puzzle.checkIfConsonantEnabled(event);
    if (isEnabled && isGuessCorrect) {
      puzzle.countCorrectLetters(currentGuess);
      currentTurn.guessCorrectLetter(puzzle.numberCorrect, wheel.currentValue);
    } else if (isEnabled && !isGuessCorrect) {
      playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
      domUpdates.disableKeyboard();
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



