import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ControlsService {
  isChristmas = false;

  constructor() {
    if (new Date().getMonth() === 0 || new Date().getMonth() === 11) {
      this.isChristmas = true;
    } else {
      this.isChristmas = false;
    }
  }

  playTheme() {
    let audio = new Audio();
    if (this.isChristmas) {
      audio.src = '../../../../assets/sounds/intro_theme_christmas.mp3';
    } else {
      audio.src = '../../../../assets/sounds/intro_theme.mp3';
    }
    audio.load();
    audio.play();
  }

  playOutro() {
    let audio = new Audio();
    if (this.isChristmas) {
      audio.src = '../../../../assets/sounds/outro_theme_christmas.mp3';
    } else {
      audio.src = '../../../../assets/sounds/outro_theme.mp3';
    }
    audio.load();
    audio.play();
  }

  playBahBow() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/BahBow.mp3';
    audio.load();
    audio.play();
  }

  playFunny() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/funny.mp3';
    audio.load();
    audio.play();
  }

  playGoodAnswer() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/good-answer.mp3';
    audio.load();
    audio.play();
  }

  playStrike() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/StrikeSFX.mp3';
    audio.load();
    audio.play();
  }

  playBadum() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/Badum.mp3';
    audio.load();
    audio.play();
  }

  playApplause() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/Applause.mp3';
    audio.load();
    audio.play();
  }

  playLaughtrack() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/Laughtrack.mp3';
    audio.load();
    audio.play();
  }

  playCricket() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/cricket.mp3';
    audio.load();
    audio.play();
  }

  playTrombone() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/trombone.mp3';
    audio.load();
    audio.play();
  }

  playGoofy() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/goofy.mp3';
    audio.load();
    audio.play();
  }
  playTimerDing() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/timer_ding.mp3';
    audio.load();
    audio.play();
  }
  playTimerTick() {
    let audio = new Audio('../../../../assets/sounds/timer.mp3');
    audio.load();
    audio.play();
  }
  playOoh() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/ooh.mp3';
    audio.load();
    audio.play();
  }
  playPipes() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/pipes.mp3';
    audio.load();
    audio.play();
  }
  playShadow() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/shadow.mp3';
    audio.load();
    audio.play();
  }
}
