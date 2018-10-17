let game = new Game();
let round;
let puzzle;
let wheel;

let playerArray = [];
let playerArrayIndex = 0;

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
});

function solvePuzzleHandler() {
  round = game.startRound();
  domUpdates.displayNames(playerArray);
  if(game.bonusRound === true) {
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
  $('.spin-number').text('--')
  game.quitGame();
  playerArrayIndex = 0;
  playerArray = [];
});

$('.spin-button').on('click', game.setUpWheel);

$('.solve-button').on('click', domUpdates.displaySolvePopup);

$('.solve-input-button').on('click', (event) => {
  let currentTurn = playerArray[playerArrayIndex];
  let guess = $('.solve-input').val().toLowerCase();
  $('.solve-input').val('');
  let result = puzzle.solvePuzzle(guess);
  if (result) {
    playerArray = game.endRound(currentTurn, playerArray, playerArrayIndex);
    if (game.round === 5) {
      round.didWinBonus = true;
      round.postBonusResult(game.winner);
    } else {
      setTimeout(solvePuzzleHandler, 2500);
    }
  } else {
    playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
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
  let isEnabled = puzzle.checkIfConsonantEnabled(event);
  if (game.bonusRound === true) {
    if (round.keyBoardClickCount === 0) {
      domUpdates.disableKeyboard();
      round.keyBoardClickCount++;
    }
    else if (round.keyBoardClickCount < 3) {
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
      if (game.bonusRound === true) {
        domUpdates.enableLetters();
      }
      return;
    } else {
      puzzle.checkIfVowelCorrect(currentGuess, currentTurn, event);
      playerArrayIndex = game.endTurn(playerArray, playerArrayIndex);
      domUpdates.disableKeyboard();
      if (game.bonusRound === true) {
        domUpdates.enableLetters();
      }
    }
  } else {
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
    playerArray = game.endRound(currentTurn, playerArray, playerArrayIndex);
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

$('.start-bonus-round').on('click', () => {
  $('.popup-cover').css('display', 'none');
  $('.bonus-round-intro').css('display', 'none');
  $('header').html('<h1 class="bonus-round-header">BONUS ROUND</h1><h2 class="bonus-instructions">Choose 1 vowel and 3 consonants')
  $('header').css('display', 'block');
  $('.bank-accts').css('bottom', '35px');
  domUpdates.displayWheel();
  domUpdates.highlightVowels();
});







