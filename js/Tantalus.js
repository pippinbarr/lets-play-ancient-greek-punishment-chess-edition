"use strict";

class Tantalus extends BaseChess {

  constructor () {
    super(3);
    // this.game.load('8/8/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    this.game.load('rnbq1bnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    this.board.position(this.game.fen(),false);

    $('.chessboard-63f37').prepend(`<div id="extra-board" class="board-b72b1" style="width: 392px; height: 49px"></div>`);
    $('#extra-board').css({
      borderColor: 'white'
    });
    $('#extra-board').prepend('<div id="extra-row" class="row-5277c"></div>');
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: 49px; height: 49px;">`);
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: 49px; height: 49px;">`);
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: 49px; height: 49px;">`);
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: 49px; height: 49px;">`);
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/bK.png" alt="" class="piece-417db" data-piece="bR" style="width: 49px; height: 49px;">`);
  }
}
