"use strict";

/*****************

Let's Play: Ancient Greek Punishment: Chess Edition
Pippin Barr

******************/

// The sound effects
let placeSFX = new Howl({
  src: ['assets/sounds/place.wav']
});
let captureSFX = new Howl({
  src: ['assets/sounds/capture.wav']
});

let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

$(document).ready(function () {

  $('.menu_button').on('click',menuButtonClicked);

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

    case 'chess':
    chess = new BaseChess(2);
    break;
  }

  if (!chess) {
    console.log("Error! Menu click broke!");
  }

  $('#menu').hide();
  $('#game').show();
}
