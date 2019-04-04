"use strict";

class BaseChess {

  constructor (depth) {
    let config = {
      draggable: false,
      position: 'start',
    };
    this.board = ChessBoard('board', config);
    this.game = new Chess();
    this.from = null;
    this.moves = 0;
    this.depth = depth;
    this.positionsExamined = 0;
  }


  moveBlack() {
    this.moves++;
    let move = this.getBlackMove();
    this.game.move(move);
    this.board.position(this.game.fen(),true);
  }

  squareClicked(event) {
    // Find out the notation of the square and also the element representing the piece
    let square = $(event.currentTarget).attr('data-square');
    let piece = $(event.currentTarget).find('.piece-417db');
    let validPiece = (piece.length !== 0 && piece.attr('data-piece').indexOf(this.game.turn()) !== -1);

    if (this.from === null && validPiece) {
      // We haven't selected a move yet + a piece of the correct colour was selected
      this.highlightMoves(square);
    }
    else if (this.from !== null) {
      // We have already selected a square to move from (and thus a piece)
      if (validPiece) {
        // But now we're selecting another valid piece to move, so we should rehilight
        this.highlightMoves(square);
      }
      else if ($(event.currentTarget).hasClass('highlight1-32417')) {
        let to = $(event.currentTarget).attr('data-square');
        this.moveWhite(this.from,to);
      };
    }
  }

  // Highlights the moves available to the piece on the given square
  // and sets it up as the current 'from'
  highlightMoves(square) {
    this.clearHighlights();

    this.from = square;

    let moves = this.game.moves({
      square: this.from,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    moves.forEach((move) => {
      this.highlight(move.to);
    });
  }

  moveWhite(from,to) {
    // Make the move in the game representation
    let move = this.game.move({
      from: from,
      to: to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // Clear all highlights from the board (a new turn is about to begin)
    this.clearHighlights();

    // Update the board based on the new position
    this.board.position(this.game.fen(),true);

    // Reset the move tracking
    this.from = null;

    setTimeout(() => {
      this.moveBlack();
    },500);
  }

  // Remove highlights from every square on the board
  clearHighlights() {
    $('.square-55d63').removeClass(`highlight1-32417`);
  }

  // Highlight the specified square
  highlight(square) {
    $('.square-'+square).addClass(`highlight1-32417`);
  }

  getBlackMove() {
    this.positionsExamined = 0;
    let move = this.minimaxRoot(this.depth,this.game,true)
    console.log(`Examined ${this.positionsExamined} positions.`);
    return move;
  }

  evaluateBoard (board) {
    let totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        totalEvaluation = totalEvaluation + this.getPieceValue(board[i][j], i ,j);
      }
    }
    return totalEvaluation;
  }

  getPieceValue (piece, x, y) {
    if (piece === null) {
      return 0;
    }
    let absoluteValue = this.getAbsoluteValue(piece, piece.color === 'w', x ,y);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
  }

  getAbsoluteValue (piece, isWhite, x ,y) {
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

  minimaxRoot (depth, game, isMaximisingPlayer) {
    var newGameMoves = game.moves();

    var bestMove = -9999;
    var bestMoveFound;

    for(var i = 0; i < newGameMoves.length; i++) {
      var newGameMove = newGameMoves[i]
      game.move(newGameMove);
      var value = this.minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
      game.undo();
      if(value >= bestMove) {
        bestMove = value;
        bestMoveFound = newGameMove;
      }
    }
    return bestMoveFound;
  }

  minimax (depth, game, alpha, beta, isMaximisingPlayer) {
    this.positionsExamined++;

    if (depth === 0) {
      return -this.evaluateBoard(game.board());
    }

    var newGameMoves = game.moves();

    if (isMaximisingPlayer) {
      var bestMove = -9999;
      for (var i = 0; i < newGameMoves.length; i++) {
        game.move(newGameMoves[i]);
        bestMove = Math.max(bestMove, this.minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
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
        bestMove = Math.min(bestMove, this.minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
        game.undo();
        beta = Math.min(beta, bestMove);
        if (beta <= alpha) {
          return bestMove;
        }
      }
      return bestMove;
    }
  }

}
