const chai = require('chai');
const expect = chai.expect;
const Puzzle = require('../js/Puzzle.js');
const spies = require('chai-spies');
chai.use(spies);
global.domUpdates = require('../js/DOM.js');
chai.spy.on(global.domUpdates, ['populatePuzzleSquares'], () => true);


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

});





