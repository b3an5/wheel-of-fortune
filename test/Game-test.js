const chai = require('chai');
const expect = chai.expect;
const Game = require('../js/Game.js');
const spies = require('chai-spies');
chai.use(spies);
global.data = require('../js/data.js');
global.domUpdates = require('../js/DOM.js');
global.Round = require('../js/Round.js');
chai.spy.on(global.domUpdates, ['getPlayerNames', 'clearInputs', 'goToGameScreen', 'displayWinner', 'goToHomeScreen', 'displayWheel', 'hideWheel'], () => true);

describe('Game', () => {
  var game;
  beforeEach(() => {
    game = new Game()
  })

  it('should start at round 0', () => {
  expect(game.round).to.equal(0);
  expect(game.bonusRound).to.equal(false);
  });

  it('should start with no players', () => {
  expect(game.players).to.deep.equal({});
  });

  it('should start with 4 puzzle banks', () => {
    expect(game.puzzleKeys).to.deep.equal(['one_word_answers', 'two_word_answers', 'three_word_answers', 'four_word_answers']);
  });

  it.skip('should be able to take in player names', () => {
   
  });

  it('should start a new game', () => {
    game.init();
    expect(global.domUpdates.clearInputs).to.have.been.called(1);
    expect(global.domUpdates.goToGameScreen).to.have.been.called(1);
  });

  it('should be able to start a new round', () => {
    game.startRound();
    expect(game.round).to.equal(1);
  });

  it('should choose the winner of the round and push value to score', () => {
    game.endRound([{name: 'Player 1: Theo', score: 400}, {name: 'Player 2: Jamie', score: -200}, {name: 'Player 3: Dog', score: 10000}]);
    expect(game.players['Player 3: Dog']).to.equal(10000)
  });

  it('should reset everyones wallet', () => {
    let result = game.endRound([{name: 'Player 1: Theo', score: 400}, {name: 'Player 2: Jamie', score: -200}, {name: 'Player 3: Dog', score: 10000}]);
    expect(result).to.deep.equal([{name: 'Player 1: Theo', score: 0}, {name: 'Player 2: Jamie', score: 0}, {name: 'Player 3: Dog', score: 0}])
  });

  it('should end game', () => {
    game.players = {'player1: Theo': 400, 'player2: Jamie': 500, 'player3: Bartholimule': 700};
    game.endGame();
    expect(global.domUpdates.displayWinner).to.have.been.called(1);
    expect(global.domUpdates.displayWinner).to.have.been.called.with('player3: Bartholimule', 700)
  });

  it('should show homescreen when quit button is pressed', () => {
    game.quitGame();
    expect(global.domUpdates.goToHomeScreen).to.have.been.called(1);
  });

  it('should display the wheel when spin button is pressed', () => {
    game.setUpWheel();
    expect(global.domUpdates.displayWheel).to.have.been.called(1);
  });

  it('should hide wheel after it is spun on delay', () => {
    game.tearDownWheel();
    expect(global.domUpdates.hideWheel).to.have.been.called(1);
  })
})

