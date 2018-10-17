class Game {
  constructor() {
    this.round = 0;
    this.bonusRound = false;
    this.players = {};
    this.puzzleKeys = Object.keys(data.puzzles);
    this.winner = null;
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
    let bonusRoundPuzzles = this.puzzleKeys[roundIndex - 1];
    let puzzleKeyIndex = this.puzzleKeys[roundIndex];
    if (this.round === 5) {
      this.bonusRound = true;
      return new BonusRound(data.puzzles[bonusRoundPuzzles].puzzle_bank,
        data.bonusWheel);
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

  endRound(winner, players, index) {
    let winningPlayer = winner;
    let scoreReset = players.map(player => {
      return new Player(player.name);
    });
    this.players[winningPlayer.name] += winningPlayer.wallet;
    domUpdates.updateBankAccts(winningPlayer, index);
    domUpdates.displayWinner(winningPlayer.name, winningPlayer.wallet);
    return scoreReset;
  }

  endGame() {
    const playerKeys = Object.keys(this.players);
    let winner = playerKeys.sort((a, b) => {
      return this.players[b] - this.players[a];
    })[0];
    let winningScore = this.players[winner];
    this.winner = this.players[winner];
    round.bonusPlayer = this.winner;
    domUpdates.displayBonusIntro(winner, winningScore);
  }

  quitGame() {
    this.round = 0;
    domUpdates.goToHomeScreen();
    domUpdates.resetPuzzleSquares();
    domUpdates.resetKeyboard();
    domUpdates.clearBankAccts();
  }

  setUpWheel() {
    domUpdates.enableLetters();
    domUpdates.displayWheel();
  }

  tearDownWheel() {
    domUpdates.hideWheel();
    wheel.grabSpinValue();
    if (this.bonusRound) {
      round.bonusWheelValue = wheel.currentValue;
    }
    return wheel.currentValue;
  }

}


if (typeof module !== 'undefined') {
  module.exports = Game;
}