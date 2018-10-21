import data from './data.js';
import domUpdates from './DOM.js';
import Player from './Player.js';
import Puzzle from './Puzzle.js';
import Round from './Round.js';
import BonusRound from './BonusRound.js';
import Wheel from './Wheel.js';

class Game {
  constructor() {
    this.round = 0;
    this.bonusRound = false;
    this.players = null;
    this.playerIndex = 0;
    this.puzzleKeys = Object.keys(data.puzzles);
    this.winner = null;
  }

  getPlayers() {
    this.players = domUpdates.getPlayerNames();
    domUpdates.clearInputs();
    domUpdates.goToGameScreen();
  }

  startRound() {
    this.round++;
    $('.round-num').text(this.round);
    let roundIndex = this.round - 1;
    let bonusRoundPuzzles = this.puzzleKeys[roundIndex - 1];
    let puzzleKeyIndex = this.puzzleKeys[roundIndex];
    if (this.round === 5) {
      this.bonusRound = true;
      $('.round-num').text('$');
      return new BonusRound(data.puzzles[bonusRoundPuzzles].puzzle_bank,
        data.bonusWheel);
    } else {
      return new Round(data.puzzles[puzzleKeyIndex].puzzle_bank, data.wheel);
    }
  }

  endTurn() {
    this.playerIndex === 2 ? this.playerIndex = 0 : this.playerIndex++;
    domUpdates.newPlayerTurn(this.players, this.playerIndex);
    domUpdates.disableKeyboard();
    return this.playerIndex;
  }

  endRound() {
    let winner = this.players[this.playerIndex];
    winner.bankAcct += winner.wallet;
    domUpdates.updateBankAccts(winner, this.playerIndex);
    domUpdates.displayWinner(winner.name, winner.wallet);
    this.players.forEach(player => {
      player.wallet = 0;
    });
  }

  endGame(round) {
    let winner = this.players.sort((a, b) => {
      return this.players.bankAcct[b] - this.players.bankAcct[a];
    })[0];
    let winningScore = winner.bankAcct;
    round.bonusPlayer = winner;
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

  tearDownWheel(wheel, round) {
    domUpdates.hideWheel();
    wheel.grabSpinValue(wheel);
    if (this.bonusRound) {
      round.bonusWheelValue = wheel.currentValue;
    }
    return wheel.currentValue;
  }

}


export default Game;