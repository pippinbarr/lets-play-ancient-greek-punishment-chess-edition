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
    })
    $('#extra-board').prepend('<div id="extra-row" class="row-5277c"></div>');
    $('#extra-row').append(`<img src="img/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: 49px; height: 49px;">`);
    $('#extra-row').append(`<img src="img/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: 49px; height: 49px;">`);
    $('#extra-row').append(`<img src="img/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: 49px; height: 49px;">`);
    $('#extra-row').append(`<img src="img/chesspieces/wikipedia/blank.png" alt="" class="piece-417db" data-piece="bR" style="width: 49px; height: 49px;">`);
    $('#extra-row').append(`<img src="img/chesspieces/wikipedia/bK.png" alt="" class="piece-417db" data-piece="bR" style="width: 49px; height: 49px;">`);


    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bR.png" style="width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bN.png" style="width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bB.png" style="width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bQ.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bK.png" style="margin-left: 200px; width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bB.png" style="width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bN.png" style="width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bR.png" style="width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    // $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
  }

  // moveBlack() {
  //   let fen = this.game.fen();
  //   let fenArray = fen.split(' ');
  //   fenArray[1] = 'w';
  //   fenArray[3] = '-'; // Really don't get how this goes wonky and needs this 'fix'
  //   fen = fenArray.join(' ');
  //   this.game.load(fen);
  // }

}
