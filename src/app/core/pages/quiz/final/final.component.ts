import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Episode } from 'src/app/entities/episodes/episode.model';
import { EpisodeService } from 'src/app/entities/episodes/episode.service';
import { Team } from 'src/app/entities/team/team.model';
import { TeamService } from 'src/app/entities/team/team.service';
import { TeamPlayer } from 'src/app/entities/teamplayers/teamplayer.model';
import { TeamPlayerService } from 'src/app/entities/teamplayers/teamplayer.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
})
export class FinalComponent implements OnInit, OnDestroy {
  teams: Team[] = [];
  winningTeam: Team | undefined;
  team1: Team | undefined;
  team2: Team | undefined;
  teamPlayers: TeamPlayer[] = [];
  isDraw: boolean = false;
  episodes: Episode[] = [];
  activeEpisode: Episode | undefined;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private teamPlayerService: TeamPlayerService,
    private episodeService: EpisodeService
  ) {}

  ngOnInit() {
    this.getEpisodes();
    this.getTeams();
  }

  async ngOnDestroy() {
    (await this.teamService.list()).subscribe((teams) => {
      for (let i = 0; i < teams!.length; i++) {
        if (teams![i].isPlaying) {
          teams![i].isPlaying = false;
          this.teamService.update(teams![i]).subscribe();
        }
      }
    });
  }

  async getTeams() {
    this.teams = [];
    console.log('getTeams');
    (await this.teamService.list()).subscribe((teams) => {
      for (let i = 0; i < teams!.length; i++) {
        if (teams![i].isPlaying) {
          this.teams.push(teams![i]);
        }
      }
      if (this.teams.length != 2) {
        alert('You are not allowed to be here!');
        this.router.navigate(['/']);
      } else {
        this.team1 = this.teams[0];
        this.team2 = this.teams[1];
        console.log('team1: ' + this.team1.points);
        console.log('team2: ' + this.team2.points);
        if (this.team1.points > this.team2.points) {
          this.winningTeam = this.team1;
          console.log('team1 wins');
          this.getTeamplayers();
        } else if (this.team1.points < this.team2.points) {
          this.winningTeam = this.team2;
          console.log('team2 wins');
          console.log('winningTeam: ' + this.winningTeam.teamName);
          this.getTeamplayers();
        } else {
          // draw
          this.isDraw = true;
          console.log('draw');
        }
      }
    });
  }

  async getTeamplayers() {
    this.teamPlayers = [];
    console.log('getTeamplayers');
    (await this.teamPlayerService.list()).subscribe((teamPlayers) => {
      for (let i = 0; i < teamPlayers!.length; i++) {
        if (teamPlayers![i].playerTeam == this.winningTeam?._id) {
          this.teamPlayers.push(teamPlayers![i]);
          teamPlayers![i].achievements.push(
            this.activeEpisode?.episodeAchievement!
          );
          this.teamPlayerService.update(teamPlayers![i]).subscribe();
        }
      }
      console.log('teamPlayers: ' + this.teamPlayers);
    });
  }

  async getEpisodes() {
    this.episodes = [];
    (await this.episodeService.list()).subscribe({
      next: (episodes) => {
        this.episodes = episodes!;
        console.log('Episodes: ' + this.episodes.length);
        this.activeEpisode = this.episodes.find(
          (episode) => episode.isActive == true
        )!;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
