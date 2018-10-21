import data from './data.js';
import Game from './Game.js';
import domUpdates from './DOM.js';
import Player from './Player.js';
import Round from './Round.js';
import Wheel from './Wheel.js';


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

  populateBonus(puzzleLength) {
    let puzzleArray = this.currentPuzzle.correct_answer.split('');
    domUpdates.populatePuzzleSquares(puzzleArray);
    domUpdates.showBonusLetters(puzzleLength);
  }

  checkIfConsonantEnabled(event) {
    if ($(event.target).hasClass('disabled') ||
    $(event.target).hasClass('temp-disabled') ||
    $(event.target).hasClass('keyboard-section')) {
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

  solvePuzzle(guess) {
    if (guess === this.currentPuzzle.correct_answer.toLowerCase()) {
      domUpdates.hideSolvePopup();
      domUpdates.yellCurrentSpin('CORRECT');
      setTimeout(domUpdates.yellCurrentSpin, 2000);
      this.completed = true;
      let letterBoxArray = Array.from($('.letter-content'));
      letterBoxArray.forEach(box => domUpdates.revealCorrectLetters(box));
      return true;
    } else {
      domUpdates.hideSolvePopup();
      domUpdates.yellCurrentSpin('INCORRECT');
      setTimeout(domUpdates.yellCurrentSpin, 2000);
      return false;
    }
  }
}


export default Puzzle;