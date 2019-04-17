"use strict";

class Prometheus extends BaseChess {

  constructor () {
    super (3);
  }

  setup (depth) {
    this.liver = 100;
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
    this.disableInput();
    // Make the move in the game representation
    let move = {
      from: from,
      to: to,
      color: 'w',
      san: 'Ke1',
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    };

    attackSFX.play();
    $('.square-e1').find('img').effect({
      effect: 'shake',
      direction: 'left',
      distance: 5,
      times: 4,
      duration: '500',
      complete: () => {
        this.changeTurnTo('b');

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

      if (this.checkMove != undefined) {
        // Game is already in check so we peck
        let peckMove = {
          from: this.checkMove.to,
          to: 'e1'
        };
        this.game.move(peckMove);
        this.board.position(this.game.fen(),true);
        setTimeout(() => {
          this.liver -= 10;
          if (this.liver === 0) {
            captureSFX.play();
            this.updatePGN({color: 'b', san: `${this.checkMove.piece.toUpperCase()}xe1# 0-1`},'Zeus wins');
            setTimeout(() => { this.resetGame() },RESET_TIME);
          }
          else {
            attackSFX.play();
            this.game.undo();
            this.board.position(this.game.fen(),true);
            this.updatePGN({color: 'b', san: `${this.checkMove.piece.toUpperCase()}+e1`},'Peck');
            setTimeout(() => {
              placeSFX.play();
              this.changeTurnTo('w');
              this.enableInput();
            },this.config.moveSpeed * 1.1);
          }
        },this.config.moveSpeed * 1.1);
      }
      else {
        // Game not in check, so make a move (which may lead to check)
        let move = this.getBlackMove();
        this.lastMove = this.game.move(move);
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
        if (this.game.in_check()) {
          this.checkMove = this.lastMove;
        }
      }

    }

    resetGame() {
      $('#board').html('');
      this.gameNumber++;
      this.setup(this.depth);
    }
  }
