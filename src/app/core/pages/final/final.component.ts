import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/entities/team/team.model';
import { TeamService } from 'src/app/entities/team/team.service';
import { TeamPlayer } from 'src/app/entities/teamplayers/teamplayer.model';
import { TeamPlayerService } from 'src/app/entities/teamplayers/teamplayer.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
})
export class FinalComponent implements OnInit, OnDestroy {
  teams!: Team[];
  team!: Team;
  teamplayers!: TeamPlayer[];
  constructor(
    private router: Router,
    private teamService: TeamService,
    private teamPlayerService: TeamPlayerService
  ) {}

  ngOnInit(): void {
    const winnerId = this.router.url.split('/')[3];
    console.log('winnerId: ' + winnerId);
    if (winnerId === 'draw') {
    } else {
      this.teamService.list().subscribe({
        next: (teams) => {
          this.teams = teams as Team[];
          console.log('Teams: ' + this.teams.length);
          for (let i = 0; i < this.teams.length; i++) {
            if (this.teams[i].id === +winnerId) {
              this.teams[i] = this.team;
              console.log('Team: ' + this.team.teamName);
            }
          }
        },
      });

      this.teamPlayerService.list().subscribe({
        next: (teamplayers) => {
          this.teamplayers = teamplayers as TeamPlayer[];
          console.log('Teamplayers: ' + this.teamplayers.length);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  ngOnDestroy(): void {}
}
