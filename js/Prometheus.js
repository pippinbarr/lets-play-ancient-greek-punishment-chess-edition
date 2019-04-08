"use strict";

class Prometheus extends BaseChess {

  constructor () {
    super (3);
    this.game.load('rnbqkbnr/pppppppp/8/8/8/8/8/4K3 w KQkq - 0 1');
    this.board.position(this.game.fen(),false);

    let date = new Date();
    $('#header').text(`Prometheus vs. Zeus, Hades, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)
  }
}
