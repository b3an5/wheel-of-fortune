class Round {
  constructor(puzzleBank, wheelValue) {
    this.puzzleBank = puzzleBank,
    this.wheelValue = wheelValue
  }

  generatePuzzle() {
    let randomIndex = Math.floor(Math.random() * round.puzzleBank.length);
    return new Puzzle(round.puzzleBank[randomIndex]);
  }

  generateWheelValue() {
    let wheelVals = [];
    for (var i = 0; i < 6; i++) {
      let randomIndex = Math.floor(Math.random() * round.wheelValue.length);
      wheelVals.push(round.wheelValue[randomIndex]);
    }
    return new Wheel(wheelVals);
  }
}

class BonusRound extends Round {
  constructor() {

  }
}


if (typeof module !== 'undefined') {
  module.exports = Round;
}