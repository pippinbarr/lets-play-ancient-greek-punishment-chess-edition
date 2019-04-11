"use strict";

class Prometheus extends BaseChess {

  constructor () {
    super (3);
  }

  setup (depth) {
    super.setup(depth);
    this.game.load('rnbqkbnr/pppppppp/8/8/8/8/8/4K3 w KQkq - 0 1');
    this.board.position(this.game.fen(),false);
    let date = new Date();
    $('#header').html(`Prometheus vs. Zeus<br \>Hades, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)
  }

  moveBlack() {
    this.moves++;
    let move = this.getBlackMove();
    this.lastMove = this.game.move(move);
    if (this.game.in_checkmate() || this.game.in_stalemate()) {
      let note = 'Stalemate';
      // No more interaction
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
    this.setup(this.depth);
  }
}
