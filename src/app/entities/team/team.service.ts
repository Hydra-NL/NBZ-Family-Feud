import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/core/entity/entity.service';
import { environment } from 'src/environments/environment';
import { Team } from './team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService extends EntityService<Team> {
  constructor(protected override http: HttpClient) {
    super(http, environment.apiUrl, 'team');
  }
  teams: Team[] = [
    {
      _id: '1',
      teamName: 'Team 1',
      teamMembers: ['Player 1', 'Player 2'],
      points: 0,
      strikes: 0,
      isPlaying: false,
    },
    {
      _id: '2',
      teamName: 'Team 2',
      teamMembers: ['Player 3', 'Player 4'],
      points: 0,
      strikes: 0,
      isPlaying: false,
    },
  ];
  getTeams() {
    return this.teams;
  }
  getTeamById(id: string) {
    return this.teams.find((team) => team._id === id);
  }
  addTeam(team: Team) {
    this.teams.push(team);
  }
  updateTeam(team: Team) {
    const index = this.teams.findIndex((t) => t._id === team._id);
    this.teams[index] = team;
  }
  deleteTeam(id: string) {
    const index = this.teams.findIndex((t) => t._id === id);
    this.teams.splice(index, 1);
  }
}
