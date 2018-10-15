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

  checkIfConsonantEnabled(event) {
    if ($(event.target).hasClass('disabled')) {
      return false;
    } else if ($(event.target).hasClass('temp-disabled')) {
      return false;
    } else {
      domUpdates.disableGuessedLetter(event);
      return true;
    }
  }

  checkGuess(guess) {
    if (this.currentPuzzle.correct_answer.toUpperCase().includes(guess)) {
      return true;
    }
    return false;
  }

  checkIfVowelCorrect(vowel, player, event) {
    if ($(event.target).hasClass('active-vowel')) {
      player.buyVowel();
      domUpdates.disableGuessedVowel(event);
      this.countCorrectLetters(vowel);
    }
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