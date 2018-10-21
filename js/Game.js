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

  endGame(round) {
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