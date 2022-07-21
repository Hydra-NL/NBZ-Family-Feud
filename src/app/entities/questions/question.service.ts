import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EntityService } from '../../core/entity/entity.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService extends EntityService<Question> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl, 'questions');
  }

  questions: Question[] = [
    {
      id: 1,
      questionTitle: 'is this an example?',
      answer1: '1',
      answer2: '2',
      answer3: '3',
      answer4: '4',
      answer5: '5',
      answer6: '5',
      answer7: '6',
      answer8: '7',
      points1: 10,
      points2: 10,
      points3: 10,
      points4: 10,
      points5: 10,
      points6: 10,
      points7: 10,
      points8: 1,
      totalPoints: 122,
    },
  ];

  getQuestions() {
    return this.questions;
  }

  getQuestionById(id: number) {
    return this.questions.find((question) => question.id === id);
  }

  addQuestion(question: Question) {
    this.questions.push(question);
  }

  updateQuestion(question: Question) {
    const index = this.questions.findIndex((q) => q.id === question.id);
    this.questions[index] = question;
  }

  deleteQuestion(id: number) {
    const index = this.questions.findIndex((q) => q.id === id);
    this.questions.splice(index, 1);
  }
}
