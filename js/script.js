"use strict";

/*****************

Let's Play: Ancient Greek Punishment: Chess Edition
Pippin Barr

******************/

// The chessboard
let board;

$(document).ready(function () {
  // Create our chessboard
  let config = {
    draggable: false,
    position: 'start',
  };
  board = ChessBoard('board', config);

  // Create our default game
  let chess = new BaseChess(board);

  // Listen for clicks on the squares of the chessboard
  $('.square-55d63').on('click', function (event) {
    chess.squareClicked(event);
  });
});
