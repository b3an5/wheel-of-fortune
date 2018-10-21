import domUpdates from './DOM.js';

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