let game = new Game();
let round;
let puzzle;

const playerArray = [];
let playerArrayIndex = 0;
let currentTurn = playerArray[playerArrayIndex];

$('.start-button').on('click', () => {
  game = new Game();
  let gamePlayers = game.init();
  const nameKeys = Object.keys(gamePlayers);
  nameKeys.forEach(key => {
    let newPlayer = new Player(key);
    playerArray.push(newPlayer);
  });
  game.displayNames();
  round = game.startRound();
  puzzle = round.generatePuzzle();
  puzzle.populateBoard();
});

$('.quit').on('click', game.quitGame);

$('.spin-button').on('click', game.displayWheel);

$('.wheel').on('click', game.hideWheel);