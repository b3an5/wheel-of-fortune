const chai = require('chai');
const expect = chai.expect;
const Round = require('../js/Round.js');
global.Puzzle = require('../js/Puzzle.js');
global.data = require('../js/data.js');
global.Wheel = require('../js/Wheel.js')

describe('Round Class', () => {

  var round1;

  beforeEach(() => {
    round1 = new Round([
      {  
        category: 'Around The House',
        number_of_words: 1,
        total_number_of_letters: 8,
        first_word: 8, 
        description: 'Location or object(s) found within a typical house.',
        correct_answer: 'Armchair',
      },
      {  
        category: 'The 90s',
        number_of_words: 1,
        total_number_of_letters: 7,
        first_word: 7, 
        description: 'Puzzles pertaining to the decade in question.',
        correct_answer: 'Beepers',
      },
      {  
        category: 'The 90s',
        number_of_words: 1,
        total_number_of_letters: 10,
        first_word: 10, 
        description: 'Puzzles pertaining to the decade in question.',
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
        description: 'Location or object(s) found within a typical house.',
        correct_answer: 'Armchair',
      },
      {  
        category: 'The 90s',
        number_of_words: 1,
        total_number_of_letters: 7,
        first_word: 7, 
        description: 'Puzzles pertaining to the decade in question.',
        correct_answer: 'Beepers',
      },
      {  
        category: 'The 90s',
        number_of_words: 1,
        total_number_of_letters: 10,
        first_word: 10, 
        description: 'Puzzles pertaining to the decade in question.',
        correct_answer: 'Tamagotchi',
      }]);
  });

  it('should be able to pick a random puzzle from that bank', () => {
    round1 = new Round([
      {  
        category: 'Around The House',
        number_of_words: 1,
        total_number_of_letters: 8,
        first_word: 8, 
        description: 'Location or object(s) found within a typical house.',
        correct_answer: 'Armchair',
      }]);
    let puzzle = [round1.generatePuzzle().currentPuzzle];
    expect(round1.puzzleBank).to.have.deep.members(puzzle);
  });

  it('should generate a new wheel', () => {
    let wheelData = [
      900,
      'BANKRUPT',
      2500,
      600,
      700,
      600,
      650,
      500,
      700,
      'BANKRUPT',
      600,
      550,
      500,
      600,
      'BANKRUPT',
      'LOSE A TURN',
      700,
      800,
      500,
      650,
      500,
      900
    ];
    let wheel = round1.generateWheelValue();
    expect(wheelData).to.include.members(wheel.spinValues)
  });
});






