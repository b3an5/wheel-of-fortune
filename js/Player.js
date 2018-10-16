class Player {
  constructor(name) {
    this.name = name;
    this.wallet = 0;
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

if (typeof module !== 'undefined') {
  module.exports = Player;
}