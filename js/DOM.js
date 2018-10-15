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

  resetPuzzleSquares() {
    let letterBoxArray = Array.from($('.letter-content'));
    letterBoxArray.forEach(box => {
      $(box).text('');
      $(box).parent().css('background', '#1c7455')
    })
  },

  disableGuessedLetter(event) {
    if ($(event.target).hasClass('keyboard-letters')) {
      $(event.target).addClass('disabled')
    }
  },

  revealCorrectLetters(box) {
    $(box).css('opacity', 1);
  },

  resetKeyboard() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if(!['A', 'E', 'I', 'O', 'U'].includes($(letter).text())) {
        $(letter).removeClass('vowel');
      }
    });
  },

  newPlayerTurn(array, index) {
    $('.game-winner').text(array[index].name);
    $('.winning-score').text(array[index].wallet);
    if (index === 2) {
      $('.on-deck-name').text(array[0].name);
      $('.on-deck-score').text(array[0].wallet);
      $('.in-the-hole-name').text(array[1].name)
      $('.in-the-hole-score').text(array[1].wallet)
    } else if (index === 1) {
      $('.on-deck-name').text(array[2].name);
      $('.on-deck-score').text(array[2].wallet);
      $('.in-the-hole-name').text(array[0].name)
      $('.in-the-hole-score').text(array[0].wallet)
    } else {
      $('.on-deck-name').text(array[1].name);
      $('.on-deck-score').text(array[1].wallet);
      $('.in-the-hole-name').text(array[2].name)
      $('.in-the-hole-score').text(array[2].wallet)
    }
  },

  highlightVowels() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if ($(letter).hasClass('vowel') && !$(letter).hasClass('vowel-disabled')) {
        $(letter).toggleClass('active-vowel');
      } else {
        if (!$(letter).hasClass('disabled')) {
          $(letter).addopnClass('temp-disabled');
        }
      }
    });
  },

  disableGuessedVowel(event) {
     if ($(event.target).hasClass('vowel')) {
      $(event.target).toggleClass('vowel-disabled');
    }
  },

  updateWallet(player) {
    $('.winning-score').text(player.wallet);
  },

  updateCurrentSpin() {
    $('.spin-number').text(wheel.currentValue)
  },

  enableLetters() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if ($(letter).hasClass('temp-disabled')) {
        $(letter).toggleClass('temp-disabled');
      }
    });
  },

  disableKeyboard() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if (!$(letter).hasClass('vowel')) {
        $(letter).toggleClass('temp-disabled');
      }
    })
  },


}










