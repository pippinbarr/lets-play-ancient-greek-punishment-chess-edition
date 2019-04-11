"use strict";

class Tantalus extends BaseChess {

  constructor () {
    super(3);
  }

  setup(depth) {
    super.setup(depth);
    console.log(this.blackWins);
    let date = new Date();
    let width = $('#board').width();

    if (this.gameNumber === undefined) this.gameNumber = 1;
    let winNote = '';
    if (this.gameNumber === 2) winNote = ` (Zeus leads by ${this.gameNumber - 1} game)`;
    else if (this.gameNumber > 2) winNote = ` (Zeus leads by ${this.gameNumber - 1} games)`;

    $('#header').html(`Tantalus vs. Zeus`)
    $('#sub-header').html(`Game #${this.gameNumber}${winNote}<br \>Hades, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)

    this.game.load('rnbq1bnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    this.board.position(this.game.fen(),false);

    $('.chessboard-63f37').prepend(`<div id="extra-board" class="board-b72b1" style="width: ${width}px; height: ${width/8}px"></div>`);
    $('#extra-board').css({
      borderColor: 'rgb(0,0,0,0)'
    });
    $('#extra-board').prepend('<div id="extra-row" class="row-5277c"></div>');
    let squareSize = $('.square-55d63').width();
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: ${squareSize}px; height: ${squareSize}px;">`);
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: ${squareSize}px; height: ${squareSize}px;">`);
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: ${squareSize}px; height: ${squareSize}px;">`);
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: ${squareSize}px; height: ${squareSize}px;">`);
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/bK.png" alt="" class="piece-417db" data-piece="bR" style="width: ${squareSize}px; height: ${squareSize}px;">`);

    $(document).on('keyup',(e) => { this.resetGame(); });
  }

  moveBlack() {
    this.moves++;
    let move = this.getBlackMove();
    this.lastMove = this.game.move(move);
    if (this.game.in_checkmate() || this.game.in_stalemate()) {
      let note = 'Zeus wins';
      this.lastMove.san += ' 0-1';
      $('.square-55d63').off('click');
      this.updatePGN(this.lastMove,note);
      this.board.position(this.game.fen(),true);
      setTimeout(() => { this.resetGame() },5000);
      return;
    }

    this.updatePGN(this.lastMove,'');
    this.board.position(this.game.fen(),true);
  }

  resetGame() {
    $('#board').html('');
    this.gameNumber++;
    this.setup(this.depth);
  }
}
