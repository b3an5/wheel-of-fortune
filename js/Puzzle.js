class Puzzle {
  constructor(currentPuzzle) {
    this.currentPuzzle = currentPuzzle;
  }

  populateBoard() {
    let puzzleArray = this.currentPuzzle.correct_answer.split('');
    domUpdates.populatePuzzleSquares(puzzleArray);
  }

  checkGuess(guess) {
    if (this.currentPuzzle.correct_answer.toUpperCase().includes(guess)) {
      return true;
    }
    return false;
  }
}





if (typeof module !== 'undefined') {
  module.exports = Puzzle;
}