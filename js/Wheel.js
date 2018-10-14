class Wheel {
  constructor(spinValues) {
    this.spinValues = spinValues;
    this.currentValue = null;
  }

  grabSpinValue() {
    let randomIndex = Math.floor(Math.random() * wheel.spinValues.length);
    this.currentValue = wheel.spinValues[randomIndex];
    domUpdates.updateCurrentSpin();

  }
}





if (typeof module !== 'undefined') {
  module.exports = Wheel;
}