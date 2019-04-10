"use strict";

class Danaids extends BaseChess {

  constructor () {
    super(1);
    let date = new Date();
    $('#header').text(`Danaids vs. Zeus, Hades, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)

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

    let note = '';

    console.log(note);

    if (this.lastMove.captured != undefined) {
      note += this.handleCapture();
    }

    // Need to handle checkmate separately since the last move could have been a capture
    // that yielded checkmate!
    if (this.game.in_checkmate()) {
      note += this.handleCheckmate();
    }

    this.updatePGN(this.lastMove,note);


    // Clear all highlights from the board (a new turn is about to begin)
    this.clearHighlights();

    // Reset the move tracking
    this.from = null;

    setTimeout(() => {
      this.moveBlack();
    },500);
  }

  handleCapture() {
    let type = this.lastMove.captured;
    console.log(this.lastMove);
    let square = this.placeInFirstEmpty({type: this.lastMove.captured, color: 'b'});
    let note = `${type.toUpperCase()}→${square}`;
    return note;
  }

  handleCheckmate() {
    let square = this.placeInFirstEmpty({type: 'k', color: 'b'});
    let note = `K->${square}`;
    return note;
  }

  placeInFirstEmpty(piece) {
    let cols = "abcdefgh";
    let position = this.board.position();
    console.log(position);
    for (let row = 8; row >= 1; row--) {
      for (let col = 0; col < cols.length; col++) {
        let square = `${cols.charAt(col)}${row}`;
        if (position[square] !== undefined) continue;
        let placed = this.game.put(piece,square);
        if (placed && !this.game.in_checkmate()) {
          this.board.position(this.game.fen());
          return square;
        }
        else {
          this.game.remove(square);
        }
      }
    }
    console.log("IT WOULD BE BAD TO SEE THIS!");
    return undefined;
  }

}
