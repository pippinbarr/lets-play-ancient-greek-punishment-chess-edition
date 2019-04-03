"use strict";

/*****************

Let's Play: Ancient Greek Punishment: Chess Edition
Pippin Barr

******************/

let game;
let board;

let from = null;
let to = null;
let turn = 'w';

$(document).ready(function () {
  let config = {
    draggable: false,
    position: 'start',
  };
  board = ChessBoard('board', config);

  game = new Chess();

  $('.square-55d63').on('click',squareClicked);
});

function squareClicked() {
  let square = $(this).attr('data-square');

  console.log(square)

  let piece = $(this).find('.piece-417db');

  if (from === null && piece.length !== 0 && piece.attr('data-piece').indexOf(turn) !== -1) {
    from = square;

    var moves = game.moves({
      square: from,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
      highlight(moves[i].to);
    }
  }
  else if (from !== null) {
    if (piece.length !== 0 && piece.attr('data-piece').indexOf(turn) !== -1) {
      // Selecting a new piece to move
      clearHighlights();
      from = square;

      var moves = game.moves({
        square: from,
        verbose: true
      });

      // exit if there are no moves available for this square
      if (moves.length === 0) return;

      // highlight the possible squares for this piece
      for (var i = 0; i < moves.length; i++) {
        highlight(moves[i].to);
      }
    }
    else if ($(this).hasClass('highlight1-32417')) {

      let to = $(this).attr('data-square');

      let move = game.move({
        from: from,
        to: to,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
      });

      clearHighlights();

      board.position(game.fen(),false);

      from = null;
      to = null;

      turn = (turn === 'w') ? 'b' : 'w';
    };
  }
}

function clearHighlights() {
  $('.square-55d63').removeClass(`highlight1-32417`);
}

function highlight(square) {
  $('.square-'+square).addClass(`highlight1-32417`);
}
