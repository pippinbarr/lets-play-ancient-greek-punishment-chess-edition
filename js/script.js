"use strict";

/*****************

Let's Play: Ancient Greek Punishment: Chess Edition
Pippin Barr

******************/

// The chessboard
let board;

$(document).ready(function () {
  // Create our default game
  let chess = new Prometheus();

  // Listen for clicks on the squares of the chessboard
  $('.square-55d63').on('click', function (event) {
    chess.squareClicked(event);
  });
});
