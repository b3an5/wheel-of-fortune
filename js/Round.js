class Round {
  constructor(puzzleBank, wheelValue) {
    this.puzzleBank = puzzleBank;
    this.wheelValue = wheelValue;
  }

  generatePuzzle() {
    let randomIndex = Math.floor(Math.random() * this.puzzleBank.length);
    return new Puzzle(this.puzzleBank[randomIndex]);
  }

  generateWheelValue() {
    let wheelVals = [];
    for (var i = 0; i < 6; i++) {
      let randomIndex = Math.floor(Math.random() * data.wheel.length);
      wheelVals.push(data.wheel[randomIndex]);
    }
    return new Wheel(wheelVals);
  }
}

class BonusRound extends Round {
  constructor(puzzleBank, bonusWheel) {
    super(puzzleBank);
    this.bonusWheel = data.bonusWheel;
  }

  generateBonusWheel() {
    let wheelVals = data.bonusWheel;
    for (var i = 0; i < 6; i++) {
      wheelVals.push(data.bonusWheel[i]);
    }
    return new Wheel(wheelVals);
  }
}


if (typeof module !== 'undefined') {
  module.exports = Round;
}