"use strict";

class Sisyphus extends BaseChess {

  constructor () {
    super (0);
    let date = new Date();
    $('#header').html(`Sisyphus vs. Zeus<br \>Hades, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)
  }

  moveWhite(from,to) {
    // Make the move in the game representation
    let move = {
      from: from,
      to: to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    };
    this.lastMove = this.game.move(move);

    if (this.lastMove.color === 'w') {
      this.pgn += `${this.turn}. `;
    }
    this.pgn += `${this.lastMove.san} `;
    $('#pgn').html(this.pgn);


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
      $('#pgn').html(``);
      this.pgn = ``;
    },500);
  }
}
