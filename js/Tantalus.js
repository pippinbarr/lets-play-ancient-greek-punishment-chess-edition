"use strict";

class Tantalus extends BaseChess {

  constructor () {
    super(3);
    this.game.load('8/8/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    this.board.position(this.game.fen(),false);
    $('#board').prepend('<div id="black-pieces"></div>');
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bR.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bN.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bB.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bQ.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bK.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bB.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bN.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bR.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
    $('#black-pieces').append(`<img src="img/chesspieces/wikipedia/bP.png" style="width: 49px; height: 49px;">`);
  }

  moveBlack() {
    let fen = this.game.fen();
    let fenArray = fen.split(' ');
    fenArray[1] = 'w';
    fenArray[3] = '-'; // Really don't get how this goes wonky and needs this 'fix'
    fen = fenArray.join(' ');
    this.game.load(fen);
  }

}
