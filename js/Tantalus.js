"use strict";

class Tantalus extends BaseChess {

  constructor () {
    super(3);
  }

  setup(depth) {
    super.setup(depth);
    let date = new Date();
    let width = $('#board').width();

    if (this.gameNumber === undefined) this.gameNumber = 1;
    let winNote = '';
    if (this.gameNumber === 2) winNote = ` (Zeus leads by ${this.gameNumber - 1} game)`;
    else if (this.gameNumber > 2) winNote = ` (Zeus leads by ${this.gameNumber - 1} games)`;

    $('#header').html(`Tantalus vs. Zeus`)
    $('#sub-header').html(`Game #${this.gameNumber}${winNote}<br \>Hades, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)

    this.game.load('rnbq1bnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQ - 0 1');
    this.board.position(this.game.fen(),false);

    this.squareSize = $('.square-55d63').width();
    this.$king = $(`<img src="assets/images/chesspieces/wikipedia/bK.png" alt="" style="width: ${this.squareSize}px; height: ${this.squareSize}px;">`)
    this.$king.css({
      position: 'relative',
      top: 0,
      left: 0
    });
    $('.square-e8').append(this.$king);
  }

  moveWhite(from,to) {
    super.moveWhite(from,to);
    if (this.moves === 0) {
      setTimeout(() => {
        this.$king.animate({
          top: -this.squareSize
        },200,() => {
          placeSFX.play();
        });
      },200);
    }
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

      setTimeout(() => { this.resetGame() },RESET_TIME);
      return;
    }

    this.updatePGN(this.lastMove,'');
    this.board.position(this.game.fen(),true);
    setTimeout(() => {
      if (this.lastMove.captured !== undefined) {
        captureSFX.play();
      }
      else {
        placeSFX.play();
      }
      this.enableInput();
    },this.config.moveSpeed * 1.1);
  }

  resetGame() {
    $('#board').html('');
    this.gameNumber++;
    this.setup(this.depth);
  }
}
