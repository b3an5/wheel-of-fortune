class Puzzle {
  constructor(currentPuzzle) {
    this.currentPuzzle = currentPuzzle;
  }

  populateBoard() {
    let puzzleArray = puzzle.currentPuzzle.correct_answer.split('');
    domUpdates.populatePuzzleSquares(puzzleArray);
  }
}





if (typeof module !== 'undefined') {
  module.exports = Puzzle;
}