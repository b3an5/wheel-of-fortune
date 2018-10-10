let game = new Game();

$('.start-button').on('click', () => {
  game = new Game();
  game.init()
});
$('.quit').on('click', game.endGame);