"use strict";

/*****************

Let's Play: Ancient Greek Punishment: Chess Edition
Pippin Barr

******************/

// The representation of our chess game
let game;
// The chessboard
let board;

// Tracking interactions to know the squares of movement
let from = null;
let to = null;

$(document).ready(function () {
  // Create our chessboard
  let config = {
    draggable: false,
    position: 'start',
  };
  board = ChessBoard('board', config);

  // Create our game representation
  game = new Chess();

  // Listen for clicks on the squares of the chessboard
  $('.square-55d63').on('click',squareClicked);
});

// Called when a square is clicked
function squareClicked() {
  // Find out the notation of the square and also the element representing the piece
  let square = $(this).attr('data-square');
  let piece = $(this).find('.piece-417db');
  let validPiece = piece.length !== 0 && piece.attr('data-piece').indexOf(game.turn()) !== -1;

  if (from === null && validPiece) {
    // We haven't selected a move yet + a piece of the correct colour was selected
    highlightMoves(square);
  }
  else if (from !== null) {
    // We have already selected a square to move from (and thus a piece)
    if (validPiece) {
      // But now we're selecting another valid piece to move, so we should rehilight
      highlightMoves(square);
    }
    else if ($(this).hasClass('highlight1-32417')) {
      let to = $(this).attr('data-square');
      makeMove(to);
    };
  }
}

// Highlights the moves available to the piece on the given square
// and sets it up as the current 'from'
function highlightMoves(square) {
  clearHighlights();

  from = square;

  var moves = game.moves({
    square: from,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  moves.forEach(function (move) {
    highlight(move.to);
  });

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    highlight(moves[i].to);
  }
}

function makeMove(to) {
  // Otherwise we're only interested if we select a highlighted square (a valid move)

  // Make the move in the game representation
  let move = game.move({
    from: from,
    to: to,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // Clear all highlights from the board (a new turn is about to begin)
  clearHighlights();

  // Update the board based on the new position
  board.position(game.fen(),false);

  // Reset the move tracking
  from = null;
  to = null;
}

// Remove highlights from every square on the board
function clearHighlights() {
  $('.square-55d63').removeClass(`highlight1-32417`);
}

// Highlight the specified square
function highlight(square) {
  $('.square-'+square).addClass(`highlight1-32417`);
}
