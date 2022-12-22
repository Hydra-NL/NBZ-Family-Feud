import { Entity } from 'src/app/core/entity/entity.model';

export class TeamPlayer extends Entity {
  playerName: string = '';
  playerTeam: string = '';
  isAnswering: boolean = false;
  achievements: string[] = [];
  constructor(_id: string) {
    super(_id);
  }
}
