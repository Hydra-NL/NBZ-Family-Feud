import { Injectable } from '@angular/core';
import { Player } from './player.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EntityService } from '../../core/entity/entity.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService extends EntityService<Player> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl, 'players');
  }
  players: Player[] = [
    {
      _id: '1',
      name: 'Player 1',
      team: 'Team 1',
      isActive: true,
    },
    {
      _id: '2',
      name: 'Player 2',
      team: 'Team 2',
      isActive: true,
    },
  ];

  getPlayers() {
    return this.players;
  }
  getPlayerById(id: string) {
    return this.players.find((player) => player._id === id);
  }
  addPlayer(player: Player) {
    let id = this.players.length + 1;
    player._id = id.toString();
    this.players.push(player);
  }
  updatePlayer(player: Player) {
    const index = this.players.findIndex((p) => p._id === player._id);
    this.players[index] = player;
  }
  deletePlayer(id: string) {
    const index = this.players.findIndex((p) => p._id === id);
    this.players.splice(index, 1);
  }
}
