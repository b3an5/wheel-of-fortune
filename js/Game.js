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
    let roundIndex = this.round - 1;
    let puzzleKeyIndex = this.puzzleKeys[roundIndex];
    if (this.round === 5) {
      this.bonusRound = true;
      return new BonusRound();
    } else {
      return new Round(data.puzzles[puzzleKeyIndex].puzzle_bank, data.wheel);
    }
  }

  endTurn(array, index) {
    index === 2 ? index = 0 : index++;
    domUpdates.newPlayerTurn(array, index);
    domUpdates.disableKeyboard();
    return index;
  }

  endRound(players) {
    let winningPlayer = players.sort((a, b) => {
      return b.wallet - a.wallet;
    })[0];
    let scoreReset = players.map(player => {
      return new Player(player.name);
    });
    this.players[winningPlayer.name] += winningPlayer.wallet;
    domUpdates.displayWinner(winningPlayer.name, winningPlayer.wallet);
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
    domUpdates.goToHomeScreen();
    domUpdates.resetPuzzleSquares();
    domUpdates.resetKeyboard();
  }

  setUpWheel() {
    domUpdates.enableLetters();
    domUpdates.displayWheel();
  }

  tearDownWheel() {
    domUpdates.hideWheel();
    wheel.grabSpinValue();
    return wheel.currentValue;
  }


}

if (typeof module !== 'undefined') {
  module.exports = Game;
}
