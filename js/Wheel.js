import data from './data.js';
import Game from './Game.js';
import domUpdates from './DOM.js';
import Player from './Player.js';
import Puzzle from './Puzzle.js';
import Round from './Round.js';

class Wheel {
  constructor(spinValues) {
    this.spinValues = spinValues;
    this.currentValue = null;
  }

  grabSpinValue(wheel) {
    let randomIndex = Math.floor(Math.random() * this.spinValues.length);
    this.currentValue = this.spinValues[randomIndex];
    domUpdates.updateCurrentSpin(wheel);
  }
}


export default Wheel;