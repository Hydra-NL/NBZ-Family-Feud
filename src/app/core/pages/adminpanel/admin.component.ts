import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/entities/questions/question.service';
import { Question } from 'src/app/entities/questions/question.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit, OnDestroy {
  questions!: Question[];
  question!: Question;
  subscriptionQuestions!: Subscription;

  constructor(
    private questionsService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.question = {
      id: 0,
      questionTitle: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
      answer7: '',
      answer8: '',
      points1: 0,
      points2: 0,
      points3: 0,
      points4: 0,
      points5: 0,
      points6: 0,
      points7: 0,
      points8: 0,
      totalPoints: 0,
    };
    this.subscriptionQuestions = this.questionsService.list().subscribe({
      next: (questions) => {
        this.questions = questions as Question[];
        console.log(questions);
      },
      error: (err) => {
        console.log(err);
      },
    });
    var list = document.getElementById('question-list');
    list!.classList.toggle('hidden');
  }
  ngOnDestroy(): void {
    this.subscriptionQuestions.unsubscribe();
  }
  
  toggleList() {
    var list = document.getElementById('question-list');
    var button = document.getElementById('toggle');
    list!.classList.toggle('hidden');
    button!.style.content = '"Hide"';
  }

  addQuestion() {
    this.question.totalPoints =
      this.question.points1 +
      this.question.points2 +
      this.question.points3 +
      this.question.points4 +
      this.question.points5 +
      this.question.points6 +
      this.question.points7 +
      this.question.points8;
    this.questionsService.create(this.question).subscribe({
      error: (err) => {
        console.log(err);
      },
    });
    location.reload();
  }

  delQuestion(id: number) {
    this.questionsService.delete(id).subscribe({
      next: (question) => {
        this.question = question as Question;
        console.log(question);
      },
    });
    location.reload();
  }
}
