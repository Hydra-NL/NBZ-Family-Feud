import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/entities/team.service';
import { QuestionService } from 'src/app/entities/question.service';
import { Team1 } from 'src/app/entities/team1/team1.model';
import { Team2 } from 'src/app/entities/team2/team2.model';
import { Question } from 'src/app/entities/questions/question.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
  team1!: Team1[];
  team2!: Team2[];
  team1Strikes: number = 0;
  team2Strikes: number = 0;
  pointsTeam1: number = 0;
  pointsTeam2: number = 0;
  roundPoints: number = 0;
  teamTurn: boolean = true;
  round: number = 1;
  questionNumber: number = 1;
  questionId: number = 0;
  questions!: Question[];
  question!: Question;
  check7!: string;
  endQuiz!: boolean;

  constructor(
    private teamService: TeamService,
    private questionsService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.team1 = this.teamService.getTeam1();
    console.log(this.team1);
    this.team2 = this.teamService.getTeam2();
    console.log(this.team2);
    this.question = this.questionsService.getQuestionByid(this.questionId);
    console.log(this.questions);
  }

  nextQuestion() {
    this.clearStrikes();
    if (this.teamTurn) {
      this.pointsTeam1 += this.roundPoints;
    } else {
      this.pointsTeam2 += this.roundPoints;
    }
    this.roundPoints = 0;
    if (this.round == 3 && this.questionNumber == 3) {
      this.home();
    }
    if (this.questionNumber < 3) {
      this.questionNumber++;
      this.questionId++;
      this.question = this.questionsService.getQuestionByid(this.questionId);
    } else if ((this.questionNumber = 3)) {
      this.round++;
      this.questionNumber = 1;
      this.questionId++;
      this.question = this.questionsService.getQuestionByid(this.questionId);
    }
  }

  addStrikeTeam() {
    if (this.teamTurn) {
      if (this.team1Strikes < 3) {
        this.team1Strikes++;
        this.playStrike();
      } else {
        this.clearStrikes();
      }
    }
    if (!this.teamTurn) {
      if (this.team2Strikes < 3) {
        this.team2Strikes++;
        this.playStrike();
      } else {
        this.clearStrikes();
      }
    }
  }

  clearStrikes() {
    this.team1Strikes = 0;
    this.team2Strikes = 0;
  }

  awardPointsRound(amount: number) {
    amount *= this.round;
    this.roundPoints += amount;
  }

  switchTurns() {
    this.teamTurn = !this.teamTurn;
  }

  playStrike() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/StrikeSFX.mp3';
    audio.load();
    audio.play();
  }

  playGoodAnsa() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/good-answer.mp3';
    audio.load();
    audio.play();
  }

  home() {
    this.router.navigate(['home']);
  }
}
