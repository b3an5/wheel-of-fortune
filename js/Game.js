class Game {
  constructor() {
    this.round = 0;
    this.bonusRound = false;
    this.players = {};
    this.puzzleKeys = Object.keys(data.puzzles);
  }

  init() {
    game.players = Object.assign({}, domUpdates.getPlayerNames());
    domUpdates.clearInputs();
    domUpdates.goToGameScreen();
    return game.players;
  }

  startRound() {
    game.round++;
    if (game.round === 5) {
      game.bonusRound = true;
      return new BonusRound();
    } else {
      return new Round(data.puzzles[game.puzzleKeys[game.round - 1]].puzzle_bank);
    }
  }


  // This needs to receive an array of all of the player instances (objects) at the end of each round

  endRound(players) {
    let winningPlayer = playerScores.sort((a, b) => {
      return b.score - a.score;
    })[0];
    game.players[winningPlayer.name] = winningPlayer.score;
  }

  endGame() {
    const playerKeys = Object.keys(game.players);
    let winner = playerKeys.sort((a, b) => {
      return game.players[b] - game.players[a];
    })[0];
    let winningScore = game.players[winner];
    domUpdates.displayWinner(winner, winningScore);
  }

  quitGame() {
    domUpdates.goToHomeScreen();
  }

  setUpWheel() {
    domUpdates.displayWheel();
  }

  tearDownWheel() {
    domUpdates.hideWheel();
  }


}
