"use strict";

class Zeno extends BaseChess {

  constructor () {
    super (2);
    let date = new Date();
    $('#header').text(`Sisyphus vs. Archimedes, Unknown location, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)

  }

  moveWhite(from,to) {

    // Disable all future interaction for white
    $('.square-55d63').off('click');

    // Clear all highlights from the board
    this.clearHighlights();

    // Replace the original piece with a fake piece
    this.originalPiece = $(`.square-${from}`).find(`.piece-417db`);
    this.piece = $(`.square-${from}`).find(`.piece-417db`).clone(true).appendTo('body');
    $('body').append(this.piece);

    this.piece.css({
      position: 'absolute',
      top: this.originalPiece.offset().top,
      left: this.originalPiece.offset().left
    })
    this.piece.css({
      backgroundColor: 'red'
    })

    this.destination = $(`.square-${to}`);
    this.destination.css({
      backgroundColor: 'green'
    })
    this.destinationX = this.destination.offset().left;
    this.destinationY = this.destination.offset().top;

    // Remove the piece from the board representation (and the game)
    this.game.remove(from);
    this.board.position(this.game.fen());

    this.zenoMoveWhite();
  }

  zenoMoveBlack () {
    // Make it black's turn
    let fen = this.game.fen();
    let fenArray = fen.split(' ');
    fenArray[1] = 'b';
    fenArray[3] = '-'; // Really don't get how this goes wonky and needs this 'fix'
    fen = fenArray.join(' ');
    this.game.load(fen);

    this.moveBlack();
  }

  moveBlack() {
    this.moves++;
    let move = this.getBlackMove();
    this.lastMove = this.game.move(move);
    this.updatePGN(this.lastMove);
    this.board.position(this.game.fen(),true);

    setTimeout(() => { this.zenoMoveWhite(); }, 500);
  }

  zenoMoveWhite () {

    this.dx = (this.destinationX - this.piece.offset().left) /  2;
    this.dy = (this.destinationY - this.piece.offset().top) /  2;
    this.targetX = this.piece.offset().left + this.dx;
    this.targetY = this.piece.offset().top + this.dy;
    console.log(this.targetX,this.targetY);

    let move = {
      san: 'beep',
      color: 'w'
    };
    this.updatePGN(move);

    this.piece.animate({
      top: `${this.targetY}px`,
      left: `${this.targetX}px`,
    },1000, () => {
      console.log(`post animation: ${this.piece.offset().top}`)
      setTimeout(() => { this.zenoMoveBlack(); }, 500);
    });
  }
}
