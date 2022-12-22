import { Entity } from 'src/app/core/entity/entity.model';

export class Team extends Entity {
  teamName: string = '';
  teamMembers: string[] = [];
  points: number = 0;
  strikes: number = 0;
  isPlaying: boolean = false;

  constructor(_id: string) {
    super(_id);
  }
}
