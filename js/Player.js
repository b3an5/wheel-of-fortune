class Player {
  constructor(name) {
    this.name = name;
    this.wallet = 110;
  }

  guessCorrectLetter(numCorrect) {
    
  }

  buyVowel() {
    this.wallet > 100 ? this.wallet -= 100 : alert('No!');
    domUpdates.highlightVowels();
    domUpdates.updateWallet(this);
  }

}

if (typeof module !== 'undefined') {
  module.exports = Player;
}