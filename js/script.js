"use strict";

/*****************

Let's Play: Ancient Greek Punishment: Chess Edition
Pippin Barr

******************/

// The sound effects
const placeSFX = new Howl({
  src: ['assets/sounds/place.wav']
});
const captureSFX = new Howl({
  src: ['assets/sounds/capture.wav']
});

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const FADE_TIME =  500;
const QUOTE_TIME = 3000;

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

  $('#menu').fadeOut(FADE_TIME,() => {
    $(`#${level}-interstitial`).fadeIn(FADE_TIME,() => {
      setTimeout(() => {
        $(`#${level}-interstitial`).fadeOut(FADE_TIME,() => {
          chess = new GameClass();
          $('#game').fadeIn(500);
        });
      },QUOTE_TIME);
    })
  });
}
