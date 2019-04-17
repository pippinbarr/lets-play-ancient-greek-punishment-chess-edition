"use strict";

class Danaids extends BaseChess {

  constructor () {
    super(1);
  }

  setup (depth) {
    super.setup(depth);

    this.currentPlaces = [];
    let squareSize = $('.square-55d63').width();

    // Go through the spare pieces list and add them to the page
    for (let i = 0; i < pieces.length; i++) {
      let $piece = $(`<img src="assets/images/chesspieces/wikipedia/w${pieces[i]}.png" alt="" class="piece-417db" data-piece="w${pieces[i]}" style="width: ${squareSize}px; height: ${squareSize}px;">`)
      $piece.on('click',() => { this.sparePieceClicked($piece) });
      $('.chessboard-63f37').append($piece);
    }

    let date = new Date();

    $('#header').html(`Danaids vs. Zeus`)
    $('#sub-header').html(`Game #1<br \>Hades, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)
    // $('#pgn').hide();
    $('#pgn').text('Set up the board before beginning play.');
    $('#pgn').height('50px');


    this.whitePieces = [];
    $('.piece-417db').each((index,piece) => {
      let $piece = $(piece);
      if ($piece.parent().hasClass('square-55d63')) {
        if ($piece.attr('data-piece').indexOf('w') !== -1) {
          $piece.square = $piece.parent().attr('data-square');
          this.whitePieces.push($piece);
        }
      }
    });

    this.originalPiecesNumber = 16;
    setTimeout(() => {
      this.whitePieces.forEach(($piece) => {
        setTimeout(() => {
          $piece.css({
            position: 'relative',
            zIndex: 1000
          });
          fallSFX.play();
          $piece.animate({
            top: $(document).height()
          },1000,() => {
            // this.board.remove($piece.square);
            $piece.remove();
          });
        },FADE_TIME + Math.random() * 1000);
        this.originalPiecesNumber--;
      });
    },FADE_TIME);


  }

  squareClicked () {

  }

  sparePieceClicked ($piece) {
    if (this.originalPiecesNumber !== 0) return;

    // Clear all highlights since we'll want to only highlight valid squares
    this.clearHighlights();
    $(`.piece-417db`).removeClass(`highlight1-32417`);
    // Highlight the piece itself
    $piece.addClass(`highlight1-32417`)
    attackSFX.play();
    // Get the type of this piece
    let type = $piece.attr('data-piece')[1];
    // Get the list of places this piece could potentially go (not all will be valid)
    let places = placements[type];
    this.currentPlaces = places;
    // Go through each possible placement
    for (let j = 0; j < places.length; j++) {
      // Check if there's already a placed piece
      if (!places[j].placed) {
        // If not, we can place it there!
        this.highlight(places[j].square);
        // Now we want to listen for a click on that square to place the piece
        $(`.square-${places[j].square}`).on('click',() => { this.onSquareClicked(places, $piece, j) });
      }
    }
  }

  onSquareClicked (places, $piece, j) {
    // Check if there's already a placed piece
    if (!places[j].placed) {
      // We're placing the piece so...
      // Clear the highlight on the square
      this.clearHighlight($(`.square-${places[j].square}`));
      // this.clearHighlights();
      // Disable clicking on all squares
      // $(`.square-55d63`).off('click');
      $((`.square-${places[j].square}`)).off('click');
      // Unhighlight the current piece type
      // $piece.removeClass(`highlight1-32417`);
      // Clone the piece we're placing
      let $newPiece = $piece.clone();
      // Remove the highlight from the piece (it's highlighted from being selected as a spare piece)
      this.clearHighlight($newPiece);
      // Add the piece to the square
      $newPiece.appendTo(`.square-${places[j].square}`);
      placeSFX.play();

      // Set that square to placed
      places[j].placed = true;
      // Make the piece fall after a delay
      setTimeout(() => {
        places[j].placed = false;
        for (let k = 0; k < this.currentPlaces.length; k++) {
          if (this.currentPlaces[k].square === places[j].square) {
            $(`.square-${places[j].square}`).addClass(`highlight1-32417`);
            $(`.square-${places[j].square}`).on('click',() => { this.onSquareClicked(places, $piece, j) });
          }
        }
        $newPiece.css({
          position: 'relative',
          zIndex: 1000
        });
        fallSFX.play();
        $newPiece.animate({
          top: $(document).height()
        },1000,() => {
          $newPiece.remove();
        });
      },2000 + Math.random() * 5000);

    }


  }
}


let pieces = ['P','N','B','R','Q','K'];
let placements = {
  P: [
    {square:'a2',placed:false},
    {square:'b2',placed:false},
    {square:'c2',placed:false},
    {square:'d2',placed:false},
    {square:'e2',placed:false},
    {square:'f2',placed:false},
    {square:'g2',placed:false},
    {square:'h2',placed:false},
  ],
  N: [
    {square:'b1',placed:false},
    {square:'g1',placed:false},
  ],
  B: [
    {square:'c1',placed:false},
    {square:'f1',placed:false},
  ],
  R: [
    {square:'a1',placed:false},
    {square:'h1',placed:false},
  ],
  Q: [
    {square:'d1',placed:false},
  ],
  K: [
    {square:'e1',placed:false},
  ],
};
