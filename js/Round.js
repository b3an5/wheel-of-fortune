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
    this.keyBoardClickCount = 0;
    this.didWinBonus = null;
    this.bonusWheelValue = null;
    this.bonusPlayer = null;
  }

  generateBonusWheel() {
    let wheelVals = [];
    for (var i = 0; i < 6; i++) {
      wheelVals.push(data.bonusWheel[i]);
    }
    return new Wheel(wheelVals);
  }

  generateBonusPuzzle() {
    let randomIndex = Math.floor(Math.random() * this.puzzleBank.length);
    return new Puzzle(this.puzzleBank[randomIndex]);
  }

  postBonusResult() {
    $('.popup-cover').css('display', 'unset');
    $('.bonus-round-intro').css('display', 'flex');
    if (this.didWinBonus) {
      $('.win-message').text(` WINS THE BONUS!`);
      var winnings = this.bonusPlayer + this.bonusWheelValue;
    } else {
      $('.win-message').text(` MISSED THE BONUS!`);
      var winnings = this.bonusPlayer;
    }
    $('.winner-money-pre-bonus').text(winnings)
    $('.start-bonus-round').remove();
    $('.bonus-round-intro').append('<button class="new-game">NEW GAME</button>')
  }
}


if (typeof module !== 'undefined') {
  module.exports = Round;
}