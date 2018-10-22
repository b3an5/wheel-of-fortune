import domUpdates from './DOM.js';

class Wheel {
  constructor(spinValues) {
    this.spinValues = spinValues;
    this.currentValue = null;
  }

  grabSpinValue() {
    let randomIndex = Math.floor(Math.random() * this.spinValues.length);
    this.currentValue = this.spinValues[randomIndex];
    domUpdates.updateCurrentSpin(this.currentValue);
  }
}


export default Wheel;