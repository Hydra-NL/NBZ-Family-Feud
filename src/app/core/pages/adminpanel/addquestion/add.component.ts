import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/entities/questions/question.service';
import { Question } from 'src/app/entities/questions/question.model';

@Component({
  selector: 'app-admin-add',
  templateUrl: './add.component.html',
})
export class AddComponent {}
