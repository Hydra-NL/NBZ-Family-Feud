import { Entity } from 'src/app/core/entity/entity.model';

export class TeamPlayer extends Entity {
  playerName: string = '';
  teamId: number = 0;
  theirTurn: boolean = false;
  constructor(id: number) {
    super(id);
  }
}
