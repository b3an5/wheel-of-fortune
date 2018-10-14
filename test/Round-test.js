const chai = require('chai');
const expect = chai.expect;
const Round = require('../js/Round.js');
global.Puzzle = require('../js/Puzzle.js')
// const spies = require('chai-spies');
// chai.use(spies);
// global.domUpdates = require('../js/DOM.js');
// chai.spy.on(global.domUpdates, [], () => true)


describe('Round Class', () => {

  var round1;

  beforeEach(() => {
    round1 = new Round([
            {  
              category: 'Around The House',
              number_of_words: 1,
              total_number_of_letters: 8,
              first_word: 8, 
              description:'Location or object(s) found within a typical house.',
              correct_answer: 'Armchair',
            },
            {  
              category: 'The 90s',
              number_of_words: 1,
              total_number_of_letters: 7,
              first_word: 7, 
              description:'Puzzles pertaining to the decade in question.',
              correct_answer: 'Beepers',
            },
            {  
              category: 'The 90s',
              number_of_words: 1,
              total_number_of_letters: 10,
              first_word: 10, 
              description:'Puzzles pertaining to the decade in question.',
              correct_answer: 'Tamagotchi',
            }]);
  });

  it('should start with a bank of puzzles', () => {
    expect(round1.puzzleBank).to.deep.equal([
        {  
          category: 'Around The House',
          number_of_words: 1,
          total_number_of_letters: 8,
          first_word: 8, 
          description:'Location or object(s) found within a typical house.',
          correct_answer: 'Armchair',
        },
        {  
          category: 'The 90s',
          number_of_words: 1,
          total_number_of_letters: 7,
          first_word: 7, 
          description:'Puzzles pertaining to the decade in question.',
          correct_answer: 'Beepers',
        },
        {  
          category: 'The 90s',
          number_of_words: 1,
          total_number_of_letters: 10,
          first_word: 10, 
          description:'Puzzles pertaining to the decade in question.',
          correct_answer: 'Tamagotchi',
        }]);
  });

  it('should be able to pick a random puzzle from that bank', () => {
    let puzzle = round1.generatePuzzle();
    expect(round1.puzzleBank).to.deep.include(puzzle);
  });
});






