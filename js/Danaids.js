"use strict";

class Danaids extends BaseChess {

  constructor () {
    super(3);
    // // Get each piece to remember where it originated
    // $(`.piece-417db`).each(function () {
    //   $(this).data('home-square',$(this).parent().attr('data-square'));
    // });
  }

  moveWhite(from,to) {
    // Make the move in the game representation
    let move = {
      from: from,
      to: to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    };
    this.lastMove = this.game.move(move);

    // Update the board based on the new position
    this.board.position(this.game.fen(),true);

    if (this.lastMove.captured != undefined) {
      let type = this.lastMove.captured;
      let piece = $(`.square-${to}`).find(`piece-417db`);
      let cols = "abcdefgh";
      let col = 0;
      let row = 0;
      let position = this.board.position();
      let respawnSquare = undefined;
      for (let row = 8; row >= 1; row--) {
        for (let col = 0; col < cols.length; col++) {
          let square = `${cols.charAt(col)}${row}`;
          console.log(square,position[square]);
          if (position[square] === undefined) {
            console.log("Using " + respawnSquare);
            respawnSquare = square;
            break;
          }
        }
        if (respawnSquare !== undefined) {
          break;
        }
      }
      // Once here we've found the square to respawn, so put it there
      position[respawnSquare] = `b${type.toUpperCase()}`;
      this.board.position(position,true);
      let boardFEN = this.board.fen().split(' ');
      let gameFEN = this.game.fen().split(' ');
      gameFEN[0] = boardFEN[0];
      gameFEN = gameFEN.join(' ');
      this.game.load(gameFEN);
    }

    // Clear all highlights from the board (a new turn is about to begin)
    this.clearHighlights();

    // Reset the move tracking
    this.from = null;

    setTimeout(() => {
      this.moveBlack();
    },500);
  }

}
