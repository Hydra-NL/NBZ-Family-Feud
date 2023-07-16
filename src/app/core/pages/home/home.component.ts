import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/entities/team/team.model';
import { TeamPlayer } from 'src/app/entities/teamplayers/teamplayer.model';
import { TeamService } from 'src/app/entities/team/team.service';
import { TeamPlayerService } from 'src/app/entities/teamplayers/teamplayer.service';
import { Subscription } from 'rxjs';
import { ControlsService } from '../controls/controls.service';
import { Episode } from 'src/app/entities/episodes/episode.model';
import { EpisodeService } from 'src/app/entities/episodes/episode.service';

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
  activeEpisode: Episode | undefined;
  episode!: Episode;
  episodes!: Episode[];
  subscription!: Subscription;
  isChristmas = false;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private teamPlayerService: TeamPlayerService,
    private controlService: ControlsService,
    private episodeService: EpisodeService
  ) {

    if (new Date().getMonth() === 0 || new Date().getMonth() === 11) {
      this.isChristmas = true;
    } else {
      this.isChristmas = false;
    }
  }

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
    this.episode = {
      _id: '',
      episodeTitle: '',
      episodeNumber: 0,
      episodeAchievement: '',
      isActive: false,
    };
    this.getTeams();
    this.getPlayers();
    this.getEpisodes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async getTeams() {
    this.teams = [];
    this.subscription = (await this.teamService.list()).subscribe({
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

  async getPlayers() {
    this.teamplayers = [];
    this.subscription = (await this.teamPlayerService.list()).subscribe({
      next: (teamplayers) => {
        this.teamplayers = teamplayers!;
        console.log('Teamplayers: ' + this.teamplayers.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async getEpisodes() {
    this.episodes = [];
    this.subscription = (await this.episodeService.list()).subscribe({
      next: (episodes) => {
        this.episodes = episodes!;
        console.log('Episodes: ' + this.episodes.length);
        this.episodes.sort((a, b) => a.episodeNumber - b.episodeNumber);
        this.activeEpisode = this.episodes.find(
          (episode) => episode.isActive == true
        )!;
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

  selectEpisode(episodeToActivateId: string) {
    this.activeEpisode = new Episode('');
    this.episodeService.activateEpisode(episodeToActivateId).subscribe({
      next: () => {
        this.getEpisodes();
      },
    });
  }

  playTheme() {
    this.controlService.playTheme();
  }
}
