const chai = require('chai');
const expect = chai.expect;
const Round = require('../js/Round.js');
const BonusRound = require('../js/Round.js');
global.Puzzle = require('../js/Puzzle.js');
global.data = require('../js/data.js');
global.Wheel = require('../js/Wheel.js')
// gobal.generateBonusWheel = () => {
//   return new Wheel([20000, 3000, 4000, 5000, 6000, 7000]);
// }

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
      }], data.wheel);
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

describe('Bonus Round Class', () => {

  var bonusRound1;

  beforeEach(() => {
    bonusRound1 = new BonusRound([
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
      }], data.bonusWheel)
    bonusRound1.generateBonusWheel = () => {
      return new Wheel([20000, 3000, 4000, 5000, 6000, 7000]);
    }
    bonusRound1.generateBonusPuzzle = () => {
      return new Puzzle({  
        category: 'The 90s',
        number_of_words: 1,
        total_number_of_letters: 7,
        first_word: 7, 
        description: 'Puzzles pertaining to the decade in question.',
        correct_answer: 'Beepers',
      });
    }
  });

  it('should create a bonus wheel', () => {
    let wheel = bonusRound1.generateBonusWheel();
    expect(wheel.spinValues).to.deep.equal([
      20000,
      3000,
      4000,
      5000,
      6000,
      7000
    ]);

  });

  it('should generate a bonus puzzle', () => {
    let puzzle = bonusRound1.generateBonusPuzzle();
    expect(puzzle.currentPuzzle).to.deep.equal({  
      category: 'The 90s',
      number_of_words: 1,
      total_number_of_letters: 7,
      first_word: 7, 
      description: 'Puzzles pertaining to the decade in question.',
      correct_answer: 'Beepers',
    });
  });
});







