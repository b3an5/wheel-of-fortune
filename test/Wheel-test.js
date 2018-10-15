const chai = require('chai');
const expect = chai.expect;
const Wheel = require('../js/Wheel.js')
global.data = require('../js/data.js');
global.domUpdates = require('../js/DOM.js');
const spies = require('chai-spies');
chai.use(spies);
chai.spy.on(global.domUpdates, ['updateCurrentSpin'], () => true);

describe('Wheel Class', () => {

  var wheel;

  beforeEach(() => {
    wheel = new Wheel([500, 600, 600, 'BANKRUPT', 800, 2500]);
  });

  it('should start with an array of 6 values to choose from', () => {
    expect(wheel.spinValues).to.deep.equal([500, 600, 600, 'BANKRUPT', 800, 2500])
  });

  it('should be able to choose a random value when spun', () => {
    wheel.grabSpinValue();
    expect(wheel.spinValues).to.include(wheel.currentValue);
    expect(domUpdates.updateCurrentSpin).to.have.been.called(1);
  });

});
