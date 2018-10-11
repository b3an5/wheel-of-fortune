class Round {
  constructor(puzzleBank) {
    this.puzzleBank = puzzleBank
  }

  generatePuzzle() {
    let randomIndex = Math.floor(Math.random() * round.puzzleBank.length);
    return new Puzzle(round.puzzleBank[randomIndex]);
  }
}

class BonusRound extends Round {
  constructor() {

  }
}


if (typeof module !== 'undefined') {
  module.exports = Round;
}