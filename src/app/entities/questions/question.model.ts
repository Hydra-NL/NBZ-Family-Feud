import { Entity } from 'src/app/core/entity/entity.model';

export enum QuestionSpeciality {
  None = 'None',
  Reverse = 'Reverse',
  AI = 'AI',
}

export class Question extends Entity {
  questionTitle: string = '';
  answer1: string = '';
  answer2: string = '';
  answer3: string = '';
  answer4: string = '';
  answer5: string = '';
  answer6: string = '';
  answer7: string = '';
  answer8: string = '';
  points1: number = 0;
  points2: number = 0;
  points3: number = 0;
  points4: number = 0;
  points5: number = 0;
  points6: number = 0;
  points7: number = 0;
  points8: number = 0;
  isSpecial: boolean = false;
  speciality: QuestionSpeciality = QuestionSpeciality.None;
  episode: number = 0;

  constructor(_id: string) {
    super(_id);
  }
}
