import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ControlsService {
  playTheme() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/intro_theme.mp3';
    audio.load();
    audio.play();
  }

  playOutro() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/outro_theme.mp3';
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
  playTimer() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/Timer.mp3';
    audio.load();
    audio.play();
  }
}
