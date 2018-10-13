class Game {
  constructor() {
    this.round = 0;
    this.bonusRound = false;
    this.players = {};
    this.puzzleKeys = Object.keys(data.puzzles);
  }

  init() {
    this.players = Object.assign({}, domUpdates.getPlayerNames());
    domUpdates.clearInputs();
    domUpdates.goToGameScreen();
    return this.players;
  }

  startRound() {
    this.round++;
    if (this.round === 5) {
      this.bonusRound = true;
      return new BonusRound();
    } else {
      return new Round(data.puzzles[this.puzzleKeys[this.round - 1]].puzzle_bank);
    }
  }


  // This needs to receive an array of all of the player instances (objects) at the end of each round

  endRound(players) {
    let scoreReset = players.map(player => {
      return {name: player.name, score: 0};
    });
    let winningPlayer = players.sort((a, b) => {
      return b.score - a.score;
    })[0];
    this.players[winningPlayer.name] = winningPlayer.score;
    return scoreReset;
  }

  endGame() {
    const playerKeys = Object.keys(this.players);
    let winner = playerKeys.sort((a, b) => {
      return this.players[b] - this.players[a];
    })[0];
    let winningScore = this.players[winner];
    domUpdates.displayWinner(winner, winningScore);
  }

  quitGame() {
    domUpdates.resetPuzzleSquares();
    domUpdates.goToHomeScreen();
    domUpdates.resetKeyboard();
  }

  setUpWheel() {
    domUpdates.displayWheel();
  }

  tearDownWheel() {
    domUpdates.hideWheel();
  }


}

if (typeof module !== 'undefined') {
  module.exports = Game;
}
