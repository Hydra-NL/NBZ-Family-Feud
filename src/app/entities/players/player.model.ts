import { Entity } from 'src/app/core/entity/entity.model';

export class Player extends Entity {
  name: string = '';
  team: string = '';
  isActive: boolean = false;
  constructor(_id: string) {
    super(_id);
  }
}
