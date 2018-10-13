class Puzzle {
  constructor(currentPuzzle) {
    this.currentPuzzle = currentPuzzle;
    this.puzzleLength = this.currentPuzzle.total_number_of_letters;
    this.correctCount = 0;
    this.numberCorrect = 0;
    this.completed = false;
  }

  populateBoard() {
    let puzzleArray = this.currentPuzzle.correct_answer.split('');
    domUpdates.populatePuzzleSquares(puzzleArray);
  }

  checkGuess(guess) {
    if (this.currentPuzzle.correct_answer.toUpperCase().includes(guess)) {
      this.countCorrectLetters(guess);
      return true;
    }
    return false;
  }

  countCorrectLetters(guess) {
    let numLetters = 0;
    let puzzleArray = this.currentPuzzle.correct_answer.split('');
    let letterBoxArray = Array.from($('.letter-content'));
    letterBoxArray.forEach(box => {
      if ($(box).text().toUpperCase() === guess) {
        numLetters++;
        this.correctCount++;
        domUpdates.revealCorrectLetters(box);
      }
    });
    this.numberCorrect = numLetters;
    this.checkCompletion();
  }

  checkCompletion() {
    if (this.correctCount === this.puzzleLength) {
      this.completed = true;
    }
  }
}





if (typeof module !== 'undefined') {
  module.exports = Puzzle;
}