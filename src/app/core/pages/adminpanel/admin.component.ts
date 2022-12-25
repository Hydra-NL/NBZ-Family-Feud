import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/entities/team/team.model';
import { TeamService } from 'src/app/entities/team/team.service';
import { TeamPlayer } from 'src/app/entities/teamplayers/teamplayer.model';
import { TeamPlayerService } from 'src/app/entities/teamplayers/teamplayer.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  team!: Team;
  teams!: Team[];
  players!: TeamPlayer[];
  subscription!: Subscription;

  constructor(
    private teamService: TeamService,
    private teamPlayerService: TeamPlayerService
  ) {}

  ngOnInit(): void {
    this.getTeams();
    this.getPlayers();
  }
  async getTeams() {
    this.subscription = (await this.teamService.list()).subscribe({
      next: (teams) => {
        this.teams = teams!;
        console.log('Teams: ' + this.teams.length);
      },
    });
  }

  async getPlayers() {
    this.players = [];
    this.subscription = (await this.teamPlayerService.list()).subscribe({
      next: (players) => {
        this.players = players!;
        console.log('Teamplayers: ' + this.players.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async delTeam(id: string) {
    console.log(id);
    let text = 'Are you sure you want to delete this team?';
    if (confirm(text) == true) {
      this.subscription = (await this.teamPlayerService.list()).subscribe({
        next: (players) => {
          this.players = players!;
          console.log('Teamplayers: ' + this.players.length);
          for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].playerTeam === id) {
              this.players[i].playerTeam = '';
              this.subscription = this.teamPlayerService
                .update(this.players[i])
                .subscribe({
                  error: (err) => {
                    console.log(err);
                  },
                });
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.subscription = this.teamService.delete(id).subscribe({
        next: () => {
          this.getTeams();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  async delPlayer(id: string) {
    console.log(id);
    let text = 'Are you sure you want to delete this player?';
    if (confirm(text) == true) {
      this.subscription = (await this.teamService.list()).subscribe({
        next: (teams) => {
          this.teams = teams!;
          console.log('Teams: ' + this.teams.length);
          for (let i = 0; i < this.teams.length; i++) {
            if (this.teams[i].teamMembers.includes(id)) {
              this.teams[i].teamMembers.splice(
                this.teams[i].teamMembers.indexOf(id),
                1
              );
              this.subscription = this.teamService
                .update(this.teams[i])
                .subscribe({
                  error: (err) => {
                    console.log(err);
                  },
                });
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.subscription = this.teamPlayerService.delete(id).subscribe({
        next: () => {
          this.getPlayers();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
