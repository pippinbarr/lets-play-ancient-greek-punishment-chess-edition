"use strict";

class Prometheus extends BaseChess {

  constructor () {
    super (3);
  }

  setup (depth) {
    super.setup(depth);
    this.game.load('rnbqkbnr/pppppppp/8/8/8/8/8/4K3 w kq - 0 1');
    this.board.position(this.game.fen(),false);
    let date = new Date();

    if (this.gameNumber === undefined) this.gameNumber = 1;
    let winNote = '';
    if (this.gameNumber === 2) winNote = ` (Zeus leads by ${this.gameNumber - 1} game)`;
    else if (this.gameNumber > 2) winNote = ` (Zeus leads by ${this.gameNumber - 1} games)`;

    $('#header').html(`Prometheus vs. Zeus`)
    $('#sub-header').html(`Game #${this.gameNumber}${winNote}<br \>Hades, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)
  }

  moveWhite(from,to) {
    // Make the move in the game representation
    let move = {
      from: from,
      to: to,
      color: 'w',
      san: 'Ke1',
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    };

    $('.square-e1').find('img').effect({
      effect: 'shake',
      direction: 'left',
      distance: 5,
      times: 4,
      duration: '500',
      complete: () => {
        let fen = this.game.fen();
        let fenArray = fen.split(' ');
        fenArray[1] = 'b';
        fenArray[3] = '-'; // Really don't get how this goes wonky and needs this 'fix'
        fen = fenArray.join(' ');
        this.game.load(fen);

        this.updatePGN(move,'');

        // Clear all highlights from the board (a new turn is about to begin)
        this.clearHighlights();

        // Update the board based on the new position
        this.board.position(this.game.fen(),true);

        // Reset the move tracking
        this.from = null;

        setTimeout(() => {
          this.moveBlack();
        },500);
      }});;

      // move.to = move.from; // You can't move
      // this.lastMove = this.game.move(move);


    }

    moveBlack() {
      this.moves++;
      let move = this.getBlackMove();
      this.lastMove = this.game.move(move);
      if (this.game.in_check() || this.game.in_stalemate()) {
        let note = 'Zeus wins';
        this.lastMove.san = this.lastMove.san.replace('+','#');
        this.lastMove.san += ' 0-1';
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
      this.gameNumber++;
      this.setup(this.depth);
    }
  }
