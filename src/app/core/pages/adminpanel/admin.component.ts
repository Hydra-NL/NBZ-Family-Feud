import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/entities/questions/question.service';
import { Question } from 'src/app/entities/questions/question.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  questions!: Question[];
  question!: Question;

  constructor(
    private questionsService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questions = this.questionsService.getQuestions();
    console.log(this.questions);
  }

  goToAddQuestion() {
    this.router.navigate(['/admin/add']);
  }
  goToEditQuestion(id: string) {
    this.router.navigate([`/admin/update/${this.question._id}`]);
  }
  goToDeleteQuestion() {
    this.router.navigate(['/admin/delete']);
  }
}
