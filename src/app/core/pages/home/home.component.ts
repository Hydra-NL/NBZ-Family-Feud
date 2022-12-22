import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/entities/team/team.model';
import { TeamPlayer } from 'src/app/entities/teamplayers/teamplayer.model';
import { TeamService } from 'src/app/entities/team/team.service';
import { TeamPlayerService } from 'src/app/entities/teamplayers/teamplayer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  title!: string;
  teams!: Team[];
  team!: Team;
  team1!: Team;
  team2!: Team;
  teamplayers!: TeamPlayer[];
  teamplayer!: TeamPlayer;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private teamPlayerService: TeamPlayerService
  ) {}

  ngOnInit(): void {
    this.title =
      'NBZ Family Feud episode 3: Winter edition, Christmas special LIVE in person, for the second time, snow edition';

    this.team = {
      teamName: '',
      points: 0,
      strikes: 0,
      teamMembers: [],
      isPlaying: false,
      _id: '',
    };
    this.teamplayer = {
      _id: '',
      playerName: '',
      playerTeam: '',
      isAnswering: false,
      achievements: [''],
    };

    this.getTeams();
    this.getPlayers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getTeams() {
    this.teams = [];
    this.subscription = this.teamService.list().subscribe({
      next: (teams) => {
        this.teams = teams!;
        console.log('Teams: ' + this.teams.length);
        console.log(this.teams);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPlayers() {
    this.teamplayers = [];
    this.subscription = this.teamPlayerService.list().subscribe({
      next: (teamplayers) => {
        this.teamplayers = teamplayers!;
        console.log('Teamplayers: ' + this.teamplayers.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToQuiz(teamId1: Team, teamId2: Team) {
    console.log('TeamId1: ' + teamId1);
    console.log('TeamId2: ' + teamId2);
    if (teamId1 == teamId2) {
      alert('You cannot play against yourself!');
      return;
    } else {
      teamId1.isPlaying = true;
      teamId2.isPlaying = true;
      this.teamService.update(teamId1).subscribe({
        next: () => {
          this.teamService.update(teamId2).subscribe({
            next: () => {
              this.router.navigate(['/quiz']);
              this.playTheme();
            },
          });
        },
      });
    }
  }

  joinTeam(playerId: string, teamId: string) {
    console.log('TeamId: ' + teamId);
    console.log('PlayerId: ' + playerId);
    console.log(this.teams);
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].teamMembers.includes(playerId)) {
        if (this.teams[i]._id == teamId) {
          alert('You are already in this team!');
          return;
        }
        if (
          confirm(`Are you sure you want to leave ${this.teams[i].teamName}?`)
        ) {
          this.teamService.leaveTeam(playerId, this.teams[i]._id!).subscribe({
            next: () => {
              this.teamService.joinTeam(playerId, teamId).subscribe({
                next: () => {
                  this.getTeams();
                  this.getPlayers();
                },
              });
            },
          });
        }
      } else {
        this.teamService.joinTeam(playerId, teamId).subscribe({
          next: () => {
            this.getTeams();
            this.getPlayers();
          },
        });
      }
    }
  }

  leaveTeam(playerId: string, teamId: string) {
    console.log('TeamId: ' + teamId);
    console.log('PlayerId: ' + playerId);

    if (confirm('Are you sure you want to kick this player?')) {
      this.teamService.leaveTeam(playerId, teamId).subscribe({
        next: (team) => {
          this.team = team;
          console.log('Teamplayer: ' + this.teamplayer);
          this.getTeams();
          this.getPlayers();
        },
      });
    }
  }

  playTheme() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/intro_theme.mp3';
    audio.load();
    audio.play();
  }
}
