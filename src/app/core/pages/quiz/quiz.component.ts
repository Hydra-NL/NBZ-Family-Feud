import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ControlsService } from '../controls/controls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/entities/team/team.service';
import { QuestionService } from 'src/app/entities/questions/question.service';
import { TeamPlayerService } from 'src/app/entities/teamplayers/teamplayer.service';
import { Team } from 'src/app/entities/team/team.model';
import { Question } from 'src/app/entities/questions/question.model';
import { TeamPlayer } from 'src/app/entities/teamplayers/teamplayer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
  teams: Team[] | null = null;
  team!: Team;
  team1!: Team;
  team2!: Team;
  playersTeam1: TeamPlayer[] | null = null;
  playersTeam2: TeamPlayer[] | null = null;
  question!: Question;
  questions: Question[] | null = null;
  subscription!: Subscription;
  count: number = 0;
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
    private route: ActivatedRoute,
    private teamService: TeamService,
    private questionService: QuestionService,
    private teamPlayerService: TeamPlayerService
  ) {}

  ngOnInit(): void {
    console.log(this.showTemplate);
    this.getTeams();
    this.getQuestions();
    this.getTeamPlayers();
  }

  getTeams() {
    this.teams = [];
    this.subscription = this.teamService.list().subscribe({
      next: (teams) => {
        this.teams = teams!;
        for (let i = 0; i < this.teams.length; i++) {
          if (this.teams[i].isPlaying === true) {
            if (this.team1 === undefined) {
              this.team1 = this.teams[i];
            } else if (this.team2 === undefined) {
              this.team2 = this.teams[i];
            }
          }
        }
      },
    });
  }

  getQuestions() {
    this.questionService.list().subscribe({
      next: (questions) => {
        this.questions = questions as Question[];
        this.question = this.questions[this.count];

        this.currentTemplate = this.quizTemplate;
      },
    });
  }

  getTeamPlayers() {
    this.teamPlayerService.list().subscribe({
      next: (teamPlayers) => {
        this.teamPlayers = teamPlayers as TeamPlayer[];
        for (let i = 0; i < this.teamPlayers.length; i++) {
          if (this.teamPlayers[i].playerTeam === this.team1._id) {
            if (this.playersTeam1 === null) {
              this.playersTeam1 = [];
            }
            this.playersTeam1.push(this.teamPlayers[i]);
          } else if (this.teamPlayers[i].playerTeam === this.team2._id) {
            if (this.playersTeam2 === null) {
              this.playersTeam2 = [];
            }
            this.playersTeam2.push(this.teamPlayers[i]);
          }
        }
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

  async nextQuestion() {
    if (this.count === 19) {
      var double = document.getElementById('double-points');
      double!.style.visibility = 'visible';
    }
    if (this.team1Turn === true) {
      this.team1.points += this.roundPoints;
      this.team1.strikes = 0;
      this.teamService.update(this.team1).subscribe({
        next: (team) => {
          this.team1 = team;
          this.getTeams();
        },
      });
    } else if (this.team2Turn === true) {
      this.team2.points += this.roundPoints;
      this.team2.strikes = 0;
      this.teamService.update(this.team2).subscribe({
        next: (team) => {
          this.team2 = team;
          this.getTeams();
        },
      });
    }
    if (this.count < this.questions!.length) {
      this.resetRound();
      this.getQuestions();
      this.getTeams();

      // var team1Selected = document.getElementById('team-box-1');
      // var team2Selected = document.getElementById('team-box-2');
      // var team1Points = document.getElementById('team-points-1');
      // var team2Points = document.getElementById('team-points-2');
      // var selectTeam = document.getElementById('select-teams');
      // var lock = document.getElementById('lock-points');
      // var timer = document.getElementById('timer');

      // lock!.style.visibility = 'hidden';
      // team1Selected!.style.borderColor = '#cccccc';
      // team2Selected!.style.borderColor = '#cccccc';
      // team1Points!.style.borderColor = '#cccccc';
      // team2Points!.style.borderColor = '#cccccc';
      // selectTeam!.style.visibility = 'visible';
      // timer!.style.visibility = 'hidden';

      console.log('next question');
    } else {
      this.toggleWinner(this.team1, this.team2);
      this.controlsService.playOutro();
    }
  }

  resetRound() {
    this.count++;
    this.pointsEnabled = true;
    this.roundPoints = 0;
    this.team1Turn = false;
    this.team2Turn = false;
    this.team1.strikes = 0;
    this.team2.strikes = 0;
    this.toggleTitle();
  }

  disablePoints() {
    var lock = document.getElementById('lock-points');
    lock!.style.visibility = 'visible';
    this.pointsEnabled = false;
  }

  toggleTitle() {
    var button = document.getElementById('show-title-button');
    var title = document.getElementById('question-title');

    if (title?.style.visibility === 'visible') {
      title!.style.visibility = 'hidden';
      button!.style.visibility = 'visible';
    } else {
      title!.style.visibility = 'visible';
      button!.style.visibility = 'hidden';
    }
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
        this.disablePoints();
      } else if (this.team2.strikes === 3 && this.team1Turn) {
        this.controlsService.playGoodAnswer();
        this.disablePoints();
      } else {
        this.controlsService.playGoodAnswer();
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

  toggleWinner(team1: Team, team2: Team) {
    this.showTemplate = !this.showTemplate;
    this.currentTemplate = this.winnerTemplate;
    team1 = {
      ...team1,
      isPlaying: false,
      points: 0,
      strikes: 0,
    };
    team2 = {
      ...team2,
      isPlaying: false,
      points: 0,
      strikes: 0,
    };
    this.teamService.update(team1).subscribe({
      next: () => {
        this.teamService.update(team2).subscribe({});
      },
    });
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
