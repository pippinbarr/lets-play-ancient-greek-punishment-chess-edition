"use strict";

class Tantalus extends BaseChess {

  constructor () {
    super(3);
    let date = new Date();
    let width = $('#board').width();
    $('#header').html(`Tantalus vs. Zeus<br \>Hades, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)

    this.game.load('rnbq1bnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    this.board.position(this.game.fen(),false);

    $('.chessboard-63f37').prepend(`<div id="extra-board" class="board-b72b1" style="width: ${width}px; height: ${width/8}px"></div>`);
    $('#extra-board').css({
      borderColor: 'rgb(0,0,0,0)'
    });
    $('#extra-board').prepend('<div id="extra-row" class="row-5277c"></div>');
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: ${width/8}px; height: ${width/8}px;">`);
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: ${width/8}px; height: ${width/8}px;">`);
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: ${width/8}px; height: ${width/8}px;">`);
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: ${width/8}px; height: ${width/8}px;">`);
    $('#extra-row').append(`<img src="assets/images/chesspieces/wikipedia/bK.png" alt="" class="piece-417db" data-piece="bR" style="width: ${width/8}px; height: ${width/8}px;">`);
  }
}
