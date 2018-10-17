const domUpdates = {

  getPlayerNames() {
    let players = {};
    players[`Player 1: ${$('.player1-name').val()}`] = 0;
    players[`Player 2: ${$('.player2-name').val()}`] = 0;
    players[`Player 3: ${$('.player3-name').val()}`] = 0;
    if ($('.player1-name').val() &&
     $('.player2-name').val() &&
      $('.player3-name').val()) {
      $('.player1-ba').text(`${$('.player1-name').val()}: $`);
      $('.player2-ba').text(`${$('.player2-name').val()}: $`);
      $('.player3-ba').text(`${$('.player3-name').val()}: $`);
    }
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

  displayNames(playerArray, index) {
    $('.game-winner').text(playerArray[index].name);
    $('.winning-score').text(playerArray[index].wallet);
    if (index === 2) {
      $('.on-deck-name').text(playerArray[0].name);
      $('.on-deck-score').text(playerArray[0].wallet);
      $('.in-the-hole-name').text(playerArray[1].name);
      $('.in-the-hole-score').text(playerArray[1].wallet);
    } else if (index === 1) {
      $('.on-deck-name').text(playerArray[2].name);
      $('.on-deck-score').text(playerArray[2].wallet);
      $('.in-the-hole-name').text(playerArray[0].name);
      $('.in-the-hole-score').text(playerArray[0].wallet);
    } else {
      $('.on-deck-name').text(playerArray[1].name);
      $('.on-deck-score').text(playerArray[1].wallet);
      $('.in-the-hole-name').text(playerArray[2].name);
      $('.in-the-hole-score').text(playerArray[2].wallet);
    }
    
      
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
      } else if (letter === ' ') {
        $(letterBoxArray[i]).text(' ');
        $(letterBoxArray[i]).parent().css('background', '#1c7455')
      }
    });
  },

  showBonusLetters(length) {
    let letterBoxArray = Array.from($('.letter-content'));
    for (let i = 0; i < 7; i++) {
      let rand = Math.floor(Math.random() * length);
      $(letterBoxArray[rand]).css('opacity', 1);
    }
  },

  newRoundKeyboard() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if($(letter).hasClass('disabled')) {
        $(letter).removeClass('disabled');
      } else if ($(letter).hasClass('vowel-disabled')) {
        $(letter).removeClass('vowel-disabled');
      }
    });
    this.resetVowels();
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

  resetVowels() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if($(letter).hasClass('vowel')) {
        $(letter).removeClass('vowel-disabled');
        $(letter).removeClass('active-vowel');
        $(letter).addClass('temp-disabled');
        }
    });
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
          $(letter).addClass('temp-disabled');
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

  yellCurrentSpin() {
    $('.yell-box').text(wheel.currentValue);
    $('.yell-box').toggleClass('yell-active');
  },

  updateCategory() {
    $('.hint-value').text(puzzle.currentPuzzle.category)
  },

  displayWheelValues() {
    for (var i = 0; i < 6; i++) {
      $(`.mark${i+1}`).text(wheel.spinValues[i])
    }
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

  displaySolvePopup() {
    $('.solve-popup').css('display', 'flex');
  },

  hideSolvePopup() {
    $('.solve-popup').css('display', 'none');
  },

  updateBankAccts(winner, i) {
    $(`.player${i+1}-ba-num`).text(winner.wallet);
  },

  clearBankAccts() {
    $('.player1-ba-num').text('0');
    $('.player2-ba-num').text('0');
    $('.player3-ba-num').text('0');
    $('.player1-ba').text('P1: $');
    $('.player2-ba').text('P2: $');
    $('.player3-ba').text('P3: $')
  },

  displayBonusIntro(winner, score) {
    $('.popup-cover').css('display', 'unset');
    $('.bonus-round-intro').css('display', 'flex');
    $('.name-of-bonus-player').text(winner);
    $('.winner-money-pre-bonus').text(score);
  },

  startBonusRound() {
    $('.popup-cover').css('display', 'none');
    $('.bonus-round-intro').css('display', 'none');
    $('header').html('<h1 class="bonus-round-header">BONUS RoUND</h1><h2 class="bonus-instructions">Choose 1 vowel and 3 consonants')
    $('header').css('display', 'block');
    $('.bank-accts').css('bottom', '35px');
  },

  resetGameDisplay() {
    $('.spin-number').text('--');
    $('.bonus-round-intro').css('display', 'none');
    $('.popup-cover').css('display', 'none');
    $('header').css('display', 'unset');
    $('header').html('<header><div class="on-deck"><h2 class="on-deck-name">player 2</h2><h2 class="on-deck-score">2,000</h2></div><div class="at-bat"><h2 class="game-winner">player 1</h2><h2 class="winning-score">2,000</h2><button class="spin-button top-buttons">SPIN</button><button class="solve-button top-buttons">SOLVE</button><button class="vowel-button top-buttons">VOWEL</button></div><div class="in-the-hole"><h2 class="in-the-hole-name">player 3</h2><h2 class="in-the-hole-score">2,000</h2></div></header>');
  }

}










