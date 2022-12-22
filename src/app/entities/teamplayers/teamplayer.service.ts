import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/core/entity/entity.service';
import { environment } from 'src/environments/environment';
import { TeamPlayer } from './teamplayer.model';

@Injectable({
  providedIn: 'root',
})
export class TeamPlayerService extends EntityService<TeamPlayer> {
  constructor(protected override http: HttpClient) {
    super(http, environment.apiUrl, 'player');
  }
  teamplayers: TeamPlayer[] = [
    {
      _id: '1',
      playerName: 'Player 1',
      playerTeam: '1',
      isAnswering: false,
      achievements: [''],
    },
    {
      _id: '2',
      playerName: 'Player 2',
      playerTeam: '2',
      isAnswering: false,
      achievements: [''],
    },
  ];
  getTeamplayers() {
    return this.teamplayers;
  }
  getTeamplayerById(id: string) {
    return this.teamplayers.find((teamplayers) => teamplayers._id === id);
  }
  createTeamPlayer(teamPlayer: TeamPlayer) {
    this.teamplayers.push(teamPlayer);
  }
  deleteTeamplayer(id: string) {
    const index = this.teamplayers.findIndex((t) => t._id === id);
    this.teamplayers.splice(index, 1);
  }
}
