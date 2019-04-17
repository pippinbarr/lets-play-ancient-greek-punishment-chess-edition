"use strict";

/*****************

Let's Play: Ancient Greek Punishment: Chess Edition
Pippin Barr

******************/

// The sound effects
const placeSFX = new Howl({
  src: ['assets/sounds/place.wav','assets/sounds/place.mp3']
});
const captureSFX = new Howl({
  src: ['assets/sounds/capture.wav','assets/sounds/capture.mp3']
});
const attackSFX = new Howl({
  src: ['assets/sounds/attack.wav','assets/sounds/attack.mp3']
});
const fallSFX = new Howl({
  src: ['assets/sounds/fall.wav','assets/sounds/fall.mp3']
});

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const FADE_TIME =  500;
const RESET_TIME = 5000;

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
          $('#game').fadeIn(FADE_TIME);
        });
      },getTextTime($(`#${level}-interstitial .quote`).text()));
    })
  });
}

function getTextTime(text) {
  let time = (text.length * 65);
  return time;
}
