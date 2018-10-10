class Game {
  constructor() {
    this.round = 1;
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
    return game.players;
  }

  startRound() {

  }

  displayNames() {
    $('.game-winner').text(playerArray[0].name);
    $('.winning-score').text(playerArray[0].wallet);
    $('.on-deck-name').text(playerArray[1].name);
    $('.on-deck-score').text(playerArray[1].wallet);
    $('.in-the-hole-name').text(playerArray[2].name);
    $('.in-the-hole-score').text(playerArray[2].wallet);
  }

  // This needs to receive an array of all of the player instances (objects) at the end of each round

  endRound(players) {
    if (game.round === 3) {
      game.bonusRound = true;
    }
    game.round++;
    let winningPlayer = playerScores.sort((a, b) => {
      return b.score - a.score;
    })[0];
    game.players[winningPlayer.name] = winningPlayer.score;
  }

  endGame() {
    const playerKeys = Object.keys(game.players);
    let winner = playerKeys.sort((a, b) => {
      return game.players[b] - game.players[a];
    })[0];
    $('.game-winner').text(`${winner} WINS!!`);
    $('.winning-score').text(game.players[winner]);
  }

  quitGame() {
    $('.home-screen').css('display', 'flex');
    $('.popup-cover').css('display', 'unset');
  }

  displayWheel() {
    $('.popup-cover').css('display', 'unset');
    $('svg').css('display', 'unset');
  }


}
