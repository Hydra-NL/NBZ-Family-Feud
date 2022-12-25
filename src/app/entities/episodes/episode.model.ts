import { Entity } from 'src/app/core/entity/entity.model';

export class Episode extends Entity {
  episodeTitle: string = '';
  episodeNumber: number = 0;
  episodeAchievement: string = '';
  isActive: boolean = false;

  constructor(_id: string) {
    super(_id);
  }
}
