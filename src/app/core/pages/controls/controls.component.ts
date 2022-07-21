import { Component } from '@angular/core';
import { ControlsService } from './controls.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
})
export class ControlsComponent {
  constructor(private controlsService: ControlsService) {

  }

  playTheme() {
    this.controlsService.playTheme();
  }

  playBahBow() {
    this.controlsService.playBahBow();
  }

  playFunny() {
    this.controlsService.playFunny();
  }

  playGoodAnswer() {
    this.controlsService.playGoodAnswer();
  }

  playStrike() {
    this.controlsService.playStrike();
  }

  playBadum() {
    this.controlsService.playBadum();
  }

  playApplause() {
    this.controlsService.playApplause();
  }

  playLaughtrack() {
    this.controlsService.playLaughtrack();
  }
  
  playCricket() {
    this.controlsService.playCricket();
  }

  playTrombone() {
    this.controlsService.playTrombone();
  }

  playGoofy() {
    this.controlsService.playGoofy();
  }
}
