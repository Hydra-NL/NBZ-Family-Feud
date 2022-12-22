import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ControlsService } from '../controls/controls.service';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/entities/team/team.service';
import { QuestionService } from 'src/app/entities/questions/question.service';
import { TeamPlayerService } from 'src/app/entities/teamplayers/teamplayer.service';
import { Team } from 'src/app/entities/team/team.model';
import { Question } from 'src/app/entities/questions/question.model';
import { TeamPlayer } from 'src/app/entities/teamplayers/teamplayer.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
  teams: Team[] | null = null;
  team!: Team;
  team1!: Team;
  team2!: Team;
  question!: Question;
  questions: Question[] | null = null;
  count: number = 1;
  teamPlayers: TeamPlayer[] | null = null;
  roundPoints: number = 0;
  team1Turn: boolean = false;
  team2Turn: boolean = false;
  pointsEnabled: boolean = true;
  showTemplate = false;
  currentTemplate!: TemplateRef<any>;
  @ViewChild('quiz') quizTemplate!: TemplateRef<any>;
  @ViewChild('winner') winnerTemplate!: TemplateRef<any>;
  timeRemaining: number = 30;
  timerActive: boolean = false;

  constructor(
    private controlsService: ControlsService,
    private router: Router,
    private teamService: TeamService,
    private questionService: QuestionService,
    private teamPlayerService: TeamPlayerService
  ) {}

  ngOnInit(): void {
    console.log(this.showTemplate);
    this.teamService.list().subscribe({
      next: (teams) => {
        this.teams = teams as Team[];
        this.team1 = this.teams[0];
        this.team2 = this.teams[1];
      },
    });
    this.questionService.list().subscribe({
      next: (questions) => {
        this.questions = questions as Question[];
      },
    });
    this.teamPlayerService.list().subscribe({
      next: (teamPlayers) => {
        this.teamPlayers = teamPlayers as TeamPlayer[];
        this.currentTemplate = this.quizTemplate;
      },
    });
  }

  giveStrike() {
    var team1Selected = document.getElementById('team-box-1');
    var team2Selected = document.getElementById('team-box-2');
    var team1Points = document.getElementById('team-points-1');
    var team2Points = document.getElementById('team-points-2');
    var bigStrike = document.getElementById('big-strike');
    if (this.team1Turn === true && this.team1.strikes < 3) {
      this.team1.strikes += 1;
      bigStrike!.style.visibility = 'visible';
      setTimeout(() => {
        bigStrike!.style.visibility = 'hidden';
      }, 500);

      if (this.team2.strikes === 3 && this.team1.strikes === 1) {
        this.team2Turn = true;
        this.team1Turn = false;
        team1Selected!.style.borderColor = '#cccccc';
        team2Selected!.style.borderColor = '#00ff00';
        team1Points!.style.borderColor = '#cccccc';
        team2Points!.style.borderColor = '#00ff00';
        this.disablePoints();
      } else if (this.team1.strikes === 3) {
        this.team2Turn = true;
        this.team1Turn = false;
        team1Selected!.style.borderColor = '#cccccc';
        team2Selected!.style.borderColor = '#00ff00';
        team1Points!.style.borderColor = '#cccccc';
        team2Points!.style.borderColor = '#00ff00';
      }
      this.controlsService.playStrike();
    } else if (this.team2Turn === true && this.team2.strikes < 3) {
      this.team2.strikes += 1;
      bigStrike!.style.visibility = 'visible';
      setTimeout(() => {
        bigStrike!.style.visibility = 'hidden';
      }, 500);
      if (this.team1.strikes === 3 && this.team2.strikes === 1) {
        this.team1Turn = true;
        this.team2Turn = false;
        team2Selected!.style.borderColor = '#cccccc';
        team1Selected!.style.borderColor = '#00ff00';
        team2Points!.style.borderColor = '#cccccc';
        team1Points!.style.borderColor = '#00ff00';
        this.disablePoints();
      } else if (this.team2.strikes === 3) {
        this.team1Turn = true;
        this.team2Turn = false;
        team1Selected!.style.borderColor = '#00ff00';
        team2Selected!.style.borderColor = '#cccccc';
        team1Points!.style.borderColor = '#00ff00';
        team2Points!.style.borderColor = '#cccccc';
      }
      this.controlsService.playStrike();
    }
  }

  nextQuestion() {
    if (this.count === 19) {
      var double = document.getElementById('double-points');
      double!.style.visibility = 'visible';
    }
    if (this.team1Turn === true) {
      this.team1.points += this.roundPoints;
      this.team1.strikes = 0;
      this.teamService.update(this.team1).subscribe({
        next: (team) => {
          this.team1 = team as Team;
        },
      });
    } else if (this.team2Turn === true) {
      this.team2.points += this.roundPoints;
      this.team2.strikes = 0;
      this.teamService.update(this.team2).subscribe({
        next: (team) => {
          this.team2 = team as Team;
        },
      });
    }
    if (this.count < this.questions!.length) {
      this.count++;
      this.pointsEnabled = true;
      this.roundPoints = 0;
      this.team1Turn = false;
      this.team2Turn = false;
      this.team1.strikes = 0;
      this.team2.strikes = 0;
      var team1Selected = document.getElementById('team-box-1');
      var team2Selected = document.getElementById('team-box-2');
      var team1Points = document.getElementById('team-points-1');
      var team2Points = document.getElementById('team-points-2');
      var button = document.getElementById('show-title-button');
      var selectTeam = document.getElementById('select-teams');
      var lock = document.getElementById('lock-points');
      var timer = document.getElementById('timer');
      lock!.style.visibility = 'hidden';
      button!.style.visibility = 'visible';
      team1Selected!.style.borderColor = '#cccccc';
      team2Selected!.style.borderColor = '#cccccc';
      team1Points!.style.borderColor = '#cccccc';
      team2Points!.style.borderColor = '#cccccc';
      selectTeam!.style.visibility = 'visible';
      timer!.style.visibility = 'hidden';
    } else {
      this.toggleWinner();
      this.controlsService.playOutro();
    }
  }

  disablePoints() {
    var lock = document.getElementById('lock-points');
    lock!.style.visibility = 'visible';
    this.pointsEnabled = false;
  }

  toggleTitle() {
    var button = document.getElementById('show-title-button');
    var title = document.getElementById('question-title');

    title!.style.visibility = 'visible';
    button!.style.visibility = 'hidden';
  }

  toggleAnswer(number: Number) {
    var answer = document.getElementById(`answer-` + number);
    var points = document.getElementById(`points-` + number);
    var button = document.getElementById(`btn-answer-` + number);

    answer!.style.visibility = 'visible';
    points!.style.visibility = 'visible';
    button!.style.visibility = 'hidden';

    if (this.pointsEnabled === true) {
      if (this.count < 20) {
        this.roundPoints += parseInt(points!.innerHTML);
      } else if (this.count < 30) {
        this.roundPoints += parseInt(points!.innerHTML) * 2;
      }

      if (this.team1.strikes === 3 && this.team2Turn) {
        this.controlsService.playGoodAnswer();
        setTimeout(() => {
          this.controlsService.playApplause();
        }, 700);
        this.disablePoints();
      } else if (this.team2.strikes === 3 && this.team1Turn) {
        this.controlsService.playGoodAnswer();
        setTimeout(() => {
          this.controlsService.playApplause();
        }, 700);
        this.disablePoints();
      } else {
        this.controlsService.playGoodAnswer();
        setTimeout(() => {
          this.controlsService.playApplause();
        }, 700);
      }
    }
  }

  selectTeam(team: Team) {
    var team1Selected = document.getElementById('team-box-1');
    var team2Selected = document.getElementById('team-box-2');
    var team1Points = document.getElementById('team-points-1');
    var team2Points = document.getElementById('team-points-2');
    var selectedTeam = document.getElementById('select-teams');
    selectedTeam!.style.visibility = 'hidden';
    if (team._id === this.team1._id) {
      team1Selected!.style.borderColor = '#00ff00';
      team1Points!.style.borderColor = '#00ff00';
      this.team1Turn = true;
    } else {
      team2Selected!.style.borderColor = '#00ff00';
      team2Points!.style.borderColor = '#00ff00';
      this.team2Turn = true;
    }
  }

  toggleTimer() {
    if (this.team1Turn === true || this.team2Turn === true) {
      if (this.timerActive === false) {
        this.timerActive = true;
        this.timeRemaining = 30;
        this.controlsService.playTimerTick();
        if (this.timeRemaining > 0) {
          var timer = document.getElementById('timer');
          timer!.style.visibility = 'visible';
          const intervalId = setInterval(() => {
            this.timeRemaining -= 1;

            if (this.timeRemaining < 1) {
              clearInterval(intervalId);
              this.controlsService.playTimerDing();
              this.timerActive = false;
            }
          }, 1000);
        }
      }
    }
  }

  toggleWinner() {
    this.showTemplate = !this.showTemplate;
    this.currentTemplate = this.winnerTemplate;
  }

  // Sounds
  playTheme() {
    this.controlsService.playTheme();
  }
  playBahBow() {
    this.controlsService.playBahBow();
  }
  playFunny() {
    this.controlsService.playFunny();
  }
  playStrike() {
    this.controlsService.playStrike();
  }
  playBadum() {
    this.controlsService.playBadum();
  }
  playApplause() {
    this.controlsService.playApplause();
  }
  playLaughtrack() {
    this.controlsService.playLaughtrack();
  }
  playCricket() {
    this.controlsService.playCricket();
  }
  playTrombone() {
    this.controlsService.playTrombone();
  }
  playGoofy() {
    this.controlsService.playGoofy();
  }
  playOoh() {
    this.controlsService.playOoh();
  }
}

