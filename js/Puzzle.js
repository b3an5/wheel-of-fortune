class Puzzle {
  constructor(currentPuzzle) {
    this.currentPuzzle = currentPuzzle;
  }

  populateBoard() {
    let puzzleArray = puzzle.currentPuzzle.correct_answer.split('');
    let letterBoxArray = Array.from($('.letter-content'));
    puzzleArray.forEach((letter, i) => {
     if (letter === '-' || letter === '&' || letter === '\'') {
        $(letterBoxArray[i]).text(letter);
        $(letterBoxArray[i]).parent().css('background', 'white');
      } else if (letter !== ' ') {
        $(letterBoxArray[i]).text(letter);
        $(letterBoxArray[i]).css('opacity', 0);
        $(letterBoxArray[i]).parent().css('background', 'white');
      } 
    });
  }
}