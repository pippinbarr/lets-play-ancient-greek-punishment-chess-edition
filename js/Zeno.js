"use strict";

class Zeno extends BaseChess {

  constructor () {
    super (2);
  }

  setup(depth) {
    super.setup(depth);

    let date = new Date();
    if (this.gameNumber === undefined) this.gameNumber = 1;
    let winNote = '';
    if (this.gameNumber === 2) winNote = ` (Archimedes leads by ${this.gameNumber - 1} game)`;
    else if (this.gameNumber > 2) winNote = ` (Archimedes leads by ${this.gameNumber - 1} games)`;

    $('#header').html(`Zeno vs. Archimedes`)
    $('#sub-header').html(`Game #${this.gameNumber}${winNote}<br \>Unknown location, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)

    MathJax.Hub.Config({
      tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]},
      processSectionDelay: 0,
      messageStyle: "none"
    });
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

    // Set the css of our new piece image to be in the original piece's place
    this.piece.css({
      position: 'absolute',
      top: this.originalPiece.offset().top,
      left: this.originalPiece.offset().left
    });

    // Remember the destination square (in jquery)
    this.destination = $(`.square-${to}`);

    // Remember the location of the destinatino square in pixels
    this.destinationX = this.destination.offset().left;
    this.destinationY = this.destination.offset().top;

    this.startFile = from.charAt(0);
    this.startRank = parseInt(from.charAt(1));

    this.currentRank = this.startRank;

    this.destFile = to.charAt(0);
    this.destRank = parseInt(to.charAt(1));

    this.count = 1;

    // Remove the original from the board representation (and the game)
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
    if (this.game.in_check()) {
      let note = 'Archimedes wins';
      // Check in this mode means game over!
      this.lastMove.san = this.lastMove.san.replace('+','#');
      this.lastMove.san += ' 0-1';
      this.updatePGN(this.lastMove,note);
      this.board.position(this.game.fen(),true);
      setTimeout(() => {
        if (this.lastMove.captured !== undefined) {
          captureSFX.play();
        }
        else {
          placeSFX.play();
        }
      },this.config.moveSpeed * 1.1);
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
      this.zenoMoveWhite();
    },this.config.moveSpeed * 1.1);
  }

  zenoMoveWhite () {
    console.log(this.piece.attr('data-piece'));
    // Calculate the distance and the corresponding target
    this.dx = (this.destinationX - this.piece.offset().left) /  2;
    this.dy = (this.destinationY - this.piece.offset().top) /  2;
    this.targetX = this.piece.offset().left + this.dx;
    this.targetY = this.piece.offset().top + this.dy;
    console.log(this.targetX,this.targetY);

    let file;
    if (this.startFile === this.destFile) {
      file = this.startFile;
    }
    else if (this.startFile > this.destFile) {
      file = `$ \({${this.destFile} + {{${this.startFile} - ${this.destFile}} \\over {2^{${this.count}}}}\)}$`
    }
    else {
      file = `$ \({${this.destFile} - {{${this.destFile} - ${this.startFile}} \\over {2^{${this.count}}}}}\)$`
    }

    let rank = `$\(${this.destRank} - {1 \\over {2^{${this.count}}}}\)$`;

    let test = Math.pow(2,this.count);

    let type = this.piece.attr('data-piece')[1];
    if (type != 'P') {
      this.moveExpression = `${type}${file}${rank}`;
    }
    else {
      this.moveExpression = `${file}${rank}`;
    }

    let move = {
      san: `${this.moveExpression}`,
      color: 'w'
    };

    this.updatePGN(move,'');
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub,'pgn']);

    this.count++;

    this.piece.animate({
      top: `${this.targetY}px`,
      left: `${this.targetX}px`,
    },500, () => {
      attackSFX.play();
      setTimeout(() => {
        this.zenoMoveBlack(); },
        500);
    });

  }

  updatePGN(move,note) {
    let pgn = '';

    if (move.color === 'w') {
      pgn += `${this.turn}. `;
    }
    pgn += `${move.san} `;
    if (note !== '') {
      pgn += `(${note}) `;
    }
    if (move.color === 'b') {
      pgn += ` `;
      this.turn++;
    }

    let $newPGN = $(`<span>${pgn}</span>`);
    $newPGN.attr('id',`move${this.turn}${move.color}`);
    $newPGN.hide();
    $('#pgn').append($newPGN);

    MathJax.Hub.Typeset($newPGN.get(),() => {
      $newPGN.show();
      $('#pgn').scrollTop($('#pgn')[0].scrollHeight);
    });

  }

  resetGame() {
    $('#board').html('');
    this.piece.remove();
    this.gameNumber++;
    this.setup(this.depth);
  }
}
