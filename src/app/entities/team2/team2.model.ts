export class Team2 {
  id: number = 0;
  team2L: string = '';
  team2M2: string = '';
  team2M3: string = '';
  team2M4: string = '';
  team2M5: string = '';

  constructor(
    team2L = '',
    team2M2 = '',
    team2M3 = '',
    team2M4 = '',
    team2M5 = ''
  ) {
    this.team2L = team2L;
    this.team2M2 = team2M2;
    this.team2M3 = team2M3;
    this.team2M4 = team2M4;
    this.team2M5 = team2M5;
  }
}
