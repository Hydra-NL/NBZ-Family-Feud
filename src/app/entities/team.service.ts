import { Injectable } from '@angular/core';
import { Team1 } from './team1/team1.model';
import { Team2 } from './team2/team2.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  team1Array: Team1[] = [
    {
      id: 0,
      team1L: '',
      teamM2: '',
      teamM3: '',
      teamM4: '',
      teamM5: '',
    },
  ];
  team2Array: Team2[] = [
    {
      id: 0,
      team2L: '',
      team2M2: '',
      team2M3: '',
      team2M4: '',
      team2M5: '',
    },
  ];
  team1!: Team1;
  team2!: Team2;

  getTeam1() {
    return this.team1Array;
  }

  getTeam2() {
    return this.team2Array;
  }

  addTeam1(team1: Team1) {
    this.team1Array.push(team1);
  }

  addTeam2(team2: Team2) {
    this.team2Array.push(team2);
  }
}
