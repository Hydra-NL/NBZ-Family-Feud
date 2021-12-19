export class Team1 {
  id: number = 0;
  team1L: string = '';
  teamM2: string = '';
  teamM3: string = '';
  teamM4: string = '';
  teamM5: string = '';

  constructor(team1L = '', teamM2 = '', teamM3 = '', teamM4 = '', teamM5 = '') {
    this.team1L = team1L;
    this.teamM2 = teamM2;
    this.teamM3 = teamM3;
    this.teamM4 = teamM4;
    this.teamM5 = teamM5;
  }
}
