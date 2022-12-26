import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamPlayer } from 'src/app/entities/teamplayers/teamplayer.model';
import { TeamPlayerService } from 'src/app/entities/teamplayers/teamplayer.service';

@Component({
  selector: 'app-halloffame',
  templateUrl: './halloffame.component.html',
})
export class HalloffameComponent implements OnInit {
  players!: TeamPlayer[];
  title: string = 'Hall of Fame';
  subscription!: Subscription;

  constructor(private teamPlayerService: TeamPlayerService) {}

  async ngOnInit() {
    this.players = [];
    this.subscription = (await this.teamPlayerService.list()).subscribe({
      next: (teamplayers) => {
        if (teamplayers) {
          for (let i = 0; i < teamplayers.length; i++) {
            if (teamplayers[i].achievements.length > 0) {
              this.players.push(teamplayers[i]);
            }
          }
          this.players.sort((a, b) => {
            if (a.achievements.length < b.achievements.length) {
              return 1;
            }
            if (a.achievements.length > b.achievements.length) {
              return -1;
            }
            return 0;
          });
          setTimeout(() => {
            this.setPlayerColors();
          }, 10);
        }
      },
    });
  }

  setPlayerColors() {
    console.log('setPlayerColors');
    var player1 = document.getElementById('hff-player-0');
    var player2 = document.getElementById('hff-player-1');
    var player3 = document.getElementById('hff-player-2');

    console.log(player1);

    player1?.classList.add('hff-first');
    player2?.classList.add('hff-second');
    player3?.classList.add('hff-third');

    console.log(player1);
  }
}
