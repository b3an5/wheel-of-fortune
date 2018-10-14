class Round {
  constructor(puzzleBank) {
    this.puzzleBank = puzzleBank
  }

  generatePuzzle() {
    let randomIndex = Math.floor(Math.random() * this.puzzleBank.length);
    return new Puzzle(this.puzzleBank[randomIndex]);
  }
}

class BonusRound extends Round {
  constructor() {

  }
}


if (typeof module !== 'undefined') {
  module.exports = Round;
}