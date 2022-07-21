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
  teams: Team[] | null = null;
  team!: Team;
  team1!: Team;
  team2!: Team;
  teamplayers: TeamPlayer[] = [];
  teamplayer!: TeamPlayer;
  subscriptionTeams!: Subscription;
  subscriptionTeamplayers!: Subscription;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private teamPlayerService: TeamPlayerService
  ) {}

  ngOnInit(): void {
    this.team = {
      id: 0,
      teamName: '',
      points: 0,
      strikes: 0,
      isPlaying: false,
    };
    this.teamplayer = {
      playerName: '',
      teamId: 0,
      theirTurn: false,
      id: 0,
    };

    this.subscriptionTeams = this.teamService.list().subscribe({
      next: (teams) => {
        this.teams = teams as Team[];
        console.log('Teams: ' + this.teams.length);
        if (this.teams.length >= 2) {
          this.team1 = this.teams[0];
          this.team2 = this.teams[1];
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.subscriptionTeamplayers = this.teamPlayerService.list().subscribe({
      next: (teamplayers) => {
        this.teamplayers = teamplayers as TeamPlayer[];
        console.log('Teamplayers: ' + this.teamplayers.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptionTeamplayers.unsubscribe();
    this.subscriptionTeams.unsubscribe();
  }

  goToQuiz() {
    this.playTheme();
    this.router.navigate(['/quiz']);
  }

  addPlayer(): void {
    if (this.teams != null) {
      this.subscriptionTeamplayers = this.teamPlayerService
        .create(this.teamplayer)
        .subscribe({
          error: (err) => {
            console.log(err);
          },
        });
      this.reloadPage();
    }
  }

  delPlayer(id: number) {
    console.log(id);
    this.subscriptionTeamplayers = this.teamPlayerService.delete(id).subscribe({
      error: (err) => {
        console.log(err);
      },
    });
    this.reloadPage();
  }

  addTeam(): void {
    this.subscriptionTeams = this.teamService.create(this.team).subscribe({
      error: (err) => {
        console.log(err);
      },
    });
    this.reloadPage();
  }

  delTeam(id: number) {
    console.log(id);
    this.subscriptionTeams = this.teamService.delete(id).subscribe({
      error: (err) => {
        console.log(err);
      },
    });
    this.reloadPage();
  }

  // setAsPlaying(team: Team) {
  //   this.subscriptionTeams = this.teamService.update(team).subscribe({
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  //   this.reloadPage();
  // }

  playTheme() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/intro_theme.mp3';
    audio.load();
    audio.play();
  }

  reloadPage() {
    window.location.reload();
  }
}
