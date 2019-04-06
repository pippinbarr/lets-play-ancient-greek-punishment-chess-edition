"use strict";

/*****************

Let's Play: Ancient Greek Punishment: Chess Edition
Pippin Barr

******************/

// The sound effects
let placeSFX = new Audio('assets/sounds/place.wav');
let captureSFX = new Audio('assets/sounds/capture.wav');
let slideSFX = new Audio('assets/sounds/slide.wav');

$(document).ready(function () {

  $('.menu_button').on('click',menuButtonClicked);
  // Create our default game
  let chess = new Tantalus();
});


function menuButtonClicked() {
  let level = $(this).attr('id');
  let chess;
  switch(level) {
    case 'sisyphus':
    chess = new Sisyphus();
    break;

    case 'prometheus':
    chess = new Prometheus();
    break;

    case 'tantalus':
    chess = new Tantalus();
    break;

    case 'zeno':
    chess = new Zeno();
    break;

    case 'danaids':
    chess = new Danaids();
    break;

    default:
    chess = false;
    break;
  }

  if (!chess) {
    console.log("Error! Menu click broke!");
  }

  $('#menu').hide();
  $('#board').show();

  // Listen for clicks on the squares of the chessboard
  $('.square-55d63').on('click', function (event) {
    chess.squareClicked(event);
  });
}
