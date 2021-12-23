import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/entities/team.service';
import { QuestionService } from 'src/app/entities/question.service';
import { Team1 } from 'src/app/entities/team1/team1.model';
import { Team2 } from 'src/app/entities/team2/team2.model';
import { Question } from 'src/app/entities/questions/question.model';
import { delay } from 'rxjs';

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
  points1Given: boolean = false;
  points2Given: boolean = false;
  points3Given: boolean = false;
  points4Given: boolean = false;
  points5Given: boolean = false;
  points6Given: boolean = false;
  points7Given: boolean = false;
  points8Given: boolean = false;
  resultTeam1: boolean = false;
  resultTeam2: boolean = false;
  answersEnabled: boolean = true;
  win: boolean = false;
  tie: boolean = false;

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
    console.log(this.teamTurn);
  }

  nextQuestion() {
    this.clearStrikes();
    this.resetAnswers();
    if (this.teamTurn) {
      this.pointsTeam1 += this.roundPoints;
    } else {
      this.pointsTeam2 += this.roundPoints;
    }
    this.roundPoints = 0;
    if (this.round == 3 && this.questionNumber == 3) {
      if (this.pointsTeam1 > this.pointsTeam2) {
        this.winner('team1');
      }
      if (this.pointsTeam2 > this.pointsTeam1) {
        this.winner('team2');
      }
      if (this.pointsTeam1 == this.pointsTeam2) {
        this.winner('tie');
      }
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
    if (this.teamTurn && this.team2Strikes == 0) {
      if (this.team1Strikes < 3) {
        this.team1Strikes++;
        this.playStrike();
      } else if ((this.team1Strikes = 3)) {
        this.switchTurns();
      }
    }

    if (this.teamTurn && this.team2Strikes == 3) {
      this.team1Strikes++;
      this.playStrike();
      this.switchTurns();
    }

    if (!this.teamTurn && this.team1Strikes == 0) {
      if (this.team2Strikes < 3) {
        this.team2Strikes++;
        this.playStrike();
      } else if ((this.team2Strikes = 3)) {
        this.switchTurns();
      }
    }

    if (!this.teamTurn && this.team1Strikes == 3) {
      this.team2Strikes++;
      this.playStrike();
      this.switchTurns();
    }
  }

  clearStrikes() {
    this.team1Strikes = 0;
    this.team2Strikes = 0;
    console.log('clearStrikes() is called');
  }

  resetAnswers() {
    this.points1Given = false;
    this.points2Given = false;
    this.points3Given = false;
    this.points4Given = false;
    this.points5Given = false;
    this.points6Given = false;
    this.points7Given = false;
    this.points8Given = false;
    this.answersEnabled = true;
    console.log('resetAnswers() is called');
  }

  disableAnswers() {
    this.points1Given = true;
    this.points2Given = true;
    this.points3Given = true;
    this.points4Given = true;
    this.points5Given = true;
    this.points6Given = true;
    this.points7Given = true;
    this.points8Given = true;
    this.answersEnabled = false;
    console.log('disableAnswers() is called');
  }

  awardPointsRound(amount: number) {
    if (!this.points1Given && amount == this.question.points1) {
      amount *= this.round;
      this.roundPoints += amount;
      this.points1Given = true;
      this.playGoodAnsa();
    }
    if (!this.points2Given && amount == this.question.points2) {
      amount *= this.round;
      this.roundPoints += amount;
      this.points2Given = true;
      this.playGoodAnsa();
    }
    if (!this.points3Given && amount == this.question.points3) {
      amount *= this.round;
      this.roundPoints += amount;
      this.points3Given = true;
      this.playGoodAnsa();
    }
    if (!this.points4Given && amount == this.question.points4) {
      amount *= this.round;
      this.roundPoints += amount;
      this.points4Given = true;
      this.playGoodAnsa();
    }
    if (!this.points5Given && amount == this.question.points5) {
      amount *= this.round;
      this.roundPoints += amount;
      this.points5Given = true;
      this.playGoodAnsa();
    }
    if (!this.points6Given && amount == this.question.points6) {
      amount *= this.round;
      this.roundPoints += amount;
      this.points6Given = true;
      this.playGoodAnsa();
    }
    if (!this.points7Given && amount == this.question.points7) {
      amount *= this.round;
      this.roundPoints += amount;
      this.points7Given = true;
      this.playGoodAnsa();
    }
    if (!this.points8Given && amount == this.question.points8) {
      amount *= this.round;
      this.roundPoints += amount;
      this.points8Given = true;
      this.playGoodAnsa();
    }
  }

  switchTurns() {
    this.teamTurn = !this.teamTurn;
    console.log('switchTurns() is called: ' + this.teamTurn);
  }

  playStrike() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/StrikeSFX.mp3';
    audio.load();
    audio.play();
    console.log('playStrike() is called');
  }

  playGoodAnsa() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/good-answer.mp3';
    audio.load();
    audio.play();
  }

  playOutroTheme() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/outro_theme.mp3';
    audio.load();
    audio.play();
  }

  winner(winner: string) {
    if (winner == 'team1') {
      this.resultTeam1 = true;
      this.win = true;
      this.playOutroTheme();
      console.log('Team 1 won');
    }
    if (winner == 'team2') {
      this.resultTeam2 = true;
      this.win = true;
      this.playOutroTheme();
      console.log('Team 2 won');
    }
    if (winner == 'tie') {
      this.tie = true;
      this.playOutroTheme();
      console.log('Resulted in a tie');
    }
  }
}
