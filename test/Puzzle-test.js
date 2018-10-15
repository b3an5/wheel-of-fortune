const chai = require('chai');
const expect = chai.expect;
const Puzzle = require('../js/Puzzle.js');
const spies = require('chai-spies');
chai.use(spies);
global.domUpdates = require('../js/DOM.js');
chai.spy.on(global.domUpdates, ['populatePuzzleSquares', 'revealCorrectLetters'], () => true);


describe('Puzzle', () => {

  var puzzle;

  beforeEach(() => {
    puzzle = new Puzzle({  
          category: 'Around The House',
          number_of_words: 1,
          total_number_of_letters: 8,
          first_word: 8, 
          description:'Location or object(s) found within a typical house.',
          correct_answer: 'Armchair',
        });
  });

  it('should keep track of the current puzzle', () => {
    expect(puzzle.currentPuzzle).to.deep.equal({  
          category: 'Around The House',
          number_of_words: 1,
          total_number_of_letters: 8,
          first_word: 8, 
          description:'Location or object(s) found within a typical house.',
          correct_answer: 'Armchair',
        });
  });

  it('should set up the board with the current puzzle', () => {
    puzzle.populateBoard();
    expect(domUpdates.populatePuzzleSquares).to.have.been.called(1);
    expect(domUpdates.populatePuzzleSquares).to.have.been.called.with(['A', 'r', 'm', 'c', 'h', 'a', 'i', 'r']);
  });

  it('should be able to check whether a guess is correct', () => {
    let result = puzzle.checkGuess('C');
    expect(result).to.equal(true);
  });

  it('should be able to check whether a guess is incorrect', () => {
    let result = puzzle.checkGuess('K');
    expect(result).to.equal(false);
  });

  it('should reveal the letter(s) on the board if correct', () => {
    puzzle.countCorrectLetters('C');
    expect(domUpdates.revealCorrectLetters).to.have.been.called(1);
  });

  it('should indicate how many correct letters there are', () => {
    puzzle.countCorrectLetters('C');
    expect(puzzle.numberCorrect).to.equal(1);
  });

  it('should keep track of how many letters have been revealed', () => {
    puzzle.countCorrectLetters('C');
    expect(puzzle.correctCount).to.equal(1);
  });

  it('should indicate when the puzzle is complete', () => {
    expect(puzzle.completed).to.equal(false);
    puzzle.correctCount = 8;
    puzzle.checkCompletion();
    expect(puzzle.completed).to.equal(true);
  });

});





