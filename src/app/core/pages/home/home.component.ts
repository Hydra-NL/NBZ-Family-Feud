import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/entities/team/team.model';
import { Player } from 'src/app/entities/players/player.model';
import { TeamService } from 'src/app/entities/team/team.service';
import { PlayerService } from 'src/app/entities/players/player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  players: Player[] | null = null;
  player!: Player;
  teams: Team[] | null = null;
  team!: Team;
  subscriptionPlayers!: Subscription;
  subscriptionTeams!: Subscription;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.player = {
      _id: '',
      name: '',
      team: '',
      isActive: false,
    };
    this.team = {
      _id: '',
      teamName: '',
      points: 0,
      strikes: 0,
    };

    this.subscriptionPlayers = this.playerService.list().subscribe({
      next: (players) => {
        this.players = players as Player[];
        console.log(players);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.subscriptionTeams = this.teamService.list().subscribe({
      next: (teams) => {
        this.teams = teams as Team[];
        console.log(this.teams);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptionPlayers.unsubscribe();
    this.subscriptionTeams.unsubscribe();
  }

  goToAdminPanel() {
    this.router.navigate(['/admin']);
  }

  goToQuiz() {
    this.playTheme();

    this.router.navigate(['/quiz']);
  }

  addPlayer(): void {
    this.subscriptionPlayers = this.playerService
      .create(this.player)
      .subscribe({
        error: (err) => {
          console.log(err);
        },
      });
  }

  addTeam(): void {
    this.teamService.addTeam(this.team);
  }

  switchTeam(player: Player) {
    this.playerService.updatePlayer(player);
  }

  playTheme() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/intro_theme.mp3';
    audio.load();
    audio.play();
  }
}
