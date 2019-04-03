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

  playBlack();
});

let moves = 0;
function playBlack() {
  if (game.in_checkmate()) {
    console.log(`Checkmate in ${moves} moves.`);
    return;
  }

  moves++;

  let fen = game.fen();
  console.log(fen);
  let fenArray = fen.split(' ');
  fenArray[1] = 'b';
  fenArray[3] = '-'; // Really don't get how this goes wonky and needs this 'fix'
  fen = fenArray.join(' ');

  game.load(fen);

  let blackMove = getBlackMove();
  game.move(blackMove);
  board.position(game.fen(),true);

  setTimeout(() => {
    playBlack();
  },2000);
}

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

  let moves = game.moves({
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
  board.position(game.fen(),true);

  // Reset the move tracking
  from = null;
  to = null;

  setTimeout(() => {
    let blackMove = getBlackMove();
    game.move(blackMove);
    board.position(game.fen(),true);
  },500);
}

// Remove highlights from every square on the board
function clearHighlights() {
  $('.square-55d63').removeClass(`highlight1-32417`);
}

// Highlight the specified square
function highlight(square) {
  $('.square-'+square).addClass(`highlight1-32417`);
}

function getBlackMove() {
  positionCount = 0;
  let move = minimaxRoot(2,game,true)
  console.log(positionCount);
  return move;
}

function evaluateBoard (board) {
  let totalEvaluation = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
    }
  }
  return totalEvaluation;
}

function getPieceValue (piece, x, y) {
  if (piece === null) {
    return 0;
  }
  let absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
  return piece.color === 'w' ? absoluteValue : -absoluteValue;
};

function getAbsoluteValue (piece, isWhite, x ,y) {
  if (piece.type === 'p') {
    return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
  } else if (piece.type === 'r') {
    return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
  } else if (piece.type === 'n') {
    return 30 + knightEval[y][x];
  } else if (piece.type === 'b') {
    return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
  } else if (piece.type === 'q') {
    return 90 + evalQueen[y][x];
  } else if (piece.type === 'k') {
    return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
  }
  throw "Unknown piece type: " + piece.type;
}

function minimaxRoot (depth, game, isMaximisingPlayer) {
  var newGameMoves = game.moves();

  var bestMove = -9999;
  var bestMoveFound;

  for(var i = 0; i < newGameMoves.length; i++) {
    var newGameMove = newGameMoves[i]
    game.move(newGameMove);
    var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
    game.undo();
    if(value >= bestMove) {
      bestMove = value;
      bestMoveFound = newGameMove;
    }
  }
  return bestMoveFound;
};

let positionCount;
function minimax (depth, game, alpha, beta, isMaximisingPlayer) {
  positionCount++;
  if (depth === 0) {
    return -evaluateBoard(game.board());
  }

  var newGameMoves = game.moves();

  if (isMaximisingPlayer) {
    var bestMove = -9999;
    for (var i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
      game.undo();
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  } else {
    var bestMove = 9999;
    for (var i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
      game.undo();
      beta = Math.min(beta, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  }
};
