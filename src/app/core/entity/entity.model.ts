export abstract class Entity {
  id!: number | undefined;

  constructor(values: any) {
    this.id = values ? values.id : undefined;
  }
}