// teams!: Team[];
// roundPoints: number = 0;
// teamTurn: boolean = true;
// round: number = 1;
// multiplier: number = 1;
// questionNumber: number = 1;
// questionId: string = '1';
// questions!: Question[];
// question: Question | undefined;
// points1Given: boolean = false;
// points2Given: boolean = false;
// points3Given: boolean = false;
// points4Given: boolean = false;
// points5Given: boolean = false;
// points6Given: boolean = false;
// points7Given: boolean = false;
// points8Given: boolean = false;
// resultTeam1: boolean = false;
// resultTeam2: boolean = false;
// answersEnabled: boolean = true;
// win: boolean = false;
// tie: boolean = false;

// constructor(
//   private teamService: TeamService,
//   private questionsService: QuestionService,
//   private router: Router
// ) {}

// nextQuestion() {
//   this.clearStrikes();
//   this.resetAnswers();
//   if (this.teamTurn) {
//     this.pointsTeam1 += this.roundPoints;
//   } else {
//     this.pointsTeam2 += this.roundPoints;
//   }
//   this.roundPoints = 0;
//   if (this.round == 7 && this.questionNumber == 3) {
//     if (this.pointsTeam1 > this.pointsTeam2) {
//       this.winner('team1');
//     }
//     if (this.pointsTeam2 > this.pointsTeam1) {
//       this.winner('team2');
//     }
//     if (this.pointsTeam1 == this.pointsTeam2) {
//       this.winner('tie');
//     }
//   }
//   if (this.questionNumber < 3) {
//     this.questionNumber++;
//     this.questionId++;
//     this.question = this.questionsService.getQuestionById(this.questionId);
//   } else if ((this.questionNumber = 3)) {
//     this.round++;
//     this.questionNumber = 1;
//     this.questionId++;
//     this.question = this.questionsService.getQuestionById(this.questionId);
//   }
// }

