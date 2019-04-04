"use strict";

class Sisyphus extends BaseChess {

  constructor (board) {
    super (board);
  }

  moveWhite(from,to) {
    // Make the move in the game representation
    let move = this.game.move({
      from: from,
      to: to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // Clear all highlights from the board
    this.clearHighlights();

    // Update the board based on the new position
    this.board.position(this.game.fen(),true);

    // Reset the move tracking
    this.from = null;

    setTimeout(() => {
      this.game.undo();
      // Update the board based on the new position
      this.board.position(this.game.fen(),true);
    },500);
  }
}
