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
  let GameClass;

  switch(level) {
    case 'sisyphus':
    GameClass = Sisyphus;
    break;

    case 'prometheus':
    GameClass = Prometheus;
    break;

    case 'tantalus':
    GameClass = Tantalus;
    break;

    case 'zeno':
    GameClass = Zeno;
    break;

    case 'danaids':
    GameClass = Danaids;
    break;

    case 'chess':
    GameClass = BaseChess;
    break;
  }

  $('#menu').fadeOut(1000,() => {
    $(`#${level}-interstitial`).fadeIn(1000,() => {
      setTimeout(() => {
        $(`#${level}-interstitial`).fadeOut(1000,() => {
          chess = new GameClass();
          $('#game').fadeIn(500);
        });
      },3000);
    })
  });
}