// addStrikeTeam() {
//   if (this.teamTurn && this.team2Strikes == 0) {
//     if (this.team1Strikes < 3) {
//       this.team1Strikes++;
//       this.playStrike();
//     } else if ((this.team1Strikes = 3)) {
//       this.switchTurns();
//     }
//   }

//   if (this.teamTurn && this.team2Strikes == 3) {
//     this.team1Strikes++;
//     this.playStrike();
//     this.switchTurns();
//   }

//   if (!this.teamTurn && this.team1Strikes == 0) {
//     if (this.team2Strikes < 3) {
//       this.team2Strikes++;
//       this.playStrike();
//     } else if ((this.team2Strikes = 3)) {
//       this.switchTurns();
//     }
//   }

//   if (!this.teamTurn && this.team1Strikes == 3) {
//     this.team2Strikes++;
//     this.playStrike();
//     this.switchTurns();
//   }

//   if (this.team1Strikes == 3 && this.team2Strikes == 1) {
//     this.disableAnswers();
//   }

//   if (this.team2Strikes == 3 && this.team1Strikes == 1) {
//     this.disableAnswers();
//   }
// }

// clearStrikes() {
//   this.team1Strikes = 0;
//   this.team2Strikes = 0;
//   console.log('clearStrikes() is called');
// }

