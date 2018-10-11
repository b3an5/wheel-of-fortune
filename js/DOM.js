const domUpdates = {

  getPlayerNames() {
    let players = {};
    players[`Player 1: ${$('.player1-name').val()}`] = 0;
    players[`Player 2: ${$('.player2-name').val()}`] = 0;
    players[`Player 3: ${$('.player3-name').val()}`] = 0;
    return players;
  },

  clearInputs() {
    $('.player1-name').val('');
    $('.player2-name').val('');
    $('.player3-name').val('');
  },

  goToGameScreen() {
    $('.home-screen').css('display', 'none');
    $('.popup-cover').css('display', 'none');
  },

  displayNames() {
    $('.game-winner').text(playerArray[0].name);
    $('.winning-score').text(playerArray[0].wallet);
    $('.on-deck-name').text(playerArray[1].name);
    $('.on-deck-score').text(playerArray[1].wallet);
    $('.in-the-hole-name').text(playerArray[2].name);
    $('.in-the-hole-score').text(playerArray[2].wallet);
  },

  displayWinner(winner, score) {
    $('.game-winner').text(`${winner} WINS!!`);
    $('.winning-score').text(score);
  },

  goToHomeScreen() {
    $('.home-screen').css('display', 'flex');
    $('.popup-cover').css('display', 'unset');
  },

  displayWheel() {
    $('.popup-cover').css('display', 'unset');
    $('.wheel').toggleClass('slide-in');
  },

  hideWheel() {
    $('.popup-cover').css('display', 'none');
    $('.wheel').toggleClass('slide-in');
    $('.wheel-circle').toggleClass('wheel-spin');
  },

  populatePuzzleSquares(puzzle) {
    let letterBoxArray = Array.from($('.letter-content'));
    puzzle.forEach((letter, i) => {
     if (letter === '-' || letter === '&' || letter === '\'') {
        $(letterBoxArray[i]).text(letter);
        $(letterBoxArray[i]).parent().css('background', 'white');
      } else if (letter !== ' ') {
        $(letterBoxArray[i]).text(letter);
        $(letterBoxArray[i]).css('opacity', 0);
        $(letterBoxArray[i]).parent().css('background', 'white');
      } 
    });
  },


}






