"use strict";

class Zeno extends BaseChess {

  constructor () {
    super (3);
    let date = new Date();
    $('#header').text(`Sisyphus vs. Archimedes, Unknown location, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)

  }

  moveWhite(from,to) {

    // Disable all future interaction for white
    $('.square-55d63').off('click');

    // Clear all highlights from the board
    this.clearHighlights();

    // Animate part way
    this.originalPiece = $(`.square-${from}`).find(`.piece-417db`);
    this.piece = $(`.square-${from}`).find(`.piece-417db`).clone(true).appendTo('body');
    $('body').append(this.piece);
    console.log(this.originalPiece.offset().left,this.originalPiece.offset().top)
    this.piece.offset({
      top: this.originalPiece.offset().top,
      left: this.originalPiece.offset().left
    });
    this.destination = $(`.square-${to}`);

    this.totalDx = this.destination.offset().left - this.piece.offset().left;
    this.totalDy = this.destination.offset().top - this.piece.offset().top;

    this.dx = this.totalDx / 2;
    this.dy = this.totalDy / 2;

    this.piece.animate({
      top: `+=${this.dy}`,
      left: `+=${this.dx}`,
    },1000,() => {
      this.moveBlack();
    });

    // Remove the piece from the board representation (and the game)
    this.game.remove(from);
    this.board.position(this.game.fen());

    return;
  }

  moveBlack () {
    // Make it black's turn
    let fen = this.game.fen();
    console.log(fen);
    let fenArray = fen.split(' ');
    fenArray[1] = 'b';
    fenArray[3] = '-'; // Really don't get how this goes wonky and needs this 'fix'
    fen = fenArray.join(' ');
    this.game.load(fen);
    super.moveBlack();

    setTimeout(() => { this.zenoMoveWhite(); }, 500);
  }

  zenoMoveWhite () {

    this.dx /=2;
    this.dy /=2;

    this.piece.animate({
      top: `+=${this.dy}`,
      left: `+=${this.dx}`,
    },1000, () => {
      setTimeout(() => { this.moveBlack(); }, 500);
    });
  }
}