// resetAnswers() {
//   this.points1Given = false;
//   this.points2Given = false;
//   this.points3Given = false;
//   this.points4Given = false;
//   this.points5Given = false;
//   this.points6Given = false;
//   this.points7Given = false;
//   this.points8Given = false;
//   this.answersEnabled = true;
//   console.log('resetAnswers() is called');
// }

// disableAnswers() {
//   this.points1Given = true;
//   this.points2Given = true;
//   this.points3Given = true;
//   this.points4Given = true;
//   this.points5Given = true;
//   this.points6Given = true;
//   this.points7Given = true;
//   this.points8Given = true;
//   this.answersEnabled = false;
//   console.log('disableAnswers() is called');
// }

// awardPointsRound(amount: number) {
//   if (this.round == 1 || this.round == 2) {
//     this.multiplier = 1;
//   }
//   if (this.round == 3 || this.round == 4) {
//     this.multiplier = 2;
//   }
//   if (this.round == 5 || this.round == 6) {
//     this.multiplier = 3;
//   }
//   if (this.round == 7) {
//     this.multiplier = 4;
//   }
//   if (!this.points1Given && amount == this.question.points1) {
//     amount *= this.multiplier;
//     this.roundPoints += amount;
//     this.points1Given = true;
//     this.playGoodAnsa();
//   }
//   if (!this.points2Given && amount == this.question.points2) {
//     amount *= this.multiplier;
//     this.roundPoints += amount;
//     this.points2Given = true;
//     this.playGoodAnsa();
//   }
//   if (!this.points3Given && amount == this.question.points3) {
//     amount *= this.multiplier;
//     this.roundPoints += amount;
//     this.points3Given = true;
//     this.playGoodAnsa();
//   }
//   if (!this.points4Given && amount == this.question.points4) {
//     amount *= this.multiplier;
//     this.roundPoints += amount;
//     this.points4Given = true;
//     this.playGoodAnsa();
//   }
//   if (!this.points5Given && amount == this.question.points5) {
//     amount *= this.multiplier;
//     this.roundPoints += amount;
//     this.points5Given = true;
//     this.playGoodAnsa();
//   }
//   if (!this.points6Given && amount == this.question.points6) {
//     amount *= this.multiplier;
//     this.roundPoints += amount;
//     this.points6Given = true;
//     this.playGoodAnsa();
//   }
//   if (!this.points7Given && amount == this.question.points7) {
//     amount *= this.multiplier;
//     this.roundPoints += amount;
//     this.points7Given = true;
//     this.playGoodAnsa();
//   }
//   if (!this.points8Given && amount == this.question.points8) {
//     amount *= this.multiplier;
//     this.roundPoints += amount;
//     this.points8Given = true;
//     this.playGoodAnsa();
//   }
// }

// switchTurns() {
//   this.teamTurn = !this.teamTurn;
//   console.log('switchTurns() is called: ' + this.teamTurn);
// }

// playStrike() {
//   let audio = new Audio();
//   audio.src = '../../../../assets/sounds/StrikeSFX.mp3';
//   audio.load();
//   audio.play();
//   console.log('playStrike() is called');
// }

// playGoodAnsa() {
//   let audio = new Audio();
//   audio.src = '../../../../assets/sounds/good-answer.mp3';
//   audio.load();
//   audio.play();
// }

// playFunny() {
//   let audio = new Audio();
//   audio.src = '../../../../assets/sounds/BahBow.mp3';
//   audio.load();
//   audio.play();
// }

// playOutroTheme() {
//   let audio = new Audio();
//   audio.src = '../../../../assets/sounds/outro_theme.mp3';
//   audio.load();
//   audio.play();
// }

// winner(winner: string) {
//   if (winner == 'team1') {
//     this.resultTeam1 = true;
//     this.win = true;
//     this.playOutroTheme();
//     console.log('Team 1 won');
//   }
//   if (winner == 'team2') {
//     this.resultTeam2 = true;
//     this.win = true;
//     this.playOutroTheme();
//     console.log('Team 2 won');
//   }
//   if (winner == 'tie') {
//     this.tie = true;
//     this.playOutroTheme();
//     console.log('Resulted in a tie');
//   }
// }

// playTheme() {
//   let audio = new Audio();
//   audio.src = '../../../../assets/sounds/funny.mp3';
//   audio.load();
//   audio.play();
// }
