import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/core/entity/entity.service';
import { environment } from 'src/environments/environment';
import { TeamPlayer } from './teamplayer.model';

@Injectable({
  providedIn: 'root',
})
export class TeamPlayerService extends EntityService<TeamPlayer> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl, 'teamplayers');
  }
  teamplayers: TeamPlayer[] = [
    {
      id: 1,
      playerName: 'Player 1',
      teamId: 1,
      theirTurn: false,
    },
    {
      id: 2,
      playerName: 'Player 2',
      teamId: 2,
      theirTurn: false,
    },
  ];
  getTeamplayers() {
    return this.teamplayers;
  }
  getTeamplayerById(id: number) {
    return this.teamplayers.find((teamplayers) => teamplayers.id === id);
  }
  createTeamPlayer(teamPlayer: TeamPlayer) {
    let id = this.teamplayers.length + 1;
    teamPlayer.id = id;
    this.teamplayers.push(teamPlayer);
  }
  deleteTeamplayer(id: number) {
    const index = this.teamplayers.findIndex((t) => t.id === id);
    this.teamplayers.splice(index, 1);
  }
}
