import data from './data.js';
import Game from './Game.js';
import domUpdates from './DOM.js';
import Puzzle from './Puzzle.js';
import Round from './Round.js';
import Wheel from './Wheel.js';

class Player {
  constructor(name) {
    this.name = name;
    this.wallet = 0;
    this.bankAcct = 0;
  }

  guessCorrectLetter(numCorrect, wheelValue) {
    this.wallet += numCorrect * wheelValue;
    domUpdates.updateWallet(this);
    domUpdates.disableKeyboard();
  }

  buyVowel() {
    this.wallet -= 100;
    domUpdates.highlightVowels();
    domUpdates.updateWallet(this);
  }

}


export default Player;