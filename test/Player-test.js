const chai = require('chai');
const expect = chai.expect;
const Player = require('../js/Player.js');
// const spies = require('chai-spies');
// chai.use(spies);

describe('Player', () => {

  var player;

  beforeEach(() => {
    player = new Player('John');
  });

  it('should have a name', () => {
    expect(player.name).to.equal('John');
  });

  it('should start with an empty wallet', () => {
    expect(player.wallet).to.equal(0);
  });

  it('should be able to guess a letter', () => {
    
  });

  it('should be able to buy a vowel', () => {
    
  });

});