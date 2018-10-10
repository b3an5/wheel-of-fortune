class Game {
  constructor() {
    this.round = 1;
    this.currentPlayer = 'Player 1';
    this.bonusRound = false;
    this.players = {};
  }

  init() {
    game.players[`Player 1: ${$('.player1-name').val()}`] = 0;
    game.players[`Player 2: ${$('.player2-name').val()}`] = 0;
    game.players[`Player 3: ${$('.player3-name').val()}`] = 0;
    $('.player1-name').val('');
    $('.player2-name').val('');
    $('.player3-name').val('');
    $('.home-screen').css('display', 'none');
    $('.popup-cover').css('display', 'none');
  }

  endRound() {
    if (game.round === 3) {
      game.bonusRound = true;
    }
    game.round++;
    // Logic for player scores - give winner points
  }

  endGame() {
    $('.home-screen').css('display', 'flex');
    $('.popup-cover').css('display', 'unset');
  }

  displayWheel() {

  }


}
