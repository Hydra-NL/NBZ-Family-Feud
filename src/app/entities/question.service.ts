import { Injectable } from '@angular/core';
import { Question } from './questions/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  questions: Question[] = [
    {
      id: 0,
      answer1: 'Apple',
      answer2: 'Pear',
      answer3: 'Orange',
      answer4: 'Banana',
      answer5: 'Mango',
      answer6: 'Pineapple',
      answer7: 'Fruit',
      answer8: 'Fruit2',
      points1: 30,
      points2: 25,
      points3: 10,
      points4: 9,
      points5: 8,
      points6: 7,
      points7: 6,
      points8: 5,
    },
    {
      id: 1,
      answer1: 'Joe',
      answer2: 'Bernard',
      answer3: 'Howard',
      answer4: 'Candice',
      answer5: 'Mango',
      answer6: 'Pineapple',
      answer7: 'Fruit',
      answer8: 'Fruuuuuit',
      points1: 28,
      points2: 25,
      points3: 10,
      points4: 9,
      points5: 8,
      points6: 7,
      points7: 6,
      points8: 5,
    },
    {
      id: 2,
      answer1: 'oaiuhwjdaw',
      answer2: 'Bernard',
      answer3: 'Howard',
      answer4: 'Candice',
      answer5: 'Mango',
      answer6: 'Pineapple',
      answer7: 'Fruit',
      answer8: 'Fruuuuuit',
      points1: 29,
      points2: 25,
      points3: 10,
      points4: 9,
      points5: 8,
      points6: 7,
      points7: 6,
      points8: 5,
    },
    {
      id: 3,
      answer1: 'zawada',
      answer2: 'Bernard',
      answer3: 'Howard',
      answer4: 'Candice',
      answer5: 'Mango',
      answer6: 'Pineapple',
      answer7: 'Fruit',
      answer8: 'Fruuuuuit',
      points1: 30,
      points2: 25,
      points3: 10,
      points4: 9,
      points5: 8,
      points6: 7,
      points7: 6,
      points8: 5,
    },
  ];

  getQuestions() {
    return this.questions;
  }

  getQuestionByid(id: number): Question {
    return this.questions.filter((question) => question.id === id)[0];
  }
}
