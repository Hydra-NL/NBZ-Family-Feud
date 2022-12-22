import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Question,
  QuestionSpeciality,
} from 'src/app/entities/questions/question.model';
import { QuestionService } from 'src/app/entities/questions/question.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
})
export class AddQuestionComponent implements OnInit, OnDestroy {
  questions!: Question[];
  question!: Question;
  totalPoints!: number;
  subscription!: Subscription;

  constructor(private questionsService: QuestionService) {}

  ngOnInit(): void {
    this.clearQuestion();

    this.getQuestions();
    var list = document.getElementById('question-list');
    list!.classList.toggle('hidden');
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getQuestions() {
    this.subscription = this.questionsService.list().subscribe({
      next: (questions) => {
        this.questions = questions as Question[];
        console.log(questions);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearQuestion() {
    this.question = {
      _id: '',
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
      isSpecial: false,
      speciality: QuestionSpeciality.None,
      episode: 0,
    };
  }

  toggleList() {
    var list = document.getElementById('question-list');
    var button = document.getElementById('toggle');
    list!.classList.toggle('hidden');
    button!.style.content = '"Hide"';
  }

  addQuestion() {
    if (
      this.question.points1 +
        this.question.points2 +
        this.question.points3 +
        this.question.points4 +
        this.question.points5 +
        this.question.points6 +
        this.question.points7 +
        this.question.points8 >
      100
    ) {
      alert('Total points cannot exceed 100');
      return;
    } else if (
      this.question.points1 +
        this.question.points2 +
        this.question.points3 +
        this.question.points4 +
        this.question.points5 +
        this.question.points6 +
        this.question.points7 +
        this.question.points8 <
      100
    ) {
      alert('Total points cannot be less than 100');
      return;
    } else {
      this.questionsService.create(this.question).subscribe({
        next: () => {
          this.getQuestions();
          this.clearQuestion();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  delQuestion(id: string) {
    this.questionsService.delete(id).subscribe({
      next: () => {
        this.getQuestions();
      },
    });
  }
}
