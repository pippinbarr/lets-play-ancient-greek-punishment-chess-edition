"use strict";

class Danaids extends BaseChess {

  constructor () {
    super(3);
    let date = new Date();
    $('#header').html(`Danaids vs. Zeus<br \>Hades, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)

    // Here is a position with mate in one for white
    // this.game = new Chess('rnbqkbnr/ppppp2p/8/5pp1/8/5Q2/PPPPPPPP/RNB1KBNR w KQkq - 0 1');
    // this.board.position(this.game.fen());
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
    let square = this.placeInFirstEmpty({type: this.lastMove.captured, color: this.game.BLACK});
    let note = `${type.toUpperCase()}→${square}`;
    return note;
  }

  handleCheckmate() {
    let square = this.placeInFirstEmpty({type: this.game.KING, color: this.game.BLACK});
    let note = `K->${square}`;
    return note;
  }

  placeInFirstEmpty(piece) {
    let cols = "abcdefgh";
    let position = this.board.position();

    if (piece.type === this.game.KING) {
      // Find the king first and remove it from the board
      for (let row = 8; row >= 1; row--) {
        for (let col = 0; col < cols.length; col++) {
          let square = `${cols.charAt(col)}${row}`;
          if (position[square] === 'bK') {
            this.game.remove(square);
          }
        }
      }
    }

    // Now find a position with our piece places that doesn't yield check...
    for (let row = 8; row >= 1; row--) {
      for (let col = 0; col < cols.length; col++) {
        // Get the square notation
        let square = `${cols.charAt(col)}${row}`;
        // If there's already a piece on it, it's not a candidate
        if (position[square] !== undefined) continue;
        // Place our piece in this square in the game representation
        let placed = this.game.put(piece,square);
        // If it was successfully place and it doesn't lead to a check
        if (placed && !(this.game.in_check() && piece.type === this.game.KING)) {
          // Then update the board with this new position
          this.board.position(this.game.fen());
          // And return the square we used for the note
          return square;
        }
        else {
          // Otherwise, we weren't able to place the piece at this square, so on we go
          this.game.remove(square);
        }
      }
    }
    console.log("IT WOULD BE BAD TO SEE THIS!");
    return undefined;
  }

}
