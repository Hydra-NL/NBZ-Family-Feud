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
            return b.achievements.length - a.achievements.length;
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

    player1?.classList.add('hff-gold');
    player2?.classList.add('hff-silver');
    player3?.classList.add('hff-bronze');
  }
}
