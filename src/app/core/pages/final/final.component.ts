import { Component, OnInit } from '@angular/core';
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
export class FinalComponent implements OnInit {
  teams!: Team[];
  team!: Team;
  team1!: Team;
  team2!: Team;
  teamPlayers!: TeamPlayer[];
  isDraw = false;
  subscription!: Subscription;
  constructor(
    private router: Router,
    private teamService: TeamService,
    private teamPlayerService: TeamPlayerService
  ) {}

  async ngOnInit() {
    this.team1 = {
      teamName: '',
      points: 0,
      strikes: 0,
      teamMembers: [],
      isPlaying: false,
      _id: '',
    };
    this.team2 = {
      teamName: '',
      points: 0,
      strikes: 0,
      teamMembers: [],
      isPlaying: false,
      _id: '',
    };
    this.teamPlayers = [];

    this.subscription = (await this.teamService.list()).subscribe({
      next: (teams) => {
        this.teams = teams!;
        for (let i = 0; i < teams!.length; i++) {
          if (teams![i].isPlaying) {
            this.teams.push(teams![i]);
          }
        }
        this.team1 = this.teams[0];
        this.team2 = this.teams[1];
        if (this.team1.points > this.team2.points) {
          this.team = this.team1;
        } else if (this.team1.points < this.team2.points) {
          this.team = this.team2;
        } else {
          this.isDraw = true;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.subscription = (await this.teamPlayerService.list()).subscribe({
      next: (teamplayers) => {
        this.teamPlayers = teamplayers as TeamPlayer[];
        console.log('Teamplayers: ' + this.teamPlayers.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
