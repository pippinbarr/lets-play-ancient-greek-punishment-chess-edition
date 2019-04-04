"use strict";

class Tantalus extends BaseChess {

  constructor () {
    super (3);
    this.game.load('rnbq1bnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    this.board.position(this.game.fen(),false);
  }
}
